import { connectToTB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {

    const {prompt, tag, userID} = await req.json();

    try {
        await connectToTB();
        const newPrompt = new Prompt({
            creator: userID,
            tag, prompt
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{ status:201 })
    } catch (error) {
        return new Response("Failed to create a new prompt",{ status:500 })
    }
}