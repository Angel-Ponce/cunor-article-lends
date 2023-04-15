import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const Institution = objectType({
  name: "Institution",
  definition: (m) => {
    m.nonNull.int("id");
    m.nonNull.string("name");
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
        return ctx.prisma.institution.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });
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
  createInstitution,
  updateInstitution,
  deleteInstitution,
];

export default types;
