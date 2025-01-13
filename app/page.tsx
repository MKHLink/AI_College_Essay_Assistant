"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */


import {useState} from "react";
import OutputCard from "./components/OutputCard";
import Link from "next/link";

export default function Home(){
  const [collegeName, setCollegeName] = useState<string>("");
  const [majorName, setMajorName] = useState<string>("");
  const [hobbies, setHobbies] = useState<string>("");
  const [outputs, setOutputs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedCards, setSavedCards] = useState<{ [key: string]: boolean }>({});

  const generateEssay=async()=>{
    setLoading(true);
    setOutputs([]);

    //this prompt is only used to save to local
    const prompt = `Write me a college essay where my target school is ${collegeName}, my major is ${majorName}, and my hobbies are ${hobbies}.`;

    //calls the API 5 times to generate 5 different outputs
    try{
      const result: string[]=[];
      for(let i =0;i<5;i++){
        const res = await fetch("/api",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({collegeName, majorName, hobbies}),
        });
  
        const data = (await res.json()) as {generated_text:string}[];
        //debugging purposes
        // console.log(data);
        result.push(data?.[0]?.generated_text || "BLANK");
      }

      setOutputs(result);

      //saves the promt to local storage
      const savedPrompts = JSON.parse(localStorage.getItem("chatPrompts") || "[]");
      savedPrompts.push({ prompt, timestamp: new Date().toISOString() });
      localStorage.setItem("chatPrompts", JSON.stringify(savedPrompts));
    }catch(err:any){
      setOutputs(err)
    }finally{
      setLoading(false);
    }
  };

  //saves a card to local storage
  const saveCard = (card: string)=>{
    const savedCards = JSON.parse(localStorage.getItem("savedCards")||"[]");
    savedCards.push(card);
    localStorage.setItem("savedCards",JSON.stringify(savedCards));
    setSavedCards((prev) => ({ ...prev, [card]: true }));
  }

  return(
    <div className="container">
      <div className="top-bar">
        <Link href="/chat-history">
          <button className="home-button">View Previous Prompts</button>
        </Link>
      </div>
      <h1>Essay Generator</h1>
        <div>
          <label htmlFor="collegeName">College Name:</label>
          <input id="collegeName" type="text" placeholder="Enter your college name" value={collegeName} onChange={(e)=>setCollegeName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="majorName">Major:</label>
          <input id="majorName" type="text" placeholder="Enter your major" value={majorName} onChange={(e)=>setMajorName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="hobbies">Hobbies:</label>
          <input id="hobbies" type="text" placeholder="Enter your hobbies" value={hobbies} onChange={(e)=>setHobbies(e.target.value)}/>
        </div>

        <button onClick={generateEssay} disabled={loading}>
          {loading? "Writing your essay...":"Generate"}
        </button>

        <div className="output-container">
        {outputs.map((output, index) => (
          <div key={index} className="output-card-container">
            <OutputCard key={index} index={index} output={output} />
            <button
              onClick={() => saveCard(output)}
              className={savedCards[output] ? "saved" : ""}
            >
              {savedCards[output] ? "Saved" : "Save"}
            </button>
          </div>
        ))}
      </div>

      <div className="saved-cards-link">
        <Link href="/saved-cards">
          <button>View Saved Cards</button>
        </Link>
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          text-align: center;
        }
        input {
          width: 100%;
          margin-bottom: 15px;
          padding: 10px;
          font-size: 16px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ddd;
        }
        .output-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 30px;
        }
        .saved-cards-link {
          margin-top: 30px;
        }
        .top-bar {
          margin-bottom: 20px;
          text-align: left;
        }
        .home-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 5px 10px;
        }
        .output-card-container button.saved {
          background-color: #28a745;
          font-size: 14px;
          padding: 8px 16px;
        }
        .output-card-container button.saved:hover {
          background-color: #218838;
        }
        .output-card-container button {
          font-size: 16px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .output-card-container button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}