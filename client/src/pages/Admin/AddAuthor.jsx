import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";

function AddAuthor() {
  const [name, setname] = useState("");
  const [facebookProfile, setFacebookProfile] = useState("");
  const [twitterProfile, setTwitterProfile] = useState("");
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const deleteAuthor = async (id, name) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${name}?`)) {
        let res = await Axios.delete(`/authors/${id}`);
        if (res.data.success) {
          toast.success(`${name} deleted successfully`, {
            position: "top-center",
            autoClose: 2000,
          });
          getAllAuthors();
        } else {
          toast.error(`${name} could not be deleted`, {
            position: "top-center",
            autoClose: false,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addAuthor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/authors", {
        name,
        facebookProfile,
        twitterProfile,
      });
      if (res.data.success) {
        setLoading(false);
        getAllAuthors();
        toast.success(`${name} created successfully`, {
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
  };
  useEffect(() => {
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
                        name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setname(e.target.value)}
                        required
                        value={name}
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
                        Facebook Profile Link
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setFacebookProfile(e.target.value)}
                        required
                        value={facebookProfile}
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
                        Twitter Profile Link
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setTwitterProfile(e.target.value)}
                        required
                        value={twitterProfile}
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      type="submit"
                      onClick={(e) => addAuthor(e)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Author
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
      {/* all authors' table */}
      <div className="mt-10 sm:mt-0">
        <div className="md:grid grid-cols-1">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            all authors
          </h1>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    name
                  </th>
                  <th className="px-5 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    facebook profile
                  </th>
                  <th className="px-5 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    twitter profile
                  </th>
                  <th className="px-5 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author._id}>
                    <td className="px-5 py-5 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {author.name}
                      </div>
                    </td>
                    <td className="px-5 py-5 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        <a
                          href={author.facebookProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {author.facebookProfile}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-5 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        <a
                          href={author.twitterProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {author.twitterProfile}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-5 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <div className="flex justify-end">
                        <button
                          onClick={() => deleteAuthor(author._id, author.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAuthor;
