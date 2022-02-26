import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useEffect } from "react";

function AddAuthor() {
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorSections, setAuthorSections] = useState([]);

  const addAuthor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/authors/author-section", { name });
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
        setname("");
        getAuthorSections();
        toast.success("Author Section Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  const getAuthorSections = async () => {
    try {
      let res = await Axios.get("/authors/author-section");
      if (res.data.success) {
        setLoading(false);
        setAuthorSections(res.data.authorSection);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSection = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this section?")) {
        let res = await Axios.delete(`/authors/author-section/${id}`);
        if ('Delete Successfully') {
          toast.success(res.data.message);
          getAuthorSections();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAuthorSections();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="mt-10 sm:mt-0">
        <div className="md:grid grid-cols-1">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            create author section
          </h1>
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
                  </div>
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
                      Create Section
                    </button>
                  )}
                </div>
              </div>
            </form>
            <div className="mt-10">
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                Author Sections
              </h1>
              <div className="mt-5">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {authorSections.map((authorSection, index) => (
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {authorSection.name}
                          </label>
                          {/* edit button */}
                          <button
                            onClick={() => deleteSection(authorSection._id)}
                            type="submit"
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
