import Layout from "@/components/layout";
import {ConfigField} from "@/components/ui/ConfigField";
import {ConfigDropdownField} from "@/components/ui/ConfigDropDown";

export default function ConfigPage() {
    return (
        <Layout>
            <div className="flex flex-col gap-2">
                <span>Players:</span>
                <ConfigField configKey={"pickban-player-1"} title={"Player 1 Skin"} />
                <ConfigField configKey={"pickban-nick-1"} title={"Player 1 Nick"} />
                <ConfigField configKey={"pickban-player-2"} title={"Player 2 Skin"} />
                <ConfigField configKey={"pickban-nick-2"} title={"Player 2 Nick"} />
                <span>Bans:</span>
                <ConfigDropdownField configKey={"pickban-ban-1"} title={"Player 1 Ban"} options={["BURIED TREASURE", "DESERT TEMPEL", "RUINED PORTAL", "SHIPWRECK", "VILLAGE"]} displayNames={["Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <ConfigDropdownField configKey={"pickban-ban-2"} title={"Player 2 Ban"} options={["BURIED TREASURE", "DESERT TEMPEL", "RUINED PORTAL", "SHIPWRECK", "VILLAGE"]} displayNames={["Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <span>Picks:</span>
                <ConfigDropdownField configKey={"pickban-pick-1"} title={"Player 1 Picked (seed 1)"} options={["", "bt", "dt", "rp", "ship", "village"]} displayNames={["hidden", "Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <ConfigDropdownField configKey={"pickban-pick-2"} title={"Player 2 Picked (seed 2)"} options={["", "bt", "dt", "rp", "ship", "village"]} displayNames={["hidden", "Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <ConfigDropdownField configKey={"pickban-pick-3"} title={"Player 1 Picked (seed 3)"} options={["", "bt", "dt", "rp", "ship", "village"]} displayNames={["hidden", "Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <ConfigDropdownField configKey={"pickban-pick-4"} title={"Player 2 Picked (seed 4)"} options={["", "bt", "dt", "rp", "ship", "village"]} displayNames={["hidden", "Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <ConfigDropdownField configKey={"pickban-pick-5"} title={"Player 1 Picked (seed 5)"} options={["", "bt", "dt", "rp", "ship", "village"]} displayNames={["hidden", "Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <span>Spot:</span>
                <ConfigDropdownField configKey={"pickban-spot-type"} title={"Player 1 Picked (seed 1)"} options={["bt", "dt", "rp", "ship", "village"]} displayNames={["Buried Treasure", "Desert Tempel", "Ruined Portal", "Shipwreck", "Village"]}/>
                <ConfigDropdownField configKey={"pickban-spot-player"} title={"Picking Player"} options={["1", "2"]} displayNames={["Player 1", "Player 2"]}/>
                <span>Visible:</span>
                <ConfigDropdownField configKey={"pickban-visible"} title={"Szene "} options={["0", "1"]} displayNames={["Grid", "Spot"]}/>

            </div>
        </Layout>
    );
}