// library
import React from "react";

// Components
import BlogPage from "../../../Components/BlogPage";

// API
import useAxios from "../../../utils/useAxios";

const Programming = () => {
  const {posts, isLoading, isError} = useAxios(`http://localhost:3000/posts?category.name=programming&featured=false`, "Programming Posts - Blog")

  return (
    <BlogPage data={posts} titleHeader="Programming" loading={isLoading} error={isError}/>
  );
};

export default Programming;
