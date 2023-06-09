import {
  arg,
  core,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  nullable,
  objectType,
  scalarType,
} from "nexus";
import { authenticate, modelPage, paginate } from "../../helpers";
import { GraphQLError, Kind } from "graphql";
import { isValid } from "date-fns";

const DateTime = scalarType({
  name: "DateTime",
  asNexusMethod: "dateTime",
  description: "DateTime custom scalar type",
  //To parse arguments
  parseValue: (value) => {
    if (isValid(new Date(`${value}`))) return new Date(`${value}`);

    throw new GraphQLError("Provided value is not a valid Date", {
      extensions: { exception: { code: "BAD_USER_INPUT" } },
    });
  },
  //To query
  serialize: (value) => {
    if (isValid(new Date(`${value}`))) return value;

    throw new GraphQLError(
      "GraphQL DateTime Scalar serializer expected a `Date` object"
    );
  },
  //To ??
  parseLiteral: (ast) => {
    console.log({ ast });
    if (ast.kind == Kind.INT || ast.kind == Kind.STRING) {
      return new Date(new Date(ast.value));
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
    t.field("lend", {
      type: nonNull(Lend),
    });
    t.field("initialPhisicalState", {
      type: nonNull("PhisicalState"),
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: {
            id: parent.lend.id,
          },
          select: {
            articles: {
              where: {
                articleId: parent.article.id,
              },
              take: 1,
            },
          },
        });

        const phisicalState = await ctx.prisma.phisicalState.findUniqueOrThrow({
          where: {
            id: lend.articles[0].initialPhisicalStateId,
          },
        });

        return phisicalState;
      },
    });
    t.field("finalPhisicalState", {
      type: "PhisicalState",
      resolve: async (parent, _args, ctx) => {
        const lend = await ctx.prisma.lend.findUniqueOrThrow({
          where: {
            id: parent.lend.id,
          },
          select: {
            articles: {
              where: {
                articleId: parent.article.id,
              },
              take: 1,
            },
          },
        });

        const phisicalState = await ctx.prisma.phisicalState.findFirst({
          where: {
            id: lend.articles[0].finalPhisicalStateId || 0,
          },
        });

        return phisicalState;
      },
    });
  },
});

const Lend = objectType({
  name: "Lend",
  definition: (t) => {
    t.nonNull.int("id");
    t.field("user", {
      type: nonNull("User"),
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
      type: nonNull("Professor"),
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
    t.field("institution", {
      type: nonNull("Institution"),
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
                lend: true,
              },
            },
          },
        });

        return lend.articles.map((a) => ({
          article: a.article,
          count: a.count,
          lend: a.lend,
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

const dateTimeArg = (opts: core.CommonArgConfig) =>
  arg({ ...opts, type: "DateTime" });

const lends = extendType({
  type: "Query",
  definition: (t) => {
    t.field("lends", {
      type: nonNull(LendPage),
      args: {
        limit: nonNull(intArg({ default: 10 })),
        page: nonNull(intArg({ default: 1 })),
        from: nullable(dateTimeArg({})),
        to: nullable(dateTimeArg({})),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        let from = isValid(args.from)
          ? new Date(args.from)
          : new Date(1980, 0, 1);
        let to = isValid(args.to) ? new Date(args.to) : new Date(3000, 0, 1);

        const totalRows = await ctx.prisma.lend.count({
          where: {
            deletedAt: null,
            institutionId: ctx.user?.institutionId || 0,
            createdAt: {
              gte: from,
              lte: to,
            },
          },
        });

        const pags = paginate(args.limit, args.page, totalRows);

        return {
          rows: await ctx.prisma.lend.findMany({
            skip: pags.skip,
            take: pags.take,
            where: {
              deletedAt: null,
              institutionId: ctx.user?.institutionId || 0,
              createdAt: {
                gte: from,
                lte: to,
              },
            },
            orderBy: {
              completed: "asc",
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
        articles: nonNull(list(nonNull(InputArticleLend))),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const articles = await ctx.prisma.article.findMany({
          where: {
            id: {
              in: args.articles.map((a) => a.articleId),
            },
          },
        });

        return ctx.prisma.lend.create({
          data: {
            userId: ctx.user?.id || 0,
            professorId: args.professorId,
            dueDate: args.dueDate,
            institutionId: ctx.user?.institutionId || 0,
            articles: {
              create: articles.map((a) => ({
                articleId: a.id,
                count:
                  args.articles.find((arga) => arga.articleId == a.id)?.count ||
                  0,
                initialPhisicalStateId: a.phisicalStateId,
              })),
            },
          },
        });
      },
    });
  },
});

const InputArticleLendCompleted = inputObjectType({
  name: "InputArticleLendCompleted",
  definition: (t) => {
    t.nonNull.int("articleId");
    t.nonNull.int("phisicalStateId");
  },
});

const completeLend = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("completeLend", {
      type: nonNull(Lend),
      args: {
        id: nonNull(intArg()),
        articlesStates: nonNull(list(nonNull(InputArticleLendCompleted))),
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
            articles: {
              update: args.articlesStates.map((as) => ({
                data: {
                  finalPhisicalStateId: as.phisicalStateId,
                },
                where: {
                  lendId_articleId: {
                    lendId: args.id,
                    articleId: as.articleId,
                  },
                },
              })),
            },
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
