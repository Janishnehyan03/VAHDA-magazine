import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";

function AddCategory() {
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await Axios.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteCategory = async (id, name) => {
    try {
      const response = await Axios.delete(`/categories/${id}`);
      if (response.data.success) {
        toast.success(`${name} deleted successfully`, {
          position: "top-center",
          autoClose: 2000,
        });
        getCategories();
      } else {
        toast.error(`${name} could not be deleted`, {
          position: "top-center",
          autoClose: false,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const editCategory = async (id) => {
    try {
      const response = await Axios.patch(`/categories/${id}`, {
        name: name,
      });
      if (response.data.success) {
        toast.success(`${name} edited successfully`, {
          position: "top-center",
          autoClose: 2000,
        });
        getCategories();
      } else {
        toast.error(`${name} could not be edited`, {
          position: "top-center",
          autoClose: false,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await Axios.post("/categories", {
        name,
      });
      if (res.data.success) {
        setLoading(false);
        setname("");
        getCategories();
        toast.success(`category "${name}" created successfully`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: false,
      });
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="ring-1 ring-black ring-opacity-5 bg-white divide-y divide-dashed py-10 mb-4">
            <h1 className="text-center text-3xl font-bold text-blue-900">
              Add Category
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
                        Category Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setname(e.target.value)}
                        value={name}
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
                            onClick={(e) => addCategory(e)}
                            className="inline-block justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Add Category
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
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      {/* all categories in table */}
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="ring-1 ring-black ring-opacity-5 bg-white divide-y divide-dashed py-10 mb-4">
            <h1 className="text-center text-3xl font-bold text-blue-900">
              All Categories
            </h1>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2">Edit </th>
                <th className="px-4 py-2">Delete </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        editCategory(category._id);
                      }}
                      className="inline-block px-3 py-1 text-sm font-medium  text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        deleteCategory(category._id, category.name);
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
    </>
  );
}

export default AddCategory;
