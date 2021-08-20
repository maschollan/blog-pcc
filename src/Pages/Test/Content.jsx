// Library
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Layout from "../../Components/Layout";

// Api
import useAxios from "../../utils/useAxios";
import GetDataError from "../../Components/GetDataError";
import GetDataLoading from "../../Components/GetDataLoading";
import { removeContent, getAllContents } from "./httpService";
import { getUser, removeUserSession } from '../../utils/Common';

const Test = (props) => {

  const { isLoading, isError } = useAxios(
    `http://localhost:3000/posts?featurjjed=true`, "Blog - Content"
  );

  // const [ terhapus, setTerhapus ] = useState(false);
  const [rows, setRows] = useState([]);
  const [isRowChanged, setIsRowChanged] = useState(true);

  useEffect(() => {
    if (isRowChanged) {
      getAllContents().then(res => setRows(res.data));
    }
    setIsRowChanged(false);
  });

  const hapus = (id) => {
    removeContent(id).then(() => {
      alert("success");
      setIsRowChanged(true);
    });
  };

  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

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

  return (
    <Layout>
      <div className={`bg-gray-800 font-patrick w-full min-h-screen`}>
        <div className="w-full flex justify-between mb-4">
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 rounded-lg cursor-pointer" to={`/create`}>
            Tambah
          </Link>

          <p className="text-lg text-white">Selamat Datang {user.name}</p>
          
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-3 rounded-lg cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="px-0 mx-auto sm:mx-3 bg-gray-800 shadow overflow-hidden border-b border-gray-100 sm:rounded-lg">
          <table className="text-white min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-100 uppercase tracking-wider">id</th>
                <th className="px-6 py-3 text-left font-medium text-gray-100 uppercase tracking-wider">title</th>
                <th className="px-6 py-3 text-left font-medium text-gray-100 uppercase tracking-wider">nama</th>
                <th className="px-6 py-3 text-left font-medium text-gray-100 uppercase tracking-wider">head</th>
                <th className="px-6 py-3 text-left font-medium text-gray-100 uppercase tracking-wider">action</th>
              </tr>
            </thead>
            {rows.map((post) => {
              return (
                <tbody className="bg-gray-700">
                  <tr>
                    <td className="px-3 py-3 text-sm text-gray-200">{post.id}</td>
                    <td className="px-3 py-3 text-sm text-gray-200">{post.title}</td>
                    <td className="px-3 py-3 text-sm text-gray-200">{post.author.name}</td>
                    <td className="px-3 py-3 text-sm text-gray-200">{post.headline}</td>
                    <td className="px-3 py-3 text-sm text-gray-200 whitespace-nowrap">
                      <Link className="px-2 inline-flex text-sm leading-5 font-semibold rounded-lg bg-green-100 text-green-800 hover:bg-green-300 cursor-pointer" to={`/edit/${post.id}`}>
                        Edit
                      </Link>
                      <p className="px-2 inline-flex ml-3 text-sm leading-5 font-semibold rounded-lg bg-red-100 text-red-800 hover:bg-red-300 cursor-pointer" onClick={() => hapus(post.id)}>
                        Delete
                      </p>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </Layout>
  );
};
export default Test