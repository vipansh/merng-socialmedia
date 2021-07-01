import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useAuth } from "../context/AuthContext";
// import { AddComment } from "./AddComment";
import Comment from "./Comment";
import Like from "./Like";

const Post = ({
  data: {
    id,
    body,
    createdAt,
    username,
    comments,
    likes,
    likeCount,
    commentCount,
  },
}) => {
  const { currentUser } = useAuth();

  const [deletePostOrMutation] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      let data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      let newData = [...data.getPosts];
      newData = newData.filter((p) => p.id !== id);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: newData,
        },
      });
    },
    variables: {
      postId: id,
    },
  });

  return (
    <div class="flex  mx-auto  justify-center ">
      <div class="flex  items-end ">
        <div class="bg-white shadow-lg rounded-lg px-4 py-6 m-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 -mt-1">
              {username}
            </h2>
            <small class="text-sm text-gray-700">{createdAt}</small>
          </div>
          <p class="mt-3 text-gray-700 text-sm">{body}</p>
          <div class="mt-4 flex items-center">
            <Like likeCount={likeCount} postId={id} likes={likes} />
            <Comment commentCount={commentCount} postId={id} />
            <div class="flex mr-2 text-gray-700 text-sm">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span>share</span>
            </div>
            {currentUser && currentUser.username === username && (
              <div onClick={deletePostOrMutation}>Delete</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      comments {
        body
        username
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;
