import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CircularProgress } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_0nyx539",
        "template_dly4dni",
        form.current,
        "user_dqjc99JKrROrqbmZMf8RH"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully", {
            position: "top-center",
          });
          setLoading(false);
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          setLoading(false);
          toast.error("Message could not be sent", {
            position: "top-center",
          });
        }
      );
  };
  return (
    <section className="text-gray-600 body-font relative">
      <ToastContainer />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
           Help us to improve... 
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form ref={form} onSubmit={sendEmail}>
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="user_name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    name="user_email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Send
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
