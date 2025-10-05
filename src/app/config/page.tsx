"use client";
import { useState } from "react";
import { Bracket } from "@/components/bracket/Bracket";
import { Dropdown } from "@/components/ui/Dropdown";
import { CopyTextField } from "@/components/ui/CopyTextField";

export default function ConfigPage() {

    const [showBracket, setShowBracket] = useState<boolean>(false);
    const [showPages, setShowPages] = useState<boolean>(true);
    const [showQuals, setShowQuals] = useState<boolean>(false);
    const [selectedPausePage, setSelectedPausePage] = useState<string>("1");
    const [pageUrl, setPageUrl] = useState<string>("https://obs.dach-playoffs.de/OBS/pause");


    return (
        <main className="flex flex-col items-center gap-4 p-8 h-screen">
            LOGIN TO CONTINUE
        </main>
    );
}