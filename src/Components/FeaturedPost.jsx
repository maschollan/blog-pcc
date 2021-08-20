// Library
import React from "react";
import { Link } from "react-router-dom";
import dateToString from "../utils/dateToString";

const featuredPost = ({ data }) => {
  if (data === false) {
    return "";
  } else {
    return (
      <article className="text-white box-border">
        <div className="flex flex-col px-4 py-6 lg:items-center lg:flex-row lg:px-0">
          <div className="w-full lg:w-8/12">
            <img
              className="rounded"
              src={process.env.PUBLIC_URL + `/images/${data.thumbnail.name}`}
              alt="featured Post"
            />
          </div>
          <div className="w-full py-3 text-center lg:w-4/12 lg:px-6 lg:text-left">
            <div className="flex justify-center items-center text-sm space-x-2 text-gray-400 lg:justify-start">
              <h4 className="uppercase">{data.category.name}</h4>
              <span>&bull;</span>
              <h4>{dateToString(data.created_at)}</h4>
            </div>
            <Link
              className="text-xl text-2xl transition-all mt-3 hover:text-gray-500 cursor-pointer xl:mt-5 lg:text-left"
              to={`/detail/${data.slug}`}
            >
              {data.title}
            </Link>
            <p className="text-gray-400 mt-3 xl:mt-5">{data.headline}</p>
            <div className="flex mt-5 justify-center items-center lg:mt-3 lg:justify-start">
              <img
                className="h-10 w-10 object-cover"
                src={process.env.PUBLIC_URL + `/images/${data.author.avatar.name}`}
                alt="author"
              />
              <div className="ml-3">{data.author.name}</div>
            </div>
          </div>
        </div>
      </article>
    );
  }
};

export default featuredPost;
