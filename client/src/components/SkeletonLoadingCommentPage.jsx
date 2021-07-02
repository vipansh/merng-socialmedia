import React from "react";

const SkeletonLoadingCommentPage = () => {
  return (
    <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap justify-around ">
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-xl w-full">
        <div>
          <div className="animate-pulse  space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-blue-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-400 rounded"></div>
                <div className="h-4 bg-blue-400 rounded w-5/6"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-400 rounded"></div>
                <div className="h-4 bg-blue-400 rounded w-5/6"></div>
              </div>
            </div>
            <div className="flex">
              <div className="rounded-full bg-blue-400 h-12 w-12"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-400 rounded"></div>
                <div className="h-4 bg-blue-400 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-xl w-full">
        <div>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-blue-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-400 rounded"></div>
                <div className="h-4 bg-blue-400 rounded w-5/6"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-400 rounded"></div>
                <div className="h-4 bg-blue-400 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingCommentPage;
