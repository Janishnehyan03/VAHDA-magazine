import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../Axios";
import moment from "moment";

function SingleBlog() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const getPost = async () => {
    const { data } = await Axios.get(`/blogs/${id}`);
    setPost(data.blog);
  };
  useEffect(() => {
    getPost();
  }, [id]);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-96 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src={post.image}
            />
          </div>
          <p className="text-center text-gray-500 text-xs tracking-widest uppercase my-4">
            {moment(post.createdAt).format("MMMM Do YYYY")}
          </p>
          <div class="px-6 pt-4 pb-2">
            {post.category && (
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
                <Link to={`/category/${post.category._id}`}>
                  {post.category.name}
                </Link>
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  {post.author ? post.author : ""}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                <p className="text-base">
                  {post.author ? post.authorDetails : ""}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-2xl font-medium title-font mb-text-5 mb-8 text-center">
                {post.title}
              </h1>

              {post.category && post.category.name === "poems" ? (
                <div className="flex flex-col sm:flex-row justify-center items-center text-center">
                  <p
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center items-center">
                  <p
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="text-gray-600"
                  ></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleBlog;
