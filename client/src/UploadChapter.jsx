import React from "react";
import { useNavigate } from "react-router-dom";
const UploadChapter = () => {
  const navigate = useNavigate();
  const handleAddChapter = (formData) => {
    const token = localStorage.getItem('jwtToken'); // or use your method of retrieving the token
    
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
  
    fetch(`${import.meta.env.VITE_BACKEND_URL}/files/upload`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,  // Correct way to add token
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to upload chapter");
        alert("Chapter added successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to upload chapter.");
      });
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => window.history.back()} // Navigate back
        >
          &#10005; {/* Close button */}
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add New Chapter
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleAddChapter(formData);
          }}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload PDF
            </label>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md text-center font-semibold"
          >
            Add Chapter
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadChapter;