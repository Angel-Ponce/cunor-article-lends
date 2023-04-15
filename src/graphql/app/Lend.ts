import {
  extendType,
  intArg,
  nonNull,
  objectType,
  scalarType,
  stringArg,
} from "nexus";
import { Institution } from "./Institution";
import { authenticate, exclude, modelPage, paginate } from "../../helpers";
import { GraphQLError, Kind } from "graphql";
import { PhisicalState } from "./PhisicalState";
import { User } from "./User";
import { Professor } from "./Professor";
import { isValid } from "date-fns";

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

        const phisicalState = await ctx.prisma.phisicalState.findUniqueOrThrow({
          where: {
            id: lend.finalPhisicalStateId,
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
  },
});

// const professor = extendType({
//   type: "Query",
//   definition: (t) => {
//     t.field("professor", {
//       type: nonNull(Professor),
//       args: {
//         id: nonNull(intArg()),
//       },
//       resolve: (_parent, args, ctx) => {
//         authenticate(ctx);

//         return ctx.prisma.professor.findUniqueOrThrow({
//           where: {
//             id: args.id,
//           },
//         });
//       },
//     });
//   },
// });

// const ProfessorPage = modelPage(Professor, "ProfessorPage");

// const professors = extendType({
//   type: "Query",
//   definition: (t) => {
//     t.field("professors", {
//       type: nonNull(ProfessorPage),
//       args: {
//         limit: nonNull(intArg({ default: 10 })),
//         page: nonNull(intArg({ default: 1 })),
//       },
//       resolve: async (_parent, args, ctx) => {
//         authenticate(ctx);

//         const totalRows = await ctx.prisma.professor.count();
//         const pags = paginate(args.limit, args.page, totalRows);

//         return {
//           rows: await ctx.prisma.professor.findMany({
//             skip: pags.skip,
//             take: pags.take,
//           }),
//           length: pags.length,
//           pages: pags.pages,
//         };
//       },
//     });
//   },
// });

// const createProfessor = extendType({
//   type: "Mutation",
//   definition: (t) => {
//     t.field("createProfessor", {
//       type: nonNull(Professor),
//       args: {
//         name: nonNull(stringArg()),
//         lastname: nonNull(stringArg()),
//         phone: stringArg(),
//         personalRegister: nonNull(stringArg()),
//       },
//       resolve: (_parent, args, ctx) => {
//         authenticate(ctx);

//         return ctx.prisma.professor.create({
//           data: {
//             ...args,
//             institutionId: ctx.user?.institutionId || 0,
//           },
//         });
//       },
//     });
//   },
// });

// const updateProfessor = extendType({
//   type: "Mutation",
//   definition: (t) => {
//     t.field("updateProfessor", {
//       type: nonNull(Professor),
//       args: {
//         id: nonNull(intArg()),
//         name: stringArg(),
//         lastname: stringArg(),
//         phone: stringArg(),
//         personalRegister: stringArg(),
//       },
//       resolve: async (_parent, args, ctx) => {
//         authenticate(ctx);

//         const professor = await ctx.prisma.professor.findUniqueOrThrow({
//           where: {
//             id: args.id,
//           },
//         });

//         return await ctx.prisma.professor.update({
//           where: {
//             id: args.id,
//           },
//           data: {
//             name: args.name || professor.name,
//             lastname: args.lastname || professor.lastname,
//             phone: args.phone || professor.phone,
//             personalRegister:
//               args.personalRegister || professor.personalRegister,
//           },
//         });
//       },
//     });
//   },
// });

// const deleteProfessor = extendType({
//   type: "Mutation",
//   definition: (t) => {
//     t.field("deleteProfessor", {
//       type: nonNull("String"),
//       args: {
//         id: nonNull(intArg()),
//       },
//       resolve: async (_parent, args, ctx) => {
//         authenticate(ctx);

//         await ctx.prisma.professor.delete({
//           where: {
//             id: args.id,
//           },
//         });

//         return "Deleted successfully";
//       },
//     });
//   },
// });

const types = [Lend, DateTime];

export default types;
