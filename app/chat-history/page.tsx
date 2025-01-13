"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ChatHistory() {
  const [chatHistory, setChatHistory] = useState<{ prompt: string; timestamp: string }[]>([]);

  //retrieves all saved chat promptes from local storage
  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem("chatPrompts") || "[]");
    setChatHistory(savedPrompts);
  }, []);

  //removes all saved prompts
  const clearHistory =()=>{
    localStorage.removeItem("chatPrompts");
    setChatHistory([]);
  }

  return (
    <div className="container">
      <div className="top-bar">
        <Link href="/">
          <button className="home-button">Go Back to Home Page</button>
        </Link>
      </div>
      <h1>Chat History</h1>
      <button className="clear-button" onClick={clearHistory}>Clear History</button>
      <div className="history-container">
        {chatHistory.length === 0 ? (
          <p>No prompts available</p>
        ) : (
          chatHistory.map((entry, index) => (
            <div key={index} className="history-card">
              <p><strong>Prompt:</strong> {entry.prompt}</p>
              <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          text-align: center;
        }
        .top-bar {
          margin-bottom: 20px;
          text-align: left;
        }
        .home-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .home-button:hover {
          background-color: #0056b3;
        }
        .history-container {
          margin-top: 30px;
        }
        .history-card {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          text-align: left;
        }
          .clear-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .clear-button:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
}
