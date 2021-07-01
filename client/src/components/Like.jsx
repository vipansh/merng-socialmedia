import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Like = ({ likeCount, postId, likes }) => {
  const { currentUser } = useAuth();

  const [liked, setLiked] = useState();
  useEffect(() => {
    if (
      currentUser &&
      likes.find((like) => like.username === currentUser.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [currentUser, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: postId },
  });

  return (
    <button class="flex mr-2 text-gray-700 text-sm focus:outline-none " onClick={likePost}>
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-red-800"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
      ) : (
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
      <span>{likeCount}</span>
    </button>
  );
};

export default Like;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
