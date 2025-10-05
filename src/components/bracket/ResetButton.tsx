"use client";

import { setValue } from "@/utils/database/interact";
import { useState } from "react";

export const ResetButton = () => {
    const [isResetting, setIsResetting] = useState(false);

    const resetAll = async () => {
        setIsResetting(true);
        
        try {
            // Reset alle Match-Scores (match-1 bis match-16)
            const matchPromises = [];
            for (let i = 1; i <= 16; i++) {
                matchPromises.push(setValue(`match-${i}`, "00"));
            }
            
            // Reset alle Winner-Keys (winner-match-1 bis winner-match-16)
            const winnerPromises = [];
            for (let i = 1; i <= 16; i++) {
                winnerPromises.push(setValue(`winner-match-${i}`, ""));
            }
            
            // Reset alle Loser-Keys (loser-match-13 bis loser-match-16)
            const loserPromises = [];
            for (let i = 13; i <= 16; i++) {
                loserPromises.push(setValue(`loser-match-${i}`, ""));
            }
            
            // Warte auf alle Resets
            await Promise.all([...matchPromises, ...winnerPromises, ...loserPromises]);
            
            // Seite neu laden nach dem Reset
            window.location.reload();
            
        } catch (error) {
            console.error("Fehler beim Reset:", error);
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <button
            onClick={resetAll}
            disabled={isResetting}
            className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 font-medium z-10"
        >
            {isResetting ? "Resetting..." : "Reset All"}
        </button>
    );
};
