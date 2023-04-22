import { graphql } from "../../graphql/generated/client";

const phisicalStatesQuery = graphql(`
  query phisicalStates($page: Int!) {
    phisicalStates(limit: 20, page: $page) {
      rows {
        id
        name
        description
      }
      pages
      length
    }
  }
`);

const deletePhisicalStateMutation = graphql(`
  mutation deletePhisicalState($deletePhisicalStateId: Int!) {
    deletePhisicalState(id: $deletePhisicalStateId) {
      id
    }
  }
`);

const createPhisicalStateMutation = graphql(`
  mutation createPhisicalState($name: String!, $description: String) {
    createPhisicalState(name: $name, description: $description) {
      id
    }
  }
`);

const updatePhisicalStateMutation = graphql(`
  mutation updatePhisicalState(
    $updatePhisicalStateId: Int!
    $name: String
    $description: String
  ) {
    updatePhisicalState(
      id: $updatePhisicalStateId
      name: $name
      description: $description
    ) {
      id
    }
  }
`);

export {
  phisicalStatesQuery,
  deletePhisicalStateMutation,
  createPhisicalStateMutation,
  updatePhisicalStateMutation,
};
