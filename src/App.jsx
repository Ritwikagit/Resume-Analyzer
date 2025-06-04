import React, { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import ParsedResult from "./components/ParsedResult";
import "./index.css";

const App = () => {
  const [parsedData, setParsedData] = useState(null);
  const [analyzedCount, setAnalyzedCount] = useState(0);
  const [lastFileName, setLastFileName] = useState("");

  useEffect(() => {
    const savedCount = localStorage.getItem("analyzedCount");
    if (savedCount) setAnalyzedCount(Number(savedCount));

    // const savedParsedData = localStorage.getItem("parsedData");
    // if (savedParsedData) setParsedData(JSON.parse(savedParsedData));

    const savedFileName = localStorage.getItem("lastUploadedFileName");
    if (savedFileName) setLastFileName(savedFileName);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gradient bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          📄 Resume Analyzer
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Upload a resume to get instant analysis
        </p>
      </div>

      <UploadForm
        setParsedData={setParsedData}
        setAnalyzedCount={setAnalyzedCount}
        setLastFileName={setLastFileName}
      />

      <div className="mt-4 text-sm text-gray-600">
        {lastFileName && (
          <p>
            <strong>Previously uploaded file was:</strong>{" "}
            <span className="text-blue-700 font-medium">{lastFileName}</span>
          </p>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-500">
        Resumes analyzed this session:{" "}
        <span className="font-semibold">{analyzedCount}</span>
      </div>

      {parsedData && <ParsedResult data={parsedData} />}
    </div>
  );
};

export default App;
