import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`

// --- Claude (Anthropic) Setup ---
const anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

const anthropic = new Anthropic({
    apiKey: anthropicApiKey,
    dangerouslyAllowBrowser: true, // Not safe for production! See notes below.
})

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    try {
        const response = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
                },
            ],
        })

        return response.content?.[0]?.text ?? "No recipe response from Claude."
    } catch (err) {
        console.error("Claude error:", err.message)
        return "Sorry, Claude couldn't generate a recipe."
    }
}

// --- Mistral (via Hugging Face) Setup ---
const hfAccessToken = import.meta.env.VITE_HF_ACCESS_TOKEN

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    try {
        const response = await fetch("https://api.huggingface.co/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${hfAccessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    {
                        role: "user",
                        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
                    },
                ],
                max_tokens: 1024,
            }),
        })

        if (!response.ok) {
            throw new Error(`Hugging Face API error: ${response.statusText}`)
        }

        const data = await response.json()
        return data.choices?.[0]?.message?.content ?? "No recipe response from Mistral."
    } catch (err) {
        console.error("Mistral error:", err.message)
        return "Sorry, Mistral couldn't generate a recipe."
    }
}
