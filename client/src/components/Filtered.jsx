import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../Axios";

function Filtered() {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const getCategory = async () => {
    let { data } = await Axios.get("/categories/" + id);
    setCategory(data.category);
  };
  const getPosts = async () => {
    let { data } = await Axios.get("/blogs/category/" + id);
    console.log(data);
    setPosts(data.blogs);
  };

  useEffect(() => {
    getCategory();
    getPosts();
  }, [id]);
  return (
    <div className="container">
      <h1 className="text-center text-blue-600 text-4xl font-bold mt-4 uppercase">
        {category.name}
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {posts.map((post, index) => (
              <Link
                to={"/post/" + post._id}
                className="p-4 md:w-1/3 sm:mb-0 mb-6"
                key={index}
              >
                <div className="rounded-lg h-64 overflow-hidden">
                  <img
                    alt="content"
                    className="w-full h-64 object-cover object-center"
                    src={post.image}
                  />
                </div>
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5 text-center">
                  {post.title.length > 50
                    ? post.title.substring(0, 50) + "..."
                    : post.title}
                </h2>
                <div class="px-6">
                  <h2 className="font-sm text-gray-400 mt-5 text-center">
                   ✒️ {post.author}
                  </h2>
                </div>

                <div className="text-indigo-500 inline-flex items-center mt-3">
                  view post
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Filtered;
