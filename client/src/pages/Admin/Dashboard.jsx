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
              <Link to={'/create-post'} className="font-bold text-xl mb-0 bg-gray-700 py-2 px-4 text-white">Create Post</Link>
            </div>
            <div className="flex-1 p-6">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm mx-4 my-2">
          <div className="flex flex-col break-words bg-white border-2 rounded shadow-md">
            <div className="flex justify-center border-b-2 p-3">
              <Link to={'/create-category'} className="font-bold text-xl mb-0 bg-orange-800 py-2 px-4 text-white">Create Category</Link>
            </div>
            <div className="flex-1 p-6">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm mx-4 my-2">
          <div className="flex flex-col break-words bg-white border-2 rounded shadow-md">
            <div className="flex justify-center border-b-2 p-3">
              <Link to={'/create-author'} className="font-bold text-xl mb-0 bg-blue-800 py-2 px-4 text-white">Create Author</Link>
            </div>
            <div className="flex-1 p-6">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
