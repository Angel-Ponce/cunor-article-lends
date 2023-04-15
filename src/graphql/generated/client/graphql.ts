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
};

export type Mutation = {
  __typename?: 'Mutation';
  createPhisicalState: PhisicalState;
};


export type MutationCreatePhisicalStateArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type PhisicalState = {
  __typename?: 'PhisicalState';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  phisicalStates?: Maybe<Array<Maybe<PhisicalState>>>;
};

export type PhisicalStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type PhisicalStatesQuery = { __typename?: 'Query', phisicalStates?: Array<{ __typename?: 'PhisicalState', id?: number | null, name?: string | null, description?: string | null } | null> | null };


export const PhisicalStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PhisicalStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phisicalStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<PhisicalStatesQuery, PhisicalStatesQueryVariables>;