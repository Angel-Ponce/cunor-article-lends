import { extendType, nonNull, objectType } from "nexus";
import { authenticate } from "../../helpers";

const KPIS = objectType({
  name: "KPIS",
  definition: (t) => {
    t.nonNull.float("countUsers");
    t.nonNull.float("countProfessors");
    t.nonNull.float("countArticles");
    t.nonNull.float("countActiveLends");
    t.nonNull.float("countCompletedLends");
  },
});

const kpis = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.field("kpis", {
      type: nonNull(KPIS),
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

const EntityLend = objectType({
  name: "EntityLend",
  definition: (t) => {
    t.nonNull.string("name");
    t.nonNull.float("countLends");
  },
});

const entityLends = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("professorLends", {
      type: nonNull(EntityLend),
      resolve: async (_p, _a, ctx) => {
        authenticate(ctx);

        const p = await ctx.prisma.professor.findMany({
          select: {
            name: true,
            lastname: true,
            _count: {
              select: {
                lends: true,
              },
            },
          },
        });

        return p.map((p) => ({
          name: `${p.name} ${p.lastname}`,
          countLends: p._count.lends,
        }));
      },
    });
    t.nonNull.list.field("userLends", {
      type: nonNull(EntityLend),
      resolve: async (_p, _a, ctx) => {
        authenticate(ctx);

        const u = await ctx.prisma.user.findMany({
          select: {
            name: true,
            lastname: true,
            _count: {
              select: {
                lends: true,
              },
            },
          },
        });

        return u.map((u) => ({
          name: `${u.name} ${u.lastname}`,
          countLends: u._count.lends,
        }));
      },
    });
  },
});

const types = [KPIS, kpis, EntityLend, entityLends];

export default types;
