"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getValue, setValue } from "@/utils/database/interact";

interface ConfigFieldProps {
    configKey: string;
    title: string;
    options: string[];
    displayNames: string[];
}

export const ConfigDropdownField: React.FC<ConfigFieldProps> = ({
                                                            title,
                                                            configKey,
                                                            options,
                                                            displayNames,
                                                        }) => {
    const [configValue, setConfigValue] = useState<string>(options[0]); // default auf erste Option
    const [saved, setSaved] = useState(false);

    // Wert aus DB laden
    useEffect(() => {
        const loadValue = async () => {
            try {
                const value = await getValue(configKey);
                if (value && options.includes(value)) {
                    setConfigValue(value);
                } else {
                    setConfigValue(options[0]); // fallback
                }
            } catch (e) {
                console.error("Fehler beim Laden", e);
                setConfigValue(options[0]);
            }
        };
        loadValue();
    }, [configKey, options]);

    // Wert speichern
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

            <select
                value={configValue}
                onChange={(e) => setConfigValue(e.target.value)}
                className="w-48 bg-neutral-200 p-1 rounded-md"
            >
                {options.map((opt, idx) => (
                    <option key={opt} value={opt}>
                        {displayNames[idx] ?? opt}
                    </option>
                ))}
            </select>

            <button
                className="bg-blue-200 rounded-md py-1 px-8 hover:bg-blue-300"
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
