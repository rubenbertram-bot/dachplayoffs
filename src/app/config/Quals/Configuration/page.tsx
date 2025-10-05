"use client";
import Layout from "@/components/layout";
import {useState} from "react";
import {ConfigField} from "@/components/ui/ConfigField";

export default function ConfigPage() {

    return (
        <Layout>
            <ConfigField configKey={"RANKED-API-PRIVATE-KEY"} title={"PRIVATE API KEY"}/>
        </Layout>
    );
}