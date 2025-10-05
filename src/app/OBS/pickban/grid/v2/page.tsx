"use client";
import { useEffect, useState } from "react";
import { getValue } from "@/utils/database/interact";
import { Scene0 } from "@/components/pickban/scene0";
import { Scene1 } from "@/components/pickban/scene1";
import { Stinger } from "@/components/stinger/transition";

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

    // lokaler State für den sichtbaren Cut
    const [activeScene, setActiveScene] = useState(scene);

    // Delay in ms (z.B. 600ms)
    const CUT_DELAY = 600;

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
        };

        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    // wenn scene sich ändert → nach Delay den Cut machen
    useEffect(() => {
        const t = setTimeout(() => setActiveScene(scene), CUT_DELAY);
        return () => clearTimeout(t);
    }, [scene]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Szene */}
            {activeScene === "0" && (
                <Scene0
                    pick1={pick1} pick2={pick2} pick3={pick3} pick4={pick4} pick5={pick5}
                    player1={player1} player2={player2}
                    nick1={nick1} nick2={nick2}
                    player1ban={player1ban} player2ban={player2ban}
                />
            )}
            {activeScene === "1" && (
                <Scene1
                    pick={pick}
                    pickPlayer={pickPlayer}
                    player1={player1} player2={player2}
                    nick1={nick1} nick2={nick2}
                    player1ban={player1ban} player2ban={player2ban}
                />
            )}

            {/* Stinger Overlay */}
            <div className="absolute z-30">
                <Stinger scene={scene} />
            </div>

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
