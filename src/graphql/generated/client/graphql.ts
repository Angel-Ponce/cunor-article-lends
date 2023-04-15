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

export type Institution = {
  __typename?: 'Institution';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInstitution: Institution;
  createPhisicalState: PhisicalState;
  deleteInstitution: Institution;
  updateInstitution: Institution;
};


export type MutationCreateInstitutionArgs = {
  name: Scalars['String'];
};


export type MutationCreatePhisicalStateArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationDeleteInstitutionArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateInstitutionArgs = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type PhisicalState = {
  __typename?: 'PhisicalState';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  institution: Institution;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  institution: Institution;
  phisicalState: PhisicalState;
};


export type QueryInstitutionArgs = {
  id: Scalars['Int'];
};


export type QueryPhisicalStateArgs = {
  id: Scalars['Int'];
};

export type InstitutionQueryVariables = Exact<{ [key: string]: never; }>;


export type InstitutionQuery = { __typename?: 'Query', institution: { __typename?: 'Institution', id: number, name: string } };


export const InstitutionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"institution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<InstitutionQuery, InstitutionQueryVariables>;