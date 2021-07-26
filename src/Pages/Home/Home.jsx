// Library
import React from "react";

// Components
import Layout from "../../Components/Layout";
import CardPost from "../../Components/CardPost";
import FeaturedPost from "../../Components/FeaturedPost";
import GetDataLoading from "../../Components/GetDataLoading";

// Api
import useAxios from "../../utils/useAxios";
import GetDataError from "../../Components/GetDataError";

const Home = () => {
  let featuredPost;

  console.log(process.env.REACT_APP_API_URL);

  // Fetching Data Featured Post From API
  const { posts:featured, isLoading, isError } = useAxios(
    `http://localhost:3000/posts?featured=true`
  );
  
  // Fetching Data Post From API
  const { posts } = useAxios(
    `http://localhost:3000/posts?featured=false`, "Home - Blog"
  );
  
  // Fetching First Data Featured Post
  if (featured.length > 0) {
    featuredPost = featured[0]
  } else {
    featuredPost = false
  }
  
  // Loading Fetch Data
  if (isLoading)
    return (
      <Layout>
        <GetDataLoading/>
      </Layout>
    );
  
  // Error While Fetching Data
  if (isError)
    return (
      <Layout>
        <GetDataError error={isError}/>
      </Layout>
    );


  return (
    <Layout>
      <FeaturedPost data={featuredPost} />
      <div className="flex py-6 flex-wrap">
        {posts.map((post) => {
          return (
            <div className="w-full px-3 lg:w-4/12 md:w-6/12">
              <CardPost key={post.id} data={post} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
