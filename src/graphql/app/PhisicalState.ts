import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Institution } from "./Institution";

const PhisicalState = objectType({
  name: "PhisicalState",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.string("description");
    t.field("institution", {
      type: nonNull(Institution),
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.phisicalState.findFirstOrThrow({
          where: {
            id: parent.id,
          },
          include: {
            institution: true,
          },
        });
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
        return ctx.prisma.phisicalState.create({
          data: {
            name: args.name,
            description: args.description,
            institutionId: 1,
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
