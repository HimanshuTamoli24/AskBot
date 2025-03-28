import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/gemini.slice.js";
import Containers from "../container/Containers.jsx";
import { IoIosSend } from "react-icons/io";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiFillPauseCircle } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const Main = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.gemini.messages);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const handleSend = async () => {
        if (!input.trim()) return;
        setLoading(true);

        // Dispatch user message
        dispatch(addMessage({ text: input, sender: "user" }));

        try {
            const result = await model.generateContent({
                contents: [{ parts: [{ text: input }] }],
            });

            console.log("Full API Response:", result);

            // Extract AI response correctly
            const aiResponse = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response.";
            console.log("aiResponse", aiResponse);

            // Dispatch AI response
            dispatch(addMessage({ text: aiResponse, sender: "ai" }));
        } catch (error) {
            console.error("Error:", error);
            dispatch(addMessage({ text: "Something went wrong. Please try again.", sender: "ai" }));
        }

        setLoading(false);
        setInput("");
    };

    return (
        <Containers className="w-full h-screen flex flex-col items-center justify-between relative">

            {/* Welcome Section */}
            {messages.length === 0 ? (
                <div className="w-full max-w-4xl h-[70vh]   rounded-xl flex flex-col justify-center items-center p-6  border-x border-black/10 my-14">
                    <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Hello, Himanshu
                    </h1>
                    <p className="text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                        Welcome back to Gemini!
                    </p>
                </div>
            ) : (
                <div className="w-full max-w-2xl   h-[75vh] sm:h-[80vh] overflow-y-auto  bg-white/80 text-black text-lg p-4 rounded-xl shadow-md mt-4 ">

                    {/* Chat Messages */}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`px-3 py-1  max-w-2xl border-b-2  whitespace-pre-wrap  border-black/10 my-2 font-serif rounded-md ${msg.sender === "user"
                                ? "bg-blue-500 inline-block rounded- text-white text-right"
                                : "bg-gray-200 mb-8  text-black  text-left"
                                }`}
                        >
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                    ))}
                </div>
            )}

            {/* Fixed Input Section */}
            <div className="w-full max-w-2xl fixed bottom-4 bg-white border border-gray-300 shadow-lg rounded-2xl p-4 flex items-center">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent  min-h-16 max-h-32 overflow-y-auto border-none outline-none text-lg text-black placeholder-gray-400 px-3 resize-none"
                />
                <button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-blue-500/90 via-purple-500/80 to-pink-500/70 hover:bg-green-400/50 transition duration-200 rounded-full p-3 ml-2"
                    disabled={loading}
                >
                    {loading ?
                        <AiFillPauseCircle /> : <IoIosSend size={20} />}
                </button>
            </div>


        </Containers>
    );
};

export default Main;
