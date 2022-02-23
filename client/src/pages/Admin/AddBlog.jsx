import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import axios from "axios";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useEffect } from "react";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState("");
  const [author, setAuthor] = useState("");
  const [authors, setAuthors] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [showAuthorInput, setShowAuthorInput] = useState(false);

  const getAllCategories = async () => {
    try {
      let res = await Axios.get("/categories");
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllAuthors = async () => {
    try {
      let res = await Axios.get("/authors");
      if (res.data.success) {
        setAuthors(res.data.authors);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendToCloudinary = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "mern-chat");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/mern-chat/image/upload",
        formData
      );
      const { secure_url } = res.data;
      setImage(secure_url);
      setImageLoading(false);
      setLoading(false);
      return secure_url;
    } catch (error) {
      console.log(error.response);
      setImageLoading(false);
    }
  };
  const addBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageResponse = await sendToCloudinary(e);
    if (imageResponse) {
      try {
        let res = await Axios.post("/blogs", {
          title,
          content,
          image: imageResponse,
          category,
          author,
        });
        if (res.data.success) {
          setAuthor("");
          setCategory("");
          setContent("");
          setTitle("");
          setImage(null);
          toast.success(`${title} created successfully`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: false,
        });
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getAllCategories();
    getAllAuthors();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="mt-10 sm:mt-0">
        <div className="md:grid grid-cols-1">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            create post
          </h1>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        value={title}
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option
                          value=""
                          disabled
                          selected
                          hidden
                          className="text-gray-600"
                        >
                          Select Category
                        </option>
                        {categories &&
                          categories.map((category) => (
                            <option
                              className="text-gray-600 w-full py-4"
                              value={category._id}
                            >
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Author Name
                      </label>
                      {showAuthorInput === "true" ? (
                        <input
                          type="text"
                          onChange={(e) => setAuthor(e.target.value)}
                          required
                          value={author}
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      ) : (
                        <select
                          onChange={(e) => setAuthor(e.target.value)}
                          value={author}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                          <option
                            value=""
                            disabled
                            selected
                            hidden
                            className="text-gray-600"
                          >
                            Select Author
                          </option>
                          {authors &&
                            authors.map((author) => (
                              <option
                                className="text-gray-600 w-full py-4"
                                value={author._id}
                              >
                                {author.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        select author type
                      </label>
                      <select
                        onChange={(e) => setShowAuthorInput(e.target.value)}
                        value={showAuthorInput}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-500 text-white"
                      >
                        <option
                          value=""
                          disabled
                          selected
                          hidden
                          className="text-gray-600"
                        >
                          Select Author Type
                        </option>
                        <option
                          className="text-gray-600 w-full py-4"
                          value={true}
                        >
                          Create New Author
                        </option>
                        <option
                          className="text-gray-600 w-full py-4"
                          value={false}
                        >
                          Select Author
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file"
                              type="file"
                              className="sr-only"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </label>

                          <p className="pl-1">or drag and drop</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {imageLoading && <LinearProgress />}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <textarea
                      type="text"
                      id="first-name"
                      autoComplete="given-name"
                      onChange={(e) => setContent(e.target.value)}
                      style={{ whiteSpace: "pre-wrap", height: "200px" }}
                      value={content}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-32"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      type="submit"
                      onClick={(e) => addBlog(e)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}

export default AddBlog;
