import React, { useState, useEffect, useRef } from "react";
import {
  FiUpload,
  FiDownload,
  FiImage,
  FiCpu,
  FiCheck,
  FiX,
} from "react-icons/fi";
import GenerateImage from "./api/generate-image";
import StatusService from "./api/status-service";

import cosmo from "./filters/cosmo.json";
import elle from "./filters/elle.json";
import gq from "./filters/gq.json";
import harperLuxe from "./filters/harper-luxe.json";
import runawayMatte from "./filters/runaway-matte.json";
import vogue from "./filters/vogue.json";

const FILTERS = [
  { name: "Cosmopoliton", data: cosmo },
  { name: "GQ", data: gq },
  { name: "Vogue", data: vogue },
  { name: "Elle", data: elle },
  { name: "Runaway Matte", data: runawayMatte },
  { name: "Harper Luxe", data: harperLuxe },
];

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusUrl, setStatusUrl] = useState(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    // Check for saved image in localStorage if desired, or start empty
    const savedImage = localStorage.getItem("selectedImage");
    if (savedImage) setSelectedImage(savedImage);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSelectedImage(base64String);
        localStorage.setItem("selectedImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    const apiToken = import.meta.env.VITE_API_TOKEN;
    if (!apiToken) {
      alert("API Token not found in environment variables (VITE_API_TOKEN)");
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Call Generate Image API
      // If selectedImage exists, pass it as an array, otherwise pass undefined/empty
      const images = selectedImage ? [selectedImage] : undefined;
      const genData = await GenerateImage(
        activeFilter.data.prompt,
        images,
        apiToken
      );

      if (!genData.status_url) {
        throw new Error("No status URL returned from generation API");
      }

      setStatusUrl(genData.status_url);
      setShowDownloadDialog(true);
    } catch (error) {
      console.error(error);
      alert("Generation failed: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!statusUrl) return;

    const apiToken = import.meta.env.VITE_API_TOKEN;
    setIsDownloading(true);

    try {
      // 2. Poll Status Service
      const finalImageUrl = await StatusService(statusUrl, apiToken);

      // 3. Fetch and trigger download
      const imageResponse = await fetch(finalImageUrl);
      const blob = await imageResponse.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowDownloadDialog(false);
      setStatusUrl(null);
      localStorage.clear();
    } catch (error) {
      console.error(error);
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F8FF] flex flex-col items-center justify-center p-6 md:p-10 font-sans text-[#1C1E2A]">
      {/* Hidden Canvas for saving */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#6A5BFF] tracking-tight flex items-center gap-3">
              <FiImage className="text-3xl" />
              Mag Edit
            </h1>
            <p className="text-[#5D5F75] mt-2 text-lg">
              AI-Powered Magazine-Styled Image Editor
            </p>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-2 bg-[#FFFFFF] border border-[#E0E4FF] rounded-full text-[#5D5F75] text-sm font-medium shadow-sm">
              v1.0.0
            </span>
          </div>
        </header>

        <main className="flex flex-col lg:flex-row gap-8 h-full items-start">
          {/* Left Side: Upload & Preview */}
          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="w-full aspect-[4/5] md:h-[600px] border-2 border-dashed border-[#E0E4FF] rounded-2xl flex items-center justify-center bg-[#FFFFFF] overflow-hidden relative shadow-sm hover:border-[#6A5BFF] transition-colors group">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-[#5D5F75] group-hover:text-[#6A5BFF] transition-colors">
                  <FiUpload className="text-5xl opacity-50" />
                  <span className="text-xl font-medium">Upload Image</span>
                </div>
              )}

              {/* Loading Overlay */}
              {isGenerating && (
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                  <div className="w-16 h-16 border-4 border-[#E0E4FF] border-t-[#6A5BFF] rounded-full animate-spin mb-4"></div>
                  <div className="text-[#6A5BFF] text-xl font-bold animate-pulse">
                    Processing...
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isGenerating}
              />
            </div>
            <div className="flex justify-between items-center px-2">
              <p className="text-[#5D5F75] text-sm flex items-center gap-2">
                <FiUpload /> Click area to upload or drag and drop
              </p>
              {selectedImage && (
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    localStorage.removeItem("selectedImage");
                  }}
                  className="text-[#FF5B5B] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  <FiX /> Remove
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Controls */}
          <div className="flex-1 w-full flex flex-col gap-8 bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#E0E4FF]">
            <div>
              <h2 className="text-2xl font-bold text-[#1C1E2A] mb-2 flex items-center gap-2">
                Select Style
              </h2>
              <p className="text-[#5D5F75] mb-6">
                Choose a magazine aesthetic for your image.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {FILTERS.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(filter)}
                    className={`py-4 px-4 rounded-xl font-semibold transition-all duration-200 border-2 flex flex-col items-center gap-2 text-center
                            ${
                              activeFilter.name === filter.name
                                ? "bg-[#6A5BFF]/5 border-[#6A5BFF] text-[#6A5BFF] shadow-md scale-[1.02]"
                                : "bg-[#FFFFFF] border-[#E0E4FF] text-[#5D5F75] hover:border-[#6A5BFF] hover:text-[#6A5BFF]"
                            }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-[#E0E4FF]">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !selectedImage}
                className="w-full py-5 bg-[#6A5BFF] text-white text-xl font-bold rounded-xl hover:bg-[#5748F9] transition-all shadow-lg shadow-[#6A5BFF]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FiCpu className="text-2xl" /> Generate with AI
                  </>
                )}
              </button>
              {!selectedImage && (
                <p className="text-center text-[#5D5F75] text-sm mt-3">
                  Please upload an image to start generating.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Download Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 bg-[#1C1E2A]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col items-center gap-6 border border-[#E0E4FF] animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-[#3CEFA3]/10 rounded-full flex items-center justify-center text-[#3CEFA3] text-3xl mb-2">
              <FiCheck />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#1C1E2A] mb-2">
                Image Ready!
              </h2>
              <p className="text-[#5D5F75]">
                Your magazine-style masterpiece has been generated successfully.
              </p>
            </div>

            <div className="flex gap-4 w-full mt-4">
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="flex-1 py-3 px-6 border border-[#E0E4FF] text-[#5D5F75] font-semibold rounded-xl hover:bg-[#F7F8FF] transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 py-3 px-6 bg-[#6A5BFF] text-white font-bold rounded-xl hover:bg-[#5748F9] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#6A5BFF]/20"
              >
                {isDownloading ? (
                  "Downloading..."
                ) : (
                  <>
                    <FiDownload /> Download
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
