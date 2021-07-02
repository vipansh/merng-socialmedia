import { gql, useQuery } from "@apollo/client";
import React from "react";
import Post from "./Post";
import SkeletonLoadingPost from "./SkeletonLoadingPost";
import SubbmitPost from "./SubbmitPost";
const PostsLayout = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  if (error) return `Error! ${error.message}`;
  return (
    <section className="text-gray-600 body-font overflow-hidden ">
      <div className="container  mx-auto">
        <SubbmitPost />
        <div className="grid md:grid-cols-3 grid-col-1 gap-4 p-8 ">
          {loading
            ? [...Array(6)].map((_, i) => {
                return <SkeletonLoadingPost  key={i}/>;
              })
            : data.getPosts.map((data) => {
                return <Post data={data} key={data.id} />;
              })}
        </div>
      </div>
    </section>
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
