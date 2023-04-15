import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { authenticate } from "../../helpers";

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

        return ctx.prisma.institution.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

const InstitutionPage = objectType({
  name: "InstitutionPage",
  definition: (t) => {
    t.nonNull.list.field("rows", {
      type: nonNull(Institution),
    });
    t.nonNull.int("pages");
    t.nonNull.int("length");
  },
});

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
        const limit = args.limit;
        const page = args.page;
        const offset = (page - 1) * limit;
        const pages = Math.ceil(totalRows / limit);

        return {
          rows: await ctx.prisma.institution.findMany({
            skip: offset,
            take: limit,
          }),
          length: totalRows,
          pages,
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

        const institution = await ctx.prisma.institution.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });

        await ctx.prisma.institution.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name || institution.name,
          },
        });

        return ctx.prisma.institution.findUniqueOrThrow({
          where: {
            id: args.id,
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

        const institution = await ctx.prisma.institution.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });

        await ctx.prisma.institution.delete({
          where: {
            id: args.id,
          },
        });

        return institution;
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
