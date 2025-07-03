"use client";

import React from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  overlayOpacity?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrl, 
  overlayOpacity = "bg-black/50" 
}) => {
  return (
    <div className="absolute inset-0 -z-10">
    
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`absolute inset-0 ${overlayOpacity}`}></div>
    </div>
  );
};

export default VideoBackground;