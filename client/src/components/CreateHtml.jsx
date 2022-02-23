import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";

function CreateHtml() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [copyOn, setCopyOn] = useState(false);
  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCopyOn(!copyOn);
          }}
        >
          Convert to HTML
        </button>
      </div>
      {copyOn && (
        <div className="text-center">
          <textarea
            className="bg-gray-200 border border-gray-400 rounded-lg px-4 py-2 text-gray-700 mb-4"
            value={html}
            readOnly
          />
        </div>
      )}
      {copyOn && (
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigator.clipboard.writeText(html);
              setCopyOn(false);
            }}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateHtml;
