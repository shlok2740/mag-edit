import React, { useState, useEffect, useRef } from "react";
import {
  FiUpload,
  FiDownload,
  FiImage,
  FiCpu,
  FiCheck,
  FiX,
  FiCrop,
  FiEdit2,
  FiLayers,
  FiSliders,
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiShare2,
  FiSettings,
  FiArrowLeft,
  FiGrid,
  FiTrash2,
} from "react-icons/fi";
import GenerateImage from "./api/generate-image";
import StatusService from "./api/status-service";

import cosmo from "./filters/cosmo.json";
import elle from "./filters/elle.json";
import gq from "./filters/gq.json";
import harperLuxe from "./filters/harper-luxe.json";
import runawayMatte from "./filters/runaway-matte.json";
import vogue from "./filters/vogue.json";
import w from "./filters/w.json";
import glamour from "./filters/glamour.json";
import vanityFair from "./filters/vanity-fair.json";
import instyle from "./filters/instyle.json";

const FILTERS = [
  { name: "Cosmopolitan", data: cosmo },
  { name: "GQ", data: gq },
  { name: "Vogue", data: vogue },
  { name: "Elle", data: elle },
  { name: "Runaway Matte", data: runawayMatte },
  { name: "Harper Luxe", data: harperLuxe },
  { name: "W", data: w },
  { name: "Glamour", data: glamour },
  { name: "Vanity Fair", data: vanityFair },
  { name: "InStyle", data: instyle },
];

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusUrl, setStatusUrl] = useState(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState("presets"); // presets | adjust
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const savedImage = sessionStorage.getItem("selectedImage");
    if (savedImage) setSelectedImage(savedImage);
    loadGallery();
  }, []);

  const loadGallery = () => {
    try {
      const savedGallery = JSON.parse(
        localStorage.getItem("galleryImages") || "[]"
      );
      const now = Date.now();
      const validImages = savedGallery.filter(
        (img) => now - img.timestamp < 3600000
      ); // 1 hour

      if (validImages.length !== savedGallery.length) {
        localStorage.setItem("galleryImages", JSON.stringify(validImages));
      }
      setGalleryImages(validImages);
    } catch (e) {
      console.error("Failed to load gallery", e);
      setGalleryImages([]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSelectedImage(base64String);
        sessionStorage.setItem("selectedImage", base64String);
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
      const finalImageUrl = await StatusService(statusUrl, apiToken);
      const imageResponse = await fetch(finalImageUrl);
      const blob = await imageResponse.blob();

      // Convert blob to base64 for storage
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;

        // Save to Gallery
        const newImage = {
          id: Date.now(),
          data: base64data,
          timestamp: Date.now(),
          filter: activeFilter.name,
        };

        const currentGallery = JSON.parse(
          localStorage.getItem("galleryImages") || "[]"
        );
        const updatedGallery = [newImage, ...currentGallery];

        try {
          localStorage.setItem("galleryImages", JSON.stringify(updatedGallery));
          setGalleryImages(updatedGallery);
        } catch (e) {
          console.error("Storage full?", e);
          alert("Could not save to gallery - storage might be full");
        }

        // Trigger download
        const link = document.createElement("a");
        link.href = base64data;
        link.download = `mag-edit-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setShowDownloadDialog(false);
        setStatusUrl(null);
        // localStorage.clear(); // REMOVED to persist gallery
        sessionStorage.removeItem("selectedImage"); // Only clear current work
      };
    } catch (error) {
      console.error(error);
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatTimeLeft = (timestamp) => {
    const timeLeft = 3600000 - (Date.now() - timestamp);
    const minutes = Math.floor(timeLeft / 60000);
    return `${minutes}m left`;
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0F1A] text-[#F2F3FF] font-sans flex flex-col overflow-hidden relative">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
        <div className="aurora-blob aurora-blob-3"></div>
      </div>

      {/* Top Bar */}
      <header className="h-16 border-b border-[#262A45] bg-[#151829]/80 backdrop-blur-md flex items-center justify-between px-6 z-20 shadow-lg shadow-black/20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.reload()} // Simple way to go back/reset for now
            className="p-2 hover:bg-[#262A45] rounded-lg text-[#A8A9C5] hover:text-white transition-colors"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <FiImage className="text-2xl text-[#6A5BFF]" />
            <span className="text-xl font-bold tracking-tight">
              Mag Edit{" "}
              <span className="text-[#6A5BFF] text-xs align-top">AI</span>
            </span>
          </div>
          <div className="h-6 w-px bg-[#262A45] mx-2"></div>
          <span className="text-sm text-[#A8A9C5]">Untitled Project</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              loadGallery();
              setShowGallery(true);
            }}
            className="px-4 py-2 bg-[#262A45] hover:bg-[#323652] text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium border border-[#3E4265]"
          >
            <FiGrid /> See Gallery
          </button>
          <button className="p-2 text-[#A8A9C5] hover:text-white hover:bg-[#262A45] rounded-lg transition-colors">
            <FiSettings className="text-xl" />
          </button>
          <button
            onClick={handleGenerate}
            disabled={!selectedImage || isGenerating}
            className="px-5 py-2 bg-[#6A5BFF] hover:bg-[#5748F9] text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(106,91,255,0.3)] hover:shadow-[0_0_25px_rgba(106,91,255,0.5)] transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
          >
            {isGenerating ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <FiShare2 /> Export
              </>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Toolbar */}
        {/* <aside className="w-16 border-r border-[#262A45] bg-[#151829]/50 backdrop-blur-sm flex flex-col items-center py-6 gap-6 z-20">
          {[
            { icon: FiCrop, label: "Crop" },
            { icon: FiEdit2, label: "Draw" },
            { icon: FiLayers, label: "Layers", active: true },
            { icon: FiSliders, label: "Adjust" },
          ].map((tool, i) => (
            <button
              key={i}
              className={`p-3 rounded-xl transition-all group relative ${
                tool.active
                  ? "bg-[#6A5BFF]/20 text-[#6A5BFF] shadow-[0_0_10px_rgba(106,91,255,0.2)]"
                  : "text-[#A8A9C5] hover:text-white hover:bg-[#262A45]"
              }`}
            >
              <tool.icon className="text-xl" />
              <span className="absolute left-14 bg-[#151829] border border-[#262A45] px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {tool.label}
              </span>
            </button>
          ))}
        </aside> */}

        {/* Center Canvas */}
        <section className="flex-1 relative flex flex-col bg-[#0D0F1A]/50">
          {/* Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#262A45 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            {selectedImage ? (
              <div className="relative group max-h-full max-w-full shadow-2xl shadow-black/50">
                <img
                  src={selectedImage}
                  alt="Canvas"
                  className="max-h-[calc(100vh-180px)] max-w-full object-contain border border-[#262A45]"
                />
                {/* Image Controls Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      sessionStorage.removeItem("selectedImage");
                    }}
                    className="p-2 bg-[#151829]/90 text-[#FF5B5B] rounded-lg border border-[#262A45] hover:bg-[#262A45]"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md aspect-[4/3] border-2 border-dashed border-[#262A45] rounded-2xl flex flex-col items-center justify-center bg-[#151829]/30 hover:bg-[#151829]/50 hover:border-[#6A5BFF] transition-all group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6A5BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <FiUpload className="text-5xl text-[#262A45] group-hover:text-[#6A5BFF] transition-colors mb-4" />
                <h3 className="text-xl font-semibold text-[#F2F3FF] mb-2">
                  Upload Image
                </h3>
                <p className="text-[#A8A9C5] text-sm">
                  Drag & drop or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            )}

            {/* Loading Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 bg-[#0D0F1A]/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-[#262A45] border-t-[#6A5BFF] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiCpu className="text-[#6A5BFF] text-2xl animate-pulse" />
                  </div>
                </div>
                <div className="mt-6 text-[#6A5BFF] text-xl font-bold animate-pulse tracking-widest">
                  GENERATING AI
                </div>
                <p className="text-[#A8A9C5] mt-2 text-sm">
                  Applying neural style transfer...
                </p>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="h-12 border-t border-[#262A45] bg-[#151829]/80 backdrop-blur-md flex items-center justify-between px-6 z-20">
            <div className="flex items-center gap-4 text-[#A8A9C5] text-sm">
              <span>1920 x 1080 px</span>
              <span className="w-px h-4 bg-[#262A45]"></span>
              <span>RGB</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-1.5 hover:bg-[#262A45] rounded text-[#A8A9C5] hover:text-white">
                <FiZoomOut />
              </button>
              <span className="text-sm font-mono text-[#F2F3FF]">100%</span>
              <button className="p-1.5 hover:bg-[#262A45] rounded text-[#A8A9C5] hover:text-white">
                <FiZoomIn />
              </button>
              <div className="w-px h-4 bg-[#262A45] mx-2"></div>
              <button className="p-1.5 hover:bg-[#262A45] rounded text-[#A8A9C5] hover:text-white">
                <FiMaximize />
              </button>
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-[#262A45] bg-[#151829]/80 backdrop-blur-md flex flex-col z-20">
          {/* Tabs */}
          <div className="flex border-b border-[#262A45]">
            <button
              onClick={() => setActiveTab("presets")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === "presets"
                  ? "text-white"
                  : "text-[#A8A9C5] hover:text-white"
              }`}
            >
              Presets
              {activeTab === "presets" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6A5BFF] shadow-[0_0_10px_#6A5BFF]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("adjust")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === "adjust"
                  ? "text-white"
                  : "text-[#A8A9C5] hover:text-white"
              }`}
            >
              Adjust
              {activeTab === "adjust" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6A5BFF] shadow-[0_0_10px_#6A5BFF]"></div>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {activeTab === "presets" ? (
              <div className="grid grid-cols-2 gap-3">
                {FILTERS.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(filter)}
                    className={`p-3 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2 text-center group relative overflow-hidden ${
                      activeFilter.name === filter.name
                        ? "bg-[#6A5BFF]/10 border-[#6A5BFF] text-white shadow-[0_0_15px_rgba(106,91,255,0.15)]"
                        : "bg-[#151829] border-[#262A45] text-[#A8A9C5] hover:border-[#6A5BFF]/50 hover:text-white"
                    }`}
                  >
                    <div
                      className={`w-full aspect-square rounded-lg mb-1 flex items-center justify-center text-2xl font-serif ${
                        activeFilter.name === filter.name
                          ? "bg-[#6A5BFF] text-white"
                          : "bg-[#0D0F1A] text-[#5D5F75] group-hover:text-[#6A5BFF]"
                      }`}
                    >
                      {filter.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium">{filter.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Visual Sliders (Placeholder for now) */}
                {[
                  "Exposure",
                  "Contrast",
                  "Highlights",
                  "Shadows",
                  "Saturation",
                  "Vibrance",
                ].map((label) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-[#A8A9C5] mb-2">
                      <span>{label}</span>
                      <span>0</span>
                    </div>
                    <div className="h-1 bg-[#262A45] rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-[#6A5BFF] relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generate Button Area */}
          <div className="p-6 border-t border-[#262A45] bg-[#151829]/95">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedImage}
              className="w-full py-4 bg-gradient-to-r from-[#6A5BFF] to-[#00E5FF] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(106,91,255,0.3)] hover:shadow-[0_0_30px_rgba(106,91,255,0.5)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isGenerating ? (
                "Processing..."
              ) : (
                <>
                  <FiCpu className="text-xl" /> Generate AI Style
                </>
              )}
            </button>
          </div>
        </aside>
      </main>

      {/* Download Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 bg-[#0D0F1A]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#151829] p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full flex flex-col items-center gap-6 border border-[#262A45] animate-in fade-in zoom-in duration-200 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#3CEFA3]/20 rounded-full blur-3xl -z-10"></div>

            <div className="w-20 h-20 bg-[#3CEFA3]/10 rounded-full flex items-center justify-center text-[#3CEFA3] text-4xl mb-2 border border-[#3CEFA3]/20 shadow-[0_0_20px_rgba(60,239,163,0.2)]">
              <FiCheck />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Generation Complete!
              </h2>
              <p className="text-[#A8A9C5]">
                Your masterpiece is ready for download.
              </p>
            </div>

            <div className="flex gap-4 w-full mt-4">
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="flex-1 py-3 px-6 border border-[#262A45] text-[#A8A9C5] font-semibold rounded-xl hover:bg-[#262A45] hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 py-3 px-6 bg-[#3CEFA3] text-[#0D0F1A] font-bold rounded-xl hover:bg-[#32D892] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(60,239,163,0.3)]"
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

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-[#0D0F1A]/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#151829] w-full max-w-4xl h-[80vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#262A45] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-[#262A45] flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FiGrid className="text-[#6A5BFF]" /> Your Gallery
                <span className="text-sm font-normal text-[#A8A9C5] bg-[#262A45] px-3 py-1 rounded-full">
                  Saved for 1 hour
                </span>
              </h2>
              <button
                onClick={() => setShowGallery(false)}
                className="p-2 hover:bg-[#262A45] rounded-lg text-[#A8A9C5] hover:text-white transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {galleryImages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#5D5F75] gap-4">
                  <FiImage className="text-6xl opacity-20" />
                  <p>No images saved yet. Generate something!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-[3/4] bg-[#0D0F1A] rounded-xl overflow-hidden border border-[#262A45] hover:border-[#6A5BFF] transition-all"
                    >
                      <img
                        src={img.data}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                        <span className="text-xs font-mono text-[#A8A9C5]">
                          {formatTimeLeft(img.timestamp)}
                        </span>

                        <a
                          href={img.data}
                          download={`mag-edit-${img.id}.png`}
                          className="p-2 bg-[#6A5BFF] text-white rounded-lg hover:bg-[#5748F9] transition-colors"
                          title="Download"
                        >
                          <FiDownload />
                        </a>
                      </div>

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            const newGallery = galleryImages.filter(
                              (g) => g.id !== img.id
                            );
                            setGalleryImages(newGallery);
                            localStorage.setItem(
                              "galleryImages",
                              JSON.stringify(newGallery)
                            );
                          }}
                          className="p-1.5 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-white truncate text-center">
                          {img.filter}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden Canvas for saving */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default Home;
