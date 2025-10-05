"use client";
import { useEffect, useState } from "react";
import { getValue } from "@/utils/database/interact";

const PausePage = () => {
    const [player1Name, setPlayer1Name] = useState<string>('Ptitotonin');
    const [player2Name, setPlayer2Name] = useState<string>('Ptitotonin');
    const [player3Name, setPlayer3Name] = useState<string>('Ptitotonin');
    const [player4Name, setPlayer4Name] = useState<string>('Ptitotonin');
    const [player5Name, setPlayer5Name] = useState<string>('Ptitotonin');
    const [player6Name, setPlayer6Name] = useState<string>('Ptitotonin');
    const [player7Name, setPlayer7Name] = useState<string>('Ptitotonin');
    const [player8Name, setPlayer8Name] = useState<string>('Ptitotonin');

    const [player1Score, setPlayer1Score] = useState<string>("0");
    const [player2Score, setPlayer2Score] = useState<string>("0");
    const [player3Score, setPlayer3Score] = useState<string>("0");
    const [player4Score, setPlayer4Score] = useState<string>("0");
    const [player5Score, setPlayer5Score] = useState<string>("0");
    const [player6Score, setPlayer6Score] = useState<string>("0");
    const [player7Score, setPlayer7Score] = useState<string>("0");
    const [player8Score, setPlayer8Score] = useState<string>("0");

    const [player1Nick, setPlayer1Nick] = useState<string>("LOADING");
    const [player2Nick, setPlayer2Nick] = useState<string>("LOADING");
    const [player3Nick, setPlayer3Nick] = useState<string>("LOADING");
    const [player4Nick, setPlayer4Nick] = useState<string>("LOADING");
    const [player5Nick, setPlayer5Nick] = useState<string>("LOADING");
    const [player6Nick, setPlayer6Nick] = useState<string>("LOADING");
    const [player7Nick, setPlayer7Nick] = useState<string>("LOADING");
    const [player8Nick, setPlayer8Nick] = useState<string>("LOADING");

    useEffect(() => {
        const loadData = async () => {
            const keys = [
                "pause-player-1", "pause-player-2", "pause-player-3", "pause-player-4",
                "pause-player-5", "pause-player-6", "pause-player-7", "pause-player-8",

                "pause-score-1", "pause-score-2", "pause-score-3", "pause-score-4",
                "pause-score-5", "pause-score-6", "pause-score-7", "pause-score-8",

                "pause-nick-1", "pause-nick-2", "pause-nick-3", "pause-nick-4",
                "pause-nick-5", "pause-nick-6", "pause-nick-7", "pause-nick-8",
            ];

            const values = await Promise.all(keys.map(k => getValue(k)));

            // Namen
            setPlayer1Name(values[0]);
            setPlayer2Name(values[1]);
            setPlayer3Name(values[2]);
            setPlayer4Name(values[3]);
            setPlayer5Name(values[4]);
            setPlayer6Name(values[5]);
            setPlayer7Name(values[6]);
            setPlayer8Name(values[7]);

            // Scores
            setPlayer1Score(values[8]);
            setPlayer2Score(values[9]);
            setPlayer3Score(values[10]);
            setPlayer4Score(values[11]);
            setPlayer5Score(values[12]);
            setPlayer6Score(values[13]);
            setPlayer7Score(values[14]);
            setPlayer8Score(values[15]);

            // Nicks
            setPlayer1Nick(values[16]);
            setPlayer2Nick(values[17]);
            setPlayer3Nick(values[18]);
            setPlayer4Nick(values[19]);
            setPlayer5Nick(values[20]);
            setPlayer6Nick(values[21]);
            setPlayer7Nick(values[22]);
            setPlayer8Nick(values[23]);
        };

        // sofort einmal laden
        loadData();

        // dann alle 3s wiederholen
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <div>
            <img src={"/GameplanNeu.png"} alt={""} className="absolute z-[-10]" />
            <img src={`https://mc-heads.net/avatar/${player1Name}/118`} className="absolute left-[700px] top-[200px]" />
            <img src={`https://mc-heads.net/avatar/${player2Name}/118`} className="absolute left-[1707px] top-[200px]" />
            <img src={`https://mc-heads.net/avatar/${player3Name}/118`} className="absolute left-[700px] top-[401px]" />
            <img src={`https://mc-heads.net/avatar/${player4Name}/118`} className="absolute left-[1707px] top-[401px]" />
            <img src={`https://mc-heads.net/avatar/${player5Name}/118`} className="absolute left-[700px] top-[602px]" />
            <img src={`https://mc-heads.net/avatar/${player6Name}/118`} className="absolute left-[1707px] top-[602px]" />
            <img src={`https://mc-heads.net/avatar/${player7Name}/118`} className="absolute left-[700px] top-[796px]" />
            <img src={`https://mc-heads.net/avatar/${player8Name}/118`} className="absolute left-[1707px] top-[796px]" />

            {/* Player 1 */}
            {player1Nick === ""
                ? <span className="absolute left-[912px] top-[205px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player1Name.toUpperCase()}</span>
                : <span className="absolute left-[912px] top-[205px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player1Nick.toUpperCase()}</span>}
            {player2Nick === ""
                ? <span className="absolute right-[308px] top-[205px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player2Name.toUpperCase()}</span>
                : <span className="absolute right-[308px] top-[205px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player2Nick.toUpperCase()}</span>}
            <span className="absolute left-[1000px] top-[260px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player1Score.toString().toUpperCase()}</span>
            <span className="absolute right-[390px] top-[260px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player2Score.toString().toUpperCase()}</span>

            {/* Player 3 */}
            {player3Nick === ""
                ? <span className="absolute left-[912px] top-[406px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player3Name.toUpperCase()}</span>
                : <span className="absolute left-[912px] top-[406px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player3Nick.toUpperCase()}</span>}
            {player4Nick === ""
                ? <span className="absolute right-[308px] top-[406px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player4Name.toUpperCase()}</span>
                : <span className="absolute right-[308px] top-[406px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player4Nick.toUpperCase()}</span>}
            <span className="absolute left-[1000px] top-[461px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player3Score.toString().toUpperCase()}</span>
            <span className="absolute right-[390px] top-[461px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player4Score.toString().toUpperCase()}</span>

            {/* Player 5 */}
            {player5Nick === ""
                ? <span className="absolute left-[912px] top-[606px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player5Name.toUpperCase()}</span>
                : <span className="absolute left-[912px] top-[606px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player5Nick.toUpperCase()}</span>}
            {player6Nick === ""
                ? <span className="absolute right-[308px] top-[606px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player6Name.toUpperCase()}</span>
                : <span className="absolute right-[308px] top-[606px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player6Nick.toUpperCase()}</span>}
            <span className="absolute left-[1000px] top-[658px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player5Score.toString().toUpperCase()}</span>
            <span className="absolute right-[390px] top-[658px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player6Score.toString().toUpperCase()}</span>

            {/* Player 7 */}
            {player7Nick === ""
                ? <span className="absolute left-[912px] top-[804px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player7Name.toUpperCase()}</span>
                : <span className="absolute left-[912px] top-[804px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player7Nick.toUpperCase()}</span>}
            {player8Nick === ""
                ? <span className="absolute right-[308px] top-[804px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player8Name.toUpperCase()}</span>
                : <span className="absolute right-[308px] top-[804px] text-white text-xl" style={{ fontFamily: 'Playoffs' }}>{player8Nick.toUpperCase()}</span>}
            <span className="absolute left-[1000px] top-[858px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player7Score.toString().toUpperCase()}</span>
            <span className="absolute right-[390px] top-[858px] text-white text-8xl" style={{ fontFamily: 'Playoffs' }}>{player8Score.toString().toUpperCase()}</span>
        </div>
    );
};

export default PausePage;
