import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Institution } from "./Institution";
import { GraphQLError } from "graphql";
import { authenticate } from "../../helpers";

const PhisicalState = objectType({
  name: "PhisicalState",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.string("description");
    t.field("institution", {
      type: nonNull(Institution),
      resolve: async (parent, _args, ctx) => {
        const phisicalState = await ctx.prisma.phisicalState.findFirstOrThrow({
          where: {
            id: parent.id,
          },
          select: { institution: true },
        });

        return phisicalState.institution;
      },
    });
  },
});

const phisicalState = extendType({
  type: "Query",
  definition: (t) => {
    t.field("phisicalState", {
      type: nonNull(PhisicalState),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.phisicalState.findUniqueOrThrow({
          where: {
            id: args.id,
          },
          select: {
            id: true,
            name: true,
            description: true,
          },
        });
      },
    });
  },
});

const createPhisicalState = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createPhisicalState", {
      type: nonNull(PhisicalState),
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.phisicalState.create({
          data: {
            name: args.name,
            description: args.description,
            institutionId: ctx.user?.institutionId || 0,
          },
          select: {
            id: true,
            name: true,
            description: true,
          },
        });
      },
    });
  },
});

const types = [
  PhisicalState,
  phisicalState,
  createPhisicalState,
  //   updateInstitution,
  //   deleteInstitution,
];

export default types;
