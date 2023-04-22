import { graphql } from "../../graphql/generated/client";

const usersQuery = graphql(`
  query users($page: Int!) {
    users(limit: 20, page: $page) {
      rows {
        id
        name
        username
        role
        phone
        lastname
        institution {
          id
          name
        }
        description
        countCompletedLends
        countActiveLends
      }
      length
      pages
    }
  }
`);

const deleteUserQuery = graphql(`
  mutation deleteUser($deleteUserId: Int!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`);

const createUserMutation = graphql(`
  mutation createUser(
    $name: String!
    $lastname: String!
    $username: String!
    $password: String!
    $role: String!
    $phone: String
    $description: String
  ) {
    createUser(
      name: $name
      lastname: $lastname
      username: $username
      password: $password
      role: $role
      phone: $phone
      description: $description
    ) {
      id
    }
  }
`);

const updateUserMutation = graphql(`
  mutation UpdateUser(
    $updateUserId: Int!
    $name: String
    $lastname: String
    $phone: String
    $description: String
    $username: String
    $role: String
  ) {
    updateUser(
      id: $updateUserId
      name: $name
      lastname: $lastname
      phone: $phone
      description: $description
      username: $username
      role: $role
    ) {
      id
    }
  }
`);

export { usersQuery, deleteUserQuery, createUserMutation, updateUserMutation };
