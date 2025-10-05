"use client";
import React, {useEffect, useState, useCallback} from "react";
import {getValue, setValue} from "@/utils/database/interact";

interface ConfigFieldProps {
    configKey: string,
    title: string,
}

export const ConfigField: React.FC<ConfigFieldProps> = ({title, configKey}) => {
    const [configValue, setConfigValue] = useState<string>("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const loadValue = async () => {
            try {
                const value = await getValue(configKey);
                setConfigValue(value ?? "");
            } catch (e) {
                console.error("Fehler beim Laden", e);
            }
        };
        loadValue();
    }, [configKey]);

    const save = useCallback(async () => {
        try {
            await setValue(configKey, configValue);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (e) {
            console.error("Fehler beim Speichern", e);
        }
    }, [configKey, configValue]);

    return (
        <div className="flex gap-2 items-center">
            <label className="font-medium">{title}</label>
            <input
                type="text"
                onChange={(event) => setConfigValue(event.target.value)}
                value={configValue}
                className="w-48 bg-neutral-200"
            />
            <button
                className="bg-blue-200 rounded-md py-1 px-8 hover:bg-blue-300 "
                onClick={save}
            >
                SAVE
            </button>
            {saved && (
                <span className="text-green-600 font-medium">Successfully saved!</span>
            )}
        </div>
    );
};
