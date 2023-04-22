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

export { usersQuery };
