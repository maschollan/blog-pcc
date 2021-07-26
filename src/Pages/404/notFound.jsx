// Library
import React from "react";
import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className={`bg-gray-800 font-patrick text-white flex justify-center items-center w-screen min-h-screen absolute top-0 left-0 overflow-hidden`}>
      <div className="container mx-auto text-5xl text-bold text-center tracking-wider">
        <h1>404</h1>
        <h1 className="mt-5">Sorry, Page Not Found</h1>
        <Link to="/" className="flex items-center justify-center mt-20 animate-pulse hover:text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          <h2 className="text-center text-xl ml-3">
            Back to Homepage
          </h2>
        </Link>
      </div>
    </div>
  );
};
export default notFound