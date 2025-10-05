"use client";

import { useState, useRef, useEffect } from "react";
import { getValue, setValue } from "@/utils/database/interact";

interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    databaseKey?: string; // Optional: Key für Datenbank-Speicherung
}

export const Dropdown: React.FC<DropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = "",
    className = "",
    databaseKey
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lade Wert aus Datenbank beim Initial Load
    useEffect(() => {
        if (databaseKey) {
            const loadFromDatabase = async () => {
                try {
                    const dbValue = await getValue(databaseKey);
                    if (dbValue && dbValue !== value) {
                        onChange(dbValue);
                    }
                } catch (error) {
                    console.error("Fehler beim Laden aus Datenbank:", error);
                }
            };
            loadFromDatabase();
        }
    }, [databaseKey, onChange, value]);

    // Schließe Dropdown wenn außerhalb geklickt wird
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedOption = options.find(option => option.value === value);

    const handleSelect = async (optionValue: string) => {
        onChange(optionValue);
        
        // Speichere in Datenbank wenn databaseKey vorhanden
        if (databaseKey) {
            try {
                await setValue(databaseKey, optionValue);
            } catch (error) {
                console.error("Fehler beim Speichern in Datenbank:", error);
            }
        }
        
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
            >
                <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
                    {selectedOption ? selectedOption.label : (placeholder || "Select an option")}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                                value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
