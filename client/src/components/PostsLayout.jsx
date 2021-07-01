import { gql, useQuery } from "@apollo/client";
import React from "react";
import Post from "./Post";
import SubbmitPost from "./SubbmitPost";
const PostsLayout = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  if (loading) return "Loading....";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <div className="flex flex-wrap">
      <SubbmitPost />
      {data.getPosts.map((data) => {
        return <Post data={data} />;
      })}
    </div>
  );
};

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

export default PostsLayout;
