"use client";

import { getValue, setValue} from "@/utils/database/interact";
import {useEffect, useState} from "react";

interface Props {
    player1key: string;
    player2key: string;
    matchkey: string;
    winnerKey?: string;
    loserKey?: string;
}

function splitScore(numStr: string): string[] {
    if (!numStr || !/^\d+$/.test(numStr)) {
        return ["0", "0"];
    }

    if (numStr.length === 1) {
        numStr = "0" + numStr;
    }

    if (numStr.length > 2) {
        numStr = numStr.slice(-2);
    }
    
    return numStr.split('');
}

function parseScoreForDisplay(numStr: string): string[] {
    // Wenn der String leer ist oder nicht nur Ziffern enthält
    if (!numStr || !/^\d+$/.test(numStr)) {
        return ["0", "0"];
    }

    if (numStr.length === 1) {
        numStr = "0" + numStr;
    }

    if (numStr.length === 2) {
        const scores = numStr.split('');
        return [String(Number(scores[0])), String(Number(scores[1]))];
    }

    return ["0", "0"];
}


export const Match:React.FC<Props> = ({player1key, player2key, matchkey, winnerKey, loserKey}) => {
    const [player1, setPlayer1] = useState<string>("");
    const [player2, setPlayer2] = useState<string>("");
    const [score1, setScore1] = useState<string>("");
    const [score2, setScore2] = useState<string>("");

    useEffect(() => {
        const fetchPlayers = async () => {
            setPlayer1(await getValue(player1key));
            setPlayer2(await getValue(player2key));
        };
        
        const fetchScores = async () => {
            const value = await getValue(matchkey);
            const scores = parseScoreForDisplay(value);
            setScore1(scores[0]);
            setScore2(scores[1]);
        };
        
        fetchPlayers();
        fetchScores();
        
        // Polling nur für Player-Namen alle 1 Sekunde
        const interval = setInterval(fetchPlayers, 1000);
        
        return () => clearInterval(interval);
    }, [player1key, player2key, matchkey]);

    const updateWinner = async (newScore1: string, newScore2: string) => {
        const score1Num = Number(newScore1);
        const score2Num = Number(newScore2);
        
        if (score1Num > score2Num) {
            // Player 1 gewinnt
            if (winnerKey) await setValue(winnerKey, player1);
            if (loserKey) await setValue(loserKey, player2);
        } else if (score2Num > score1Num) {
            // Player 2 gewinnt
            if (winnerKey) await setValue(winnerKey, player2);
            if (loserKey) await setValue(loserKey, player1);
        } else {
            // Gleichstand - Winner und Loser leer setzen
            if (winnerKey) await setValue(winnerKey, "");
            if (loserKey) await setValue(loserKey, "");
        }
    };

    const increase = async (player: number) => {
        if(player == 1){
            const currentScore1 = Number(score1) || 0;
            const currentScore2 = Number(score2) || 0;
            const newScore1 = currentScore1 + 1;
            // Begrenze Scores auf 9 für 1-stellige Formatierung
            const limitedScore1 = Math.min(newScore1, 9);
            const limitedScore2 = Math.min(currentScore2, 9);
            await setValue(matchkey, String(limitedScore1) + String(limitedScore2));
            setScore1(String(limitedScore1));
            await updateWinner(String(limitedScore1), String(limitedScore2));
        }else if(player == 2){
            const currentScore1 = Number(score1) || 0;
            const currentScore2 = Number(score2) || 0;
            const newScore2 = currentScore2 + 1;
            // Begrenze Scores auf 9 für 1-stellige Formatierung
            const limitedScore1 = Math.min(currentScore1, 9);
            const limitedScore2 = Math.min(newScore2, 9);
            await setValue(matchkey, String(limitedScore1) + String(limitedScore2));
            setScore2(String(limitedScore2));
            await updateWinner(String(limitedScore1), String(limitedScore2));
        }
    }



    const decrease = async (player: number) => {
        if(player == 1){
            const currentScore1 = Number(score1) || 0;
            const currentScore2 = Number(score2) || 0;
            const newScore1 = Math.max(0, currentScore1 - 1); // Verhindert negative Scores
            // Begrenze Scores auf 9 für 1-stellige Formatierung
            const limitedScore1 = Math.min(newScore1, 9);
            const limitedScore2 = Math.min(currentScore2, 9);
            await setValue(matchkey, String(limitedScore1) + String(limitedScore2));
            setScore1(String(limitedScore1));
            await updateWinner(String(limitedScore1), String(limitedScore2));
        }else if(player == 2){
            const currentScore1 = Number(score1) || 0;
            const currentScore2 = Number(score2) || 0;
            const newScore2 = Math.max(0, currentScore2 - 1); // Verhindert negative Scores
            // Begrenze Scores auf 9 für 1-stellige Formatierung
            const limitedScore1 = Math.min(currentScore1, 9);
            const limitedScore2 = Math.min(newScore2, 9);
            await setValue(matchkey, String(limitedScore1) + String(limitedScore2));
            setScore2(String(limitedScore2));
            await updateWinner(String(limitedScore1), String(limitedScore2));
        }
    }


    return (
        <div className="flex flex-col justify-between h-24 w-56 bg-neutral-200">
            <div className="flex justify-between w-full m-2">
                <span>{player1}</span>
                <div className="flex gap-2 pr-4">
                    <button className="bg-blue-400 px-1 rounded-md hover:bg-blue-300 transition-all cursor-pointer" onClick={() => decrease(1)}>-</button>
                    <span>{score1}</span>
                    <button className="bg-blue-400 px-1 rounded-md hover:bg-blue-300 transition-all cursor-pointer" onClick={() => increase(1)}>+</button>
                </div>
            </div>
            <div className="w-full h-1 bg-neutral-800"></div>
            <div className="flex justify-between w-full m-2">
                <span>{player2}</span>
                <div className="flex gap-2 pr-4">
                    <button className="bg-blue-400 px-1 rounded-md hover:bg-blue-300 transition-all cursor-pointer" onClick={() => decrease(2)}>-</button>
                    <span>{score2}</span>
                    <button className="bg-blue-400 px-1 rounded-md hover:bg-blue-300 transition-all cursor-pointer" onClick={() => increase(2)}>+</button>
                </div>
            </div>
        </div>
    )
}