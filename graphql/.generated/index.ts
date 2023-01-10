import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query'
import { useFetch } from 'fetch'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  bpchar: any
  date: any
  json: any
  jsonb: any
  numeric: any
  timestamptz: any
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>
  _gt?: InputMaybe<Scalars['Boolean']>
  _gte?: InputMaybe<Scalars['Boolean']>
  _in?: InputMaybe<Array<Scalars['Boolean']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Boolean']>
  _lte?: InputMaybe<Scalars['Boolean']>
  _neq?: InputMaybe<Scalars['Boolean']>
  _nin?: InputMaybe<Array<Scalars['Boolean']>>
}

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Float']>
  _gt?: InputMaybe<Scalars['Float']>
  _gte?: InputMaybe<Scalars['Float']>
  _in?: InputMaybe<Array<Scalars['Float']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Float']>
  _lte?: InputMaybe<Scalars['Float']>
  _neq?: InputMaybe<Scalars['Float']>
  _nin?: InputMaybe<Array<Scalars['Float']>>
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>
  _gt?: InputMaybe<Scalars['Int']>
  _gte?: InputMaybe<Scalars['Int']>
  _in?: InputMaybe<Array<Scalars['Int']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Int']>
  _lte?: InputMaybe<Scalars['Int']>
  _neq?: InputMaybe<Scalars['Int']>
  _nin?: InputMaybe<Array<Scalars['Int']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>
  _gt?: InputMaybe<Scalars['String']>
  _gte?: InputMaybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>
  _in?: InputMaybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>
  _is_null?: InputMaybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>
  _lt?: InputMaybe<Scalars['String']>
  _lte?: InputMaybe<Scalars['String']>
  _neq?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>
  _nin?: InputMaybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>
}

export type Video = {
  __typename?: 'Video'
  id: Scalars['Int']
  videoUrl: Scalars['String']
}

/** columns and relationships of "assessment_orders" */
export type Assessment_Orders = {
  __typename?: 'assessment_orders'
  administration_notes?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  provider_id?: Maybe<Scalars['Int']>
  results?: Maybe<Scalars['jsonb']>
  status: Scalars['String']
  type: Scalars['String']
  unread?: Maybe<Scalars['Boolean']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id: Scalars['Int']
}

/** columns and relationships of "assessment_orders" */
export type Assessment_OrdersResultsArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** aggregated selection of "assessment_orders" */
export type Assessment_Orders_Aggregate = {
  __typename?: 'assessment_orders_aggregate'
  aggregate?: Maybe<Assessment_Orders_Aggregate_Fields>
  nodes: Array<Assessment_Orders>
}

/** aggregate fields of "assessment_orders" */
export type Assessment_Orders_Aggregate_Fields = {
  __typename?: 'assessment_orders_aggregate_fields'
  avg?: Maybe<Assessment_Orders_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Assessment_Orders_Max_Fields>
  min?: Maybe<Assessment_Orders_Min_Fields>
  stddev?: Maybe<Assessment_Orders_Stddev_Fields>
  stddev_pop?: Maybe<Assessment_Orders_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Assessment_Orders_Stddev_Samp_Fields>
  sum?: Maybe<Assessment_Orders_Sum_Fields>
  var_pop?: Maybe<Assessment_Orders_Var_Pop_Fields>
  var_samp?: Maybe<Assessment_Orders_Var_Samp_Fields>
  variance?: Maybe<Assessment_Orders_Variance_Fields>
}

/** aggregate fields of "assessment_orders" */
export type Assessment_Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Assessment_Orders_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Assessment_Orders_Append_Input = {
  results?: InputMaybe<Scalars['jsonb']>
}

/** aggregate avg on columns */
export type Assessment_Orders_Avg_Fields = {
  __typename?: 'assessment_orders_avg_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "assessment_orders". All fields are combined with a logical 'AND'. */
export type Assessment_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Assessment_Orders_Bool_Exp>>
  _not?: InputMaybe<Assessment_Orders_Bool_Exp>
  _or?: InputMaybe<Array<Assessment_Orders_Bool_Exp>>
  administration_notes?: InputMaybe<String_Comparison_Exp>
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  facilitator_id?: InputMaybe<Int_Comparison_Exp>
  follow_up_instructions?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  provider_id?: InputMaybe<Int_Comparison_Exp>
  results?: InputMaybe<Jsonb_Comparison_Exp>
  status?: InputMaybe<String_Comparison_Exp>
  type?: InputMaybe<String_Comparison_Exp>
  unread?: InputMaybe<Boolean_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "assessment_orders" */
export enum Assessment_Orders_Constraint {
  /** unique or primary key constraint */
  AssessmentOrdersPkey = 'assessment_orders_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Assessment_Orders_Delete_At_Path_Input = {
  results?: InputMaybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Assessment_Orders_Delete_Elem_Input = {
  results?: InputMaybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Assessment_Orders_Delete_Key_Input = {
  results?: InputMaybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "assessment_orders" */
export type Assessment_Orders_Inc_Input = {
  facilitator_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "assessment_orders" */
export type Assessment_Orders_Insert_Input = {
  administration_notes?: InputMaybe<Scalars['String']>
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  provider_id?: InputMaybe<Scalars['Int']>
  results?: InputMaybe<Scalars['jsonb']>
  status?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Assessment_Orders_Max_Fields = {
  __typename?: 'assessment_orders_max_fields'
  administration_notes?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Assessment_Orders_Min_Fields = {
  __typename?: 'assessment_orders_min_fields'
  administration_notes?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "assessment_orders" */
export type Assessment_Orders_Mutation_Response = {
  __typename?: 'assessment_orders_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Assessment_Orders>
}

/** on conflict condition type for table "assessment_orders" */
export type Assessment_Orders_On_Conflict = {
  constraint: Assessment_Orders_Constraint
  update_columns?: Array<Assessment_Orders_Update_Column>
  where?: InputMaybe<Assessment_Orders_Bool_Exp>
}

/** Ordering options when selecting data from "assessment_orders". */
export type Assessment_Orders_Order_By = {
  administration_notes?: InputMaybe<Order_By>
  completed_at?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  follow_up_instructions?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  results?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  unread?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: assessment_orders */
export type Assessment_Orders_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Assessment_Orders_Prepend_Input = {
  results?: InputMaybe<Scalars['jsonb']>
}

/** select columns of table "assessment_orders" */
export enum Assessment_Orders_Select_Column {
  /** column name */
  AdministrationNotes = 'administration_notes',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  Results = 'results',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "assessment_orders" */
export type Assessment_Orders_Set_Input = {
  administration_notes?: InputMaybe<Scalars['String']>
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  provider_id?: InputMaybe<Scalars['Int']>
  results?: InputMaybe<Scalars['jsonb']>
  status?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Assessment_Orders_Stddev_Fields = {
  __typename?: 'assessment_orders_stddev_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Assessment_Orders_Stddev_Pop_Fields = {
  __typename?: 'assessment_orders_stddev_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Assessment_Orders_Stddev_Samp_Fields = {
  __typename?: 'assessment_orders_stddev_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Assessment_Orders_Sum_Fields = {
  __typename?: 'assessment_orders_sum_fields'
  facilitator_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** update columns of table "assessment_orders" */
export enum Assessment_Orders_Update_Column {
  /** column name */
  AdministrationNotes = 'administration_notes',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  Results = 'results',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Assessment_Orders_Var_Pop_Fields = {
  __typename?: 'assessment_orders_var_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Assessment_Orders_Var_Samp_Fields = {
  __typename?: 'assessment_orders_var_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Assessment_Orders_Variance_Fields = {
  __typename?: 'assessment_orders_variance_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to compare columns of type "bpchar". All fields are combined with logical 'AND'. */
export type Bpchar_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bpchar']>
  _gt?: InputMaybe<Scalars['bpchar']>
  _gte?: InputMaybe<Scalars['bpchar']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['bpchar']>
  _in?: InputMaybe<Array<Scalars['bpchar']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['bpchar']>
  _is_null?: InputMaybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['bpchar']>
  _lt?: InputMaybe<Scalars['bpchar']>
  _lte?: InputMaybe<Scalars['bpchar']>
  _neq?: InputMaybe<Scalars['bpchar']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['bpchar']>
  _nin?: InputMaybe<Array<Scalars['bpchar']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['bpchar']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['bpchar']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['bpchar']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['bpchar']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['bpchar']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['bpchar']>
}

/** columns and relationships of "clearance_notes" */
export type Clearance_Notes = {
  __typename?: 'clearance_notes'
  clearance_status: Scalars['String']
  created_at?: Maybe<Scalars['timestamptz']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  not_cleared_details?: Maybe<Scalars['String']>
  not_cleared_reason?: Maybe<Scalars['String']>
  pre_clearance_evaluation?: Maybe<Scalars['String']>
  provider_credentials: Scalars['bpchar']
  provider_first_name: Scalars['String']
  provider_id: Scalars['Int']
  provider_last_name: Scalars['String']
  provider_recommendation?: Maybe<Scalars['String']>
  provider_signature: Scalars['String']
  provider_signature_date_time: Scalars['String']
  updated_at?: Maybe<Scalars['timestamptz']>
  /** An object relationship */
  visit: Visits
  visit_id: Scalars['Int']
}

/** aggregated selection of "clearance_notes" */
export type Clearance_Notes_Aggregate = {
  __typename?: 'clearance_notes_aggregate'
  aggregate?: Maybe<Clearance_Notes_Aggregate_Fields>
  nodes: Array<Clearance_Notes>
}

/** aggregate fields of "clearance_notes" */
export type Clearance_Notes_Aggregate_Fields = {
  __typename?: 'clearance_notes_aggregate_fields'
  avg?: Maybe<Clearance_Notes_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Clearance_Notes_Max_Fields>
  min?: Maybe<Clearance_Notes_Min_Fields>
  stddev?: Maybe<Clearance_Notes_Stddev_Fields>
  stddev_pop?: Maybe<Clearance_Notes_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Clearance_Notes_Stddev_Samp_Fields>
  sum?: Maybe<Clearance_Notes_Sum_Fields>
  var_pop?: Maybe<Clearance_Notes_Var_Pop_Fields>
  var_samp?: Maybe<Clearance_Notes_Var_Samp_Fields>
  variance?: Maybe<Clearance_Notes_Variance_Fields>
}

/** aggregate fields of "clearance_notes" */
export type Clearance_Notes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Clearance_Notes_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Clearance_Notes_Avg_Fields = {
  __typename?: 'clearance_notes_avg_fields'
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "clearance_notes". All fields are combined with a logical 'AND'. */
export type Clearance_Notes_Bool_Exp = {
  _and?: InputMaybe<Array<Clearance_Notes_Bool_Exp>>
  _not?: InputMaybe<Clearance_Notes_Bool_Exp>
  _or?: InputMaybe<Array<Clearance_Notes_Bool_Exp>>
  clearance_status?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  not_cleared_details?: InputMaybe<String_Comparison_Exp>
  not_cleared_reason?: InputMaybe<String_Comparison_Exp>
  pre_clearance_evaluation?: InputMaybe<String_Comparison_Exp>
  provider_credentials?: InputMaybe<Bpchar_Comparison_Exp>
  provider_first_name?: InputMaybe<String_Comparison_Exp>
  provider_id?: InputMaybe<Int_Comparison_Exp>
  provider_last_name?: InputMaybe<String_Comparison_Exp>
  provider_recommendation?: InputMaybe<String_Comparison_Exp>
  provider_signature?: InputMaybe<String_Comparison_Exp>
  provider_signature_date_time?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  visit?: InputMaybe<Visits_Bool_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "clearance_notes" */
export enum Clearance_Notes_Constraint {
  /** unique or primary key constraint */
  ClearanceNotesPkey = 'clearance_notes_pkey',
  /** unique or primary key constraint */
  ClearanceNotesVisitIdKey = 'clearance_notes_visit_id_key',
}

/** input type for incrementing numeric columns in table "clearance_notes" */
export type Clearance_Notes_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "clearance_notes" */
export type Clearance_Notes_Insert_Input = {
  clearance_status?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  not_cleared_details?: InputMaybe<Scalars['String']>
  not_cleared_reason?: InputMaybe<Scalars['String']>
  pre_clearance_evaluation?: InputMaybe<Scalars['String']>
  provider_credentials?: InputMaybe<Scalars['bpchar']>
  provider_first_name?: InputMaybe<Scalars['String']>
  provider_id?: InputMaybe<Scalars['Int']>
  provider_last_name?: InputMaybe<Scalars['String']>
  provider_recommendation?: InputMaybe<Scalars['String']>
  provider_signature?: InputMaybe<Scalars['String']>
  provider_signature_date_time?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit?: InputMaybe<Visits_Obj_Rel_Insert_Input>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Clearance_Notes_Max_Fields = {
  __typename?: 'clearance_notes_max_fields'
  clearance_status?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
  not_cleared_details?: Maybe<Scalars['String']>
  not_cleared_reason?: Maybe<Scalars['String']>
  pre_clearance_evaluation?: Maybe<Scalars['String']>
  provider_credentials?: Maybe<Scalars['bpchar']>
  provider_first_name?: Maybe<Scalars['String']>
  provider_id?: Maybe<Scalars['Int']>
  provider_last_name?: Maybe<Scalars['String']>
  provider_recommendation?: Maybe<Scalars['String']>
  provider_signature?: Maybe<Scalars['String']>
  provider_signature_date_time?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Clearance_Notes_Min_Fields = {
  __typename?: 'clearance_notes_min_fields'
  clearance_status?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
  not_cleared_details?: Maybe<Scalars['String']>
  not_cleared_reason?: Maybe<Scalars['String']>
  pre_clearance_evaluation?: Maybe<Scalars['String']>
  provider_credentials?: Maybe<Scalars['bpchar']>
  provider_first_name?: Maybe<Scalars['String']>
  provider_id?: Maybe<Scalars['Int']>
  provider_last_name?: Maybe<Scalars['String']>
  provider_recommendation?: Maybe<Scalars['String']>
  provider_signature?: Maybe<Scalars['String']>
  provider_signature_date_time?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "clearance_notes" */
export type Clearance_Notes_Mutation_Response = {
  __typename?: 'clearance_notes_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Clearance_Notes>
}

/** input type for inserting object relation for remote table "clearance_notes" */
export type Clearance_Notes_Obj_Rel_Insert_Input = {
  data: Clearance_Notes_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Clearance_Notes_On_Conflict>
}

/** on conflict condition type for table "clearance_notes" */
export type Clearance_Notes_On_Conflict = {
  constraint: Clearance_Notes_Constraint
  update_columns?: Array<Clearance_Notes_Update_Column>
  where?: InputMaybe<Clearance_Notes_Bool_Exp>
}

/** Ordering options when selecting data from "clearance_notes". */
export type Clearance_Notes_Order_By = {
  clearance_status?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  not_cleared_details?: InputMaybe<Order_By>
  not_cleared_reason?: InputMaybe<Order_By>
  pre_clearance_evaluation?: InputMaybe<Order_By>
  provider_credentials?: InputMaybe<Order_By>
  provider_first_name?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  provider_last_name?: InputMaybe<Order_By>
  provider_recommendation?: InputMaybe<Order_By>
  provider_signature?: InputMaybe<Order_By>
  provider_signature_date_time?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit?: InputMaybe<Visits_Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: clearance_notes */
export type Clearance_Notes_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "clearance_notes" */
export enum Clearance_Notes_Select_Column {
  /** column name */
  ClearanceStatus = 'clearance_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  NotClearedDetails = 'not_cleared_details',
  /** column name */
  NotClearedReason = 'not_cleared_reason',
  /** column name */
  PreClearanceEvaluation = 'pre_clearance_evaluation',
  /** column name */
  ProviderCredentials = 'provider_credentials',
  /** column name */
  ProviderFirstName = 'provider_first_name',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ProviderLastName = 'provider_last_name',
  /** column name */
  ProviderRecommendation = 'provider_recommendation',
  /** column name */
  ProviderSignature = 'provider_signature',
  /** column name */
  ProviderSignatureDateTime = 'provider_signature_date_time',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "clearance_notes" */
export type Clearance_Notes_Set_Input = {
  clearance_status?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  not_cleared_details?: InputMaybe<Scalars['String']>
  not_cleared_reason?: InputMaybe<Scalars['String']>
  pre_clearance_evaluation?: InputMaybe<Scalars['String']>
  provider_credentials?: InputMaybe<Scalars['bpchar']>
  provider_first_name?: InputMaybe<Scalars['String']>
  provider_id?: InputMaybe<Scalars['Int']>
  provider_last_name?: InputMaybe<Scalars['String']>
  provider_recommendation?: InputMaybe<Scalars['String']>
  provider_signature?: InputMaybe<Scalars['String']>
  provider_signature_date_time?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Clearance_Notes_Stddev_Fields = {
  __typename?: 'clearance_notes_stddev_fields'
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Clearance_Notes_Stddev_Pop_Fields = {
  __typename?: 'clearance_notes_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Clearance_Notes_Stddev_Samp_Fields = {
  __typename?: 'clearance_notes_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Clearance_Notes_Sum_Fields = {
  __typename?: 'clearance_notes_sum_fields'
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** update columns of table "clearance_notes" */
export enum Clearance_Notes_Update_Column {
  /** column name */
  ClearanceStatus = 'clearance_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  NotClearedDetails = 'not_cleared_details',
  /** column name */
  NotClearedReason = 'not_cleared_reason',
  /** column name */
  PreClearanceEvaluation = 'pre_clearance_evaluation',
  /** column name */
  ProviderCredentials = 'provider_credentials',
  /** column name */
  ProviderFirstName = 'provider_first_name',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ProviderLastName = 'provider_last_name',
  /** column name */
  ProviderRecommendation = 'provider_recommendation',
  /** column name */
  ProviderSignature = 'provider_signature',
  /** column name */
  ProviderSignatureDateTime = 'provider_signature_date_time',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Clearance_Notes_Var_Pop_Fields = {
  __typename?: 'clearance_notes_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Clearance_Notes_Var_Samp_Fields = {
  __typename?: 'clearance_notes_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Clearance_Notes_Variance_Fields = {
  __typename?: 'clearance_notes_variance_fields'
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>
  _gt?: InputMaybe<Scalars['date']>
  _gte?: InputMaybe<Scalars['date']>
  _in?: InputMaybe<Array<Scalars['date']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['date']>
  _lte?: InputMaybe<Scalars['date']>
  _neq?: InputMaybe<Scalars['date']>
  _nin?: InputMaybe<Array<Scalars['date']>>
}

export type Form_Images = {
  __typename?: 'form_images'
  patient_id: Scalars['String']
  type: Scalars['String']
  updated_at: Scalars['timestamptz']
  url: Scalars['String']
}

export type Form_Images_Insert = {
  __typename?: 'form_images_insert'
  url: Scalars['String']
}

/** columns and relationships of "form_localizations" */
export type Form_Localizations = {
  __typename?: 'form_localizations'
  dictionary: Scalars['jsonb']
  locale: Scalars['String']
  type: Scalars['String']
}

/** columns and relationships of "form_localizations" */
export type Form_LocalizationsDictionaryArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** aggregated selection of "form_localizations" */
export type Form_Localizations_Aggregate = {
  __typename?: 'form_localizations_aggregate'
  aggregate?: Maybe<Form_Localizations_Aggregate_Fields>
  nodes: Array<Form_Localizations>
}

/** aggregate fields of "form_localizations" */
export type Form_Localizations_Aggregate_Fields = {
  __typename?: 'form_localizations_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Form_Localizations_Max_Fields>
  min?: Maybe<Form_Localizations_Min_Fields>
}

/** aggregate fields of "form_localizations" */
export type Form_Localizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Form_Localizations_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "form_localizations" */
export type Form_Localizations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Form_Localizations_Max_Order_By>
  min?: InputMaybe<Form_Localizations_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Form_Localizations_Append_Input = {
  dictionary?: InputMaybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "form_localizations" */
export type Form_Localizations_Arr_Rel_Insert_Input = {
  data: Array<Form_Localizations_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Form_Localizations_On_Conflict>
}

/** Boolean expression to filter rows from the table "form_localizations". All fields are combined with a logical 'AND'. */
export type Form_Localizations_Bool_Exp = {
  _and?: InputMaybe<Array<Form_Localizations_Bool_Exp>>
  _not?: InputMaybe<Form_Localizations_Bool_Exp>
  _or?: InputMaybe<Array<Form_Localizations_Bool_Exp>>
  dictionary?: InputMaybe<Jsonb_Comparison_Exp>
  locale?: InputMaybe<String_Comparison_Exp>
  type?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "form_localizations" */
export enum Form_Localizations_Constraint {
  /** unique or primary key constraint */
  FormLocalizationsPkey = 'form_localizations_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Form_Localizations_Delete_At_Path_Input = {
  dictionary?: InputMaybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Form_Localizations_Delete_Elem_Input = {
  dictionary?: InputMaybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Form_Localizations_Delete_Key_Input = {
  dictionary?: InputMaybe<Scalars['String']>
}

/** input type for inserting data into table "form_localizations" */
export type Form_Localizations_Insert_Input = {
  dictionary?: InputMaybe<Scalars['jsonb']>
  locale?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Form_Localizations_Max_Fields = {
  __typename?: 'form_localizations_max_fields'
  locale?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "form_localizations" */
export type Form_Localizations_Max_Order_By = {
  locale?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Form_Localizations_Min_Fields = {
  __typename?: 'form_localizations_min_fields'
  locale?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "form_localizations" */
export type Form_Localizations_Min_Order_By = {
  locale?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** response of any mutation on the table "form_localizations" */
export type Form_Localizations_Mutation_Response = {
  __typename?: 'form_localizations_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Form_Localizations>
}

/** on conflict condition type for table "form_localizations" */
export type Form_Localizations_On_Conflict = {
  constraint: Form_Localizations_Constraint
  update_columns?: Array<Form_Localizations_Update_Column>
  where?: InputMaybe<Form_Localizations_Bool_Exp>
}

/** Ordering options when selecting data from "form_localizations". */
export type Form_Localizations_Order_By = {
  dictionary?: InputMaybe<Order_By>
  locale?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** primary key columns input for table: form_localizations */
export type Form_Localizations_Pk_Columns_Input = {
  locale: Scalars['String']
  type: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Form_Localizations_Prepend_Input = {
  dictionary?: InputMaybe<Scalars['jsonb']>
}

/** select columns of table "form_localizations" */
export enum Form_Localizations_Select_Column {
  /** column name */
  Dictionary = 'dictionary',
  /** column name */
  Locale = 'locale',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "form_localizations" */
export type Form_Localizations_Set_Input = {
  dictionary?: InputMaybe<Scalars['jsonb']>
  locale?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

/** update columns of table "form_localizations" */
export enum Form_Localizations_Update_Column {
  /** column name */
  Dictionary = 'dictionary',
  /** column name */
  Locale = 'locale',
  /** column name */
  Type = 'type',
}

/** columns and relationships of "form_types" */
export type Form_Types = {
  __typename?: 'form_types'
  /** fetch data from the table: "form_localizations" */
  form_localizations: Array<Form_Localizations>
  /** fetch aggregated fields from the table: "form_localizations" */
  form_localizations_aggregate: Form_Localizations_Aggregate
  id: Scalars['String']
  on_registration: Scalars['Boolean']
  schema: Scalars['jsonb']
  ui_schema?: Maybe<Scalars['jsonb']>
}

/** columns and relationships of "form_types" */
export type Form_TypesForm_LocalizationsArgs = {
  distinct_on?: InputMaybe<Array<Form_Localizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Localizations_Order_By>>
  where?: InputMaybe<Form_Localizations_Bool_Exp>
}

/** columns and relationships of "form_types" */
export type Form_TypesForm_Localizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Localizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Localizations_Order_By>>
  where?: InputMaybe<Form_Localizations_Bool_Exp>
}

/** columns and relationships of "form_types" */
export type Form_TypesSchemaArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "form_types" */
export type Form_TypesUi_SchemaArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** aggregated selection of "form_types" */
export type Form_Types_Aggregate = {
  __typename?: 'form_types_aggregate'
  aggregate?: Maybe<Form_Types_Aggregate_Fields>
  nodes: Array<Form_Types>
}

/** aggregate fields of "form_types" */
export type Form_Types_Aggregate_Fields = {
  __typename?: 'form_types_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Form_Types_Max_Fields>
  min?: Maybe<Form_Types_Min_Fields>
}

/** aggregate fields of "form_types" */
export type Form_Types_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Form_Types_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Form_Types_Append_Input = {
  schema?: InputMaybe<Scalars['jsonb']>
  ui_schema?: InputMaybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "form_types". All fields are combined with a logical 'AND'. */
export type Form_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Form_Types_Bool_Exp>>
  _not?: InputMaybe<Form_Types_Bool_Exp>
  _or?: InputMaybe<Array<Form_Types_Bool_Exp>>
  form_localizations?: InputMaybe<Form_Localizations_Bool_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  on_registration?: InputMaybe<Boolean_Comparison_Exp>
  schema?: InputMaybe<Jsonb_Comparison_Exp>
  ui_schema?: InputMaybe<Jsonb_Comparison_Exp>
}

/** unique or primary key constraints on table "form_types" */
export enum Form_Types_Constraint {
  /** unique or primary key constraint */
  FormTypesPkey = 'form_types_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Form_Types_Delete_At_Path_Input = {
  schema?: InputMaybe<Array<Scalars['String']>>
  ui_schema?: InputMaybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Form_Types_Delete_Elem_Input = {
  schema?: InputMaybe<Scalars['Int']>
  ui_schema?: InputMaybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Form_Types_Delete_Key_Input = {
  schema?: InputMaybe<Scalars['String']>
  ui_schema?: InputMaybe<Scalars['String']>
}

/** input type for inserting data into table "form_types" */
export type Form_Types_Insert_Input = {
  form_localizations?: InputMaybe<Form_Localizations_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['String']>
  on_registration?: InputMaybe<Scalars['Boolean']>
  schema?: InputMaybe<Scalars['jsonb']>
  ui_schema?: InputMaybe<Scalars['jsonb']>
}

/** aggregate max on columns */
export type Form_Types_Max_Fields = {
  __typename?: 'form_types_max_fields'
  id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Form_Types_Min_Fields = {
  __typename?: 'form_types_min_fields'
  id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "form_types" */
export type Form_Types_Mutation_Response = {
  __typename?: 'form_types_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Form_Types>
}

/** input type for inserting object relation for remote table "form_types" */
export type Form_Types_Obj_Rel_Insert_Input = {
  data: Form_Types_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Form_Types_On_Conflict>
}

/** on conflict condition type for table "form_types" */
export type Form_Types_On_Conflict = {
  constraint: Form_Types_Constraint
  update_columns?: Array<Form_Types_Update_Column>
  where?: InputMaybe<Form_Types_Bool_Exp>
}

/** Ordering options when selecting data from "form_types". */
export type Form_Types_Order_By = {
  form_localizations_aggregate?: InputMaybe<Form_Localizations_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  on_registration?: InputMaybe<Order_By>
  schema?: InputMaybe<Order_By>
  ui_schema?: InputMaybe<Order_By>
}

/** primary key columns input for table: form_types */
export type Form_Types_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Form_Types_Prepend_Input = {
  schema?: InputMaybe<Scalars['jsonb']>
  ui_schema?: InputMaybe<Scalars['jsonb']>
}

/** select columns of table "form_types" */
export enum Form_Types_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OnRegistration = 'on_registration',
  /** column name */
  Schema = 'schema',
  /** column name */
  UiSchema = 'ui_schema',
}

/** input type for updating data in table "form_types" */
export type Form_Types_Set_Input = {
  id?: InputMaybe<Scalars['String']>
  on_registration?: InputMaybe<Scalars['Boolean']>
  schema?: InputMaybe<Scalars['jsonb']>
  ui_schema?: InputMaybe<Scalars['jsonb']>
}

/** update columns of table "form_types" */
export enum Form_Types_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OnRegistration = 'on_registration',
  /** column name */
  Schema = 'schema',
  /** column name */
  UiSchema = 'ui_schema',
}

/** columns and relationships of "forms" */
export type Forms = {
  __typename?: 'forms'
  created_at: Scalars['timestamptz']
  data: Scalars['jsonb']
  /** An object relationship */
  form_type: Form_Types
  patient_id: Scalars['String']
  type: Scalars['String']
  updated_at: Scalars['timestamptz']
  user_id: Scalars['String']
}

/** columns and relationships of "forms" */
export type FormsDataArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** aggregated selection of "forms" */
export type Forms_Aggregate = {
  __typename?: 'forms_aggregate'
  aggregate?: Maybe<Forms_Aggregate_Fields>
  nodes: Array<Forms>
}

/** aggregate fields of "forms" */
export type Forms_Aggregate_Fields = {
  __typename?: 'forms_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Forms_Max_Fields>
  min?: Maybe<Forms_Min_Fields>
}

/** aggregate fields of "forms" */
export type Forms_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Forms_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Forms_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "forms". All fields are combined with a logical 'AND'. */
export type Forms_Bool_Exp = {
  _and?: InputMaybe<Array<Forms_Bool_Exp>>
  _not?: InputMaybe<Forms_Bool_Exp>
  _or?: InputMaybe<Array<Forms_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  data?: InputMaybe<Jsonb_Comparison_Exp>
  form_type?: InputMaybe<Form_Types_Bool_Exp>
  patient_id?: InputMaybe<String_Comparison_Exp>
  type?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  user_id?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "forms" */
export enum Forms_Constraint {
  /** unique or primary key constraint */
  FormsPkey = 'forms_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Forms_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Forms_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Forms_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']>
}

/** input type for inserting data into table "forms" */
export type Forms_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  data?: InputMaybe<Scalars['jsonb']>
  form_type?: InputMaybe<Form_Types_Obj_Rel_Insert_Input>
  patient_id?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  user_id?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Forms_Max_Fields = {
  __typename?: 'forms_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  patient_id?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Forms_Min_Fields = {
  __typename?: 'forms_min_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  patient_id?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "forms" */
export type Forms_Mutation_Response = {
  __typename?: 'forms_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Forms>
}

/** on conflict condition type for table "forms" */
export type Forms_On_Conflict = {
  constraint: Forms_Constraint
  update_columns?: Array<Forms_Update_Column>
  where?: InputMaybe<Forms_Bool_Exp>
}

/** Ordering options when selecting data from "forms". */
export type Forms_Order_By = {
  created_at?: InputMaybe<Order_By>
  data?: InputMaybe<Order_By>
  form_type?: InputMaybe<Form_Types_Order_By>
  patient_id?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: forms */
export type Forms_Pk_Columns_Input = {
  patient_id: Scalars['String']
  type: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Forms_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']>
}

/** select columns of table "forms" */
export enum Forms_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "forms" */
export type Forms_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  data?: InputMaybe<Scalars['jsonb']>
  patient_id?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  user_id?: InputMaybe<Scalars['String']>
}

/** update columns of table "forms" */
export enum Forms_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>
  _gt?: InputMaybe<Scalars['json']>
  _gte?: InputMaybe<Scalars['json']>
  _in?: InputMaybe<Array<Scalars['json']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['json']>
  _lte?: InputMaybe<Scalars['json']>
  _neq?: InputMaybe<Scalars['json']>
  _nin?: InputMaybe<Array<Scalars['json']>>
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>
  _eq?: InputMaybe<Scalars['jsonb']>
  _gt?: InputMaybe<Scalars['jsonb']>
  _gte?: InputMaybe<Scalars['jsonb']>
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>
  _in?: InputMaybe<Array<Scalars['jsonb']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['jsonb']>
  _lte?: InputMaybe<Scalars['jsonb']>
  _neq?: InputMaybe<Scalars['jsonb']>
  _nin?: InputMaybe<Array<Scalars['jsonb']>>
}

/** columns and relationships of "locations" */
export type Locations = {
  __typename?: 'locations'
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  organization_id: Scalars['Int']
}

/** aggregated selection of "locations" */
export type Locations_Aggregate = {
  __typename?: 'locations_aggregate'
  aggregate?: Maybe<Locations_Aggregate_Fields>
  nodes: Array<Locations>
}

/** aggregate fields of "locations" */
export type Locations_Aggregate_Fields = {
  __typename?: 'locations_aggregate_fields'
  avg?: Maybe<Locations_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Locations_Max_Fields>
  min?: Maybe<Locations_Min_Fields>
  stddev?: Maybe<Locations_Stddev_Fields>
  stddev_pop?: Maybe<Locations_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Locations_Stddev_Samp_Fields>
  sum?: Maybe<Locations_Sum_Fields>
  var_pop?: Maybe<Locations_Var_Pop_Fields>
  var_samp?: Maybe<Locations_Var_Samp_Fields>
  variance?: Maybe<Locations_Variance_Fields>
}

/** aggregate fields of "locations" */
export type Locations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Locations_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Locations_Avg_Fields = {
  __typename?: 'locations_avg_fields'
  id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "locations". All fields are combined with a logical 'AND'. */
export type Locations_Bool_Exp = {
  _and?: InputMaybe<Array<Locations_Bool_Exp>>
  _not?: InputMaybe<Locations_Bool_Exp>
  _or?: InputMaybe<Array<Locations_Bool_Exp>>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  organization_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "locations" */
export enum Locations_Constraint {
  /** unique or primary key constraint */
  LocationsPkey = 'locations_pkey',
}

/** input type for incrementing numeric columns in table "locations" */
export type Locations_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  organization_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "locations" */
export type Locations_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  organization_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Locations_Max_Fields = {
  __typename?: 'locations_max_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  organization_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Locations_Min_Fields = {
  __typename?: 'locations_min_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  organization_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "locations" */
export type Locations_Mutation_Response = {
  __typename?: 'locations_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Locations>
}

/** input type for inserting object relation for remote table "locations" */
export type Locations_Obj_Rel_Insert_Input = {
  data: Locations_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Locations_On_Conflict>
}

/** on conflict condition type for table "locations" */
export type Locations_On_Conflict = {
  constraint: Locations_Constraint
  update_columns?: Array<Locations_Update_Column>
  where?: InputMaybe<Locations_Bool_Exp>
}

/** Ordering options when selecting data from "locations". */
export type Locations_Order_By = {
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: locations */
export type Locations_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "locations" */
export enum Locations_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
}

/** input type for updating data in table "locations" */
export type Locations_Set_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  organization_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Locations_Stddev_Fields = {
  __typename?: 'locations_stddev_fields'
  id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Locations_Stddev_Pop_Fields = {
  __typename?: 'locations_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Locations_Stddev_Samp_Fields = {
  __typename?: 'locations_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Locations_Sum_Fields = {
  __typename?: 'locations_sum_fields'
  id?: Maybe<Scalars['Int']>
  organization_id?: Maybe<Scalars['Int']>
}

/** update columns of table "locations" */
export enum Locations_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
}

/** aggregate var_pop on columns */
export type Locations_Var_Pop_Fields = {
  __typename?: 'locations_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Locations_Var_Samp_Fields = {
  __typename?: 'locations_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Locations_Variance_Fields = {
  __typename?: 'locations_variance_fields'
  id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "medication_orders" */
export type Medication_Orders = {
  __typename?: 'medication_orders'
  administration_notes?: Maybe<Scalars['String']>
  category: Scalars['String']
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  dosage: Scalars['String']
  expiration_date?: Maybe<Scalars['date']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  is_standing?: Maybe<Scalars['Boolean']>
  manufacturer?: Maybe<Scalars['String']>
  medication: Scalars['String']
  medication_lot_number?: Maybe<Scalars['String']>
  provider_id: Scalars['Int']
  provider_orders?: Maybe<Scalars['String']>
  status: Scalars['String']
  unread?: Maybe<Scalars['Boolean']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id: Scalars['Int']
}

/** aggregated selection of "medication_orders" */
export type Medication_Orders_Aggregate = {
  __typename?: 'medication_orders_aggregate'
  aggregate?: Maybe<Medication_Orders_Aggregate_Fields>
  nodes: Array<Medication_Orders>
}

/** aggregate fields of "medication_orders" */
export type Medication_Orders_Aggregate_Fields = {
  __typename?: 'medication_orders_aggregate_fields'
  avg?: Maybe<Medication_Orders_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Medication_Orders_Max_Fields>
  min?: Maybe<Medication_Orders_Min_Fields>
  stddev?: Maybe<Medication_Orders_Stddev_Fields>
  stddev_pop?: Maybe<Medication_Orders_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Medication_Orders_Stddev_Samp_Fields>
  sum?: Maybe<Medication_Orders_Sum_Fields>
  var_pop?: Maybe<Medication_Orders_Var_Pop_Fields>
  var_samp?: Maybe<Medication_Orders_Var_Samp_Fields>
  variance?: Maybe<Medication_Orders_Variance_Fields>
}

/** aggregate fields of "medication_orders" */
export type Medication_Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Medication_Orders_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Medication_Orders_Avg_Fields = {
  __typename?: 'medication_orders_avg_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "medication_orders". All fields are combined with a logical 'AND'. */
export type Medication_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Medication_Orders_Bool_Exp>>
  _not?: InputMaybe<Medication_Orders_Bool_Exp>
  _or?: InputMaybe<Array<Medication_Orders_Bool_Exp>>
  administration_notes?: InputMaybe<String_Comparison_Exp>
  category?: InputMaybe<String_Comparison_Exp>
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  dosage?: InputMaybe<String_Comparison_Exp>
  expiration_date?: InputMaybe<Date_Comparison_Exp>
  facilitator_id?: InputMaybe<Int_Comparison_Exp>
  follow_up_instructions?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  is_standing?: InputMaybe<Boolean_Comparison_Exp>
  manufacturer?: InputMaybe<String_Comparison_Exp>
  medication?: InputMaybe<String_Comparison_Exp>
  medication_lot_number?: InputMaybe<String_Comparison_Exp>
  provider_id?: InputMaybe<Int_Comparison_Exp>
  provider_orders?: InputMaybe<String_Comparison_Exp>
  status?: InputMaybe<String_Comparison_Exp>
  unread?: InputMaybe<Boolean_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "medication_orders" */
export enum Medication_Orders_Constraint {
  /** unique or primary key constraint */
  MedicationOrdersPkey = 'medication_orders_pkey',
}

/** input type for incrementing numeric columns in table "medication_orders" */
export type Medication_Orders_Inc_Input = {
  facilitator_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "medication_orders" */
export type Medication_Orders_Insert_Input = {
  administration_notes?: InputMaybe<Scalars['String']>
  category?: InputMaybe<Scalars['String']>
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  dosage?: InputMaybe<Scalars['String']>
  expiration_date?: InputMaybe<Scalars['date']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_standing?: InputMaybe<Scalars['Boolean']>
  manufacturer?: InputMaybe<Scalars['String']>
  medication?: InputMaybe<Scalars['String']>
  medication_lot_number?: InputMaybe<Scalars['String']>
  provider_id?: InputMaybe<Scalars['Int']>
  provider_orders?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Medication_Orders_Max_Fields = {
  __typename?: 'medication_orders_max_fields'
  administration_notes?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  dosage?: Maybe<Scalars['String']>
  expiration_date?: Maybe<Scalars['date']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  manufacturer?: Maybe<Scalars['String']>
  medication?: Maybe<Scalars['String']>
  medication_lot_number?: Maybe<Scalars['String']>
  provider_id?: Maybe<Scalars['Int']>
  provider_orders?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Medication_Orders_Min_Fields = {
  __typename?: 'medication_orders_min_fields'
  administration_notes?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  dosage?: Maybe<Scalars['String']>
  expiration_date?: Maybe<Scalars['date']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  manufacturer?: Maybe<Scalars['String']>
  medication?: Maybe<Scalars['String']>
  medication_lot_number?: Maybe<Scalars['String']>
  provider_id?: Maybe<Scalars['Int']>
  provider_orders?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "medication_orders" */
export type Medication_Orders_Mutation_Response = {
  __typename?: 'medication_orders_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Medication_Orders>
}

/** on conflict condition type for table "medication_orders" */
export type Medication_Orders_On_Conflict = {
  constraint: Medication_Orders_Constraint
  update_columns?: Array<Medication_Orders_Update_Column>
  where?: InputMaybe<Medication_Orders_Bool_Exp>
}

/** Ordering options when selecting data from "medication_orders". */
export type Medication_Orders_Order_By = {
  administration_notes?: InputMaybe<Order_By>
  category?: InputMaybe<Order_By>
  completed_at?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  dosage?: InputMaybe<Order_By>
  expiration_date?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  follow_up_instructions?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  is_standing?: InputMaybe<Order_By>
  manufacturer?: InputMaybe<Order_By>
  medication?: InputMaybe<Order_By>
  medication_lot_number?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  provider_orders?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  unread?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: medication_orders */
export type Medication_Orders_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "medication_orders" */
export enum Medication_Orders_Select_Column {
  /** column name */
  AdministrationNotes = 'administration_notes',
  /** column name */
  Category = 'category',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Dosage = 'dosage',
  /** column name */
  ExpirationDate = 'expiration_date',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsStanding = 'is_standing',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Medication = 'medication',
  /** column name */
  MedicationLotNumber = 'medication_lot_number',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ProviderOrders = 'provider_orders',
  /** column name */
  Status = 'status',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "medication_orders" */
export type Medication_Orders_Set_Input = {
  administration_notes?: InputMaybe<Scalars['String']>
  category?: InputMaybe<Scalars['String']>
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  dosage?: InputMaybe<Scalars['String']>
  expiration_date?: InputMaybe<Scalars['date']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_standing?: InputMaybe<Scalars['Boolean']>
  manufacturer?: InputMaybe<Scalars['String']>
  medication?: InputMaybe<Scalars['String']>
  medication_lot_number?: InputMaybe<Scalars['String']>
  provider_id?: InputMaybe<Scalars['Int']>
  provider_orders?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Medication_Orders_Stddev_Fields = {
  __typename?: 'medication_orders_stddev_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Medication_Orders_Stddev_Pop_Fields = {
  __typename?: 'medication_orders_stddev_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Medication_Orders_Stddev_Samp_Fields = {
  __typename?: 'medication_orders_stddev_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Medication_Orders_Sum_Fields = {
  __typename?: 'medication_orders_sum_fields'
  facilitator_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** update columns of table "medication_orders" */
export enum Medication_Orders_Update_Column {
  /** column name */
  AdministrationNotes = 'administration_notes',
  /** column name */
  Category = 'category',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Dosage = 'dosage',
  /** column name */
  ExpirationDate = 'expiration_date',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsStanding = 'is_standing',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Medication = 'medication',
  /** column name */
  MedicationLotNumber = 'medication_lot_number',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ProviderOrders = 'provider_orders',
  /** column name */
  Status = 'status',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Medication_Orders_Var_Pop_Fields = {
  __typename?: 'medication_orders_var_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Medication_Orders_Var_Samp_Fields = {
  __typename?: 'medication_orders_var_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Medication_Orders_Variance_Fields = {
  __typename?: 'medication_orders_variance_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "assessment_orders" */
  delete_assessment_orders?: Maybe<Assessment_Orders_Mutation_Response>
  /** delete single row from the table: "assessment_orders" */
  delete_assessment_orders_by_pk?: Maybe<Assessment_Orders>
  /** delete data from the table: "clearance_notes" */
  delete_clearance_notes?: Maybe<Clearance_Notes_Mutation_Response>
  /** delete single row from the table: "clearance_notes" */
  delete_clearance_notes_by_pk?: Maybe<Clearance_Notes>
  /** delete data from the table: "form_localizations" */
  delete_form_localizations?: Maybe<Form_Localizations_Mutation_Response>
  /** delete single row from the table: "form_localizations" */
  delete_form_localizations_by_pk?: Maybe<Form_Localizations>
  /** delete data from the table: "form_types" */
  delete_form_types?: Maybe<Form_Types_Mutation_Response>
  /** delete single row from the table: "form_types" */
  delete_form_types_by_pk?: Maybe<Form_Types>
  /** delete data from the table: "forms" */
  delete_forms?: Maybe<Forms_Mutation_Response>
  /** delete single row from the table: "forms" */
  delete_forms_by_pk?: Maybe<Forms>
  /** delete data from the table: "locations" */
  delete_locations?: Maybe<Locations_Mutation_Response>
  /** delete single row from the table: "locations" */
  delete_locations_by_pk?: Maybe<Locations>
  /** delete data from the table: "medication_orders" */
  delete_medication_orders?: Maybe<Medication_Orders_Mutation_Response>
  /** delete single row from the table: "medication_orders" */
  delete_medication_orders_by_pk?: Maybe<Medication_Orders>
  /** delete data from the table: "order_height_and_weight" */
  delete_order_height_and_weight?: Maybe<Order_Height_And_Weight_Mutation_Response>
  /** delete single row from the table: "order_height_and_weight" */
  delete_order_height_and_weight_by_pk?: Maybe<Order_Height_And_Weight>
  /** delete data from the table: "order_medical_assessment" */
  delete_order_medical_assessment?: Maybe<Order_Medical_Assessment_Mutation_Response>
  /** delete single row from the table: "order_medical_assessment" */
  delete_order_medical_assessment_by_pk?: Maybe<Order_Medical_Assessment>
  /** delete data from the table: "order_musculoskeletal" */
  delete_order_musculoskeletal?: Maybe<Order_Musculoskeletal_Mutation_Response>
  /** delete single row from the table: "order_musculoskeletal" */
  delete_order_musculoskeletal_by_pk?: Maybe<Order_Musculoskeletal>
  /** delete data from the table: "order_type" */
  delete_order_type?: Maybe<Order_Type_Mutation_Response>
  /** delete single row from the table: "order_type" */
  delete_order_type_by_pk?: Maybe<Order_Type>
  /** delete data from the table: "order_vision" */
  delete_order_vision?: Maybe<Order_Vision_Mutation_Response>
  /** delete single row from the table: "order_vision" */
  delete_order_vision_by_pk?: Maybe<Order_Vision>
  /** delete data from the table: "orders" */
  delete_orders?: Maybe<Orders_Mutation_Response>
  /** delete single row from the table: "orders" */
  delete_orders_by_pk?: Maybe<Orders>
  /** delete data from the table: "organizations" */
  delete_organizations?: Maybe<Organizations_Mutation_Response>
  /** delete single row from the table: "organizations" */
  delete_organizations_by_pk?: Maybe<Organizations>
  /** delete data from the table: "place_of_service" */
  delete_place_of_service?: Maybe<Place_Of_Service_Mutation_Response>
  /** delete single row from the table: "place_of_service" */
  delete_place_of_service_by_pk?: Maybe<Place_Of_Service>
  /** delete data from the table: "session_logs" */
  delete_session_logs?: Maybe<Session_Logs_Mutation_Response>
  /** delete single row from the table: "session_logs" */
  delete_session_logs_by_pk?: Maybe<Session_Logs>
  /** delete data from the table: "session_station_order_config" */
  delete_session_station_order_config?: Maybe<Session_Station_Order_Config_Mutation_Response>
  /** delete single row from the table: "session_station_order_config" */
  delete_session_station_order_config_by_pk?: Maybe<Session_Station_Order_Config>
  /** delete data from the table: "session_type" */
  delete_session_type?: Maybe<Session_Type_Mutation_Response>
  /** delete single row from the table: "session_type" */
  delete_session_type_by_pk?: Maybe<Session_Type>
  /** delete data from the table: "sessions" */
  delete_sessions?: Maybe<Sessions_Mutation_Response>
  /** delete single row from the table: "sessions" */
  delete_sessions_by_pk?: Maybe<Sessions>
  /** delete data from the table: "station_orders" */
  delete_station_orders?: Maybe<Station_Orders_Mutation_Response>
  /** delete single row from the table: "station_orders" */
  delete_station_orders_by_pk?: Maybe<Station_Orders>
  /** delete data from the table: "station_type" */
  delete_station_type?: Maybe<Station_Type_Mutation_Response>
  /** delete single row from the table: "station_type" */
  delete_station_type_by_pk?: Maybe<Station_Type>
  /** delete data from the table: "station_visits" */
  delete_station_visits?: Maybe<Station_Visits_Mutation_Response>
  /** delete single row from the table: "station_visits" */
  delete_station_visits_by_pk?: Maybe<Station_Visits>
  /** delete data from the table: "stations" */
  delete_stations?: Maybe<Stations_Mutation_Response>
  /** delete single row from the table: "stations" */
  delete_stations_by_pk?: Maybe<Stations>
  /** delete data from the table: "test_orders" */
  delete_test_orders?: Maybe<Test_Orders_Mutation_Response>
  /** delete single row from the table: "test_orders" */
  delete_test_orders_by_pk?: Maybe<Test_Orders>
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** delete data from the table: "video_calls" */
  delete_video_calls?: Maybe<Video_Calls_Mutation_Response>
  /** delete single row from the table: "video_calls" */
  delete_video_calls_by_pk?: Maybe<Video_Calls>
  /** delete data from the table: "visits" */
  delete_visits?: Maybe<Visits_Mutation_Response>
  /** delete single row from the table: "visits" */
  delete_visits_by_pk?: Maybe<Visits>
  /** insert data into the table: "assessment_orders" */
  insert_assessment_orders?: Maybe<Assessment_Orders_Mutation_Response>
  /** insert a single row into the table: "assessment_orders" */
  insert_assessment_orders_one?: Maybe<Assessment_Orders>
  /** insert data into the table: "clearance_notes" */
  insert_clearance_notes?: Maybe<Clearance_Notes_Mutation_Response>
  /** insert a single row into the table: "clearance_notes" */
  insert_clearance_notes_one?: Maybe<Clearance_Notes>
  insert_form_images_one: Form_Images_Insert
  /** insert data into the table: "form_localizations" */
  insert_form_localizations?: Maybe<Form_Localizations_Mutation_Response>
  /** insert a single row into the table: "form_localizations" */
  insert_form_localizations_one?: Maybe<Form_Localizations>
  /** insert data into the table: "form_types" */
  insert_form_types?: Maybe<Form_Types_Mutation_Response>
  /** insert a single row into the table: "form_types" */
  insert_form_types_one?: Maybe<Form_Types>
  /** insert data into the table: "forms" */
  insert_forms?: Maybe<Forms_Mutation_Response>
  /** insert a single row into the table: "forms" */
  insert_forms_one?: Maybe<Forms>
  /** insert data into the table: "locations" */
  insert_locations?: Maybe<Locations_Mutation_Response>
  /** insert a single row into the table: "locations" */
  insert_locations_one?: Maybe<Locations>
  /** insert data into the table: "medication_orders" */
  insert_medication_orders?: Maybe<Medication_Orders_Mutation_Response>
  /** insert a single row into the table: "medication_orders" */
  insert_medication_orders_one?: Maybe<Medication_Orders>
  /** insert data into the table: "order_height_and_weight" */
  insert_order_height_and_weight?: Maybe<Order_Height_And_Weight_Mutation_Response>
  /** insert a single row into the table: "order_height_and_weight" */
  insert_order_height_and_weight_one?: Maybe<Order_Height_And_Weight>
  /** insert data into the table: "order_medical_assessment" */
  insert_order_medical_assessment?: Maybe<Order_Medical_Assessment_Mutation_Response>
  /** insert a single row into the table: "order_medical_assessment" */
  insert_order_medical_assessment_one?: Maybe<Order_Medical_Assessment>
  /** insert data into the table: "order_musculoskeletal" */
  insert_order_musculoskeletal?: Maybe<Order_Musculoskeletal_Mutation_Response>
  /** insert a single row into the table: "order_musculoskeletal" */
  insert_order_musculoskeletal_one?: Maybe<Order_Musculoskeletal>
  /** insert data into the table: "order_type" */
  insert_order_type?: Maybe<Order_Type_Mutation_Response>
  /** insert a single row into the table: "order_type" */
  insert_order_type_one?: Maybe<Order_Type>
  /** insert data into the table: "order_vision" */
  insert_order_vision?: Maybe<Order_Vision_Mutation_Response>
  /** insert a single row into the table: "order_vision" */
  insert_order_vision_one?: Maybe<Order_Vision>
  /** insert data into the table: "orders" */
  insert_orders?: Maybe<Orders_Mutation_Response>
  /** insert a single row into the table: "orders" */
  insert_orders_one?: Maybe<Orders>
  /** insert data into the table: "organizations" */
  insert_organizations?: Maybe<Organizations_Mutation_Response>
  /** insert a single row into the table: "organizations" */
  insert_organizations_one?: Maybe<Organizations>
  /** insert data into the table: "place_of_service" */
  insert_place_of_service?: Maybe<Place_Of_Service_Mutation_Response>
  /** insert a single row into the table: "place_of_service" */
  insert_place_of_service_one?: Maybe<Place_Of_Service>
  /** insert data into the table: "session_logs" */
  insert_session_logs?: Maybe<Session_Logs_Mutation_Response>
  /** insert a single row into the table: "session_logs" */
  insert_session_logs_one?: Maybe<Session_Logs>
  /** insert data into the table: "session_station_order_config" */
  insert_session_station_order_config?: Maybe<Session_Station_Order_Config_Mutation_Response>
  /** insert a single row into the table: "session_station_order_config" */
  insert_session_station_order_config_one?: Maybe<Session_Station_Order_Config>
  /** insert data into the table: "session_type" */
  insert_session_type?: Maybe<Session_Type_Mutation_Response>
  /** insert a single row into the table: "session_type" */
  insert_session_type_one?: Maybe<Session_Type>
  /** insert data into the table: "sessions" */
  insert_sessions?: Maybe<Sessions_Mutation_Response>
  /** insert a single row into the table: "sessions" */
  insert_sessions_one?: Maybe<Sessions>
  /** insert data into the table: "station_orders" */
  insert_station_orders?: Maybe<Station_Orders_Mutation_Response>
  /** insert a single row into the table: "station_orders" */
  insert_station_orders_one?: Maybe<Station_Orders>
  /** insert data into the table: "station_type" */
  insert_station_type?: Maybe<Station_Type_Mutation_Response>
  /** insert a single row into the table: "station_type" */
  insert_station_type_one?: Maybe<Station_Type>
  /** insert data into the table: "station_visits" */
  insert_station_visits?: Maybe<Station_Visits_Mutation_Response>
  /** insert a single row into the table: "station_visits" */
  insert_station_visits_one?: Maybe<Station_Visits>
  /** insert data into the table: "stations" */
  insert_stations?: Maybe<Stations_Mutation_Response>
  /** insert a single row into the table: "stations" */
  insert_stations_one?: Maybe<Stations>
  /** insert data into the table: "test_orders" */
  insert_test_orders?: Maybe<Test_Orders_Mutation_Response>
  /** insert a single row into the table: "test_orders" */
  insert_test_orders_one?: Maybe<Test_Orders>
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** insert data into the table: "video_calls" */
  insert_video_calls?: Maybe<Video_Calls_Mutation_Response>
  /** insert a single row into the table: "video_calls" */
  insert_video_calls_one?: Maybe<Video_Calls>
  /** insert data into the table: "visits" */
  insert_visits?: Maybe<Visits_Mutation_Response>
  /** insert a single row into the table: "visits" */
  insert_visits_one?: Maybe<Visits>
  /** update data of the table: "assessment_orders" */
  update_assessment_orders?: Maybe<Assessment_Orders_Mutation_Response>
  /** update single row of the table: "assessment_orders" */
  update_assessment_orders_by_pk?: Maybe<Assessment_Orders>
  /** update data of the table: "clearance_notes" */
  update_clearance_notes?: Maybe<Clearance_Notes_Mutation_Response>
  /** update single row of the table: "clearance_notes" */
  update_clearance_notes_by_pk?: Maybe<Clearance_Notes>
  /** update data of the table: "form_localizations" */
  update_form_localizations?: Maybe<Form_Localizations_Mutation_Response>
  /** update single row of the table: "form_localizations" */
  update_form_localizations_by_pk?: Maybe<Form_Localizations>
  /** update data of the table: "form_types" */
  update_form_types?: Maybe<Form_Types_Mutation_Response>
  /** update single row of the table: "form_types" */
  update_form_types_by_pk?: Maybe<Form_Types>
  /** update data of the table: "forms" */
  update_forms?: Maybe<Forms_Mutation_Response>
  /** update single row of the table: "forms" */
  update_forms_by_pk?: Maybe<Forms>
  /** update data of the table: "locations" */
  update_locations?: Maybe<Locations_Mutation_Response>
  /** update single row of the table: "locations" */
  update_locations_by_pk?: Maybe<Locations>
  /** update data of the table: "medication_orders" */
  update_medication_orders?: Maybe<Medication_Orders_Mutation_Response>
  /** update single row of the table: "medication_orders" */
  update_medication_orders_by_pk?: Maybe<Medication_Orders>
  /** update data of the table: "order_height_and_weight" */
  update_order_height_and_weight?: Maybe<Order_Height_And_Weight_Mutation_Response>
  /** update single row of the table: "order_height_and_weight" */
  update_order_height_and_weight_by_pk?: Maybe<Order_Height_And_Weight>
  /** update data of the table: "order_medical_assessment" */
  update_order_medical_assessment?: Maybe<Order_Medical_Assessment_Mutation_Response>
  /** update single row of the table: "order_medical_assessment" */
  update_order_medical_assessment_by_pk?: Maybe<Order_Medical_Assessment>
  /** update data of the table: "order_musculoskeletal" */
  update_order_musculoskeletal?: Maybe<Order_Musculoskeletal_Mutation_Response>
  /** update single row of the table: "order_musculoskeletal" */
  update_order_musculoskeletal_by_pk?: Maybe<Order_Musculoskeletal>
  /** update data of the table: "order_type" */
  update_order_type?: Maybe<Order_Type_Mutation_Response>
  /** update single row of the table: "order_type" */
  update_order_type_by_pk?: Maybe<Order_Type>
  /** update data of the table: "order_vision" */
  update_order_vision?: Maybe<Order_Vision_Mutation_Response>
  /** update single row of the table: "order_vision" */
  update_order_vision_by_pk?: Maybe<Order_Vision>
  /** update data of the table: "orders" */
  update_orders?: Maybe<Orders_Mutation_Response>
  /** update single row of the table: "orders" */
  update_orders_by_pk?: Maybe<Orders>
  /** update data of the table: "organizations" */
  update_organizations?: Maybe<Organizations_Mutation_Response>
  /** update single row of the table: "organizations" */
  update_organizations_by_pk?: Maybe<Organizations>
  /** update data of the table: "place_of_service" */
  update_place_of_service?: Maybe<Place_Of_Service_Mutation_Response>
  /** update single row of the table: "place_of_service" */
  update_place_of_service_by_pk?: Maybe<Place_Of_Service>
  /** update data of the table: "session_logs" */
  update_session_logs?: Maybe<Session_Logs_Mutation_Response>
  /** update single row of the table: "session_logs" */
  update_session_logs_by_pk?: Maybe<Session_Logs>
  /** update data of the table: "session_station_order_config" */
  update_session_station_order_config?: Maybe<Session_Station_Order_Config_Mutation_Response>
  /** update single row of the table: "session_station_order_config" */
  update_session_station_order_config_by_pk?: Maybe<Session_Station_Order_Config>
  /** update data of the table: "session_type" */
  update_session_type?: Maybe<Session_Type_Mutation_Response>
  /** update single row of the table: "session_type" */
  update_session_type_by_pk?: Maybe<Session_Type>
  /** update data of the table: "sessions" */
  update_sessions?: Maybe<Sessions_Mutation_Response>
  /** update single row of the table: "sessions" */
  update_sessions_by_pk?: Maybe<Sessions>
  /** update data of the table: "station_orders" */
  update_station_orders?: Maybe<Station_Orders_Mutation_Response>
  /** update single row of the table: "station_orders" */
  update_station_orders_by_pk?: Maybe<Station_Orders>
  /** update data of the table: "station_type" */
  update_station_type?: Maybe<Station_Type_Mutation_Response>
  /** update single row of the table: "station_type" */
  update_station_type_by_pk?: Maybe<Station_Type>
  /** update data of the table: "station_visits" */
  update_station_visits?: Maybe<Station_Visits_Mutation_Response>
  /** update single row of the table: "station_visits" */
  update_station_visits_by_pk?: Maybe<Station_Visits>
  /** update data of the table: "stations" */
  update_stations?: Maybe<Stations_Mutation_Response>
  /** update single row of the table: "stations" */
  update_stations_by_pk?: Maybe<Stations>
  /** update data of the table: "test_orders" */
  update_test_orders?: Maybe<Test_Orders_Mutation_Response>
  /** update single row of the table: "test_orders" */
  update_test_orders_by_pk?: Maybe<Test_Orders>
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
  /** update data of the table: "video_calls" */
  update_video_calls?: Maybe<Video_Calls_Mutation_Response>
  /** update single row of the table: "video_calls" */
  update_video_calls_by_pk?: Maybe<Video_Calls>
  /** update data of the table: "visits" */
  update_visits?: Maybe<Visits_Mutation_Response>
  /** update single row of the table: "visits" */
  update_visits_by_pk?: Maybe<Visits>
}

/** mutation root */
export type Mutation_RootDelete_Assessment_OrdersArgs = {
  where: Assessment_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Assessment_Orders_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Clearance_NotesArgs = {
  where: Clearance_Notes_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Clearance_Notes_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Form_LocalizationsArgs = {
  where: Form_Localizations_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Form_Localizations_By_PkArgs = {
  locale: Scalars['String']
  type: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Form_TypesArgs = {
  where: Form_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Form_Types_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_FormsArgs = {
  where: Forms_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Forms_By_PkArgs = {
  patient_id: Scalars['String']
  type: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_LocationsArgs = {
  where: Locations_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Locations_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Medication_OrdersArgs = {
  where: Medication_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Medication_Orders_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Order_Height_And_WeightArgs = {
  where: Order_Height_And_Weight_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Order_Height_And_Weight_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Order_Medical_AssessmentArgs = {
  where: Order_Medical_Assessment_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Order_Medical_Assessment_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Order_MusculoskeletalArgs = {
  where: Order_Musculoskeletal_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Order_Musculoskeletal_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Order_TypeArgs = {
  where: Order_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Order_Type_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Order_VisionArgs = {
  where: Order_Vision_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Order_Vision_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_OrdersArgs = {
  where: Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Orders_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_OrganizationsArgs = {
  where: Organizations_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Organizations_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Place_Of_ServiceArgs = {
  where: Place_Of_Service_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Place_Of_Service_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Session_LogsArgs = {
  where: Session_Logs_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Session_Logs_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Session_Station_Order_ConfigArgs = {
  where: Session_Station_Order_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Session_Station_Order_Config_By_PkArgs = {
  order_type_id: Scalars['Int']
  session_type_id: Scalars['Int']
  station_type_id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Session_TypeArgs = {
  where: Session_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Session_Type_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
  where: Sessions_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Station_OrdersArgs = {
  where: Station_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Station_Orders_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Station_TypeArgs = {
  where: Station_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Station_Type_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Station_VisitsArgs = {
  where: Station_Visits_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Station_Visits_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_StationsArgs = {
  where: Stations_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Stations_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Test_OrdersArgs = {
  where: Test_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Test_Orders_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Video_CallsArgs = {
  where: Video_Calls_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Video_Calls_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_VisitsArgs = {
  where: Visits_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Visits_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootInsert_Assessment_OrdersArgs = {
  objects: Array<Assessment_Orders_Insert_Input>
  on_conflict?: InputMaybe<Assessment_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Assessment_Orders_OneArgs = {
  object: Assessment_Orders_Insert_Input
  on_conflict?: InputMaybe<Assessment_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Clearance_NotesArgs = {
  objects: Array<Clearance_Notes_Insert_Input>
  on_conflict?: InputMaybe<Clearance_Notes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Clearance_Notes_OneArgs = {
  object: Clearance_Notes_Insert_Input
  on_conflict?: InputMaybe<Clearance_Notes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Form_Images_OneArgs = {
  form_id: Scalars['String']
  patient_id: Scalars['String']
}

/** mutation root */
export type Mutation_RootInsert_Form_LocalizationsArgs = {
  objects: Array<Form_Localizations_Insert_Input>
  on_conflict?: InputMaybe<Form_Localizations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Form_Localizations_OneArgs = {
  object: Form_Localizations_Insert_Input
  on_conflict?: InputMaybe<Form_Localizations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Form_TypesArgs = {
  objects: Array<Form_Types_Insert_Input>
  on_conflict?: InputMaybe<Form_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Form_Types_OneArgs = {
  object: Form_Types_Insert_Input
  on_conflict?: InputMaybe<Form_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_FormsArgs = {
  objects: Array<Forms_Insert_Input>
  on_conflict?: InputMaybe<Forms_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Forms_OneArgs = {
  object: Forms_Insert_Input
  on_conflict?: InputMaybe<Forms_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_LocationsArgs = {
  objects: Array<Locations_Insert_Input>
  on_conflict?: InputMaybe<Locations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Locations_OneArgs = {
  object: Locations_Insert_Input
  on_conflict?: InputMaybe<Locations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Medication_OrdersArgs = {
  objects: Array<Medication_Orders_Insert_Input>
  on_conflict?: InputMaybe<Medication_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Medication_Orders_OneArgs = {
  object: Medication_Orders_Insert_Input
  on_conflict?: InputMaybe<Medication_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_Height_And_WeightArgs = {
  objects: Array<Order_Height_And_Weight_Insert_Input>
  on_conflict?: InputMaybe<Order_Height_And_Weight_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_Height_And_Weight_OneArgs = {
  object: Order_Height_And_Weight_Insert_Input
  on_conflict?: InputMaybe<Order_Height_And_Weight_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_Medical_AssessmentArgs = {
  objects: Array<Order_Medical_Assessment_Insert_Input>
  on_conflict?: InputMaybe<Order_Medical_Assessment_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_Medical_Assessment_OneArgs = {
  object: Order_Medical_Assessment_Insert_Input
  on_conflict?: InputMaybe<Order_Medical_Assessment_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_MusculoskeletalArgs = {
  objects: Array<Order_Musculoskeletal_Insert_Input>
  on_conflict?: InputMaybe<Order_Musculoskeletal_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_Musculoskeletal_OneArgs = {
  object: Order_Musculoskeletal_Insert_Input
  on_conflict?: InputMaybe<Order_Musculoskeletal_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_TypeArgs = {
  objects: Array<Order_Type_Insert_Input>
  on_conflict?: InputMaybe<Order_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_Type_OneArgs = {
  object: Order_Type_Insert_Input
  on_conflict?: InputMaybe<Order_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_VisionArgs = {
  objects: Array<Order_Vision_Insert_Input>
  on_conflict?: InputMaybe<Order_Vision_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Order_Vision_OneArgs = {
  object: Order_Vision_Insert_Input
  on_conflict?: InputMaybe<Order_Vision_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_OrdersArgs = {
  objects: Array<Orders_Insert_Input>
  on_conflict?: InputMaybe<Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Orders_OneArgs = {
  object: Orders_Insert_Input
  on_conflict?: InputMaybe<Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_OrganizationsArgs = {
  objects: Array<Organizations_Insert_Input>
  on_conflict?: InputMaybe<Organizations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Organizations_OneArgs = {
  object: Organizations_Insert_Input
  on_conflict?: InputMaybe<Organizations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Place_Of_ServiceArgs = {
  objects: Array<Place_Of_Service_Insert_Input>
  on_conflict?: InputMaybe<Place_Of_Service_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Place_Of_Service_OneArgs = {
  object: Place_Of_Service_Insert_Input
  on_conflict?: InputMaybe<Place_Of_Service_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Session_LogsArgs = {
  objects: Array<Session_Logs_Insert_Input>
  on_conflict?: InputMaybe<Session_Logs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Session_Logs_OneArgs = {
  object: Session_Logs_Insert_Input
  on_conflict?: InputMaybe<Session_Logs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Session_Station_Order_ConfigArgs = {
  objects: Array<Session_Station_Order_Config_Insert_Input>
  on_conflict?: InputMaybe<Session_Station_Order_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Session_Station_Order_Config_OneArgs = {
  object: Session_Station_Order_Config_Insert_Input
  on_conflict?: InputMaybe<Session_Station_Order_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Session_TypeArgs = {
  objects: Array<Session_Type_Insert_Input>
  on_conflict?: InputMaybe<Session_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Session_Type_OneArgs = {
  object: Session_Type_Insert_Input
  on_conflict?: InputMaybe<Session_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
  objects: Array<Sessions_Insert_Input>
  on_conflict?: InputMaybe<Sessions_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
  object: Sessions_Insert_Input
  on_conflict?: InputMaybe<Sessions_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Station_OrdersArgs = {
  objects: Array<Station_Orders_Insert_Input>
  on_conflict?: InputMaybe<Station_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Station_Orders_OneArgs = {
  object: Station_Orders_Insert_Input
  on_conflict?: InputMaybe<Station_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Station_TypeArgs = {
  objects: Array<Station_Type_Insert_Input>
  on_conflict?: InputMaybe<Station_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Station_Type_OneArgs = {
  object: Station_Type_Insert_Input
  on_conflict?: InputMaybe<Station_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Station_VisitsArgs = {
  objects: Array<Station_Visits_Insert_Input>
  on_conflict?: InputMaybe<Station_Visits_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Station_Visits_OneArgs = {
  object: Station_Visits_Insert_Input
  on_conflict?: InputMaybe<Station_Visits_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_StationsArgs = {
  objects: Array<Stations_Insert_Input>
  on_conflict?: InputMaybe<Stations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Stations_OneArgs = {
  object: Stations_Insert_Input
  on_conflict?: InputMaybe<Stations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Test_OrdersArgs = {
  objects: Array<Test_Orders_Insert_Input>
  on_conflict?: InputMaybe<Test_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Test_Orders_OneArgs = {
  object: Test_Orders_Insert_Input
  on_conflict?: InputMaybe<Test_Orders_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Video_CallsArgs = {
  objects: Array<Video_Calls_Insert_Input>
  on_conflict?: InputMaybe<Video_Calls_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Video_Calls_OneArgs = {
  object: Video_Calls_Insert_Input
  on_conflict?: InputMaybe<Video_Calls_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_VisitsArgs = {
  objects: Array<Visits_Insert_Input>
  on_conflict?: InputMaybe<Visits_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Visits_OneArgs = {
  object: Visits_Insert_Input
  on_conflict?: InputMaybe<Visits_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_Assessment_OrdersArgs = {
  _append?: InputMaybe<Assessment_Orders_Append_Input>
  _delete_at_path?: InputMaybe<Assessment_Orders_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Assessment_Orders_Delete_Elem_Input>
  _delete_key?: InputMaybe<Assessment_Orders_Delete_Key_Input>
  _inc?: InputMaybe<Assessment_Orders_Inc_Input>
  _prepend?: InputMaybe<Assessment_Orders_Prepend_Input>
  _set?: InputMaybe<Assessment_Orders_Set_Input>
  where: Assessment_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Assessment_Orders_By_PkArgs = {
  _append?: InputMaybe<Assessment_Orders_Append_Input>
  _delete_at_path?: InputMaybe<Assessment_Orders_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Assessment_Orders_Delete_Elem_Input>
  _delete_key?: InputMaybe<Assessment_Orders_Delete_Key_Input>
  _inc?: InputMaybe<Assessment_Orders_Inc_Input>
  _prepend?: InputMaybe<Assessment_Orders_Prepend_Input>
  _set?: InputMaybe<Assessment_Orders_Set_Input>
  pk_columns: Assessment_Orders_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Clearance_NotesArgs = {
  _inc?: InputMaybe<Clearance_Notes_Inc_Input>
  _set?: InputMaybe<Clearance_Notes_Set_Input>
  where: Clearance_Notes_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Clearance_Notes_By_PkArgs = {
  _inc?: InputMaybe<Clearance_Notes_Inc_Input>
  _set?: InputMaybe<Clearance_Notes_Set_Input>
  pk_columns: Clearance_Notes_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Form_LocalizationsArgs = {
  _append?: InputMaybe<Form_Localizations_Append_Input>
  _delete_at_path?: InputMaybe<Form_Localizations_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Form_Localizations_Delete_Elem_Input>
  _delete_key?: InputMaybe<Form_Localizations_Delete_Key_Input>
  _prepend?: InputMaybe<Form_Localizations_Prepend_Input>
  _set?: InputMaybe<Form_Localizations_Set_Input>
  where: Form_Localizations_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Form_Localizations_By_PkArgs = {
  _append?: InputMaybe<Form_Localizations_Append_Input>
  _delete_at_path?: InputMaybe<Form_Localizations_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Form_Localizations_Delete_Elem_Input>
  _delete_key?: InputMaybe<Form_Localizations_Delete_Key_Input>
  _prepend?: InputMaybe<Form_Localizations_Prepend_Input>
  _set?: InputMaybe<Form_Localizations_Set_Input>
  pk_columns: Form_Localizations_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Form_TypesArgs = {
  _append?: InputMaybe<Form_Types_Append_Input>
  _delete_at_path?: InputMaybe<Form_Types_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Form_Types_Delete_Elem_Input>
  _delete_key?: InputMaybe<Form_Types_Delete_Key_Input>
  _prepend?: InputMaybe<Form_Types_Prepend_Input>
  _set?: InputMaybe<Form_Types_Set_Input>
  where: Form_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Form_Types_By_PkArgs = {
  _append?: InputMaybe<Form_Types_Append_Input>
  _delete_at_path?: InputMaybe<Form_Types_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Form_Types_Delete_Elem_Input>
  _delete_key?: InputMaybe<Form_Types_Delete_Key_Input>
  _prepend?: InputMaybe<Form_Types_Prepend_Input>
  _set?: InputMaybe<Form_Types_Set_Input>
  pk_columns: Form_Types_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_FormsArgs = {
  _append?: InputMaybe<Forms_Append_Input>
  _delete_at_path?: InputMaybe<Forms_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Forms_Delete_Elem_Input>
  _delete_key?: InputMaybe<Forms_Delete_Key_Input>
  _prepend?: InputMaybe<Forms_Prepend_Input>
  _set?: InputMaybe<Forms_Set_Input>
  where: Forms_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Forms_By_PkArgs = {
  _append?: InputMaybe<Forms_Append_Input>
  _delete_at_path?: InputMaybe<Forms_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Forms_Delete_Elem_Input>
  _delete_key?: InputMaybe<Forms_Delete_Key_Input>
  _prepend?: InputMaybe<Forms_Prepend_Input>
  _set?: InputMaybe<Forms_Set_Input>
  pk_columns: Forms_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_LocationsArgs = {
  _inc?: InputMaybe<Locations_Inc_Input>
  _set?: InputMaybe<Locations_Set_Input>
  where: Locations_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Locations_By_PkArgs = {
  _inc?: InputMaybe<Locations_Inc_Input>
  _set?: InputMaybe<Locations_Set_Input>
  pk_columns: Locations_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Medication_OrdersArgs = {
  _inc?: InputMaybe<Medication_Orders_Inc_Input>
  _set?: InputMaybe<Medication_Orders_Set_Input>
  where: Medication_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Medication_Orders_By_PkArgs = {
  _inc?: InputMaybe<Medication_Orders_Inc_Input>
  _set?: InputMaybe<Medication_Orders_Set_Input>
  pk_columns: Medication_Orders_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Order_Height_And_WeightArgs = {
  _inc?: InputMaybe<Order_Height_And_Weight_Inc_Input>
  _set?: InputMaybe<Order_Height_And_Weight_Set_Input>
  where: Order_Height_And_Weight_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Order_Height_And_Weight_By_PkArgs = {
  _inc?: InputMaybe<Order_Height_And_Weight_Inc_Input>
  _set?: InputMaybe<Order_Height_And_Weight_Set_Input>
  pk_columns: Order_Height_And_Weight_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Order_Medical_AssessmentArgs = {
  _inc?: InputMaybe<Order_Medical_Assessment_Inc_Input>
  _set?: InputMaybe<Order_Medical_Assessment_Set_Input>
  where: Order_Medical_Assessment_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Order_Medical_Assessment_By_PkArgs = {
  _inc?: InputMaybe<Order_Medical_Assessment_Inc_Input>
  _set?: InputMaybe<Order_Medical_Assessment_Set_Input>
  pk_columns: Order_Medical_Assessment_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Order_MusculoskeletalArgs = {
  _inc?: InputMaybe<Order_Musculoskeletal_Inc_Input>
  _set?: InputMaybe<Order_Musculoskeletal_Set_Input>
  where: Order_Musculoskeletal_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Order_Musculoskeletal_By_PkArgs = {
  _inc?: InputMaybe<Order_Musculoskeletal_Inc_Input>
  _set?: InputMaybe<Order_Musculoskeletal_Set_Input>
  pk_columns: Order_Musculoskeletal_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Order_TypeArgs = {
  _inc?: InputMaybe<Order_Type_Inc_Input>
  _set?: InputMaybe<Order_Type_Set_Input>
  where: Order_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Order_Type_By_PkArgs = {
  _inc?: InputMaybe<Order_Type_Inc_Input>
  _set?: InputMaybe<Order_Type_Set_Input>
  pk_columns: Order_Type_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Order_VisionArgs = {
  _inc?: InputMaybe<Order_Vision_Inc_Input>
  _set?: InputMaybe<Order_Vision_Set_Input>
  where: Order_Vision_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Order_Vision_By_PkArgs = {
  _inc?: InputMaybe<Order_Vision_Inc_Input>
  _set?: InputMaybe<Order_Vision_Set_Input>
  pk_columns: Order_Vision_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_OrdersArgs = {
  _inc?: InputMaybe<Orders_Inc_Input>
  _set?: InputMaybe<Orders_Set_Input>
  where: Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Orders_By_PkArgs = {
  _inc?: InputMaybe<Orders_Inc_Input>
  _set?: InputMaybe<Orders_Set_Input>
  pk_columns: Orders_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_OrganizationsArgs = {
  _inc?: InputMaybe<Organizations_Inc_Input>
  _set?: InputMaybe<Organizations_Set_Input>
  where: Organizations_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Organizations_By_PkArgs = {
  _inc?: InputMaybe<Organizations_Inc_Input>
  _set?: InputMaybe<Organizations_Set_Input>
  pk_columns: Organizations_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Place_Of_ServiceArgs = {
  _inc?: InputMaybe<Place_Of_Service_Inc_Input>
  _set?: InputMaybe<Place_Of_Service_Set_Input>
  where: Place_Of_Service_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Place_Of_Service_By_PkArgs = {
  _inc?: InputMaybe<Place_Of_Service_Inc_Input>
  _set?: InputMaybe<Place_Of_Service_Set_Input>
  pk_columns: Place_Of_Service_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Session_LogsArgs = {
  _append?: InputMaybe<Session_Logs_Append_Input>
  _delete_at_path?: InputMaybe<Session_Logs_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Session_Logs_Delete_Elem_Input>
  _delete_key?: InputMaybe<Session_Logs_Delete_Key_Input>
  _inc?: InputMaybe<Session_Logs_Inc_Input>
  _prepend?: InputMaybe<Session_Logs_Prepend_Input>
  _set?: InputMaybe<Session_Logs_Set_Input>
  where: Session_Logs_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Session_Logs_By_PkArgs = {
  _append?: InputMaybe<Session_Logs_Append_Input>
  _delete_at_path?: InputMaybe<Session_Logs_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Session_Logs_Delete_Elem_Input>
  _delete_key?: InputMaybe<Session_Logs_Delete_Key_Input>
  _inc?: InputMaybe<Session_Logs_Inc_Input>
  _prepend?: InputMaybe<Session_Logs_Prepend_Input>
  _set?: InputMaybe<Session_Logs_Set_Input>
  pk_columns: Session_Logs_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Session_Station_Order_ConfigArgs = {
  _inc?: InputMaybe<Session_Station_Order_Config_Inc_Input>
  _set?: InputMaybe<Session_Station_Order_Config_Set_Input>
  where: Session_Station_Order_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Session_Station_Order_Config_By_PkArgs = {
  _inc?: InputMaybe<Session_Station_Order_Config_Inc_Input>
  _set?: InputMaybe<Session_Station_Order_Config_Set_Input>
  pk_columns: Session_Station_Order_Config_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Session_TypeArgs = {
  _inc?: InputMaybe<Session_Type_Inc_Input>
  _set?: InputMaybe<Session_Type_Set_Input>
  where: Session_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Session_Type_By_PkArgs = {
  _inc?: InputMaybe<Session_Type_Inc_Input>
  _set?: InputMaybe<Session_Type_Set_Input>
  pk_columns: Session_Type_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>
  _set?: InputMaybe<Sessions_Set_Input>
  where: Sessions_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>
  _set?: InputMaybe<Sessions_Set_Input>
  pk_columns: Sessions_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Station_OrdersArgs = {
  _inc?: InputMaybe<Station_Orders_Inc_Input>
  _set?: InputMaybe<Station_Orders_Set_Input>
  where: Station_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Station_Orders_By_PkArgs = {
  _inc?: InputMaybe<Station_Orders_Inc_Input>
  _set?: InputMaybe<Station_Orders_Set_Input>
  pk_columns: Station_Orders_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Station_TypeArgs = {
  _inc?: InputMaybe<Station_Type_Inc_Input>
  _set?: InputMaybe<Station_Type_Set_Input>
  where: Station_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Station_Type_By_PkArgs = {
  _inc?: InputMaybe<Station_Type_Inc_Input>
  _set?: InputMaybe<Station_Type_Set_Input>
  pk_columns: Station_Type_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Station_VisitsArgs = {
  _inc?: InputMaybe<Station_Visits_Inc_Input>
  _set?: InputMaybe<Station_Visits_Set_Input>
  where: Station_Visits_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Station_Visits_By_PkArgs = {
  _inc?: InputMaybe<Station_Visits_Inc_Input>
  _set?: InputMaybe<Station_Visits_Set_Input>
  pk_columns: Station_Visits_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_StationsArgs = {
  _inc?: InputMaybe<Stations_Inc_Input>
  _set?: InputMaybe<Stations_Set_Input>
  where: Stations_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Stations_By_PkArgs = {
  _inc?: InputMaybe<Stations_Inc_Input>
  _set?: InputMaybe<Stations_Set_Input>
  pk_columns: Stations_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Test_OrdersArgs = {
  _inc?: InputMaybe<Test_Orders_Inc_Input>
  _set?: InputMaybe<Test_Orders_Set_Input>
  where: Test_Orders_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Test_Orders_By_PkArgs = {
  _inc?: InputMaybe<Test_Orders_Inc_Input>
  _set?: InputMaybe<Test_Orders_Set_Input>
  pk_columns: Test_Orders_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>
  _set?: InputMaybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>
  _set?: InputMaybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Video_CallsArgs = {
  _append?: InputMaybe<Video_Calls_Append_Input>
  _delete_at_path?: InputMaybe<Video_Calls_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Video_Calls_Delete_Elem_Input>
  _delete_key?: InputMaybe<Video_Calls_Delete_Key_Input>
  _inc?: InputMaybe<Video_Calls_Inc_Input>
  _prepend?: InputMaybe<Video_Calls_Prepend_Input>
  _set?: InputMaybe<Video_Calls_Set_Input>
  where: Video_Calls_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Video_Calls_By_PkArgs = {
  _append?: InputMaybe<Video_Calls_Append_Input>
  _delete_at_path?: InputMaybe<Video_Calls_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Video_Calls_Delete_Elem_Input>
  _delete_key?: InputMaybe<Video_Calls_Delete_Key_Input>
  _inc?: InputMaybe<Video_Calls_Inc_Input>
  _prepend?: InputMaybe<Video_Calls_Prepend_Input>
  _set?: InputMaybe<Video_Calls_Set_Input>
  pk_columns: Video_Calls_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_VisitsArgs = {
  _append?: InputMaybe<Visits_Append_Input>
  _delete_at_path?: InputMaybe<Visits_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Visits_Delete_Elem_Input>
  _delete_key?: InputMaybe<Visits_Delete_Key_Input>
  _inc?: InputMaybe<Visits_Inc_Input>
  _prepend?: InputMaybe<Visits_Prepend_Input>
  _set?: InputMaybe<Visits_Set_Input>
  where: Visits_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Visits_By_PkArgs = {
  _append?: InputMaybe<Visits_Append_Input>
  _delete_at_path?: InputMaybe<Visits_Delete_At_Path_Input>
  _delete_elem?: InputMaybe<Visits_Delete_Elem_Input>
  _delete_key?: InputMaybe<Visits_Delete_Key_Input>
  _inc?: InputMaybe<Visits_Inc_Input>
  _prepend?: InputMaybe<Visits_Prepend_Input>
  _set?: InputMaybe<Visits_Set_Input>
  pk_columns: Visits_Pk_Columns_Input
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>
  _gt?: InputMaybe<Scalars['numeric']>
  _gte?: InputMaybe<Scalars['numeric']>
  _in?: InputMaybe<Array<Scalars['numeric']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['numeric']>
  _lte?: InputMaybe<Scalars['numeric']>
  _neq?: InputMaybe<Scalars['numeric']>
  _nin?: InputMaybe<Array<Scalars['numeric']>>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/**
 * order category
 *
 *
 * columns and relationships of "order_height_and_weight"
 *
 */
export type Order_Height_And_Weight = {
  __typename?: 'order_height_and_weight'
  birth_sex?: Maybe<Scalars['String']>
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  date_of_birth?: Maybe<Scalars['date']>
  height_ft?: Maybe<Scalars['Int']>
  height_in?: Maybe<Scalars['Float']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  /** An object relationship */
  order: Orders
  order_id: Scalars['Int']
  pressure_diastolic?: Maybe<Scalars['Int']>
  pressure_systolic?: Maybe<Scalars['Int']>
  pulse_bpm?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  weight_lbs?: Maybe<Scalars['Int']>
}

/** aggregated selection of "order_height_and_weight" */
export type Order_Height_And_Weight_Aggregate = {
  __typename?: 'order_height_and_weight_aggregate'
  aggregate?: Maybe<Order_Height_And_Weight_Aggregate_Fields>
  nodes: Array<Order_Height_And_Weight>
}

/** aggregate fields of "order_height_and_weight" */
export type Order_Height_And_Weight_Aggregate_Fields = {
  __typename?: 'order_height_and_weight_aggregate_fields'
  avg?: Maybe<Order_Height_And_Weight_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Order_Height_And_Weight_Max_Fields>
  min?: Maybe<Order_Height_And_Weight_Min_Fields>
  stddev?: Maybe<Order_Height_And_Weight_Stddev_Fields>
  stddev_pop?: Maybe<Order_Height_And_Weight_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Order_Height_And_Weight_Stddev_Samp_Fields>
  sum?: Maybe<Order_Height_And_Weight_Sum_Fields>
  var_pop?: Maybe<Order_Height_And_Weight_Var_Pop_Fields>
  var_samp?: Maybe<Order_Height_And_Weight_Var_Samp_Fields>
  variance?: Maybe<Order_Height_And_Weight_Variance_Fields>
}

/** aggregate fields of "order_height_and_weight" */
export type Order_Height_And_Weight_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Height_And_Weight_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Order_Height_And_Weight_Avg_Fields = {
  __typename?: 'order_height_and_weight_avg_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Float']>
  height_ft?: Maybe<Scalars['Float']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  pressure_diastolic?: Maybe<Scalars['Float']>
  pressure_systolic?: Maybe<Scalars['Float']>
  pulse_bpm?: Maybe<Scalars['Float']>
  weight_lbs?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "order_height_and_weight". All fields are combined with a logical 'AND'. */
export type Order_Height_And_Weight_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Height_And_Weight_Bool_Exp>>
  _not?: InputMaybe<Order_Height_And_Weight_Bool_Exp>
  _or?: InputMaybe<Array<Order_Height_And_Weight_Bool_Exp>>
  birth_sex?: InputMaybe<String_Comparison_Exp>
  bmi?: InputMaybe<Float_Comparison_Exp>
  bmi_percentile?: InputMaybe<Int_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  date_of_birth?: InputMaybe<Date_Comparison_Exp>
  height_ft?: InputMaybe<Int_Comparison_Exp>
  height_in?: InputMaybe<Float_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  order?: InputMaybe<Orders_Bool_Exp>
  order_id?: InputMaybe<Int_Comparison_Exp>
  pressure_diastolic?: InputMaybe<Int_Comparison_Exp>
  pressure_systolic?: InputMaybe<Int_Comparison_Exp>
  pulse_bpm?: InputMaybe<Int_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  weight_lbs?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "order_height_and_weight" */
export enum Order_Height_And_Weight_Constraint {
  /** unique or primary key constraint */
  OrderVitalSignsOrderIdKey = 'order_vital_signs_order_id_key',
  /** unique or primary key constraint */
  OrderVitalSignsPkey = 'order_vital_signs_pkey',
}

/** input type for incrementing numeric columns in table "order_height_and_weight" */
export type Order_Height_And_Weight_Inc_Input = {
  bmi?: InputMaybe<Scalars['Float']>
  bmi_percentile?: InputMaybe<Scalars['Int']>
  height_ft?: InputMaybe<Scalars['Int']>
  height_in?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['Int']>
  order_id?: InputMaybe<Scalars['Int']>
  pressure_diastolic?: InputMaybe<Scalars['Int']>
  pressure_systolic?: InputMaybe<Scalars['Int']>
  pulse_bpm?: InputMaybe<Scalars['Int']>
  weight_lbs?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "order_height_and_weight" */
export type Order_Height_And_Weight_Insert_Input = {
  birth_sex?: InputMaybe<Scalars['String']>
  bmi?: InputMaybe<Scalars['Float']>
  bmi_percentile?: InputMaybe<Scalars['Int']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  date_of_birth?: InputMaybe<Scalars['date']>
  height_ft?: InputMaybe<Scalars['Int']>
  height_in?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  order?: InputMaybe<Orders_Obj_Rel_Insert_Input>
  order_id?: InputMaybe<Scalars['Int']>
  pressure_diastolic?: InputMaybe<Scalars['Int']>
  pressure_systolic?: InputMaybe<Scalars['Int']>
  pulse_bpm?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  weight_lbs?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Order_Height_And_Weight_Max_Fields = {
  __typename?: 'order_height_and_weight_max_fields'
  birth_sex?: Maybe<Scalars['String']>
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  date_of_birth?: Maybe<Scalars['date']>
  height_ft?: Maybe<Scalars['Int']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  pressure_diastolic?: Maybe<Scalars['Int']>
  pressure_systolic?: Maybe<Scalars['Int']>
  pulse_bpm?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  weight_lbs?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Order_Height_And_Weight_Min_Fields = {
  __typename?: 'order_height_and_weight_min_fields'
  birth_sex?: Maybe<Scalars['String']>
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  date_of_birth?: Maybe<Scalars['date']>
  height_ft?: Maybe<Scalars['Int']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  pressure_diastolic?: Maybe<Scalars['Int']>
  pressure_systolic?: Maybe<Scalars['Int']>
  pulse_bpm?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  weight_lbs?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "order_height_and_weight" */
export type Order_Height_And_Weight_Mutation_Response = {
  __typename?: 'order_height_and_weight_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Order_Height_And_Weight>
}

/** input type for inserting object relation for remote table "order_height_and_weight" */
export type Order_Height_And_Weight_Obj_Rel_Insert_Input = {
  data: Order_Height_And_Weight_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Order_Height_And_Weight_On_Conflict>
}

/** on conflict condition type for table "order_height_and_weight" */
export type Order_Height_And_Weight_On_Conflict = {
  constraint: Order_Height_And_Weight_Constraint
  update_columns?: Array<Order_Height_And_Weight_Update_Column>
  where?: InputMaybe<Order_Height_And_Weight_Bool_Exp>
}

/** Ordering options when selecting data from "order_height_and_weight". */
export type Order_Height_And_Weight_Order_By = {
  birth_sex?: InputMaybe<Order_By>
  bmi?: InputMaybe<Order_By>
  bmi_percentile?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  date_of_birth?: InputMaybe<Order_By>
  height_ft?: InputMaybe<Order_By>
  height_in?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  order?: InputMaybe<Orders_Order_By>
  order_id?: InputMaybe<Order_By>
  pressure_diastolic?: InputMaybe<Order_By>
  pressure_systolic?: InputMaybe<Order_By>
  pulse_bpm?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  weight_lbs?: InputMaybe<Order_By>
}

/** primary key columns input for table: order_height_and_weight */
export type Order_Height_And_Weight_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "order_height_and_weight" */
export enum Order_Height_And_Weight_Select_Column {
  /** column name */
  BirthSex = 'birth_sex',
  /** column name */
  Bmi = 'bmi',
  /** column name */
  BmiPercentile = 'bmi_percentile',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  HeightFt = 'height_ft',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PressureDiastolic = 'pressure_diastolic',
  /** column name */
  PressureSystolic = 'pressure_systolic',
  /** column name */
  PulseBpm = 'pulse_bpm',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WeightLbs = 'weight_lbs',
}

/** input type for updating data in table "order_height_and_weight" */
export type Order_Height_And_Weight_Set_Input = {
  birth_sex?: InputMaybe<Scalars['String']>
  bmi?: InputMaybe<Scalars['Float']>
  bmi_percentile?: InputMaybe<Scalars['Int']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  date_of_birth?: InputMaybe<Scalars['date']>
  height_ft?: InputMaybe<Scalars['Int']>
  height_in?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  order_id?: InputMaybe<Scalars['Int']>
  pressure_diastolic?: InputMaybe<Scalars['Int']>
  pressure_systolic?: InputMaybe<Scalars['Int']>
  pulse_bpm?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  weight_lbs?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Order_Height_And_Weight_Stddev_Fields = {
  __typename?: 'order_height_and_weight_stddev_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Float']>
  height_ft?: Maybe<Scalars['Float']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  pressure_diastolic?: Maybe<Scalars['Float']>
  pressure_systolic?: Maybe<Scalars['Float']>
  pulse_bpm?: Maybe<Scalars['Float']>
  weight_lbs?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Order_Height_And_Weight_Stddev_Pop_Fields = {
  __typename?: 'order_height_and_weight_stddev_pop_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Float']>
  height_ft?: Maybe<Scalars['Float']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  pressure_diastolic?: Maybe<Scalars['Float']>
  pressure_systolic?: Maybe<Scalars['Float']>
  pulse_bpm?: Maybe<Scalars['Float']>
  weight_lbs?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Order_Height_And_Weight_Stddev_Samp_Fields = {
  __typename?: 'order_height_and_weight_stddev_samp_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Float']>
  height_ft?: Maybe<Scalars['Float']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  pressure_diastolic?: Maybe<Scalars['Float']>
  pressure_systolic?: Maybe<Scalars['Float']>
  pulse_bpm?: Maybe<Scalars['Float']>
  weight_lbs?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Order_Height_And_Weight_Sum_Fields = {
  __typename?: 'order_height_and_weight_sum_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Int']>
  height_ft?: Maybe<Scalars['Int']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  pressure_diastolic?: Maybe<Scalars['Int']>
  pressure_systolic?: Maybe<Scalars['Int']>
  pulse_bpm?: Maybe<Scalars['Int']>
  weight_lbs?: Maybe<Scalars['Int']>
}

/** update columns of table "order_height_and_weight" */
export enum Order_Height_And_Weight_Update_Column {
  /** column name */
  BirthSex = 'birth_sex',
  /** column name */
  Bmi = 'bmi',
  /** column name */
  BmiPercentile = 'bmi_percentile',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  HeightFt = 'height_ft',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PressureDiastolic = 'pressure_diastolic',
  /** column name */
  PressureSystolic = 'pressure_systolic',
  /** column name */
  PulseBpm = 'pulse_bpm',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WeightLbs = 'weight_lbs',
}

/** aggregate var_pop on columns */
export type Order_Height_And_Weight_Var_Pop_Fields = {
  __typename?: 'order_height_and_weight_var_pop_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Float']>
  height_ft?: Maybe<Scalars['Float']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  pressure_diastolic?: Maybe<Scalars['Float']>
  pressure_systolic?: Maybe<Scalars['Float']>
  pulse_bpm?: Maybe<Scalars['Float']>
  weight_lbs?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Order_Height_And_Weight_Var_Samp_Fields = {
  __typename?: 'order_height_and_weight_var_samp_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Float']>
  height_ft?: Maybe<Scalars['Float']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  pressure_diastolic?: Maybe<Scalars['Float']>
  pressure_systolic?: Maybe<Scalars['Float']>
  pulse_bpm?: Maybe<Scalars['Float']>
  weight_lbs?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Order_Height_And_Weight_Variance_Fields = {
  __typename?: 'order_height_and_weight_variance_fields'
  bmi?: Maybe<Scalars['Float']>
  bmi_percentile?: Maybe<Scalars['Float']>
  height_ft?: Maybe<Scalars['Float']>
  height_in?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  pressure_diastolic?: Maybe<Scalars['Float']>
  pressure_systolic?: Maybe<Scalars['Float']>
  pulse_bpm?: Maybe<Scalars['Float']>
  weight_lbs?: Maybe<Scalars['Float']>
}

/** columns and relationships of "order_medical_assessment" */
export type Order_Medical_Assessment = {
  __typename?: 'order_medical_assessment'
  abdomen?: Maybe<Scalars['String']>
  abdomen_notes?: Maybe<Scalars['String']>
  appearance?: Maybe<Scalars['String']>
  appearance_notes?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  eyes_ears_nose_throat?: Maybe<Scalars['String']>
  eyes_ears_nose_throat_notes?: Maybe<Scalars['String']>
  heart_auscultation_standing_position?: Maybe<Scalars['String']>
  heart_auscultation_standing_position_notes?: Maybe<Scalars['String']>
  heart_auscultation_supine_position?: Maybe<Scalars['String']>
  heart_auscultation_supine_position_notes?: Maybe<Scalars['String']>
  heart_lower_pulses?: Maybe<Scalars['String']>
  heart_lower_pulses_notes?: Maybe<Scalars['String']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  is_pupils_equal?: Maybe<Scalars['Boolean']>
  lungs?: Maybe<Scalars['String']>
  lungs_notes?: Maybe<Scalars['String']>
  lymph_nodes?: Maybe<Scalars['String']>
  lymph_nodes_notes?: Maybe<Scalars['String']>
  marfans_stigmata?: Maybe<Scalars['String']>
  marfans_stigmata_notes?: Maybe<Scalars['String']>
  /** An object relationship */
  order: Orders
  order_id: Scalars['Int']
  pulses?: Maybe<Scalars['String']>
  pulses_notes?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  skin?: Maybe<Scalars['String']>
  skin_notes?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregated selection of "order_medical_assessment" */
export type Order_Medical_Assessment_Aggregate = {
  __typename?: 'order_medical_assessment_aggregate'
  aggregate?: Maybe<Order_Medical_Assessment_Aggregate_Fields>
  nodes: Array<Order_Medical_Assessment>
}

/** aggregate fields of "order_medical_assessment" */
export type Order_Medical_Assessment_Aggregate_Fields = {
  __typename?: 'order_medical_assessment_aggregate_fields'
  avg?: Maybe<Order_Medical_Assessment_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Order_Medical_Assessment_Max_Fields>
  min?: Maybe<Order_Medical_Assessment_Min_Fields>
  stddev?: Maybe<Order_Medical_Assessment_Stddev_Fields>
  stddev_pop?: Maybe<Order_Medical_Assessment_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Order_Medical_Assessment_Stddev_Samp_Fields>
  sum?: Maybe<Order_Medical_Assessment_Sum_Fields>
  var_pop?: Maybe<Order_Medical_Assessment_Var_Pop_Fields>
  var_samp?: Maybe<Order_Medical_Assessment_Var_Samp_Fields>
  variance?: Maybe<Order_Medical_Assessment_Variance_Fields>
}

/** aggregate fields of "order_medical_assessment" */
export type Order_Medical_Assessment_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Medical_Assessment_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Order_Medical_Assessment_Avg_Fields = {
  __typename?: 'order_medical_assessment_avg_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "order_medical_assessment". All fields are combined with a logical 'AND'. */
export type Order_Medical_Assessment_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Medical_Assessment_Bool_Exp>>
  _not?: InputMaybe<Order_Medical_Assessment_Bool_Exp>
  _or?: InputMaybe<Array<Order_Medical_Assessment_Bool_Exp>>
  abdomen?: InputMaybe<String_Comparison_Exp>
  abdomen_notes?: InputMaybe<String_Comparison_Exp>
  appearance?: InputMaybe<String_Comparison_Exp>
  appearance_notes?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  eyes_ears_nose_throat?: InputMaybe<String_Comparison_Exp>
  eyes_ears_nose_throat_notes?: InputMaybe<String_Comparison_Exp>
  heart_auscultation_standing_position?: InputMaybe<String_Comparison_Exp>
  heart_auscultation_standing_position_notes?: InputMaybe<String_Comparison_Exp>
  heart_auscultation_supine_position?: InputMaybe<String_Comparison_Exp>
  heart_auscultation_supine_position_notes?: InputMaybe<String_Comparison_Exp>
  heart_lower_pulses?: InputMaybe<String_Comparison_Exp>
  heart_lower_pulses_notes?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  is_pupils_equal?: InputMaybe<Boolean_Comparison_Exp>
  lungs?: InputMaybe<String_Comparison_Exp>
  lungs_notes?: InputMaybe<String_Comparison_Exp>
  lymph_nodes?: InputMaybe<String_Comparison_Exp>
  lymph_nodes_notes?: InputMaybe<String_Comparison_Exp>
  marfans_stigmata?: InputMaybe<String_Comparison_Exp>
  marfans_stigmata_notes?: InputMaybe<String_Comparison_Exp>
  order?: InputMaybe<Orders_Bool_Exp>
  order_id?: InputMaybe<Int_Comparison_Exp>
  pulses?: InputMaybe<String_Comparison_Exp>
  pulses_notes?: InputMaybe<String_Comparison_Exp>
  signature?: InputMaybe<String_Comparison_Exp>
  skin?: InputMaybe<String_Comparison_Exp>
  skin_notes?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "order_medical_assessment" */
export enum Order_Medical_Assessment_Constraint {
  /** unique or primary key constraint */
  OrderMedicalAssessmentOrderIdKey = 'order_medical_assessment_order_id_key',
  /** unique or primary key constraint */
  OrderMedicalAssessmentPkey = 'order_medical_assessment_pkey',
}

/** input type for incrementing numeric columns in table "order_medical_assessment" */
export type Order_Medical_Assessment_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  order_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "order_medical_assessment" */
export type Order_Medical_Assessment_Insert_Input = {
  abdomen?: InputMaybe<Scalars['String']>
  abdomen_notes?: InputMaybe<Scalars['String']>
  appearance?: InputMaybe<Scalars['String']>
  appearance_notes?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  eyes_ears_nose_throat?: InputMaybe<Scalars['String']>
  eyes_ears_nose_throat_notes?: InputMaybe<Scalars['String']>
  heart_auscultation_standing_position?: InputMaybe<Scalars['String']>
  heart_auscultation_standing_position_notes?: InputMaybe<Scalars['String']>
  heart_auscultation_supine_position?: InputMaybe<Scalars['String']>
  heart_auscultation_supine_position_notes?: InputMaybe<Scalars['String']>
  heart_lower_pulses?: InputMaybe<Scalars['String']>
  heart_lower_pulses_notes?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_pupils_equal?: InputMaybe<Scalars['Boolean']>
  lungs?: InputMaybe<Scalars['String']>
  lungs_notes?: InputMaybe<Scalars['String']>
  lymph_nodes?: InputMaybe<Scalars['String']>
  lymph_nodes_notes?: InputMaybe<Scalars['String']>
  marfans_stigmata?: InputMaybe<Scalars['String']>
  marfans_stigmata_notes?: InputMaybe<Scalars['String']>
  order?: InputMaybe<Orders_Obj_Rel_Insert_Input>
  order_id?: InputMaybe<Scalars['Int']>
  pulses?: InputMaybe<Scalars['String']>
  pulses_notes?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  skin?: InputMaybe<Scalars['String']>
  skin_notes?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Order_Medical_Assessment_Max_Fields = {
  __typename?: 'order_medical_assessment_max_fields'
  abdomen?: Maybe<Scalars['String']>
  abdomen_notes?: Maybe<Scalars['String']>
  appearance?: Maybe<Scalars['String']>
  appearance_notes?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  eyes_ears_nose_throat?: Maybe<Scalars['String']>
  eyes_ears_nose_throat_notes?: Maybe<Scalars['String']>
  heart_auscultation_standing_position?: Maybe<Scalars['String']>
  heart_auscultation_standing_position_notes?: Maybe<Scalars['String']>
  heart_auscultation_supine_position?: Maybe<Scalars['String']>
  heart_auscultation_supine_position_notes?: Maybe<Scalars['String']>
  heart_lower_pulses?: Maybe<Scalars['String']>
  heart_lower_pulses_notes?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  lungs?: Maybe<Scalars['String']>
  lungs_notes?: Maybe<Scalars['String']>
  lymph_nodes?: Maybe<Scalars['String']>
  lymph_nodes_notes?: Maybe<Scalars['String']>
  marfans_stigmata?: Maybe<Scalars['String']>
  marfans_stigmata_notes?: Maybe<Scalars['String']>
  order_id?: Maybe<Scalars['Int']>
  pulses?: Maybe<Scalars['String']>
  pulses_notes?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  skin?: Maybe<Scalars['String']>
  skin_notes?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Order_Medical_Assessment_Min_Fields = {
  __typename?: 'order_medical_assessment_min_fields'
  abdomen?: Maybe<Scalars['String']>
  abdomen_notes?: Maybe<Scalars['String']>
  appearance?: Maybe<Scalars['String']>
  appearance_notes?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  eyes_ears_nose_throat?: Maybe<Scalars['String']>
  eyes_ears_nose_throat_notes?: Maybe<Scalars['String']>
  heart_auscultation_standing_position?: Maybe<Scalars['String']>
  heart_auscultation_standing_position_notes?: Maybe<Scalars['String']>
  heart_auscultation_supine_position?: Maybe<Scalars['String']>
  heart_auscultation_supine_position_notes?: Maybe<Scalars['String']>
  heart_lower_pulses?: Maybe<Scalars['String']>
  heart_lower_pulses_notes?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  lungs?: Maybe<Scalars['String']>
  lungs_notes?: Maybe<Scalars['String']>
  lymph_nodes?: Maybe<Scalars['String']>
  lymph_nodes_notes?: Maybe<Scalars['String']>
  marfans_stigmata?: Maybe<Scalars['String']>
  marfans_stigmata_notes?: Maybe<Scalars['String']>
  order_id?: Maybe<Scalars['Int']>
  pulses?: Maybe<Scalars['String']>
  pulses_notes?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  skin?: Maybe<Scalars['String']>
  skin_notes?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "order_medical_assessment" */
export type Order_Medical_Assessment_Mutation_Response = {
  __typename?: 'order_medical_assessment_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Order_Medical_Assessment>
}

/** input type for inserting object relation for remote table "order_medical_assessment" */
export type Order_Medical_Assessment_Obj_Rel_Insert_Input = {
  data: Order_Medical_Assessment_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Order_Medical_Assessment_On_Conflict>
}

/** on conflict condition type for table "order_medical_assessment" */
export type Order_Medical_Assessment_On_Conflict = {
  constraint: Order_Medical_Assessment_Constraint
  update_columns?: Array<Order_Medical_Assessment_Update_Column>
  where?: InputMaybe<Order_Medical_Assessment_Bool_Exp>
}

/** Ordering options when selecting data from "order_medical_assessment". */
export type Order_Medical_Assessment_Order_By = {
  abdomen?: InputMaybe<Order_By>
  abdomen_notes?: InputMaybe<Order_By>
  appearance?: InputMaybe<Order_By>
  appearance_notes?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  eyes_ears_nose_throat?: InputMaybe<Order_By>
  eyes_ears_nose_throat_notes?: InputMaybe<Order_By>
  heart_auscultation_standing_position?: InputMaybe<Order_By>
  heart_auscultation_standing_position_notes?: InputMaybe<Order_By>
  heart_auscultation_supine_position?: InputMaybe<Order_By>
  heart_auscultation_supine_position_notes?: InputMaybe<Order_By>
  heart_lower_pulses?: InputMaybe<Order_By>
  heart_lower_pulses_notes?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  is_pupils_equal?: InputMaybe<Order_By>
  lungs?: InputMaybe<Order_By>
  lungs_notes?: InputMaybe<Order_By>
  lymph_nodes?: InputMaybe<Order_By>
  lymph_nodes_notes?: InputMaybe<Order_By>
  marfans_stigmata?: InputMaybe<Order_By>
  marfans_stigmata_notes?: InputMaybe<Order_By>
  order?: InputMaybe<Orders_Order_By>
  order_id?: InputMaybe<Order_By>
  pulses?: InputMaybe<Order_By>
  pulses_notes?: InputMaybe<Order_By>
  signature?: InputMaybe<Order_By>
  skin?: InputMaybe<Order_By>
  skin_notes?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** primary key columns input for table: order_medical_assessment */
export type Order_Medical_Assessment_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "order_medical_assessment" */
export enum Order_Medical_Assessment_Select_Column {
  /** column name */
  Abdomen = 'abdomen',
  /** column name */
  AbdomenNotes = 'abdomen_notes',
  /** column name */
  Appearance = 'appearance',
  /** column name */
  AppearanceNotes = 'appearance_notes',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EyesEarsNoseThroat = 'eyes_ears_nose_throat',
  /** column name */
  EyesEarsNoseThroatNotes = 'eyes_ears_nose_throat_notes',
  /** column name */
  HeartAuscultationStandingPosition = 'heart_auscultation_standing_position',
  /** column name */
  HeartAuscultationStandingPositionNotes = 'heart_auscultation_standing_position_notes',
  /** column name */
  HeartAuscultationSupinePosition = 'heart_auscultation_supine_position',
  /** column name */
  HeartAuscultationSupinePositionNotes = 'heart_auscultation_supine_position_notes',
  /** column name */
  HeartLowerPulses = 'heart_lower_pulses',
  /** column name */
  HeartLowerPulsesNotes = 'heart_lower_pulses_notes',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsPupilsEqual = 'is_pupils_equal',
  /** column name */
  Lungs = 'lungs',
  /** column name */
  LungsNotes = 'lungs_notes',
  /** column name */
  LymphNodes = 'lymph_nodes',
  /** column name */
  LymphNodesNotes = 'lymph_nodes_notes',
  /** column name */
  MarfansStigmata = 'marfans_stigmata',
  /** column name */
  MarfansStigmataNotes = 'marfans_stigmata_notes',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Pulses = 'pulses',
  /** column name */
  PulsesNotes = 'pulses_notes',
  /** column name */
  Signature = 'signature',
  /** column name */
  Skin = 'skin',
  /** column name */
  SkinNotes = 'skin_notes',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "order_medical_assessment" */
export type Order_Medical_Assessment_Set_Input = {
  abdomen?: InputMaybe<Scalars['String']>
  abdomen_notes?: InputMaybe<Scalars['String']>
  appearance?: InputMaybe<Scalars['String']>
  appearance_notes?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  eyes_ears_nose_throat?: InputMaybe<Scalars['String']>
  eyes_ears_nose_throat_notes?: InputMaybe<Scalars['String']>
  heart_auscultation_standing_position?: InputMaybe<Scalars['String']>
  heart_auscultation_standing_position_notes?: InputMaybe<Scalars['String']>
  heart_auscultation_supine_position?: InputMaybe<Scalars['String']>
  heart_auscultation_supine_position_notes?: InputMaybe<Scalars['String']>
  heart_lower_pulses?: InputMaybe<Scalars['String']>
  heart_lower_pulses_notes?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_pupils_equal?: InputMaybe<Scalars['Boolean']>
  lungs?: InputMaybe<Scalars['String']>
  lungs_notes?: InputMaybe<Scalars['String']>
  lymph_nodes?: InputMaybe<Scalars['String']>
  lymph_nodes_notes?: InputMaybe<Scalars['String']>
  marfans_stigmata?: InputMaybe<Scalars['String']>
  marfans_stigmata_notes?: InputMaybe<Scalars['String']>
  order_id?: InputMaybe<Scalars['Int']>
  pulses?: InputMaybe<Scalars['String']>
  pulses_notes?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  skin?: InputMaybe<Scalars['String']>
  skin_notes?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type Order_Medical_Assessment_Stddev_Fields = {
  __typename?: 'order_medical_assessment_stddev_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Order_Medical_Assessment_Stddev_Pop_Fields = {
  __typename?: 'order_medical_assessment_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Order_Medical_Assessment_Stddev_Samp_Fields = {
  __typename?: 'order_medical_assessment_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Order_Medical_Assessment_Sum_Fields = {
  __typename?: 'order_medical_assessment_sum_fields'
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
}

/** update columns of table "order_medical_assessment" */
export enum Order_Medical_Assessment_Update_Column {
  /** column name */
  Abdomen = 'abdomen',
  /** column name */
  AbdomenNotes = 'abdomen_notes',
  /** column name */
  Appearance = 'appearance',
  /** column name */
  AppearanceNotes = 'appearance_notes',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EyesEarsNoseThroat = 'eyes_ears_nose_throat',
  /** column name */
  EyesEarsNoseThroatNotes = 'eyes_ears_nose_throat_notes',
  /** column name */
  HeartAuscultationStandingPosition = 'heart_auscultation_standing_position',
  /** column name */
  HeartAuscultationStandingPositionNotes = 'heart_auscultation_standing_position_notes',
  /** column name */
  HeartAuscultationSupinePosition = 'heart_auscultation_supine_position',
  /** column name */
  HeartAuscultationSupinePositionNotes = 'heart_auscultation_supine_position_notes',
  /** column name */
  HeartLowerPulses = 'heart_lower_pulses',
  /** column name */
  HeartLowerPulsesNotes = 'heart_lower_pulses_notes',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsPupilsEqual = 'is_pupils_equal',
  /** column name */
  Lungs = 'lungs',
  /** column name */
  LungsNotes = 'lungs_notes',
  /** column name */
  LymphNodes = 'lymph_nodes',
  /** column name */
  LymphNodesNotes = 'lymph_nodes_notes',
  /** column name */
  MarfansStigmata = 'marfans_stigmata',
  /** column name */
  MarfansStigmataNotes = 'marfans_stigmata_notes',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Pulses = 'pulses',
  /** column name */
  PulsesNotes = 'pulses_notes',
  /** column name */
  Signature = 'signature',
  /** column name */
  Skin = 'skin',
  /** column name */
  SkinNotes = 'skin_notes',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type Order_Medical_Assessment_Var_Pop_Fields = {
  __typename?: 'order_medical_assessment_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Order_Medical_Assessment_Var_Samp_Fields = {
  __typename?: 'order_medical_assessment_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Order_Medical_Assessment_Variance_Fields = {
  __typename?: 'order_medical_assessment_variance_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "order_musculoskeletal" */
export type Order_Musculoskeletal = {
  __typename?: 'order_musculoskeletal'
  back?: Maybe<Scalars['String']>
  back_notes?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  elbow_or_forearm?: Maybe<Scalars['String']>
  elbow_or_forearm_notes?: Maybe<Scalars['String']>
  foot?: Maybe<Scalars['String']>
  foot_notes?: Maybe<Scalars['String']>
  hip_or_thigh?: Maybe<Scalars['String']>
  hip_or_thigh_notes?: Maybe<Scalars['String']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  knee?: Maybe<Scalars['String']>
  knee_notes?: Maybe<Scalars['String']>
  leg_or_ankle?: Maybe<Scalars['String']>
  leg_or_ankle_notes?: Maybe<Scalars['String']>
  neck?: Maybe<Scalars['String']>
  neck_notes?: Maybe<Scalars['String']>
  /** An object relationship */
  order: Orders
  order_id: Scalars['Int']
  shoulder_or_arm?: Maybe<Scalars['String']>
  shoulder_or_arm_notes?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  wrist_or_hand?: Maybe<Scalars['String']>
  wrist_or_hand_notes?: Maybe<Scalars['String']>
}

/** aggregated selection of "order_musculoskeletal" */
export type Order_Musculoskeletal_Aggregate = {
  __typename?: 'order_musculoskeletal_aggregate'
  aggregate?: Maybe<Order_Musculoskeletal_Aggregate_Fields>
  nodes: Array<Order_Musculoskeletal>
}

/** aggregate fields of "order_musculoskeletal" */
export type Order_Musculoskeletal_Aggregate_Fields = {
  __typename?: 'order_musculoskeletal_aggregate_fields'
  avg?: Maybe<Order_Musculoskeletal_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Order_Musculoskeletal_Max_Fields>
  min?: Maybe<Order_Musculoskeletal_Min_Fields>
  stddev?: Maybe<Order_Musculoskeletal_Stddev_Fields>
  stddev_pop?: Maybe<Order_Musculoskeletal_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Order_Musculoskeletal_Stddev_Samp_Fields>
  sum?: Maybe<Order_Musculoskeletal_Sum_Fields>
  var_pop?: Maybe<Order_Musculoskeletal_Var_Pop_Fields>
  var_samp?: Maybe<Order_Musculoskeletal_Var_Samp_Fields>
  variance?: Maybe<Order_Musculoskeletal_Variance_Fields>
}

/** aggregate fields of "order_musculoskeletal" */
export type Order_Musculoskeletal_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Musculoskeletal_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Order_Musculoskeletal_Avg_Fields = {
  __typename?: 'order_musculoskeletal_avg_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "order_musculoskeletal". All fields are combined with a logical 'AND'. */
export type Order_Musculoskeletal_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Musculoskeletal_Bool_Exp>>
  _not?: InputMaybe<Order_Musculoskeletal_Bool_Exp>
  _or?: InputMaybe<Array<Order_Musculoskeletal_Bool_Exp>>
  back?: InputMaybe<String_Comparison_Exp>
  back_notes?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  elbow_or_forearm?: InputMaybe<String_Comparison_Exp>
  elbow_or_forearm_notes?: InputMaybe<String_Comparison_Exp>
  foot?: InputMaybe<String_Comparison_Exp>
  foot_notes?: InputMaybe<String_Comparison_Exp>
  hip_or_thigh?: InputMaybe<String_Comparison_Exp>
  hip_or_thigh_notes?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  knee?: InputMaybe<String_Comparison_Exp>
  knee_notes?: InputMaybe<String_Comparison_Exp>
  leg_or_ankle?: InputMaybe<String_Comparison_Exp>
  leg_or_ankle_notes?: InputMaybe<String_Comparison_Exp>
  neck?: InputMaybe<String_Comparison_Exp>
  neck_notes?: InputMaybe<String_Comparison_Exp>
  order?: InputMaybe<Orders_Bool_Exp>
  order_id?: InputMaybe<Int_Comparison_Exp>
  shoulder_or_arm?: InputMaybe<String_Comparison_Exp>
  shoulder_or_arm_notes?: InputMaybe<String_Comparison_Exp>
  signature?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  wrist_or_hand?: InputMaybe<String_Comparison_Exp>
  wrist_or_hand_notes?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "order_musculoskeletal" */
export enum Order_Musculoskeletal_Constraint {
  /** unique or primary key constraint */
  OrderMusculoskeletalOrderIdKey = 'order_musculoskeletal_order_id_key',
  /** unique or primary key constraint */
  OrderMusculoskeletalPkey = 'order_musculoskeletal_pkey',
}

/** input type for incrementing numeric columns in table "order_musculoskeletal" */
export type Order_Musculoskeletal_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  order_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "order_musculoskeletal" */
export type Order_Musculoskeletal_Insert_Input = {
  back?: InputMaybe<Scalars['String']>
  back_notes?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  elbow_or_forearm?: InputMaybe<Scalars['String']>
  elbow_or_forearm_notes?: InputMaybe<Scalars['String']>
  foot?: InputMaybe<Scalars['String']>
  foot_notes?: InputMaybe<Scalars['String']>
  hip_or_thigh?: InputMaybe<Scalars['String']>
  hip_or_thigh_notes?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  knee?: InputMaybe<Scalars['String']>
  knee_notes?: InputMaybe<Scalars['String']>
  leg_or_ankle?: InputMaybe<Scalars['String']>
  leg_or_ankle_notes?: InputMaybe<Scalars['String']>
  neck?: InputMaybe<Scalars['String']>
  neck_notes?: InputMaybe<Scalars['String']>
  order?: InputMaybe<Orders_Obj_Rel_Insert_Input>
  order_id?: InputMaybe<Scalars['Int']>
  shoulder_or_arm?: InputMaybe<Scalars['String']>
  shoulder_or_arm_notes?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  wrist_or_hand?: InputMaybe<Scalars['String']>
  wrist_or_hand_notes?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Order_Musculoskeletal_Max_Fields = {
  __typename?: 'order_musculoskeletal_max_fields'
  back?: Maybe<Scalars['String']>
  back_notes?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  elbow_or_forearm?: Maybe<Scalars['String']>
  elbow_or_forearm_notes?: Maybe<Scalars['String']>
  foot?: Maybe<Scalars['String']>
  foot_notes?: Maybe<Scalars['String']>
  hip_or_thigh?: Maybe<Scalars['String']>
  hip_or_thigh_notes?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  knee?: Maybe<Scalars['String']>
  knee_notes?: Maybe<Scalars['String']>
  leg_or_ankle?: Maybe<Scalars['String']>
  leg_or_ankle_notes?: Maybe<Scalars['String']>
  neck?: Maybe<Scalars['String']>
  neck_notes?: Maybe<Scalars['String']>
  order_id?: Maybe<Scalars['Int']>
  shoulder_or_arm?: Maybe<Scalars['String']>
  shoulder_or_arm_notes?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  wrist_or_hand?: Maybe<Scalars['String']>
  wrist_or_hand_notes?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Order_Musculoskeletal_Min_Fields = {
  __typename?: 'order_musculoskeletal_min_fields'
  back?: Maybe<Scalars['String']>
  back_notes?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  elbow_or_forearm?: Maybe<Scalars['String']>
  elbow_or_forearm_notes?: Maybe<Scalars['String']>
  foot?: Maybe<Scalars['String']>
  foot_notes?: Maybe<Scalars['String']>
  hip_or_thigh?: Maybe<Scalars['String']>
  hip_or_thigh_notes?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  knee?: Maybe<Scalars['String']>
  knee_notes?: Maybe<Scalars['String']>
  leg_or_ankle?: Maybe<Scalars['String']>
  leg_or_ankle_notes?: Maybe<Scalars['String']>
  neck?: Maybe<Scalars['String']>
  neck_notes?: Maybe<Scalars['String']>
  order_id?: Maybe<Scalars['Int']>
  shoulder_or_arm?: Maybe<Scalars['String']>
  shoulder_or_arm_notes?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  wrist_or_hand?: Maybe<Scalars['String']>
  wrist_or_hand_notes?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "order_musculoskeletal" */
export type Order_Musculoskeletal_Mutation_Response = {
  __typename?: 'order_musculoskeletal_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Order_Musculoskeletal>
}

/** input type for inserting object relation for remote table "order_musculoskeletal" */
export type Order_Musculoskeletal_Obj_Rel_Insert_Input = {
  data: Order_Musculoskeletal_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Order_Musculoskeletal_On_Conflict>
}

/** on conflict condition type for table "order_musculoskeletal" */
export type Order_Musculoskeletal_On_Conflict = {
  constraint: Order_Musculoskeletal_Constraint
  update_columns?: Array<Order_Musculoskeletal_Update_Column>
  where?: InputMaybe<Order_Musculoskeletal_Bool_Exp>
}

/** Ordering options when selecting data from "order_musculoskeletal". */
export type Order_Musculoskeletal_Order_By = {
  back?: InputMaybe<Order_By>
  back_notes?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  elbow_or_forearm?: InputMaybe<Order_By>
  elbow_or_forearm_notes?: InputMaybe<Order_By>
  foot?: InputMaybe<Order_By>
  foot_notes?: InputMaybe<Order_By>
  hip_or_thigh?: InputMaybe<Order_By>
  hip_or_thigh_notes?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  knee?: InputMaybe<Order_By>
  knee_notes?: InputMaybe<Order_By>
  leg_or_ankle?: InputMaybe<Order_By>
  leg_or_ankle_notes?: InputMaybe<Order_By>
  neck?: InputMaybe<Order_By>
  neck_notes?: InputMaybe<Order_By>
  order?: InputMaybe<Orders_Order_By>
  order_id?: InputMaybe<Order_By>
  shoulder_or_arm?: InputMaybe<Order_By>
  shoulder_or_arm_notes?: InputMaybe<Order_By>
  signature?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  wrist_or_hand?: InputMaybe<Order_By>
  wrist_or_hand_notes?: InputMaybe<Order_By>
}

/** primary key columns input for table: order_musculoskeletal */
export type Order_Musculoskeletal_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "order_musculoskeletal" */
export enum Order_Musculoskeletal_Select_Column {
  /** column name */
  Back = 'back',
  /** column name */
  BackNotes = 'back_notes',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ElbowOrForearm = 'elbow_or_forearm',
  /** column name */
  ElbowOrForearmNotes = 'elbow_or_forearm_notes',
  /** column name */
  Foot = 'foot',
  /** column name */
  FootNotes = 'foot_notes',
  /** column name */
  HipOrThigh = 'hip_or_thigh',
  /** column name */
  HipOrThighNotes = 'hip_or_thigh_notes',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Knee = 'knee',
  /** column name */
  KneeNotes = 'knee_notes',
  /** column name */
  LegOrAnkle = 'leg_or_ankle',
  /** column name */
  LegOrAnkleNotes = 'leg_or_ankle_notes',
  /** column name */
  Neck = 'neck',
  /** column name */
  NeckNotes = 'neck_notes',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ShoulderOrArm = 'shoulder_or_arm',
  /** column name */
  ShoulderOrArmNotes = 'shoulder_or_arm_notes',
  /** column name */
  Signature = 'signature',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WristOrHand = 'wrist_or_hand',
  /** column name */
  WristOrHandNotes = 'wrist_or_hand_notes',
}

/** input type for updating data in table "order_musculoskeletal" */
export type Order_Musculoskeletal_Set_Input = {
  back?: InputMaybe<Scalars['String']>
  back_notes?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  elbow_or_forearm?: InputMaybe<Scalars['String']>
  elbow_or_forearm_notes?: InputMaybe<Scalars['String']>
  foot?: InputMaybe<Scalars['String']>
  foot_notes?: InputMaybe<Scalars['String']>
  hip_or_thigh?: InputMaybe<Scalars['String']>
  hip_or_thigh_notes?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  knee?: InputMaybe<Scalars['String']>
  knee_notes?: InputMaybe<Scalars['String']>
  leg_or_ankle?: InputMaybe<Scalars['String']>
  leg_or_ankle_notes?: InputMaybe<Scalars['String']>
  neck?: InputMaybe<Scalars['String']>
  neck_notes?: InputMaybe<Scalars['String']>
  order_id?: InputMaybe<Scalars['Int']>
  shoulder_or_arm?: InputMaybe<Scalars['String']>
  shoulder_or_arm_notes?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  wrist_or_hand?: InputMaybe<Scalars['String']>
  wrist_or_hand_notes?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Order_Musculoskeletal_Stddev_Fields = {
  __typename?: 'order_musculoskeletal_stddev_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Order_Musculoskeletal_Stddev_Pop_Fields = {
  __typename?: 'order_musculoskeletal_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Order_Musculoskeletal_Stddev_Samp_Fields = {
  __typename?: 'order_musculoskeletal_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Order_Musculoskeletal_Sum_Fields = {
  __typename?: 'order_musculoskeletal_sum_fields'
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
}

/** update columns of table "order_musculoskeletal" */
export enum Order_Musculoskeletal_Update_Column {
  /** column name */
  Back = 'back',
  /** column name */
  BackNotes = 'back_notes',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ElbowOrForearm = 'elbow_or_forearm',
  /** column name */
  ElbowOrForearmNotes = 'elbow_or_forearm_notes',
  /** column name */
  Foot = 'foot',
  /** column name */
  FootNotes = 'foot_notes',
  /** column name */
  HipOrThigh = 'hip_or_thigh',
  /** column name */
  HipOrThighNotes = 'hip_or_thigh_notes',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Knee = 'knee',
  /** column name */
  KneeNotes = 'knee_notes',
  /** column name */
  LegOrAnkle = 'leg_or_ankle',
  /** column name */
  LegOrAnkleNotes = 'leg_or_ankle_notes',
  /** column name */
  Neck = 'neck',
  /** column name */
  NeckNotes = 'neck_notes',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ShoulderOrArm = 'shoulder_or_arm',
  /** column name */
  ShoulderOrArmNotes = 'shoulder_or_arm_notes',
  /** column name */
  Signature = 'signature',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WristOrHand = 'wrist_or_hand',
  /** column name */
  WristOrHandNotes = 'wrist_or_hand_notes',
}

/** aggregate var_pop on columns */
export type Order_Musculoskeletal_Var_Pop_Fields = {
  __typename?: 'order_musculoskeletal_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Order_Musculoskeletal_Var_Samp_Fields = {
  __typename?: 'order_musculoskeletal_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Order_Musculoskeletal_Variance_Fields = {
  __typename?: 'order_musculoskeletal_variance_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "order_type" */
export type Order_Type = {
  __typename?: 'order_type'
  category: Scalars['String']
  form_type?: Maybe<Form_Types>
  form_type_id?: Maybe<Scalars['String']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  position: Scalars['Int']
}

/** aggregated selection of "order_type" */
export type Order_Type_Aggregate = {
  __typename?: 'order_type_aggregate'
  aggregate?: Maybe<Order_Type_Aggregate_Fields>
  nodes: Array<Order_Type>
}

/** aggregate fields of "order_type" */
export type Order_Type_Aggregate_Fields = {
  __typename?: 'order_type_aggregate_fields'
  avg?: Maybe<Order_Type_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Order_Type_Max_Fields>
  min?: Maybe<Order_Type_Min_Fields>
  stddev?: Maybe<Order_Type_Stddev_Fields>
  stddev_pop?: Maybe<Order_Type_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Order_Type_Stddev_Samp_Fields>
  sum?: Maybe<Order_Type_Sum_Fields>
  var_pop?: Maybe<Order_Type_Var_Pop_Fields>
  var_samp?: Maybe<Order_Type_Var_Samp_Fields>
  variance?: Maybe<Order_Type_Variance_Fields>
}

/** aggregate fields of "order_type" */
export type Order_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Type_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "order_type" */
export type Order_Type_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Type_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Order_Type_Max_Order_By>
  min?: InputMaybe<Order_Type_Min_Order_By>
  stddev?: InputMaybe<Order_Type_Stddev_Order_By>
  stddev_pop?: InputMaybe<Order_Type_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Order_Type_Stddev_Samp_Order_By>
  sum?: InputMaybe<Order_Type_Sum_Order_By>
  var_pop?: InputMaybe<Order_Type_Var_Pop_Order_By>
  var_samp?: InputMaybe<Order_Type_Var_Samp_Order_By>
  variance?: InputMaybe<Order_Type_Variance_Order_By>
}

/** input type for inserting array relation for remote table "order_type" */
export type Order_Type_Arr_Rel_Insert_Input = {
  data: Array<Order_Type_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Order_Type_On_Conflict>
}

/** aggregate avg on columns */
export type Order_Type_Avg_Fields = {
  __typename?: 'order_type_avg_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "order_type" */
export type Order_Type_Avg_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "order_type". All fields are combined with a logical 'AND'. */
export type Order_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Type_Bool_Exp>>
  _not?: InputMaybe<Order_Type_Bool_Exp>
  _or?: InputMaybe<Array<Order_Type_Bool_Exp>>
  category?: InputMaybe<String_Comparison_Exp>
  form_type_id?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  position?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "order_type" */
export enum Order_Type_Constraint {
  /** unique or primary key constraint */
  OrderTypePkey = 'order_type_pkey',
}

/** input type for incrementing numeric columns in table "order_type" */
export type Order_Type_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  position?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "order_type" */
export type Order_Type_Insert_Input = {
  category?: InputMaybe<Scalars['String']>
  form_type_id?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  position?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Order_Type_Max_Fields = {
  __typename?: 'order_type_max_fields'
  category?: Maybe<Scalars['String']>
  form_type_id?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "order_type" */
export type Order_Type_Max_Order_By = {
  category?: InputMaybe<Order_By>
  form_type_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Order_Type_Min_Fields = {
  __typename?: 'order_type_min_fields'
  category?: Maybe<Scalars['String']>
  form_type_id?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "order_type" */
export type Order_Type_Min_Order_By = {
  category?: InputMaybe<Order_By>
  form_type_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** response of any mutation on the table "order_type" */
export type Order_Type_Mutation_Response = {
  __typename?: 'order_type_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Order_Type>
}

/** input type for inserting object relation for remote table "order_type" */
export type Order_Type_Obj_Rel_Insert_Input = {
  data: Order_Type_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Order_Type_On_Conflict>
}

/** on conflict condition type for table "order_type" */
export type Order_Type_On_Conflict = {
  constraint: Order_Type_Constraint
  update_columns?: Array<Order_Type_Update_Column>
  where?: InputMaybe<Order_Type_Bool_Exp>
}

/** Ordering options when selecting data from "order_type". */
export type Order_Type_Order_By = {
  category?: InputMaybe<Order_By>
  form_type_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** primary key columns input for table: order_type */
export type Order_Type_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "order_type" */
export enum Order_Type_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  FormTypeId = 'form_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
  /** column name */
  Position = 'position',
}

/** input type for updating data in table "order_type" */
export type Order_Type_Set_Input = {
  category?: InputMaybe<Scalars['String']>
  form_type_id?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  position?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Order_Type_Stddev_Fields = {
  __typename?: 'order_type_stddev_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "order_type" */
export type Order_Type_Stddev_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Order_Type_Stddev_Pop_Fields = {
  __typename?: 'order_type_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "order_type" */
export type Order_Type_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Order_Type_Stddev_Samp_Fields = {
  __typename?: 'order_type_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "order_type" */
export type Order_Type_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type Order_Type_Sum_Fields = {
  __typename?: 'order_type_sum_fields'
  id?: Maybe<Scalars['Int']>
  position?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "order_type" */
export type Order_Type_Sum_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** update columns of table "order_type" */
export enum Order_Type_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  FormTypeId = 'form_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
  /** column name */
  Position = 'position',
}

/** aggregate var_pop on columns */
export type Order_Type_Var_Pop_Fields = {
  __typename?: 'order_type_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "order_type" */
export type Order_Type_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Order_Type_Var_Samp_Fields = {
  __typename?: 'order_type_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "order_type" */
export type Order_Type_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Order_Type_Variance_Fields = {
  __typename?: 'order_type_variance_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "order_type" */
export type Order_Type_Variance_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
}

/**
 * order category
 *
 *
 * columns and relationships of "order_vision"
 *
 */
export type Order_Vision = {
  __typename?: 'order_vision'
  created_at?: Maybe<Scalars['timestamptz']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  is_vision_corrected?: Maybe<Scalars['Boolean']>
  /** An object relationship */
  order: Orders
  order_id: Scalars['Int']
  updated_at?: Maybe<Scalars['timestamptz']>
  vision_left?: Maybe<Scalars['Int']>
  vision_right?: Maybe<Scalars['Int']>
}

/** aggregated selection of "order_vision" */
export type Order_Vision_Aggregate = {
  __typename?: 'order_vision_aggregate'
  aggregate?: Maybe<Order_Vision_Aggregate_Fields>
  nodes: Array<Order_Vision>
}

/** aggregate fields of "order_vision" */
export type Order_Vision_Aggregate_Fields = {
  __typename?: 'order_vision_aggregate_fields'
  avg?: Maybe<Order_Vision_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Order_Vision_Max_Fields>
  min?: Maybe<Order_Vision_Min_Fields>
  stddev?: Maybe<Order_Vision_Stddev_Fields>
  stddev_pop?: Maybe<Order_Vision_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Order_Vision_Stddev_Samp_Fields>
  sum?: Maybe<Order_Vision_Sum_Fields>
  var_pop?: Maybe<Order_Vision_Var_Pop_Fields>
  var_samp?: Maybe<Order_Vision_Var_Samp_Fields>
  variance?: Maybe<Order_Vision_Variance_Fields>
}

/** aggregate fields of "order_vision" */
export type Order_Vision_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Vision_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Order_Vision_Avg_Fields = {
  __typename?: 'order_vision_avg_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  vision_left?: Maybe<Scalars['Float']>
  vision_right?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "order_vision". All fields are combined with a logical 'AND'. */
export type Order_Vision_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Vision_Bool_Exp>>
  _not?: InputMaybe<Order_Vision_Bool_Exp>
  _or?: InputMaybe<Array<Order_Vision_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  is_vision_corrected?: InputMaybe<Boolean_Comparison_Exp>
  order?: InputMaybe<Orders_Bool_Exp>
  order_id?: InputMaybe<Int_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  vision_left?: InputMaybe<Int_Comparison_Exp>
  vision_right?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "order_vision" */
export enum Order_Vision_Constraint {
  /** unique or primary key constraint */
  OrderVisionOrderIdKey = 'order_vision_order_id_key',
  /** unique or primary key constraint */
  OrderVisionPkey = 'order_vision_pkey',
}

/** input type for incrementing numeric columns in table "order_vision" */
export type Order_Vision_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  order_id?: InputMaybe<Scalars['Int']>
  vision_left?: InputMaybe<Scalars['Int']>
  vision_right?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "order_vision" */
export type Order_Vision_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_vision_corrected?: InputMaybe<Scalars['Boolean']>
  order?: InputMaybe<Orders_Obj_Rel_Insert_Input>
  order_id?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  vision_left?: InputMaybe<Scalars['Int']>
  vision_right?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Order_Vision_Max_Fields = {
  __typename?: 'order_vision_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  vision_left?: Maybe<Scalars['Int']>
  vision_right?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Order_Vision_Min_Fields = {
  __typename?: 'order_vision_min_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  vision_left?: Maybe<Scalars['Int']>
  vision_right?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "order_vision" */
export type Order_Vision_Mutation_Response = {
  __typename?: 'order_vision_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Order_Vision>
}

/** input type for inserting object relation for remote table "order_vision" */
export type Order_Vision_Obj_Rel_Insert_Input = {
  data: Order_Vision_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Order_Vision_On_Conflict>
}

/** on conflict condition type for table "order_vision" */
export type Order_Vision_On_Conflict = {
  constraint: Order_Vision_Constraint
  update_columns?: Array<Order_Vision_Update_Column>
  where?: InputMaybe<Order_Vision_Bool_Exp>
}

/** Ordering options when selecting data from "order_vision". */
export type Order_Vision_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  is_vision_corrected?: InputMaybe<Order_By>
  order?: InputMaybe<Orders_Order_By>
  order_id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  vision_left?: InputMaybe<Order_By>
  vision_right?: InputMaybe<Order_By>
}

/** primary key columns input for table: order_vision */
export type Order_Vision_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "order_vision" */
export enum Order_Vision_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsVisionCorrected = 'is_vision_corrected',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisionLeft = 'vision_left',
  /** column name */
  VisionRight = 'vision_right',
}

/** input type for updating data in table "order_vision" */
export type Order_Vision_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_vision_corrected?: InputMaybe<Scalars['Boolean']>
  order_id?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  vision_left?: InputMaybe<Scalars['Int']>
  vision_right?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Order_Vision_Stddev_Fields = {
  __typename?: 'order_vision_stddev_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  vision_left?: Maybe<Scalars['Float']>
  vision_right?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Order_Vision_Stddev_Pop_Fields = {
  __typename?: 'order_vision_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  vision_left?: Maybe<Scalars['Float']>
  vision_right?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Order_Vision_Stddev_Samp_Fields = {
  __typename?: 'order_vision_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  vision_left?: Maybe<Scalars['Float']>
  vision_right?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Order_Vision_Sum_Fields = {
  __typename?: 'order_vision_sum_fields'
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  vision_left?: Maybe<Scalars['Int']>
  vision_right?: Maybe<Scalars['Int']>
}

/** update columns of table "order_vision" */
export enum Order_Vision_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsVisionCorrected = 'is_vision_corrected',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisionLeft = 'vision_left',
  /** column name */
  VisionRight = 'vision_right',
}

/** aggregate var_pop on columns */
export type Order_Vision_Var_Pop_Fields = {
  __typename?: 'order_vision_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  vision_left?: Maybe<Scalars['Float']>
  vision_right?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Order_Vision_Var_Samp_Fields = {
  __typename?: 'order_vision_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  vision_left?: Maybe<Scalars['Float']>
  vision_right?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Order_Vision_Variance_Fields = {
  __typename?: 'order_vision_variance_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  vision_left?: Maybe<Scalars['Float']>
  vision_right?: Maybe<Scalars['Float']>
}

/** columns and relationships of "orders" */
export type Orders = {
  __typename?: 'orders'
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at: Scalars['timestamptz']
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  has_uil_printed?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  is_flagged: Scalars['Boolean']
  /** An object relationship */
  order_height_and_weight?: Maybe<Order_Height_And_Weight>
  /** An object relationship */
  order_medical_assessment?: Maybe<Order_Medical_Assessment>
  /** An object relationship */
  order_musculoskeletal?: Maybe<Order_Musculoskeletal>
  /** An object relationship */
  order_type?: Maybe<Order_Type>
  order_type_id?: Maybe<Scalars['Int']>
  /** An object relationship */
  order_vision?: Maybe<Order_Vision>
  provider_id?: Maybe<Scalars['Int']>
  /** An object relationship */
  station_order?: Maybe<Station_Orders>
  status: Scalars['String']
  unread: Scalars['Boolean']
  updated_at: Scalars['timestamptz']
  /** An object relationship */
  visit: Visits
  visit_id: Scalars['Int']
}

/** aggregated selection of "orders" */
export type Orders_Aggregate = {
  __typename?: 'orders_aggregate'
  aggregate?: Maybe<Orders_Aggregate_Fields>
  nodes: Array<Orders>
}

/** aggregate fields of "orders" */
export type Orders_Aggregate_Fields = {
  __typename?: 'orders_aggregate_fields'
  avg?: Maybe<Orders_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Orders_Max_Fields>
  min?: Maybe<Orders_Min_Fields>
  stddev?: Maybe<Orders_Stddev_Fields>
  stddev_pop?: Maybe<Orders_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Orders_Stddev_Samp_Fields>
  sum?: Maybe<Orders_Sum_Fields>
  var_pop?: Maybe<Orders_Var_Pop_Fields>
  var_samp?: Maybe<Orders_Var_Samp_Fields>
  variance?: Maybe<Orders_Variance_Fields>
}

/** aggregate fields of "orders" */
export type Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Orders_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "orders" */
export type Orders_Aggregate_Order_By = {
  avg?: InputMaybe<Orders_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Orders_Max_Order_By>
  min?: InputMaybe<Orders_Min_Order_By>
  stddev?: InputMaybe<Orders_Stddev_Order_By>
  stddev_pop?: InputMaybe<Orders_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Orders_Stddev_Samp_Order_By>
  sum?: InputMaybe<Orders_Sum_Order_By>
  var_pop?: InputMaybe<Orders_Var_Pop_Order_By>
  var_samp?: InputMaybe<Orders_Var_Samp_Order_By>
  variance?: InputMaybe<Orders_Variance_Order_By>
}

/** input type for inserting array relation for remote table "orders" */
export type Orders_Arr_Rel_Insert_Input = {
  data: Array<Orders_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Orders_On_Conflict>
}

/** aggregate avg on columns */
export type Orders_Avg_Fields = {
  __typename?: 'orders_avg_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_type_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "orders" */
export type Orders_Avg_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "orders". All fields are combined with a logical 'AND'. */
export type Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Orders_Bool_Exp>>
  _not?: InputMaybe<Orders_Bool_Exp>
  _or?: InputMaybe<Array<Orders_Bool_Exp>>
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  facilitator_id?: InputMaybe<Int_Comparison_Exp>
  follow_up_instructions?: InputMaybe<String_Comparison_Exp>
  has_uil_printed?: InputMaybe<Boolean_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  is_flagged?: InputMaybe<Boolean_Comparison_Exp>
  order_height_and_weight?: InputMaybe<Order_Height_And_Weight_Bool_Exp>
  order_medical_assessment?: InputMaybe<Order_Medical_Assessment_Bool_Exp>
  order_musculoskeletal?: InputMaybe<Order_Musculoskeletal_Bool_Exp>
  order_type?: InputMaybe<Order_Type_Bool_Exp>
  order_type_id?: InputMaybe<Int_Comparison_Exp>
  order_vision?: InputMaybe<Order_Vision_Bool_Exp>
  provider_id?: InputMaybe<Int_Comparison_Exp>
  station_order?: InputMaybe<Station_Orders_Bool_Exp>
  status?: InputMaybe<String_Comparison_Exp>
  unread?: InputMaybe<Boolean_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  visit?: InputMaybe<Visits_Bool_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "orders" */
export enum Orders_Constraint {
  /** unique or primary key constraint */
  OrdersPkey = 'orders_pkey',
}

/** input type for incrementing numeric columns in table "orders" */
export type Orders_Inc_Input = {
  facilitator_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  order_type_id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "orders" */
export type Orders_Insert_Input = {
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  has_uil_printed?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_flagged?: InputMaybe<Scalars['Boolean']>
  order_height_and_weight?: InputMaybe<Order_Height_And_Weight_Obj_Rel_Insert_Input>
  order_medical_assessment?: InputMaybe<Order_Medical_Assessment_Obj_Rel_Insert_Input>
  order_musculoskeletal?: InputMaybe<Order_Musculoskeletal_Obj_Rel_Insert_Input>
  order_type?: InputMaybe<Order_Type_Obj_Rel_Insert_Input>
  order_type_id?: InputMaybe<Scalars['Int']>
  order_vision?: InputMaybe<Order_Vision_Obj_Rel_Insert_Input>
  provider_id?: InputMaybe<Scalars['Int']>
  station_order?: InputMaybe<Station_Orders_Obj_Rel_Insert_Input>
  status?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit?: InputMaybe<Visits_Obj_Rel_Insert_Input>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Orders_Max_Fields = {
  __typename?: 'orders_max_fields'
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  order_type_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "orders" */
export type Orders_Max_Order_By = {
  completed_at?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  follow_up_instructions?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Orders_Min_Fields = {
  __typename?: 'orders_min_fields'
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  order_type_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "orders" */
export type Orders_Min_Order_By = {
  completed_at?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  follow_up_instructions?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "orders" */
export type Orders_Mutation_Response = {
  __typename?: 'orders_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Orders>
}

/** input type for inserting object relation for remote table "orders" */
export type Orders_Obj_Rel_Insert_Input = {
  data: Orders_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Orders_On_Conflict>
}

/** on conflict condition type for table "orders" */
export type Orders_On_Conflict = {
  constraint: Orders_Constraint
  update_columns?: Array<Orders_Update_Column>
  where?: InputMaybe<Orders_Bool_Exp>
}

/** Ordering options when selecting data from "orders". */
export type Orders_Order_By = {
  completed_at?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  follow_up_instructions?: InputMaybe<Order_By>
  has_uil_printed?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  is_flagged?: InputMaybe<Order_By>
  order_height_and_weight?: InputMaybe<Order_Height_And_Weight_Order_By>
  order_medical_assessment?: InputMaybe<Order_Medical_Assessment_Order_By>
  order_musculoskeletal?: InputMaybe<Order_Musculoskeletal_Order_By>
  order_type?: InputMaybe<Order_Type_Order_By>
  order_type_id?: InputMaybe<Order_By>
  order_vision?: InputMaybe<Order_Vision_Order_By>
  provider_id?: InputMaybe<Order_By>
  station_order?: InputMaybe<Station_Orders_Order_By>
  status?: InputMaybe<Order_By>
  unread?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit?: InputMaybe<Visits_Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: orders */
export type Orders_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "orders" */
export enum Orders_Select_Column {
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  HasUilPrinted = 'has_uil_printed',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsFlagged = 'is_flagged',
  /** column name */
  OrderTypeId = 'order_type_id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  Status = 'status',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "orders" */
export type Orders_Set_Input = {
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  has_uil_printed?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  is_flagged?: InputMaybe<Scalars['Boolean']>
  order_type_id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Orders_Stddev_Fields = {
  __typename?: 'orders_stddev_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_type_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "orders" */
export type Orders_Stddev_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Orders_Stddev_Pop_Fields = {
  __typename?: 'orders_stddev_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_type_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "orders" */
export type Orders_Stddev_Pop_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Orders_Stddev_Samp_Fields = {
  __typename?: 'orders_stddev_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_type_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "orders" */
export type Orders_Stddev_Samp_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type Orders_Sum_Fields = {
  __typename?: 'orders_sum_fields'
  facilitator_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  order_type_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "orders" */
export type Orders_Sum_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** update columns of table "orders" */
export enum Orders_Update_Column {
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  HasUilPrinted = 'has_uil_printed',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsFlagged = 'is_flagged',
  /** column name */
  OrderTypeId = 'order_type_id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  Status = 'status',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Orders_Var_Pop_Fields = {
  __typename?: 'orders_var_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_type_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "orders" */
export type Orders_Var_Pop_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Orders_Var_Samp_Fields = {
  __typename?: 'orders_var_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_type_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "orders" */
export type Orders_Var_Samp_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Orders_Variance_Fields = {
  __typename?: 'orders_variance_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  order_type_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "orders" */
export type Orders_Variance_Order_By = {
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'organizations'
  id: Scalars['Int']
  is_active?: Maybe<Scalars['Boolean']>
  is_deleted?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  region_id?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  state: Scalars['String']
}

/** aggregated selection of "organizations" */
export type Organizations_Aggregate = {
  __typename?: 'organizations_aggregate'
  aggregate?: Maybe<Organizations_Aggregate_Fields>
  nodes: Array<Organizations>
}

/** aggregate fields of "organizations" */
export type Organizations_Aggregate_Fields = {
  __typename?: 'organizations_aggregate_fields'
  avg?: Maybe<Organizations_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Organizations_Max_Fields>
  min?: Maybe<Organizations_Min_Fields>
  stddev?: Maybe<Organizations_Stddev_Fields>
  stddev_pop?: Maybe<Organizations_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Organizations_Stddev_Samp_Fields>
  sum?: Maybe<Organizations_Sum_Fields>
  var_pop?: Maybe<Organizations_Var_Pop_Fields>
  var_samp?: Maybe<Organizations_Var_Samp_Fields>
  variance?: Maybe<Organizations_Variance_Fields>
}

/** aggregate fields of "organizations" */
export type Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organizations_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Organizations_Avg_Fields = {
  __typename?: 'organizations_avg_fields'
  id?: Maybe<Scalars['Float']>
  region_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>
  _not?: InputMaybe<Organizations_Bool_Exp>
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>
  id?: InputMaybe<Int_Comparison_Exp>
  is_active?: InputMaybe<Boolean_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  region_id?: InputMaybe<Int_Comparison_Exp>
  slug?: InputMaybe<String_Comparison_Exp>
  state?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "organizations" */
export enum Organizations_Constraint {
  /** unique or primary key constraint */
  OrganizationsPkey = 'organizations_pkey',
  /** unique or primary key constraint */
  OrganizationsSlugUnique = 'organizations_slug_unique',
}

/** input type for incrementing numeric columns in table "organizations" */
export type Organizations_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  region_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "organizations" */
export type Organizations_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_active?: InputMaybe<Scalars['Boolean']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  region_id?: InputMaybe<Scalars['Int']>
  slug?: InputMaybe<Scalars['String']>
  state?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Organizations_Max_Fields = {
  __typename?: 'organizations_max_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  region_id?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Organizations_Min_Fields = {
  __typename?: 'organizations_min_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  region_id?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "organizations" */
export type Organizations_Mutation_Response = {
  __typename?: 'organizations_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Organizations>
}

/** input type for inserting object relation for remote table "organizations" */
export type Organizations_Obj_Rel_Insert_Input = {
  data: Organizations_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Organizations_On_Conflict>
}

/** on conflict condition type for table "organizations" */
export type Organizations_On_Conflict = {
  constraint: Organizations_Constraint
  update_columns?: Array<Organizations_Update_Column>
  where?: InputMaybe<Organizations_Bool_Exp>
}

/** Ordering options when selecting data from "organizations". */
export type Organizations_Order_By = {
  id?: InputMaybe<Order_By>
  is_active?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  region_id?: InputMaybe<Order_By>
  slug?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
}

/** primary key columns input for table: organizations */
export type Organizations_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "organizations" */
export enum Organizations_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
  /** column name */
  RegionId = 'region_id',
  /** column name */
  Slug = 'slug',
  /** column name */
  State = 'state',
}

/** input type for updating data in table "organizations" */
export type Organizations_Set_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_active?: InputMaybe<Scalars['Boolean']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  region_id?: InputMaybe<Scalars['Int']>
  slug?: InputMaybe<Scalars['String']>
  state?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Organizations_Stddev_Fields = {
  __typename?: 'organizations_stddev_fields'
  id?: Maybe<Scalars['Float']>
  region_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Organizations_Stddev_Pop_Fields = {
  __typename?: 'organizations_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  region_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Organizations_Stddev_Samp_Fields = {
  __typename?: 'organizations_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  region_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Organizations_Sum_Fields = {
  __typename?: 'organizations_sum_fields'
  id?: Maybe<Scalars['Int']>
  region_id?: Maybe<Scalars['Int']>
}

/** update columns of table "organizations" */
export enum Organizations_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
  /** column name */
  RegionId = 'region_id',
  /** column name */
  Slug = 'slug',
  /** column name */
  State = 'state',
}

/** aggregate var_pop on columns */
export type Organizations_Var_Pop_Fields = {
  __typename?: 'organizations_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  region_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Organizations_Var_Samp_Fields = {
  __typename?: 'organizations_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  region_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Organizations_Variance_Fields = {
  __typename?: 'organizations_variance_fields'
  id?: Maybe<Scalars['Float']>
  region_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "place_of_service" */
export type Place_Of_Service = {
  __typename?: 'place_of_service'
  description: Scalars['String']
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
}

/** aggregated selection of "place_of_service" */
export type Place_Of_Service_Aggregate = {
  __typename?: 'place_of_service_aggregate'
  aggregate?: Maybe<Place_Of_Service_Aggregate_Fields>
  nodes: Array<Place_Of_Service>
}

/** aggregate fields of "place_of_service" */
export type Place_Of_Service_Aggregate_Fields = {
  __typename?: 'place_of_service_aggregate_fields'
  avg?: Maybe<Place_Of_Service_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Place_Of_Service_Max_Fields>
  min?: Maybe<Place_Of_Service_Min_Fields>
  stddev?: Maybe<Place_Of_Service_Stddev_Fields>
  stddev_pop?: Maybe<Place_Of_Service_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Place_Of_Service_Stddev_Samp_Fields>
  sum?: Maybe<Place_Of_Service_Sum_Fields>
  var_pop?: Maybe<Place_Of_Service_Var_Pop_Fields>
  var_samp?: Maybe<Place_Of_Service_Var_Samp_Fields>
  variance?: Maybe<Place_Of_Service_Variance_Fields>
}

/** aggregate fields of "place_of_service" */
export type Place_Of_Service_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Place_Of_Service_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Place_Of_Service_Avg_Fields = {
  __typename?: 'place_of_service_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "place_of_service". All fields are combined with a logical 'AND'. */
export type Place_Of_Service_Bool_Exp = {
  _and?: InputMaybe<Array<Place_Of_Service_Bool_Exp>>
  _not?: InputMaybe<Place_Of_Service_Bool_Exp>
  _or?: InputMaybe<Array<Place_Of_Service_Bool_Exp>>
  description?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "place_of_service" */
export enum Place_Of_Service_Constraint {
  /** unique or primary key constraint */
  PlaceOfServicePkey = 'place_of_service_pkey',
}

/** input type for incrementing numeric columns in table "place_of_service" */
export type Place_Of_Service_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "place_of_service" */
export type Place_Of_Service_Insert_Input = {
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Place_Of_Service_Max_Fields = {
  __typename?: 'place_of_service_max_fields'
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Place_Of_Service_Min_Fields = {
  __typename?: 'place_of_service_min_fields'
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "place_of_service" */
export type Place_Of_Service_Mutation_Response = {
  __typename?: 'place_of_service_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Place_Of_Service>
}

/** on conflict condition type for table "place_of_service" */
export type Place_Of_Service_On_Conflict = {
  constraint: Place_Of_Service_Constraint
  update_columns?: Array<Place_Of_Service_Update_Column>
  where?: InputMaybe<Place_Of_Service_Bool_Exp>
}

/** Ordering options when selecting data from "place_of_service". */
export type Place_Of_Service_Order_By = {
  description?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
}

/** primary key columns input for table: place_of_service */
export type Place_Of_Service_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "place_of_service" */
export enum Place_Of_Service_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "place_of_service" */
export type Place_Of_Service_Set_Input = {
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Place_Of_Service_Stddev_Fields = {
  __typename?: 'place_of_service_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Place_Of_Service_Stddev_Pop_Fields = {
  __typename?: 'place_of_service_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Place_Of_Service_Stddev_Samp_Fields = {
  __typename?: 'place_of_service_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Place_Of_Service_Sum_Fields = {
  __typename?: 'place_of_service_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "place_of_service" */
export enum Place_Of_Service_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
}

/** aggregate var_pop on columns */
export type Place_Of_Service_Var_Pop_Fields = {
  __typename?: 'place_of_service_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Place_Of_Service_Var_Samp_Fields = {
  __typename?: 'place_of_service_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Place_Of_Service_Variance_Fields = {
  __typename?: 'place_of_service_variance_fields'
  id?: Maybe<Scalars['Float']>
}

export type Query_Root = {
  __typename?: 'query_root'
  /** fetch data from the table: "assessment_orders" */
  assessment_orders: Array<Assessment_Orders>
  /** fetch aggregated fields from the table: "assessment_orders" */
  assessment_orders_aggregate: Assessment_Orders_Aggregate
  /** fetch data from the table: "assessment_orders" using primary key columns */
  assessment_orders_by_pk?: Maybe<Assessment_Orders>
  /** fetch data from the table: "clearance_notes" */
  clearance_notes: Array<Clearance_Notes>
  /** fetch aggregated fields from the table: "clearance_notes" */
  clearance_notes_aggregate: Clearance_Notes_Aggregate
  /** fetch data from the table: "clearance_notes" using primary key columns */
  clearance_notes_by_pk?: Maybe<Clearance_Notes>
  form_images: Array<Form_Images>
  /** fetch data from the table: "form_localizations" */
  form_localizations: Array<Form_Localizations>
  /** fetch aggregated fields from the table: "form_localizations" */
  form_localizations_aggregate: Form_Localizations_Aggregate
  /** fetch data from the table: "form_localizations" using primary key columns */
  form_localizations_by_pk?: Maybe<Form_Localizations>
  /** fetch data from the table: "form_types" */
  form_types: Array<Form_Types>
  /** fetch aggregated fields from the table: "form_types" */
  form_types_aggregate: Form_Types_Aggregate
  /** fetch data from the table: "form_types" using primary key columns */
  form_types_by_pk?: Maybe<Form_Types>
  /** fetch data from the table: "forms" */
  forms: Array<Forms>
  /** fetch aggregated fields from the table: "forms" */
  forms_aggregate: Forms_Aggregate
  /** fetch data from the table: "forms" using primary key columns */
  forms_by_pk?: Maybe<Forms>
  /** Get Video */
  getVideo?: Maybe<Video>
  /** fetch data from the table: "locations" */
  locations: Array<Locations>
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>
  /** fetch data from the table: "medication_orders" */
  medication_orders: Array<Medication_Orders>
  /** fetch aggregated fields from the table: "medication_orders" */
  medication_orders_aggregate: Medication_Orders_Aggregate
  /** fetch data from the table: "medication_orders" using primary key columns */
  medication_orders_by_pk?: Maybe<Medication_Orders>
  /** fetch data from the table: "order_height_and_weight" */
  order_height_and_weight: Array<Order_Height_And_Weight>
  /** fetch aggregated fields from the table: "order_height_and_weight" */
  order_height_and_weight_aggregate: Order_Height_And_Weight_Aggregate
  /** fetch data from the table: "order_height_and_weight" using primary key columns */
  order_height_and_weight_by_pk?: Maybe<Order_Height_And_Weight>
  /** fetch data from the table: "order_medical_assessment" */
  order_medical_assessment: Array<Order_Medical_Assessment>
  /** fetch aggregated fields from the table: "order_medical_assessment" */
  order_medical_assessment_aggregate: Order_Medical_Assessment_Aggregate
  /** fetch data from the table: "order_medical_assessment" using primary key columns */
  order_medical_assessment_by_pk?: Maybe<Order_Medical_Assessment>
  /** fetch data from the table: "order_musculoskeletal" */
  order_musculoskeletal: Array<Order_Musculoskeletal>
  /** fetch aggregated fields from the table: "order_musculoskeletal" */
  order_musculoskeletal_aggregate: Order_Musculoskeletal_Aggregate
  /** fetch data from the table: "order_musculoskeletal" using primary key columns */
  order_musculoskeletal_by_pk?: Maybe<Order_Musculoskeletal>
  /** fetch data from the table: "order_type" */
  order_type: Array<Order_Type>
  /** fetch aggregated fields from the table: "order_type" */
  order_type_aggregate: Order_Type_Aggregate
  /** fetch data from the table: "order_type" using primary key columns */
  order_type_by_pk?: Maybe<Order_Type>
  /** fetch data from the table: "order_vision" */
  order_vision: Array<Order_Vision>
  /** fetch aggregated fields from the table: "order_vision" */
  order_vision_aggregate: Order_Vision_Aggregate
  /** fetch data from the table: "order_vision" using primary key columns */
  order_vision_by_pk?: Maybe<Order_Vision>
  /** fetch data from the table: "orders" */
  orders: Array<Orders>
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>
  /** fetch data from the table: "place_of_service" */
  place_of_service: Array<Place_Of_Service>
  /** fetch aggregated fields from the table: "place_of_service" */
  place_of_service_aggregate: Place_Of_Service_Aggregate
  /** fetch data from the table: "place_of_service" using primary key columns */
  place_of_service_by_pk?: Maybe<Place_Of_Service>
  /** An array relationship */
  session_logs: Array<Session_Logs>
  /** An aggregate relationship */
  session_logs_aggregate: Session_Logs_Aggregate
  /** fetch data from the table: "session_logs" using primary key columns */
  session_logs_by_pk?: Maybe<Session_Logs>
  /** fetch data from the table: "session_station_order_config" */
  session_station_order_config: Array<Session_Station_Order_Config>
  /** fetch aggregated fields from the table: "session_station_order_config" */
  session_station_order_config_aggregate: Session_Station_Order_Config_Aggregate
  /** fetch data from the table: "session_station_order_config" using primary key columns */
  session_station_order_config_by_pk?: Maybe<Session_Station_Order_Config>
  /** fetch data from the table: "session_type" */
  session_type: Array<Session_Type>
  /** fetch aggregated fields from the table: "session_type" */
  session_type_aggregate: Session_Type_Aggregate
  /** fetch data from the table: "session_type" using primary key columns */
  session_type_by_pk?: Maybe<Session_Type>
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>
  /** An array relationship */
  station_orders: Array<Station_Orders>
  /** An aggregate relationship */
  station_orders_aggregate: Station_Orders_Aggregate
  /** fetch data from the table: "station_orders" using primary key columns */
  station_orders_by_pk?: Maybe<Station_Orders>
  /** fetch data from the table: "station_type" */
  station_type: Array<Station_Type>
  /** fetch aggregated fields from the table: "station_type" */
  station_type_aggregate: Station_Type_Aggregate
  /** fetch data from the table: "station_type" using primary key columns */
  station_type_by_pk?: Maybe<Station_Type>
  /** An array relationship */
  station_visits: Array<Station_Visits>
  /** An aggregate relationship */
  station_visits_aggregate: Station_Visits_Aggregate
  /** fetch data from the table: "station_visits" using primary key columns */
  station_visits_by_pk?: Maybe<Station_Visits>
  /** An array relationship */
  stations: Array<Stations>
  /** An aggregate relationship */
  stations_aggregate: Stations_Aggregate
  /** fetch data from the table: "stations" using primary key columns */
  stations_by_pk?: Maybe<Stations>
  /** fetch data from the table: "test_orders" */
  test_orders: Array<Test_Orders>
  /** fetch aggregated fields from the table: "test_orders" */
  test_orders_aggregate: Test_Orders_Aggregate
  /** fetch data from the table: "test_orders" using primary key columns */
  test_orders_by_pk?: Maybe<Test_Orders>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
  /** fetch data from the table: "video_calls" */
  video_calls: Array<Video_Calls>
  /** fetch aggregated fields from the table: "video_calls" */
  video_calls_aggregate: Video_Calls_Aggregate
  /** fetch data from the table: "video_calls" using primary key columns */
  video_calls_by_pk?: Maybe<Video_Calls>
  /** An array relationship */
  visits: Array<Visits>
  /** An aggregate relationship */
  visits_aggregate: Visits_Aggregate
  /** fetch data from the table: "visits" using primary key columns */
  visits_by_pk?: Maybe<Visits>
}

export type Query_RootAssessment_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Assessment_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Assessment_Orders_Order_By>>
  where?: InputMaybe<Assessment_Orders_Bool_Exp>
}

export type Query_RootAssessment_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assessment_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Assessment_Orders_Order_By>>
  where?: InputMaybe<Assessment_Orders_Bool_Exp>
}

export type Query_RootAssessment_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootClearance_NotesArgs = {
  distinct_on?: InputMaybe<Array<Clearance_Notes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Clearance_Notes_Order_By>>
  where?: InputMaybe<Clearance_Notes_Bool_Exp>
}

export type Query_RootClearance_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Clearance_Notes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Clearance_Notes_Order_By>>
  where?: InputMaybe<Clearance_Notes_Bool_Exp>
}

export type Query_RootClearance_Notes_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootForm_ImagesArgs = {
  patient_id: Scalars['String']
}

export type Query_RootForm_LocalizationsArgs = {
  distinct_on?: InputMaybe<Array<Form_Localizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Localizations_Order_By>>
  where?: InputMaybe<Form_Localizations_Bool_Exp>
}

export type Query_RootForm_Localizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Localizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Localizations_Order_By>>
  where?: InputMaybe<Form_Localizations_Bool_Exp>
}

export type Query_RootForm_Localizations_By_PkArgs = {
  locale: Scalars['String']
  type: Scalars['String']
}

export type Query_RootForm_TypesArgs = {
  distinct_on?: InputMaybe<Array<Form_Types_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Types_Order_By>>
  where?: InputMaybe<Form_Types_Bool_Exp>
}

export type Query_RootForm_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Types_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Types_Order_By>>
  where?: InputMaybe<Form_Types_Bool_Exp>
}

export type Query_RootForm_Types_By_PkArgs = {
  id: Scalars['String']
}

export type Query_RootFormsArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Forms_Order_By>>
  where?: InputMaybe<Forms_Bool_Exp>
}

export type Query_RootForms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Forms_Order_By>>
  where?: InputMaybe<Forms_Bool_Exp>
}

export type Query_RootForms_By_PkArgs = {
  patient_id: Scalars['String']
  type: Scalars['String']
}

export type Query_RootGetVideoArgs = {
  visitId: Scalars['Int']
}

export type Query_RootLocationsArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Locations_Order_By>>
  where?: InputMaybe<Locations_Bool_Exp>
}

export type Query_RootLocations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Locations_Order_By>>
  where?: InputMaybe<Locations_Bool_Exp>
}

export type Query_RootLocations_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootMedication_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Medication_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Medication_Orders_Order_By>>
  where?: InputMaybe<Medication_Orders_Bool_Exp>
}

export type Query_RootMedication_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Medication_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Medication_Orders_Order_By>>
  where?: InputMaybe<Medication_Orders_Bool_Exp>
}

export type Query_RootMedication_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootOrder_Height_And_WeightArgs = {
  distinct_on?: InputMaybe<Array<Order_Height_And_Weight_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Height_And_Weight_Order_By>>
  where?: InputMaybe<Order_Height_And_Weight_Bool_Exp>
}

export type Query_RootOrder_Height_And_Weight_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Height_And_Weight_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Height_And_Weight_Order_By>>
  where?: InputMaybe<Order_Height_And_Weight_Bool_Exp>
}

export type Query_RootOrder_Height_And_Weight_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootOrder_Medical_AssessmentArgs = {
  distinct_on?: InputMaybe<Array<Order_Medical_Assessment_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Medical_Assessment_Order_By>>
  where?: InputMaybe<Order_Medical_Assessment_Bool_Exp>
}

export type Query_RootOrder_Medical_Assessment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Medical_Assessment_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Medical_Assessment_Order_By>>
  where?: InputMaybe<Order_Medical_Assessment_Bool_Exp>
}

export type Query_RootOrder_Medical_Assessment_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootOrder_MusculoskeletalArgs = {
  distinct_on?: InputMaybe<Array<Order_Musculoskeletal_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Musculoskeletal_Order_By>>
  where?: InputMaybe<Order_Musculoskeletal_Bool_Exp>
}

export type Query_RootOrder_Musculoskeletal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Musculoskeletal_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Musculoskeletal_Order_By>>
  where?: InputMaybe<Order_Musculoskeletal_Bool_Exp>
}

export type Query_RootOrder_Musculoskeletal_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootOrder_TypeArgs = {
  distinct_on?: InputMaybe<Array<Order_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Type_Order_By>>
  where?: InputMaybe<Order_Type_Bool_Exp>
}

export type Query_RootOrder_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Type_Order_By>>
  where?: InputMaybe<Order_Type_Bool_Exp>
}

export type Query_RootOrder_Type_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootOrder_VisionArgs = {
  distinct_on?: InputMaybe<Array<Order_Vision_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Vision_Order_By>>
  where?: InputMaybe<Order_Vision_Bool_Exp>
}

export type Query_RootOrder_Vision_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Vision_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Vision_Order_By>>
  where?: InputMaybe<Order_Vision_Bool_Exp>
}

export type Query_RootOrder_Vision_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Orders_Order_By>>
  where?: InputMaybe<Orders_Bool_Exp>
}

export type Query_RootOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Orders_Order_By>>
  where?: InputMaybe<Orders_Bool_Exp>
}

export type Query_RootOrders_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Query_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Query_RootOrganizations_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootPlace_Of_ServiceArgs = {
  distinct_on?: InputMaybe<Array<Place_Of_Service_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Place_Of_Service_Order_By>>
  where?: InputMaybe<Place_Of_Service_Bool_Exp>
}

export type Query_RootPlace_Of_Service_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Place_Of_Service_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Place_Of_Service_Order_By>>
  where?: InputMaybe<Place_Of_Service_Bool_Exp>
}

export type Query_RootPlace_Of_Service_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootSession_LogsArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

export type Query_RootSession_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

export type Query_RootSession_Logs_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootSession_Station_Order_ConfigArgs = {
  distinct_on?: InputMaybe<Array<Session_Station_Order_Config_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Station_Order_Config_Order_By>>
  where?: InputMaybe<Session_Station_Order_Config_Bool_Exp>
}

export type Query_RootSession_Station_Order_Config_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Station_Order_Config_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Station_Order_Config_Order_By>>
  where?: InputMaybe<Session_Station_Order_Config_Bool_Exp>
}

export type Query_RootSession_Station_Order_Config_By_PkArgs = {
  order_type_id: Scalars['Int']
  session_type_id: Scalars['Int']
  station_type_id: Scalars['Int']
}

export type Query_RootSession_TypeArgs = {
  distinct_on?: InputMaybe<Array<Session_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Type_Order_By>>
  where?: InputMaybe<Session_Type_Bool_Exp>
}

export type Query_RootSession_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Type_Order_By>>
  where?: InputMaybe<Session_Type_Bool_Exp>
}

export type Query_RootSession_Type_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Sessions_Order_By>>
  where?: InputMaybe<Sessions_Bool_Exp>
}

export type Query_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Sessions_Order_By>>
  where?: InputMaybe<Sessions_Bool_Exp>
}

export type Query_RootSessions_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootStation_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Station_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Orders_Order_By>>
  where?: InputMaybe<Station_Orders_Bool_Exp>
}

export type Query_RootStation_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Orders_Order_By>>
  where?: InputMaybe<Station_Orders_Bool_Exp>
}

export type Query_RootStation_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootStation_TypeArgs = {
  distinct_on?: InputMaybe<Array<Station_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Type_Order_By>>
  where?: InputMaybe<Station_Type_Bool_Exp>
}

export type Query_RootStation_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Type_Order_By>>
  where?: InputMaybe<Station_Type_Bool_Exp>
}

export type Query_RootStation_Type_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootStation_VisitsArgs = {
  distinct_on?: InputMaybe<Array<Station_Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Visits_Order_By>>
  where?: InputMaybe<Station_Visits_Bool_Exp>
}

export type Query_RootStation_Visits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Visits_Order_By>>
  where?: InputMaybe<Station_Visits_Bool_Exp>
}

export type Query_RootStation_Visits_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootStationsArgs = {
  distinct_on?: InputMaybe<Array<Stations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Stations_Order_By>>
  where?: InputMaybe<Stations_Bool_Exp>
}

export type Query_RootStations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Stations_Order_By>>
  where?: InputMaybe<Stations_Bool_Exp>
}

export type Query_RootStations_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootTest_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Test_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Orders_Order_By>>
  where?: InputMaybe<Test_Orders_Bool_Exp>
}

export type Query_RootTest_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Orders_Order_By>>
  where?: InputMaybe<Test_Orders_Bool_Exp>
}

export type Query_RootTest_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Query_RootUsers_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootVideo_CallsArgs = {
  distinct_on?: InputMaybe<Array<Video_Calls_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Video_Calls_Order_By>>
  where?: InputMaybe<Video_Calls_Bool_Exp>
}

export type Query_RootVideo_Calls_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Video_Calls_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Video_Calls_Order_By>>
  where?: InputMaybe<Video_Calls_Bool_Exp>
}

export type Query_RootVideo_Calls_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootVisitsArgs = {
  distinct_on?: InputMaybe<Array<Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Visits_Order_By>>
  where?: InputMaybe<Visits_Bool_Exp>
}

export type Query_RootVisits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Visits_Order_By>>
  where?: InputMaybe<Visits_Bool_Exp>
}

export type Query_RootVisits_By_PkArgs = {
  id: Scalars['Int']
}

/** columns and relationships of "session_logs" */
export type Session_Logs = {
  __typename?: 'session_logs'
  created_at?: Maybe<Scalars['timestamptz']>
  description: Scalars['String']
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  /** An object relationship */
  session?: Maybe<Sessions>
  session_id?: Maybe<Scalars['Int']>
  source?: Maybe<Scalars['String']>
  source_id?: Maybe<Scalars['String']>
  source_update?: Maybe<Scalars['jsonb']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id: Scalars['Int']
  /** An object relationship */
  visit?: Maybe<Visits>
  visit_id?: Maybe<Scalars['Int']>
}

/** columns and relationships of "session_logs" */
export type Session_LogsSource_UpdateArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** aggregated selection of "session_logs" */
export type Session_Logs_Aggregate = {
  __typename?: 'session_logs_aggregate'
  aggregate?: Maybe<Session_Logs_Aggregate_Fields>
  nodes: Array<Session_Logs>
}

/** aggregate fields of "session_logs" */
export type Session_Logs_Aggregate_Fields = {
  __typename?: 'session_logs_aggregate_fields'
  avg?: Maybe<Session_Logs_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Session_Logs_Max_Fields>
  min?: Maybe<Session_Logs_Min_Fields>
  stddev?: Maybe<Session_Logs_Stddev_Fields>
  stddev_pop?: Maybe<Session_Logs_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Session_Logs_Stddev_Samp_Fields>
  sum?: Maybe<Session_Logs_Sum_Fields>
  var_pop?: Maybe<Session_Logs_Var_Pop_Fields>
  var_samp?: Maybe<Session_Logs_Var_Samp_Fields>
  variance?: Maybe<Session_Logs_Variance_Fields>
}

/** aggregate fields of "session_logs" */
export type Session_Logs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Session_Logs_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "session_logs" */
export type Session_Logs_Aggregate_Order_By = {
  avg?: InputMaybe<Session_Logs_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Session_Logs_Max_Order_By>
  min?: InputMaybe<Session_Logs_Min_Order_By>
  stddev?: InputMaybe<Session_Logs_Stddev_Order_By>
  stddev_pop?: InputMaybe<Session_Logs_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Session_Logs_Stddev_Samp_Order_By>
  sum?: InputMaybe<Session_Logs_Sum_Order_By>
  var_pop?: InputMaybe<Session_Logs_Var_Pop_Order_By>
  var_samp?: InputMaybe<Session_Logs_Var_Samp_Order_By>
  variance?: InputMaybe<Session_Logs_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Session_Logs_Append_Input = {
  source_update?: InputMaybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "session_logs" */
export type Session_Logs_Arr_Rel_Insert_Input = {
  data: Array<Session_Logs_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Session_Logs_On_Conflict>
}

/** aggregate avg on columns */
export type Session_Logs_Avg_Fields = {
  __typename?: 'session_logs_avg_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "session_logs" */
export type Session_Logs_Avg_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "session_logs". All fields are combined with a logical 'AND'. */
export type Session_Logs_Bool_Exp = {
  _and?: InputMaybe<Array<Session_Logs_Bool_Exp>>
  _not?: InputMaybe<Session_Logs_Bool_Exp>
  _or?: InputMaybe<Array<Session_Logs_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  description?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  session?: InputMaybe<Sessions_Bool_Exp>
  session_id?: InputMaybe<Int_Comparison_Exp>
  source?: InputMaybe<String_Comparison_Exp>
  source_id?: InputMaybe<String_Comparison_Exp>
  source_update?: InputMaybe<Jsonb_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  user_id?: InputMaybe<Int_Comparison_Exp>
  visit?: InputMaybe<Visits_Bool_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "session_logs" */
export enum Session_Logs_Constraint {
  /** unique or primary key constraint */
  SessionLogsPkey = 'session_logs_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Session_Logs_Delete_At_Path_Input = {
  source_update?: InputMaybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Session_Logs_Delete_Elem_Input = {
  source_update?: InputMaybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Session_Logs_Delete_Key_Input = {
  source_update?: InputMaybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "session_logs" */
export type Session_Logs_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  session_id?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "session_logs" */
export type Session_Logs_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>
  session_id?: InputMaybe<Scalars['Int']>
  source?: InputMaybe<Scalars['String']>
  source_id?: InputMaybe<Scalars['String']>
  source_update?: InputMaybe<Scalars['jsonb']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  user_id?: InputMaybe<Scalars['Int']>
  visit?: InputMaybe<Visits_Obj_Rel_Insert_Input>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Session_Logs_Max_Fields = {
  __typename?: 'session_logs_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  source?: Maybe<Scalars['String']>
  source_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "session_logs" */
export type Session_Logs_Max_Order_By = {
  created_at?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  source?: InputMaybe<Order_By>
  source_id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Session_Logs_Min_Fields = {
  __typename?: 'session_logs_min_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  source?: Maybe<Scalars['String']>
  source_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "session_logs" */
export type Session_Logs_Min_Order_By = {
  created_at?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  source?: InputMaybe<Order_By>
  source_id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "session_logs" */
export type Session_Logs_Mutation_Response = {
  __typename?: 'session_logs_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Session_Logs>
}

/** on conflict condition type for table "session_logs" */
export type Session_Logs_On_Conflict = {
  constraint: Session_Logs_Constraint
  update_columns?: Array<Session_Logs_Update_Column>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

/** Ordering options when selecting data from "session_logs". */
export type Session_Logs_Order_By = {
  created_at?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  session?: InputMaybe<Sessions_Order_By>
  session_id?: InputMaybe<Order_By>
  source?: InputMaybe<Order_By>
  source_id?: InputMaybe<Order_By>
  source_update?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit?: InputMaybe<Visits_Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: session_logs */
export type Session_Logs_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Session_Logs_Prepend_Input = {
  source_update?: InputMaybe<Scalars['jsonb']>
}

/** select columns of table "session_logs" */
export enum Session_Logs_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Source = 'source',
  /** column name */
  SourceId = 'source_id',
  /** column name */
  SourceUpdate = 'source_update',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "session_logs" */
export type Session_Logs_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  session_id?: InputMaybe<Scalars['Int']>
  source?: InputMaybe<Scalars['String']>
  source_id?: InputMaybe<Scalars['String']>
  source_update?: InputMaybe<Scalars['jsonb']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  user_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Session_Logs_Stddev_Fields = {
  __typename?: 'session_logs_stddev_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "session_logs" */
export type Session_Logs_Stddev_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Session_Logs_Stddev_Pop_Fields = {
  __typename?: 'session_logs_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "session_logs" */
export type Session_Logs_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Session_Logs_Stddev_Samp_Fields = {
  __typename?: 'session_logs_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "session_logs" */
export type Session_Logs_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type Session_Logs_Sum_Fields = {
  __typename?: 'session_logs_sum_fields'
  id?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  user_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "session_logs" */
export type Session_Logs_Sum_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** update columns of table "session_logs" */
export enum Session_Logs_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Source = 'source',
  /** column name */
  SourceId = 'source_id',
  /** column name */
  SourceUpdate = 'source_update',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Session_Logs_Var_Pop_Fields = {
  __typename?: 'session_logs_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "session_logs" */
export type Session_Logs_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Session_Logs_Var_Samp_Fields = {
  __typename?: 'session_logs_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "session_logs" */
export type Session_Logs_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Session_Logs_Variance_Fields = {
  __typename?: 'session_logs_variance_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "session_logs" */
export type Session_Logs_Variance_Order_By = {
  id?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** columns and relationships of "session_station_order_config" */
export type Session_Station_Order_Config = {
  __typename?: 'session_station_order_config'
  is_deleted?: Maybe<Scalars['Boolean']>
  order_type_id: Scalars['Int']
  session_type_id: Scalars['Int']
  station_type_id: Scalars['Int']
}

/** aggregated selection of "session_station_order_config" */
export type Session_Station_Order_Config_Aggregate = {
  __typename?: 'session_station_order_config_aggregate'
  aggregate?: Maybe<Session_Station_Order_Config_Aggregate_Fields>
  nodes: Array<Session_Station_Order_Config>
}

/** aggregate fields of "session_station_order_config" */
export type Session_Station_Order_Config_Aggregate_Fields = {
  __typename?: 'session_station_order_config_aggregate_fields'
  avg?: Maybe<Session_Station_Order_Config_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Session_Station_Order_Config_Max_Fields>
  min?: Maybe<Session_Station_Order_Config_Min_Fields>
  stddev?: Maybe<Session_Station_Order_Config_Stddev_Fields>
  stddev_pop?: Maybe<Session_Station_Order_Config_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Session_Station_Order_Config_Stddev_Samp_Fields>
  sum?: Maybe<Session_Station_Order_Config_Sum_Fields>
  var_pop?: Maybe<Session_Station_Order_Config_Var_Pop_Fields>
  var_samp?: Maybe<Session_Station_Order_Config_Var_Samp_Fields>
  variance?: Maybe<Session_Station_Order_Config_Variance_Fields>
}

/** aggregate fields of "session_station_order_config" */
export type Session_Station_Order_Config_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Session_Station_Order_Config_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Session_Station_Order_Config_Avg_Fields = {
  __typename?: 'session_station_order_config_avg_fields'
  order_type_id?: Maybe<Scalars['Float']>
  session_type_id?: Maybe<Scalars['Float']>
  station_type_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "session_station_order_config". All fields are combined with a logical 'AND'. */
export type Session_Station_Order_Config_Bool_Exp = {
  _and?: InputMaybe<Array<Session_Station_Order_Config_Bool_Exp>>
  _not?: InputMaybe<Session_Station_Order_Config_Bool_Exp>
  _or?: InputMaybe<Array<Session_Station_Order_Config_Bool_Exp>>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  order_type_id?: InputMaybe<Int_Comparison_Exp>
  session_type_id?: InputMaybe<Int_Comparison_Exp>
  station_type_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "session_station_order_config" */
export enum Session_Station_Order_Config_Constraint {
  /** unique or primary key constraint */
  SessionStationOrderConfigPkey = 'session_station_order_config_pkey',
}

/** input type for incrementing numeric columns in table "session_station_order_config" */
export type Session_Station_Order_Config_Inc_Input = {
  order_type_id?: InputMaybe<Scalars['Int']>
  session_type_id?: InputMaybe<Scalars['Int']>
  station_type_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "session_station_order_config" */
export type Session_Station_Order_Config_Insert_Input = {
  is_deleted?: InputMaybe<Scalars['Boolean']>
  order_type_id?: InputMaybe<Scalars['Int']>
  session_type_id?: InputMaybe<Scalars['Int']>
  station_type_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Session_Station_Order_Config_Max_Fields = {
  __typename?: 'session_station_order_config_max_fields'
  order_type_id?: Maybe<Scalars['Int']>
  session_type_id?: Maybe<Scalars['Int']>
  station_type_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Session_Station_Order_Config_Min_Fields = {
  __typename?: 'session_station_order_config_min_fields'
  order_type_id?: Maybe<Scalars['Int']>
  session_type_id?: Maybe<Scalars['Int']>
  station_type_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "session_station_order_config" */
export type Session_Station_Order_Config_Mutation_Response = {
  __typename?: 'session_station_order_config_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Session_Station_Order_Config>
}

/** on conflict condition type for table "session_station_order_config" */
export type Session_Station_Order_Config_On_Conflict = {
  constraint: Session_Station_Order_Config_Constraint
  update_columns?: Array<Session_Station_Order_Config_Update_Column>
  where?: InputMaybe<Session_Station_Order_Config_Bool_Exp>
}

/** Ordering options when selecting data from "session_station_order_config". */
export type Session_Station_Order_Config_Order_By = {
  is_deleted?: InputMaybe<Order_By>
  order_type_id?: InputMaybe<Order_By>
  session_type_id?: InputMaybe<Order_By>
  station_type_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: session_station_order_config */
export type Session_Station_Order_Config_Pk_Columns_Input = {
  order_type_id: Scalars['Int']
  session_type_id: Scalars['Int']
  station_type_id: Scalars['Int']
}

/** select columns of table "session_station_order_config" */
export enum Session_Station_Order_Config_Select_Column {
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  OrderTypeId = 'order_type_id',
  /** column name */
  SessionTypeId = 'session_type_id',
  /** column name */
  StationTypeId = 'station_type_id',
}

/** input type for updating data in table "session_station_order_config" */
export type Session_Station_Order_Config_Set_Input = {
  is_deleted?: InputMaybe<Scalars['Boolean']>
  order_type_id?: InputMaybe<Scalars['Int']>
  session_type_id?: InputMaybe<Scalars['Int']>
  station_type_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Session_Station_Order_Config_Stddev_Fields = {
  __typename?: 'session_station_order_config_stddev_fields'
  order_type_id?: Maybe<Scalars['Float']>
  session_type_id?: Maybe<Scalars['Float']>
  station_type_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Session_Station_Order_Config_Stddev_Pop_Fields = {
  __typename?: 'session_station_order_config_stddev_pop_fields'
  order_type_id?: Maybe<Scalars['Float']>
  session_type_id?: Maybe<Scalars['Float']>
  station_type_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Session_Station_Order_Config_Stddev_Samp_Fields = {
  __typename?: 'session_station_order_config_stddev_samp_fields'
  order_type_id?: Maybe<Scalars['Float']>
  session_type_id?: Maybe<Scalars['Float']>
  station_type_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Session_Station_Order_Config_Sum_Fields = {
  __typename?: 'session_station_order_config_sum_fields'
  order_type_id?: Maybe<Scalars['Int']>
  session_type_id?: Maybe<Scalars['Int']>
  station_type_id?: Maybe<Scalars['Int']>
}

/** update columns of table "session_station_order_config" */
export enum Session_Station_Order_Config_Update_Column {
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  OrderTypeId = 'order_type_id',
  /** column name */
  SessionTypeId = 'session_type_id',
  /** column name */
  StationTypeId = 'station_type_id',
}

/** aggregate var_pop on columns */
export type Session_Station_Order_Config_Var_Pop_Fields = {
  __typename?: 'session_station_order_config_var_pop_fields'
  order_type_id?: Maybe<Scalars['Float']>
  session_type_id?: Maybe<Scalars['Float']>
  station_type_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Session_Station_Order_Config_Var_Samp_Fields = {
  __typename?: 'session_station_order_config_var_samp_fields'
  order_type_id?: Maybe<Scalars['Float']>
  session_type_id?: Maybe<Scalars['Float']>
  station_type_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Session_Station_Order_Config_Variance_Fields = {
  __typename?: 'session_station_order_config_variance_fields'
  order_type_id?: Maybe<Scalars['Float']>
  session_type_id?: Maybe<Scalars['Float']>
  station_type_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "session_type" */
export type Session_Type = {
  __typename?: 'session_type'
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
}

/** aggregated selection of "session_type" */
export type Session_Type_Aggregate = {
  __typename?: 'session_type_aggregate'
  aggregate?: Maybe<Session_Type_Aggregate_Fields>
  nodes: Array<Session_Type>
}

/** aggregate fields of "session_type" */
export type Session_Type_Aggregate_Fields = {
  __typename?: 'session_type_aggregate_fields'
  avg?: Maybe<Session_Type_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Session_Type_Max_Fields>
  min?: Maybe<Session_Type_Min_Fields>
  stddev?: Maybe<Session_Type_Stddev_Fields>
  stddev_pop?: Maybe<Session_Type_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Session_Type_Stddev_Samp_Fields>
  sum?: Maybe<Session_Type_Sum_Fields>
  var_pop?: Maybe<Session_Type_Var_Pop_Fields>
  var_samp?: Maybe<Session_Type_Var_Samp_Fields>
  variance?: Maybe<Session_Type_Variance_Fields>
}

/** aggregate fields of "session_type" */
export type Session_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Session_Type_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Session_Type_Avg_Fields = {
  __typename?: 'session_type_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "session_type". All fields are combined with a logical 'AND'. */
export type Session_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Session_Type_Bool_Exp>>
  _not?: InputMaybe<Session_Type_Bool_Exp>
  _or?: InputMaybe<Array<Session_Type_Bool_Exp>>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "session_type" */
export enum Session_Type_Constraint {
  /** unique or primary key constraint */
  SessionTypePkey = 'session_type_pkey',
}

/** input type for incrementing numeric columns in table "session_type" */
export type Session_Type_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "session_type" */
export type Session_Type_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Session_Type_Max_Fields = {
  __typename?: 'session_type_max_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Session_Type_Min_Fields = {
  __typename?: 'session_type_min_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "session_type" */
export type Session_Type_Mutation_Response = {
  __typename?: 'session_type_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Session_Type>
}

/** on conflict condition type for table "session_type" */
export type Session_Type_On_Conflict = {
  constraint: Session_Type_Constraint
  update_columns?: Array<Session_Type_Update_Column>
  where?: InputMaybe<Session_Type_Bool_Exp>
}

/** Ordering options when selecting data from "session_type". */
export type Session_Type_Order_By = {
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
}

/** primary key columns input for table: session_type */
export type Session_Type_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "session_type" */
export enum Session_Type_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "session_type" */
export type Session_Type_Set_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Session_Type_Stddev_Fields = {
  __typename?: 'session_type_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Session_Type_Stddev_Pop_Fields = {
  __typename?: 'session_type_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Session_Type_Stddev_Samp_Fields = {
  __typename?: 'session_type_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Session_Type_Sum_Fields = {
  __typename?: 'session_type_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "session_type" */
export enum Session_Type_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Name = 'name',
}

/** aggregate var_pop on columns */
export type Session_Type_Var_Pop_Fields = {
  __typename?: 'session_type_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Session_Type_Var_Samp_Fields = {
  __typename?: 'session_type_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Session_Type_Variance_Fields = {
  __typename?: 'session_type_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: 'sessions'
  appointment_id?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  frequency_type?: Maybe<Scalars['String']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  language: Scalars['String']
  /** An object relationship */
  location?: Maybe<Locations>
  location_id?: Maybe<Scalars['Int']>
  location_name?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  /** An object relationship */
  organization?: Maybe<Organizations>
  organization_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  /** An array relationship */
  session_logs: Array<Session_Logs>
  /** An aggregate relationship */
  session_logs_aggregate: Session_Logs_Aggregate
  session_start_date?: Maybe<Scalars['timestamptz']>
  session_time?: Maybe<Scalars['timestamptz']>
  session_type: Scalars['String']
  /** An array relationship */
  stations: Array<Stations>
  /** An aggregate relationship */
  stations_aggregate: Stations_Aggregate
  status: Scalars['String']
  updated_at?: Maybe<Scalars['timestamptz']>
  /** An object relationship */
  video_call?: Maybe<Video_Calls>
  video_participants?: Maybe<Scalars['json']>
  /** An array relationship */
  visits: Array<Visits>
  /** An aggregate relationship */
  visits_aggregate: Visits_Aggregate
}

/** columns and relationships of "sessions" */
export type SessionsSession_LogsArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

/** columns and relationships of "sessions" */
export type SessionsSession_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

/** columns and relationships of "sessions" */
export type SessionsStationsArgs = {
  distinct_on?: InputMaybe<Array<Stations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Stations_Order_By>>
  where?: InputMaybe<Stations_Bool_Exp>
}

/** columns and relationships of "sessions" */
export type SessionsStations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Stations_Order_By>>
  where?: InputMaybe<Stations_Bool_Exp>
}

/** columns and relationships of "sessions" */
export type SessionsVideo_ParticipantsArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "sessions" */
export type SessionsVisitsArgs = {
  distinct_on?: InputMaybe<Array<Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Visits_Order_By>>
  where?: InputMaybe<Visits_Bool_Exp>
}

/** columns and relationships of "sessions" */
export type SessionsVisits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Visits_Order_By>>
  where?: InputMaybe<Visits_Bool_Exp>
}

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
  __typename?: 'sessions_aggregate'
  aggregate?: Maybe<Sessions_Aggregate_Fields>
  nodes: Array<Sessions>
}

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
  __typename?: 'sessions_aggregate_fields'
  avg?: Maybe<Sessions_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Sessions_Max_Fields>
  min?: Maybe<Sessions_Min_Fields>
  stddev?: Maybe<Sessions_Stddev_Fields>
  stddev_pop?: Maybe<Sessions_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Sessions_Stddev_Samp_Fields>
  sum?: Maybe<Sessions_Sum_Fields>
  var_pop?: Maybe<Sessions_Var_Pop_Fields>
  var_samp?: Maybe<Sessions_Var_Samp_Fields>
  variance?: Maybe<Sessions_Variance_Fields>
}

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sessions_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
  __typename?: 'sessions_avg_fields'
  appointment_id?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Sessions_Bool_Exp>>
  _not?: InputMaybe<Sessions_Bool_Exp>
  _or?: InputMaybe<Array<Sessions_Bool_Exp>>
  appointment_id?: InputMaybe<Int_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  facilitator_id?: InputMaybe<Int_Comparison_Exp>
  frequency_type?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  language?: InputMaybe<String_Comparison_Exp>
  location?: InputMaybe<Locations_Bool_Exp>
  location_id?: InputMaybe<Int_Comparison_Exp>
  location_name?: InputMaybe<String_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  organization?: InputMaybe<Organizations_Bool_Exp>
  organization_id?: InputMaybe<Int_Comparison_Exp>
  provider_id?: InputMaybe<Int_Comparison_Exp>
  session_logs?: InputMaybe<Session_Logs_Bool_Exp>
  session_start_date?: InputMaybe<Timestamptz_Comparison_Exp>
  session_time?: InputMaybe<Timestamptz_Comparison_Exp>
  session_type?: InputMaybe<String_Comparison_Exp>
  stations?: InputMaybe<Stations_Bool_Exp>
  status?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  video_call?: InputMaybe<Video_Calls_Bool_Exp>
  video_participants?: InputMaybe<Json_Comparison_Exp>
  visits?: InputMaybe<Visits_Bool_Exp>
}

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
  /** unique or primary key constraint */
  SessionsPkey = 'sessions_pkey',
}

/** input type for incrementing numeric columns in table "sessions" */
export type Sessions_Inc_Input = {
  appointment_id?: InputMaybe<Scalars['Int']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  location_id?: InputMaybe<Scalars['Int']>
  organization_id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
  appointment_id?: InputMaybe<Scalars['Int']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  frequency_type?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  language?: InputMaybe<Scalars['String']>
  location?: InputMaybe<Locations_Obj_Rel_Insert_Input>
  location_id?: InputMaybe<Scalars['Int']>
  location_name?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>
  organization_id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  session_logs?: InputMaybe<Session_Logs_Arr_Rel_Insert_Input>
  session_start_date?: InputMaybe<Scalars['timestamptz']>
  session_time?: InputMaybe<Scalars['timestamptz']>
  session_type?: InputMaybe<Scalars['String']>
  stations?: InputMaybe<Stations_Arr_Rel_Insert_Input>
  status?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  video_call?: InputMaybe<Video_Calls_Obj_Rel_Insert_Input>
  video_participants?: InputMaybe<Scalars['json']>
  visits?: InputMaybe<Visits_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  __typename?: 'sessions_max_fields'
  appointment_id?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  frequency_type?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  language?: Maybe<Scalars['String']>
  location_id?: Maybe<Scalars['Int']>
  location_name?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  organization_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  session_start_date?: Maybe<Scalars['timestamptz']>
  session_time?: Maybe<Scalars['timestamptz']>
  session_type?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Sessions_Min_Fields = {
  __typename?: 'sessions_min_fields'
  appointment_id?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  frequency_type?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  language?: Maybe<Scalars['String']>
  location_id?: Maybe<Scalars['Int']>
  location_name?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  organization_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  session_start_date?: Maybe<Scalars['timestamptz']>
  session_time?: Maybe<Scalars['timestamptz']>
  session_type?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
  __typename?: 'sessions_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Sessions>
}

/** input type for inserting object relation for remote table "sessions" */
export type Sessions_Obj_Rel_Insert_Input = {
  data: Sessions_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Sessions_On_Conflict>
}

/** on conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
  constraint: Sessions_Constraint
  update_columns?: Array<Sessions_Update_Column>
  where?: InputMaybe<Sessions_Bool_Exp>
}

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
  appointment_id?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  frequency_type?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  language?: InputMaybe<Order_By>
  location?: InputMaybe<Locations_Order_By>
  location_id?: InputMaybe<Order_By>
  location_name?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  organization?: InputMaybe<Organizations_Order_By>
  organization_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  session_logs_aggregate?: InputMaybe<Session_Logs_Aggregate_Order_By>
  session_start_date?: InputMaybe<Order_By>
  session_time?: InputMaybe<Order_By>
  session_type?: InputMaybe<Order_By>
  stations_aggregate?: InputMaybe<Stations_Aggregate_Order_By>
  status?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  video_call?: InputMaybe<Video_Calls_Order_By>
  video_participants?: InputMaybe<Order_By>
  visits_aggregate?: InputMaybe<Visits_Aggregate_Order_By>
}

/** primary key columns input for table: sessions */
export type Sessions_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
  /** column name */
  AppointmentId = 'appointment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FrequencyType = 'frequency_type',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Language = 'language',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationName = 'location_name',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  SessionStartDate = 'session_start_date',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  SessionType = 'session_type',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VideoParticipants = 'video_participants',
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
  appointment_id?: InputMaybe<Scalars['Int']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  frequency_type?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  language?: InputMaybe<Scalars['String']>
  location_id?: InputMaybe<Scalars['Int']>
  location_name?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  organization_id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  session_start_date?: InputMaybe<Scalars['timestamptz']>
  session_time?: InputMaybe<Scalars['timestamptz']>
  session_type?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  video_participants?: InputMaybe<Scalars['json']>
}

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
  __typename?: 'sessions_stddev_fields'
  appointment_id?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
  __typename?: 'sessions_stddev_pop_fields'
  appointment_id?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
  __typename?: 'sessions_stddev_samp_fields'
  appointment_id?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
  __typename?: 'sessions_sum_fields'
  appointment_id?: Maybe<Scalars['Int']>
  facilitator_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  location_id?: Maybe<Scalars['Int']>
  organization_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
}

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
  /** column name */
  AppointmentId = 'appointment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FrequencyType = 'frequency_type',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Language = 'language',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationName = 'location_name',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  SessionStartDate = 'session_start_date',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  SessionType = 'session_type',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VideoParticipants = 'video_participants',
}

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
  __typename?: 'sessions_var_pop_fields'
  appointment_id?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
  __typename?: 'sessions_var_samp_fields'
  appointment_id?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
  __typename?: 'sessions_variance_fields'
  appointment_id?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "station_orders" */
export type Station_Orders = {
  __typename?: 'station_orders'
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  /** An object relationship */
  order: Orders
  order_id: Scalars['Int']
  /** An object relationship */
  station: Stations
  station_id: Scalars['Int']
  /** An object relationship */
  visit?: Maybe<Visits>
  visit_id?: Maybe<Scalars['Int']>
}

/** aggregated selection of "station_orders" */
export type Station_Orders_Aggregate = {
  __typename?: 'station_orders_aggregate'
  aggregate?: Maybe<Station_Orders_Aggregate_Fields>
  nodes: Array<Station_Orders>
}

/** aggregate fields of "station_orders" */
export type Station_Orders_Aggregate_Fields = {
  __typename?: 'station_orders_aggregate_fields'
  avg?: Maybe<Station_Orders_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Station_Orders_Max_Fields>
  min?: Maybe<Station_Orders_Min_Fields>
  stddev?: Maybe<Station_Orders_Stddev_Fields>
  stddev_pop?: Maybe<Station_Orders_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Station_Orders_Stddev_Samp_Fields>
  sum?: Maybe<Station_Orders_Sum_Fields>
  var_pop?: Maybe<Station_Orders_Var_Pop_Fields>
  var_samp?: Maybe<Station_Orders_Var_Samp_Fields>
  variance?: Maybe<Station_Orders_Variance_Fields>
}

/** aggregate fields of "station_orders" */
export type Station_Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Station_Orders_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "station_orders" */
export type Station_Orders_Aggregate_Order_By = {
  avg?: InputMaybe<Station_Orders_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Station_Orders_Max_Order_By>
  min?: InputMaybe<Station_Orders_Min_Order_By>
  stddev?: InputMaybe<Station_Orders_Stddev_Order_By>
  stddev_pop?: InputMaybe<Station_Orders_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Station_Orders_Stddev_Samp_Order_By>
  sum?: InputMaybe<Station_Orders_Sum_Order_By>
  var_pop?: InputMaybe<Station_Orders_Var_Pop_Order_By>
  var_samp?: InputMaybe<Station_Orders_Var_Samp_Order_By>
  variance?: InputMaybe<Station_Orders_Variance_Order_By>
}

/** input type for inserting array relation for remote table "station_orders" */
export type Station_Orders_Arr_Rel_Insert_Input = {
  data: Array<Station_Orders_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Station_Orders_On_Conflict>
}

/** aggregate avg on columns */
export type Station_Orders_Avg_Fields = {
  __typename?: 'station_orders_avg_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "station_orders" */
export type Station_Orders_Avg_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "station_orders". All fields are combined with a logical 'AND'. */
export type Station_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Station_Orders_Bool_Exp>>
  _not?: InputMaybe<Station_Orders_Bool_Exp>
  _or?: InputMaybe<Array<Station_Orders_Bool_Exp>>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  order?: InputMaybe<Orders_Bool_Exp>
  order_id?: InputMaybe<Int_Comparison_Exp>
  station?: InputMaybe<Stations_Bool_Exp>
  station_id?: InputMaybe<Int_Comparison_Exp>
  visit?: InputMaybe<Visits_Bool_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "station_orders" */
export enum Station_Orders_Constraint {
  /** unique or primary key constraint */
  StationOrdersOrderIdKey = 'station_orders_order_id_key',
  /** unique or primary key constraint */
  StationOrdersPkey = 'station_orders_pkey',
}

/** input type for incrementing numeric columns in table "station_orders" */
export type Station_Orders_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  order_id?: InputMaybe<Scalars['Int']>
  station_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "station_orders" */
export type Station_Orders_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  order?: InputMaybe<Orders_Obj_Rel_Insert_Input>
  order_id?: InputMaybe<Scalars['Int']>
  station?: InputMaybe<Stations_Obj_Rel_Insert_Input>
  station_id?: InputMaybe<Scalars['Int']>
  visit?: InputMaybe<Visits_Obj_Rel_Insert_Input>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Station_Orders_Max_Fields = {
  __typename?: 'station_orders_max_fields'
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  station_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "station_orders" */
export type Station_Orders_Max_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Station_Orders_Min_Fields = {
  __typename?: 'station_orders_min_fields'
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  station_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "station_orders" */
export type Station_Orders_Min_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "station_orders" */
export type Station_Orders_Mutation_Response = {
  __typename?: 'station_orders_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Station_Orders>
}

/** input type for inserting object relation for remote table "station_orders" */
export type Station_Orders_Obj_Rel_Insert_Input = {
  data: Station_Orders_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Station_Orders_On_Conflict>
}

/** on conflict condition type for table "station_orders" */
export type Station_Orders_On_Conflict = {
  constraint: Station_Orders_Constraint
  update_columns?: Array<Station_Orders_Update_Column>
  where?: InputMaybe<Station_Orders_Bool_Exp>
}

/** Ordering options when selecting data from "station_orders". */
export type Station_Orders_Order_By = {
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  order?: InputMaybe<Orders_Order_By>
  order_id?: InputMaybe<Order_By>
  station?: InputMaybe<Stations_Order_By>
  station_id?: InputMaybe<Order_By>
  visit?: InputMaybe<Visits_Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: station_orders */
export type Station_Orders_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "station_orders" */
export enum Station_Orders_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  StationId = 'station_id',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "station_orders" */
export type Station_Orders_Set_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  order_id?: InputMaybe<Scalars['Int']>
  station_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Station_Orders_Stddev_Fields = {
  __typename?: 'station_orders_stddev_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "station_orders" */
export type Station_Orders_Stddev_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Station_Orders_Stddev_Pop_Fields = {
  __typename?: 'station_orders_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "station_orders" */
export type Station_Orders_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Station_Orders_Stddev_Samp_Fields = {
  __typename?: 'station_orders_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "station_orders" */
export type Station_Orders_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type Station_Orders_Sum_Fields = {
  __typename?: 'station_orders_sum_fields'
  id?: Maybe<Scalars['Int']>
  order_id?: Maybe<Scalars['Int']>
  station_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "station_orders" */
export type Station_Orders_Sum_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** update columns of table "station_orders" */
export enum Station_Orders_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  StationId = 'station_id',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Station_Orders_Var_Pop_Fields = {
  __typename?: 'station_orders_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "station_orders" */
export type Station_Orders_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Station_Orders_Var_Samp_Fields = {
  __typename?: 'station_orders_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "station_orders" */
export type Station_Orders_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Station_Orders_Variance_Fields = {
  __typename?: 'station_orders_variance_fields'
  id?: Maybe<Scalars['Float']>
  order_id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "station_orders" */
export type Station_Orders_Variance_Order_By = {
  id?: InputMaybe<Order_By>
  order_id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** columns and relationships of "station_type" */
export type Station_Type = {
  __typename?: 'station_type'
  code: Scalars['String']
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  position: Scalars['Int']
  title: Scalars['String']
  visit_action_name?: Maybe<Scalars['String']>
}

/** aggregated selection of "station_type" */
export type Station_Type_Aggregate = {
  __typename?: 'station_type_aggregate'
  aggregate?: Maybe<Station_Type_Aggregate_Fields>
  nodes: Array<Station_Type>
}

/** aggregate fields of "station_type" */
export type Station_Type_Aggregate_Fields = {
  __typename?: 'station_type_aggregate_fields'
  avg?: Maybe<Station_Type_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Station_Type_Max_Fields>
  min?: Maybe<Station_Type_Min_Fields>
  stddev?: Maybe<Station_Type_Stddev_Fields>
  stddev_pop?: Maybe<Station_Type_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Station_Type_Stddev_Samp_Fields>
  sum?: Maybe<Station_Type_Sum_Fields>
  var_pop?: Maybe<Station_Type_Var_Pop_Fields>
  var_samp?: Maybe<Station_Type_Var_Samp_Fields>
  variance?: Maybe<Station_Type_Variance_Fields>
}

/** aggregate fields of "station_type" */
export type Station_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Station_Type_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Station_Type_Avg_Fields = {
  __typename?: 'station_type_avg_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "station_type". All fields are combined with a logical 'AND'. */
export type Station_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Station_Type_Bool_Exp>>
  _not?: InputMaybe<Station_Type_Bool_Exp>
  _or?: InputMaybe<Array<Station_Type_Bool_Exp>>
  code?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  position?: InputMaybe<Int_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
  visit_action_name?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "station_type" */
export enum Station_Type_Constraint {
  /** unique or primary key constraint */
  StationTypeCodeKey = 'station_type_code_key',
  /** unique or primary key constraint */
  StationTypePkey = 'station_type_pkey',
}

/** input type for incrementing numeric columns in table "station_type" */
export type Station_Type_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  position?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "station_type" */
export type Station_Type_Insert_Input = {
  code?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  position?: InputMaybe<Scalars['Int']>
  title?: InputMaybe<Scalars['String']>
  visit_action_name?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Station_Type_Max_Fields = {
  __typename?: 'station_type_max_fields'
  code?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  position?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  visit_action_name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Station_Type_Min_Fields = {
  __typename?: 'station_type_min_fields'
  code?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  position?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  visit_action_name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "station_type" */
export type Station_Type_Mutation_Response = {
  __typename?: 'station_type_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Station_Type>
}

/** on conflict condition type for table "station_type" */
export type Station_Type_On_Conflict = {
  constraint: Station_Type_Constraint
  update_columns?: Array<Station_Type_Update_Column>
  where?: InputMaybe<Station_Type_Bool_Exp>
}

/** Ordering options when selecting data from "station_type". */
export type Station_Type_Order_By = {
  code?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  visit_action_name?: InputMaybe<Order_By>
}

/** primary key columns input for table: station_type */
export type Station_Type_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "station_type" */
export enum Station_Type_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Position = 'position',
  /** column name */
  Title = 'title',
  /** column name */
  VisitActionName = 'visit_action_name',
}

/** input type for updating data in table "station_type" */
export type Station_Type_Set_Input = {
  code?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  position?: InputMaybe<Scalars['Int']>
  title?: InputMaybe<Scalars['String']>
  visit_action_name?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Station_Type_Stddev_Fields = {
  __typename?: 'station_type_stddev_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Station_Type_Stddev_Pop_Fields = {
  __typename?: 'station_type_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Station_Type_Stddev_Samp_Fields = {
  __typename?: 'station_type_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Station_Type_Sum_Fields = {
  __typename?: 'station_type_sum_fields'
  id?: Maybe<Scalars['Int']>
  position?: Maybe<Scalars['Int']>
}

/** update columns of table "station_type" */
export enum Station_Type_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Position = 'position',
  /** column name */
  Title = 'title',
  /** column name */
  VisitActionName = 'visit_action_name',
}

/** aggregate var_pop on columns */
export type Station_Type_Var_Pop_Fields = {
  __typename?: 'station_type_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Station_Type_Var_Samp_Fields = {
  __typename?: 'station_type_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Station_Type_Variance_Fields = {
  __typename?: 'station_type_variance_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
}

/** columns and relationships of "station_visits" */
export type Station_Visits = {
  __typename?: 'station_visits'
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  station_id: Scalars['Int']
  /** An object relationship */
  visit: Visits
  visit_id: Scalars['Int']
}

/** aggregated selection of "station_visits" */
export type Station_Visits_Aggregate = {
  __typename?: 'station_visits_aggregate'
  aggregate?: Maybe<Station_Visits_Aggregate_Fields>
  nodes: Array<Station_Visits>
}

/** aggregate fields of "station_visits" */
export type Station_Visits_Aggregate_Fields = {
  __typename?: 'station_visits_aggregate_fields'
  avg?: Maybe<Station_Visits_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Station_Visits_Max_Fields>
  min?: Maybe<Station_Visits_Min_Fields>
  stddev?: Maybe<Station_Visits_Stddev_Fields>
  stddev_pop?: Maybe<Station_Visits_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Station_Visits_Stddev_Samp_Fields>
  sum?: Maybe<Station_Visits_Sum_Fields>
  var_pop?: Maybe<Station_Visits_Var_Pop_Fields>
  var_samp?: Maybe<Station_Visits_Var_Samp_Fields>
  variance?: Maybe<Station_Visits_Variance_Fields>
}

/** aggregate fields of "station_visits" */
export type Station_Visits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Station_Visits_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "station_visits" */
export type Station_Visits_Aggregate_Order_By = {
  avg?: InputMaybe<Station_Visits_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Station_Visits_Max_Order_By>
  min?: InputMaybe<Station_Visits_Min_Order_By>
  stddev?: InputMaybe<Station_Visits_Stddev_Order_By>
  stddev_pop?: InputMaybe<Station_Visits_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Station_Visits_Stddev_Samp_Order_By>
  sum?: InputMaybe<Station_Visits_Sum_Order_By>
  var_pop?: InputMaybe<Station_Visits_Var_Pop_Order_By>
  var_samp?: InputMaybe<Station_Visits_Var_Samp_Order_By>
  variance?: InputMaybe<Station_Visits_Variance_Order_By>
}

/** input type for inserting array relation for remote table "station_visits" */
export type Station_Visits_Arr_Rel_Insert_Input = {
  data: Array<Station_Visits_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Station_Visits_On_Conflict>
}

/** aggregate avg on columns */
export type Station_Visits_Avg_Fields = {
  __typename?: 'station_visits_avg_fields'
  id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "station_visits" */
export type Station_Visits_Avg_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "station_visits". All fields are combined with a logical 'AND'. */
export type Station_Visits_Bool_Exp = {
  _and?: InputMaybe<Array<Station_Visits_Bool_Exp>>
  _not?: InputMaybe<Station_Visits_Bool_Exp>
  _or?: InputMaybe<Array<Station_Visits_Bool_Exp>>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  station_id?: InputMaybe<Int_Comparison_Exp>
  visit?: InputMaybe<Visits_Bool_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "station_visits" */
export enum Station_Visits_Constraint {
  /** unique or primary key constraint */
  StationVisitsPkey = 'station_visits_pkey',
  /** unique or primary key constraint */
  StationVisitsVisitIdKey = 'station_visits_visit_id_key',
}

/** input type for incrementing numeric columns in table "station_visits" */
export type Station_Visits_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  station_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "station_visits" */
export type Station_Visits_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  station_id?: InputMaybe<Scalars['Int']>
  visit?: InputMaybe<Visits_Obj_Rel_Insert_Input>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Station_Visits_Max_Fields = {
  __typename?: 'station_visits_max_fields'
  id?: Maybe<Scalars['Int']>
  station_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "station_visits" */
export type Station_Visits_Max_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Station_Visits_Min_Fields = {
  __typename?: 'station_visits_min_fields'
  id?: Maybe<Scalars['Int']>
  station_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "station_visits" */
export type Station_Visits_Min_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "station_visits" */
export type Station_Visits_Mutation_Response = {
  __typename?: 'station_visits_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Station_Visits>
}

/** input type for inserting object relation for remote table "station_visits" */
export type Station_Visits_Obj_Rel_Insert_Input = {
  data: Station_Visits_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Station_Visits_On_Conflict>
}

/** on conflict condition type for table "station_visits" */
export type Station_Visits_On_Conflict = {
  constraint: Station_Visits_Constraint
  update_columns?: Array<Station_Visits_Update_Column>
  where?: InputMaybe<Station_Visits_Bool_Exp>
}

/** Ordering options when selecting data from "station_visits". */
export type Station_Visits_Order_By = {
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit?: InputMaybe<Visits_Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: station_visits */
export type Station_Visits_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "station_visits" */
export enum Station_Visits_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  StationId = 'station_id',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "station_visits" */
export type Station_Visits_Set_Input = {
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  station_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Station_Visits_Stddev_Fields = {
  __typename?: 'station_visits_stddev_fields'
  id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "station_visits" */
export type Station_Visits_Stddev_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Station_Visits_Stddev_Pop_Fields = {
  __typename?: 'station_visits_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "station_visits" */
export type Station_Visits_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Station_Visits_Stddev_Samp_Fields = {
  __typename?: 'station_visits_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "station_visits" */
export type Station_Visits_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type Station_Visits_Sum_Fields = {
  __typename?: 'station_visits_sum_fields'
  id?: Maybe<Scalars['Int']>
  station_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "station_visits" */
export type Station_Visits_Sum_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** update columns of table "station_visits" */
export enum Station_Visits_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  StationId = 'station_id',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Station_Visits_Var_Pop_Fields = {
  __typename?: 'station_visits_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "station_visits" */
export type Station_Visits_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Station_Visits_Var_Samp_Fields = {
  __typename?: 'station_visits_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "station_visits" */
export type Station_Visits_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Station_Visits_Variance_Fields = {
  __typename?: 'station_visits_variance_fields'
  id?: Maybe<Scalars['Float']>
  station_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "station_visits" */
export type Station_Visits_Variance_Order_By = {
  id?: InputMaybe<Order_By>
  station_id?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** columns and relationships of "stations" */
export type Stations = {
  __typename?: 'stations'
  code: Scalars['String']
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  /** An array relationship */
  order_types: Array<Order_Type>
  /** An aggregate relationship */
  order_types_aggregate: Order_Type_Aggregate
  position: Scalars['Int']
  /** An object relationship */
  session: Sessions
  session_id: Scalars['Int']
  /** An array relationship */
  station_orders: Array<Station_Orders>
  /** An aggregate relationship */
  station_orders_aggregate: Station_Orders_Aggregate
  /** An array relationship */
  station_visits: Array<Station_Visits>
  /** An aggregate relationship */
  station_visits_aggregate: Station_Visits_Aggregate
  title: Scalars['String']
  visit_action_name?: Maybe<Scalars['String']>
}

/** columns and relationships of "stations" */
export type StationsOrder_TypesArgs = {
  distinct_on?: InputMaybe<Array<Order_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Type_Order_By>>
  where?: InputMaybe<Order_Type_Bool_Exp>
}

/** columns and relationships of "stations" */
export type StationsOrder_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Type_Order_By>>
  where?: InputMaybe<Order_Type_Bool_Exp>
}

/** columns and relationships of "stations" */
export type StationsStation_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Station_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Orders_Order_By>>
  where?: InputMaybe<Station_Orders_Bool_Exp>
}

/** columns and relationships of "stations" */
export type StationsStation_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Orders_Order_By>>
  where?: InputMaybe<Station_Orders_Bool_Exp>
}

/** columns and relationships of "stations" */
export type StationsStation_VisitsArgs = {
  distinct_on?: InputMaybe<Array<Station_Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Visits_Order_By>>
  where?: InputMaybe<Station_Visits_Bool_Exp>
}

/** columns and relationships of "stations" */
export type StationsStation_Visits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Visits_Order_By>>
  where?: InputMaybe<Station_Visits_Bool_Exp>
}

/** aggregated selection of "stations" */
export type Stations_Aggregate = {
  __typename?: 'stations_aggregate'
  aggregate?: Maybe<Stations_Aggregate_Fields>
  nodes: Array<Stations>
}

/** aggregate fields of "stations" */
export type Stations_Aggregate_Fields = {
  __typename?: 'stations_aggregate_fields'
  avg?: Maybe<Stations_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Stations_Max_Fields>
  min?: Maybe<Stations_Min_Fields>
  stddev?: Maybe<Stations_Stddev_Fields>
  stddev_pop?: Maybe<Stations_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Stations_Stddev_Samp_Fields>
  sum?: Maybe<Stations_Sum_Fields>
  var_pop?: Maybe<Stations_Var_Pop_Fields>
  var_samp?: Maybe<Stations_Var_Samp_Fields>
  variance?: Maybe<Stations_Variance_Fields>
}

/** aggregate fields of "stations" */
export type Stations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stations_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "stations" */
export type Stations_Aggregate_Order_By = {
  avg?: InputMaybe<Stations_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Stations_Max_Order_By>
  min?: InputMaybe<Stations_Min_Order_By>
  stddev?: InputMaybe<Stations_Stddev_Order_By>
  stddev_pop?: InputMaybe<Stations_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Stations_Stddev_Samp_Order_By>
  sum?: InputMaybe<Stations_Sum_Order_By>
  var_pop?: InputMaybe<Stations_Var_Pop_Order_By>
  var_samp?: InputMaybe<Stations_Var_Samp_Order_By>
  variance?: InputMaybe<Stations_Variance_Order_By>
}

/** input type for inserting array relation for remote table "stations" */
export type Stations_Arr_Rel_Insert_Input = {
  data: Array<Stations_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Stations_On_Conflict>
}

/** aggregate avg on columns */
export type Stations_Avg_Fields = {
  __typename?: 'stations_avg_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "stations" */
export type Stations_Avg_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "stations". All fields are combined with a logical 'AND'. */
export type Stations_Bool_Exp = {
  _and?: InputMaybe<Array<Stations_Bool_Exp>>
  _not?: InputMaybe<Stations_Bool_Exp>
  _or?: InputMaybe<Array<Stations_Bool_Exp>>
  code?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  order_types?: InputMaybe<Order_Type_Bool_Exp>
  position?: InputMaybe<Int_Comparison_Exp>
  session?: InputMaybe<Sessions_Bool_Exp>
  session_id?: InputMaybe<Int_Comparison_Exp>
  station_orders?: InputMaybe<Station_Orders_Bool_Exp>
  station_visits?: InputMaybe<Station_Visits_Bool_Exp>
  title?: InputMaybe<String_Comparison_Exp>
  visit_action_name?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "stations" */
export enum Stations_Constraint {
  /** unique or primary key constraint */
  StationsPkey = 'stations_pkey',
}

/** input type for incrementing numeric columns in table "stations" */
export type Stations_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  position?: InputMaybe<Scalars['Int']>
  session_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "stations" */
export type Stations_Insert_Input = {
  code?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  order_types?: InputMaybe<Order_Type_Arr_Rel_Insert_Input>
  position?: InputMaybe<Scalars['Int']>
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>
  session_id?: InputMaybe<Scalars['Int']>
  station_orders?: InputMaybe<Station_Orders_Arr_Rel_Insert_Input>
  station_visits?: InputMaybe<Station_Visits_Arr_Rel_Insert_Input>
  title?: InputMaybe<Scalars['String']>
  visit_action_name?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Stations_Max_Fields = {
  __typename?: 'stations_max_fields'
  code?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  position?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  visit_action_name?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "stations" */
export type Stations_Max_Order_By = {
  code?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  visit_action_name?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Stations_Min_Fields = {
  __typename?: 'stations_min_fields'
  code?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  position?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  visit_action_name?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "stations" */
export type Stations_Min_Order_By = {
  code?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  visit_action_name?: InputMaybe<Order_By>
}

/** response of any mutation on the table "stations" */
export type Stations_Mutation_Response = {
  __typename?: 'stations_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Stations>
}

/** input type for inserting object relation for remote table "stations" */
export type Stations_Obj_Rel_Insert_Input = {
  data: Stations_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Stations_On_Conflict>
}

/** on conflict condition type for table "stations" */
export type Stations_On_Conflict = {
  constraint: Stations_Constraint
  update_columns?: Array<Stations_Update_Column>
  where?: InputMaybe<Stations_Bool_Exp>
}

/** Ordering options when selecting data from "stations". */
export type Stations_Order_By = {
  code?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  order_types_aggregate?: InputMaybe<Order_Type_Aggregate_Order_By>
  position?: InputMaybe<Order_By>
  session?: InputMaybe<Sessions_Order_By>
  session_id?: InputMaybe<Order_By>
  station_orders_aggregate?: InputMaybe<Station_Orders_Aggregate_Order_By>
  station_visits_aggregate?: InputMaybe<Station_Visits_Aggregate_Order_By>
  title?: InputMaybe<Order_By>
  visit_action_name?: InputMaybe<Order_By>
}

/** primary key columns input for table: stations */
export type Stations_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "stations" */
export enum Stations_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Position = 'position',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Title = 'title',
  /** column name */
  VisitActionName = 'visit_action_name',
}

/** input type for updating data in table "stations" */
export type Stations_Set_Input = {
  code?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  position?: InputMaybe<Scalars['Int']>
  session_id?: InputMaybe<Scalars['Int']>
  title?: InputMaybe<Scalars['String']>
  visit_action_name?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Stations_Stddev_Fields = {
  __typename?: 'stations_stddev_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "stations" */
export type Stations_Stddev_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Stations_Stddev_Pop_Fields = {
  __typename?: 'stations_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "stations" */
export type Stations_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Stations_Stddev_Samp_Fields = {
  __typename?: 'stations_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "stations" */
export type Stations_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type Stations_Sum_Fields = {
  __typename?: 'stations_sum_fields'
  id?: Maybe<Scalars['Int']>
  position?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "stations" */
export type Stations_Sum_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

/** update columns of table "stations" */
export enum Stations_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Position = 'position',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Title = 'title',
  /** column name */
  VisitActionName = 'visit_action_name',
}

/** aggregate var_pop on columns */
export type Stations_Var_Pop_Fields = {
  __typename?: 'stations_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "stations" */
export type Stations_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Stations_Var_Samp_Fields = {
  __typename?: 'stations_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "stations" */
export type Stations_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Stations_Variance_Fields = {
  __typename?: 'stations_variance_fields'
  id?: Maybe<Scalars['Float']>
  position?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "stations" */
export type Stations_Variance_Order_By = {
  id?: InputMaybe<Order_By>
  position?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "assessment_orders" */
  assessment_orders: Array<Assessment_Orders>
  /** fetch aggregated fields from the table: "assessment_orders" */
  assessment_orders_aggregate: Assessment_Orders_Aggregate
  /** fetch data from the table: "assessment_orders" using primary key columns */
  assessment_orders_by_pk?: Maybe<Assessment_Orders>
  /** fetch data from the table: "clearance_notes" */
  clearance_notes: Array<Clearance_Notes>
  /** fetch aggregated fields from the table: "clearance_notes" */
  clearance_notes_aggregate: Clearance_Notes_Aggregate
  /** fetch data from the table: "clearance_notes" using primary key columns */
  clearance_notes_by_pk?: Maybe<Clearance_Notes>
  /** fetch data from the table: "form_localizations" */
  form_localizations: Array<Form_Localizations>
  /** fetch aggregated fields from the table: "form_localizations" */
  form_localizations_aggregate: Form_Localizations_Aggregate
  /** fetch data from the table: "form_localizations" using primary key columns */
  form_localizations_by_pk?: Maybe<Form_Localizations>
  /** fetch data from the table: "form_types" */
  form_types: Array<Form_Types>
  /** fetch aggregated fields from the table: "form_types" */
  form_types_aggregate: Form_Types_Aggregate
  /** fetch data from the table: "form_types" using primary key columns */
  form_types_by_pk?: Maybe<Form_Types>
  /** fetch data from the table: "forms" */
  forms: Array<Forms>
  /** fetch aggregated fields from the table: "forms" */
  forms_aggregate: Forms_Aggregate
  /** fetch data from the table: "forms" using primary key columns */
  forms_by_pk?: Maybe<Forms>
  /** fetch data from the table: "locations" */
  locations: Array<Locations>
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>
  /** fetch data from the table: "medication_orders" */
  medication_orders: Array<Medication_Orders>
  /** fetch aggregated fields from the table: "medication_orders" */
  medication_orders_aggregate: Medication_Orders_Aggregate
  /** fetch data from the table: "medication_orders" using primary key columns */
  medication_orders_by_pk?: Maybe<Medication_Orders>
  /** fetch data from the table: "order_height_and_weight" */
  order_height_and_weight: Array<Order_Height_And_Weight>
  /** fetch aggregated fields from the table: "order_height_and_weight" */
  order_height_and_weight_aggregate: Order_Height_And_Weight_Aggregate
  /** fetch data from the table: "order_height_and_weight" using primary key columns */
  order_height_and_weight_by_pk?: Maybe<Order_Height_And_Weight>
  /** fetch data from the table: "order_medical_assessment" */
  order_medical_assessment: Array<Order_Medical_Assessment>
  /** fetch aggregated fields from the table: "order_medical_assessment" */
  order_medical_assessment_aggregate: Order_Medical_Assessment_Aggregate
  /** fetch data from the table: "order_medical_assessment" using primary key columns */
  order_medical_assessment_by_pk?: Maybe<Order_Medical_Assessment>
  /** fetch data from the table: "order_musculoskeletal" */
  order_musculoskeletal: Array<Order_Musculoskeletal>
  /** fetch aggregated fields from the table: "order_musculoskeletal" */
  order_musculoskeletal_aggregate: Order_Musculoskeletal_Aggregate
  /** fetch data from the table: "order_musculoskeletal" using primary key columns */
  order_musculoskeletal_by_pk?: Maybe<Order_Musculoskeletal>
  /** fetch data from the table: "order_type" */
  order_type: Array<Order_Type>
  /** fetch aggregated fields from the table: "order_type" */
  order_type_aggregate: Order_Type_Aggregate
  /** fetch data from the table: "order_type" using primary key columns */
  order_type_by_pk?: Maybe<Order_Type>
  /** fetch data from the table: "order_vision" */
  order_vision: Array<Order_Vision>
  /** fetch aggregated fields from the table: "order_vision" */
  order_vision_aggregate: Order_Vision_Aggregate
  /** fetch data from the table: "order_vision" using primary key columns */
  order_vision_by_pk?: Maybe<Order_Vision>
  /** fetch data from the table: "orders" */
  orders: Array<Orders>
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>
  /** fetch data from the table: "place_of_service" */
  place_of_service: Array<Place_Of_Service>
  /** fetch aggregated fields from the table: "place_of_service" */
  place_of_service_aggregate: Place_Of_Service_Aggregate
  /** fetch data from the table: "place_of_service" using primary key columns */
  place_of_service_by_pk?: Maybe<Place_Of_Service>
  /** An array relationship */
  session_logs: Array<Session_Logs>
  /** An aggregate relationship */
  session_logs_aggregate: Session_Logs_Aggregate
  /** fetch data from the table: "session_logs" using primary key columns */
  session_logs_by_pk?: Maybe<Session_Logs>
  /** fetch data from the table: "session_station_order_config" */
  session_station_order_config: Array<Session_Station_Order_Config>
  /** fetch aggregated fields from the table: "session_station_order_config" */
  session_station_order_config_aggregate: Session_Station_Order_Config_Aggregate
  /** fetch data from the table: "session_station_order_config" using primary key columns */
  session_station_order_config_by_pk?: Maybe<Session_Station_Order_Config>
  /** fetch data from the table: "session_type" */
  session_type: Array<Session_Type>
  /** fetch aggregated fields from the table: "session_type" */
  session_type_aggregate: Session_Type_Aggregate
  /** fetch data from the table: "session_type" using primary key columns */
  session_type_by_pk?: Maybe<Session_Type>
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>
  /** An array relationship */
  station_orders: Array<Station_Orders>
  /** An aggregate relationship */
  station_orders_aggregate: Station_Orders_Aggregate
  /** fetch data from the table: "station_orders" using primary key columns */
  station_orders_by_pk?: Maybe<Station_Orders>
  /** fetch data from the table: "station_type" */
  station_type: Array<Station_Type>
  /** fetch aggregated fields from the table: "station_type" */
  station_type_aggregate: Station_Type_Aggregate
  /** fetch data from the table: "station_type" using primary key columns */
  station_type_by_pk?: Maybe<Station_Type>
  /** An array relationship */
  station_visits: Array<Station_Visits>
  /** An aggregate relationship */
  station_visits_aggregate: Station_Visits_Aggregate
  /** fetch data from the table: "station_visits" using primary key columns */
  station_visits_by_pk?: Maybe<Station_Visits>
  /** An array relationship */
  stations: Array<Stations>
  /** An aggregate relationship */
  stations_aggregate: Stations_Aggregate
  /** fetch data from the table: "stations" using primary key columns */
  stations_by_pk?: Maybe<Stations>
  /** fetch data from the table: "test_orders" */
  test_orders: Array<Test_Orders>
  /** fetch aggregated fields from the table: "test_orders" */
  test_orders_aggregate: Test_Orders_Aggregate
  /** fetch data from the table: "test_orders" using primary key columns */
  test_orders_by_pk?: Maybe<Test_Orders>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
  /** fetch data from the table: "video_calls" */
  video_calls: Array<Video_Calls>
  /** fetch aggregated fields from the table: "video_calls" */
  video_calls_aggregate: Video_Calls_Aggregate
  /** fetch data from the table: "video_calls" using primary key columns */
  video_calls_by_pk?: Maybe<Video_Calls>
  /** An array relationship */
  visits: Array<Visits>
  /** An aggregate relationship */
  visits_aggregate: Visits_Aggregate
  /** fetch data from the table: "visits" using primary key columns */
  visits_by_pk?: Maybe<Visits>
}

export type Subscription_RootAssessment_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Assessment_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Assessment_Orders_Order_By>>
  where?: InputMaybe<Assessment_Orders_Bool_Exp>
}

export type Subscription_RootAssessment_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assessment_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Assessment_Orders_Order_By>>
  where?: InputMaybe<Assessment_Orders_Bool_Exp>
}

export type Subscription_RootAssessment_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootClearance_NotesArgs = {
  distinct_on?: InputMaybe<Array<Clearance_Notes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Clearance_Notes_Order_By>>
  where?: InputMaybe<Clearance_Notes_Bool_Exp>
}

export type Subscription_RootClearance_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Clearance_Notes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Clearance_Notes_Order_By>>
  where?: InputMaybe<Clearance_Notes_Bool_Exp>
}

export type Subscription_RootClearance_Notes_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootForm_LocalizationsArgs = {
  distinct_on?: InputMaybe<Array<Form_Localizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Localizations_Order_By>>
  where?: InputMaybe<Form_Localizations_Bool_Exp>
}

export type Subscription_RootForm_Localizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Localizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Localizations_Order_By>>
  where?: InputMaybe<Form_Localizations_Bool_Exp>
}

export type Subscription_RootForm_Localizations_By_PkArgs = {
  locale: Scalars['String']
  type: Scalars['String']
}

export type Subscription_RootForm_TypesArgs = {
  distinct_on?: InputMaybe<Array<Form_Types_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Types_Order_By>>
  where?: InputMaybe<Form_Types_Bool_Exp>
}

export type Subscription_RootForm_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Types_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Form_Types_Order_By>>
  where?: InputMaybe<Form_Types_Bool_Exp>
}

export type Subscription_RootForm_Types_By_PkArgs = {
  id: Scalars['String']
}

export type Subscription_RootFormsArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Forms_Order_By>>
  where?: InputMaybe<Forms_Bool_Exp>
}

export type Subscription_RootForms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Forms_Order_By>>
  where?: InputMaybe<Forms_Bool_Exp>
}

export type Subscription_RootForms_By_PkArgs = {
  patient_id: Scalars['String']
  type: Scalars['String']
}

export type Subscription_RootLocationsArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Locations_Order_By>>
  where?: InputMaybe<Locations_Bool_Exp>
}

export type Subscription_RootLocations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Locations_Order_By>>
  where?: InputMaybe<Locations_Bool_Exp>
}

export type Subscription_RootLocations_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootMedication_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Medication_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Medication_Orders_Order_By>>
  where?: InputMaybe<Medication_Orders_Bool_Exp>
}

export type Subscription_RootMedication_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Medication_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Medication_Orders_Order_By>>
  where?: InputMaybe<Medication_Orders_Bool_Exp>
}

export type Subscription_RootMedication_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootOrder_Height_And_WeightArgs = {
  distinct_on?: InputMaybe<Array<Order_Height_And_Weight_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Height_And_Weight_Order_By>>
  where?: InputMaybe<Order_Height_And_Weight_Bool_Exp>
}

export type Subscription_RootOrder_Height_And_Weight_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Height_And_Weight_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Height_And_Weight_Order_By>>
  where?: InputMaybe<Order_Height_And_Weight_Bool_Exp>
}

export type Subscription_RootOrder_Height_And_Weight_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootOrder_Medical_AssessmentArgs = {
  distinct_on?: InputMaybe<Array<Order_Medical_Assessment_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Medical_Assessment_Order_By>>
  where?: InputMaybe<Order_Medical_Assessment_Bool_Exp>
}

export type Subscription_RootOrder_Medical_Assessment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Medical_Assessment_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Medical_Assessment_Order_By>>
  where?: InputMaybe<Order_Medical_Assessment_Bool_Exp>
}

export type Subscription_RootOrder_Medical_Assessment_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootOrder_MusculoskeletalArgs = {
  distinct_on?: InputMaybe<Array<Order_Musculoskeletal_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Musculoskeletal_Order_By>>
  where?: InputMaybe<Order_Musculoskeletal_Bool_Exp>
}

export type Subscription_RootOrder_Musculoskeletal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Musculoskeletal_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Musculoskeletal_Order_By>>
  where?: InputMaybe<Order_Musculoskeletal_Bool_Exp>
}

export type Subscription_RootOrder_Musculoskeletal_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootOrder_TypeArgs = {
  distinct_on?: InputMaybe<Array<Order_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Type_Order_By>>
  where?: InputMaybe<Order_Type_Bool_Exp>
}

export type Subscription_RootOrder_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Type_Order_By>>
  where?: InputMaybe<Order_Type_Bool_Exp>
}

export type Subscription_RootOrder_Type_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootOrder_VisionArgs = {
  distinct_on?: InputMaybe<Array<Order_Vision_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Vision_Order_By>>
  where?: InputMaybe<Order_Vision_Bool_Exp>
}

export type Subscription_RootOrder_Vision_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Vision_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Order_Vision_Order_By>>
  where?: InputMaybe<Order_Vision_Bool_Exp>
}

export type Subscription_RootOrder_Vision_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Orders_Order_By>>
  where?: InputMaybe<Orders_Bool_Exp>
}

export type Subscription_RootOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Orders_Order_By>>
  where?: InputMaybe<Orders_Bool_Exp>
}

export type Subscription_RootOrders_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Subscription_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Subscription_RootOrganizations_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootPlace_Of_ServiceArgs = {
  distinct_on?: InputMaybe<Array<Place_Of_Service_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Place_Of_Service_Order_By>>
  where?: InputMaybe<Place_Of_Service_Bool_Exp>
}

export type Subscription_RootPlace_Of_Service_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Place_Of_Service_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Place_Of_Service_Order_By>>
  where?: InputMaybe<Place_Of_Service_Bool_Exp>
}

export type Subscription_RootPlace_Of_Service_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootSession_LogsArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

export type Subscription_RootSession_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

export type Subscription_RootSession_Logs_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootSession_Station_Order_ConfigArgs = {
  distinct_on?: InputMaybe<Array<Session_Station_Order_Config_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Station_Order_Config_Order_By>>
  where?: InputMaybe<Session_Station_Order_Config_Bool_Exp>
}

export type Subscription_RootSession_Station_Order_Config_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Station_Order_Config_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Station_Order_Config_Order_By>>
  where?: InputMaybe<Session_Station_Order_Config_Bool_Exp>
}

export type Subscription_RootSession_Station_Order_Config_By_PkArgs = {
  order_type_id: Scalars['Int']
  session_type_id: Scalars['Int']
  station_type_id: Scalars['Int']
}

export type Subscription_RootSession_TypeArgs = {
  distinct_on?: InputMaybe<Array<Session_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Type_Order_By>>
  where?: InputMaybe<Session_Type_Bool_Exp>
}

export type Subscription_RootSession_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Type_Order_By>>
  where?: InputMaybe<Session_Type_Bool_Exp>
}

export type Subscription_RootSession_Type_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Sessions_Order_By>>
  where?: InputMaybe<Sessions_Bool_Exp>
}

export type Subscription_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Sessions_Order_By>>
  where?: InputMaybe<Sessions_Bool_Exp>
}

export type Subscription_RootSessions_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootStation_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Station_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Orders_Order_By>>
  where?: InputMaybe<Station_Orders_Bool_Exp>
}

export type Subscription_RootStation_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Orders_Order_By>>
  where?: InputMaybe<Station_Orders_Bool_Exp>
}

export type Subscription_RootStation_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootStation_TypeArgs = {
  distinct_on?: InputMaybe<Array<Station_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Type_Order_By>>
  where?: InputMaybe<Station_Type_Bool_Exp>
}

export type Subscription_RootStation_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Type_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Type_Order_By>>
  where?: InputMaybe<Station_Type_Bool_Exp>
}

export type Subscription_RootStation_Type_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootStation_VisitsArgs = {
  distinct_on?: InputMaybe<Array<Station_Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Visits_Order_By>>
  where?: InputMaybe<Station_Visits_Bool_Exp>
}

export type Subscription_RootStation_Visits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Station_Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Station_Visits_Order_By>>
  where?: InputMaybe<Station_Visits_Bool_Exp>
}

export type Subscription_RootStation_Visits_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootStationsArgs = {
  distinct_on?: InputMaybe<Array<Stations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Stations_Order_By>>
  where?: InputMaybe<Stations_Bool_Exp>
}

export type Subscription_RootStations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Stations_Order_By>>
  where?: InputMaybe<Stations_Bool_Exp>
}

export type Subscription_RootStations_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootTest_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Test_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Orders_Order_By>>
  where?: InputMaybe<Test_Orders_Bool_Exp>
}

export type Subscription_RootTest_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Orders_Order_By>>
  where?: InputMaybe<Test_Orders_Bool_Exp>
}

export type Subscription_RootTest_Orders_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootVideo_CallsArgs = {
  distinct_on?: InputMaybe<Array<Video_Calls_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Video_Calls_Order_By>>
  where?: InputMaybe<Video_Calls_Bool_Exp>
}

export type Subscription_RootVideo_Calls_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Video_Calls_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Video_Calls_Order_By>>
  where?: InputMaybe<Video_Calls_Bool_Exp>
}

export type Subscription_RootVideo_Calls_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootVisitsArgs = {
  distinct_on?: InputMaybe<Array<Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Visits_Order_By>>
  where?: InputMaybe<Visits_Bool_Exp>
}

export type Subscription_RootVisits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Visits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Visits_Order_By>>
  where?: InputMaybe<Visits_Bool_Exp>
}

export type Subscription_RootVisits_By_PkArgs = {
  id: Scalars['Int']
}

/** columns and relationships of "test_orders" */
export type Test_Orders = {
  __typename?: 'test_orders'
  administration_notes?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  provider_id: Scalars['Int']
  provider_orders?: Maybe<Scalars['String']>
  status: Scalars['String']
  test_outcome?: Maybe<Scalars['String']>
  type: Scalars['String']
  unread?: Maybe<Scalars['Boolean']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id: Scalars['Int']
}

/** aggregated selection of "test_orders" */
export type Test_Orders_Aggregate = {
  __typename?: 'test_orders_aggregate'
  aggregate?: Maybe<Test_Orders_Aggregate_Fields>
  nodes: Array<Test_Orders>
}

/** aggregate fields of "test_orders" */
export type Test_Orders_Aggregate_Fields = {
  __typename?: 'test_orders_aggregate_fields'
  avg?: Maybe<Test_Orders_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Test_Orders_Max_Fields>
  min?: Maybe<Test_Orders_Min_Fields>
  stddev?: Maybe<Test_Orders_Stddev_Fields>
  stddev_pop?: Maybe<Test_Orders_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Test_Orders_Stddev_Samp_Fields>
  sum?: Maybe<Test_Orders_Sum_Fields>
  var_pop?: Maybe<Test_Orders_Var_Pop_Fields>
  var_samp?: Maybe<Test_Orders_Var_Samp_Fields>
  variance?: Maybe<Test_Orders_Variance_Fields>
}

/** aggregate fields of "test_orders" */
export type Test_Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Orders_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Test_Orders_Avg_Fields = {
  __typename?: 'test_orders_avg_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "test_orders". All fields are combined with a logical 'AND'. */
export type Test_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Test_Orders_Bool_Exp>>
  _not?: InputMaybe<Test_Orders_Bool_Exp>
  _or?: InputMaybe<Array<Test_Orders_Bool_Exp>>
  administration_notes?: InputMaybe<String_Comparison_Exp>
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  facilitator_id?: InputMaybe<Int_Comparison_Exp>
  follow_up_instructions?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  provider_id?: InputMaybe<Int_Comparison_Exp>
  provider_orders?: InputMaybe<String_Comparison_Exp>
  status?: InputMaybe<String_Comparison_Exp>
  test_outcome?: InputMaybe<String_Comparison_Exp>
  type?: InputMaybe<String_Comparison_Exp>
  unread?: InputMaybe<Boolean_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  visit_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "test_orders" */
export enum Test_Orders_Constraint {
  /** unique or primary key constraint */
  TestOrdersPkey = 'test_orders_pkey',
}

/** input type for incrementing numeric columns in table "test_orders" */
export type Test_Orders_Inc_Input = {
  facilitator_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "test_orders" */
export type Test_Orders_Insert_Input = {
  administration_notes?: InputMaybe<Scalars['String']>
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  provider_id?: InputMaybe<Scalars['Int']>
  provider_orders?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  test_outcome?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Test_Orders_Max_Fields = {
  __typename?: 'test_orders_max_fields'
  administration_notes?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  provider_orders?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  test_outcome?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Test_Orders_Min_Fields = {
  __typename?: 'test_orders_min_fields'
  administration_notes?: Maybe<Scalars['String']>
  completed_at?: Maybe<Scalars['timestamptz']>
  created_at?: Maybe<Scalars['timestamptz']>
  facilitator_id?: Maybe<Scalars['Int']>
  follow_up_instructions?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  provider_orders?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  test_outcome?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "test_orders" */
export type Test_Orders_Mutation_Response = {
  __typename?: 'test_orders_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Test_Orders>
}

/** on conflict condition type for table "test_orders" */
export type Test_Orders_On_Conflict = {
  constraint: Test_Orders_Constraint
  update_columns?: Array<Test_Orders_Update_Column>
  where?: InputMaybe<Test_Orders_Bool_Exp>
}

/** Ordering options when selecting data from "test_orders". */
export type Test_Orders_Order_By = {
  administration_notes?: InputMaybe<Order_By>
  completed_at?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  follow_up_instructions?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  provider_orders?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  test_outcome?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  unread?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: test_orders */
export type Test_Orders_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "test_orders" */
export enum Test_Orders_Select_Column {
  /** column name */
  AdministrationNotes = 'administration_notes',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ProviderOrders = 'provider_orders',
  /** column name */
  Status = 'status',
  /** column name */
  TestOutcome = 'test_outcome',
  /** column name */
  Type = 'type',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** input type for updating data in table "test_orders" */
export type Test_Orders_Set_Input = {
  administration_notes?: InputMaybe<Scalars['String']>
  completed_at?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  follow_up_instructions?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  provider_id?: InputMaybe<Scalars['Int']>
  provider_orders?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  test_outcome?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  unread?: InputMaybe<Scalars['Boolean']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Test_Orders_Stddev_Fields = {
  __typename?: 'test_orders_stddev_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Test_Orders_Stddev_Pop_Fields = {
  __typename?: 'test_orders_stddev_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Test_Orders_Stddev_Samp_Fields = {
  __typename?: 'test_orders_stddev_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Test_Orders_Sum_Fields = {
  __typename?: 'test_orders_sum_fields'
  facilitator_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  visit_id?: Maybe<Scalars['Int']>
}

/** update columns of table "test_orders" */
export enum Test_Orders_Update_Column {
  /** column name */
  AdministrationNotes = 'administration_notes',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FollowUpInstructions = 'follow_up_instructions',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ProviderOrders = 'provider_orders',
  /** column name */
  Status = 'status',
  /** column name */
  TestOutcome = 'test_outcome',
  /** column name */
  Type = 'type',
  /** column name */
  Unread = 'unread',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitId = 'visit_id',
}

/** aggregate var_pop on columns */
export type Test_Orders_Var_Pop_Fields = {
  __typename?: 'test_orders_var_pop_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Test_Orders_Var_Samp_Fields = {
  __typename?: 'test_orders_var_samp_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Test_Orders_Variance_Fields = {
  __typename?: 'test_orders_variance_fields'
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  visit_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>
  _gt?: InputMaybe<Scalars['timestamptz']>
  _gte?: InputMaybe<Scalars['timestamptz']>
  _in?: InputMaybe<Array<Scalars['timestamptz']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['timestamptz']>
  _lte?: InputMaybe<Scalars['timestamptz']>
  _neq?: InputMaybe<Scalars['timestamptz']>
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  approved?: Maybe<Scalars['Boolean']>
  auth0_id: Scalars['String']
  created_at?: Maybe<Scalars['timestamptz']>
  credentials?: Maybe<Scalars['String']>
  date_of_birth?: Maybe<Scalars['date']>
  default_location_id?: Maybe<Scalars['Int']>
  do_notifications_enabled?: Maybe<Scalars['Boolean']>
  email: Scalars['String']
  first_name: Scalars['String']
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  last_name: Scalars['String']
  location_id?: Maybe<Scalars['Int']>
  organization_id?: Maybe<Scalars['Int']>
  phone_number: Scalars['String']
  prefix?: Maybe<Scalars['String']>
  program_id?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate'
  aggregate?: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields'
  avg?: Maybe<Users_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Users_Max_Fields>
  min?: Maybe<Users_Min_Fields>
  stddev?: Maybe<Users_Stddev_Fields>
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>
  sum?: Maybe<Users_Sum_Fields>
  var_pop?: Maybe<Users_Var_Pop_Fields>
  var_samp?: Maybe<Users_Var_Samp_Fields>
  variance?: Maybe<Users_Variance_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields'
  default_location_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  program_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>
  _not?: InputMaybe<Users_Bool_Exp>
  _or?: InputMaybe<Array<Users_Bool_Exp>>
  approved?: InputMaybe<Boolean_Comparison_Exp>
  auth0_id?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  credentials?: InputMaybe<String_Comparison_Exp>
  date_of_birth?: InputMaybe<Date_Comparison_Exp>
  default_location_id?: InputMaybe<Int_Comparison_Exp>
  do_notifications_enabled?: InputMaybe<Boolean_Comparison_Exp>
  email?: InputMaybe<String_Comparison_Exp>
  first_name?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  last_name?: InputMaybe<String_Comparison_Exp>
  location_id?: InputMaybe<Int_Comparison_Exp>
  organization_id?: InputMaybe<Int_Comparison_Exp>
  phone_number?: InputMaybe<String_Comparison_Exp>
  prefix?: InputMaybe<String_Comparison_Exp>
  program_id?: InputMaybe<Int_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  default_location_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  location_id?: InputMaybe<Scalars['Int']>
  organization_id?: InputMaybe<Scalars['Int']>
  program_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  approved?: InputMaybe<Scalars['Boolean']>
  auth0_id?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  credentials?: InputMaybe<Scalars['String']>
  date_of_birth?: InputMaybe<Scalars['date']>
  default_location_id?: InputMaybe<Scalars['Int']>
  do_notifications_enabled?: InputMaybe<Scalars['Boolean']>
  email?: InputMaybe<Scalars['String']>
  first_name?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  last_name?: InputMaybe<Scalars['String']>
  location_id?: InputMaybe<Scalars['Int']>
  organization_id?: InputMaybe<Scalars['Int']>
  phone_number?: InputMaybe<Scalars['String']>
  prefix?: InputMaybe<Scalars['String']>
  program_id?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  auth0_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  credentials?: Maybe<Scalars['String']>
  date_of_birth?: Maybe<Scalars['date']>
  default_location_id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  first_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  last_name?: Maybe<Scalars['String']>
  location_id?: Maybe<Scalars['Int']>
  organization_id?: Maybe<Scalars['Int']>
  phone_number?: Maybe<Scalars['String']>
  prefix?: Maybe<Scalars['String']>
  program_id?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  auth0_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  credentials?: Maybe<Scalars['String']>
  date_of_birth?: Maybe<Scalars['date']>
  default_location_id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  first_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  last_name?: Maybe<Scalars['String']>
  location_id?: Maybe<Scalars['Int']>
  organization_id?: Maybe<Scalars['Int']>
  phone_number?: Maybe<Scalars['String']>
  prefix?: Maybe<Scalars['String']>
  program_id?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns?: Array<Users_Update_Column>
  where?: InputMaybe<Users_Bool_Exp>
}

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  approved?: InputMaybe<Order_By>
  auth0_id?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  credentials?: InputMaybe<Order_By>
  date_of_birth?: InputMaybe<Order_By>
  default_location_id?: InputMaybe<Order_By>
  do_notifications_enabled?: InputMaybe<Order_By>
  email?: InputMaybe<Order_By>
  first_name?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  last_name?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  phone_number?: InputMaybe<Order_By>
  prefix?: InputMaybe<Order_By>
  program_id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Approved = 'approved',
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Credentials = 'credentials',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  DefaultLocationId = 'default_location_id',
  /** column name */
  DoNotificationsEnabled = 'do_notifications_enabled',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  Prefix = 'prefix',
  /** column name */
  ProgramId = 'program_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  approved?: InputMaybe<Scalars['Boolean']>
  auth0_id?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  credentials?: InputMaybe<Scalars['String']>
  date_of_birth?: InputMaybe<Scalars['date']>
  default_location_id?: InputMaybe<Scalars['Int']>
  do_notifications_enabled?: InputMaybe<Scalars['Boolean']>
  email?: InputMaybe<Scalars['String']>
  first_name?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  last_name?: InputMaybe<Scalars['String']>
  location_id?: InputMaybe<Scalars['Int']>
  organization_id?: InputMaybe<Scalars['Int']>
  phone_number?: InputMaybe<Scalars['String']>
  prefix?: InputMaybe<Scalars['String']>
  program_id?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields'
  default_location_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  program_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields'
  default_location_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  program_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields'
  default_location_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  program_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields'
  default_location_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  location_id?: Maybe<Scalars['Int']>
  organization_id?: Maybe<Scalars['Int']>
  program_id?: Maybe<Scalars['Int']>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Approved = 'approved',
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Credentials = 'credentials',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  DefaultLocationId = 'default_location_id',
  /** column name */
  DoNotificationsEnabled = 'do_notifications_enabled',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  Prefix = 'prefix',
  /** column name */
  ProgramId = 'program_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields'
  default_location_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  program_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields'
  default_location_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  program_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields'
  default_location_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  program_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "video_calls" */
export type Video_Calls = {
  __typename?: 'video_calls'
  events?: Maybe<Scalars['jsonb']>
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  participants?: Maybe<Scalars['json']>
  /** An object relationship */
  session: Sessions
  session_id: Scalars['Int']
}

/** columns and relationships of "video_calls" */
export type Video_CallsEventsArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "video_calls" */
export type Video_CallsParticipantsArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** aggregated selection of "video_calls" */
export type Video_Calls_Aggregate = {
  __typename?: 'video_calls_aggregate'
  aggregate?: Maybe<Video_Calls_Aggregate_Fields>
  nodes: Array<Video_Calls>
}

/** aggregate fields of "video_calls" */
export type Video_Calls_Aggregate_Fields = {
  __typename?: 'video_calls_aggregate_fields'
  avg?: Maybe<Video_Calls_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Video_Calls_Max_Fields>
  min?: Maybe<Video_Calls_Min_Fields>
  stddev?: Maybe<Video_Calls_Stddev_Fields>
  stddev_pop?: Maybe<Video_Calls_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Video_Calls_Stddev_Samp_Fields>
  sum?: Maybe<Video_Calls_Sum_Fields>
  var_pop?: Maybe<Video_Calls_Var_Pop_Fields>
  var_samp?: Maybe<Video_Calls_Var_Samp_Fields>
  variance?: Maybe<Video_Calls_Variance_Fields>
}

/** aggregate fields of "video_calls" */
export type Video_Calls_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Video_Calls_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Video_Calls_Append_Input = {
  events?: InputMaybe<Scalars['jsonb']>
}

/** aggregate avg on columns */
export type Video_Calls_Avg_Fields = {
  __typename?: 'video_calls_avg_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "video_calls". All fields are combined with a logical 'AND'. */
export type Video_Calls_Bool_Exp = {
  _and?: InputMaybe<Array<Video_Calls_Bool_Exp>>
  _not?: InputMaybe<Video_Calls_Bool_Exp>
  _or?: InputMaybe<Array<Video_Calls_Bool_Exp>>
  events?: InputMaybe<Jsonb_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  participants?: InputMaybe<Json_Comparison_Exp>
  session?: InputMaybe<Sessions_Bool_Exp>
  session_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "video_calls" */
export enum Video_Calls_Constraint {
  /** unique or primary key constraint */
  VideoCallsPkey = 'video_calls_pkey',
  /** unique or primary key constraint */
  VideocallsSessionidUnique = 'videocalls_sessionid_unique',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Video_Calls_Delete_At_Path_Input = {
  events?: InputMaybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Video_Calls_Delete_Elem_Input = {
  events?: InputMaybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Video_Calls_Delete_Key_Input = {
  events?: InputMaybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "video_calls" */
export type Video_Calls_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
  session_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "video_calls" */
export type Video_Calls_Insert_Input = {
  events?: InputMaybe<Scalars['jsonb']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  participants?: InputMaybe<Scalars['json']>
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>
  session_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Video_Calls_Max_Fields = {
  __typename?: 'video_calls_max_fields'
  id?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Video_Calls_Min_Fields = {
  __typename?: 'video_calls_min_fields'
  id?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "video_calls" */
export type Video_Calls_Mutation_Response = {
  __typename?: 'video_calls_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Video_Calls>
}

/** input type for inserting object relation for remote table "video_calls" */
export type Video_Calls_Obj_Rel_Insert_Input = {
  data: Video_Calls_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Video_Calls_On_Conflict>
}

/** on conflict condition type for table "video_calls" */
export type Video_Calls_On_Conflict = {
  constraint: Video_Calls_Constraint
  update_columns?: Array<Video_Calls_Update_Column>
  where?: InputMaybe<Video_Calls_Bool_Exp>
}

/** Ordering options when selecting data from "video_calls". */
export type Video_Calls_Order_By = {
  events?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  participants?: InputMaybe<Order_By>
  session?: InputMaybe<Sessions_Order_By>
  session_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: video_calls */
export type Video_Calls_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Video_Calls_Prepend_Input = {
  events?: InputMaybe<Scalars['jsonb']>
}

/** select columns of table "video_calls" */
export enum Video_Calls_Select_Column {
  /** column name */
  Events = 'events',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Participants = 'participants',
  /** column name */
  SessionId = 'session_id',
}

/** input type for updating data in table "video_calls" */
export type Video_Calls_Set_Input = {
  events?: InputMaybe<Scalars['jsonb']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  participants?: InputMaybe<Scalars['json']>
  session_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Video_Calls_Stddev_Fields = {
  __typename?: 'video_calls_stddev_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Video_Calls_Stddev_Pop_Fields = {
  __typename?: 'video_calls_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Video_Calls_Stddev_Samp_Fields = {
  __typename?: 'video_calls_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Video_Calls_Sum_Fields = {
  __typename?: 'video_calls_sum_fields'
  id?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
}

/** update columns of table "video_calls" */
export enum Video_Calls_Update_Column {
  /** column name */
  Events = 'events',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Participants = 'participants',
  /** column name */
  SessionId = 'session_id',
}

/** aggregate var_pop on columns */
export type Video_Calls_Var_Pop_Fields = {
  __typename?: 'video_calls_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Video_Calls_Var_Samp_Fields = {
  __typename?: 'video_calls_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Video_Calls_Variance_Fields = {
  __typename?: 'video_calls_variance_fields'
  id?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "visits" */
export type Visits = {
  __typename?: 'visits'
  additional_notes?: Maybe<Scalars['String']>
  allergies?: Maybe<Scalars['String']>
  birth_sex?: Maybe<Scalars['String']>
  body_temperature?: Maybe<Scalars['numeric']>
  can_email?: Maybe<Scalars['Boolean']>
  /** An object relationship */
  clearance_note?: Maybe<Clearance_Notes>
  conditions?: Maybe<Scalars['String']>
  consumer_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  date?: Maybe<Scalars['timestamptz']>
  date_of_birth?: Maybe<Scalars['date']>
  date_of_documentation?: Maybe<Scalars['date']>
  date_of_service?: Maybe<Scalars['date']>
  diastolic_pressure?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  /** An object relationship */
  facilitator?: Maybe<Users>
  facilitator_completed: Scalars['Boolean']
  facilitator_id?: Maybe<Scalars['Int']>
  first_name?: Maybe<Scalars['String']>
  /** fetch data from the table: "forms" */
  forms: Array<Forms>
  /** fetch aggregated fields from the table: "forms" */
  forms_aggregate: Forms_Aggregate
  has_uil_printed: Scalars['Boolean']
  id: Scalars['Int']
  is_deleted?: Maybe<Scalars['Boolean']>
  language: Scalars['String']
  last_name?: Maybe<Scalars['String']>
  /** An object relationship */
  location?: Maybe<Locations>
  location_id?: Maybe<Scalars['Int']>
  medications?: Maybe<Scalars['String']>
  /** fetch data from the table: "orders" */
  orders: Array<Orders>
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate
  /** An object relationship */
  organization: Organizations
  organization_id: Scalars['Int']
  patient_id: Scalars['String']
  pharmacy_address?: Maybe<Scalars['String']>
  pharmacy_address2?: Maybe<Scalars['String']>
  pharmacy_city?: Maybe<Scalars['String']>
  pharmacy_latitude?: Maybe<Scalars['numeric']>
  pharmacy_longitude?: Maybe<Scalars['numeric']>
  pharmacy_name?: Maybe<Scalars['String']>
  pharmacy_state?: Maybe<Scalars['String']>
  pharmacy_zipcode?: Maybe<Scalars['String']>
  place_of_service_id?: Maybe<Scalars['Int']>
  /** An object relationship */
  provider?: Maybe<Users>
  provider_completed: Scalars['Boolean']
  provider_id?: Maybe<Scalars['Int']>
  pulse_ox?: Maybe<Scalars['Int']>
  pulse_rate?: Maybe<Scalars['Int']>
  respiration_rate?: Maybe<Scalars['Int']>
  /** An object relationship */
  session?: Maybe<Sessions>
  session_id?: Maybe<Scalars['Int']>
  /** An array relationship */
  session_logs: Array<Session_Logs>
  /** An aggregate relationship */
  session_logs_aggregate: Session_Logs_Aggregate
  /** An object relationship */
  station_visit?: Maybe<Station_Visits>
  status: Scalars['String']
  student_id?: Maybe<Scalars['String']>
  systolic_pressure?: Maybe<Scalars['Int']>
  test_admin_id?: Maybe<Scalars['String']>
  test_scheduler_id?: Maybe<Scalars['String']>
  total_time?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_metadata?: Maybe<Scalars['jsonb']>
  visit_reason: Scalars['String']
  visit_type_id?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
}

/** columns and relationships of "visits" */
export type VisitsFormsArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Forms_Order_By>>
  where?: InputMaybe<Forms_Bool_Exp>
}

/** columns and relationships of "visits" */
export type VisitsForms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Forms_Order_By>>
  where?: InputMaybe<Forms_Bool_Exp>
}

/** columns and relationships of "visits" */
export type VisitsOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Orders_Order_By>>
  where?: InputMaybe<Orders_Bool_Exp>
}

/** columns and relationships of "visits" */
export type VisitsOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Orders_Order_By>>
  where?: InputMaybe<Orders_Bool_Exp>
}

/** columns and relationships of "visits" */
export type VisitsSession_LogsArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

/** columns and relationships of "visits" */
export type VisitsSession_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Logs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Session_Logs_Order_By>>
  where?: InputMaybe<Session_Logs_Bool_Exp>
}

/** columns and relationships of "visits" */
export type VisitsVisit_MetadataArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** aggregated selection of "visits" */
export type Visits_Aggregate = {
  __typename?: 'visits_aggregate'
  aggregate?: Maybe<Visits_Aggregate_Fields>
  nodes: Array<Visits>
}

/** aggregate fields of "visits" */
export type Visits_Aggregate_Fields = {
  __typename?: 'visits_aggregate_fields'
  avg?: Maybe<Visits_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Visits_Max_Fields>
  min?: Maybe<Visits_Min_Fields>
  stddev?: Maybe<Visits_Stddev_Fields>
  stddev_pop?: Maybe<Visits_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Visits_Stddev_Samp_Fields>
  sum?: Maybe<Visits_Sum_Fields>
  var_pop?: Maybe<Visits_Var_Pop_Fields>
  var_samp?: Maybe<Visits_Var_Samp_Fields>
  variance?: Maybe<Visits_Variance_Fields>
}

/** aggregate fields of "visits" */
export type Visits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Visits_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "visits" */
export type Visits_Aggregate_Order_By = {
  avg?: InputMaybe<Visits_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Visits_Max_Order_By>
  min?: InputMaybe<Visits_Min_Order_By>
  stddev?: InputMaybe<Visits_Stddev_Order_By>
  stddev_pop?: InputMaybe<Visits_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Visits_Stddev_Samp_Order_By>
  sum?: InputMaybe<Visits_Sum_Order_By>
  var_pop?: InputMaybe<Visits_Var_Pop_Order_By>
  var_samp?: InputMaybe<Visits_Var_Samp_Order_By>
  variance?: InputMaybe<Visits_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Visits_Append_Input = {
  visit_metadata?: InputMaybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "visits" */
export type Visits_Arr_Rel_Insert_Input = {
  data: Array<Visits_Insert_Input>
  /** on conflict condition */
  on_conflict?: InputMaybe<Visits_On_Conflict>
}

/** aggregate avg on columns */
export type Visits_Avg_Fields = {
  __typename?: 'visits_avg_fields'
  body_temperature?: Maybe<Scalars['Float']>
  diastolic_pressure?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  pharmacy_latitude?: Maybe<Scalars['Float']>
  pharmacy_longitude?: Maybe<Scalars['Float']>
  place_of_service_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  pulse_ox?: Maybe<Scalars['Float']>
  pulse_rate?: Maybe<Scalars['Float']>
  respiration_rate?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  systolic_pressure?: Maybe<Scalars['Float']>
  total_time?: Maybe<Scalars['Float']>
  weight?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "visits" */
export type Visits_Avg_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "visits". All fields are combined with a logical 'AND'. */
export type Visits_Bool_Exp = {
  _and?: InputMaybe<Array<Visits_Bool_Exp>>
  _not?: InputMaybe<Visits_Bool_Exp>
  _or?: InputMaybe<Array<Visits_Bool_Exp>>
  additional_notes?: InputMaybe<String_Comparison_Exp>
  allergies?: InputMaybe<String_Comparison_Exp>
  birth_sex?: InputMaybe<String_Comparison_Exp>
  body_temperature?: InputMaybe<Numeric_Comparison_Exp>
  can_email?: InputMaybe<Boolean_Comparison_Exp>
  clearance_note?: InputMaybe<Clearance_Notes_Bool_Exp>
  conditions?: InputMaybe<String_Comparison_Exp>
  consumer_id?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  date?: InputMaybe<Timestamptz_Comparison_Exp>
  date_of_birth?: InputMaybe<Date_Comparison_Exp>
  date_of_documentation?: InputMaybe<Date_Comparison_Exp>
  date_of_service?: InputMaybe<Date_Comparison_Exp>
  diastolic_pressure?: InputMaybe<Int_Comparison_Exp>
  email?: InputMaybe<String_Comparison_Exp>
  facilitator?: InputMaybe<Users_Bool_Exp>
  facilitator_completed?: InputMaybe<Boolean_Comparison_Exp>
  facilitator_id?: InputMaybe<Int_Comparison_Exp>
  first_name?: InputMaybe<String_Comparison_Exp>
  has_uil_printed?: InputMaybe<Boolean_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>
  language?: InputMaybe<String_Comparison_Exp>
  last_name?: InputMaybe<String_Comparison_Exp>
  location?: InputMaybe<Locations_Bool_Exp>
  location_id?: InputMaybe<Int_Comparison_Exp>
  medications?: InputMaybe<String_Comparison_Exp>
  orders?: InputMaybe<Orders_Bool_Exp>
  organization?: InputMaybe<Organizations_Bool_Exp>
  organization_id?: InputMaybe<Int_Comparison_Exp>
  patient_id?: InputMaybe<String_Comparison_Exp>
  pharmacy_address?: InputMaybe<String_Comparison_Exp>
  pharmacy_address2?: InputMaybe<String_Comparison_Exp>
  pharmacy_city?: InputMaybe<String_Comparison_Exp>
  pharmacy_latitude?: InputMaybe<Numeric_Comparison_Exp>
  pharmacy_longitude?: InputMaybe<Numeric_Comparison_Exp>
  pharmacy_name?: InputMaybe<String_Comparison_Exp>
  pharmacy_state?: InputMaybe<String_Comparison_Exp>
  pharmacy_zipcode?: InputMaybe<String_Comparison_Exp>
  place_of_service_id?: InputMaybe<Int_Comparison_Exp>
  provider?: InputMaybe<Users_Bool_Exp>
  provider_completed?: InputMaybe<Boolean_Comparison_Exp>
  provider_id?: InputMaybe<Int_Comparison_Exp>
  pulse_ox?: InputMaybe<Int_Comparison_Exp>
  pulse_rate?: InputMaybe<Int_Comparison_Exp>
  respiration_rate?: InputMaybe<Int_Comparison_Exp>
  session?: InputMaybe<Sessions_Bool_Exp>
  session_id?: InputMaybe<Int_Comparison_Exp>
  session_logs?: InputMaybe<Session_Logs_Bool_Exp>
  station_visit?: InputMaybe<Station_Visits_Bool_Exp>
  status?: InputMaybe<String_Comparison_Exp>
  student_id?: InputMaybe<String_Comparison_Exp>
  systolic_pressure?: InputMaybe<Int_Comparison_Exp>
  test_admin_id?: InputMaybe<String_Comparison_Exp>
  test_scheduler_id?: InputMaybe<String_Comparison_Exp>
  total_time?: InputMaybe<Int_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  visit_metadata?: InputMaybe<Jsonb_Comparison_Exp>
  visit_reason?: InputMaybe<String_Comparison_Exp>
  visit_type_id?: InputMaybe<String_Comparison_Exp>
  weight?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "visits" */
export enum Visits_Constraint {
  /** unique or primary key constraint */
  VisitsPkey = 'visits_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Visits_Delete_At_Path_Input = {
  visit_metadata?: InputMaybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Visits_Delete_Elem_Input = {
  visit_metadata?: InputMaybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Visits_Delete_Key_Input = {
  visit_metadata?: InputMaybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "visits" */
export type Visits_Inc_Input = {
  body_temperature?: InputMaybe<Scalars['numeric']>
  diastolic_pressure?: InputMaybe<Scalars['Int']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  location_id?: InputMaybe<Scalars['Int']>
  organization_id?: InputMaybe<Scalars['Int']>
  pharmacy_latitude?: InputMaybe<Scalars['numeric']>
  pharmacy_longitude?: InputMaybe<Scalars['numeric']>
  place_of_service_id?: InputMaybe<Scalars['Int']>
  provider_id?: InputMaybe<Scalars['Int']>
  pulse_ox?: InputMaybe<Scalars['Int']>
  pulse_rate?: InputMaybe<Scalars['Int']>
  respiration_rate?: InputMaybe<Scalars['Int']>
  session_id?: InputMaybe<Scalars['Int']>
  systolic_pressure?: InputMaybe<Scalars['Int']>
  total_time?: InputMaybe<Scalars['Int']>
  weight?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "visits" */
export type Visits_Insert_Input = {
  additional_notes?: InputMaybe<Scalars['String']>
  allergies?: InputMaybe<Scalars['String']>
  birth_sex?: InputMaybe<Scalars['String']>
  body_temperature?: InputMaybe<Scalars['numeric']>
  can_email?: InputMaybe<Scalars['Boolean']>
  clearance_note?: InputMaybe<Clearance_Notes_Obj_Rel_Insert_Input>
  conditions?: InputMaybe<Scalars['String']>
  consumer_id?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  date?: InputMaybe<Scalars['timestamptz']>
  date_of_birth?: InputMaybe<Scalars['date']>
  date_of_documentation?: InputMaybe<Scalars['date']>
  date_of_service?: InputMaybe<Scalars['date']>
  diastolic_pressure?: InputMaybe<Scalars['Int']>
  email?: InputMaybe<Scalars['String']>
  facilitator?: InputMaybe<Users_Obj_Rel_Insert_Input>
  facilitator_completed?: InputMaybe<Scalars['Boolean']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  first_name?: InputMaybe<Scalars['String']>
  has_uil_printed?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  language?: InputMaybe<Scalars['String']>
  last_name?: InputMaybe<Scalars['String']>
  location?: InputMaybe<Locations_Obj_Rel_Insert_Input>
  location_id?: InputMaybe<Scalars['Int']>
  medications?: InputMaybe<Scalars['String']>
  orders?: InputMaybe<Orders_Arr_Rel_Insert_Input>
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>
  organization_id?: InputMaybe<Scalars['Int']>
  patient_id?: InputMaybe<Scalars['String']>
  pharmacy_address?: InputMaybe<Scalars['String']>
  pharmacy_address2?: InputMaybe<Scalars['String']>
  pharmacy_city?: InputMaybe<Scalars['String']>
  pharmacy_latitude?: InputMaybe<Scalars['numeric']>
  pharmacy_longitude?: InputMaybe<Scalars['numeric']>
  pharmacy_name?: InputMaybe<Scalars['String']>
  pharmacy_state?: InputMaybe<Scalars['String']>
  pharmacy_zipcode?: InputMaybe<Scalars['String']>
  place_of_service_id?: InputMaybe<Scalars['Int']>
  provider?: InputMaybe<Users_Obj_Rel_Insert_Input>
  provider_completed?: InputMaybe<Scalars['Boolean']>
  provider_id?: InputMaybe<Scalars['Int']>
  pulse_ox?: InputMaybe<Scalars['Int']>
  pulse_rate?: InputMaybe<Scalars['Int']>
  respiration_rate?: InputMaybe<Scalars['Int']>
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>
  session_id?: InputMaybe<Scalars['Int']>
  session_logs?: InputMaybe<Session_Logs_Arr_Rel_Insert_Input>
  station_visit?: InputMaybe<Station_Visits_Obj_Rel_Insert_Input>
  status?: InputMaybe<Scalars['String']>
  student_id?: InputMaybe<Scalars['String']>
  systolic_pressure?: InputMaybe<Scalars['Int']>
  test_admin_id?: InputMaybe<Scalars['String']>
  test_scheduler_id?: InputMaybe<Scalars['String']>
  total_time?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_metadata?: InputMaybe<Scalars['jsonb']>
  visit_reason?: InputMaybe<Scalars['String']>
  visit_type_id?: InputMaybe<Scalars['String']>
  weight?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Visits_Max_Fields = {
  __typename?: 'visits_max_fields'
  additional_notes?: Maybe<Scalars['String']>
  allergies?: Maybe<Scalars['String']>
  birth_sex?: Maybe<Scalars['String']>
  body_temperature?: Maybe<Scalars['numeric']>
  conditions?: Maybe<Scalars['String']>
  consumer_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  date?: Maybe<Scalars['timestamptz']>
  date_of_birth?: Maybe<Scalars['date']>
  date_of_documentation?: Maybe<Scalars['date']>
  date_of_service?: Maybe<Scalars['date']>
  diastolic_pressure?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  facilitator_id?: Maybe<Scalars['Int']>
  first_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  language?: Maybe<Scalars['String']>
  last_name?: Maybe<Scalars['String']>
  location_id?: Maybe<Scalars['Int']>
  medications?: Maybe<Scalars['String']>
  organization_id?: Maybe<Scalars['Int']>
  patient_id?: Maybe<Scalars['String']>
  pharmacy_address?: Maybe<Scalars['String']>
  pharmacy_address2?: Maybe<Scalars['String']>
  pharmacy_city?: Maybe<Scalars['String']>
  pharmacy_latitude?: Maybe<Scalars['numeric']>
  pharmacy_longitude?: Maybe<Scalars['numeric']>
  pharmacy_name?: Maybe<Scalars['String']>
  pharmacy_state?: Maybe<Scalars['String']>
  pharmacy_zipcode?: Maybe<Scalars['String']>
  place_of_service_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  pulse_ox?: Maybe<Scalars['Int']>
  pulse_rate?: Maybe<Scalars['Int']>
  respiration_rate?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  student_id?: Maybe<Scalars['String']>
  systolic_pressure?: Maybe<Scalars['Int']>
  test_admin_id?: Maybe<Scalars['String']>
  test_scheduler_id?: Maybe<Scalars['String']>
  total_time?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_reason?: Maybe<Scalars['String']>
  visit_type_id?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "visits" */
export type Visits_Max_Order_By = {
  additional_notes?: InputMaybe<Order_By>
  allergies?: InputMaybe<Order_By>
  birth_sex?: InputMaybe<Order_By>
  body_temperature?: InputMaybe<Order_By>
  conditions?: InputMaybe<Order_By>
  consumer_id?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  date?: InputMaybe<Order_By>
  date_of_birth?: InputMaybe<Order_By>
  date_of_documentation?: InputMaybe<Order_By>
  date_of_service?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  email?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  first_name?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  language?: InputMaybe<Order_By>
  last_name?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  medications?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  patient_id?: InputMaybe<Order_By>
  pharmacy_address?: InputMaybe<Order_By>
  pharmacy_address2?: InputMaybe<Order_By>
  pharmacy_city?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  pharmacy_name?: InputMaybe<Order_By>
  pharmacy_state?: InputMaybe<Order_By>
  pharmacy_zipcode?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  student_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  test_admin_id?: InputMaybe<Order_By>
  test_scheduler_id?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_reason?: InputMaybe<Order_By>
  visit_type_id?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Visits_Min_Fields = {
  __typename?: 'visits_min_fields'
  additional_notes?: Maybe<Scalars['String']>
  allergies?: Maybe<Scalars['String']>
  birth_sex?: Maybe<Scalars['String']>
  body_temperature?: Maybe<Scalars['numeric']>
  conditions?: Maybe<Scalars['String']>
  consumer_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  date?: Maybe<Scalars['timestamptz']>
  date_of_birth?: Maybe<Scalars['date']>
  date_of_documentation?: Maybe<Scalars['date']>
  date_of_service?: Maybe<Scalars['date']>
  diastolic_pressure?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  facilitator_id?: Maybe<Scalars['Int']>
  first_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  language?: Maybe<Scalars['String']>
  last_name?: Maybe<Scalars['String']>
  location_id?: Maybe<Scalars['Int']>
  medications?: Maybe<Scalars['String']>
  organization_id?: Maybe<Scalars['Int']>
  patient_id?: Maybe<Scalars['String']>
  pharmacy_address?: Maybe<Scalars['String']>
  pharmacy_address2?: Maybe<Scalars['String']>
  pharmacy_city?: Maybe<Scalars['String']>
  pharmacy_latitude?: Maybe<Scalars['numeric']>
  pharmacy_longitude?: Maybe<Scalars['numeric']>
  pharmacy_name?: Maybe<Scalars['String']>
  pharmacy_state?: Maybe<Scalars['String']>
  pharmacy_zipcode?: Maybe<Scalars['String']>
  place_of_service_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  pulse_ox?: Maybe<Scalars['Int']>
  pulse_rate?: Maybe<Scalars['Int']>
  respiration_rate?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  student_id?: Maybe<Scalars['String']>
  systolic_pressure?: Maybe<Scalars['Int']>
  test_admin_id?: Maybe<Scalars['String']>
  test_scheduler_id?: Maybe<Scalars['String']>
  total_time?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamptz']>
  visit_reason?: Maybe<Scalars['String']>
  visit_type_id?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "visits" */
export type Visits_Min_Order_By = {
  additional_notes?: InputMaybe<Order_By>
  allergies?: InputMaybe<Order_By>
  birth_sex?: InputMaybe<Order_By>
  body_temperature?: InputMaybe<Order_By>
  conditions?: InputMaybe<Order_By>
  consumer_id?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  date?: InputMaybe<Order_By>
  date_of_birth?: InputMaybe<Order_By>
  date_of_documentation?: InputMaybe<Order_By>
  date_of_service?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  email?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  first_name?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  language?: InputMaybe<Order_By>
  last_name?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  medications?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  patient_id?: InputMaybe<Order_By>
  pharmacy_address?: InputMaybe<Order_By>
  pharmacy_address2?: InputMaybe<Order_By>
  pharmacy_city?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  pharmacy_name?: InputMaybe<Order_By>
  pharmacy_state?: InputMaybe<Order_By>
  pharmacy_zipcode?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  student_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  test_admin_id?: InputMaybe<Order_By>
  test_scheduler_id?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_reason?: InputMaybe<Order_By>
  visit_type_id?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** response of any mutation on the table "visits" */
export type Visits_Mutation_Response = {
  __typename?: 'visits_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Visits>
}

/** input type for inserting object relation for remote table "visits" */
export type Visits_Obj_Rel_Insert_Input = {
  data: Visits_Insert_Input
  /** on conflict condition */
  on_conflict?: InputMaybe<Visits_On_Conflict>
}

/** on conflict condition type for table "visits" */
export type Visits_On_Conflict = {
  constraint: Visits_Constraint
  update_columns?: Array<Visits_Update_Column>
  where?: InputMaybe<Visits_Bool_Exp>
}

/** Ordering options when selecting data from "visits". */
export type Visits_Order_By = {
  additional_notes?: InputMaybe<Order_By>
  allergies?: InputMaybe<Order_By>
  birth_sex?: InputMaybe<Order_By>
  body_temperature?: InputMaybe<Order_By>
  can_email?: InputMaybe<Order_By>
  clearance_note?: InputMaybe<Clearance_Notes_Order_By>
  conditions?: InputMaybe<Order_By>
  consumer_id?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  date?: InputMaybe<Order_By>
  date_of_birth?: InputMaybe<Order_By>
  date_of_documentation?: InputMaybe<Order_By>
  date_of_service?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  email?: InputMaybe<Order_By>
  facilitator?: InputMaybe<Users_Order_By>
  facilitator_completed?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  first_name?: InputMaybe<Order_By>
  has_uil_printed?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  is_deleted?: InputMaybe<Order_By>
  language?: InputMaybe<Order_By>
  last_name?: InputMaybe<Order_By>
  location?: InputMaybe<Locations_Order_By>
  location_id?: InputMaybe<Order_By>
  medications?: InputMaybe<Order_By>
  orders_aggregate?: InputMaybe<Orders_Aggregate_Order_By>
  organization?: InputMaybe<Organizations_Order_By>
  organization_id?: InputMaybe<Order_By>
  patient_id?: InputMaybe<Order_By>
  pharmacy_address?: InputMaybe<Order_By>
  pharmacy_address2?: InputMaybe<Order_By>
  pharmacy_city?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  pharmacy_name?: InputMaybe<Order_By>
  pharmacy_state?: InputMaybe<Order_By>
  pharmacy_zipcode?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider?: InputMaybe<Users_Order_By>
  provider_completed?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session?: InputMaybe<Sessions_Order_By>
  session_id?: InputMaybe<Order_By>
  session_logs_aggregate?: InputMaybe<Session_Logs_Aggregate_Order_By>
  station_visit?: InputMaybe<Station_Visits_Order_By>
  status?: InputMaybe<Order_By>
  student_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  test_admin_id?: InputMaybe<Order_By>
  test_scheduler_id?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  visit_metadata?: InputMaybe<Order_By>
  visit_reason?: InputMaybe<Order_By>
  visit_type_id?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** primary key columns input for table: visits */
export type Visits_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Visits_Prepend_Input = {
  visit_metadata?: InputMaybe<Scalars['jsonb']>
}

/** select columns of table "visits" */
export enum Visits_Select_Column {
  /** column name */
  AdditionalNotes = 'additional_notes',
  /** column name */
  Allergies = 'allergies',
  /** column name */
  BirthSex = 'birth_sex',
  /** column name */
  BodyTemperature = 'body_temperature',
  /** column name */
  CanEmail = 'can_email',
  /** column name */
  Conditions = 'conditions',
  /** column name */
  ConsumerId = 'consumer_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  DateOfDocumentation = 'date_of_documentation',
  /** column name */
  DateOfService = 'date_of_service',
  /** column name */
  DiastolicPressure = 'diastolic_pressure',
  /** column name */
  Email = 'email',
  /** column name */
  FacilitatorCompleted = 'facilitator_completed',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  HasUilPrinted = 'has_uil_printed',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Language = 'language',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  Medications = 'medications',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  PharmacyAddress = 'pharmacy_address',
  /** column name */
  PharmacyAddress2 = 'pharmacy_address2',
  /** column name */
  PharmacyCity = 'pharmacy_city',
  /** column name */
  PharmacyLatitude = 'pharmacy_latitude',
  /** column name */
  PharmacyLongitude = 'pharmacy_longitude',
  /** column name */
  PharmacyName = 'pharmacy_name',
  /** column name */
  PharmacyState = 'pharmacy_state',
  /** column name */
  PharmacyZipcode = 'pharmacy_zipcode',
  /** column name */
  PlaceOfServiceId = 'place_of_service_id',
  /** column name */
  ProviderCompleted = 'provider_completed',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  PulseOx = 'pulse_ox',
  /** column name */
  PulseRate = 'pulse_rate',
  /** column name */
  RespirationRate = 'respiration_rate',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  SystolicPressure = 'systolic_pressure',
  /** column name */
  TestAdminId = 'test_admin_id',
  /** column name */
  TestSchedulerId = 'test_scheduler_id',
  /** column name */
  TotalTime = 'total_time',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitMetadata = 'visit_metadata',
  /** column name */
  VisitReason = 'visit_reason',
  /** column name */
  VisitTypeId = 'visit_type_id',
  /** column name */
  Weight = 'weight',
}

/** input type for updating data in table "visits" */
export type Visits_Set_Input = {
  additional_notes?: InputMaybe<Scalars['String']>
  allergies?: InputMaybe<Scalars['String']>
  birth_sex?: InputMaybe<Scalars['String']>
  body_temperature?: InputMaybe<Scalars['numeric']>
  can_email?: InputMaybe<Scalars['Boolean']>
  conditions?: InputMaybe<Scalars['String']>
  consumer_id?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  date?: InputMaybe<Scalars['timestamptz']>
  date_of_birth?: InputMaybe<Scalars['date']>
  date_of_documentation?: InputMaybe<Scalars['date']>
  date_of_service?: InputMaybe<Scalars['date']>
  diastolic_pressure?: InputMaybe<Scalars['Int']>
  email?: InputMaybe<Scalars['String']>
  facilitator_completed?: InputMaybe<Scalars['Boolean']>
  facilitator_id?: InputMaybe<Scalars['Int']>
  first_name?: InputMaybe<Scalars['String']>
  has_uil_printed?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['Int']>
  is_deleted?: InputMaybe<Scalars['Boolean']>
  language?: InputMaybe<Scalars['String']>
  last_name?: InputMaybe<Scalars['String']>
  location_id?: InputMaybe<Scalars['Int']>
  medications?: InputMaybe<Scalars['String']>
  organization_id?: InputMaybe<Scalars['Int']>
  patient_id?: InputMaybe<Scalars['String']>
  pharmacy_address?: InputMaybe<Scalars['String']>
  pharmacy_address2?: InputMaybe<Scalars['String']>
  pharmacy_city?: InputMaybe<Scalars['String']>
  pharmacy_latitude?: InputMaybe<Scalars['numeric']>
  pharmacy_longitude?: InputMaybe<Scalars['numeric']>
  pharmacy_name?: InputMaybe<Scalars['String']>
  pharmacy_state?: InputMaybe<Scalars['String']>
  pharmacy_zipcode?: InputMaybe<Scalars['String']>
  place_of_service_id?: InputMaybe<Scalars['Int']>
  provider_completed?: InputMaybe<Scalars['Boolean']>
  provider_id?: InputMaybe<Scalars['Int']>
  pulse_ox?: InputMaybe<Scalars['Int']>
  pulse_rate?: InputMaybe<Scalars['Int']>
  respiration_rate?: InputMaybe<Scalars['Int']>
  session_id?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<Scalars['String']>
  student_id?: InputMaybe<Scalars['String']>
  systolic_pressure?: InputMaybe<Scalars['Int']>
  test_admin_id?: InputMaybe<Scalars['String']>
  test_scheduler_id?: InputMaybe<Scalars['String']>
  total_time?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  visit_metadata?: InputMaybe<Scalars['jsonb']>
  visit_reason?: InputMaybe<Scalars['String']>
  visit_type_id?: InputMaybe<Scalars['String']>
  weight?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Visits_Stddev_Fields = {
  __typename?: 'visits_stddev_fields'
  body_temperature?: Maybe<Scalars['Float']>
  diastolic_pressure?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  pharmacy_latitude?: Maybe<Scalars['Float']>
  pharmacy_longitude?: Maybe<Scalars['Float']>
  place_of_service_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  pulse_ox?: Maybe<Scalars['Float']>
  pulse_rate?: Maybe<Scalars['Float']>
  respiration_rate?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  systolic_pressure?: Maybe<Scalars['Float']>
  total_time?: Maybe<Scalars['Float']>
  weight?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "visits" */
export type Visits_Stddev_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Visits_Stddev_Pop_Fields = {
  __typename?: 'visits_stddev_pop_fields'
  body_temperature?: Maybe<Scalars['Float']>
  diastolic_pressure?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  pharmacy_latitude?: Maybe<Scalars['Float']>
  pharmacy_longitude?: Maybe<Scalars['Float']>
  place_of_service_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  pulse_ox?: Maybe<Scalars['Float']>
  pulse_rate?: Maybe<Scalars['Float']>
  respiration_rate?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  systolic_pressure?: Maybe<Scalars['Float']>
  total_time?: Maybe<Scalars['Float']>
  weight?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "visits" */
export type Visits_Stddev_Pop_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Visits_Stddev_Samp_Fields = {
  __typename?: 'visits_stddev_samp_fields'
  body_temperature?: Maybe<Scalars['Float']>
  diastolic_pressure?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  pharmacy_latitude?: Maybe<Scalars['Float']>
  pharmacy_longitude?: Maybe<Scalars['Float']>
  place_of_service_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  pulse_ox?: Maybe<Scalars['Float']>
  pulse_rate?: Maybe<Scalars['Float']>
  respiration_rate?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  systolic_pressure?: Maybe<Scalars['Float']>
  total_time?: Maybe<Scalars['Float']>
  weight?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "visits" */
export type Visits_Stddev_Samp_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type Visits_Sum_Fields = {
  __typename?: 'visits_sum_fields'
  body_temperature?: Maybe<Scalars['numeric']>
  diastolic_pressure?: Maybe<Scalars['Int']>
  facilitator_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  location_id?: Maybe<Scalars['Int']>
  organization_id?: Maybe<Scalars['Int']>
  pharmacy_latitude?: Maybe<Scalars['numeric']>
  pharmacy_longitude?: Maybe<Scalars['numeric']>
  place_of_service_id?: Maybe<Scalars['Int']>
  provider_id?: Maybe<Scalars['Int']>
  pulse_ox?: Maybe<Scalars['Int']>
  pulse_rate?: Maybe<Scalars['Int']>
  respiration_rate?: Maybe<Scalars['Int']>
  session_id?: Maybe<Scalars['Int']>
  systolic_pressure?: Maybe<Scalars['Int']>
  total_time?: Maybe<Scalars['Int']>
  weight?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "visits" */
export type Visits_Sum_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** update columns of table "visits" */
export enum Visits_Update_Column {
  /** column name */
  AdditionalNotes = 'additional_notes',
  /** column name */
  Allergies = 'allergies',
  /** column name */
  BirthSex = 'birth_sex',
  /** column name */
  BodyTemperature = 'body_temperature',
  /** column name */
  CanEmail = 'can_email',
  /** column name */
  Conditions = 'conditions',
  /** column name */
  ConsumerId = 'consumer_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  DateOfDocumentation = 'date_of_documentation',
  /** column name */
  DateOfService = 'date_of_service',
  /** column name */
  DiastolicPressure = 'diastolic_pressure',
  /** column name */
  Email = 'email',
  /** column name */
  FacilitatorCompleted = 'facilitator_completed',
  /** column name */
  FacilitatorId = 'facilitator_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  HasUilPrinted = 'has_uil_printed',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Language = 'language',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  Medications = 'medications',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  PharmacyAddress = 'pharmacy_address',
  /** column name */
  PharmacyAddress2 = 'pharmacy_address2',
  /** column name */
  PharmacyCity = 'pharmacy_city',
  /** column name */
  PharmacyLatitude = 'pharmacy_latitude',
  /** column name */
  PharmacyLongitude = 'pharmacy_longitude',
  /** column name */
  PharmacyName = 'pharmacy_name',
  /** column name */
  PharmacyState = 'pharmacy_state',
  /** column name */
  PharmacyZipcode = 'pharmacy_zipcode',
  /** column name */
  PlaceOfServiceId = 'place_of_service_id',
  /** column name */
  ProviderCompleted = 'provider_completed',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  PulseOx = 'pulse_ox',
  /** column name */
  PulseRate = 'pulse_rate',
  /** column name */
  RespirationRate = 'respiration_rate',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  SystolicPressure = 'systolic_pressure',
  /** column name */
  TestAdminId = 'test_admin_id',
  /** column name */
  TestSchedulerId = 'test_scheduler_id',
  /** column name */
  TotalTime = 'total_time',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitMetadata = 'visit_metadata',
  /** column name */
  VisitReason = 'visit_reason',
  /** column name */
  VisitTypeId = 'visit_type_id',
  /** column name */
  Weight = 'weight',
}

/** aggregate var_pop on columns */
export type Visits_Var_Pop_Fields = {
  __typename?: 'visits_var_pop_fields'
  body_temperature?: Maybe<Scalars['Float']>
  diastolic_pressure?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  pharmacy_latitude?: Maybe<Scalars['Float']>
  pharmacy_longitude?: Maybe<Scalars['Float']>
  place_of_service_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  pulse_ox?: Maybe<Scalars['Float']>
  pulse_rate?: Maybe<Scalars['Float']>
  respiration_rate?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  systolic_pressure?: Maybe<Scalars['Float']>
  total_time?: Maybe<Scalars['Float']>
  weight?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "visits" */
export type Visits_Var_Pop_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Visits_Var_Samp_Fields = {
  __typename?: 'visits_var_samp_fields'
  body_temperature?: Maybe<Scalars['Float']>
  diastolic_pressure?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  pharmacy_latitude?: Maybe<Scalars['Float']>
  pharmacy_longitude?: Maybe<Scalars['Float']>
  place_of_service_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  pulse_ox?: Maybe<Scalars['Float']>
  pulse_rate?: Maybe<Scalars['Float']>
  respiration_rate?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  systolic_pressure?: Maybe<Scalars['Float']>
  total_time?: Maybe<Scalars['Float']>
  weight?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "visits" */
export type Visits_Var_Samp_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Visits_Variance_Fields = {
  __typename?: 'visits_variance_fields'
  body_temperature?: Maybe<Scalars['Float']>
  diastolic_pressure?: Maybe<Scalars['Float']>
  facilitator_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  location_id?: Maybe<Scalars['Float']>
  organization_id?: Maybe<Scalars['Float']>
  pharmacy_latitude?: Maybe<Scalars['Float']>
  pharmacy_longitude?: Maybe<Scalars['Float']>
  place_of_service_id?: Maybe<Scalars['Float']>
  provider_id?: Maybe<Scalars['Float']>
  pulse_ox?: Maybe<Scalars['Float']>
  pulse_rate?: Maybe<Scalars['Float']>
  respiration_rate?: Maybe<Scalars['Float']>
  session_id?: Maybe<Scalars['Float']>
  systolic_pressure?: Maybe<Scalars['Float']>
  total_time?: Maybe<Scalars['Float']>
  weight?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "visits" */
export type Visits_Variance_Order_By = {
  body_temperature?: InputMaybe<Order_By>
  diastolic_pressure?: InputMaybe<Order_By>
  facilitator_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  location_id?: InputMaybe<Order_By>
  organization_id?: InputMaybe<Order_By>
  pharmacy_latitude?: InputMaybe<Order_By>
  pharmacy_longitude?: InputMaybe<Order_By>
  place_of_service_id?: InputMaybe<Order_By>
  provider_id?: InputMaybe<Order_By>
  pulse_ox?: InputMaybe<Order_By>
  pulse_rate?: InputMaybe<Order_By>
  respiration_rate?: InputMaybe<Order_By>
  session_id?: InputMaybe<Order_By>
  systolic_pressure?: InputMaybe<Order_By>
  total_time?: InputMaybe<Order_By>
  weight?: InputMaybe<Order_By>
}

export type CreateWcpVisitsMutationVariables = Exact<{
  input: Array<Visits_Insert_Input> | Visits_Insert_Input
}>

export type CreateWcpVisitsMutation = {
  __typename?: 'mutation_root'
  insert_visits?: {
    __typename?: 'visits_mutation_response'
    returning: Array<{ __typename?: 'visits'; id: number }>
  } | null
}

export type SessionStationsQueryVariables = Exact<{
  session_id: Scalars['Int']
}>

export type SessionStationsQuery = {
  __typename?: 'query_root'
  sessions_by_pk?: {
    __typename?: 'sessions'
    stations: Array<{
      __typename?: 'stations'
      id: number
      title: string
      code: string
    }>
  } | null
}

export type SessionStationsVisitsQueryVariables = Exact<{
  session_id: Scalars['Int']
}>

export type SessionStationsVisitsQuery = {
  __typename?: 'query_root'
  sessions: Array<{
    __typename?: 'sessions'
    id: number
    name?: string | null
    stations: Array<{
      __typename?: 'stations'
      id: number
      position: number
      title: string
      code: string
      visit_action_name?: string | null
      order_types: Array<{
        __typename?: 'order_type'
        id: number
        position: number
        form_type_id?: string | null
      }>
      station_visits: Array<{
        __typename?: 'station_visits'
        visit: {
          __typename?: 'visits'
          last_name?: string | null
          first_name?: string | null
          date_of_birth?: any | null
          id: number
          student_id?: string | null
          patient_id: string
          has_uil_printed: boolean
        }
      }>
    }>
  }>
}

export type StationVisitsQueryVariables = Exact<{
  station_id: Scalars['Int']
}>

export type StationVisitsQuery = {
  __typename?: 'query_root'
  station_visits: Array<{
    __typename?: 'station_visits'
    visit: {
      __typename?: 'visits'
      last_name?: string | null
      first_name?: string | null
      date_of_birth?: any | null
      id: number
      student_id?: string | null
    }
  }>
}

export type StationVisitsSubscriptionSubscriptionVariables = Exact<{
  station_id: Scalars['Int']
}>

export type StationVisitsSubscriptionSubscription = {
  __typename?: 'subscription_root'
  station_visits: Array<{
    __typename?: 'station_visits'
    visit: {
      __typename?: 'visits'
      last_name?: string | null
      first_name?: string | null
      date_of_birth?: any | null
      id: number
      student_id?: string | null
      patient_id: string
      has_uil_printed: boolean
    }
  }>
}

export type UpdateVisitStationMutationVariables = Exact<{
  visitId: Scalars['Int']
  oldStationId: Scalars['Int']
  newStationId: Scalars['Int']
}>

export type UpdateVisitStationMutation = {
  __typename?: 'mutation_root'
  update_station_visits?: {
    __typename?: 'station_visits_mutation_response'
    returning: Array<{
      __typename?: 'station_visits'
      station_id: number
      visit_id: number
    }>
  } | null
}

export type VisitOrdersQueryVariables = Exact<{
  visit_id: Scalars['Int']
}>

export type VisitOrdersQuery = {
  __typename?: 'query_root'
  visits: Array<{
    __typename?: 'visits'
    orders: Array<{ __typename?: 'orders'; status: string }>
  }>
}

export type VisitsSubscriptionSubscriptionVariables = Exact<{
  state?: InputMaybe<String_Comparison_Exp>
  language?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  status?: InputMaybe<String_Comparison_Exp>
  visit_metadata?: InputMaybe<Jsonb_Comparison_Exp>
  name_search?: InputMaybe<Array<Visits_Bool_Exp> | Visits_Bool_Exp>
}>

export type VisitsSubscriptionSubscription = {
  __typename?: 'subscription_root'
  visits: Array<{
    __typename?: 'visits'
    id: number
    language: string
    status: string
    firstName?: string | null
    lastName?: string | null
    dateOfBirth?: any | null
    createdAt?: any | null
    visitReason: string
    patientId: string
    placeOfServiceId?: number | null
    location?: { __typename?: 'locations'; id: number; name: string } | null
    organization: {
      __typename?: 'organizations'
      id: number
      name: string
      state: string
    }
  }>
}

export type CompleteOrderFormMutationVariables = Exact<{
  orderId: Scalars['Int']
  orderParams?: InputMaybe<Orders_Set_Input>
}>

export type CompleteOrderFormMutation = {
  __typename?: 'mutation_root'
  update_orders?: {
    __typename?: 'orders_mutation_response'
    returning: Array<{ __typename?: 'orders'; id: number }>
  } | null
}

export type CompleteOrderHeightAndWeightMutationVariables = Exact<{
  orderId: Scalars['Int']
  height_ft?: InputMaybe<Scalars['Int']>
  height_in?: InputMaybe<Scalars['Float']>
  pressure_diastolic?: InputMaybe<Scalars['Int']>
  pressure_systolic?: InputMaybe<Scalars['Int']>
  pulse_bpm?: InputMaybe<Scalars['Int']>
  weight_lbs?: InputMaybe<Scalars['Int']>
  bmi?: InputMaybe<Scalars['Float']>
  bmi_percentile?: InputMaybe<Scalars['Int']>
  date_of_birth?: InputMaybe<Scalars['date']>
  birth_sex?: InputMaybe<Scalars['String']>
  orderParams?: InputMaybe<Orders_Set_Input>
}>

export type CompleteOrderHeightAndWeightMutation = {
  __typename?: 'mutation_root'
  update_orders?: {
    __typename?: 'orders_mutation_response'
    returning: Array<{ __typename?: 'orders'; id: number }>
  } | null
  update_order_height_and_weight?: {
    __typename?: 'order_height_and_weight_mutation_response'
    returning: Array<{ __typename?: 'order_height_and_weight'; id: number }>
  } | null
}

export type CompleteOrderMedicalAssessmentMutationVariables = Exact<{
  orderId: Scalars['Int']
  abdomen?: InputMaybe<Scalars['String']>
  abdomen_notes?: InputMaybe<Scalars['String']>
  appearance?: InputMaybe<Scalars['String']>
  appearance_notes?: InputMaybe<Scalars['String']>
  eyes_ears_nose_throat?: InputMaybe<Scalars['String']>
  eyes_ears_nose_throat_notes?: InputMaybe<Scalars['String']>
  heart_auscultation_standing_position?: InputMaybe<Scalars['String']>
  heart_auscultation_standing_position_notes?: InputMaybe<Scalars['String']>
  heart_auscultation_supine_position?: InputMaybe<Scalars['String']>
  heart_auscultation_supine_position_notes?: InputMaybe<Scalars['String']>
  heart_lower_pulses?: InputMaybe<Scalars['String']>
  heart_lower_pulses_notes?: InputMaybe<Scalars['String']>
  lungs?: InputMaybe<Scalars['String']>
  lungs_notes?: InputMaybe<Scalars['String']>
  lymph_nodes?: InputMaybe<Scalars['String']>
  lymph_nodes_notes?: InputMaybe<Scalars['String']>
  marfans_stigmata?: InputMaybe<Scalars['String']>
  marfans_stigmata_notes?: InputMaybe<Scalars['String']>
  pulses?: InputMaybe<Scalars['String']>
  pulses_notes?: InputMaybe<Scalars['String']>
  is_pupils_equal?: InputMaybe<Scalars['Boolean']>
  skin?: InputMaybe<Scalars['String']>
  skin_notes?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  orderParams?: InputMaybe<Orders_Set_Input>
}>

export type CompleteOrderMedicalAssessmentMutation = {
  __typename?: 'mutation_root'
  update_orders?: {
    __typename?: 'orders_mutation_response'
    returning: Array<{ __typename?: 'orders'; id: number }>
  } | null
  update_order_medical_assessment?: {
    __typename?: 'order_medical_assessment_mutation_response'
    returning: Array<{ __typename?: 'order_medical_assessment'; id: number }>
  } | null
}

export type CompleteOrderMusculoskeletalMutationVariables = Exact<{
  orderId: Scalars['Int']
  neck?: InputMaybe<Scalars['String']>
  neck_notes?: InputMaybe<Scalars['String']>
  back?: InputMaybe<Scalars['String']>
  back_notes?: InputMaybe<Scalars['String']>
  shoulder_or_arm?: InputMaybe<Scalars['String']>
  shoulder_or_arm_notes?: InputMaybe<Scalars['String']>
  elbow_or_forearm?: InputMaybe<Scalars['String']>
  elbow_or_forearm_notes?: InputMaybe<Scalars['String']>
  wrist_or_hand?: InputMaybe<Scalars['String']>
  wrist_or_hand_notes?: InputMaybe<Scalars['String']>
  hip_or_thigh?: InputMaybe<Scalars['String']>
  hip_or_thigh_notes?: InputMaybe<Scalars['String']>
  knee?: InputMaybe<Scalars['String']>
  knee_notes?: InputMaybe<Scalars['String']>
  leg_or_ankle?: InputMaybe<Scalars['String']>
  leg_or_ankle_notes?: InputMaybe<Scalars['String']>
  foot?: InputMaybe<Scalars['String']>
  foot_notes?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  orderParams?: InputMaybe<Orders_Set_Input>
}>

export type CompleteOrderMusculoskeletalMutation = {
  __typename?: 'mutation_root'
  update_orders?: {
    __typename?: 'orders_mutation_response'
    returning: Array<{ __typename?: 'orders'; id: number }>
  } | null
  update_order_musculoskeletal?: {
    __typename?: 'order_musculoskeletal_mutation_response'
    returning: Array<{ __typename?: 'order_musculoskeletal'; id: number }>
  } | null
}

export type CompleteOrderVisionMutationVariables = Exact<{
  orderId: Scalars['Int']
  vision_left?: InputMaybe<Scalars['Int']>
  vision_right?: InputMaybe<Scalars['Int']>
  is_vision_corrected?: InputMaybe<Scalars['Boolean']>
  orderParams?: InputMaybe<Orders_Set_Input>
}>

export type CompleteOrderVisionMutation = {
  __typename?: 'mutation_root'
  update_orders?: {
    __typename?: 'orders_mutation_response'
    returning: Array<{ __typename?: 'orders'; id: number }>
  } | null
  update_order_vision?: {
    __typename?: 'order_vision_mutation_response'
    returning: Array<{ __typename?: 'order_vision'; id: number }>
  } | null
}

export type GetOrderByPkQueryVariables = Exact<{
  order_id: Scalars['Int']
}>

export type GetOrderByPkQuery = {
  __typename?: 'query_root'
  orders_by_pk?: {
    __typename?: 'orders'
    id: number
    status: string
    is_flagged: boolean
    visit: {
      __typename?: 'visits'
      first_name?: string | null
      last_name?: string | null
    }
    order_height_and_weight?: {
      __typename?: 'order_height_and_weight'
      height_ft?: number | null
      weight_lbs?: number | null
      pulse_bpm?: number | null
      pressure_systolic?: number | null
      pressure_diastolic?: number | null
      id: number
      height_in?: number | null
      bmi?: number | null
      bmi_percentile?: number | null
      date_of_birth?: any | null
      birth_sex?: string | null
      updated_at?: any | null
    } | null
    order_musculoskeletal?: {
      __typename?: 'order_musculoskeletal'
      back?: string | null
      back_notes?: string | null
      elbow_or_forearm?: string | null
      elbow_or_forearm_notes?: string | null
      foot?: string | null
      foot_notes?: string | null
      hip_or_thigh?: string | null
      hip_or_thigh_notes?: string | null
      id: number
      knee?: string | null
      knee_notes?: string | null
      leg_or_ankle?: string | null
      leg_or_ankle_notes?: string | null
      neck?: string | null
      neck_notes?: string | null
      shoulder_or_arm?: string | null
      shoulder_or_arm_notes?: string | null
      wrist_or_hand?: string | null
      wrist_or_hand_notes?: string | null
      signature?: string | null
      updated_at?: any | null
    } | null
    order_medical_assessment?: {
      __typename?: 'order_medical_assessment'
      abdomen?: string | null
      abdomen_notes?: string | null
      appearance?: string | null
      appearance_notes?: string | null
      eyes_ears_nose_throat?: string | null
      eyes_ears_nose_throat_notes?: string | null
      heart_auscultation_standing_position?: string | null
      heart_auscultation_standing_position_notes?: string | null
      heart_auscultation_supine_position?: string | null
      heart_auscultation_supine_position_notes?: string | null
      heart_lower_pulses?: string | null
      heart_lower_pulses_notes?: string | null
      id: number
      is_pupils_equal?: boolean | null
      lungs?: string | null
      lungs_notes?: string | null
      lymph_nodes?: string | null
      lymph_nodes_notes?: string | null
      marfans_stigmata?: string | null
      marfans_stigmata_notes?: string | null
      pulses?: string | null
      pulses_notes?: string | null
      skin?: string | null
      skin_notes?: string | null
      signature?: string | null
      updated_at?: any | null
    } | null
    order_vision?: {
      __typename?: 'order_vision'
      vision_right?: number | null
      vision_left?: number | null
      id: number
      is_vision_corrected?: boolean | null
      updated_at?: any | null
    } | null
  } | null
}

export type GetOrderFormQueryVariables = Exact<{
  visit_id?: InputMaybe<Scalars['Int']>
  code?: InputMaybe<Scalars['String']>
  patient_id?: InputMaybe<Scalars['String']>
  form_type?: InputMaybe<Scalars['String']>
  language?: InputMaybe<Scalars['String']>
}>

export type GetOrderFormQuery = {
  __typename?: 'query_root'
  orders: Array<{
    __typename?: 'orders'
    id: number
    status: string
    order_type?: {
      __typename?: 'order_type'
      form_type_id?: string | null
    } | null
  }>
  forms: Array<{ __typename?: 'forms'; data: any }>
  form_types: Array<{
    __typename?: 'form_types'
    schema: any
    ui_schema?: any | null
  }>
  form_localizations: Array<{
    __typename?: 'form_localizations'
    dictionary: any
  }>
}

export type GetOrderFormResultsQueryVariables = Exact<{
  order_id: Scalars['Int']
  patient_id: Scalars['String']
  form_type: Scalars['String']
  language?: InputMaybe<Scalars['String']>
}>

export type GetOrderFormResultsQuery = {
  __typename?: 'query_root'
  orders_by_pk?: {
    __typename?: 'orders'
    id: number
    status: string
    is_flagged: boolean
  } | null
  form?: { __typename?: 'forms'; data: any; updated_at: any } | null
  form_types: Array<{
    __typename?: 'form_types'
    schema: any
    ui_schema?: any | null
  }>
  form_localizations: Array<{
    __typename?: 'form_localizations'
    dictionary: any
  }>
}

export type GetOrderHeightAndWeightQueryVariables = Exact<{
  visit_id: Scalars['Int']
  code: Scalars['String']
}>

export type GetOrderHeightAndWeightQuery = {
  __typename?: 'query_root'
  orders: Array<{
    __typename?: 'orders'
    id: number
    status: string
    visit: {
      __typename?: 'visits'
      first_name?: string | null
      last_name?: string | null
      date_of_birth?: any | null
      birth_sex?: string | null
    }
    order_height_and_weight?: {
      __typename?: 'order_height_and_weight'
      height_ft?: number | null
      height_in?: number | null
      weight_lbs?: number | null
      pulse_bpm?: number | null
      pressure_systolic?: number | null
      pressure_diastolic?: number | null
      bmi?: number | null
      bmi_percentile?: number | null
      date_of_birth?: any | null
      birth_sex?: string | null
    } | null
  }>
}

export type GetOrderMedicalAssessmentQueryVariables = Exact<{
  visit_id: Scalars['Int']
  code: Scalars['String']
}>

export type GetOrderMedicalAssessmentQuery = {
  __typename?: 'query_root'
  orders: Array<{
    __typename?: 'orders'
    id: number
    status: string
    visit: {
      __typename?: 'visits'
      first_name?: string | null
      last_name?: string | null
    }
    order_medical_assessment?: {
      __typename?: 'order_medical_assessment'
      abdomen?: string | null
      abdomen_notes?: string | null
      appearance?: string | null
      appearance_notes?: string | null
      eyes_ears_nose_throat?: string | null
      eyes_ears_nose_throat_notes?: string | null
      heart_auscultation_standing_position?: string | null
      heart_auscultation_standing_position_notes?: string | null
      heart_auscultation_supine_position?: string | null
      heart_auscultation_supine_position_notes?: string | null
      heart_lower_pulses?: string | null
      heart_lower_pulses_notes?: string | null
      lungs?: string | null
      lungs_notes?: string | null
      lymph_nodes?: string | null
      lymph_nodes_notes?: string | null
      marfans_stigmata?: string | null
      marfans_stigmata_notes?: string | null
      pulses?: string | null
      pulses_notes?: string | null
      is_pupils_equal?: boolean | null
      skin?: string | null
      skin_notes?: string | null
      signature?: string | null
    } | null
  }>
}

export type GetOrderMusculoskeletalQueryVariables = Exact<{
  visit_id: Scalars['Int']
  code: Scalars['String']
}>

export type GetOrderMusculoskeletalQuery = {
  __typename?: 'query_root'
  orders: Array<{
    __typename?: 'orders'
    id: number
    status: string
    visit: {
      __typename?: 'visits'
      first_name?: string | null
      last_name?: string | null
    }
    order_musculoskeletal?: {
      __typename?: 'order_musculoskeletal'
      neck?: string | null
      neck_notes?: string | null
      back?: string | null
      back_notes?: string | null
      shoulder_or_arm?: string | null
      shoulder_or_arm_notes?: string | null
      elbow_or_forearm?: string | null
      elbow_or_forearm_notes?: string | null
      wrist_or_hand?: string | null
      wrist_or_hand_notes?: string | null
      hip_or_thigh?: string | null
      hip_or_thigh_notes?: string | null
      knee?: string | null
      knee_notes?: string | null
      leg_or_ankle?: string | null
      leg_or_ankle_notes?: string | null
      foot?: string | null
      foot_notes?: string | null
      signature?: string | null
    } | null
  }>
}

export type GetOrderVisionQueryVariables = Exact<{
  visit_id: Scalars['Int']
  code: Scalars['String']
}>

export type GetOrderVisionQuery = {
  __typename?: 'query_root'
  orders: Array<{
    __typename?: 'orders'
    id: number
    status: string
    visit: {
      __typename?: 'visits'
      first_name?: string | null
      last_name?: string | null
    }
    order_vision?: {
      __typename?: 'order_vision'
      vision_left?: number | null
      vision_right?: number | null
      is_vision_corrected?: boolean | null
    } | null
  }>
}

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never }>

export type GetOrganizationsQuery = {
  __typename?: 'query_root'
  organizations: Array<{
    __typename?: 'organizations'
    id: number
    name: string
    slug?: string | null
  }>
}

export type GetPatientFormTypesQueryVariables = Exact<{
  patientId: Scalars['String']
}>

export type GetPatientFormTypesQuery = {
  __typename?: 'query_root'
  forms: Array<{
    __typename?: 'forms'
    form_type: { __typename?: 'form_types'; id: string }
  }>
}

export type GetPatientFormsQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String']
}>

export type GetPatientFormsQuery = {
  __typename?: 'query_root'
  forms: Array<{ __typename?: 'forms'; type: string; patient_id: string }>
}

export type GetPatientFormsDataQueryVariables = Exact<{
  patientId: Scalars['String']
  on_registration: Scalars['Boolean']
}>

export type GetPatientFormsDataQuery = {
  __typename?: 'query_root'
  forms: Array<{
    __typename?: 'forms'
    data: any
    form_type: {
      __typename?: 'form_types'
      id: string
      schema: any
      ui_schema?: any | null
      form_localizations: Array<{
        __typename?: 'form_localizations'
        locale: string
        dictionary: any
      }>
    }
  }>
  form_images: Array<{ __typename?: 'form_images'; type: string; url: string }>
}

export type GetSessionPatientsQueryVariables = Exact<{
  session_id: Scalars['Int']
}>

export type GetSessionPatientsQuery = {
  __typename?: 'query_root'
  sessions_by_pk?: {
    __typename?: 'sessions'
    visits: Array<{ __typename?: 'visits'; patient_id: string }>
  } | null
}

export type GetVisitQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type GetVisitQuery = {
  __typename?: 'query_root'
  visits_by_pk?: {
    __typename?: 'visits'
    allergies?: string | null
    pharmacy_address?: string | null
    pharmacy_address2?: string | null
    pharmacy_city?: string | null
    pharmacy_name?: string | null
    status: string
    dateOfBirth?: any | null
    firstName?: string | null
    lastName?: string | null
    knownMedications?: string | null
    patientId: string
    primaryLanguage: string
    visitReason: string
    createdAt?: any | null
    knownConditions?: string | null
    sessionId?: number | null
    additionalNotes?: string | null
    stationVisits?: { __typename?: 'station_visits'; stationId: number } | null
    session?: {
      __typename?: 'sessions'
      stations: Array<{ __typename?: 'stations'; id: number }>
    } | null
    location?: { __typename?: 'locations'; name: string } | null
    orders: Array<{
      __typename?: 'orders'
      status: string
      id: number
      completed_at?: any | null
      follow_up_instructions?: string | null
      is_flagged: boolean
      orderType?: {
        __typename?: 'order_type'
        category: string
        name: string
        form_type_id?: string | null
      } | null
    }>
  } | null
}

export type InsertClearanceNoteMutationVariables = Exact<{
  input: Clearance_Notes_Insert_Input
}>

export type InsertClearanceNoteMutation = {
  __typename?: 'mutation_root'
  insert_clearance_notes_one?: {
    __typename?: 'clearance_notes'
    id: number
  } | null
}

export type InsertFormImagesMutationVariables = Exact<{
  patientId: Scalars['String']
  formId: Scalars['String']
}>

export type InsertFormImagesMutation = {
  __typename?: 'mutation_root'
  insert_form_images_one: { __typename?: 'form_images_insert'; url: string }
}

export type InsertOrderFormMutationVariables = Exact<{
  orderId?: InputMaybe<Scalars['Int']>
  patient_id?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['jsonb']>
  orderParams?: InputMaybe<Orders_Set_Input>
}>

export type InsertOrderFormMutation = {
  __typename?: 'mutation_root'
  update_orders?: {
    __typename?: 'orders_mutation_response'
    returning: Array<{ __typename?: 'orders'; id: number }>
  } | null
  insert_forms_one?: {
    __typename?: 'forms'
    patient_id: string
    type: string
  } | null
}

export type InsertWcpSessionMutationVariables = Exact<{ [key: string]: never }>

export type InsertWcpSessionMutation = {
  __typename?: 'mutation_root'
  insert_sessions_one?: { __typename?: 'sessions'; id: number } | null
}

export type UpdateOrderFollowUpInstructionsMutationVariables = Exact<{
  id: Scalars['Int']
  instructions: Scalars['String']
}>

export type UpdateOrderFollowUpInstructionsMutation = {
  __typename?: 'mutation_root'
  update_orders_by_pk?: { __typename?: 'orders'; id: number } | null
}

export type UpdateVisitMutationVariables = Exact<{
  visitId: Scalars['Int']
  objects?: InputMaybe<Visits_Set_Input>
}>

export type UpdateVisitMutation = {
  __typename?: 'mutation_root'
  update_visits_by_pk?: { __typename?: 'visits'; id: number } | null
}

export const CreateWcpVisitsDocument = `
    mutation createWcpVisits($input: [visits_insert_input!]!) {
  insert_visits(objects: $input) {
    returning {
      id
    }
  }
}
    `
export const useCreateWcpVisitsMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CreateWcpVisitsMutation,
    TError,
    CreateWcpVisitsMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateWcpVisitsMutation,
    TError,
    CreateWcpVisitsMutationVariables,
    TContext
  >(
    ['createWcpVisits'],
    useFetch<CreateWcpVisitsMutation, CreateWcpVisitsMutationVariables>(
      CreateWcpVisitsDocument
    ),
    options
  )
export const SessionStationsDocument = `
    query SessionStations($session_id: Int!) {
  sessions_by_pk(id: $session_id) {
    stations(order_by: {position: asc}) {
      id
      title
      code
    }
  }
}
    `
export const useSessionStationsQuery = <
  TData = SessionStationsQuery,
  TError = unknown
>(
  variables: SessionStationsQueryVariables,
  options?: UseQueryOptions<SessionStationsQuery, TError, TData>
) =>
  useQuery<SessionStationsQuery, TError, TData>(
    ['SessionStations', variables],
    useFetch<SessionStationsQuery, SessionStationsQueryVariables>(
      SessionStationsDocument
    ).bind(null, variables),
    options
  )
export const SessionStationsVisitsDocument = `
    query SessionStationsVisits($session_id: Int!) {
  sessions(where: {id: {_eq: $session_id}}) {
    stations(order_by: {position: asc}) {
      id
      position
      title
      code
      order_types(order_by: {position: asc}) {
        id
        position
        form_type_id
      }
      visit_action_name
      station_visits {
        visit {
          last_name
          first_name
          date_of_birth
          id
          student_id
          patient_id
          has_uil_printed
        }
      }
    }
    id
    name
  }
}
    `
export const useSessionStationsVisitsQuery = <
  TData = SessionStationsVisitsQuery,
  TError = unknown
>(
  variables: SessionStationsVisitsQueryVariables,
  options?: UseQueryOptions<SessionStationsVisitsQuery, TError, TData>
) =>
  useQuery<SessionStationsVisitsQuery, TError, TData>(
    ['SessionStationsVisits', variables],
    useFetch<SessionStationsVisitsQuery, SessionStationsVisitsQueryVariables>(
      SessionStationsVisitsDocument
    ).bind(null, variables),
    options
  )
export const StationVisitsDocument = `
    query StationVisits($station_id: Int!) {
  station_visits(where: {station_id: {_eq: $station_id}}) {
    visit {
      last_name
      first_name
      date_of_birth
      id
      student_id
    }
  }
}
    `
export const useStationVisitsQuery = <
  TData = StationVisitsQuery,
  TError = unknown
>(
  variables: StationVisitsQueryVariables,
  options?: UseQueryOptions<StationVisitsQuery, TError, TData>
) =>
  useQuery<StationVisitsQuery, TError, TData>(
    ['StationVisits', variables],
    useFetch<StationVisitsQuery, StationVisitsQueryVariables>(
      StationVisitsDocument
    ).bind(null, variables),
    options
  )
export const StationVisitsSubscriptionDocument = `
    subscription StationVisitsSubscription($station_id: Int!) {
  station_visits(where: {station_id: {_eq: $station_id}}) {
    visit {
      last_name
      first_name
      date_of_birth
      id
      student_id
      patient_id
      has_uil_printed
    }
  }
}
    `
export const UpdateVisitStationDocument = `
    mutation updateVisitStation($visitId: Int!, $oldStationId: Int!, $newStationId: Int!) {
  update_station_visits(
    _set: {station_id: $newStationId}
    where: {visit_id: {_eq: $visitId}, _and: {station_id: {_eq: $oldStationId}}}
  ) {
    returning {
      station_id
      visit_id
    }
  }
}
    `
export const useUpdateVisitStationMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    UpdateVisitStationMutation,
    TError,
    UpdateVisitStationMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateVisitStationMutation,
    TError,
    UpdateVisitStationMutationVariables,
    TContext
  >(
    ['updateVisitStation'],
    useFetch<UpdateVisitStationMutation, UpdateVisitStationMutationVariables>(
      UpdateVisitStationDocument
    ),
    options
  )
export const VisitOrdersDocument = `
    query VisitOrders($visit_id: Int!) {
  visits(where: {id: {_eq: $visit_id}}) {
    orders {
      status
    }
  }
}
    `
export const useVisitOrdersQuery = <TData = VisitOrdersQuery, TError = unknown>(
  variables: VisitOrdersQueryVariables,
  options?: UseQueryOptions<VisitOrdersQuery, TError, TData>
) =>
  useQuery<VisitOrdersQuery, TError, TData>(
    ['VisitOrders', variables],
    useFetch<VisitOrdersQuery, VisitOrdersQueryVariables>(
      VisitOrdersDocument
    ).bind(null, variables),
    options
  )
export const VisitsSubscriptionDocument = `
    subscription VisitsSubscription($state: String_comparison_exp = {}, $language: String_comparison_exp = {}, $created_at: timestamptz_comparison_exp = {}, $status: String_comparison_exp = {}, $visit_metadata: jsonb_comparison_exp = {}, $name_search: [visits_bool_exp!] = {}) {
  visits(
    where: {language: $language, organization: {state: $state}, created_at: $created_at, status: $status, visit_metadata: $visit_metadata, _or: $name_search, session_id: {_is_null: false}, location: {id: {_is_null: false}}}
    order_by: {updated_at: desc}
  ) {
    id
    firstName: first_name
    lastName: last_name
    dateOfBirth: date_of_birth
    location {
      id
      name
    }
    organization {
      id
      name
      state
    }
    language
    createdAt: created_at
    visitReason: visit_reason
    patientId: patient_id
    status
    placeOfServiceId: place_of_service_id
  }
}
    `
export const CompleteOrderFormDocument = `
    mutation completeOrderForm($orderId: Int!, $orderParams: orders_set_input = {status: "Complete"}) {
  update_orders(where: {id: {_eq: $orderId}}, _set: $orderParams) {
    returning {
      id
    }
  }
}
    `
export const useCompleteOrderFormMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CompleteOrderFormMutation,
    TError,
    CompleteOrderFormMutationVariables,
    TContext
  >
) =>
  useMutation<
    CompleteOrderFormMutation,
    TError,
    CompleteOrderFormMutationVariables,
    TContext
  >(
    ['completeOrderForm'],
    useFetch<CompleteOrderFormMutation, CompleteOrderFormMutationVariables>(
      CompleteOrderFormDocument
    ),
    options
  )
export const CompleteOrderHeightAndWeightDocument = `
    mutation completeOrderHeightAndWeight($orderId: Int!, $height_ft: Int, $height_in: Float, $pressure_diastolic: Int, $pressure_systolic: Int, $pulse_bpm: Int, $weight_lbs: Int, $bmi: Float, $bmi_percentile: Int, $date_of_birth: date, $birth_sex: String, $orderParams: orders_set_input = {status: "Complete"}) {
  update_orders(where: {id: {_eq: $orderId}}, _set: $orderParams) {
    returning {
      id
    }
  }
  update_order_height_and_weight(
    where: {order_id: {_eq: $orderId}}
    _set: {height_ft: $height_ft, height_in: $height_in, pressure_diastolic: $pressure_diastolic, pressure_systolic: $pressure_systolic, pulse_bpm: $pulse_bpm, weight_lbs: $weight_lbs, bmi: $bmi, bmi_percentile: $bmi_percentile, date_of_birth: $date_of_birth, birth_sex: $birth_sex}
  ) {
    returning {
      id
    }
  }
}
    `
export const useCompleteOrderHeightAndWeightMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CompleteOrderHeightAndWeightMutation,
    TError,
    CompleteOrderHeightAndWeightMutationVariables,
    TContext
  >
) =>
  useMutation<
    CompleteOrderHeightAndWeightMutation,
    TError,
    CompleteOrderHeightAndWeightMutationVariables,
    TContext
  >(
    ['completeOrderHeightAndWeight'],
    useFetch<
      CompleteOrderHeightAndWeightMutation,
      CompleteOrderHeightAndWeightMutationVariables
    >(CompleteOrderHeightAndWeightDocument),
    options
  )
export const CompleteOrderMedicalAssessmentDocument = `
    mutation completeOrderMedicalAssessment($orderId: Int!, $abdomen: String, $abdomen_notes: String, $appearance: String, $appearance_notes: String, $eyes_ears_nose_throat: String, $eyes_ears_nose_throat_notes: String, $heart_auscultation_standing_position: String, $heart_auscultation_standing_position_notes: String, $heart_auscultation_supine_position: String, $heart_auscultation_supine_position_notes: String, $heart_lower_pulses: String, $heart_lower_pulses_notes: String, $lungs: String, $lungs_notes: String, $lymph_nodes: String, $lymph_nodes_notes: String, $marfans_stigmata: String, $marfans_stigmata_notes: String, $pulses: String, $pulses_notes: String, $is_pupils_equal: Boolean, $skin: String, $skin_notes: String, $signature: String, $orderParams: orders_set_input = {status: "Complete"}) {
  update_orders(where: {id: {_eq: $orderId}}, _set: $orderParams) {
    returning {
      id
    }
  }
  update_order_medical_assessment(
    where: {order_id: {_eq: $orderId}}
    _set: {abdomen: $abdomen, abdomen_notes: $abdomen_notes, appearance: $appearance, appearance_notes: $appearance_notes, eyes_ears_nose_throat: $eyes_ears_nose_throat, eyes_ears_nose_throat_notes: $eyes_ears_nose_throat_notes, heart_auscultation_standing_position: $heart_auscultation_standing_position, heart_auscultation_standing_position_notes: $heart_auscultation_standing_position_notes, heart_auscultation_supine_position: $heart_auscultation_supine_position, heart_auscultation_supine_position_notes: $heart_auscultation_supine_position_notes, heart_lower_pulses: $heart_lower_pulses, heart_lower_pulses_notes: $heart_lower_pulses_notes, lungs: $lungs, lungs_notes: $lungs_notes, lymph_nodes: $lymph_nodes, lymph_nodes_notes: $lymph_nodes_notes, marfans_stigmata: $marfans_stigmata, marfans_stigmata_notes: $marfans_stigmata_notes, pulses: $pulses, pulses_notes: $pulses_notes, is_pupils_equal: $is_pupils_equal, skin: $skin, skin_notes: $skin_notes, signature: $signature}
  ) {
    returning {
      id
    }
  }
}
    `
export const useCompleteOrderMedicalAssessmentMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CompleteOrderMedicalAssessmentMutation,
    TError,
    CompleteOrderMedicalAssessmentMutationVariables,
    TContext
  >
) =>
  useMutation<
    CompleteOrderMedicalAssessmentMutation,
    TError,
    CompleteOrderMedicalAssessmentMutationVariables,
    TContext
  >(
    ['completeOrderMedicalAssessment'],
    useFetch<
      CompleteOrderMedicalAssessmentMutation,
      CompleteOrderMedicalAssessmentMutationVariables
    >(CompleteOrderMedicalAssessmentDocument),
    options
  )
export const CompleteOrderMusculoskeletalDocument = `
    mutation completeOrderMusculoskeletal($orderId: Int!, $neck: String, $neck_notes: String, $back: String, $back_notes: String, $shoulder_or_arm: String, $shoulder_or_arm_notes: String, $elbow_or_forearm: String, $elbow_or_forearm_notes: String, $wrist_or_hand: String, $wrist_or_hand_notes: String, $hip_or_thigh: String, $hip_or_thigh_notes: String, $knee: String, $knee_notes: String, $leg_or_ankle: String, $leg_or_ankle_notes: String, $foot: String, $foot_notes: String, $signature: String, $orderParams: orders_set_input = {status: "Complete"}) {
  update_orders(where: {id: {_eq: $orderId}}, _set: $orderParams) {
    returning {
      id
    }
  }
  update_order_musculoskeletal(
    where: {order_id: {_eq: $orderId}}
    _set: {neck: $neck, neck_notes: $neck_notes, back: $back, back_notes: $back_notes, shoulder_or_arm: $shoulder_or_arm, shoulder_or_arm_notes: $shoulder_or_arm_notes, elbow_or_forearm: $elbow_or_forearm, elbow_or_forearm_notes: $elbow_or_forearm_notes, wrist_or_hand: $wrist_or_hand, wrist_or_hand_notes: $wrist_or_hand_notes, hip_or_thigh: $hip_or_thigh, hip_or_thigh_notes: $hip_or_thigh_notes, knee: $knee, knee_notes: $knee_notes, leg_or_ankle: $leg_or_ankle, leg_or_ankle_notes: $leg_or_ankle_notes, foot: $foot, foot_notes: $foot_notes, signature: $signature}
  ) {
    returning {
      id
    }
  }
}
    `
export const useCompleteOrderMusculoskeletalMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CompleteOrderMusculoskeletalMutation,
    TError,
    CompleteOrderMusculoskeletalMutationVariables,
    TContext
  >
) =>
  useMutation<
    CompleteOrderMusculoskeletalMutation,
    TError,
    CompleteOrderMusculoskeletalMutationVariables,
    TContext
  >(
    ['completeOrderMusculoskeletal'],
    useFetch<
      CompleteOrderMusculoskeletalMutation,
      CompleteOrderMusculoskeletalMutationVariables
    >(CompleteOrderMusculoskeletalDocument),
    options
  )
export const CompleteOrderVisionDocument = `
    mutation completeOrderVision($orderId: Int!, $vision_left: Int, $vision_right: Int, $is_vision_corrected: Boolean, $orderParams: orders_set_input = {status: "Complete"}) {
  update_orders(where: {id: {_eq: $orderId}}, _set: $orderParams) {
    returning {
      id
    }
  }
  update_order_vision(
    where: {order_id: {_eq: $orderId}}
    _set: {vision_left: $vision_left, vision_right: $vision_right, is_vision_corrected: $is_vision_corrected}
  ) {
    returning {
      id
    }
  }
}
    `
export const useCompleteOrderVisionMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CompleteOrderVisionMutation,
    TError,
    CompleteOrderVisionMutationVariables,
    TContext
  >
) =>
  useMutation<
    CompleteOrderVisionMutation,
    TError,
    CompleteOrderVisionMutationVariables,
    TContext
  >(
    ['completeOrderVision'],
    useFetch<CompleteOrderVisionMutation, CompleteOrderVisionMutationVariables>(
      CompleteOrderVisionDocument
    ),
    options
  )
export const GetOrderByPkDocument = `
    query getOrderByPk($order_id: Int!) {
  orders_by_pk(id: $order_id) {
    id
    status
    is_flagged
    visit {
      first_name
      last_name
    }
    order_height_and_weight {
      height_ft
      weight_lbs
      pulse_bpm
      pressure_systolic
      pressure_diastolic
      id
      height_in
      bmi
      bmi_percentile
      date_of_birth
      birth_sex
      updated_at
    }
    order_musculoskeletal {
      back
      back_notes
      elbow_or_forearm
      elbow_or_forearm_notes
      foot
      foot_notes
      hip_or_thigh
      hip_or_thigh_notes
      id
      knee
      knee_notes
      leg_or_ankle
      leg_or_ankle_notes
      neck
      neck_notes
      shoulder_or_arm
      shoulder_or_arm_notes
      wrist_or_hand
      wrist_or_hand_notes
      signature
      updated_at
    }
    order_medical_assessment {
      abdomen
      abdomen_notes
      appearance
      appearance_notes
      eyes_ears_nose_throat
      eyes_ears_nose_throat_notes
      heart_auscultation_standing_position
      heart_auscultation_standing_position_notes
      heart_auscultation_supine_position
      heart_auscultation_supine_position_notes
      heart_lower_pulses
      heart_lower_pulses_notes
      id
      is_pupils_equal
      lungs
      lungs_notes
      lymph_nodes
      lymph_nodes_notes
      marfans_stigmata
      marfans_stigmata_notes
      pulses
      pulses_notes
      skin
      skin_notes
      signature
      updated_at
    }
    order_vision {
      vision_right
      vision_left
      id
      is_vision_corrected
      updated_at
    }
  }
}
    `
export const useGetOrderByPkQuery = <
  TData = GetOrderByPkQuery,
  TError = unknown
>(
  variables: GetOrderByPkQueryVariables,
  options?: UseQueryOptions<GetOrderByPkQuery, TError, TData>
) =>
  useQuery<GetOrderByPkQuery, TError, TData>(
    ['getOrderByPk', variables],
    useFetch<GetOrderByPkQuery, GetOrderByPkQueryVariables>(
      GetOrderByPkDocument
    ).bind(null, variables),
    options
  )
export const GetOrderFormDocument = `
    query getOrderForm($visit_id: Int, $code: String, $patient_id: String = "", $form_type: String = "", $language: String = "en") {
  orders(
    where: {visit_id: {_eq: $visit_id}, _and: {order_type: {category: {_eq: $code}}}}
  ) {
    id
    status
    order_type {
      form_type_id
    }
  }
  forms(where: {patient_id: {_eq: $patient_id}, type: {_eq: $form_type}}) {
    data
  }
  form_types(where: {id: {_eq: $form_type}}) {
    schema
    ui_schema
  }
  form_localizations(where: {type: {_eq: $form_type}, locale: {_eq: $language}}) {
    dictionary
  }
}
    `
export const useGetOrderFormQuery = <
  TData = GetOrderFormQuery,
  TError = unknown
>(
  variables?: GetOrderFormQueryVariables,
  options?: UseQueryOptions<GetOrderFormQuery, TError, TData>
) =>
  useQuery<GetOrderFormQuery, TError, TData>(
    variables === undefined ? ['getOrderForm'] : ['getOrderForm', variables],
    useFetch<GetOrderFormQuery, GetOrderFormQueryVariables>(
      GetOrderFormDocument
    ).bind(null, variables),
    options
  )
export const GetOrderFormResultsDocument = `
    query getOrderFormResults($order_id: Int!, $patient_id: String!, $form_type: String!, $language: String = "en") {
  orders_by_pk(id: $order_id) {
    id
    status
    is_flagged
  }
  form: forms_by_pk(patient_id: $patient_id, type: $form_type) {
    data(path: "$.[0]")
    updated_at
  }
  form_types(where: {id: {_eq: $form_type}}) {
    schema
    ui_schema
  }
  form_localizations(where: {type: {_eq: $form_type}, locale: {_eq: $language}}) {
    dictionary
  }
}
    `
export const useGetOrderFormResultsQuery = <
  TData = GetOrderFormResultsQuery,
  TError = unknown
>(
  variables: GetOrderFormResultsQueryVariables,
  options?: UseQueryOptions<GetOrderFormResultsQuery, TError, TData>
) =>
  useQuery<GetOrderFormResultsQuery, TError, TData>(
    ['getOrderFormResults', variables],
    useFetch<GetOrderFormResultsQuery, GetOrderFormResultsQueryVariables>(
      GetOrderFormResultsDocument
    ).bind(null, variables),
    options
  )
export const GetOrderHeightAndWeightDocument = `
    query getOrderHeightAndWeight($visit_id: Int!, $code: String!) {
  orders(
    where: {visit_id: {_eq: $visit_id}, _and: {order_type: {category: {_eq: $code}}}}
  ) {
    id
    visit {
      first_name
      last_name
      date_of_birth
      birth_sex
    }
    order_height_and_weight {
      height_ft
      height_in
      weight_lbs
      pulse_bpm
      pressure_systolic
      pressure_diastolic
      bmi
      bmi_percentile
      date_of_birth
      birth_sex
    }
    status
  }
}
    `
export const useGetOrderHeightAndWeightQuery = <
  TData = GetOrderHeightAndWeightQuery,
  TError = unknown
>(
  variables: GetOrderHeightAndWeightQueryVariables,
  options?: UseQueryOptions<GetOrderHeightAndWeightQuery, TError, TData>
) =>
  useQuery<GetOrderHeightAndWeightQuery, TError, TData>(
    ['getOrderHeightAndWeight', variables],
    useFetch<
      GetOrderHeightAndWeightQuery,
      GetOrderHeightAndWeightQueryVariables
    >(GetOrderHeightAndWeightDocument).bind(null, variables),
    options
  )
export const GetOrderMedicalAssessmentDocument = `
    query getOrderMedicalAssessment($visit_id: Int!, $code: String!) {
  orders(
    where: {visit_id: {_eq: $visit_id}, _and: {order_type: {category: {_eq: $code}}}}
  ) {
    id
    visit {
      first_name
      last_name
    }
    order_medical_assessment {
      abdomen
      abdomen_notes
      appearance
      appearance_notes
      eyes_ears_nose_throat
      eyes_ears_nose_throat_notes
      heart_auscultation_standing_position
      heart_auscultation_standing_position_notes
      heart_auscultation_supine_position
      heart_auscultation_supine_position_notes
      heart_lower_pulses
      heart_lower_pulses_notes
      lungs
      lungs_notes
      lymph_nodes
      lymph_nodes_notes
      marfans_stigmata
      marfans_stigmata_notes
      pulses
      pulses_notes
      is_pupils_equal
      skin
      skin_notes
      signature
    }
    status
  }
}
    `
export const useGetOrderMedicalAssessmentQuery = <
  TData = GetOrderMedicalAssessmentQuery,
  TError = unknown
>(
  variables: GetOrderMedicalAssessmentQueryVariables,
  options?: UseQueryOptions<GetOrderMedicalAssessmentQuery, TError, TData>
) =>
  useQuery<GetOrderMedicalAssessmentQuery, TError, TData>(
    ['getOrderMedicalAssessment', variables],
    useFetch<
      GetOrderMedicalAssessmentQuery,
      GetOrderMedicalAssessmentQueryVariables
    >(GetOrderMedicalAssessmentDocument).bind(null, variables),
    options
  )
export const GetOrderMusculoskeletalDocument = `
    query getOrderMusculoskeletal($visit_id: Int!, $code: String!) {
  orders(
    where: {visit_id: {_eq: $visit_id}, _and: {order_type: {category: {_eq: $code}}}}
  ) {
    id
    visit {
      first_name
      last_name
    }
    order_musculoskeletal {
      neck
      neck_notes
      back
      back_notes
      shoulder_or_arm
      shoulder_or_arm_notes
      elbow_or_forearm
      elbow_or_forearm_notes
      wrist_or_hand
      wrist_or_hand_notes
      hip_or_thigh
      hip_or_thigh_notes
      knee
      knee_notes
      leg_or_ankle
      leg_or_ankle_notes
      foot
      foot_notes
      signature
    }
    status
  }
}
    `
export const useGetOrderMusculoskeletalQuery = <
  TData = GetOrderMusculoskeletalQuery,
  TError = unknown
>(
  variables: GetOrderMusculoskeletalQueryVariables,
  options?: UseQueryOptions<GetOrderMusculoskeletalQuery, TError, TData>
) =>
  useQuery<GetOrderMusculoskeletalQuery, TError, TData>(
    ['getOrderMusculoskeletal', variables],
    useFetch<
      GetOrderMusculoskeletalQuery,
      GetOrderMusculoskeletalQueryVariables
    >(GetOrderMusculoskeletalDocument).bind(null, variables),
    options
  )
export const GetOrderVisionDocument = `
    query getOrderVision($visit_id: Int!, $code: String!) {
  orders(
    where: {visit_id: {_eq: $visit_id}, _and: {order_type: {category: {_eq: $code}}}}
  ) {
    id
    visit {
      first_name
      last_name
    }
    order_vision {
      vision_left
      vision_right
      is_vision_corrected
    }
    status
  }
}
    `
export const useGetOrderVisionQuery = <
  TData = GetOrderVisionQuery,
  TError = unknown
>(
  variables: GetOrderVisionQueryVariables,
  options?: UseQueryOptions<GetOrderVisionQuery, TError, TData>
) =>
  useQuery<GetOrderVisionQuery, TError, TData>(
    ['getOrderVision', variables],
    useFetch<GetOrderVisionQuery, GetOrderVisionQueryVariables>(
      GetOrderVisionDocument
    ).bind(null, variables),
    options
  )
export const GetOrganizationsDocument = `
    query getOrganizations {
  organizations {
    id
    name
    slug
  }
}
    `
export const useGetOrganizationsQuery = <
  TData = GetOrganizationsQuery,
  TError = unknown
>(
  variables?: GetOrganizationsQueryVariables,
  options?: UseQueryOptions<GetOrganizationsQuery, TError, TData>
) =>
  useQuery<GetOrganizationsQuery, TError, TData>(
    variables === undefined
      ? ['getOrganizations']
      : ['getOrganizations', variables],
    useFetch<GetOrganizationsQuery, GetOrganizationsQueryVariables>(
      GetOrganizationsDocument
    ).bind(null, variables),
    options
  )
export const GetPatientFormTypesDocument = `
    query getPatientFormTypes($patientId: String!) {
  forms(where: {patient_id: {_eq: $patientId}}) {
    form_type {
      id
    }
  }
}
    `
export const useGetPatientFormTypesQuery = <
  TData = GetPatientFormTypesQuery,
  TError = unknown
>(
  variables: GetPatientFormTypesQueryVariables,
  options?: UseQueryOptions<GetPatientFormTypesQuery, TError, TData>
) =>
  useQuery<GetPatientFormTypesQuery, TError, TData>(
    ['getPatientFormTypes', variables],
    useFetch<GetPatientFormTypesQuery, GetPatientFormTypesQueryVariables>(
      GetPatientFormTypesDocument
    ).bind(null, variables),
    options
  )
export const GetPatientFormsDocument = `
    query getPatientForms($ids: [String!]!) {
  forms(
    where: {_and: {patient_id: {_in: $ids}, form_type: {on_registration: {_eq: true}}}}
  ) {
    type
    patient_id
  }
}
    `
export const useGetPatientFormsQuery = <
  TData = GetPatientFormsQuery,
  TError = unknown
>(
  variables: GetPatientFormsQueryVariables,
  options?: UseQueryOptions<GetPatientFormsQuery, TError, TData>
) =>
  useQuery<GetPatientFormsQuery, TError, TData>(
    ['getPatientForms', variables],
    useFetch<GetPatientFormsQuery, GetPatientFormsQueryVariables>(
      GetPatientFormsDocument
    ).bind(null, variables),
    options
  )
export const GetPatientFormsDataDocument = `
    query getPatientFormsData($patientId: String!, $on_registration: Boolean!) {
  forms(
    where: {_and: {patient_id: {_eq: $patientId}, form_type: {on_registration: {_eq: $on_registration}}}}
  ) {
    data
    form_type {
      id
      schema
      ui_schema
      form_localizations {
        locale
        dictionary
      }
    }
  }
  form_images(patient_id: $patientId) {
    type
    url
  }
}
    `
export const useGetPatientFormsDataQuery = <
  TData = GetPatientFormsDataQuery,
  TError = unknown
>(
  variables: GetPatientFormsDataQueryVariables,
  options?: UseQueryOptions<GetPatientFormsDataQuery, TError, TData>
) =>
  useQuery<GetPatientFormsDataQuery, TError, TData>(
    ['getPatientFormsData', variables],
    useFetch<GetPatientFormsDataQuery, GetPatientFormsDataQueryVariables>(
      GetPatientFormsDataDocument
    ).bind(null, variables),
    options
  )
export const GetSessionPatientsDocument = `
    query getSessionPatients($session_id: Int!) {
  sessions_by_pk(id: $session_id) {
    visits {
      patient_id
    }
  }
}
    `
export const useGetSessionPatientsQuery = <
  TData = GetSessionPatientsQuery,
  TError = unknown
>(
  variables: GetSessionPatientsQueryVariables,
  options?: UseQueryOptions<GetSessionPatientsQuery, TError, TData>
) =>
  useQuery<GetSessionPatientsQuery, TError, TData>(
    ['getSessionPatients', variables],
    useFetch<GetSessionPatientsQuery, GetSessionPatientsQueryVariables>(
      GetSessionPatientsDocument
    ).bind(null, variables),
    options
  )
export const GetVisitDocument = `
    query getVisit($id: Int!) {
  visits_by_pk(id: $id) {
    allergies
    dateOfBirth: date_of_birth
    firstName: first_name
    lastName: last_name
    knownMedications: medications
    patientId: patient_id
    primaryLanguage: language
    pharmacy_address
    pharmacy_address2
    pharmacy_city
    pharmacy_name
    visitReason: visit_reason
    status
    createdAt: created_at
    knownConditions: conditions
    sessionId: session_id
    additionalNotes: additional_notes
    stationVisits: station_visit {
      stationId: station_id
    }
    session {
      stations(order_by: {position: asc}) {
        id
      }
    }
    location {
      name
    }
    orders {
      status
      id
      orderType: order_type {
        category
        name
        form_type_id
      }
      completed_at
      follow_up_instructions
      is_flagged
    }
  }
}
    `
export const useGetVisitQuery = <TData = GetVisitQuery, TError = unknown>(
  variables: GetVisitQueryVariables,
  options?: UseQueryOptions<GetVisitQuery, TError, TData>
) =>
  useQuery<GetVisitQuery, TError, TData>(
    ['getVisit', variables],
    useFetch<GetVisitQuery, GetVisitQueryVariables>(GetVisitDocument).bind(
      null,
      variables
    ),
    options
  )
export const InsertClearanceNoteDocument = `
    mutation insertClearanceNote($input: clearance_notes_insert_input!) {
  insert_clearance_notes_one(object: $input) {
    id
  }
}
    `
export const useInsertClearanceNoteMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    InsertClearanceNoteMutation,
    TError,
    InsertClearanceNoteMutationVariables,
    TContext
  >
) =>
  useMutation<
    InsertClearanceNoteMutation,
    TError,
    InsertClearanceNoteMutationVariables,
    TContext
  >(
    ['insertClearanceNote'],
    useFetch<InsertClearanceNoteMutation, InsertClearanceNoteMutationVariables>(
      InsertClearanceNoteDocument
    ),
    options
  )
export const InsertFormImagesDocument = `
    mutation insertFormImages($patientId: String!, $formId: String!) {
  insert_form_images_one(patient_id: $patientId, form_id: $formId) {
    url
  }
}
    `
export const useInsertFormImagesMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    InsertFormImagesMutation,
    TError,
    InsertFormImagesMutationVariables,
    TContext
  >
) =>
  useMutation<
    InsertFormImagesMutation,
    TError,
    InsertFormImagesMutationVariables,
    TContext
  >(
    ['insertFormImages'],
    useFetch<InsertFormImagesMutation, InsertFormImagesMutationVariables>(
      InsertFormImagesDocument
    ),
    options
  )
export const InsertOrderFormDocument = `
    mutation insertOrderForm($orderId: Int, $patient_id: String, $type: String, $data: jsonb = [], $orderParams: orders_set_input = {status: "Complete"}) {
  update_orders(where: {id: {_eq: $orderId}}, _set: $orderParams) {
    returning {
      id
    }
  }
  insert_forms_one(
    object: {patient_id: $patient_id, type: $type, data: $data}
    on_conflict: {constraint: forms_pkey, update_columns: data}
  ) {
    patient_id
    type
  }
}
    `
export const useInsertOrderFormMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    InsertOrderFormMutation,
    TError,
    InsertOrderFormMutationVariables,
    TContext
  >
) =>
  useMutation<
    InsertOrderFormMutation,
    TError,
    InsertOrderFormMutationVariables,
    TContext
  >(
    ['insertOrderForm'],
    useFetch<InsertOrderFormMutation, InsertOrderFormMutationVariables>(
      InsertOrderFormDocument
    ),
    options
  )
export const InsertWcpSessionDocument = `
    mutation insertWCPSession {
  insert_sessions_one(
    object: {name: "WCP Test", session_type: "wcp", stations: {data: [{title: "Registration", visit_action_name: "Upload Paperwork", code: "registration", position: 1}, {title: "Height & Weight", visit_action_name: "Add Results", code: "height_and_weight", position: 2}, {title: "Vision", visit_action_name: "Add Results", code: "vision", position: 3}, {title: "Musculoskeletal", visit_action_name: "Add Results", code: "musculoskeletal", position: 4}, {title: "Medical Assessment", visit_action_name: "Add Results", code: "medical_assessment", position: 5}, {title: "Screenings", visit_action_name: "Add Results", code: "screenings", position: 6}, {title: "Checkout", visit_action_name: "View Visit", code: "checkout", position: 7}, {title: "Complete", visit_action_name: "View Visit", code: "complete", position: 8}]}}
  ) {
    id
  }
}
    `
export const useInsertWcpSessionMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    InsertWcpSessionMutation,
    TError,
    InsertWcpSessionMutationVariables,
    TContext
  >
) =>
  useMutation<
    InsertWcpSessionMutation,
    TError,
    InsertWcpSessionMutationVariables,
    TContext
  >(
    ['insertWCPSession'],
    useFetch<InsertWcpSessionMutation, InsertWcpSessionMutationVariables>(
      InsertWcpSessionDocument
    ),
    options
  )
export const UpdateOrderFollowUpInstructionsDocument = `
    mutation updateOrderFollowUpInstructions($id: Int!, $instructions: String!) {
  update_orders_by_pk(
    pk_columns: {id: $id}
    _set: {follow_up_instructions: $instructions}
  ) {
    id
  }
}
    `
export const useUpdateOrderFollowUpInstructionsMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    UpdateOrderFollowUpInstructionsMutation,
    TError,
    UpdateOrderFollowUpInstructionsMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateOrderFollowUpInstructionsMutation,
    TError,
    UpdateOrderFollowUpInstructionsMutationVariables,
    TContext
  >(
    ['updateOrderFollowUpInstructions'],
    useFetch<
      UpdateOrderFollowUpInstructionsMutation,
      UpdateOrderFollowUpInstructionsMutationVariables
    >(UpdateOrderFollowUpInstructionsDocument),
    options
  )
export const UpdateVisitDocument = `
    mutation updateVisit($visitId: Int!, $objects: visits_set_input) {
  update_visits_by_pk(pk_columns: {id: $visitId}, _set: $objects) {
    id
  }
}
    `
export const useUpdateVisitMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateVisitMutation,
    TError,
    UpdateVisitMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateVisitMutation,
    TError,
    UpdateVisitMutationVariables,
    TContext
  >(
    ['updateVisit'],
    useFetch<UpdateVisitMutation, UpdateVisitMutationVariables>(
      UpdateVisitDocument
    ),
    options
  )
