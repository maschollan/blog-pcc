// Library
import React from "react";

const GetDataError = ({ error }) => {
  return (
      <div className="flex flex-col justify-center items-center min-h-(custom-height) tracking-wider lg:text-2xl">
        <img
          className="lg:w-6/12 w-10/12"
          src={process.env.PUBLIC_URL + "/images/notFound.svg"}
          alt="Error"
        />
        <p className="font-bold">{error}</p>
      </div>
  );
};

export default GetDataError;
