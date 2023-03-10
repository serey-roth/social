import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BaseComment = Comment & {
  __typename?: 'BaseComment';
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  postId: Scalars['ID'];
  repliesCount: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type Comment = {
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  postId: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentPost: Comment;
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editComment?: Maybe<Comment>;
  likeComment: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationCommentPostArgs = {
  content: Scalars['String'];
  parentCommentId?: InputMaybe<Scalars['ID']>;
  postId: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  images: Array<Scalars['String']>;
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['ID'];
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationLikeCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type PaginatedArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type PaginatedBaseComments = PaginatedList & {
  __typename?: 'PaginatedBaseComments';
  data: Array<BaseComment>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedCreatorPosts = PaginatedList & {
  __typename?: 'PaginatedCreatorPosts';
  creatorId: Scalars['ID'];
  data: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedList = {
  hasMore: Scalars['Boolean'];
};

export type PaginatedPosts = PaginatedList & {
  __typename?: 'PaginatedPosts';
  data: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedReplies = PaginatedList & {
  __typename?: 'PaginatedReplies';
  data: Array<Reply>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['ID'];
  id: Scalars['ID'];
  imageLinks: Array<Scalars['String']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  baseComments: PaginatedBaseComments;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  postsByCreatorId: PaginatedCreatorPosts;
  replies: PaginatedReplies;
};


export type QueryBaseCommentsArgs = {
  options: PaginatedArgs;
  postId: Scalars['ID'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  options: PaginatedArgs;
};


export type QueryPostsByCreatorIdArgs = {
  creatorId: Scalars['ID'];
  options: PaginatedArgs;
};


export type QueryRepliesArgs = {
  options: PaginatedArgs;
  parentCommentId: Scalars['ID'];
};

export type Reply = Comment & {
  __typename?: 'Reply';
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  postId: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  totalPostCount: Scalars['Int'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export const CommentPostDocument = gql`
    mutation CommentPost($postId: ID!, $content: String!, $parentId: ID) {
  commentPost(postId: $postId, content: $content, parentCommentId: $parentId) {
    authorId
    postId
    id
    author {
      username
    }
    content
  }
}
    `;
export type CommentPostMutationFn = Apollo.MutationFunction<CommentPostMutation, CommentPostMutationVariables>;

/**
 * __useCommentPostMutation__
 *
 * To run a mutation, you first call `useCommentPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentPostMutation, { data, loading, error }] = useCommentPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCommentPostMutation(baseOptions?: Apollo.MutationHookOptions<CommentPostMutation, CommentPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentPostMutation, CommentPostMutationVariables>(CommentPostDocument, options);
      }
export type CommentPostMutationHookResult = ReturnType<typeof useCommentPostMutation>;
export type CommentPostMutationResult = Apollo.MutationResult<CommentPostMutation>;
export type CommentPostMutationOptions = Apollo.BaseMutationOptions<CommentPostMutation, CommentPostMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $text: String!, $images: [String!]!) {
  createPost(title: $title, text: $text, images: $images) {
    id
    text
    title
    createdAt
    updatedAt
    creator {
      username
      id
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: ID!, $postId: ID!) {
  deleteComment(commentId: $commentId, postId: $postId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(id: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($commentId: ID!, $postId: ID!, $content: String!) {
  editComment(commentId: $commentId, postId: $postId, content: $content) {
    content
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const LikeCommentDocument = gql`
    mutation LikeComment($commentId: ID!) {
  likeComment(commentId: $commentId)
}
    `;
export type LikeCommentMutationFn = Apollo.MutationFunction<LikeCommentMutation, LikeCommentMutationVariables>;

/**
 * __useLikeCommentMutation__
 *
 * To run a mutation, you first call `useLikeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCommentMutation, { data, loading, error }] = useLikeCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useLikeCommentMutation(baseOptions?: Apollo.MutationHookOptions<LikeCommentMutation, LikeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeCommentMutation, LikeCommentMutationVariables>(LikeCommentDocument, options);
      }
export type LikeCommentMutationHookResult = ReturnType<typeof useLikeCommentMutation>;
export type LikeCommentMutationResult = Apollo.MutationResult<LikeCommentMutation>;
export type LikeCommentMutationOptions = Apollo.BaseMutationOptions<LikeCommentMutation, LikeCommentMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: ID!) {
  likePost(id: $postId)
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
      totalPostCount
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
      totalPostCount
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: ID!, $title: String!, $text: String!) {
  updatePost(id: $postId, title: $title, text: $text) {
    id
    text
    title
    createdAt
    updatedAt
    creatorId
    creator {
      username
      id
      email
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const BaseCommentsDocument = gql`
    query BaseComments($postId: ID!, $options: PaginatedArgs!) {
  baseComments(postId: $postId, options: $options) {
    hasMore
    data {
      author {
        email
        id
        username
        totalPostCount
      }
      authorId
      createdAt
      updatedAt
      content
      repliesCount
      id
      postId
      isLiked
      likeCount
    }
  }
}
    `;

/**
 * __useBaseCommentsQuery__
 *
 * To run a query within a React component, call `useBaseCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBaseCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBaseCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useBaseCommentsQuery(baseOptions: Apollo.QueryHookOptions<BaseCommentsQuery, BaseCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BaseCommentsQuery, BaseCommentsQueryVariables>(BaseCommentsDocument, options);
      }
export function useBaseCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BaseCommentsQuery, BaseCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BaseCommentsQuery, BaseCommentsQueryVariables>(BaseCommentsDocument, options);
        }
export type BaseCommentsQueryHookResult = ReturnType<typeof useBaseCommentsQuery>;
export type BaseCommentsLazyQueryHookResult = ReturnType<typeof useBaseCommentsLazyQuery>;
export type BaseCommentsQueryResult = Apollo.QueryResult<BaseCommentsQuery, BaseCommentsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    totalPostCount
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($postId: ID!) {
  post(id: $postId) {
    id
    text
    title
    createdAt
    updatedAt
    isLiked
    likeCount
    creatorId
    creator {
      username
      email
      id
      totalPostCount
    }
    commentCount
    imageLinks
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($options: PaginatedArgs!) {
  posts(options: $options) {
    hasMore
    data {
      commentCount
      createdAt
      creator {
        email
        id
        username
        totalPostCount
      }
      creatorId
      id
      isLiked
      likeCount
      text
      textSnippet
      title
      updatedAt
      imageLinks
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostsByCreatorIdDocument = gql`
    query PostsByCreatorId($creatorId: ID!, $options: PaginatedArgs!) {
  postsByCreatorId(creatorId: $creatorId, options: $options) {
    data {
      id
      title
      commentCount
      createdAt
      creator {
        totalPostCount
        username
        id
        email
      }
      creatorId
      imageLinks
      isLiked
      likeCount
      text
      textSnippet
      updatedAt
    }
    hasMore
    creatorId
  }
}
    `;

/**
 * __usePostsByCreatorIdQuery__
 *
 * To run a query within a React component, call `usePostsByCreatorIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByCreatorIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByCreatorIdQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePostsByCreatorIdQuery(baseOptions: Apollo.QueryHookOptions<PostsByCreatorIdQuery, PostsByCreatorIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByCreatorIdQuery, PostsByCreatorIdQueryVariables>(PostsByCreatorIdDocument, options);
      }
export function usePostsByCreatorIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByCreatorIdQuery, PostsByCreatorIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByCreatorIdQuery, PostsByCreatorIdQueryVariables>(PostsByCreatorIdDocument, options);
        }
export type PostsByCreatorIdQueryHookResult = ReturnType<typeof usePostsByCreatorIdQuery>;
export type PostsByCreatorIdLazyQueryHookResult = ReturnType<typeof usePostsByCreatorIdLazyQuery>;
export type PostsByCreatorIdQueryResult = Apollo.QueryResult<PostsByCreatorIdQuery, PostsByCreatorIdQueryVariables>;
export const RepliesDocument = gql`
    query Replies($parentCommentId: ID!, $options: PaginatedArgs!) {
  replies(parentCommentId: $parentCommentId, options: $options) {
    hasMore
    data {
      authorId
      author {
        email
        username
        id
        totalPostCount
      }
      content
      createdAt
      id
      postId
      updatedAt
      isLiked
      likeCount
    }
  }
}
    `;

/**
 * __useRepliesQuery__
 *
 * To run a query within a React component, call `useRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepliesQuery({
 *   variables: {
 *      parentCommentId: // value for 'parentCommentId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRepliesQuery(baseOptions: Apollo.QueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, options);
      }
export function useRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, options);
        }
export type RepliesQueryHookResult = ReturnType<typeof useRepliesQuery>;
export type RepliesLazyQueryHookResult = ReturnType<typeof useRepliesLazyQuery>;
export type RepliesQueryResult = Apollo.QueryResult<RepliesQuery, RepliesQueryVariables>;
export type CommentPostMutationVariables = Exact<{
  postId: Scalars['ID'];
  content: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
}>;


export type CommentPostMutation = { __typename?: 'Mutation', commentPost: { __typename?: 'BaseComment', authorId: string, postId: string, id: string, content: string, author: { __typename?: 'User', username: string } } | { __typename?: 'Reply', authorId: string, postId: string, id: string, content: string, author: { __typename?: 'User', username: string } } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  images: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, text: string, title: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', username: string, id: string } } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
  content: Scalars['String'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment?: { __typename?: 'BaseComment', content: string } | { __typename?: 'Reply', content: string } | null };

export type LikeCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type LikeCommentMutation = { __typename?: 'Mutation', likeComment: boolean };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, username: string, totalPostCount: number } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, username: string, totalPostCount: number } | null } };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: string, text: string, title: string, createdAt: string, updatedAt: string, creatorId: string, creator: { __typename?: 'User', username: string, id: string, email: string } } | null };

export type BaseCommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
  options: PaginatedArgs;
}>;


export type BaseCommentsQuery = { __typename?: 'Query', baseComments: { __typename?: 'PaginatedBaseComments', hasMore: boolean, data: Array<{ __typename?: 'BaseComment', authorId: string, createdAt: string, updatedAt: string, content: string, repliesCount: number, id: string, postId: string, isLiked?: boolean | null, likeCount: number, author: { __typename?: 'User', email: string, id: string, username: string, totalPostCount: number } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, totalPostCount: number } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, text: string, title: string, createdAt: string, updatedAt: string, isLiked?: boolean | null, likeCount: number, creatorId: string, commentCount: number, imageLinks: Array<string>, creator: { __typename?: 'User', username: string, email: string, id: string, totalPostCount: number } } | null };

export type PostsQueryVariables = Exact<{
  options: PaginatedArgs;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, data: Array<{ __typename?: 'Post', commentCount: number, createdAt: string, creatorId: string, id: string, isLiked?: boolean | null, likeCount: number, text: string, textSnippet: string, title: string, updatedAt: string, imageLinks: Array<string>, creator: { __typename?: 'User', email: string, id: string, username: string, totalPostCount: number } }> } };

export type PostsByCreatorIdQueryVariables = Exact<{
  creatorId: Scalars['ID'];
  options: PaginatedArgs;
}>;


export type PostsByCreatorIdQuery = { __typename?: 'Query', postsByCreatorId: { __typename?: 'PaginatedCreatorPosts', hasMore: boolean, creatorId: string, data: Array<{ __typename?: 'Post', id: string, title: string, commentCount: number, createdAt: string, creatorId: string, imageLinks: Array<string>, isLiked?: boolean | null, likeCount: number, text: string, textSnippet: string, updatedAt: string, creator: { __typename?: 'User', totalPostCount: number, username: string, id: string, email: string } }> } };

export type RepliesQueryVariables = Exact<{
  parentCommentId: Scalars['ID'];
  options: PaginatedArgs;
}>;


export type RepliesQuery = { __typename?: 'Query', replies: { __typename?: 'PaginatedReplies', hasMore: boolean, data: Array<{ __typename?: 'Reply', authorId: string, content: string, createdAt: string, id: string, postId: string, updatedAt: string, isLiked?: boolean | null, likeCount: number, author: { __typename?: 'User', email: string, username: string, id: string, totalPostCount: number } }> } };
