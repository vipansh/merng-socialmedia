import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { useAuth } from "../context/AuthContext";

const PostPage = () => {
  const [commentBody, setCommentBody] = useState();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: id,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    variables: {
      postId: id,
      body: commentBody,
    },
    onError(err) {
      console.log("commentBody", commentBody);
      console.log(err);
    },
  });

  const addComment = async () => {
    await submitComment();
    setCommentBody("");
  };

  const [deletePostOrMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    onError(err) {
      console.log("commentBody");
      console.log(err);
    },
  });

  if (loading) {
    return <div>Loading.....</div>;
  }
  return (
    <div>
      PostPage PostPage
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg sm:mr-10 p-10 flex ">
            <Post data={data.getPost} />
          </div>
          <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Comments
            </h2>

            <div class="relative mb-4">
              <p>
                {data.getPost.comments.map((comment) => {
                  return (
                    <div className="flex">
                      <div className="m-4">{comment.username}</div>
                      <div className="m-4">{comment.body}</div>
                      <div className="m-4">{comment.createdAt}</div>
                      {currentUser.username === comment.username && (
                        <div className="m-4">
                          <button
                            onClick={() => {
                              deletePostOrMutation({
                                variables: {
                                  postId: id,
                                  commentId: comment.id,
                                },
                              });
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </p>
              <label for="message" class="leading-7 text-sm text-gray-600">
                Add Comment
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                onChange={(e) => {
                  setCommentBody(e.target.value);
                }}
                value={commentBody}
              ></textarea>
            </div>
            <button
              class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={addComment}
            >
              Comment
            </button>
            <p class="text-xs text-gray-500 mt-3">
              Comment on the post as {currentUser.username}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostPage;

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
