import { graphql } from "../../graphql/generated/client";

const lendsQuery = graphql(`
  query lends($page: Int!) {
    lends(limit: 20, page: $page) {
      rows {
        user {
          id
          name
          lastname
        }
        realDueDate
        professor {
          id
          name
          lastname
        }
        id
        dueDate
        createdAt
        completed
        articles {
          article {
            id
            name
            phisicalState {
              id
              name
            }
            serial
          }
          count
        }
      }
      pages
      length
    }
  }
`);

export { lendsQuery };
