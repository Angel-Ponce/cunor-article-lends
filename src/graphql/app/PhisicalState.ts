import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { authenticate, modelPage, paginate } from "../../helpers";

const PhisicalState = objectType({
  name: "PhisicalState",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.string("description");
    t.field("institution", {
      type: nonNull("Institution"),
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

        return ctx.prisma.phisicalState.findFirstOrThrow({
          where: {
            id: args.id,
            deletedAt: null,
            institutionId: ctx.user?.institutionId || 0,
          },
        });
      },
    });
  },
});

const PhisicalStatePage = modelPage(PhisicalState, "PhisicalStatePage");

const phisicalStates = extendType({
  type: "Query",
  definition: (t) => {
    t.field("phisicalStates", {
      type: nonNull(PhisicalStatePage),
      args: {
        limit: nonNull(intArg({ default: 10 })),
        page: nonNull(intArg({ default: 1 })),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const totalRows = await ctx.prisma.phisicalState.count();
        const pags = paginate(args.limit, args.page, totalRows);

        return {
          rows: await ctx.prisma.phisicalState.findMany({
            skip: pags.skip,
            take: pags.take,
            where: {
              deletedAt: null,
              institutionId: ctx.user?.institutionId || 0,
            },
          }),
          length: pags.length,
          pages: pags.pages,
        };
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
        });
      },
    });
  },
});

const updatePhisicalState = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updatePhisicalState", {
      type: nonNull(PhisicalState),
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        description: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const phisicalState = await ctx.prisma.phisicalState.findFirstOrThrow({
          where: {
            id: args.id,
            deletedAt: null,
            institutionId: ctx.user?.institutionId || 0,
          },
        });

        return await ctx.prisma.phisicalState.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name || phisicalState.name,
            description: args.description || phisicalState.description,
          },
        });
      },
    });
  },
});

const deletePhisicalState = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deletePhisicalState", {
      type: nonNull(PhisicalState),
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        return await ctx.prisma.phisicalState.update({
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
  PhisicalState,
  phisicalState,
  phisicalStates,
  createPhisicalState,
  updatePhisicalState,
  deletePhisicalState,
];

export default types;
