import { GraphQLError } from "graphql";
import { Context } from "../graphql/context";

const authenticate = (context: Context) => {
  if (!context.user) throw new GraphQLError("Must authenticate");
};

export { authenticate };
