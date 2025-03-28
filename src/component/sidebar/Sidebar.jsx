"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/sidebar.js";
import Containers from "../container/Containers.jsx";
import { Menu, CirclePlus, FileText, MoreVertical, Brain, HelpCircle, History, Settings, Gem, ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
    const dispatch = useDispatch();
    const menuOpen = useSelector((state) => state.sidebar.menuOpen);

    const [recentOpen, setRecentOpen] = useState(true);
    const [gemsOpen, setGemsOpen] = useState(true);

    const handleNewChat = () => {
        alert("New Chat Clicked! (Implement chat clearing logic here)");
    };

    const handleRecentChatClick = (chatTitle) => {
        alert(`Opening chat: ${chatTitle}`);
    };

    const handleGemClick = (gemTitle) => {
        alert(`Activating gem: ${gemTitle}`);
    };

    return (
        <Containers className={`hidden sm:block min-h-screen bg-[#f0f3f8] transition-all duration-300 ease-in-out 
            ${menuOpen ? "w-1/5" : "w-16"}`}>

            {/* Sidebar Toggle Button */}
            <div className="mx-1 px-1 w-full justify-start">
                <div onClick={() => dispatch(toggleSidebar())} className="my-8 inline-block text-2xl hover:rounded-full hover:bg-gray-600/30 p-2 cursor-pointer">
                    <Menu />
                </div>

                {/* New Chat Button */}
                <div className={`flex justify-evenly items-center border ${menuOpen ? "border-black/15" : "border-0"} rounded-full hover:bg-gray-600/30 text-xl py-2 mx-4 mb-8 cursor-pointer`}
                    onClick={handleNewChat}>
                    {menuOpen ? <>
                        <CirclePlus className="font-bold" />
                        <button>New Chat</button>
                    </> : <CirclePlus className="rounded-full bg-white/40 text-7xl" />}
                </div>

                {/* Recent Chats Section */}
                {menuOpen && (
                    <div className="p-2 mb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setRecentOpen(!recentOpen)}>
                            <h6 className="text-md">Recent</h6>
                            {recentOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                        {recentOpen && (
                            <>
                                {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
                                    <div key={index} className="flex my-1 justify-between items-center gap-2 px-1 py-1 hover:bg-gray-600/30 rounded-md cursor-pointer"
                                        onClick={() => handleRecentChatClick(chat)}>
                                        <FileText />
                                        <span>{chat}</span>
                                        <button className="p-1 rounded-full hover:bg-white/50">
                                            <MoreVertical />
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                {/* Gems Section */}
                {menuOpen && (
                    <div className="p-2 mb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setGemsOpen(!gemsOpen)}>
                            <h6 className="text-md">Gems</h6>
                            {gemsOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                        {gemsOpen && (
                            <>
                                {[
                                    { icon: <Brain className="text-xl rounded-full bg-white/40" />, title: "Chesschamp" },
                                    { icon: <Brain className="text-xl rounded-full bg-white/40" />, title: "Career guide" },
                                    { icon: <Brain className="text-xl rounded-full bg-white/40" />, title: "Brainstormer" }
                                ].map((gem, index) => (
                                    <div key={index} className="flex my-1 justify-between items-center gap-2 px-1 py-1 hover:bg-gray-600/30 rounded-md cursor-pointer"
                                        onClick={() => handleGemClick(gem.title)}>
                                        <div className="flex justify-between w-full">
                                            <div className="flex items-center justify-start w-full gap-3.5">
                                                <div>{gem.icon}</div>
                                                <span>{gem.title}</span>
                                            </div>
                                            <button className="p-1 rounded-full hover:bg-white/50">
                                                <MoreVertical />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                {/* Options Section */}
                <div className="p-2 mb-4">
                    {[
                        { icon: <Gem className="text-sm" />, title: "Gem manager" },
                        { icon: <HelpCircle className="text-xl" />, title: "Help" },
                        { icon: <History className="text-xl" />, title: "Activity" },
                        { icon: <Settings className="text-xl" />, title: "Settings" }
                    ].map((option, index) => (
                        <div key={index} className="flex my-1 justify-between items-center gap-2 px-1 py-1 hover:bg-gray-600/30 rounded-md">
                            <div className="flex justify-between w-full">
                                <div className="flex items-center justify-start w-full gap-3.5">
                                    <div>{option.icon}</div>
                                    <span className={`${menuOpen ? "block" : "hidden"}`}>{option.title}</span>
                                </div>
                                <button className={`p-1 rounded-full hover:bg-white/50 ${menuOpen ? "block" : "hidden"}`}>
                                    <MoreVertical />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Containers>
    );
};

export default Sidebar;
