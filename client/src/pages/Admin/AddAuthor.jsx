import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useEffect } from "react";
import axios from "axios";

function AddAuthor() {
  const [name, setname] = useState("");
  const [facebookProfile, setFacebookProfile] = useState("");
  const [twitterProfile, setTwitterProfile] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const binaryData = new Blob([image], { type: "image/jpeg" });

  const sendToCloudinary = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "mern-chat");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/mern-chat/image/upload",
        formData
      );
      const { secure_url } = res.data;
      setImage(secure_url);
      setImageLoading(false);
      setLoading(false);
      return secure_url;
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const addAuthor = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image) {
      try {
        let res = await Axios.post("/authors", {
          name,
          facebookProfile,
          twitterProfile,
          description,
        });
        if (res.data.success) {
          setLoading(false);
          setname("");
          setFacebookProfile("");
          setTwitterProfile("");
          setDescription("");
          setImage(null);
          toast.success(`${name} created successfully`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: false,
        });
        setLoading(false);
      }
    }
    let imageResponse = await sendToCloudinary(e);
    if (imageResponse) {
      try {
        let res = await Axios.post("/authors", {
          name,
          facebookProfile,
          twitterProfile,
          description,
          image: imageResponse,
        });
        if (res.data.success) {
          setLoading(false);
          setname("");
          setFacebookProfile("");
          setTwitterProfile("");
          setDescription("");
          setImage(null);
          toast.success(`${name} created successfully`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: false,
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(binaryData);
      setImagePreview(objectUrl);
    } else {
      setImagePreview("");
    }
  }, [image]);
  return (
    <>
      <ToastContainer />
      <div className="mt-10 sm:mt-0">
        <div className="md:grid grid-cols-1">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            create post
          </h1>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 ml-6">
              <img
                src={imagePreview}
                className="rounded-full w-20 h-20"
                alt=""
              />
            </div>
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setname(e.target.value)}
                        required
                        value={name}
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        value={description}
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Facebook Profile Link
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setFacebookProfile(e.target.value)}
                        required
                        value={facebookProfile}
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Twitter Profile Link
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setTwitterProfile(e.target.value)}
                        required
                        value={twitterProfile}
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file"
                              type="file"
                              className="sr-only"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </label>

                          <p className="pl-1">or drag and drop</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {imageLoading && <LinearProgress />}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      type="submit"
                      onClick={(e) => addAuthor(e)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Author
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}

export default AddAuthor;
