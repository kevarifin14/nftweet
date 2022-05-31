import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  /** delete data from the table: "nftweets" */
  delete_nftweets?: Maybe<Nftweets_Mutation_Response>;
  /** delete single row from the table: "nftweets" */
  delete_nftweets_by_pk?: Maybe<Nftweets>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "wallets" */
  delete_wallets?: Maybe<Wallets_Mutation_Response>;
  /** delete single row from the table: "wallets" */
  delete_wallets_by_pk?: Maybe<Wallets>;
  /** insert data into the table: "nftweets" */
  insert_nftweets?: Maybe<Nftweets_Mutation_Response>;
  /** insert a single row into the table: "nftweets" */
  insert_nftweets_one?: Maybe<Nftweets>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "wallets" */
  insert_wallets?: Maybe<Wallets_Mutation_Response>;
  /** insert a single row into the table: "wallets" */
  insert_wallets_one?: Maybe<Wallets>;
  /** update data of the table: "nftweets" */
  update_nftweets?: Maybe<Nftweets_Mutation_Response>;
  /** update single row of the table: "nftweets" */
  update_nftweets_by_pk?: Maybe<Nftweets>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "wallets" */
  update_wallets?: Maybe<Wallets_Mutation_Response>;
  /** update single row of the table: "wallets" */
  update_wallets_by_pk?: Maybe<Wallets>;
};

