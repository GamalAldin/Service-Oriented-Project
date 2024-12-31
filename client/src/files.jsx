


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Files = () => {
//   const [chapters, setChapters] = useState([]);
//   const [filteredChapters, setFilteredChapters] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchChapters();
//   }, []);

//   const fetchChapters = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/files`);
//       if (!response.ok) throw new Error("Failed to fetch chapters");
//       const data = await response.json();
//       setChapters(data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (searchQuery) {
//       setFilteredChapters(
//         chapters.filter((chapter) =>
//           chapter.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredChapters(chapters);
//     }
//   }, [searchQuery, chapters]);

//   const handleChapterClick = async (chapterId) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/files/${chapterId}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch PDF");
//       const pdfBlob = await response.blob();
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       window.open(pdfUrl, "_blank");
//     } catch (error) {
//       console.error("Error fetching PDF:", error);
//       alert("Failed to load PDF.");
//     }
//   };

//   const handleDeleteChapter = (chapterId) => {
//     fetch(`${import.meta.env.VITE_BACKEND_URL}/files/${chapterId}`, {
//       method: "DELETE",
//     }).then(() => {
//       setChapters((prev) => prev.filter((ch) => ch._id !== chapterId));
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-md">
//       <h1 className="text-lg font-semibold">Course Details</h1>
//       <div className="flex justify-between items-center mb-4">
//         <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
//           <img src="/search.png" alt="Search Icon" width={14} height={14} />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-[200px] p-2 bg-transparent outline-none"
//           />
//         </div>
//         <button
//           onClick={() => navigate("/upload")}
//           className="bg-blue-500 text-white p-2 rounded-md"
//         >
//           + Add New Chapter
//         </button>
//       </div>

//       <table className="w-full mt-4">
//         <thead>
//           <tr className="text-left text-gray-500 text-sm">
//             <th>Chapter Title</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredChapters.map((chapter) => (
//             <tr
//               key={chapter._id}
//               className="hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleChapterClick(chapter._id)}
//             >
//               <td>{chapter.name || "Untitled Chapter"}</td>
//               <td>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteChapter(chapter._id);
//                   }}
//                   className="text-red-500"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Files;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Files = () => {
  const [chapters, setChapters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchChapters();
  }, []);
  const token = localStorage.getItem('jwtToken'); // or use your method of retrieving the token
    
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
  const fetchChapters = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/files`,
 {       headers: {
          'Authorization': `Bearer ${token}`,  // Correct way to add token
        },}
      );
      if (!response.ok) throw new Error("Failed to fetch chapters");
      const data = await response.json();
      setChapters(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChapterClick = async (chapterId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/files/stream/${chapterId}`,
        {       headers: {
                 'Authorization': `Bearer ${token}`,  // Correct way to add token
               },}
      );
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error fetching PDF:", error);
      alert("Failed to load PDF.");
    }
  };

  const handleDeleteChapter = (chapterId) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/files/${chapterId}`, {
      method: "DELETE",
             headers: {
               'Authorization': `Bearer ${token}`,  // Correct way to add token
             },
    }).then(() => {
      setChapters((prev) => prev.filter((ch) => ch._id !== chapterId));
    });
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Course Details</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm"
          />
        </div>
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
        >
          + Add New Chapter
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Chapter Title
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr
              key={chapter._id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleChapterClick(chapter._id)}
            >
              <td className="border border-gray-200 px-4 py-2">
                {chapter.filename || "Untitled Chapter"}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChapter(chapter._id);
                  }}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Files;