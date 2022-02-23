import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    //  overview of the project
    <div className="flex flex-col h-screen">
      <div className="ring-1 ring-black ring-opacity-5 bg-white divide-y divide-dashed py-10 mb-4">
        <h1 className="text-center text-3xl font-bold text-blue-900">
          VAHDA Dashboard
        </h1>
      </div>
      {/* 3 card for create post , manage authors, categories */}
      <div className="flex flex-wrap justify-center">
        <div className="w-full max-w-sm mx-4 my-2">
          <div className="flex flex-col break-words bg-white border-2 rounded shadow-md">
            <div className="flex justify-center border-b-2 p-3">
              <Link
                to={"/create-post"}
                className="font-bold text-xl mb-0 bg-gray-900 py-2 px-4 text-white"
              >
                Create Post
              </Link>
            </div>
            <div className="flex-1 p-6">
              <Link
                to={"/all-posts/"}
                className="text-indigo-500 inline-flex items-center mt-3"
              >
                view posts
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
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm mx-4 my-2">
          <div className="flex flex-col break-words bg-white border-2 rounded shadow-md">
            <div className="flex justify-center border-b-2 p-3">
              <Link
                to={"/create-category"}
                className="font-bold text-xl mb-0 bg-gray-800 py-2 px-4 text-white"
              >
                Create Category
              </Link>
            </div>
            <div className="flex-1 p-6">
            <Link
                to={"/create-category/"}
                className="text-indigo-500 inline-flex items-center mt-3"
              >
                view categories
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
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm mx-4 my-2">
          <div className="flex flex-col break-words bg-white border-2 rounded shadow-md">
            <div className="flex justify-center border-b-2 p-3">
              <Link
                to={"/create-author"}
                className="font-bold text-xl mb-0 bg-gray-800 py-2 px-4 text-white"
              >
                Create Author
              </Link>
            </div>
            <div className="flex-1 p-6">
              <Link
                to={"/all-authors/"}
                className="text-indigo-500 inline-flex items-center mt-3"
              >
                view authors 
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
