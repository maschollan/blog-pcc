// Library
import React from "react";
import { useParams } from "react-router";

// Components
import Layout from "./Layout";
import CardPost from "./CardPost";
import GetDataError from "./GetDataError";
import GetDataLoading from "./GetDataLoading";

const BlogPage = ({ data, titleHeader, loading, error }) => {
  
  // Get Params Title from URL
  const { title } = useParams();

  // Loading Fetch Data
  if (loading)
    return (
      <Layout>
        <GetDataLoading/>
      </Layout>
    );
  
  // Error While Fetching Data
  if (error)
    return (
      <Layout>
        <GetDataError error={error}/>
      </Layout>
    );
  
  return (
    <Layout>
      <div className={loading || error ? "hidden" : ""}>
        {data.length !== 0 ?
          <div>
            <h2 className="text-4xl text-center pt-10 pb-4 tracking wide">
              {title ? `${titleHeader} : ${title}` : titleHeader}
            </h2>
            <div className="flex py-4 px-2 flex-wrap lg:px=0">
              {data.map((post) => {
                return (
                  <div className="w-full py-4 px-4 lg:w-4/12 md:w-6/12 md:px-2">
                    <CardPost key={post.id} data={post} />
                  </div>
                );
              })}
            </div>
          </div>
          :
          <div className="text-center tracking-wide">
            <h2 className="text-4xl py-10">
              {title ? `${titleHeader} : ${title}` : titleHeader}
            </h2> 
            <h2 className="text-5xl py-10 pb-5">No result <span role="img" aria-label="emoji">😥</span></h2>
            <p className="text-lg">Kami tidak dapat menemukan postingan dengan kata kunci `<strong className="tracking-loose text-red-200">{title}</strong>`.</p>
            <p className="text-lg"> Silakan coba kata kunci lain.</p>
          </div>
        }
      </div>
    </Layout>
  );
};

export default BlogPage;
