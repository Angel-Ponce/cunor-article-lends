import { graphql } from "../../graphql/generated/client";

const allArticlesQuery = graphql(`
  query allArticles {
    articles(limit: -1) {
      rows {
        id
        name
        available
        serial
      }
    }
  }
`);

const articlesQuery = graphql(`
  query articles($page: Int!) {
    articles(limit: 20, page: $page) {
      pages
      length
      rows {
        id
        name
        description
        phisicalState {
          id
          name
        }
        serial
        available
      }
    }
  }
`);

const deleteArticleMutation = graphql(`
  mutation deleteArticle($deleteArticleId: Int!) {
    deleteArticle(id: $deleteArticleId) {
      id
    }
  }
`);

const createArticleMutation = graphql(`
  mutation createArticle(
    $name: String!
    $phisicalStateId: Int!
    $description: String
    $serial: String
  ) {
    createArticle(
      name: $name
      phisicalStateId: $phisicalStateId
      description: $description
      serial: $serial
    ) {
      id
    }
  }
`);

const updateArticleMutation = graphql(`
  mutation updateArticle(
    $updateArticleId: Int!
    $name: String
    $description: String
    $phisicalStateId: Int
    $serial: String
  ) {
    updateArticle(
      id: $updateArticleId
      name: $name
      description: $description
      phisicalStateId: $phisicalStateId
      serial: $serial
    ) {
      id
    }
  }
`);

export {
  articlesQuery,
  deleteArticleMutation,
  createArticleMutation,
  updateArticleMutation,
  allArticlesQuery,
};
