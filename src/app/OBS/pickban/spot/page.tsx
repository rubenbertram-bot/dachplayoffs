"use client";



import {useEffect, useState} from "react";
import {getValue} from "@/utils/database/interact";

export default function home(){

    const [player1, setPlayer1] = useState<string>("doogile");
    const [player2, setPlayer2] = useState<string>("bing_pigs");
    const [nick1, setNick1] = useState<string>("doog");
    const [nick2, setNick2] = useState<string>("Mongey");
    const [player1ban,  setPlayer1ban] = useState<string>("RUINED PORTAL");
    const [player2ban,  setPlayer2ban] = useState<string>("BURRIED TREASURE");
    const [pick, setPick] = useState<string>("dt");
    const [pickPlayer, setPickPlayer] = useState<string>("1");

    useEffect(() => {
        const loadData = async () => {
            const keys = [
                "pickban-player-1", "pickban-player-2", "pickban-nick-1", "pickban-nick-2",
                "pickban-ban-1", "pickban-ban-2", "pickban-spot-type", "pickban-spot-player"
            ];

            const values = await Promise.all(keys.map(k => getValue(k)));

            setPlayer1(values[0]);
            setPlayer2(values[1]);
            setNick1(values[2]);
            setNick2(values[3]);
            setPlayer1ban(values[4]);
            setPlayer2ban(values[5]);
            setPick(values[6]);
            setPickPlayer(values[7]);
        };

        // sofort einmal laden
        loadData();

        // dann alle 3s wiederholen
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    return <div>
        <img src={"/pickban/bgs/Overlay.png"} alt="" className="w-full h-full absolute"/>
        <img src={"/pickban/bar.png"} alt="" className="w-full absolute bottom-0"/>
        <div className="w-full h-full absolute ">

            <div>
                <span className="text-white text-2xl text-right absolute top-[980px] right-[1400px]" style={{fontFamily: "Playoffs"}}>{nick1.toUpperCase()} BANNED<br/>{player1ban.toUpperCase()}</span>
                <span className="text-white text-2xl text-left absolute top-[980px] left-[1397px]" style={{fontFamily: "Playoffs"}}>{nick2.toUpperCase()} BANNED<br/>{player2ban.toUpperCase()}</span>
                <img src={`https://mc-heads.net/avatar/${player1}/150`} className="absolute left-[525px] top-[905px]"/>
                <img src={`https://mc-heads.net/avatar/${player2}/150`} className="absolute right-[528px] top-[905px]"/>
            </div>

            {pickPlayer == "1" ?
                <img src={`https://minotar.net/helm/${player1}/256.png`}
                     className="absolute w-[150px] h-[150px] left-[55.3rem] top-[21.55rem]" alt={"RAHMEN"}/> :
                <img src={`https://minotar.net/helm/${player2}/256.png`}
                     className="absolute w-[150px] h-[150px] left-[55.3rem] top-[21.55rem]" alt={"RAHMEN"}/>
            }

            {pick == "ship" &&
                <span className="absolute w-full text-center z-10 text-white text-[7rem] top-[35rem]" style={{fontFamily: "Playoffs"}}>SHIPWRECK</span>}
            {pick == "bt" &&
                <span className="absolute w-full text-center z-10 text-white text-[7rem] top-[35rem]" style={{fontFamily: "Playoffs"}}>BURIED TREASURE</span>}
            {pick == "rp" &&
                <span className="absolute w-full text-center z-10 text-white text-[7rem] top-[35rem]" style={{fontFamily: "Playoffs"}}>RUINED PORTAL</span>}
            {pick == "dt" &&
                <span className="absolute w-full text-center z-10 text-white text-[7rem] top-[35rem]" style={{fontFamily: "Playoffs"}}>DESERT TEMPEL</span>}
            {pick == "village" &&
                <span className="absolute w-full text-center z-10 text-white text-[7rem] top-[35rem]" style={{fontFamily: "Playoffs"}}>VILLAGE</span>}

            <div className="w-full h-full absolute bg-black z-[-10]">
                {pick == "ship" &&
                    <img src={"/pickban/bgs/Shipwreck.png"} width={1920} height={1080} className="absolute z-0"/>}
                {pick == "bt" &&
                    <img src={"/pickban/bgs/Buried_Treasure.png"} width={1920} height={1080} className="absolute z-0"/>}
                {pick == "rp" &&
                    <img src={"/pickban/bgs/ruined_portal.png"} width={1920} height={1080} className="absolute z-0"/>}
                {pick == "dt" &&
                    <img src={"/pickban/bgs/Desert_Tempel.png"} width={1920} height={1080} className="absolute z-0"/>}
                {pick == "village" &&
                    <img src={"/pickban/bgs/Village.png"} width={1920} height={1080} className="absolute z-0"/>}
            </div>

        </div>
    </div>;

}