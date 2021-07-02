import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, Redirect, useParams } from "react-router-dom";
import Post from "../components/Post";
import { useAuth } from "../context/AuthContext";
import { getFuzzyTime } from "../utlis/fizzTime";
import SkeletonLoadingCommentPage from "../components/SkeletonLoadingCommentPage";

const PostPage = () => {
  const [commentBody, setCommentBody] = useState("");
  const [bodyError, setbodyError] = useState(false);
  const [userError, setUserError] = useState(false);
  const { currentUser } = useAuth();
  const { id } = useParams();
  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: id,
    },
  });

  const [submitComment, { loading: commentLoading }] = useMutation(
    SUBMIT_COMMENT_MUTATION,
    {
      variables: {
        postId: id,
        body: commentBody,
      },
      onError(err) {
        console.log(err.message);
      },
    }
  );

  const addComment = async () => {
    let isValid = true;
    if (commentBody.trim() === "") {
      setbodyError(true);
      isValid = false;
    }
    if (!currentUser) {
      setUserError(true);
      isValid = false;
    }
    if (isValid) {
      await submitComment();
      setCommentBody("");
    }
  };

  const [deleteCommentMutation, { loading: commentDeleteLoading }] =
    useMutation(DELETE_COMMENT_MUTATION, {
      onError(err) {
        console.log(err);
      },
    });

  if (loading) {
    return (
      <div>
        <SkeletonLoadingCommentPage />
      </div>
    );
  }
  if (error) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap justify-center w-full lg:w-2/3 md:w-1/2 ">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg sm:mr-10 p-4 md:p-10  flex h-auto ">
            <Post data={data.getPost} showDelete={false} />
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 max-h-96">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Comments
            </h2>

            <div className="relative mb-4">
              <p>
                {data.getPost.comments.map((comment) => {
                  return (
                    <div
                      key={comment.id}
                      className="my-4 p-4 mx-auto w-full  items-start border-2 rounded-md m-4 shadow-md bg-white"
                    >
                      <div className=" flex justify-between ">
                        <div className=" flex justify-between ">
                          <div className="mx-4">{comment.username}</div>
                          <div className="mx-4">
                            {getFuzzyTime(comment.createdAt)}
                          </div>
                        </div>
                        {currentUser
                          ? currentUser.username === comment.username && (
                              <button
                                className={`focus:outline-none ${
                                  commentDeleteLoading
                                    ? "curser-not-allowed opacity-50"
                                    : "cursor-pointer"
                                }`}
                                onClick={() => {
                                  deleteCommentMutation({
                                    variables: {
                                      postId: id,
                                      commentId: comment.id,
                                    },
                                  });
                                }}
                              >
                                {commentDeleteLoading ? (
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
                            )
                          : ""}
                      </div>
                      <div className="mx-4 text-gray-900 font-semibold">
                        {comment.body}
                      </div>
                    </div>
                  );
                })}
              </p>
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Add Comment
              </label>
              <textarea
                id="message"
                name="message"
                onFocus={() => {
                  setbodyError(false);
                  setUserError(false);
                }}
                className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out
                ${bodyError || userError ? "border-red-600" : ""}
                `}
                onChange={(e) => {
                  setCommentBody(e.target.value);
                }}
                value={commentBody}
              ></textarea>
              {bodyError && (
                <span className="text-red-800  block">
                  Comment Can't be empty
                </span>
              )}
              {userError && (
                <span className="text-red-800  block">
                  You need to log in to comment
                </span>
              )}
            </div>
            <button
              className={`text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
                commentLoading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={addComment}
            >
              {commentLoading ? (
                <span>
                  Loading...
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
                "Comment"
              )}
            </button>
            <p className="text-xs text-gray-500 mt-3">
              {currentUser ? (
                <span>Comment on the post as {currentUser.username}</span>
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
      </section>
    </div>
  );
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
export default PostPage;
