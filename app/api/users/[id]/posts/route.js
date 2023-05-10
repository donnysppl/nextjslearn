import { connectToTB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    
    try {
        await connectToTB();
        const prompts = await Prompt.find({creator : params.id}).populate('creator');

        if(prompts.length === 0){
            return new Response(JSON.stringify({'message': 'Data is empty', 'status':300,}) ,{ status:300 })
        }
        else{
            return new Response(JSON.stringify({'result' : prompts, 'status':200,}) ,{ status:200 })
        }
        
    } catch (error) {
        return new Response("Failed to Fetch all prompt",{ status:500 })
    }
}