// Library
import { useParams } from "react-router";
import ReactMarkdown from 'react-markdown'

// Components
import Layout from "../../Components/Layout";
import GetDataError from "../../Components/GetDataError";
import GetDataLoading from "../../Components/GetDataLoading";

// API
import useAxios from "../../utils/useAxios";
import dateToString from "../../utils/dateToString"

const Detail = () => {
  const { slug } = useParams();

  const { posts, isLoading, isError } = useAxios(`http://localhost:3000/posts?slug=${slug}`, `${slug} - Blog`);
  
  const post = posts[0]

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
      <div className="w-full flex items-center justify-center py-4 px-2">
        <img className="object-cover w-10/12" src= {process.env.PUBLIC_URL + `/images/${post.thumbnail.name}`} alt="Thumbnail" />
      </div>
      <div className="w-10/12 flex justify-center mx-auto py-2 px-2">
        <div className="w-full md:w-5/12 flex justify-center space-x-2 text-gray-400 items-center">
          <h4 className="uppercase">{post.category.name}</h4>
          <span>&bull;</span>
          <h4>{dateToString(post.created_at)}</h4>
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
          <ReactMarkdown className="prose">
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
