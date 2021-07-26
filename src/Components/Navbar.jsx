// Library
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";

export default function Navbar() {
  const [keyword, setKeyword] = useState(false);
  let history = useHistory();

  const [offCanvas, setOffCanvas] = useState(false);
  const [search, setSearch] = useState(false);

  function doSearch(e) {
    e.preventDefault();
    history.push(`/search/${keyword}`);
  }

  return (
    <nav className="h-24 py-6 bg-gray-800 font-patrick text-white overflow-hidden relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="w-3/12 flex justify-center md:hidden">
            <button
              onClick={() => {
                setOffCanvas(!offCanvas);
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M3 12H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div className="w-6/12 flex justify-center md:w-2/12 md:justify-start">
            <Link
              to="/"
              className="hover:text-gray-500 transition-all xl:text-lg text-base"
            >
              UKM PCC
            </Link>
          </div>
          <div className="w-3/12 flex justify-center md:hidden">
            <button onClick={()=> {setSearch(!search)}}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            </button>
          </div>
          <div
            className={` w-full h-full bg-gray-800 fixed left-0 py-5 px-10 md:w-7/12 md:static md:bg-gray-800 md:p-0 transition-all duration-500
            ${offCanvas ? "top-0" : `-top-full` }
            `}
          >
            <button onClick={() => { setOffCanvas(!offCanvas) }} className="absolute top-5 right-5 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col py-10 tracking-wide space-y-4 md:space-x-10 md:space-y-0 md:flex-row md:py-2 md:items-center">
              <li className="text-gray-400 underline uppercase text-lg md:hidden">
                Menu
              </li>
              <li>
                <Link
                  className="hover:text-gray-500 hover:underline transition-all"
                  to="/networking"
                >
                  Networking
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-500 hover:text-underline transition-all"
                  to="/programming"
                >
                  Programming
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-500 hover:text-underline transition-all"
                  to="/design"
                >
                  Design
                </Link>
              </li>
            </ul>
          </div>
          <div className={`absolute w-full px-5 transition-all duration-500 md:w-3/12 md:static md:px-0 ${search ? `right-0`:`-right-full`}`}>
            <button onClick={() => { setSearch(!search) }} className="absolute top-2 right-7 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={doSearch}>
              <input
                className="md:rounded-full rounded-lg w-full bg-gray-700 px-2 py-2 icon-search pl-8"
                type="text"
                name="search"
                id="search"
                placeholder="Search Title..."
                autoComplete="off"
                required
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
