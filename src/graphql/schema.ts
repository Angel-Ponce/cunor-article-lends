import {
  makeSchema,
  objectType,
  extendType,
  nonNull,
  stringArg,
  nullable,
} from "nexus";
import { join } from "path";

const PhisicalState = objectType({
  name: "PhisicalState",
  definition: (t) => {
    t.int("id"), t.string("name"), t.nullable.string("description");
  },
});

const PhisicalStates = extendType({
  type: "Query",
  definition: (t) => {
    t.list.field("phisicalStates", {
      type: PhisicalState,
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.phisicalState.findMany();
      },
    });
  },
});

const CreatePhisicalState = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("createPhisicalState", {
      type: PhisicalState,
      args: {
        name: nonNull(stringArg()),
        description: nullable(stringArg()),
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.phisicalState.create({
          data: {
            name: args.name,
            description: args.description,
          },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [PhisicalState, PhisicalStates, CreatePhisicalState],
  contextType: {
    module: join(process.cwd(), "src/graphql/context.ts"),
    export: "Context",
  },
  outputs: {
    schema: join(process.cwd(), "src/graphql/generated/schema.graphql"),
    typegen: join(process.cwd(), "src/graphql/generated/nexus-typegen.d.ts"),
  },
});

export { schema };
