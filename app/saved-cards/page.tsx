"use client";

import { useEffect, useState } from "react";
import OutputCard from "../components/OutputCard";
import Link from "next/link";

export default function SavedCards() {
  const [savedCards, setSavedCards] = useState<string[]>([]);

  //retrievs all saved cards
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("savedCards") || "[]");
    setSavedCards(storedCards);
  }, []);

  //removes a single card by its index from local storage
  const deleteCard = (index:number)=>{
    const cardList = [...savedCards];
    cardList.splice(index,1);
    setSavedCards(cardList);
    localStorage.setItem("savedCards",JSON.stringify(cardList));
  }

  return (
    <div className="container">
      <div className="top-bar">
        <Link href="/">
          <button className="home-button">Go Back to Home Page</button>
        </Link>
      </div>
      <h1>Saved Essays</h1>
      <div className="output-container">
        {savedCards.length === 0 ? (
          <p>Empty</p>
        ) : (
          savedCards.map((output, index) => (
            <div key={index} className="output-card-container">
              <OutputCard index={index} output={output} />
              <button className="delete-button" onClick={() => deleteCard(index)}>
                Delete
              </button>
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
        .home-button{
          background-color: #007bff;
          color:white;
          border:none;
          border-radius:8px;
          padding:5px 10px;
        }
        .output-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 30px;
        }
        .output-card-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
        }
        .delete-button {
          padding: 5px 10px;
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .delete-button:hover {
          background-color: #e60000;
        }
      `}</style>
    </div>
  );
}
