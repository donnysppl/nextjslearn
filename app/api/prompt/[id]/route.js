import { connectToTB } from "@utils/database";
import Prompt from "@models/prompt";


// get
export const GET = async (req, {params}) => {
    try {
        await connectToTB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response('Prompt not Found',{ status:404 })

        return new Response(JSON.stringify(prompt),{ status:201 })
        
    } catch (error) {
        return new Response("Failed to Fetch all prompt",{ status:500 })
    }
}

// patch

export const PATCH = async (req, {params}) => {
    const {prompt,tag} = await req.json();
    try {
        await connectToTB();

        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response('Prompt not Found',{ status:404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{ status:201 })
    } catch (error) {
        return new Response("Failed to Update the prompt",{ status:500 })
    }
}

// delete
export const DELETE = async (req, {params}) => {
    try {
        await connectToTB();
        const prompt = await Prompt.findByIdAndRemove(params.id);

        return new Response('Prompt Deleted',{ status:201 })
    } catch (error) {
        return new Response("Failed to Delete the prompt",{ status:500 })
    }
}