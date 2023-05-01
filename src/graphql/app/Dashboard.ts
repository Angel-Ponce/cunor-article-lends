import { extendType, nonNull, objectType } from "nexus";
import { authenticate } from "../../helpers";

const KPIsTypes = objectType({
  name: "KPIsTypes",
  definition: (t) => {
    t.nonNull.float("countUsers");
    t.nonNull.float("countProfessors");
    t.nonNull.float("countArticles");
    t.nonNull.float("countActiveLends");
    t.nonNull.float("countCompletedLends");
  },
});

const KPIs = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.field("kpis", {
      type: nonNull(KPIsTypes),
      resolve: async (_p, _a, ctx) => {
        authenticate(ctx);

        const where = {
          deletedAt: null,
          institutionId: ctx.user?.institutionId || 0,
        };

        return {
          countUsers: await ctx.prisma.user.count({
            where,
          }),
          countProfessors: await ctx.prisma.professor.count({
            where,
          }),
          countArticles: await ctx.prisma.article.count({ where }),
          countActiveLends: await ctx.prisma.lend.count({
            where: { ...where, completed: false },
          }),
          countCompletedLends: await ctx.prisma.lend.count({
            where: { ...where, completed: true },
          }),
        };
      },
    });
  },
});

const types = [KPIsTypes, KPIs];

export default types;
