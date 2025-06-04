import React, { useState, useRef } from "react";

const UploadForm = ({ setParsedData, setAnalyzedCount, setLastFileName }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFile = (selectedFile) => {
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Only PDF or DOCX files are allowed.");
    }
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a resume file first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const dummyData = {
        name: "Ritwika Maity",
        email: "maityritwika79@gmail.com",
        phone: "6297780734",
        skills: ["React", "JavaScript", "SpringBoot"],
        experience: ["Software Engineer at XYZ", "Frontend Developer at ABC"],
        education: ["BTech in Computer Science and Engineering"],
      };

      setParsedData(dummyData);
      localStorage.setItem("parsedData", JSON.stringify(dummyData));

      setAnalyzedCount((prev) => {
        const updated = prev + 1;
        localStorage.setItem("analyzedCount", updated);
        return updated;
      });

      localStorage.setItem("lastUploadedFileName", file.name);
      setLastFileName(file.name);

      setLoading(false);
      setError("");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

      <div
        className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition ${
          isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"
        }`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-blue-600 font-medium">Drag & drop your resume here</p>
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
        <p className="mt-4 text-green-700 text-sm font-medium">
          Selected file: {file.name}
        </p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </div>
  );
};

export default UploadForm;
