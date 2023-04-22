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
    "\n  query login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n": types.LoginDocument,
    "\n  query me {\n    me {\n      id\n      name\n      lastname\n      phone\n      description\n      username\n      role\n      institution {\n        id\n        name\n      }\n      countActiveLends\n      countCompletedLends\n      lends {\n        id\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query users($page: Int!) {\n    users(limit: 20, page: $page) {\n      rows {\n        id\n        name\n        username\n        role\n        phone\n        lastname\n        institution {\n          id\n          name\n        }\n        description\n        countCompletedLends\n        countActiveLends\n      }\n      length\n      pages\n    }\n  }\n": types.UsersDocument,
    "\n  mutation deleteUser($deleteUserId: Int!) {\n    deleteUser(id: $deleteUserId) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation createUser(\n    $name: String!\n    $lastname: String!\n    $username: String!\n    $password: String!\n    $role: String!\n    $phone: String\n    $description: String\n  ) {\n    createUser(\n      name: $name\n      lastname: $lastname\n      username: $username\n      password: $password\n      role: $role\n      phone: $phone\n      description: $description\n    ) {\n      id\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser(\n    $updateUserId: Int!\n    $name: String\n    $lastname: String\n    $phone: String\n    $description: String\n    $username: String\n    $role: String\n  ) {\n    updateUser(\n      id: $updateUserId\n      name: $name\n      lastname: $lastname\n      phone: $phone\n      description: $description\n      username: $username\n      role: $role\n    ) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
};

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
 */
export function graphql(source: "\n  query users($page: Int!) {\n    users(limit: 20, page: $page) {\n      rows {\n        id\n        name\n        username\n        role\n        phone\n        lastname\n        institution {\n          id\n          name\n        }\n        description\n        countCompletedLends\n        countActiveLends\n      }\n      length\n      pages\n    }\n  }\n"): (typeof documents)["\n  query users($page: Int!) {\n    users(limit: 20, page: $page) {\n      rows {\n        id\n        name\n        username\n        role\n        phone\n        lastname\n        institution {\n          id\n          name\n        }\n        description\n        countCompletedLends\n        countActiveLends\n      }\n      length\n      pages\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteUser($deleteUserId: Int!) {\n    deleteUser(id: $deleteUserId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteUser($deleteUserId: Int!) {\n    deleteUser(id: $deleteUserId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser(\n    $name: String!\n    $lastname: String!\n    $username: String!\n    $password: String!\n    $role: String!\n    $phone: String\n    $description: String\n  ) {\n    createUser(\n      name: $name\n      lastname: $lastname\n      username: $username\n      password: $password\n      role: $role\n      phone: $phone\n      description: $description\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createUser(\n    $name: String!\n    $lastname: String!\n    $username: String!\n    $password: String!\n    $role: String!\n    $phone: String\n    $description: String\n  ) {\n    createUser(\n      name: $name\n      lastname: $lastname\n      username: $username\n      password: $password\n      role: $role\n      phone: $phone\n      description: $description\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser(\n    $updateUserId: Int!\n    $name: String\n    $lastname: String\n    $phone: String\n    $description: String\n    $username: String\n    $role: String\n  ) {\n    updateUser(\n      id: $updateUserId\n      name: $name\n      lastname: $lastname\n      phone: $phone\n      description: $description\n      username: $username\n      role: $role\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser(\n    $updateUserId: Int!\n    $name: String\n    $lastname: String\n    $phone: String\n    $description: String\n    $username: String\n    $role: String\n  ) {\n    updateUser(\n      id: $updateUserId\n      name: $name\n      lastname: $lastname\n      phone: $phone\n      description: $description\n      username: $username\n      role: $role\n    ) {\n      id\n    }\n  }\n"];

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