/** mutation root */
export type Mutation_RootDelete_NftweetsArgs = {
  where: Nftweets_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Nftweets_By_PkArgs = {
  mintKey: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_WalletsArgs = {
  where: Wallets_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Wallets_By_PkArgs = {
  key: Scalars["String"];
};

/** mutation root */
export type Mutation_RootInsert_NftweetsArgs = {
  objects: Array<Nftweets_Insert_Input>;
  on_conflict?: InputMaybe<Nftweets_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Nftweets_OneArgs = {
  object: Nftweets_Insert_Input;
  on_conflict?: InputMaybe<Nftweets_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_WalletsArgs = {
  objects: Array<Wallets_Insert_Input>;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Wallets_OneArgs = {
  object: Wallets_Insert_Input;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_NftweetsArgs = {
  _set?: InputMaybe<Nftweets_Set_Input>;
  where: Nftweets_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Nftweets_By_PkArgs = {
  _set?: InputMaybe<Nftweets_Set_Input>;
  pk_columns: Nftweets_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_WalletsArgs = {
  _set?: InputMaybe<Wallets_Set_Input>;
  where: Wallets_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Wallets_By_PkArgs = {
  _set?: InputMaybe<Wallets_Set_Input>;
  pk_columns: Wallets_Pk_Columns_Input;
};

/** columns and relationships of "nftweets" */
export type Nftweets = {
  __typename?: "nftweets";
  createdAt: Scalars["timestamptz"];
  mintKey: Scalars["String"];
  tweetId: Scalars["String"];
  userId: Scalars["uuid"];
};

/** aggregated selection of "nftweets" */
export type Nftweets_Aggregate = {
  __typename?: "nftweets_aggregate";
  aggregate?: Maybe<Nftweets_Aggregate_Fields>;
  nodes: Array<Nftweets>;
};

/** aggregate fields of "nftweets" */
export type Nftweets_Aggregate_Fields = {
  __typename?: "nftweets_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Nftweets_Max_Fields>;
  min?: Maybe<Nftweets_Min_Fields>;
};

/** aggregate fields of "nftweets" */
export type Nftweets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Nftweets_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "nftweets". All fields are combined with a logical 'AND'. */
export type Nftweets_Bool_Exp = {
  _and?: InputMaybe<Array<Nftweets_Bool_Exp>>;
  _not?: InputMaybe<Nftweets_Bool_Exp>;
  _or?: InputMaybe<Array<Nftweets_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  mintKey?: InputMaybe<String_Comparison_Exp>;
  tweetId?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "nftweets" */
export enum Nftweets_Constraint {
  /** unique or primary key constraint */
  NftweetsPkey = "nftweets_pkey",
}

/** input type for inserting data into table "nftweets" */
export type Nftweets_Insert_Input = {
  createdAt?: InputMaybe<Scalars["timestamptz"]>;
  mintKey?: InputMaybe<Scalars["String"]>;
  tweetId?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Nftweets_Max_Fields = {
  __typename?: "nftweets_max_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  mintKey?: Maybe<Scalars["String"]>;
  tweetId?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["uuid"]>;
};

/** aggregate min on columns */
export type Nftweets_Min_Fields = {
  __typename?: "nftweets_min_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  mintKey?: Maybe<Scalars["String"]>;
  tweetId?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["uuid"]>;
};

/** response of any mutation on the table "nftweets" */
export type Nftweets_Mutation_Response = {
  __typename?: "nftweets_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Nftweets>;
};

/** on conflict condition type for table "nftweets" */
export type Nftweets_On_Conflict = {
  constraint: Nftweets_Constraint;
  update_columns?: Array<Nftweets_Update_Column>;
  where?: InputMaybe<Nftweets_Bool_Exp>;
};

/** Ordering options when selecting data from "nftweets". */
export type Nftweets_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  mintKey?: InputMaybe<Order_By>;
  tweetId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: nftweets */
export type Nftweets_Pk_Columns_Input = {
  mintKey: Scalars["String"];
};

/** select columns of table "nftweets" */
export enum Nftweets_Select_Column {
  /** column name */
  CreatedAt = "createdAt",
  /** column name */
  MintKey = "mintKey",
  /** column name */
  TweetId = "tweetId",
  /** column name */
  UserId = "userId",
}

/** input type for updating data in table "nftweets" */
export type Nftweets_Set_Input = {
  createdAt?: InputMaybe<Scalars["timestamptz"]>;
  mintKey?: InputMaybe<Scalars["String"]>;
  tweetId?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "nftweets" */
export enum Nftweets_Update_Column {
  /** column name */
  CreatedAt = "createdAt",
  /** column name */
  MintKey = "mintKey",
  /** column name */
  TweetId = "tweetId",
  /** column name */
  UserId = "userId",
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "nftweets" */
  nftweets: Array<Nftweets>;
  /** fetch aggregated fields from the table: "nftweets" */
  nftweets_aggregate: Nftweets_Aggregate;
  /** fetch data from the table: "nftweets" using primary key columns */
  nftweets_by_pk?: Maybe<Nftweets>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "wallets" */
  wallets: Array<Wallets>;
  /** An aggregate relationship */
  wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "wallets" using primary key columns */
  wallets_by_pk?: Maybe<Wallets>;
};

export type Query_RootNftweetsArgs = {
  distinct_on?: InputMaybe<Array<Nftweets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nftweets_Order_By>>;
  where?: InputMaybe<Nftweets_Bool_Exp>;
};

export type Query_RootNftweets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nftweets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nftweets_Order_By>>;
  where?: InputMaybe<Nftweets_Bool_Exp>;
};

export type Query_RootNftweets_By_PkArgs = {
  mintKey: Scalars["String"];
};

export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

export type Query_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

export type Query_RootWallets_By_PkArgs = {
  key: Scalars["String"];
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "nftweets" */
  nftweets: Array<Nftweets>;
  /** fetch aggregated fields from the table: "nftweets" */
  nftweets_aggregate: Nftweets_Aggregate;
  /** fetch data from the table: "nftweets" using primary key columns */
  nftweets_by_pk?: Maybe<Nftweets>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "wallets" */
  wallets: Array<Wallets>;
  /** An aggregate relationship */
  wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "wallets" using primary key columns */
  wallets_by_pk?: Maybe<Wallets>;
};

export type Subscription_RootNftweetsArgs = {
  distinct_on?: InputMaybe<Array<Nftweets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nftweets_Order_By>>;
  where?: InputMaybe<Nftweets_Bool_Exp>;
};

export type Subscription_RootNftweets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nftweets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nftweets_Order_By>>;
  where?: InputMaybe<Nftweets_Bool_Exp>;
};

export type Subscription_RootNftweets_By_PkArgs = {
  mintKey: Scalars["String"];
};

export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

export type Subscription_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

export type Subscription_RootWallets_By_PkArgs = {
  key: Scalars["String"];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["timestamptz"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]>;
  _in?: InputMaybe<Array<Scalars["timestamptz"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]>;
  _nin?: InputMaybe<Array<Scalars["timestamptz"]>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: "users";
  createdAt: Scalars["timestamptz"];
  email?: Maybe<Scalars["String"]>;
  id: Scalars["uuid"];
  image: Scalars["String"];
  name: Scalars["String"];
  twitterUserId: Scalars["String"];
  updatedAt: Scalars["timestamptz"];
  /** fetch data from the table: "wallets" */
  wallets: Array<Wallets>;
  /** An aggregate relationship */
  wallets_aggregate: Wallets_Aggregate;
};

/** columns and relationships of "users" */
export type UsersWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: "users_aggregate";
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: "users_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  twitterUserId?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  wallets?: InputMaybe<Wallets_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = "users_pkey",
  /** unique or primary key constraint */
  UsersTwitterUserIdKey = "users_twitterUserId_key",
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  createdAt?: InputMaybe<Scalars["timestamptz"]>;
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  image?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  twitterUserId?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["timestamptz"]>;
  wallets?: InputMaybe<Wallets_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: "users_max_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  twitterUserId?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: "users_min_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  twitterUserId?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: "users_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  twitterUserId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  wallets_aggregate?: InputMaybe<Wallets_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = "createdAt",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  Image = "image",
  /** column name */
  Name = "name",
  /** column name */
  TwitterUserId = "twitterUserId",
  /** column name */
  UpdatedAt = "updatedAt",
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  createdAt?: InputMaybe<Scalars["timestamptz"]>;
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  image?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  twitterUserId?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["timestamptz"]>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = "createdAt",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  Image = "image",
  /** column name */
  Name = "name",
  /** column name */
  TwitterUserId = "twitterUserId",
  /** column name */
  UpdatedAt = "updatedAt",
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["uuid"]>;
  _gt?: InputMaybe<Scalars["uuid"]>;
  _gte?: InputMaybe<Scalars["uuid"]>;
  _in?: InputMaybe<Array<Scalars["uuid"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["uuid"]>;
  _lte?: InputMaybe<Scalars["uuid"]>;
  _neq?: InputMaybe<Scalars["uuid"]>;
  _nin?: InputMaybe<Array<Scalars["uuid"]>>;
};

/** columns and relationships of "wallets" */
export type Wallets = {
  __typename?: "wallets";
  key: Scalars["String"];
  /** An object relationship */
  user: Users;
  userId: Scalars["uuid"];
};

/** aggregated selection of "wallets" */
export type Wallets_Aggregate = {
  __typename?: "wallets_aggregate";
  aggregate?: Maybe<Wallets_Aggregate_Fields>;
  nodes: Array<Wallets>;
};

/** aggregate fields of "wallets" */
export type Wallets_Aggregate_Fields = {
  __typename?: "wallets_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Wallets_Max_Fields>;
  min?: Maybe<Wallets_Min_Fields>;
};

/** aggregate fields of "wallets" */
export type Wallets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wallets_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "wallets" */
export type Wallets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Wallets_Max_Order_By>;
  min?: InputMaybe<Wallets_Min_Order_By>;
};

/** input type for inserting array relation for remote table "wallets" */
export type Wallets_Arr_Rel_Insert_Input = {
  data: Array<Wallets_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "wallets". All fields are combined with a logical 'AND'. */
export type Wallets_Bool_Exp = {
  _and?: InputMaybe<Array<Wallets_Bool_Exp>>;
  _not?: InputMaybe<Wallets_Bool_Exp>;
  _or?: InputMaybe<Array<Wallets_Bool_Exp>>;
  key?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "wallets" */
export enum Wallets_Constraint {
  /** unique or primary key constraint */
  WalletsPkey = "wallets_pkey",
}

/** input type for inserting data into table "wallets" */
export type Wallets_Insert_Input = {
  key?: InputMaybe<Scalars["String"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Wallets_Max_Fields = {
  __typename?: "wallets_max_fields";
  key?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "wallets" */
export type Wallets_Max_Order_By = {
  key?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Wallets_Min_Fields = {
  __typename?: "wallets_min_fields";
  key?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "wallets" */
export type Wallets_Min_Order_By = {
  key?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "wallets" */
export type Wallets_Mutation_Response = {
  __typename?: "wallets_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Wallets>;
};

/** on conflict condition type for table "wallets" */
export type Wallets_On_Conflict = {
  constraint: Wallets_Constraint;
  update_columns?: Array<Wallets_Update_Column>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** Ordering options when selecting data from "wallets". */
export type Wallets_Order_By = {
  key?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: wallets */
export type Wallets_Pk_Columns_Input = {
  key: Scalars["String"];
};

/** select columns of table "wallets" */
export enum Wallets_Select_Column {
  /** column name */
  Key = "key",
  /** column name */
  UserId = "userId",
}

/** input type for updating data in table "wallets" */
export type Wallets_Set_Input = {
  key?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "wallets" */
export enum Wallets_Update_Column {
  /** column name */
  Key = "key",
  /** column name */
  UserId = "userId",
}

export type NftweetFieldsFragment = {
  __typename?: "nftweets";
  mintKey: string;
  tweetId: string;
  userId: any;
};

export type NftweetQueryVariables = Exact<{
  mintKey: Scalars["String"];
}>;

export type NftweetQuery = {
  __typename?: "query_root";
  nftweet?: {
    __typename?: "nftweets";
    mintKey: string;
    tweetId: string;
    userId: any;
  } | null;
};

export type NftweetsByTweetIdQueryVariables = Exact<{
  tweetId: Scalars["String"];
}>;

export type NftweetsByTweetIdQuery = {
  __typename?: "query_root";
  nftweets: Array<{
    __typename?: "nftweets";
    mintKey: string;
    tweetId: string;
    userId: any;
  }>;
};

export type AddNftweetMutationVariables = Exact<{
  mintKey: Scalars["String"];
  tweetId: Scalars["String"];
  userId: Scalars["uuid"];
}>;

export type AddNftweetMutation = {
  __typename?: "mutation_root";
  nftweet?: {
    __typename?: "nftweets";
    mintKey: string;
    tweetId: string;
    userId: any;
  } | null;
};

export type UserFieldsFragment = {
  __typename?: "users";
  id: any;
  twitterUserId: string;
  email?: string | null;
  name: string;
  image: string;
  wallets: Array<{ __typename?: "wallets"; key: string }>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "query_root";
  users: Array<{
    __typename?: "users";
    id: any;
    twitterUserId: string;
    email?: string | null;
    name: string;
    image: string;
    wallets: Array<{ __typename?: "wallets"; key: string }>;
  }>;
};

export type UsersByNameQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type UsersByNameQuery = {
  __typename?: "query_root";
  users: Array<{
    __typename?: "users";
    id: any;
    twitterUserId: string;
    email?: string | null;
    name: string;
    image: string;
    wallets: Array<{ __typename?: "wallets"; key: string }>;
  }>;
};

export type AddUserMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type AddUserMutation = {
  __typename?: "mutation_root";
  user?: {
    __typename?: "users";
    id: any;
    twitterUserId: string;
    email?: string | null;
    name: string;
    image: string;
    wallets: Array<{ __typename?: "wallets"; key: string }>;
  } | null;
};

export type UpsertUserMutationVariables = Exact<{
  twitterUserId: Scalars["String"];
  name: Scalars["String"];
  image: Scalars["String"];
  email?: InputMaybe<Scalars["String"]>;
}>;

export type UpsertUserMutation = {
  __typename?: "mutation_root";
  user?: {
    __typename?: "users";
    id: any;
    twitterUserId: string;
    email?: string | null;
    name: string;
    image: string;
    wallets: Array<{ __typename?: "wallets"; key: string }>;
  } | null;
};

export type WalletFieldsFragment = { __typename?: "wallets"; key: string };

export type AddWalletMutationVariables = Exact<{
  key: Scalars["String"];
  userId: Scalars["uuid"];
}>;

export type AddWalletMutation = {
  __typename?: "mutation_root";
  wallet?: { __typename?: "wallets"; key: string } | null;
};

export const NftweetFieldsFragmentDoc = gql`
  fragment NftweetFields on nftweets {
    mintKey
    tweetId
    userId
  }
`;
export const WalletFieldsFragmentDoc = gql`
  fragment WalletFields on wallets {
    key
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on users {
    id
    twitterUserId
    email
    name
    image
    wallets {
      ...WalletFields
    }
  }
  ${WalletFieldsFragmentDoc}
`;
export const NftweetDocument = gql`
  query Nftweet($mintKey: String!) {
    nftweet: nftweets_by_pk(mintKey: $mintKey) {
      ...NftweetFields
    }
  }
  ${NftweetFieldsFragmentDoc}
`;

/**
 * __useNftweetQuery__
 *
 * To run a query within a React component, call `useNftweetQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftweetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftweetQuery({
 *   variables: {
 *      mintKey: // value for 'mintKey'
 *   },
 * });
 */
export function useNftweetQuery(
  baseOptions: Apollo.QueryHookOptions<NftweetQuery, NftweetQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NftweetQuery, NftweetQueryVariables>(
    NftweetDocument,
    options
  );
}
export function useNftweetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NftweetQuery, NftweetQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NftweetQuery, NftweetQueryVariables>(
    NftweetDocument,
    options
  );
}
export type NftweetQueryHookResult = ReturnType<typeof useNftweetQuery>;
export type NftweetLazyQueryHookResult = ReturnType<typeof useNftweetLazyQuery>;
export type NftweetQueryResult = Apollo.QueryResult<
  NftweetQuery,
  NftweetQueryVariables
>;
export const NftweetsByTweetIdDocument = gql`
  query NftweetsByTweetId($tweetId: String!) {
    nftweets(where: { tweetId: { _eq: $tweetId } }) {
      ...NftweetFields
    }
  }
  ${NftweetFieldsFragmentDoc}
`;

/**
 * __useNftweetsByTweetIdQuery__
 *
 * To run a query within a React component, call `useNftweetsByTweetIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftweetsByTweetIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftweetsByTweetIdQuery({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useNftweetsByTweetIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    NftweetsByTweetIdQuery,
    NftweetsByTweetIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    NftweetsByTweetIdQuery,
    NftweetsByTweetIdQueryVariables
  >(NftweetsByTweetIdDocument, options);
}
export function useNftweetsByTweetIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NftweetsByTweetIdQuery,
    NftweetsByTweetIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    NftweetsByTweetIdQuery,
    NftweetsByTweetIdQueryVariables
  >(NftweetsByTweetIdDocument, options);
}
export type NftweetsByTweetIdQueryHookResult = ReturnType<
  typeof useNftweetsByTweetIdQuery
>;
export type NftweetsByTweetIdLazyQueryHookResult = ReturnType<
  typeof useNftweetsByTweetIdLazyQuery
>;
export type NftweetsByTweetIdQueryResult = Apollo.QueryResult<
  NftweetsByTweetIdQuery,
  NftweetsByTweetIdQueryVariables
>;
export const AddNftweetDocument = gql`
  mutation AddNftweet($mintKey: String!, $tweetId: String!, $userId: uuid!) {
    nftweet: insert_nftweets_one(
      object: { mintKey: $mintKey, tweetId: $tweetId, userId: $userId }
    ) {
      ...NftweetFields
    }
  }
  ${NftweetFieldsFragmentDoc}
`;
export type AddNftweetMutationFn = Apollo.MutationFunction<
  AddNftweetMutation,
  AddNftweetMutationVariables
>;

/**
 * __useAddNftweetMutation__
 *
 * To run a mutation, you first call `useAddNftweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNftweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNftweetMutation, { data, loading, error }] = useAddNftweetMutation({
 *   variables: {
 *      mintKey: // value for 'mintKey'
 *      tweetId: // value for 'tweetId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddNftweetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddNftweetMutation,
    AddNftweetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddNftweetMutation, AddNftweetMutationVariables>(
    AddNftweetDocument,
    options
  );
}
export type AddNftweetMutationHookResult = ReturnType<
  typeof useAddNftweetMutation
>;
export type AddNftweetMutationResult =
  Apollo.MutationResult<AddNftweetMutation>;
export type AddNftweetMutationOptions = Apollo.BaseMutationOptions<
  AddNftweetMutation,
  AddNftweetMutationVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
export const UsersByNameDocument = gql`
  query UsersByName($name: String!) {
    users(where: { name: { _eq: $name } }) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUsersByNameQuery__
 *
 * To run a query within a React component, call `useUsersByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUsersByNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    UsersByNameQuery,
    UsersByNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersByNameQuery, UsersByNameQueryVariables>(
    UsersByNameDocument,
    options
  );
}
export function useUsersByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UsersByNameQuery,
    UsersByNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersByNameQuery, UsersByNameQueryVariables>(
    UsersByNameDocument,
    options
  );
}
export type UsersByNameQueryHookResult = ReturnType<typeof useUsersByNameQuery>;
export type UsersByNameLazyQueryHookResult = ReturnType<
  typeof useUsersByNameLazyQuery
>;
export type UsersByNameQueryResult = Apollo.QueryResult<
  UsersByNameQuery,
  UsersByNameQueryVariables
>;
export const AddUserDocument = gql`
  mutation AddUser($email: String!) {
    user: insert_users_one(object: { email: $email }) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type AddUserMutationFn = Apollo.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserMutation,
    AddUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options
  );
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>;
export const UpsertUserDocument = gql`
  mutation UpsertUser(
    $twitterUserId: String!
    $name: String!
    $image: String!
    $email: String
  ) {
    user: insert_users_one(
      object: {
        email: $email
        name: $name
        image: $image
        twitterUserId: $twitterUserId
      }
      on_conflict: {
        constraint: users_twitterUserId_key
        update_columns: [name, image]
      }
    ) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type UpsertUserMutationFn = Apollo.MutationFunction<
  UpsertUserMutation,
  UpsertUserMutationVariables
>;

/**
 * __useUpsertUserMutation__
 *
 * To run a mutation, you first call `useUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserMutation, { data, loading, error }] = useUpsertUserMutation({
 *   variables: {
 *      twitterUserId: // value for 'twitterUserId'
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpsertUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertUserMutation,
    UpsertUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpsertUserMutation, UpsertUserMutationVariables>(
    UpsertUserDocument,
    options
  );
}
export type UpsertUserMutationHookResult = ReturnType<
  typeof useUpsertUserMutation
>;
export type UpsertUserMutationResult =
  Apollo.MutationResult<UpsertUserMutation>;
export type UpsertUserMutationOptions = Apollo.BaseMutationOptions<
  UpsertUserMutation,
  UpsertUserMutationVariables
>;
export const AddWalletDocument = gql`
  mutation AddWallet($key: String!, $userId: uuid!) {
    wallet: insert_wallets_one(object: { key: $key, userId: $userId }) {
      ...WalletFields
    }
  }
  ${WalletFieldsFragmentDoc}
`;
export type AddWalletMutationFn = Apollo.MutationFunction<
  AddWalletMutation,
  AddWalletMutationVariables
>;

/**
 * __useAddWalletMutation__
 *
 * To run a mutation, you first call `useAddWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWalletMutation, { data, loading, error }] = useAddWalletMutation({
 *   variables: {
 *      key: // value for 'key'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddWalletMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddWalletMutation,
    AddWalletMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddWalletMutation, AddWalletMutationVariables>(
    AddWalletDocument,
    options
  );
}
export type AddWalletMutationHookResult = ReturnType<
  typeof useAddWalletMutation
>;
export type AddWalletMutationResult = Apollo.MutationResult<AddWalletMutation>;
export type AddWalletMutationOptions = Apollo.BaseMutationOptions<
  AddWalletMutation,
  AddWalletMutationVariables
>;
