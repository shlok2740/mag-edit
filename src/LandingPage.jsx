import React, { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiCpu,
  FiImage,
  FiLayers,
  FiZap,
  FiMenu,
  FiX,
} from "react-icons/fi";

const LandingPage = ({ onStart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#0D0F1A] font-sans text-[#F2F3FF] overflow-x-hidden relative selection:bg-[#6A5BFF] selection:text-white">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full bg-[#151829]/80 backdrop-blur-md z-50 border-b border-[#262A45]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiImage className="text-3xl text-[#6A5BFF]" />
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Mag Edit{" "}
              <span className="text-[#6A5BFF] text-sm align-top">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-[#A8A9C5] hover:text-white font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-[#A8A9C5] hover:text-white font-medium transition-colors"
            >
              How it Works
            </a>
            <a
              href="#faq"
              className="text-[#A8A9C5] hover:text-white font-medium transition-colors"
            >
              FAQ
            </a>
            <button
              onClick={onStart}
              className="px-6 py-2.5 bg-[#6A5BFF] text-white font-bold rounded-full hover:bg-[#5748F9] transition-all shadow-[0_0_20px_rgba(106,91,255,0.3)] hover:shadow-[0_0_30px_rgba(106,91,255,0.5)] active:scale-95 border border-[#6A5BFF]/50"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#151829] border-b border-[#262A45] p-6 flex flex-col gap-4 shadow-2xl">
            <a
              href="#features"
              onClick={toggleMenu}
              className="text-lg font-medium text-[#A8A9C5] hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={toggleMenu}
              className="text-lg font-medium text-[#A8A9C5] hover:text-white"
            >
              How it Works
            </a>
            <a
              href="#faq"
              onClick={toggleMenu}
              className="text-lg font-medium text-[#A8A9C5] hover:text-white"
            >
              FAQ
            </a>
            <button
              onClick={() => {
                toggleMenu();
                onStart();
              }}
              className="w-full py-3 bg-[#6A5BFF] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(106,91,255,0.3)]"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6A5BFF]/10 border border-[#6A5BFF]/30 text-[#6A5BFF] rounded-full font-semibold text-sm mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#6A5BFF] rounded-full animate-pulse shadow-[0_0_10px_#6A5BFF]"></span>
              v1.0 Now Available
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-white drop-shadow-[0_0_30px_rgba(106,91,255,0.3)]">
              Create Magazine <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5BFF] to-[#00E5FF] animate-gradient">
                Covers in Seconds
              </span>
            </h1>
            <p className="text-xl text-[#A8A9C5] mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transform ordinary photos into stunning, professional magazine
              covers with AI-powered filters and layouts. No design skills
              required.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={onStart}
                className="w-full sm:w-auto px-8 py-4 bg-[#6A5BFF] text-white text-lg font-bold rounded-xl hover:bg-[#5748F9] transition-all shadow-[0_0_30px_rgba(106,91,255,0.4)] hover:shadow-[0_0_50px_rgba(106,91,255,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 border border-[#6A5BFF]/50"
              >
                Start Creating Now <FiArrowRight />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-[#151829]/50 border border-[#262A45] text-white text-lg font-bold rounded-xl hover:bg-[#262A45] hover:border-[#6A5BFF]/50 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                View Gallery
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-[#A8A9C5]">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#262A45] border-2 border-[#0D0F1A]"
                  ></div>
                ))}
              </div>
              <p>
                Trusted by <span className="text-white font-bold">1,200+</span>{" "}
                creators
              </p>
            </div>
          </div>
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative z-10">
            <div className="relative z-10 bg-[#151829]/50 p-4 rounded-3xl shadow-2xl border border-[#262A45] rotate-3 hover:rotate-0 transition-transform duration-500 backdrop-blur-md group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6A5BFF]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="aspect-[4/5] bg-[#0D0F1A] rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                  alt="Magazine Cover Demo"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1A] via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-5xl font-serif font-bold mb-2 drop-shadow-lg">
                    VOGUE
                  </h3>
                  <p className="text-white/90 text-xl font-light tracking-wide drop-shadow-md">
                    The Future of Fashion
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative Glows */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#00E5FF]/20 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#6A5BFF]/20 rounded-full blur-[100px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-[#262A45] bg-[#151829]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[#A8A9C5] font-medium mb-8 tracking-widest text-sm">
            POWERING NEXT-GEN CREATORS
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 hover:opacity-80 transition-all duration-500">
            {["VOGUE", "ELLE", "GQ", "VANITY FAIR", "HARPER'S BAZAAR"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-2xl font-serif font-bold text-white"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Old Way vs New Way */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Mag Edit?
            </h2>
            <p className="text-[#A8A9C5] text-lg max-w-2xl mx-auto">
              Stop struggling with complex software. Switch to the modern way of
              designing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Way */}
            <div className="bg-[#151829]/50 p-8 rounded-3xl border border-[#262A45] relative overflow-hidden group hover:border-[#FF5B5B]/30 transition-colors">
              <div className="absolute top-0 right-0 bg-[#FF5B5B]/10 text-[#FF5B5B] px-4 py-1 rounded-bl-xl font-bold text-sm border-l border-b border-[#FF5B5B]/20">
                THE OLD WAY
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Manual Design
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[#A8A9C5]">
                  <FiX className="text-[#FF5B5B] text-xl mt-1 shrink-0" />
                  <span>
                    Hours spent learning complex tools like Photoshop.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-[#A8A9C5]">
                  <FiX className="text-[#FF5B5B] text-xl mt-1 shrink-0" />
                  <span>Struggling with font pairing and layout balance.</span>
                </li>
                <li className="flex items-start gap-3 text-[#A8A9C5]">
                  <FiX className="text-[#FF5B5B] text-xl mt-1 shrink-0" />
                  <span>Inconsistent results and amateur look.</span>
                </li>
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-[#151829] p-8 rounded-3xl shadow-[0_0_30px_rgba(106,91,255,0.15)] relative overflow-hidden text-white transform md:-translate-y-4 border border-[#6A5BFF]/50 group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#6A5BFF]/10 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 bg-[#6A5BFF] text-white px-4 py-1 rounded-bl-xl font-bold text-sm shadow-[0_0_15px_#6A5BFF]">
                THE NEW WAY
              </div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Mag Edit AI <FiZap className="text-[#00E5FF]" />
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3 text-gray-300">
                  <FiCheck className="text-[#3CEFA3] text-xl mt-1 shrink-0 drop-shadow-[0_0_5px_#3CEFA3]" />
                  <span>Professional results in seconds with AI.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <FiCheck className="text-[#3CEFA3] text-xl mt-1 shrink-0 drop-shadow-[0_0_5px_#3CEFA3]" />
                  <span>Pre-trained styles from top fashion magazines.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <FiCheck className="text-[#3CEFA3] text-xl mt-1 shrink-0 drop-shadow-[0_0_5px_#3CEFA3]" />
                  <span>Perfect typography and composition automatically.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section
        id="features"
        className="py-24 px-6 bg-[#151829]/30 border-y border-[#262A45] backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-start group">
              <div className="w-14 h-14 bg-[#6A5BFF]/10 rounded-2xl flex items-center justify-center text-[#6A5BFF] text-2xl mb-6 border border-[#6A5BFF]/20 group-hover:border-[#6A5BFF] group-hover:shadow-[0_0_20px_rgba(106,91,255,0.3)] transition-all">
                <FiZap />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6A5BFF] transition-colors">
                Lightning Fast
              </h3>
              <p className="text-[#A8A9C5] leading-relaxed">
                Generate high-resolution covers instantly. Our optimized AI
                pipeline delivers results in under 5 seconds.
              </p>
            </div>
            <div className="flex flex-col items-start group">
              <div className="w-14 h-14 bg-[#FF5B5B]/10 rounded-2xl flex items-center justify-center text-[#FF5B5B] text-2xl mb-6 border border-[#FF5B5B]/20 group-hover:border-[#FF5B5B] group-hover:shadow-[0_0_20px_rgba(255,91,91,0.3)] transition-all">
                <FiLayers />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF5B5B] transition-colors">
                Premium Styles
              </h3>
              <p className="text-[#A8A9C5] leading-relaxed">
                Access a curated library of styles inspired by Vogue, GQ, Elle,
                and more. Always on trend.
              </p>
            </div>
            <div className="flex flex-col items-start group">
              <div className="w-14 h-14 bg-[#3CEFA3]/10 rounded-2xl flex items-center justify-center text-[#3CEFA3] text-2xl mb-6 border border-[#3CEFA3]/20 group-hover:border-[#3CEFA3] group-hover:shadow-[0_0_20px_rgba(60,239,163,0.3)] transition-all">
                <FiCpu />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3CEFA3] transition-colors">
                AI Powered
              </h3>
              <p className="text-[#A8A9C5] leading-relaxed">
                Advanced algorithms analyze your image to place text and
                elements perfectly without obscuring the subject.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-[#A8A9C5] text-lg">
              Three simple steps to your masterpiece.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-[#262A45] -z-10"></div>

            {[
              {
                step: 1,
                title: "Upload Photo",
                desc: "Choose any high-quality portrait or photo from your device.",
              },
              {
                step: 2,
                title: "Select Style",
                desc: "Pick from our collection of magazine aesthetics.",
              },
              {
                step: 3,
                title: "Generate & Download",
                desc: "Watch the magic happen and save your cover instantly.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center bg-[#151829]/50 p-8 rounded-3xl shadow-lg border border-[#262A45] hover:border-[#6A5BFF]/50 transition-colors backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-[#0D0F1A] text-white border border-[#262A45] rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[#A8A9C5]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-24 px-6 bg-[#151829]/30 backdrop-blur-sm border-t border-[#262A45]"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is Mag Edit free to use?",
                a: "Yes! Mag Edit is currently free for all users during our beta period.",
              },
              {
                q: "Do I need to sign up?",
                a: "No account required. Just upload your photo and start creating immediately.",
              },
              {
                q: "What happens to my photos?",
                a: "Your photos are processed securely and deleted from our servers after generation. We prioritize your privacy.",
              },
              {
                q: "Can I use the images commercially?",
                a: "The images are yours to use, but please respect the trademarks of the magazine styles emulated.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#262A45] bg-[#0D0F1A]/50 rounded-2xl p-6 hover:border-[#6A5BFF] transition-colors cursor-pointer group"
              >
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#6A5BFF] transition-colors">
                  {item.q}
                </h3>
                <p className="text-[#A8A9C5]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-[#0D0F1A] text-white text-center relative overflow-hidden border-t border-[#262A45]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6A5BFF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to go viral?
          </h2>
          <p className="text-[#A8A9C5] text-xl mb-10">
            Join thousands of creators making stunning covers today.
          </p>
          <button
            onClick={onStart}
            className="px-10 py-5 bg-[#6A5BFF] text-white text-xl font-bold rounded-full hover:bg-[#5748F9] transition-all shadow-[0_0_30px_rgba(106,91,255,0.4)] hover:shadow-[0_0_50px_rgba(106,91,255,0.6)] hover:scale-105"
          >
            Start Creating for Free
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-[#0D0F1A] text-center text-[#5D5F75] text-sm border-t border-[#262A45]">
        <p>&copy; {new Date().getFullYear()} Mag Edit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
