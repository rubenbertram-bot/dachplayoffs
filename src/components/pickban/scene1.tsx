"use client";
import { motion } from "framer-motion";

interface Scene1Props {
    pick: string;
    pickPlayer: string;
    player1: string;
    player2: string;
    nick1: string;
    nick2: string;
    player1ban: string;
    player2ban: string;
}

export function Scene1({
                           pick, pickPlayer,
                           player1, player2,
                           nick1, nick2,
                           player1ban, player2ban
                       }: Scene1Props) {
    return (
        <motion.div
            key="scene1"
            className="absolute inset-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {pick === "ship" && <img src={"/pickban/bgs/Shipwreck.png"} className="absolute inset-0 w-full h-full"/>}
                {pick === "bt" && <img src={"/pickban/bgs/Buried_Treasure.png"} className="absolute inset-0 w-full h-full"/>}
                {pick === "rp" && <img src={"/pickban/bgs/ruined_portal.png"} className="absolute inset-0 w-full h-full"/>}
                {pick === "dt" && <img src={"/pickban/bgs/Desert_Tempel.png"} className="absolute inset-0 w-full h-full"/>}
                {pick === "village" && <img src={"/pickban/bgs/Village.png"} className="absolute inset-0 w-full h-full"/>}
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10">
                {/* Bans */}

                {/* Aktiver Pick Spieler */}
                {pickPlayer === "1" ? (
                    <img src={`https://minotar.net/helm/${player1}/256.png`}
                         className="absolute w-[150px] h-[150px] left-[55.3rem] top-[21.55rem]"/>
                ) : (
                    <img src={`https://minotar.net/helm/${player2}/256.png`}
                         className="absolute w-[150px] h-[150px] left-[55.3rem] top-[21.55rem]"/>
                )}

                {/* Pick Title */}
                {pick && (
                    <span className="absolute w-full text-center text-white text-[7rem] top-[35rem]" style={{fontFamily: "Playoffs"}}>
                        {pick === "ship" && "SHIPWRECK"}
                        {pick === "bt" && "BURIED TREASURE"}
                        {pick === "rp" && "RUINED PORTAL"}
                        {pick === "dt" && "DESERT TEMPLE"}
                        {pick === "village" && "VILLAGE"}
          </span>
                )}
            </div>

            {/* HUD Overlay */}
            <div className="absolute inset-0  pointer-events-none">
                <img src={"/pickban/bgs/Overlay.png"} className="absolute inset-0 w-full h-full"/>
            </div>
        </motion.div>
    );
}
