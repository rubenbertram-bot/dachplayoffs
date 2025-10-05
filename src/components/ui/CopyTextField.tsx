"use client";

import { useState } from "react";
import { FiCopy } from "react-icons/fi";

interface CopyTextFieldProps {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
}

export const CopyTextField: React.FC<CopyTextFieldProps> = ({
    value,
    onChange,
    placeholder = "",
    className = "",
    readOnly = false
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset nach 2 Sekunden
        } catch (error) {
            console.error("Fehler beim Kopieren:", error);
        }
    };

    return (
        <div className={`flex gap-2 items-center w-full ${className}`}>
            <div className="relative w-full">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    className={`w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors ${
                        readOnly ? 'bg-gray-50 cursor-default' : 'bg-white'
                    }`}
                />
                <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    title={copied ? "Kopiert!" : "In Zwischenablage kopieren"}
                >
                    <FiCopy className={`w-5 h-5 ${copied ? 'text-green-500' : ''}`} />
                </button>
            </div>
            {copied && (
                <span className="text-sm text-green-600">
                    Copied!
                </span>
            )}
        </div>
    );
};
