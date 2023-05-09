import { connectToTB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    
    try {
        await connectToTB();
        console.log(params);
        const prompts = await Prompt.find({creator : params.id}).populate('creator');

        return new Response(JSON.stringify(prompts),{ status:201 })
        
    } catch (error) {
        return new Response("Failed to Fetch all prompt",{ status:500 })
    }
}