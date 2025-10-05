import React from "react";

interface props {
    data: string[];
    seed: number;
}

export const LeaderboardRow:React.FC<props> = ({data, seed}) => {
    return (
        <div className="flex flex-col gap-2 mx-2">
            <span>Seed {seed}</span>
            {data && (
                <div className="flex flex-col gap-2 mx-2">
                    <span>1. {data[0+((seed-1) * 16)]}</span>
                    <span>2. {data[1+((seed-1) * 16)]}</span>
                    <span>3. {data[2+((seed-1) * 16)]}</span>
                    <span>4. {data[3+((seed-1) * 16)]}</span>
                    <span>5. {data[4+((seed-1) * 16)]}</span>
                    <span>6. {data[5+((seed-1) * 16)]}</span>
                    <span>7. {data[6+((seed-1) * 16)]}</span>
                    <span>8. {data[7+((seed-1) * 16)]}</span>
                    <span>9. {data[8+((seed-1) * 16)]}</span>
                    <span>10. {data[9+((seed-1) * 16)]}</span>
                    <span>11. {data[10+((seed-1) * 16)]}</span>
                    <span>12. {data[11+((seed-1) * 16)]}</span>
                    <span>13. {data[12+((seed-1) * 16)]}</span>
                    <span>14. {data[13+((seed-1) * 16)]}</span>
                    <span>15. {data[14+((seed-1) * 16)]}</span>
                    <span>16. {data[15+((seed-1) * 16)]}</span>
                </div>
            )}
        </div>
    )
}