import React, { useState, useEffect, useRef } from "react";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Load last uploaded file from localStorage on component mount
  useEffect(() => {
    const savedFileName = localStorage.getItem("lastUploadedFileName");
    if (savedFileName) {
      setFile({ name: savedFileName });
    }
  }, []);

  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFile = (selectedFile) => {
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
      localStorage.setItem("lastUploadedFileName", selectedFile.name);
    } else {
      setFile(null);
      setError("Only PDF or DOCX files are allowed.");
    }
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a valid resume file.");
      return;
    }

    
    console.log("Uploading:", file.name);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Upload Your Resume
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div
          className="border-2 border-dashed border-blue-300 p-6 rounded-lg text-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
        >
          <p className="text-blue-700 font-medium">Drag & drop your resume here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
          <p className="mt-2 text-xs text-gray-500">Accepted formats: .pdf, .docx</p>
        </div>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        {file && (
          <p className="text-sm text-green-600 font-medium">
            Selected: {file.name}
          </p>
        )}

        {error && <p className="text-red-600 font-medium">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
