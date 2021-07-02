import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SubbmitPost = () => {
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const [userError, setUserError] = useState(false);
  const { currentUser, setErrorsList } = useAuth();
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: { body },
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: newData,
        },
      });
      setBody("");
    },
    onError(err) {
      setErrorsList(err.message);
    },
  });

  const subbmitPost = () => {
    if (body.trim() === "") {
      setBodyError(true);
      setTimeout(() => {
        setBodyError(false);
      }, 3000);
      return;
    }
    if (!currentUser) {
      setUserError(true);
      setTimeout(() => {
        setUserError(false);
      }, 3000);
      return;
    }
    createPost();
  };

  return (
    <div className="p-8 flex flex-row justify-between">
      <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md border-2">
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
          Post something
        </h2>

        <div className="relative mb-4">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out ${
              bodyError || userError ? "border-red-600" : ""
            }`}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
          {bodyError && (
            <div className="text-red-800 text-sm">Body can't be empty</div>
          )}
          {userError && (
            <div className="text-red-800 text-sm">
              Log In before creating a post
            </div>
          )}
        </div>
        <button
          onClick={subbmitPost}
          className={`text-white bg-indigo-500 border-0 py-2 px-6  hover:bg-indigo-600 rounded text-lg focus:outline-none ${
            loading ? "opacity-50" : ""
          } `}
          disabled={loading}
        >
          {loading ? (
            <span>
              Posting...
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 animate-spin inline items-center"
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
            </span>
          ) : (
            "Post"
          )}
        </button>
        <p className="text-xs text-gray-500 mt-3">
          {currentUser ? (
            <span>Post will be created by user {currentUser.username}</span>
          ) : (
            <span>
              You need to{" "}
              <Link to="login" className="text-blue-600">
                login
              </Link>{" "}
              before creating a post
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
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

export default SubbmitPost;
