"use client";
import { motion } from "framer-motion";

interface Scene0Props {
    pick1: string;
    pick2: string;
    pick3: string;
    pick4: string;
    pick5: string;
    player1: string;
    player2: string;
    nick1: string;
    nick2: string;
    player1ban: string;
    player2ban: string;
}

export function Scene0({
                           pick1, pick2, pick3, pick4, pick5,
                           player1, player2, nick1, nick2, player1ban, player2ban
                       }: Scene0Props) {

    return (

        <motion.div
            key="scene0"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background Picks */}
            <div className="absolute inset-0 z-0">
                {pick1 ? (<img src={`/pickban/${pick1}bg.png`} className="absolute left-0"/>) : (<img src={`/pickban/bg.png`} className="absolute left-0"/>)}
                {pick2 ? (<img src={`/pickban/${pick2}bg.png`} className="absolute left-1/5"/>) : (<img src={`/pickban/bg.png`} className="absolute left-1/5"/>)}
                {pick3 ? (<img src={`/pickban/${pick3}bg.png`} className="absolute left-2/5"/>) : (<img src={`/pickban/bg.png`} className="absolute left-2/5"/>)}
                {pick4 ? (<img src={`/pickban/${pick4}bg.png`} className="absolute left-3/5"/>) : (<img src={`/pickban/bg.png`} className="absolute left-3/5"/>)}
                {pick5 ? (<img src={`/pickban/${pick5}bg.png`} className="absolute left-4/5"/>) : (<img src={`/pickban/bg.png`} className="absolute left-4/5"/>)}
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10">
                {/* Seed Header */}
                <div className="flex justify-between mt-12">
                    {["SEED 1", "SEED 2", "SEED 3", "SEED 4", "SEED 5"].map(seed => (
                        <span key={seed} className="w-full text-4xl text-white text-center" style={{fontFamily: "Playoffs"}}>{seed}</span>
                    ))}
                </div>

                {/* Pick Info */}
                <div className="flex justify-between mt-[740px]">
                    <span className="w-full text-xl text-white text-center" style={{fontFamily: "Playoffs"}}>{nick1.toUpperCase()} PICKED</span>
                    <span className="w-full text-xl text-white text-center" style={{fontFamily: "Playoffs"}}>{nick2.toUpperCase()} PICKED</span>
                    <span className="w-full text-xl text-white text-center" style={{fontFamily: "Playoffs"}}>{nick1.toUpperCase()} PICKED</span>
                    <span className="w-full text-xl text-white text-center" style={{fontFamily: "Playoffs"}}>{nick2.toUpperCase()} PICKED</span>
                    <span className="w-full text-xl text-white text-center" style={{fontFamily: "Playoffs"}}>{nick1.toUpperCase()} PICKED</span>
                </div>

            </div>

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <img src={"/pickban/grid.png"} className="absolute inset-0 w-full h-full"/>
            </div>
        </motion.div>
    );
}
