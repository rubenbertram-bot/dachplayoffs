"use client";
import { Bracket } from "@/components/bracket/Bracket";
import {SidebarRoot} from "@/components/Sidebar/SidebarRoot";
import Layout from "@/components/layout";

export default function ConfigPage() {


    return (
        <Layout>
            <main className="flex items-center gap-12 p-8 h-screen">
                <div className="w-full h-[85%] pb-8 p-2">
                    <span>BRACKET DATA</span>
                    <Bracket />
                </div>
            </main>
        </Layout>
    );
}