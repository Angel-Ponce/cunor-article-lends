/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query institution {\n    institution(id: 1) {\n      id\n      name\n    }\n  }\n": types.InstitutionDocument,
    "\n  query login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n": types.LoginDocument,
    "\n  query me {\n    me {\n      id\n      name\n      lastname\n      phone\n      description\n      username\n      role\n      institution {\n        id\n        name\n      }\n      countActiveLends\n      countCompletedLends\n      lends {\n        id\n      }\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query institution {\n    institution(id: 1) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query institution {\n    institution(id: 1) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  query login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      id\n      name\n      lastname\n      phone\n      description\n      username\n      role\n      institution {\n        id\n        name\n      }\n      countActiveLends\n      countCompletedLends\n      lends {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      name\n      lastname\n      phone\n      description\n      username\n      role\n      institution {\n        id\n        name\n      }\n      countActiveLends\n      countCompletedLends\n      lends {\n        id\n      }\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;