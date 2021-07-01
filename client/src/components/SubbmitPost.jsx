import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/AuthContext";

const SubbmitPost = () => {
  const [body, setBody] = useState("");
  const { currentUser, setErrorsList } = useAuth();
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
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
      console.log(err.graphQLErrors, err.message);
    },
  });

  return (
    <div class="p-8 flex flex-row justify-between">
      <div class="flex  min-w-lg max-h-lg bg-gray-800 justify-center items-center">
        <div class=" min-w-lg m-1 bg-white p-2 pt-4 rounded">
          <div class="flex ml-3">
            <div class="mr-3">
              <img src="http://picsum.photos/50" alt="" class="rounded-full" />
            </div>
            <div>
              <h1 class="font-semibold">{currentUser.name}</h1>
            </div>
          </div>

          <div class="mt-3 p-3 w-full">
            <textarea
              rows="3"
              class="border p-2 rounded w-full"
              placeholder="Write something..."
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          <div class="flex justify-between mx-3">
            <div>
              <button
                class="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700"
                onClick={createPost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubbmitPost;

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
