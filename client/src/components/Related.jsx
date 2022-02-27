import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";

function Related({ categoryId, blogId }) {
  const [related, setRelated] = useState([]);
  const getRelated = async () => {
    const { data } = await Axios.post(
      `/blogs/find-exeption/${categoryId}/${blogId}?limit=3`
    );
    setRelated(data.blogs);
  };
  useEffect(() => {
    getRelated();
  }, [categoryId, blogId]);
  return (
    <div className="col-end-7 col-span-2 mt-24">
      <h1 className="text-2xl font-bold my-4">
        Related Posts 
      </h1>
      {related.map((blog, index) => (
        <>
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="object-cover md:h-40 md:w-40"
                src={blog.image}
                alt="img"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
               ✒️ {blog.author}
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                {blog.title}
              </a>
              <p className="mt-2 text-slate-500">
                {moment(blog.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Related;
