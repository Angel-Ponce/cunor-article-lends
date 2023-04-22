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
  DateTime: string;
};

export type Article = {
  __typename?: 'Article';
  available: Scalars['Boolean'];
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

export type UpdatePasswordMutationVariables = Exact<{
  userId: Scalars['Int'];
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: string };

export type AllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'ArticlePage', rows: Array<{ __typename?: 'Article', id: number, name: string, available: boolean }> } };

export type ArticlesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'ArticlePage', pages: number, length: number, rows: Array<{ __typename?: 'Article', id: number, name: string, description?: string | null, serial?: string | null, available: boolean, phisicalState: { __typename?: 'PhisicalState', id: number, name: string } }> } };

export type DeleteArticleMutationVariables = Exact<{
  deleteArticleId: Scalars['Int'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'Article', id: number } };

export type CreateArticleMutationVariables = Exact<{
  name: Scalars['String'];
  phisicalStateId: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: number } };

export type UpdateArticleMutationVariables = Exact<{
  updateArticleId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  phisicalStateId?: InputMaybe<Scalars['Int']>;
  serial?: InputMaybe<Scalars['String']>;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', id: number } };

export type LendsQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type LendsQuery = { __typename?: 'Query', lends: { __typename?: 'LendPage', pages: number, length: number, rows: Array<{ __typename?: 'Lend', realDueDate?: string | null, id: number, dueDate: string, createdAt: string, completed: boolean, user: { __typename?: 'User', id: number, name: string, lastname: string }, professor: { __typename?: 'Professor', id: number, name: string, lastname: string }, articles: Array<{ __typename?: 'ArticleLend', count: number, article: { __typename?: 'Article', id: number, name: string, serial?: string | null, phisicalState: { __typename?: 'PhisicalState', id: number, name: string } } }> }> } };

export type CreateLendMutationVariables = Exact<{
  professorId: Scalars['Int'];
  dueDate: Scalars['DateTime'];
  articles: Array<InputArticleLend> | InputArticleLend;
}>;


export type CreateLendMutation = { __typename?: 'Mutation', createLend: { __typename?: 'Lend', id: number } };

export type CompleteLendMutationVariables = Exact<{
  completeLendId: Scalars['Int'];
  articlesStates: Array<InputArticleLendCompleted> | InputArticleLendCompleted;
}>;


export type CompleteLendMutation = { __typename?: 'Mutation', completeLend: { __typename?: 'Lend', id: number } };

export type DeleteLendMutationVariables = Exact<{
  deleteLendId: Scalars['Int'];
}>;


export type DeleteLendMutation = { __typename?: 'Mutation', deleteLend: { __typename?: 'Lend', id: number } };

export type LoginQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: string | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string, lastname: string, phone?: string | null, description?: string | null, username: string, role: string, countActiveLends: number, countCompletedLends: number, institution: { __typename?: 'Institution', id: number, name: string }, lends: Array<{ __typename?: 'Lend', id: number }> } | null };

export type AllPhisicalStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPhisicalStatesQuery = { __typename?: 'Query', phisicalStates: { __typename?: 'PhisicalStatePage', rows: Array<{ __typename?: 'PhisicalState', value: number, label: string }> } };

export type PhisicalStatesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type PhisicalStatesQuery = { __typename?: 'Query', phisicalStates: { __typename?: 'PhisicalStatePage', pages: number, length: number, rows: Array<{ __typename?: 'PhisicalState', id: number, name: string, description?: string | null }> } };

export type DeletePhisicalStateMutationVariables = Exact<{
  deletePhisicalStateId: Scalars['Int'];
}>;


export type DeletePhisicalStateMutation = { __typename?: 'Mutation', deletePhisicalState: { __typename?: 'PhisicalState', id: number } };

export type CreatePhisicalStateMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreatePhisicalStateMutation = { __typename?: 'Mutation', createPhisicalState: { __typename?: 'PhisicalState', id: number } };

