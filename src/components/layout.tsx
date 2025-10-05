import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="ml-64 w-full">
                <main className="flex-1 bg-gray-100 min-h-screen p-6">{children}</main>
            </div>
        </div>
    );
}
