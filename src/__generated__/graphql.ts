/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Appointment = {
  __typename?: 'Appointment';
  author: User;
  createdAt: Scalars['Date']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
  subject: User;
  time: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  tokenExpiration?: Maybe<Scalars['Int']['output']>;
  user: User;
};

export type Log = {
  __typename?: 'Log';
  action: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNetwork?: Maybe<Network>;
  addReport?: Maybe<Report>;
  addSingleUserNetwork?: Maybe<Network>;
  addUser: AuthPayload;
  deleteNetwork?: Maybe<Network>;
  deleteReport?: Maybe<Report>;
  forgotPassword?: Maybe<Scalars['Int']['output']>;
  login: AuthPayload;
  removeSingleUserNetwork?: Maybe<Network>;
  updateReport?: Maybe<Report>;
};


export type MutationAddNetworkArgs = {
  networkInput?: InputMaybe<NetworkInput>;
};


export type MutationAddReportArgs = {
  reportInput?: InputMaybe<ReportInput>;
};


export type MutationAddSingleUserNetworkArgs = {
  networkInput?: InputMaybe<NetworkUpdateInput>;
};


export type MutationAddUserArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  signupInput?: InputMaybe<SignupInput>;
};


export type MutationDeleteNetworkArgs = {
  networkDeleteInput?: InputMaybe<NetworkDeleteInput>;
};


export type MutationDeleteReportArgs = {
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type MutationRemoveSingleUserNetworkArgs = {
  networkInput?: InputMaybe<NetworkUpdateInput>;
};


export type MutationUpdateReportArgs = {
  id: Scalars['ID']['input'];
  reportInput?: InputMaybe<ReportInput>;
};

export type Network = {
  __typename?: 'Network';
  allowed_users?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  author_id?: Maybe<User>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  permission?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type NetworkUser = {
  __typename?: 'NetworkUser';
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  permission?: Maybe<Scalars['String']['output']>;
};

export type Prescription = {
  __typename?: 'Prescription';
  appointment?: Maybe<Appointment>;
  author: User;
  createdAt: Scalars['Date']['output'];
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  subject: User;
};

export type Query = {
  __typename?: 'Query';
  getAllReports?: Maybe<Array<Maybe<Report>>>;
  getUserReports?: Maybe<Array<Maybe<Report>>>;
  logs: Array<Log>;
  network: Network;
  networks: Array<Network>;
  user: User;
  users: Array<User>;
};


export type QueryGetUserReportsArgs = {
  ReportPayload?: InputMaybe<ReportPayload>;
};


export type QueryNetworkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Report = {
  __typename?: 'Report';
  appointment?: Maybe<Appointment>;
  author: User;
  createdAt: Scalars['Date']['output'];
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  prescription: Prescription;
  subject: User;
};

export type ReportPayload = {
  author?: InputMaybe<Scalars['ID']['input']>;
  subject?: InputMaybe<Scalars['ID']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  loggedIn: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  logs?: Maybe<Array<Maybe<Log>>>;
  network?: Maybe<Array<Maybe<NetworkUser>>>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type NetworkDeleteInput = {
  allowed_users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  permission?: InputMaybe<Scalars['String']['input']>;
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export type NetworkInput = {
  allowed_users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  author_id?: InputMaybe<Scalars['ID']['input']>;
  permission?: InputMaybe<Scalars['String']['input']>;
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export type NetworkUpdateInput = {
  allowed_users?: InputMaybe<Scalars['ID']['input']>;
  permission?: InputMaybe<Scalars['String']['input']>;
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export type ReportInput = {
  appointment?: InputMaybe<Scalars['ID']['input']>;
  author: Scalars['ID']['input'];
  details: Scalars['String']['input'];
  prescription?: InputMaybe<Scalars['ID']['input']>;
  subject: Scalars['ID']['input'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
};