export type UpdatePhisicalStateMutationVariables = Exact<{
  updatePhisicalStateId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePhisicalStateMutation = { __typename?: 'Mutation', updatePhisicalState: { __typename?: 'PhisicalState', id: number } };

export type AllProfessorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProfessorsQuery = { __typename?: 'Query', professors: { __typename?: 'ProfessorPage', rows: Array<{ __typename?: 'Professor', id: number, name: string, lastname: string }> } };

export type ProfessorsQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type ProfessorsQuery = { __typename?: 'Query', professors: { __typename?: 'ProfessorPage', pages: number, length: number, rows: Array<{ __typename?: 'Professor', id: number, name: string, lastname: string, personalRegister: string, phone?: string | null }> } };

export type DeleteProfessorMutationVariables = Exact<{
  deleteProfessorId: Scalars['Int'];
}>;


export type DeleteProfessorMutation = { __typename?: 'Mutation', deleteProfessor: { __typename?: 'Professor', id: number } };

export type CreateProfessorMutationVariables = Exact<{
  name: Scalars['String'];
  lastname: Scalars['String'];
  personalRegister: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
}>;


export type CreateProfessorMutation = { __typename?: 'Mutation', createProfessor: { __typename?: 'Professor', id: number } };

export type UpdateProfessorMutationVariables = Exact<{
  updateProfessorId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  personalRegister?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfessorMutation = { __typename?: 'Mutation', updateProfessor: { __typename?: 'Professor', id: number } };

export type UsersQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPage', length: number, pages: number, rows: Array<{ __typename?: 'User', id: number, name: string, username: string, role: string, phone?: string | null, lastname: string, description?: string | null, countCompletedLends: number, countActiveLends: number, institution: { __typename?: 'Institution', id: number, name: string } }> } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: number } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number } };

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number } };


export const UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const AllArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}}]}}]}}]} as unknown as DocumentNode<AllArticlesQuery, AllArticlesQueryVariables>;
export const ArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"articles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"phisicalState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serial"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}}]}}]}}]} as unknown as DocumentNode<ArticlesQuery, ArticlesQueryVariables>;
export const DeleteArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteArticleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteArticleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const CreateArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phisicalStateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serial"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phisicalStateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phisicalStateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"serial"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serial"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateArticleMutation, CreateArticleMutationVariables>;
export const UpdateArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateArticleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phisicalStateId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serial"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateArticleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"phisicalStateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phisicalStateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"serial"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serial"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const LendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"lends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"realDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"professor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"article"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phisicalState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serial"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]} as unknown as DocumentNode<LendsQuery, LendsQueryVariables>;
export const CreateLendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"professorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dueDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articles"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputArticleLend"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"professorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"professorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dueDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dueDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"articles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articles"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLendMutation, CreateLendMutationVariables>;
export const CompleteLendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteLend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"completeLendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articlesStates"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputArticleLendCompleted"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeLend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"completeLendId"}}},{"kind":"Argument","name":{"kind":"Name","value":"articlesStates"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articlesStates"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CompleteLendMutation, CompleteLendMutationVariables>;
export const DeleteLendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteLend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteLendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteLendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteLendMutation, DeleteLendMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countActiveLends"}},{"kind":"Field","name":{"kind":"Name","value":"countCompletedLends"}},{"kind":"Field","name":{"kind":"Name","value":"lends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const AllPhisicalStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allPhisicalStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phisicalStates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"value"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"label"},"name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AllPhisicalStatesQuery, AllPhisicalStatesQueryVariables>;
export const PhisicalStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"phisicalStates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phisicalStates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]} as unknown as DocumentNode<PhisicalStatesQuery, PhisicalStatesQueryVariables>;
export const DeletePhisicalStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePhisicalState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePhisicalStateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePhisicalState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePhisicalStateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePhisicalStateMutation, DeletePhisicalStateMutationVariables>;
export const CreatePhisicalStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPhisicalState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPhisicalState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePhisicalStateMutation, CreatePhisicalStateMutationVariables>;
export const UpdatePhisicalStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePhisicalState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePhisicalStateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePhisicalState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePhisicalStateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePhisicalStateMutation, UpdatePhisicalStateMutationVariables>;
export const AllProfessorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allProfessors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"professors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}}]}}]}}]} as unknown as DocumentNode<AllProfessorsQuery, AllProfessorsQueryVariables>;
export const ProfessorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"professors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"professors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"personalRegister"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<ProfessorsQuery, ProfessorsQueryVariables>;
export const DeleteProfessorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProfessor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteProfessorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProfessor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteProfessorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteProfessorMutation, DeleteProfessorMutationVariables>;
export const CreateProfessorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProfessor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personalRegister"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfessor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}}},{"kind":"Argument","name":{"kind":"Name","value":"personalRegister"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personalRegister"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProfessorMutation, CreateProfessorMutationVariables>;
export const UpdateProfessorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfessor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfessorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personalRegister"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfessor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfessorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"personalRegister"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personalRegister"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProfessorMutation, UpdateProfessorMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"countCompletedLends"}},{"kind":"Field","name":{"kind":"Name","value":"countActiveLends"}}]}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastname"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;