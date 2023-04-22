import { graphql } from "../../graphql/generated/client";

const allProfessorsQuery = graphql(`
  query allProfessors {
    professors(limit: -1) {
      rows {
        id
        name
        lastname
      }
    }
  }
`);

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
        countCompletedLends
        countActiveLends
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
  allProfessorsQuery,
};
