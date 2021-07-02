import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getFuzzyTime } from "../utlis/fizzTime";
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
  showDelete = true,
}) => {
  const { currentUser } = useAuth();

  const [deletePostOrMutation, { loading }] = useMutation(
    DELETE_POST_MUTATION,
    {
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
    }
  );

  return (
    <div className="p-4 mx-auto w-full flex flex-col items-start border-2 rounded-md m-4 shadow-md bg-white">
      <div className="flex justify-between w-full">
        <div>
          <span className="inline-block py-1 px-2 mr-2 bg-blue-50 text-blue-500 text-xs font-medium  rounded-sm">
            Posted At
          </span>
          <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
            {getFuzzyTime(createdAt)}
          </span>
        </div>
        <div>
          {showDelete && currentUser && currentUser.username === username && (
            <button
              className={`focus:outline-none ${
                loading ? "curser-not-allowed opacity-50" : "cursor-pointer"
              }`}
              onClick={deletePostOrMutation}
            >
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 animate-spin inline items-center cursor-not-allowed"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800 hover:text-red-800 cursor-pointer hover:animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 my-4  max-h-80 overflow-auto w-full">
        {body}
      </h2>

      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
        <Link
          to={`/post/${id}`}
          className="text-indigo-500 inline-flex items-center"
        >
          Post Link
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        <Like likeCount={likeCount} postId={id} likes={likes} />
        <Comment commentCount={commentCount} postId={id} />
      </div>
      <a href="/" className="inline-flex items-center">
        <img
          alt="blog"
          src="https://dummyimage.com/104x104"
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-gray-900">
            {username}
          </span>
        </span>
      </a>
    </div>
  );
};

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

export default Post;
