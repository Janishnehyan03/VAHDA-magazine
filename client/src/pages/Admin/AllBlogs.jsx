import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteBlog = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        let res = await Axios.delete(`/blogs/${id}`);
        if (res.data.success) {
          getAllBlogs();
          toast.success(`${name} deleted successfully`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(`${name} could not be deleted`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };
  const getAllBlogs = async () => {
    const { data } = await Axios.get("/blogs");
    setBlogs(data.blogs);
    setLoading(false);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <h1 className="text-center text-blue-600 text-4xl font-bold uppercase my-8">
        All Posts
      </h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Price
                  </th>
                  <th scope="col" className="relative py-3 px-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && <div className="text-center">Loading...</div>}
                {!loading &&
                  blogs.map((blog, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {blog.title.substring(0, 20)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {blog.category && blog.category.name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {blog.author && blog.author}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        <Link
                          to={"/edit-post/" + blog._id}
                          className="text-blue-400 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={() => deleteBlog(blog._id, blog.title)}
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBlogs;
