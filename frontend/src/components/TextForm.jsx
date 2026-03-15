"use client";

import axios from "axios";
import { useRef } from "react";


const TextForm = () => {
  const textArea1Ref = useRef("");
  const textArea2Ref = useRef("");
  const similarityScoreRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("/api/v1/similarity-score", {
      text1: textArea1Ref.current.value,
      text2: textArea2Ref.current.value,
    })
    .then(response => {
      similarityScoreRef.current.textContent = response.data.data.similarityScore * 100 + "%";
      console.log("Similarity Score:", response.data.data.similarityScore);
    })
    .catch(error => {
      console.error("Error calculating similarity score:", error);
    });
  };

  return (
    <div className="p-4">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="w-100 flex gap-4">
          <textarea
            ref={textArea1Ref}
            className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter text 1..."
          ></textarea>
          <textarea
            ref={textArea2Ref}
            className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter text 2..."
          ></textarea>
        </div>
        <button className="border rounded-lg cursor-pointer">
          Compare
        </button>
        <p>
          Similarity Score: <span ref={similarityScoreRef}></span>
        </p>
      </form>
    </div>
  )
}

export default TextForm