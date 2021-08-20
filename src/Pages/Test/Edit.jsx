// Library
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from 'react-markdown'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


// Components
import Layout from "../../Components/Layout";
import GetDataError from "../../Components/GetDataError";
import GetDataLoading from "../../Components/GetDataLoading";
import Test from "./Content";
import { updateContent, addThumbnail, getThumbnail, removeThumbnail } from "./httpService";
import { getUser } from '../../utils/Common';
import axios from "axios";

// API
import useAxios from "../../utils/useAxios";
// import dateToString from "../../utils/dateToString"

const Edit = () => {
  const { id } = useParams();

  // const { posts : x } = useAxios(`http://localhost:3000/thumbnail`, 'Blog PCC');
  const { posts, isLoading, isError } = useAxios(`http://localhost:3000/posts?id=${id}`, 'Blog PCC');

  const post = posts[0];

  const { handleSubmit } = useForm();

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbs, setThumbs] = useState([]);
  const [isThumbChanged, setIsThumbChanged] = useState(true);

  useEffect(() => {
    if (isThumbChanged) {
      getThumbnail().then(res => setThumbs(res.data.reverse()));
    }
    setIsThumbChanged(false);
  });

  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const [updateAt, setUpdateAt] = useState(new Date().toISOString())


  const title = useFormInput('');
  const headline = useFormInput('');
  const contents = useFormInput('');
  const category = useFormRadio('', 'category');
  const thumb = useFormRadio('', 'thumb');
  const user = getUser();

  const onSubmit = () => {
    if (post !== undefined) {
      if (contents.value === post.contents) setUpdateAt(post.updated_at);
      else setUpdateAt(new Date().toDateString())
    }
    var data = {
      title: title.value,
      slug: title.value.replace(/\W+/g, '-').toLowerCase(),
      headline: headline.value,
      featured: post !== undefined ? post.featured : "",
      published_at: post !== undefined ? post.published_at : "",
      created_at: post !== undefined ? post.created_at : "",
      updated_at: updateAt,
      category: {
        id: category.selectedValue === "programming" ? 1 : category.selectedValue === "networking" ? 2 : 3,
        name: category.selectedValue,
        slug: category.selectedValue
      },
      author: {
        id: user.userId,
        name: user.name,
        avatar: {
          id: 9,
          name: "author-1.png"
        }
      },
      contents: contents.value,
      thumbnail: {
        name: thumb.selectedValue
      }
    };

    title.cekBlank();
    headline.cekBlank();
    contents.cekBlank();
    thumb.cekBlank();
    category.cekBlank();

    // alert(JSON.stringify(data));

    if (title.value !== "" && headline.isBlank === false && contents.isBlank === false && category.isBlank === false && thumb.isBlank === false) {
      updateContent(post !== undefined ? post.id : 0, data).then(() => {
        setRedirect(true);
        history.push("/content")
      });
    }
  };

  useEffect(() => {
    defaultValue(title, post !== undefined ? post.title : "");
    defaultValue(headline, post !== undefined ? post.headline : "");
    defaultValue(contents, post !== undefined ? post.contents : "");
    defaultValue(category, post !== undefined ? post.category.name : "");
    defaultValue(thumb, post !== undefined ? post.thumbnail.name : "");
  })

  const shownModal = () => {
    setShowModal(true);
  }

  const hiddenModal = () => {
    setShowModal(false);
  }

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "thumbnail",
      selectedFile,
      selectedFile.name
    );

    console.log(selectedFile);
    axios.post("http://localhost:4000/uploadImage", formData)
      .then(function (response) {
        console.log(response);
        alert('success upload');
        var data = {
          name: response.data.filename
        }
        addThumbnail(data).then(() => {
          setIsThumbChanged(true);
        });
      }).catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setSelectedFile(null);
      });
  };

  const deleteFileThumb = (name) => {
    var data = {
      filename: name
    };

    console.log(data);
    axios.post("http://localhost:4000/deleteThumb", data)
      .then(function (response) {
        console.log(response);
        setIsThumbChanged(true); 
        alert('success delete');
      }).catch(function (error) {
        console.log(error);
      });
  }

  if (isLoading)
    return (
      <Layout>
        <GetDataLoading />
      </Layout>
    );

  if (isError)
    return (
      <Layout>
        <GetDataError error={isError} />
      </Layout>
    );

  if (redirect) return (
    <Test />
  );

  return (
    <Layout>
      <div className="w-full flex justify-center mx-auto py-2">
        <div className="w-full md:w-6/12 flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input type="text" {...title} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="title" />
              {title.isBlank && <p className="text-red-500 text-xs italic">Title wajib ada.</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Headline
              </label>
              <input type="text" {...headline} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="title" />
              {headline.isBlank && <p className="text-red-500 text-xs italic">Headline wajib ada.</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio" value="networking" {...category} checked={category.selectedValue === "networking" ? true : false} />
                  <span className="ml-2 text-gray-700 ">Networking</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input type="radio" className="form-radio" value="programming" {...category} checked={category.selectedValue === "programming" ? true : false} />
                  <span className="ml-2 text-gray-700 ">Programming</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input type="radio" className="form-radio" value="design" {...category} checked={category.selectedValue === "design" ? true : false} />
                  <span className="ml-2 text-gray-700 ">Design</span>
                </label>
                {category.isBlank && <p className="text-red-500 text-xs italic">Category wajib ada</p>}
              </div>
            </div>
            <button type="button" onClick={shownModal} className="bg-blue-500 mb-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pilih Thumbnail</button>
            <span className="ml-3 text-gray-700">{thumb.selectedValue}</span>
            {thumb.isBlank && <p className="text-red-500 text-xs italic">Thumbnail wajib ada</p>}
            <div className="mb-6 mt-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contents
              </label>
              <textarea {...contents}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10" placeholder="content" />
              {contents.isBlank && <p className="text-red-500 text-xs italic">Contents wajib ada</p>}
            </div>
            <div className="flex items-center justify-between">
              <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="edit" />
            </div>
          </form>
        </div>

        <div className="w-full md:w-6/12 flex justify-center ml-3">
          <div className="bg-white text-gray-700 w-full shadow-md rounded px-8 py-8 mb-4 overflow-y-auto" style={{ maxHeight: '632px' }}>
            {(thumb.selectedValue !== "") &&
              <div className="w-full max-h-xl">
                <img
                  className="rounded object-cover h-full w-full"
                  src={process.env.PUBLIC_URL + `/images/` + thumb.selectedValue}
                  alt="thumbnail"
                />
              </div>
            }
            <h2 className="text-2xl lg:text-3xl text-center">
              {title.value}
            </h2>
            <p className="text-lg mb-4">
              {headline.value}
            </p>
            <ReactMarkdown className="prose text-gray-700">
              {contents.value}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {showModal &&
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full max-w-4xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div className="">
              <div className="overflow-x-auto">

                <div className="inline-flex">
                  <div className="text-center">
                    <label className="rounded block mb-3 py-12 text-center cursor-pointer text-gray-400 hover:text-blue-400 opacity-50 border-solid border-2 border-gray-400 hover:border-blue-400" style={{ height: '180px', width: '200px' }}>
                      <svg className="mx-auto feather feather-image" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <span className="py-6">{selectedFile !== null ? selectedFile.name : "Tambah Thumbnail"}</span>
                      <input type='file' className="hidden" onChange={e => { setSelectedFile(e.target.files[0]); }} />
                    </label>
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 text-sm rounded focus:outline-none focus:shadow-outline" onClick={onFileUpload}>Upload</button>
                  </div>
                  {thumbs.map((thumbnail) => {
                    return (
                      <div className="text-center mb-3 ml-4">
                        <div className="rounded-lg shadow-md bg-gray-100 mb-3 relative" style={{ height: '180px', width: '200px' }}>
                          <img
                            className="rounded object-cover h-full w-full"
                            src={process.env.PUBLIC_URL + `/images/` + thumbnail.name}
                            alt="thumbnail"
                          />
                          <div className="absolute w-full h-full top-0 left-0 rounded bg-black opacity-0 hover:opacity-80 text-center py-5">
                            <button type="button" onClick={e => { removeThumbnail((e.target.value) === undefined ? thumbnail.id : e.target.value).then(() => { deleteFileThumb(thumbnail.name) }); }}
                              className="bg-transparent text-white font-bold py-6 px-5 text-sm rounded focus:outline-none focus:shadow-outline">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-red-800 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <button type="button" value={thumbnail.name} {...thumb} style={thumb.selectedValue === thumbnail.name ? { background: '#ef4444' } : { background: '#3b82f6' }}
                          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-5 text-sm rounded focus:outline-none focus:shadow-outline">Pilih Thumb</button>
                      </div>
                    );
                  })}
                </div>

              </div>
              <button onClick={hiddenModal} style={{ top: '-3rem', right: '0' }} className="absolute bg-white px-3 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                X
              </button>
            </div>
          </div>
        </div>
      }

    </Layout>
  );
};

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const [isBlank, setIsBlank] = useState(false);

  const handleChange = e => {
    setValue(e.target.value);
    if (e.target.value === "") setIsBlank(true);
    else setIsBlank(false);
  }

  const handleBlur = e => {
    if (e.target.value === "") setIsBlank(true);
    else setIsBlank(false);
  }

  const cekBlank = () => {
    if (value === "") setIsBlank(true);
    else setIsBlank(false);
  }

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    isBlank,
    changeValue: (x) => {
      setValue(x);
    },
    cekBlank
  }
}

function defaultValue(name, value) {
  if (!name.isBlank && name.value === "") name.changeValue(value);
  else if (!name.isBlank && name.selectedValue === "") name.changeValue(value)
}

const useFormRadio = (initialValue, initialName) => {
  const [value, setValue] = useState(initialValue);
  const [isBlank, setIsBlank] = useState(false);

  const cekBlank = () => {
    if (value === "") setIsBlank(true);
    else setIsBlank(false);
  }

  const handleClick = e => {
    setValue(e.target.value);
  }

  return {
    name: initialName,
    selectedValue: value,
    onClick: handleClick,
    isBlank,
    changeValue: (x) => {
      setValue(x);
    },
    cekBlank
  }
}

export default Edit;
