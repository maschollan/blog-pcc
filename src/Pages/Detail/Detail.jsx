// Library
import React from "react";
// import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { useEffect } from "react";
import ReactMarkdown from 'react-markdown'

// Components
import Layout from "../../Components/Layout";
import GetDataError from "../../Components/GetDataError";
import GetDataLoading from "../../Components/GetDataLoading";
import NotFound from "../../Pages/404/notFound";
// import file from "../../lat.md";


// API
import useAxios from "../../utils/useAxios";
import dateToString from "../../utils/dateToString"

const Detail = () => {
  const { slug } = useParams();

  const { posts , isLoading, isError } = useAxios(`http://localhost:3000/posts?slug=${slug}`, 'Blog PCC');

  if (posts.length !== 0) document.title = `Blog PCC - ${posts[0].title}`;

  const post = posts[0];

  // const [markdown, setMarkdown] = useState("");

  // useEffect(() => {
  //   fetch(file)
  //     .then((res) => res.text())
  //     .then((text) => setMarkdown(text));
  // }, []);

  // Loading Fetch Data
  if (isLoading)
    return (
      <Layout>
        <GetDataLoading />
      </Layout>
    );

  // Error While Fetching Data
  if (isError)
    return (
      <Layout>
        <GetDataError error={isError} />
      </Layout>
    );

  if (typeof post === 'undefined')
    return (
      <NotFound />
    );

  return (
    <Layout>
      <div className="w-full flex items-center justify-center py-4 px-2">
        <img className="object-cover w-10/12" src={process.env.PUBLIC_URL + `/images/${post.thumbnail.name}`} alt="Thumbnail" />
      </div>
      <div className="w-10/12 flex justify-center mx-auto py-2 px-2">
        <div className="w-full md:w-5/12 flex justify-center space-x-2 text-gray-400 items-center">
          <h4 className="uppercase">{post.category.name}</h4>
          <span>&bull;</span>
          <h4>{dateToString(post.updated_at)}</h4>
        </div>
      </div>
      <div className="w-10/12 flex justify-center mx-auto py-2 px-2">
        <div className="w-full flex justify-center">
          <h2 className="text-2xl lg:text-3xl text-center">{post.title}</h2>
        </div>
      </div>
      <div className="w-10/12 flex justify-center py-4 px-2 mx-auto text-gray-300 leading-relaxed text-justify">
        <div className="w-full">
          <p className="text-lg mb-4">
            {post.headline}
          </p>
          <ReactMarkdown className="prose prose-indigo">
            {post.contents}
          </ReactMarkdown>
        </div>
      </div>
      <div className="w-full flex justify-center py-4 px-2">
        <div className="w-8/12 flex justify-center items-center">
          <img className="h-14 w-14 object-cover" src={process.env.PUBLIC_URL + `/images/${post.author.avatar.name}`} alt="DetailImage" />
          <div className="ml-3">
            <h4>{post.author.name}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
