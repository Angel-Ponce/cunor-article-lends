import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { authenticate, modelPage, paginate } from "../../helpers";

export const Institution = objectType({
  name: "Institution",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});

const institution = extendType({
  type: "Query",
  definition: (t) => {
    t.field("institution", {
      type: nonNull(Institution),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.institution.findFirstOrThrow({
          where: {
            id: args.id,
            deletedAt: null,
          },
        });
      },
    });
  },
});

const InstitutionPage = modelPage(Institution, "InstitutionPage");

const institutions = extendType({
  type: "Query",
  definition: (t) => {
    t.field("institutions", {
      type: nonNull(InstitutionPage),
      args: {
        limit: nonNull(intArg({ default: 10 })),
        page: nonNull(intArg({ default: 1 })),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const totalRows = await ctx.prisma.institution.count();
        const pags = paginate(args.limit, args.page, totalRows);

        return {
          rows: await ctx.prisma.institution.findMany({
            skip: pags.skip,
            take: pags.take,
            where: {
              deletedAt: null,
            },
          }),
          length: pags.length,
          pages: pags.pages,
        };
      },
    });
  },
});

const createInstitution = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createInstitution", {
      type: nonNull(Institution),
      args: {
        name: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.institution.create({
          data: {
            name: args.name,
          },
        });
      },
    });
  },
});

const updateInstitution = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateInstitution", {
      type: nonNull(Institution),
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const institution = await ctx.prisma.institution.findFirstOrThrow({
          where: {
            id: args.id,
            deletedAt: null,
          },
        });

        return await ctx.prisma.institution.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name || institution.name,
          },
        });
      },
    });
  },
});

const deleteInstitution = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteInstitution", {
      type: nonNull(Institution),
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        return await ctx.prisma.institution.update({
          where: {
            id: args.id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      },
    });
  },
});

const types = [
  Institution,
  institution,
  institutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
];

export default types;
