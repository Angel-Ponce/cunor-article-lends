import {
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  scalarType,
} from "nexus";
import { Institution } from "./Institution";
import { authenticate, modelPage, paginate } from "../../helpers";
import { GraphQLError, Kind } from "graphql";
import { PhisicalState } from "./PhisicalState";
import { User } from "./User";
import { Professor } from "./Professor";
import { isValid } from "date-fns";
import { Article } from "./Article";

export const DateTime = scalarType({
  name: "DateTime",
  asNexusMethod: "dateTime",
  description: "DateTime custom scalar type",
  //To parse arguments
  parseValue: (value) => {
    if (isValid(value)) return value;

    throw new GraphQLError("Provided value is not a valid Date", {
      extensions: { exception: { code: "BAD_USER_INPUT" } },
    });
  },
  //To serialize
  serialize: (value) => {
    if (value instanceof Date) return value.getTime();

    throw new GraphQLError(
      "GraphQL DateTime Scalar serializer expected a `Date` object"
    );
  },
  //To query DateTime
  parseLiteral: (ast) => {
    if (ast.kind == Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});

const ArticleLend = objectType({
  name: "ArticleLend",
  definition: (t) => {
    t.nonNull.field("article", {
      type: "Article",
    });
    t.nonNull.int("count");
  },
});

const Lend = objectType({
  name: "Lend",
  definition: (t) => {
    t.nonNull.int("id");
    t.field("user", {
      type: nonNull(User),
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            user: true,
          },
        });

        return lend.user;
      },
    });
    t.field("professor", {
      type: nonNull(Professor),
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            professor: true,
          },
        });

        return lend.professor;
      },
    });
    t.nonNull.dateTime("createdAt");
    t.nonNull.boolean("completed");
    t.nonNull.dateTime("dueDate");
    t.dateTime("realDueDate");
    t.field("initialPhisicalState", {
      type: nonNull(PhisicalState),
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            initialPhisicalStateId: true,
          },
        });

        const phisicalState = await ctx.prisma.phisicalState.findUniqueOrThrow({
          where: {
            id: lend.initialPhisicalStateId,
          },
        });

        return phisicalState;
      },
    });
    t.field("finalPhisicalState", {
      type: PhisicalState,
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            finalPhisicalStateId: true,
          },
        });

        const phisicalState = await ctx.prisma.phisicalState.findUnique({
          where: {
            id: lend.finalPhisicalStateId || 0,
          },
        });

        return phisicalState;
      },
    });
    t.field("institution", {
      type: nonNull(Institution),
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            institution: true,
          },
        });

        return lend.institution;
      },
    });
    t.nonNull.list.field("articles", {
      type: nonNull(ArticleLend),
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: { id: parent.id },
          select: {
            articles: {
              select: {
                article: true,
                count: true,
              },
            },
          },
        });

        return lend.articles.map((a) => ({
          article: a.article,
          count: a.count,
        }));
      },
    });
  },
});

const lend = extendType({
  type: "Query",
  definition: (t) => {
    t.field("lend", {
      type: nonNull(Lend),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.lend.findFirstOrThrow({
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

const LendPage = modelPage(Lend, "LendPage");

const lends = extendType({
  type: "Query",
  definition: (t) => {
    t.field("lends", {
      type: nonNull(LendPage),
      args: {
        limit: nonNull(intArg({ default: 10 })),
        page: nonNull(intArg({ default: 1 })),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const totalRows = await ctx.prisma.lend.count();
        const pags = paginate(args.limit, args.page, totalRows);

        return {
          rows: await ctx.prisma.lend.findMany({
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

const InputArticleLend = inputObjectType({
  name: "InputArticleLend",
  definition: (t) => {
    t.nonNull.int("articleId");
    t.nonNull.int("count");
  },
});

const createLend = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createLend", {
      type: nonNull(Lend),
      args: {
        professorId: nonNull(intArg()),
        dueDate: nonNull(DateTime),
        phisicalStateId: nonNull(intArg()),
        articles: nonNull(list(nonNull(InputArticleLend))),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.lend.create({
          data: {
            userId: ctx.user?.id || 0,
            professorId: args.professorId,
            dueDate: args.dueDate,
            initialPhisicalStateId: args.phisicalStateId,
            institutionId: ctx.user?.institutionId || 0,
            articles: {
              create: args.articles.map((a) => ({
                articleId: a.articleId,
                count: a.count,
              })),
            },
          },
        });
      },
    });
  },
});

const completeLend = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("completeLend", {
      type: nonNull(Lend),
      args: {
        id: nonNull(intArg()),
        phisicalStateId: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        return await ctx.prisma.lend.update({
          where: {
            id: args.id,
          },
          data: {
            completed: true,
            realDueDate: new Date(),
            finalPhisicalStateId: args.phisicalStateId,
          },
        });
      },
    });
  },
});

const deleteLend = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteLend", {
      type: nonNull(Lend),
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        return await ctx.prisma.lend.update({
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
  Lend,
  DateTime,
  lend,
  lends,
  createLend,
  completeLend,
  deleteLend,
];

export default types;
