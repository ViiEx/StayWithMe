"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Maximize, Minimize, Play } from "lucide-react";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=nuU2YHtxMik"
  ); // Default video URL
  const [inputValue, setInputValue] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasSeeked, setHasSeeked] = useState(false);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  // Extract video URL from YouTube URL or ID
  const getVideoUrl = (input: string) => {
    // If it's already a full URL, return it
    if (input.includes("youtube.com") || input.includes("youtu.be")) {
      return input;
    }
    // If it's just an ID, construct the URL
    return `https://www.youtube.com/watch?v=${input}`;
  };

  const handleVideoChange = () => {
    if (inputValue) {
      const url = getVideoUrl(inputValue);
      setVideoUrl(url);
      setInputValue("");
      setHasSeeked(false); // Reset seek state for new video
    }
  };

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
    <div className="min-h-screen bg-black flex flex-col">
      {/* Controls - Hidden by default, visible on hover */}
      {/* <div className="group fixed w-full h-[50px] top-0 z-10">
        {!isFullscreen && (
          <div className="absolute top-0 left-0 right-0 z-20 bg-gray-900/95 backdrop-blur-sm p-6 flex flex-col sm:flex-row gap-4 items-center justify-center border-b border-gray-800 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <div className="flex gap-3 items-center max-w-md w-full">
              <Input
                type="text"
                placeholder="Enter YouTube URL or Video ID"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleVideoChange()}
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500"
              />
              <Button
                onClick={handleVideoChange}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="default"
              >
                <Play className="w-4 h-4 mr-2" />
                Load
              </Button>
            </div>
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              size="default"
            >
              <Maximize className="w-4 h-4 mr-2" />
              Enter Fullscreen
            </Button>
          </div>
        )}
      </div> */}

      {/* Video Player */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
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

        {/* Fullscreen exit button */}
        {isFullscreen && (
          <Button
            onClick={toggleFullscreen}
            variant="secondary"
            className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-gray-600"
            size="sm"
          >
            <Minimize className="w-4 h-4 mr-2" />
            Exit Fullscreen
          </Button>
        )}
      </div>
    </div>
  );
}
