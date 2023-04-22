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

const createLendMutation = graphql(`
  mutation createLend(
    $professorId: Int!
    $dueDate: DateTime!
    $articles: [InputArticleLend!]!
  ) {
    createLend(
      professorId: $professorId
      dueDate: $dueDate
      articles: $articles
    ) {
      id
    }
  }
`);

const completeLendMutation = graphql(`
  mutation CompleteLend(
    $completeLendId: Int!
    $articlesStates: [InputArticleLendCompleted!]!
  ) {
    completeLend(id: $completeLendId, articlesStates: $articlesStates) {
      id
    }
  }
`);

const deleteLendMutation = graphql(`
  mutation deleteLend($deleteLendId: Int!) {
    deleteLend(id: $deleteLendId) {
      id
    }
  }
`);

export {
  lendsQuery,
  createLendMutation,
  completeLendMutation,
  deleteLendMutation,
};
