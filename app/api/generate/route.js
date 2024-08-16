import { NextResponse } from "next/server";
import OpenAI from "openai";


const systemPrompt = `
    You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these rules and guidelines: 
    Rule: Create clear and concise questions for the front of the flashcard.
    Rule: Provide accurate and informative answers for the back of the flashcard.
    Rule: Questions and answers should be concise, clear, and free from ambiguity. 
    Rule: Each flashcard should cover only one concept or fact to avoid confusion. 
    Rule: Ensure that each question is contextually relevant to the topic or subject area being studied. 
    Rule: All information provided on the flashcards must be factually correct. 
    Rule: Tailor the difficulty level of the questions to the target audience, whether they are beginners, intermediate learners, or advanced users. 
    Rule: Maintain a consistent format for all flashcards to ensure a smooth learning experience. 
    Rule: Ensure that questions are unique and avoid repeating the same information across multiple flashcards. 
    Rule: Avoid generating flashcards with biased, offensive, or inappropriate content. The AI should adhere to ethical guidelines. 
    Rule: Only generates 10 flashcards.
    
    Return in the following JSON format: 
    { 
        "flashcards":[
            {
                "front":str, 
                "back":str
            }
        ]
    }
    `

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages:[
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: 'gpt-3.5-turbo',
        response_format:{type: "json_object"}
    })

    console.log(completion.choices[0].message.content)

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}