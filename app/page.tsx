"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Heart, Star, Sparkles } from "lucide-react";

export default function Home() {
  const videoUrl = "https://www.youtube.com/watch?v=nuU2YHtxMik"; // Fixed video URL
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasSeeked, setHasSeeked] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Reset seek state when video changes
  useEffect(() => {
    setHasSeeked(false);
  }, [videoUrl]);

  // Auto-hide mobile controls after 3 seconds
  useEffect(() => {
    if (showMobileControls) {
      const timer = setTimeout(() => {
        setShowMobileControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMobileControls]);

  // Handle when the player is ready - seek to 53 seconds
  const handleReady = () => {
    console.log("onReady");
    if (playerRef.current && !hasSeeked) {
      playerRef.current.currentTime = 53; // Set to 53 seconds
      setHasSeeked(true);
    }
  };

  // Handle when the player starts playing
  const handleStart = () => {
    console.log("onStart");
    if (playerRef.current && !hasSeeked) {
      playerRef.current.currentTime = 53; // Set to 53 seconds
      setHasSeeked(true);
    }
  };

  // Callback to set the player ref
  const setPlayerRef = (player: HTMLVideoElement | null) => {
    playerRef.current = player;
    if (player && !hasSeeked) {
      // Set initial time to 53 seconds
      setTimeout(() => {
        if (player.duration && player.duration > 53) {
          player.currentTime = 53;
          setHasSeeked(true);
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex flex-col relative overflow-hidden">
      {/* Cute floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 text-pink-300 w-6 h-6 animate-pulse" />
        <Star className="absolute top-32 right-16 text-yellow-300 w-5 h-5 animate-bounce" />
        <Sparkles className="absolute bottom-40 left-20 text-purple-300 w-4 h-4 animate-ping" />
        <Heart className="absolute bottom-60 right-24 text-red-300 w-5 h-5 animate-pulse delay-700" />
        <Star className="absolute top-40 left-1/2 text-blue-300 w-4 h-4 animate-bounce delay-300" />
        <Sparkles className="absolute top-60 right-32 text-pink-400 w-6 h-6 animate-ping delay-1000" />

        {/* Extra cute floating elements */}
        <div className="absolute top-1/4 left-20 w-4 h-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full animate-bounce delay-500 opacity-60"></div>
        <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full animate-pulse delay-200 opacity-70"></div>
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full animate-ping delay-800 opacity-50"></div>
        <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full animate-bounce delay-1200 opacity-60"></div>
      </div>

      {/* Cute Controls - Tap to show on mobile, hover on desktop */}
      <div className="group fixed w-full h-[80px] top-0 z-10">
        {!isFullscreen && (
          <div
            className={`absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-indigo-500/90 backdrop-blur-sm p-6 flex flex-col sm:flex-row gap-4 items-center justify-center border-b-4 border-white/20 transform transition-all duration-500 ease-out shadow-lg shadow-pink-500/25 ${
              showMobileControls ? "translate-y-0" : "-translate-y-full"
            } md:-translate-y-full md:group-hover:translate-y-0`}
          >
            {/* Cute sparkle decoration */}
            <div className="absolute top-[7px] left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 max-w-md w-full">
              {/* Cute message for Alexandra */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  Please stay Alexandra 🥹
                </h1>
                <p className="text-white/80 text-sm font-medium">
                  ✨ This magical moment is just for you ✨
                </p>
              </div>
            </div>
            <Button
              onClick={toggleFullscreen}
              className="bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white border-0 rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
              size="default"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />✨ Fullscreen
            </Button>
          </div>
        )}
      </div>

      {/* Cute Video Player */}
      <div className="flex-1 relative m-4 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/25 border-4 border-white/20 backdrop-blur-sm transform hover:scale-[1.01] transition-transform duration-300">
        {/* Cute glowing border animation */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl opacity-20 animate-pulse"></div>

        {/* Mobile tap overlay for controls - only when controls are hidden */}
        {!showMobileControls && (
          <div
            className="absolute inset-0 z-30 md:hidden rounded-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileControls(true);
            }}
          ></div>
        )}

        {/* Cute corner decorations with enhanced styling */}
        <div className="absolute top-2 left-2 z-20">
          <div className="flex gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-sm animate-pulse"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-sm animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-sm animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Cute sparkle corners */}
        <div className="absolute top-1 right-1 z-20">
          <Sparkles
            className="w-4 h-4 text-yellow-300 animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>
        <div className="absolute bottom-1 left-1 z-20">
          <Heart className="w-4 h-4 text-pink-300 animate-pulse" />
        </div>
        <div className="absolute bottom-1 right-1 z-20">
          <Star className="w-4 h-4 text-purple-300 animate-bounce" />
        </div>

        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          onClick={() => {
            // On mobile, hide controls if they're visible
            if (window.innerWidth < 768 && showMobileControls) {
              setShowMobileControls(false);
            }
          }}
        >
          <ReactPlayer
            ref={setPlayerRef}
            src={videoUrl}
            width="100%"
            height="100%"
            playing={true}
            controls={false}
            onReady={handleReady}
            onStart={handleStart}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  disablekb: 1,
                  fs: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              },
            }}
          />
        </div>

        {/* Cute Fullscreen exit button */}
        {isFullscreen && (
          <Button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 bg-gradient-to-r from-pink-400/80 to-purple-400/80 backdrop-blur-md hover:from-pink-500/90 hover:to-purple-500/90 text-white border-2 border-white/30 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            size="sm"
          >
            <Star className="w-4 h-4 mr-2 animate-spin" />♡ Exit ♡
          </Button>
        )}

        {/* Cute floating hearts around the video */}
        {!isFullscreen && (
          <div className="absolute inset-0 pointer-events-none">
            <Heart className="absolute top-4 right-4 text-pink-400/30 w-8 h-8 animate-pulse" />
            <Heart className="absolute bottom-4 left-4 text-red-400/30 w-6 h-6 animate-pulse delay-500" />
            <Star className="absolute top-1/2 right-2 text-yellow-400/40 w-5 h-5 animate-bounce" />
            <Sparkles className="absolute bottom-8 right-8 text-purple-400/30 w-7 h-7 animate-ping" />

            {/* More adorable floating elements around video */}
            <div className="absolute top-8 left-8 w-3 h-3 bg-pink-300/40 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-16 right-12 w-2 h-2 bg-yellow-300/50 rounded-full animate-ping delay-700"></div>
            <div className="absolute bottom-16 left-6 w-4 h-4 bg-purple-300/30 rounded-full animate-pulse delay-900"></div>
            <div className="absolute top-1/3 left-2 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-1100"></div>
            <div className="absolute bottom-1/3 right-4 w-3 h-3 bg-rose-300/35 rounded-full animate-ping delay-1300"></div>

            {/* Cute floating text elements */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-pink-300/60 text-xs font-bold animate-bounce delay-400">
              ♡
            </div>
            <div className="absolute bottom-12 right-16 text-purple-300/50 text-sm font-bold animate-pulse delay-600">
              ✧
            </div>
            <div className="absolute top-1/4 right-6 text-yellow-300/55 text-xs font-bold animate-bounce delay-800">
              ★
            </div>
            <div className="absolute bottom-1/4 left-8 text-blue-300/45 text-sm font-bold animate-ping delay-1000">
              ◆
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
