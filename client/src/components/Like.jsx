import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Like = ({ likeCount, postId, likes }) => {
  const { currentUser } = useAuth();

  const [liked, setLiked] = useState();
  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: postId },
  });
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

  return (
    <button
      onClick={likePost}
      className={`text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200  ${
        loading || !currentUser ? "cursor-not-allowed" : "cursor-pointer"
      } `}
      disabled={loading || !currentUser}
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-800"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          className="w-4 h-4 mr-1"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ) : (
        likeCount
      )}
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
