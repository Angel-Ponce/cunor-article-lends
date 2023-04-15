import { objectType, nonNull as nexusNonNull } from "nexus";
import { NexusObjectTypeDef } from "nexus/dist/core";

const modelPage = <T extends string>(
  type: NexusObjectTypeDef<T>,
  name: string,
  nonNull = true
) => {
  return objectType({
    name,
    definition: (t) => {
      t.nonNull.list.field("rows", {
        type: nonNull ? nexusNonNull(type) : type,
      });
      t.nonNull.int("pages");
      t.nonNull.int("length");
    },
  });
};

export { modelPage };
