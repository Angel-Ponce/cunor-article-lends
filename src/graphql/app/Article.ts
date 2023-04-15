import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Institution } from "./Institution";
import { authenticate, exclude, modelPage, paginate } from "../../helpers";
import { GraphQLError } from "graphql";
import { PhisicalState } from "./PhisicalState";

export const Article = objectType({
  name: "Article",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.string("description");
    t.field("phisicalState", {
      type: nonNull(PhisicalState),
      resolve: async (parent, _args, ctx) => {
        const article = await ctx.prisma.article.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            phisicalState: true,
          },
        });

        return article.phisicalState;
      },
    });
    t.string("serial");
    t.field("institution", {
      type: nonNull(Institution),
      resolve: async (parent, _args, ctx) => {
        const article = await ctx.prisma.article.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            institution: true,
          },
        });

        return article.institution;
      },
    });
  },
});

const article = extendType({
  type: "Query",
  definition: (t) => {
    t.field("article", {
      type: nonNull(Article),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.article.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

const ArticlePage = modelPage(Article, "ArticlePage");

const articles = extendType({
  type: "Query",
  definition: (t) => {
    t.field("articles", {
      type: nonNull(ArticlePage),
      args: {
        limit: nonNull(intArg({ default: 10 })),
        page: nonNull(intArg({ default: 1 })),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const totalRows = await ctx.prisma.article.count();
        const pags = paginate(args.limit, args.page, totalRows);

        return {
          rows: await ctx.prisma.article.findMany({
            skip: pags.skip,
            take: pags.take,
          }),
          length: pags.length,
          pages: pags.pages,
        };
      },
    });
  },
});

const createArticle = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createArticle", {
      type: nonNull(Article),
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        phisicalStateId: nonNull(intArg()),
        serial: stringArg(),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.article.create({
          data: {
            ...args,
            institutionId: ctx.user?.institutionId || 0,
          },
        });
      },
    });
  },
});

const updateArticle = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateArticle", {
      type: nonNull(Article),
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        description: stringArg(),
        phisicalStateId: intArg(),
        serial: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const article = await ctx.prisma.article.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });

        return await ctx.prisma.article.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name || article.name,
            description: args.description || article.description,
            phisicalStateId: args.phisicalStateId || article.phisicalStateId,
            serial: args.serial || article.serial,
          },
        });
      },
    });
  },
});

const deleteArticle = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteArticle", {
      type: nonNull("String"),
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        await ctx.prisma.article.delete({
          where: {
            id: args.id,
          },
        });

        return "Deleted successfully";
      },
    });
  },
});

const types = [
  Article,
  article,
  articles,
  createArticle,
  updateArticle,
  deleteArticle,
];

export default types;