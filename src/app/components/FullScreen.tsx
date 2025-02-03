"use client"

import React, { useState, useEffect } from "react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

type FullScreenProps = {
  className?: string
}

const FullScreen: React.FC<FullScreenProps> = ({className}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement || !!document.fullscreenElement);
    };

    handleFullScreenChange();

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      if (!isFullScreen) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  return (
      <button className={`flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 ${className}`} onClick={toggleFullScreen}>
        {isFullScreen ? <BsFullscreenExit size={24} /> : <BsFullscreen size={24} />}
      </button>
  );
};

export default FullScreen;
