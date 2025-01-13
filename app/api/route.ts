/* eslint-disable @typescript-eslint/no-explicit-any */

import dotenv from "dotenv";

dotenv.config();

import axios from "axios";

//hugging face API used, best free ML based LLM model used
//response will vary depending on the LLM's load and compute time
export async function POST(req:Request){
    const API_URL="https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-alpha";
    const API_KEY =  process.env.API_KEY;
    const { collegeName, majorName, hobbies }: { collegeName: string, majorName: string, hobbies: string } = await req.json();

    try{
        const prompt = `Write me a college essay where my target school is ${collegeName}, my major is ${majorName}, and my hobbies are ${hobbies}.`;
        const res = await axios.post(
            API_URL,
            {inputs:prompt},
            {
                headers:{
                    Authorization:`Bearer ${API_KEY}`,
                    "x-use-cache": "false",
                    "x-wait-for-model": "true",
                },
            }
        );
        
        //for debugging purposes
        // console.log(res.data);
        return new Response(JSON.stringify(res.data),{
            status:200,
            headers:{"Content-Type":"application/json"},
        });
    }catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Full error:", err);
            console.error("Error response:", err.message);
            return new Response(
                JSON.stringify({ error: err.message }),
                { status: 500 }
            );
        }
        console.error("Unexpected error:", err);
        return new Response(
            JSON.stringify({ error: "An unknown error occurred" }),
            { status: 500 }
        );
    }
}