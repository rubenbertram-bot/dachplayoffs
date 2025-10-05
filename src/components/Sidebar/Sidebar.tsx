"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { FaDatabase, FaLayerGroup } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";
import { IoLogOut } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineLeaderboard } from "react-icons/md";

interface SidebarLink {
    name: string;
    icon: JSX.Element;
    href?: string;
    children?: SidebarLink[];
}

const sidebarLinks: SidebarLink[] = [
    {
        name: "Startseite",
        icon: <MdHome />,
        href: "/config/home",
    },
    {
        name: "Qualifier",
        icon: <FaLayerGroup />,
        children: [
            { name: "Configuration", icon: <FaGear />, href: "/config/Quals/Configuration" },
            { name: "Leaderboard", icon: <MdOutlineLeaderboard />, href: "/config/Quals/Leaderboard" },
            { name: "Data", icon: <FaDatabase />, href: "/config/Quals/Data" },
            { name: "Overlay", icon: <TfiLayoutMediaOverlay />, href: "/config/Quals/Overlay" },
        ],
    },
    {
        name: "Match",
        icon: <FaLayerGroup />,
        children: [
            { name: "Data", icon: <FaDatabase />, href: "/config/Match/Data" },
        ],
    },
    {
        name: "Szenen",
        icon: <FaLayerGroup />,
        children: [
            { name: "Bracket", icon: <TfiLayoutMediaOverlay />, href: "/config/Szenen/Bracket" },
            { name: "Pause", icon: <TfiLayoutMediaOverlay />, href: "/config/Szenen/Pause" },
            { name: "Pick/Ban", icon: <TfiLayoutMediaOverlay />, href: "/config/Szenen/PickBan" },
        ],
    },
    {
        name: "Abmelden",
        icon: <IoLogOut />,
        href: "/config/",
    },
];

export default function Sidebar() {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleIndex = (index: number) => {
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <aside
            className="
                w-64
                bg-gray-900
                text-gray-200
                h-screen
                flex
                flex-col
                fixed
                top-0
                left-0
                z-20
                shadow-lg
                overflow-y-auto
            "
        >
            <div className="px-4 text-lg font-bold border-b border-gray-700 sticky top-0 bg-gray-900 z-30">
                <div className="flex gap-4">
                    <img src={"/logo.png"} alt="logo" className="w-20 pt-2" />
                    <span className="text-2xl font-bold pt-7">CONFIG</span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                    {sidebarLinks.map((link, i) => {
                        const hasChildren = !!link.children;
                        const isOpen = openIndexes.includes(i);

                        if (!hasChildren) {
                            return (
                                <li key={i}>
                                    <Link
                                        href={link.href || "#"}
                                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="text-xl">{link.icon}</span>
                                        <span className="flex-1 text-left">{link.name}</span>
                                    </Link>
                                </li>
                            );
                        }

                        return (
                            <li key={i}>
                                <button
                                    onClick={() => toggleIndex(i)}
                                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-800 transition-colors"
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    <span className="flex-1 text-left">{link.name}</span>
                                    <span className="ml-auto">
                                        {isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                                    </span>
                                </button>

                                {isOpen && link.children && (
                                    <ul className="pl-8 mt-1 space-y-1">
                                        {link.children.map((child, j) => (
                                            <li key={j}>
                                                <Link
                                                    href={child.href || "#"}
                                                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-800 transition-colors"
                                                >
                                                    {child.icon}
                                                    <span>{child.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
