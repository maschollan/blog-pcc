// library
import React from "react";

// Components
import BlogPage from "../../../Components/BlogPage";

// API
import  useAxios  from "../../../utils/useAxios";

const Design = () => {
  const {posts, isLoading, isError}= useAxios(`http://localhost:3000/posts?category.name=design&featured=false`, "Design Posts - Blog")
  return (
      <BlogPage data={posts} titleHeader="Design" loading={isLoading} error={isError}/>
  );
};

export default Design;
