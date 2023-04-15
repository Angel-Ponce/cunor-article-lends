import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Institution } from "./Institution";
import { authenticate, modelPage, paginate } from "../../helpers";

const User = objectType({
  name: "User",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("lastname");
    t.string("phone");
    t.string("description");
    t.nonNull.string("username");
    t.nonNull.string("password");
    t.nonNull.string("role");
    t.field("institution", {
      type: nonNull(Institution),
      resolve: async (parent, _args, ctx) => {
        const user = await ctx.prisma.user.findFirstOrThrow({
          where: {
            id: parent.id,
          },
          select: { institution: true },
        });

        return user.institution;
      },
    });
  },
});

const user = extendType({
  type: "Query",
  definition: (t) => {
    t.field("user", {
      type: nonNull(User),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.user.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

const UserPage = modelPage(User, "UserPage");

const users = extendType({
  type: "Query",
  definition: (t) => {
    t.field("users", {
      type: nonNull(UserPage),
      args: {
        limit: nonNull(intArg({ default: 10 })),
        page: nonNull(intArg({ default: 1 })),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const totalRows = await ctx.prisma.user.count();
        const pags = paginate(args.limit, args.page, totalRows);

        return {
          rows: await ctx.prisma.user.findMany({
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

const createUser = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createUser", {
      type: nonNull(User),
      args: {
        name: nonNull(stringArg()),
        lastname: nonNull(stringArg()),
        phone: stringArg(),
        description: stringArg(),
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        role: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.user.create({
          data: {
            ...args,
            institutionId: ctx.user?.institutionId || 0,
          },
        });
      },
    });
  },
});

const updateUser = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateUser", {
      type: nonNull(User),
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        lastname: stringArg(),
        phone: stringArg(),
        description: stringArg(),
        username: stringArg(),
        password: stringArg(),
        role: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        const user = await ctx.prisma.user.findUniqueOrThrow({
          where: {
            id: args.id,
          },
        });

        return await ctx.prisma.user.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name || user.name,
            lastname: args.lastname || user.lastname,
            phone: args.phone || user.phone,
            description: args.description || user.description,
            username: args.username || user.username,
            password: args.password || user.password,
            role: args.role || user.role,
          },
        });
      },
    });
  },
});

const deleteUser = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteUser", {
      type: nonNull("String"),
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        await ctx.prisma.user.delete({
          where: {
            id: args.id,
          },
        });

        return "Deleted successfully";
      },
    });
  },
});

const types = [User, user, users, createUser, updateUser, deleteUser];

export default types;
