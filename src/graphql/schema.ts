import { makeSchema } from "nexus";
import { join } from "path";
import institutionsTypes from "./app/institutions";

const schema = makeSchema({
  types: [...institutionsTypes],
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
