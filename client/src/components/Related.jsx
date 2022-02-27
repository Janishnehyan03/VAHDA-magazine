import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";

function Related({ categoryId, blogId }) {
  const [related, setRelated] = useState([]);
  const getRelated = async () => {
    const { data } = await Axios.get(
      `/blogs/find-exeption/${categoryId}/${blogId}?limit=3`
    );
    setRelated(data.blogs);
  };
  useEffect(() => {
    getRelated();
  }, [categoryId, blogId]);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
            Related Posts
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {related.map((blog, index) => (
            <Link
              to={("/post/", blog._id)}
              className="p-4 lg:w-1/4 md:w-1/2"
              key={index}
            >
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="img"
                  className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                  src={blog.image}
                />
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    {blog.title.length > 30
                      ? blog.title.slice(0, 20) + "..."
                      : blog.title}
                  </h2>
                  <h3 className="text-gray-300 mb-3">
                    {moment(blog.createdAt).format("MMMM Do YYYY")}
                  </h3>
                  <p className="mb-4">{blog.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Related;
