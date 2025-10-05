"use client";

import React from "react";

interface YouTubeLiveProps {
    /** The channel’s ID (starts with UC…) */
    channelId: string;
    /** Optional width */
    width?: string | number;
    /** Optional height */
    height?: string | number;
}

const YouTubeLive: React.FC<YouTubeLiveProps> = ({
                                                     channelId,
                                                     width = "100%",
                                                     height = "100%",
                                                 }) => {
    const src = `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`;

    return (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
                src={src}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: width,
                    height: height,
                }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Live Stream"
            />
        </div>
    );
};

export default YouTubeLive;
