import {Match} from "@/components/bracket/Match";
import {ResetButton} from "@/components/bracket/ResetButton";

export const Bracket = () => {
    return (
        <div className="relative w-full h-full">
            <div className="flex justify-between w-full h-full pb-28">
                <div className="flex flex-col justify-between gap-2">
                    <Match player1key={"player-1"} player2key={"player-2"} matchkey={"match-1"} winnerKey={"winner-match-1"}/>
                    <Match player1key={"player-3"} player2key={"player-4"} matchkey={"match-2"} winnerKey={"winner-match-2"}/>
                    <Match player1key={"player-5"} player2key={"player-6"} matchkey={"match-3"} winnerKey={"winner-match-3"}/>
                    <Match player1key={"player-7"} player2key={"player-8"} matchkey={"match-4"} winnerKey={"winner-match-4"}/>
                    <Match player1key={"player-9"} player2key={"player-10"} matchkey={"match-5"} winnerKey={"winner-match-5"}/>
                    <Match player1key={"player-11"} player2key={"player-12"} matchkey={"match-6"} winnerKey={"winner-match-6"}/>
                    <Match player1key={"player-13"} player2key={"player-14"} matchkey={"match-7"} winnerKey={"winner-match-7"}/>
                    <Match player1key={"player-15"} player2key={"player-16"} matchkey={"match-8"} winnerKey={"winner-match-8"}/>
                </div>
                <div className="flex flex-col justify-between gap-2">
                    <Match player1key={"winner-match-1"} player2key={"winner-match-2"} matchkey={"match-9"} winnerKey={"winner-match-9"}/>
                    <Match player1key={"winner-match-3"} player2key={"winner-match-4"} matchkey={"match-10"} winnerKey={"winner-match-10"}/>
                    <Match player1key={"winner-match-5"} player2key={"winner-match-6"} matchkey={"match-11"} winnerKey={"winner-match-11"}/>
                    <Match player1key={"winner-match-7"} player2key={"winner-match-8"} matchkey={"match-12"} winnerKey={"winner-match-12"}/>
                </div>
                <div className="flex flex-col justify-between gap-2">
                    <Match player1key={"winner-match-9"} player2key={"winner-match-10"} matchkey={"match-13"} winnerKey={"winner-match-13"} loserKey={"loser-match-13"}/>
                    <Match player1key={"winner-match-11"} player2key={"winner-match-12"} matchkey={"match-14"} winnerKey={"winner-match-14"} loserKey={"loser-match-14"} />
                </div>
                <div className="flex flex-col justify-between gap-2">
                    <Match player1key={"winner-match-13"} player2key={"winner-match-14"} matchkey={"match-15"} winnerKey={"winner-match-15"} loserKey={"loser-match-15"}/>
                    <Match player1key={"loser-match-13"} player2key={"loser-match-14"} matchkey={"match-16"} winnerKey={"winner-match-16"}/>
                </div>
            </div>
            <ResetButton />
        </div>
    )
}