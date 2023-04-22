/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DateTime custom scalar type */
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  institution: Institution;
  name: Scalars['String'];
  phisicalState: PhisicalState;
  serial?: Maybe<Scalars['String']>;
};

export type ArticleLend = {
  __typename?: 'ArticleLend';
  article: Article;
  count: Scalars['Int'];
  finalPhisicalState?: Maybe<PhisicalState>;
  initialPhisicalState: PhisicalState;
  lend: Lend;
};

export type ArticlePage = {
  __typename?: 'ArticlePage';
  length: Scalars['Int'];
  pages: Scalars['Int'];
  rows: Array<Article>;
};

export type InputArticleLend = {
  articleId: Scalars['Int'];
  count: Scalars['Int'];
  phisicalStateId: Scalars['Int'];
};

export type InputArticleLendCompleted = {
  articleId: Scalars['Int'];
  phisicalStateId: Scalars['Int'];
};

export type Institution = {
  __typename?: 'Institution';
  countActiveLends: Scalars['Int'];
  countArticles: Scalars['Int'];
  countCompletedLends: Scalars['Int'];
  countPhisicalStates: Scalars['Int'];
  countProfessors: Scalars['Int'];
  countUsers: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type InstitutionPage = {
  __typename?: 'InstitutionPage';
  length: Scalars['Int'];
  pages: Scalars['Int'];
  rows: Array<Institution>;
};

export type Lend = {
  __typename?: 'Lend';
  articles: Array<ArticleLend>;
  completed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  dueDate: Scalars['DateTime'];
  id: Scalars['Int'];
  institution: Institution;
  professor: Professor;
  realDueDate?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LendPage = {
  __typename?: 'LendPage';
  length: Scalars['Int'];
  pages: Scalars['Int'];
  rows: Array<Lend>;
};

export type Mutation = {
  __typename?: 'Mutation';
  completeLend: Lend;
  createArticle: Article;
  createInstitution: Institution;
  createLend: Lend;
  createPhisicalState: PhisicalState;
  createProfessor: Professor;
  createUser: User;
  deleteArticle: Article;
  deleteInstitution: Institution;
  deleteLend: Lend;
  deletePhisicalState: PhisicalState;
  deleteProfessor: Professor;
  deleteUser: User;
  updateArticle: Article;
  updateInstitution: Institution;
  updatePassword: Scalars['String'];
  updatePhisicalState: PhisicalState;
  updateProfessor: Professor;
  updateUser: User;
};


export type MutationCompleteLendArgs = {
  articlesStates: Array<InputArticleLendCompleted>;
  id: Scalars['Int'];
};


export type MutationCreateArticleArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phisicalStateId: Scalars['Int'];
  serial?: InputMaybe<Scalars['String']>;
};


export type MutationCreateInstitutionArgs = {
  name: Scalars['String'];
};


export type MutationCreateLendArgs = {
  articles: Array<InputArticleLend>;
  dueDate: Scalars['DateTime'];
  professorId: Scalars['Int'];
};


export type MutationCreatePhisicalStateArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateProfessorArgs = {
  lastname: Scalars['String'];
  name: Scalars['String'];
  personalRegister: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  description?: InputMaybe<Scalars['String']>;
  lastname: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteInstitutionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteLendArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePhisicalStateArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProfessorArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateArticleArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  phisicalStateId?: InputMaybe<Scalars['Int']>;
  serial?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateInstitutionArgs = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
  userId: Scalars['Int'];
};


export type MutationUpdatePhisicalStateArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProfessorArgs = {
  id: Scalars['Int'];
  lastname?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  personalRegister?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  lastname?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type PhisicalState = {
  __typename?: 'PhisicalState';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  institution: Institution;
  name: Scalars['String'];
};

export type PhisicalStatePage = {
  __typename?: 'PhisicalStatePage';
  length: Scalars['Int'];
  pages: Scalars['Int'];
  rows: Array<PhisicalState>;
};

export type Professor = {
  __typename?: 'Professor';
  countActiveLends: Scalars['Int'];
  countCompletedLends: Scalars['Int'];
  id: Scalars['Int'];
  institution: Institution;
  lastname: Scalars['String'];
  lends: Array<Lend>;
  name: Scalars['String'];
  personalRegister: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
};

export type ProfessorPage = {
  __typename?: 'ProfessorPage';
  length: Scalars['Int'];
  pages: Scalars['Int'];
  rows: Array<Professor>;
};

export type Query = {
  __typename?: 'Query';
  article: Article;
  articles: ArticlePage;
  institution: Institution;
  institutions: InstitutionPage;
  lend: Lend;
  lends: LendPage;
  login?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  phisicalState: PhisicalState;
  phisicalStates: PhisicalStatePage;
  professor: Professor;
  professors: ProfessorPage;
  user: User;
  users: UserPage;
};


export type QueryArticleArgs = {
  id: Scalars['Int'];
};


export type QueryArticlesArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};


export type QueryInstitutionArgs = {
  id: Scalars['Int'];
};


export type QueryInstitutionsArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};


export type QueryLendArgs = {
  id: Scalars['Int'];
};


export type QueryLendsArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type QueryPhisicalStateArgs = {
  id: Scalars['Int'];
};


export type QueryPhisicalStatesArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};


export type QueryProfessorArgs = {
  id: Scalars['Int'];
};


export type QueryProfessorsArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  countActiveLends: Scalars['Int'];
  countCompletedLends: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  institution: Institution;
  lastname: Scalars['String'];
  lends: Array<Lend>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  username: Scalars['String'];
};

export type UserPage = {
  __typename?: 'UserPage';
  length: Scalars['Int'];
  pages: Scalars['Int'];
  rows: Array<User>;
};

export type LoginQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: string | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string, lastname: string, phone?: string | null, description?: string | null, username: string, role: string, countActiveLends: number, countCompletedLends: number, institution: { __typename?: 'Institution', id: number, name: string }, lends: Array<{ __typename?: 'Lend', id: number }> } | null };

export type UsersQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPage', length: number, pages: number, rows: Array<{ __typename?: 'User', id: number, name: string, username: string, role: string, phone?: string | null, lastname: string, description?: string | null, countCompletedLends: number, countActiveLends: number, institution: { __typename?: 'Institution', id: number, name: string } }> } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countActiveLends"}},{"kind":"Field","name":{"kind":"Name","value":"countCompletedLends"}},{"kind":"Field","name":{"kind":"Name","value":"lends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"countCompletedLends"}},{"kind":"Field","name":{"kind":"Name","value":"countActiveLends"}}]}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;