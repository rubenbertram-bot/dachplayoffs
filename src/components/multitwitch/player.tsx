"use client";

import React, { useEffect, useRef } from "react";

declare global {
    interface Window {
        Twitch: any;
    }
}

interface TwitchPlayerProps {
    channel: string;
    type: "twitch" | "youtube";
    parent: string[];
    id: string;
}

const TwitchPlayer: React.FC<TwitchPlayerProps> = ({
                                                       channel,
                                                       parent,
                                                       id,
                                                       type,
                                                   }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Twitch
        if (type === "twitch") {
            const initTwitch = () => {
                if (playerRef.current && playerRef.current.setChannel) {
                    playerRef.current.setChannel(channel);
                    return;
                }

                const newPlayer = new window.Twitch.Player(id, {
                    channel,
                    parent,
                    width: "100%",
                    height: "100%",
                    autoplay: true,
                    muted: true, // <— dauerhaft muted
                });

                // Twitch bug fix: erzwinge Autoplay bei mute
                newPlayer.addEventListener(window.Twitch.Player.READY, () => {
                    newPlayer.setMuted(true);
                    newPlayer.play();
                });

                playerRef.current = newPlayer;
            };

            if (window.Twitch && window.Twitch.Player) {
                initTwitch();
            } else {
                const checkInterval = setInterval(() => {
                    if (window.Twitch && window.Twitch.Player) {
                        clearInterval(checkInterval);
                        initTwitch();
                    }
                }, 300);
            }
        }

        // YouTube
        else if (type === "youtube") {
            const iframe = containerRef.current.querySelector("iframe");
            const newSrc = `https://www.youtube.com/embed/live_stream?channel=${channel}&autoplay=1&mute=1`;
            if (iframe) {
                iframe.src = newSrc;
            } else {
                const newIframe = document.createElement("iframe");
                newIframe.src = newSrc;
                newIframe.frameBorder = "0";
                newIframe.allow =
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                newIframe.allowFullscreen = true;
                newIframe.style.position = "absolute";
                newIframe.style.top = "0";
                newIframe.style.left = "0";
                newIframe.style.width = "100%";
                newIframe.style.height = "100%";
                containerRef.current.appendChild(newIframe);
            }
        }
    }, [channel, type]);

    return (
        <div
            id={id}
            ref={containerRef}
            className="player absolute w-full h-full"
            style={{
                position: "absolute",
                inset: 0,
                background: "black",
                overflow: "hidden",
            }}
        />
    );
};

export default TwitchPlayer;
