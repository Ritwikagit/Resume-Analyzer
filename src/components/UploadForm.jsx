import React, { useState } from "react";

const UploadForm = ({ setParsedData, setAnalyzedCount }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Only PDF or DOCX files are allowed.");
    }
  };

  
  const handleUpload = () => {
    if (!file) {
      setError("Please select a resume file first.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Dummy parsed data
      const dummyData = {
        name: "Ritwika Maity",
        email: "maityritwika79@gmail.com",
        phone: "6297780734",
        skills: ["React", "JavaScript", "SpringBoot"],
        experience: ["Software Engineer at XYZ", "Frontend Developer at ABC"],
        education: ["BTech in Computer Science and Engineering"],
      };
      setParsedData(dummyData);
      setAnalyzedCount((prev) => prev + 1);
      setLoading(false);
      setError("");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="mb-4"
      />
<p className="text-sm text-gray-500 mb-4">
        Only PDF and DOCX files are supported.
      </p>
      {file && <p>Selected file: {file.name}</p>}

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </div>
  );
};

export default UploadForm;
