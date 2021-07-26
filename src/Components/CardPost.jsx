// Library
import React from "react";
import { Link } from "react-router-dom";
import dateToString from "../utils/dateToString"

const CardPost = ({ data }) => {
  console.log(data.thumbnail.name);
  return (
    <article className="text-white py-6 border-b-2 border-gray-600 lg:border-0">
      <img
        className="rounded"
        src={process.env.PUBLIC_URL + `/images/${data.thumbnail.name}`}
        alt="thumbnail"
      />
      <div className="flex items-center space-x-2 text-sm text-gray-400 mt-3">
        <h4 className="uppercase">{data.category.name}</h4>
        <span>&bull;</span>
        <h4>{dateToString(data.created_at)}</h4>
      </div>
      <Link className="text-xl transition-all mt-3 hover:text-gray-500 cursor-pointer" to={`/detail/${data.slug}`}>
        {data.title}
      </Link>
      <p className="text-gray-400 mt-3">
        {data.headline}
      </p>
      <div className="flex items-center mt-3">
        <img
          className="h-10 w-10 object-cover"
          src={process.env.PUBLIC_URL + `/images/${data.author.avatar.name}`}
          alt="Avatar"
        />
        <div className="ml-3">
          <h4>{data.author.name}</h4>
        </div>
      </div>
    </article>
  );
};

export default CardPost;
