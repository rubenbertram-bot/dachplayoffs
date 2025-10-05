import Layout from "@/components/layout";
import {ConfigField} from "@/components/ui/ConfigField";
import {ConfigDropdownField} from "@/components/ui/ConfigDropDown";

export default function ConfigPage() {
    return (
        <Layout>
            <div className="flex gap-16">
                <div className="flex flex-col gap-3">
                    <ConfigField configKey={"pause-player-1"} title={"1. Spieler"} />
                    <ConfigField configKey={"pause-score-1"} title={"1. Score"} />
                    <ConfigField configKey={"pause-nick-1"} title={"1. Nick"} />

                    <ConfigField configKey={"pause-player-2"} title={"2. Spieler"} />
                    <ConfigField configKey={"pause-score-2"} title={"2. Score"} />
                    <ConfigField configKey={"pause-nick-2"} title={"2. Nick"} />

                    <ConfigField configKey={"pause-player-3"} title={"3. Spieler"} />
                    <ConfigField configKey={"pause-score-3"} title={"3. Score"} />
                    <ConfigField configKey={"pause-nick-3"} title={"3. Nick"} />

                    <ConfigField configKey={"pause-player-4"} title={"4. Spieler"} />
                    <ConfigField configKey={"pause-score-4"} title={"4. Score"} />
                    <ConfigField configKey={"pause-nick-4"} title={"4. Nick"} />
                </div>
                <div className="flex flex-col gap-3">
                    <ConfigField configKey={"pause-player-5"} title={"5. Spieler"} />
                    <ConfigField configKey={"pause-score-5"} title={"5. Score"} />
                    <ConfigField configKey={"pause-nick-5"} title={"5. Nick"} />

                    <ConfigField configKey={"pause-player-6"} title={"6. Spieler"} />
                    <ConfigField configKey={"pause-score-6"} title={"6. Score"} />
                    <ConfigField configKey={"pause-nick-6"} title={"6. Nick"} />

                    <ConfigField configKey={"pause-player-7"} title={"7. Spieler"} />
                    <ConfigField configKey={"pause-score-7"} title={"7. Score"} />
                    <ConfigField configKey={"pause-nick-7"} title={"7. Nick"} />

                    <ConfigField configKey={"pause-player-8"} title={"8. Spieler"} />
                    <ConfigField configKey={"pause-score-8"} title={"8. Score"} />
                    <ConfigField configKey={"pause-nick-8"} title={"8. Nick"} />
                </div>
            </div>
        </Layout>
    );
}