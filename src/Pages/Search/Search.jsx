// library
import React from "react";
import { useParams } from "react-router";

// Components
import BlogPage from "../../Components/BlogPage";

// API
import useAxios from "../../utils/useAxios";

const Search = () => {
  const { title } = useParams()

  const { posts, isLoading, isError } = useAxios(`http://localhost:3000/posts?title_like=` + title, "Search Post - Blog")

  return (
    <BlogPage data={posts} titleHeader="Search" loading={isLoading} error={isError}/>
  );
};

export default Search;
