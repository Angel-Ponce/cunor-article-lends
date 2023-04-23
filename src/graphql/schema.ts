import { makeSchema } from "nexus";
import { join } from "path";
import institutionTypes from "./app/Inst";
import phisicalStateTypes from "./app/PhisicalState";
import userTypes from "./app/User";
import articleTypes from "./app/Article";
import professorTypes from "./app/Professor";
import lendTypes from "./app/Lend";

const schema = makeSchema({
  types: [
    ...institutionTypes,
    ...phisicalStateTypes,
    ...userTypes,
    ...articleTypes,
    ...professorTypes,
    ...lendTypes,
  ],
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
