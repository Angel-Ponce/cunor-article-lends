import { graphql } from "../../graphql/generated/client";

const professorsQuery = graphql(`
  query professors($page: Int!) {
    professors(limit: 20, page: $page) {
      pages
      length
      rows {
        id
        name
        lastname
        personalRegister
        phone
      }
    }
  }
`);

const deleteProfessorMutation = graphql(`
  mutation deleteProfessor($deleteProfessorId: Int!) {
    deleteProfessor(id: $deleteProfessorId) {
      id
    }
  }
`);

const createProfessorMutation = graphql(`
  mutation createProfessor(
    $name: String!
    $lastname: String!
    $personalRegister: String!
    $phone: String
  ) {
    createProfessor(
      name: $name
      lastname: $lastname
      personalRegister: $personalRegister
      phone: $phone
    ) {
      id
    }
  }
`);

const updateProfessorMutation = graphql(`
  mutation updateProfessor(
    $updateProfessorId: Int!
    $name: String
    $lastname: String
    $phone: String
    $personalRegister: String
  ) {
    updateProfessor(
      id: $updateProfessorId
      name: $name
      lastname: $lastname
      phone: $phone
      personalRegister: $personalRegister
    ) {
      id
    }
  }
`);

export {
  professorsQuery,
  deleteProfessorMutation,
  createProfessorMutation,
  updateProfessorMutation,
};
