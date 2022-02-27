import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";

function CreateHtml() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  function copyToClipboard() {
    navigator.clipboard.writeText(html);
    alert("HTML Code Copied to clipboard");
  }

  return (
    <div className="min-h-screen">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder="Enter your content here"
      />
      <div className="bg-black h-2 w-full"></div>
      <p>{html}</p>
      <div className="text-center mt-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            copyToClipboard();
          }}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default CreateHtml;
