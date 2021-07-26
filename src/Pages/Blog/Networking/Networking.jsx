// library
import React from "react";

// Components
import BlogPage from "../../../Components/BlogPage";

// API
import  useAxios  from "../../../utils/useAxios";

const Networking = () => {
  const { posts, isLoading, isError } = useAxios(`http://localhost:3000/posts?category.name=networking&featured=false`, "Network Posts - Blog");

  return (
    <BlogPage data={posts} titleHeader="Networking" loading={isLoading} error={isError}/>
  );
};

export default Networking;
