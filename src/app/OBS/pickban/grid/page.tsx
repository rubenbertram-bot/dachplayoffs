"use client";
import { useEffect, useState } from "react";
import { getValue } from "@/utils/database/interact";
import { AnimatePresence, motion } from "framer-motion";
import { Scene0 } from "@/components/pickban/scene0";
import { Scene1 } from "@/components/pickban/scene1";
import type { Variants } from "framer-motion";
import {Stinger} from "@/components/stinger/transition";

export default function Home() {
    const [player1, setPlayer1] = useState("doogile");
    const [player2, setPlayer2] = useState("bing_pigs");
    const [nick1, setNick1] = useState("doog");
    const [nick2, setNick2] = useState("Mongey");
    const [player1ban, setPlayer1ban] = useState("RUINED PORTAL");
    const [player2ban, setPlayer2ban] = useState("BURRIED TREASURE");
    const [pick1, setPick1] = useState("dt");
    const [pick2, setPick2] = useState("bt");
    const [pick3, setPick3] = useState("rp");
    const [pick4, setPick4] = useState("ship");
    const [pick5, setPick5] = useState("village");
    const [scene, setScene] = useState("0");
    const [pick, setPick] = useState("dt");
    const [pickPlayer, setPickPlayer] = useState("1");
    const [origin, setOrigin] = useState<string>("0px");
    const [x, setX] = useState<number>(0);

    useEffect(() => {
        const loadData = async () => {
            const keys = [
                "pickban-player-1", "pickban-player-2", "pickban-nick-1", "pickban-nick-2",
                "pickban-ban-1", "pickban-ban-2", "pickban-pick-1", "pickban-pick-2",
                "pickban-pick-3", "pickban-pick-4", "pickban-pick-5", "pickban-visible",
                "pickban-spot-type", "pickban-spot-player"
            ];
            const values = await Promise.all(keys.map(k => getValue(k)));

            setPlayer1(values[0]);
            setPlayer2(values[1]);
            setNick1(values[2]);
            setNick2(values[3]);
            setPlayer1ban(values[4]);
            setPlayer2ban(values[5]);
            setPick1(values[6]);
            setPick2(values[7]);
            setPick3(values[8]);
            setPick4(values[9]);
            setPick5(values[10]);
            setScene(values[11]);
            setPick(values[12]);
            setPickPlayer(values[13]);

            // hier entscheidest du anhand der NEUEN values[]
            if(values[6] === "") {
                setOrigin(`${192}px 540px`);
                setX(600)
            } else if(values[7] === "") {
                setOrigin(`${192*3}px 540px`);
                setX(300)
            } else if(values[8] === "") {
                setOrigin(`center`);
                setX(0)
            } else if(values[9] === "") {
                setOrigin(`${192*7}px 540px`);
                setX(-300)
            } else if(values[10] === "") {
                setOrigin(`${192*9}px 540px`);
                setX(-600)
            } else {
                setOrigin("5000px 540px");
            }
        };


        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);


    // Scene0 (Stretch-Out + Fade)
        const scene0Variants: Variants = {
            initial: { opacity: 0, scaleX: 1 },
            animate: {
                opacity: 1,
                scaleX: 1,
                transition: { duration: 0.6, ease: "easeOut" }
            },
            exit: {
                opacity: 1,
                scaleX: 6, // Stretch
                x: x,
                transition: { duration: 0.8, ease: "easeInOut" }
            }
        };

        const scene1Variants: Variants = {
            initial: { opacity: 0, scaleX: 1 },
            animate: {
                opacity: 1,
                scaleX: 1,
                transition: { delay: 0.2, duration: 0.8, ease: "easeInOut" }
            },
            exit: {
                opacity: 0,
                transition: { duration: 0.6, ease: "easeInOut" }
            }
        };


    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <AnimatePresence mode="sync">
                {scene === "0" && (
                    <motion.div
                        key="scene0"
                        variants={scene0Variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex justify-center items-center"
                        style={{ transformOrigin: `${origin}` }}
                    >
                        <div className="w-full h-full">
                            <Scene0
                                pick1={pick1} pick2={pick2} pick3={pick3} pick4={pick4} pick5={pick5}
                                player1={player1} player2={player2}
                                nick1={nick1} nick2={nick2}
                                player1ban={player1ban} player2ban={player2ban}
                            />
                        </div>
                    </motion.div>
                )}
                {scene === "1" && (
                    <motion.div
                        key="scene1"
                        variants={scene1Variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0"
                        style={{ transformOrigin: `${origin}` }}
                    >
                        <Scene1
                            pick={pick}
                            pickPlayer={pickPlayer}
                            player1={player1} player2={player2}
                            nick1={nick1} nick2={nick2}
                            player1ban={player1ban} player2ban={player2ban}
                        />
                    </motion.div>
                )}

            </AnimatePresence>

            {/* HUD bleibt fix */}
            <div>
                <img src={"/pickban/bar.png"} className="absolute bottom-0 w-full z-40"/>
                <span className="text-white text-2xl z-50 text-right absolute top-[980px] right-[1400px]" style={{fontFamily: "Playoffs"}}>
                    {nick1.toUpperCase()} BANNED<br/>{player1ban.toUpperCase()}
                </span>
                <span className="text-white z-50 text-2xl text-left absolute top-[980px] left-[1397px]" style={{fontFamily: "Playoffs"}}>
                    {nick2.toUpperCase()} BANNED<br/>{player2ban.toUpperCase()}
                </span>
                <img src={`https://mc-heads.net/avatar/${player1}/150`} className="absolute z-50 left-[525px] top-[905px]"/>
                <img src={`https://mc-heads.net/avatar/${player2}/150`} className="absolute z-50 right-[528px] top-[905px]"/>
            </div>
        </div>
    );
}
