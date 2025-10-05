import {RefObject} from "react";

interface PreviewProps {
    alias: string;
    index: number;
    swap: (num1: number, num2: number) => void;
    deleteFunc: (num1: number) => void;
    active: number[];
}

export const Preview: React.FC<PreviewProps> = ({alias, swap, index, active, deleteFunc}) => {


    return (
        <div className="bg-neutral-400 w-fit flex">
            <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between">
                    <span className="text-md ml-1"> {alias}</span>
                    <button className="bg-red-600 hover:bg-red-400 rounded-md mr-1" onClick={() => {
                        deleteFunc(index)
                    }}>🗑️</button>
                </div>
                <div className="flex gap-1">
                    {active[0] == index ? (
                        <button>
                            <div
                                className="w-7 h-6 bg-purple-600 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-5 h-4 flex items-center justify-center">
                                    <span
                                        className="font-extrabold text-purple-600 transition-all">M</span>
                                </div>
                            </div>
                        </button>
                    ) : (
                        <button onClick={() => swap(index, 0)}>
                            <div
                                className="w-7 h-6 bg-red-600 hover:bg-red-400 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-5 h-4 flex items-center justify-center">
                                    <span
                                        className="font-extrabold text-red-600 hover:text-red-400 transition-all">M</span>
                                </div>
                            </div>
                        </button>
                    )}


                    {active[1] == index ? (
                        <button>
                            <div
                                className="w-8 h-6 bg-purple-600 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-6 h-4 flex items-center justify-center">
                                    <span
                                        className="font-extrabold text-purple-600 transition-all">1</span>
                                </div>
                            </div>
                        </button>
                    ) : (
                        <button onClick={() => swap(index, 1)}>
                            <div
                                className="w-8 h-6 bg-red-600 hover:bg-red-400 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-6 h-4 flex items-center justify-center">
                                    <span
                                        className="font-extrabold text-red-600 hover:text-red-400 transition-all">1</span>
                                </div>
                            </div>
                        </button>
                    )}


                    {active[2] == index ? (
                        <button>
                            <div
                                className="w-8 h-6 bg-purple-600 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-6 h-4 flex items-center justify-center">
                                    <span
                                        className="font-extrabold text-purple-600 transition-all">2</span>
                                </div>
                            </div>
                        </button>
                    ):(
                        <button onClick={() => swap(index, 2)}>
                            <div
                                className="w-8 h-6 bg-red-600 hover:bg-red-400 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-6 h-4 flex items-center justify-center">
                                    <span className="font-extrabold text-red-600 hover:text-red-400 transition-all">2</span>
                                </div>
                            </div>
                        </button>
                    )}

                    {active[3] == index ? (
                        <button>
                            <div
                                className="w-8 h-6 bg-purple-600 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-6 h-4 flex items-center justify-center">
                                    <span
                                        className="font-extrabold text-purple-600 transition-all">3</span>
                                </div>
                            </div>
                        </button>
                    ):(
                        <button onClick={() => swap(index, 3)}>
                            <div
                                className="w-8 h-6 bg-red-600 hover:bg-red-400 flex items-center justify-center transition-all">
                                <div className="bg-white absolute w-6 h-4 flex items-center justify-center">
                                    <span className="font-extrabold text-red-600 hover:text-red-400 transition-all">3</span>
                                </div>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}