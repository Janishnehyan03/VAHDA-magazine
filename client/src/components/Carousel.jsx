import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    let { data } = await Axios.get("/blogs");
    setBlogs(data.blogs);
  };
  const nextSlide = () => {
    if (current < 5) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };
  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(blogs.length - 1);
    }
  };
  // change current value to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div id="animation-carousel" className="relative" data-carousel="static">
      <div className="overflow-hidden relative h-48  sm:h-64 xl:h-80 2xl:h-96">
        <div className="duration-200 ease-linear absolute inset-0 transition-all transform">
          <Link to={`/post/${blogs[current] && blogs[current]._id}`}>
            <img
              src={blogs[current] ? blogs[current].image : ""}
              className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 ease-linear"
              alt={blogs[current] && blogs[current].title}
            />

            {/* title background with 50% opacity */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
            <h1 className="text-white capitalize text-center  py-2 lg:text-3xl w-full lg:font-bold sm:text-base absolute top-1/2 left-1/2 px-8 -translate-x-1/2 -translate-y-1/2">
              {blogs[current] && blogs[current].title}
            </h1>
          </Link>
        </div>
      </div>
      <button
        type="button"
        className="flex absolute top-0 left-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="flex absolute top-0 right-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="hidden">Next</span>
        </span>
      </button>
    </div>
  );
}

export default Carousel;
