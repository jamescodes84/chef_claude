import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";
//import Anthropic from "@anthropic-ai/sdk"
import { getRecipeFromChefClaude } from "../../ai";

export default function Main() {
    let [ingredients, setIngredients] = React.useState([])
    let [recipeShown, setRecipeShown] = React.useState(false)
    let [recipe, setRecipe] = React.useState(null)
    //console.log("new state")
    

    function handleSubmit(formData) {
        
        const ingredientFromForm = formData.get("ingredientCard");
        if (ingredientFromForm != "") {
            setIngredients(prevList => [...prevList, ingredientFromForm]) 
        }
    }

    async function getRecipe() {
        // This is where the AI code will be called
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        //console.log(recipeMarkdown)
        setRecipe(recipeMarkdown)
        setRecipeShown(true)
        
    }

    return (
        <>
            <main>
                <form action={handleSubmit} className="ingredient" >
                    <input name="ingredientCard" placeholder="e.g. nutmeg" />
                    <button >+ Add an Ingredient</button>
                </form>

                {   
                    ingredients.length > 0 ?
                    <IngredientList ogIngredients={ingredients} processRecipe={getRecipe}/>
                    : null
                }   

                {   
                    recipeShown == true &&
                    <ClaudeRecipe recipeData={recipe}/>
                }



            </main>
        </>
        
        
        
    )
}