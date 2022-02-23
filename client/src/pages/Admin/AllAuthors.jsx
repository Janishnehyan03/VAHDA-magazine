import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";

function AllAuthors() {
  const [authors, setAuthors] = useState([]);

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
  useEffect(() => {
    getAllAuthors();
  }, []);
  return (
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
                  Image
                </th>
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
                    <img
                      src={author.image}
                      alt=""
                      className="w-20 h-20 rounded-full"
                    />
                  </td>
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
  );
}

export default AllAuthors;
