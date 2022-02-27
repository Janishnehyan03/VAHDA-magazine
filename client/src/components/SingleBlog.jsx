import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../Axios";
import { CircularProgress } from "@material-ui/core";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [related, setRelated] = useState([]);
  const { id } = useParams();
  const getBlog = async () => {
    let { data } = await Axios.get(`/blogs/${id}`);
    setBlog(data.blog);
  };
  const getRelated = async () => {
    let { data } = await Axios.post(
      `/blogs/find-exeption/${blog.category._id}/${id}`
    );
    setRelated(data.blogs);
  };

  useEffect(() => {
    getBlog();
    getRelated();
  }, [id]);
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 row-gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <img src={blog.image} alt="img" className="my-4" />
          <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
            {moment(blog.createdAt).format("MMMM Do YYYY")}
          </p>
          <div className="flex items-center">
            <div>
              <p className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400">
                ✒️ {blog.author}
              </p>
            </div>
          </div>
          <div className="mb-3">
            <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-4xl xl:text-5xl">
              {blog.title}
            </p>
          </div>
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
        {related.length > 0 ? (
          <div className="flex flex-col space-y-8 lg:col-span-1">
            {related.map((post, index) => (
              <div key={index}>
                <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  {moment(post.createdAt).format("MMMM Do YYYY")}
                </p>
                <div className="mb-3">
                  <Link
                    to={`/post/${post._id}`}
                    className="inline-block text-blue-500 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    <img src={post.image} alt="" />
                    <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
                      {post.title}
                    </p>
                  </Link>
                </div>

                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400">
                      ✒️ {post.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Blog;
