import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "../Axios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(blogs);

  const getBlogs = async () => {
    setLoading(true);
    try {
      let res = await Axios.get("/blogs");
      if (res.data.success) {
        setBlogs(res.data.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          {blogs.map((blog, index) => (
            <div className="rounded overflow-hidden shadow-lg sm:relative md:relative">
              <img
                className="w-full"
                src="https://picsum.photos/600/400/?random"
                alt="Mountain"
              />
              {/* author name on left of card */}
              <div class="px-6 pt-4 pb-2">
                {blog.author && (
                  <span class="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {blog.author.name}
                  </span>
                )}
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">
                  {blog.title}
                </div>
                <p className="text-gray-700">
                  {blog.content.length > 100
                    ? blog.content.substring(0, 100) + "  ..."
                    : blog.content}
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                {blog.category && (
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {blog.category.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Blogs;
