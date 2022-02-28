import React from "react";

function LaunchBtn() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <a href="https://vahda.herokuapp.com/" target={'_blank'}>
          <button className="bg-gray-600 text-white px-12 text-3xl font-bold py-8 rounded-lg hover:bg-gray-900">
            Launch
          </button>
        </a>
      </div>
    </div>
  );
}

export default LaunchBtn;
