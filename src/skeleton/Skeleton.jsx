import React from "react";

const Skeleton = () => {
  return (
    <article className="box-border">
      <div className="flex flex-col px-4 py-6 lg:items-center lg:flex-row space-x-3">
        <div className="w-full rounded-lg lg:w-8/12 lg:h-96 bg-gray-900 animate-pulse"></div>
        <div className="w-full py-3 lg:w-4/12 lg:px-6 bg-gray-800 flex flex-col space-y-3">
          <div className="h-8 bg-gray-900 animate-pulse"></div>
          <div className="h-48 bg-gray-900 animate-pulse"></div>
          <div className="h-16 bg-gray-900 flex flex-row justify-start items-center p-5 animate-pulse">
            <div className="h-12 w-12 rounded-full bg-gray-800"></div>
            <div className="h-5 w-32 bg-gray-800 ml-3"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Skeleton;