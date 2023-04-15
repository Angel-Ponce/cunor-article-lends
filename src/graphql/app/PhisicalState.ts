import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Institution } from "./Institution";
import { GraphQLError } from "graphql";

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
        if (!ctx.user) throw new GraphQLError("Must authenticate");

        return ctx.prisma.phisicalState.create({
          data: {
            name: args.name,
            description: args.description,
            institutionId: ctx.user.institutionId,
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

// const updateInstitution = extendType({
//   type: "Mutation",
//   definition: (t) => {
//     t.field("updateInstitution", {
//       type: nonNull(Institution),
//       args: {
//         id: nonNull(intArg()),
//         name: stringArg(),
//       },
//       resolve: async (_parent, args, ctx) => {
//         const institution = await ctx.prisma.institution.findUniqueOrThrow({
//           where: {
//             id: args.id,
//           },
//         });

//         await ctx.prisma.institution.update({
//           where: {
//             id: args.id,
//           },
//           data: {
//             name: args.name || institution.name,
//           },
//         });

//         return ctx.prisma.institution.findUniqueOrThrow({
//           where: {
//             id: args.id,
//           },
//         });
//       },
//     });
//   },
// });

// const deleteInstitution = extendType({
//   type: "Mutation",
//   definition: (t) => {
//     t.field("deleteInstitution", {
//       type: nonNull(Institution),
//       args: {
//         id: nonNull(intArg()),
//       },
//       resolve: async (_parent, args, ctx) => {
//         const institution = await ctx.prisma.institution.findUniqueOrThrow({
//           where: {
//             id: args.id,
//           },
//         });

//         await ctx.prisma.institution.delete({
//           where: {
//             id: args.id,
//           },
//         });

//         return institution;
//       },
//     });
//   },
// });

const types = [
  PhisicalState,
  phisicalState,
  createPhisicalState,
  //   updateInstitution,
  //   deleteInstitution,
];

export default types;
