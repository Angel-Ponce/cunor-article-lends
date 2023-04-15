import jwt from "jwt-simple";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Institution } from "./Institution";
import { authenticate, exclude, modelPage, paginate } from "../../helpers";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("lastname");
    t.string("phone");
    t.string("description");
    t.nonNull.string("username");
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
            password: bcrypt.hashSync(args.password, 10),
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
        role: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

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

const updatePassword = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updatePassword", {
      type: nonNull("String"),
      args: {
        userId: nonNull(intArg()),
        oldPassword: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const user = await ctx.prisma.user.findUniqueOrThrow({
          where: {
            id: args.userId,
          },
        });

        const matchOldPassword = bcrypt.compareSync(
          args.oldPassword,
          user.password
        );

        if (!matchOldPassword) throw new GraphQLError("Old password invalid");

        await ctx.prisma.user.update({
          where: {
            id: args.userId,
          },
          data: {
            password: bcrypt.hashSync(args.newPassword, 10),
          },
        });

        return "Password revoked successfully";
      },
    });
  },
});

const me = extendType({
  type: "Query",
  definition: (t) => {
    t.field("me", {
      type: User,
      resolve: (_parent, _args, ctx) => {
        return ctx.user || null;
      },
    });
  },
});

const login = extendType({
  type: "Query",
  definition: (t) => {
    t.field("login", {
      type: "String",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            username: args.username,
          },
        });

        if (!user) throw new GraphQLError("invalid username");

        if (!bcrypt.compareSync(args.password, user.password))
          throw new GraphQLError("invalid password");

        return jwt.encode(
          exclude(user, ["password"]),
          process.env.JWT_SECRET || ""
        );
      },
    });
  },
});

const types = [
  User,
  user,
  users,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  me,
  login,
];

export default types;
