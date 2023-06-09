import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { authenticate, modelPage, paginate } from "../../helpers";

const Professor = objectType({
  name: "Professor",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("lastname");
    t.string("phone");
    t.nonNull.string("personalRegister");
    t.field("institution", {
      type: nonNull("Institution"),
      resolve: async (parent, _args, ctx) => {
        const professor = await ctx.prisma.professor.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            institution: true,
          },
        });

        return professor.institution;
      },
    });
    t.field("countActiveLends", {
      type: nonNull("Int"),
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.lend.count({
          where: {
            professorId: parent.id,
            deletedAt: null,
            completed: false,
          },
        });
      },
    });
    t.field("countCompletedLends", {
      type: nonNull("Int"),
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.lend.count({
          where: {
            professorId: parent.id,
            deletedAt: null,
            completed: true,
          },
        });
      },
    });
    t.nonNull.list.field("lends", {
      type: nonNull("Lend"),
      resolve: async (parent, _args, ctx) => {
        const professor = await ctx.prisma.professor.findFirstOrThrow({
          where: {
            id: parent.id,
          },
          select: {
            lends: {
              where: {
                deletedAt: null,
              },
            },
          },
        });

        return professor.lends;
      },
    });
  },
});

const professor = extendType({
  type: "Query",
  definition: (t) => {
    t.field("professor", {
      type: nonNull(Professor),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.professor.findFirstOrThrow({
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

const ProfessorPage = modelPage(Professor, "ProfessorPage");

const professors = extendType({
  type: "Query",
  definition: (t) => {
    t.field("professors", {
      type: nonNull(ProfessorPage),
      args: {
        limit: nonNull(intArg({ default: 10 })),
        page: nonNull(intArg({ default: 1 })),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const totalRows = await ctx.prisma.professor.count({
          where: {
            deletedAt: null,
            institutionId: ctx.user?.institutionId || 0,
          },
        });
        const pags = paginate(args.limit, args.page, totalRows);

        return {
          rows: await ctx.prisma.professor.findMany({
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

const createProfessor = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createProfessor", {
      type: nonNull(Professor),
      args: {
        name: nonNull(stringArg()),
        lastname: nonNull(stringArg()),
        phone: stringArg(),
        personalRegister: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx) => {
        authenticate(ctx);

        return ctx.prisma.professor.create({
          data: {
            ...args,
            institutionId: ctx.user?.institutionId || 0,
          },
        });
      },
    });
  },
});

const updateProfessor = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateProfessor", {
      type: nonNull(Professor),
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        lastname: stringArg(),
        phone: stringArg(),
        personalRegister: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        const professor = await ctx.prisma.professor.findFirstOrThrow({
          where: {
            id: args.id,
            deletedAt: null,
            institutionId: ctx.user?.institutionId || 0,
          },
        });

        return await ctx.prisma.professor.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name || professor.name,
            lastname: args.lastname || professor.lastname,
            phone: args.phone || professor.phone,
            personalRegister:
              args.personalRegister || professor.personalRegister,
          },
        });
      },
    });
  },
});

const deleteProfessor = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("deleteProfessor", {
      type: nonNull(Professor),
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        authenticate(ctx);

        return await ctx.prisma.professor.update({
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
  Professor,
  professor,
  professors,
  createProfessor,
  updateProfessor,
  deleteProfessor,
];

export default types;
