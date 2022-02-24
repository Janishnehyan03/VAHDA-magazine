import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";

function AddVideo() {
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const response = await Axios.get("/videos");
      setVideos(response.data.videos);
    } catch (error) {
      console.log(error.response);
    }
  };
  const editVideo = async (id) => {
    try {
      const response = await Axios.patch(`/videos/${id}`, {
        title,
        videoId,
      });
      if (response.data.success) {
        toast.success(`${title} edited successfully`, {
          position: "top-center",
          autoClose: 2000,
        });
        getVideos();
      } else {
        toast.error(`${title} could not be edited`, {
          position: "top-center",
          autoClose: false,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteVideo = async (id, title) => {
    try {
      const response = await Axios.delete(`/videos/${id}`);
      if (response.data.success) {
        toast.success(`${title} deleted successfully`, {
          position: "top-center",
          autoClose: 2000,
        });
        getVideos();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const addVideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Axios.post("/videos", {
        title,
        videoId,
      });
      if (data.success) {
        setTitle("");
        setVideoId("");
        setLoading(false);
        getVideos()
        toast.success("Video added successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Video could not be added", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div className="mt-10 sm:mt-0">
      <ToastContainer />
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="ring-1 ring-black ring-opacity-5 bg-white divide-y divide-dashed py-10 mb-4">
          <h1 className="text-center text-3xl font-bold text-blue-900">
            Add Video
          </h1>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Video Title
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      name="name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 py-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Video ID{" "}
                      <span className="text-gray-500">
                        (https://www.youtube.com/watch?v=
                        <span className="text-indigo-500">On8SEVbPpP8</span>)
                      </span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setVideoId(e.target.value)}
                      value={videoId}
                      name="name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 py-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <button
                          type="submit"
                          onClick={(e) => addVideo(e)}
                          className="inline-block justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Add Video
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="ring-1 ring-black ring-opacity-5 bg-white divide-y divide-dashed py-10 mb-4">
            <h1 className="text-center text-3xl font-bold text-blue-900">
              All Videos 
            </h1>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">video Name</th>
                <th className="px-4 py-2">Edit </th>
                <th className="px-4 py-2">Delete </th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  <td className="border px-4 py-2">{video.title}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        editVideo(video._id);
                      }}
                      className="inline-block px-3 py-1 text-sm font-medium  text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        deleteVideo(video._id, video.title);
                      }}
                      className="inline-block px-3 py-1 text-sm font-medium  text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
  );
}

export default AddVideo;
