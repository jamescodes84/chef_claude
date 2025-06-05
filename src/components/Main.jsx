import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";

export default function Main() {
    let [ingredients, setIngredients] = React.useState([])
    let [recipeShown, setRecipeShown] = React.useState(false)
    //console.log("new state")
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(formData) {
        
        const ingredientFromForm = formData.get("ingredientCard");
        if (ingredientFromForm != "") {
            setIngredients(prevList => [...prevList, ingredientFromForm]) 
        }
    }

    function getRecipe() {
       setRecipeShown(prevRecipeShown => !prevRecipeShown)
    }

    return (
        <>
            <main>
                <form action={handleSubmit} className="ingredient" >
                    <input name="ingredientCard" placeholder="e.g. nutmeg" />
                    <button >+ Add an Ingredient</button>
                </form>

                {   
                    ingredientsListItems.length > 0 ?
                    <IngredientList ingredientsList={ingredientsListItems} processRecipe={getRecipe}/>
                    : null
                }   

                {   
                    recipeShown == true &&
                    <ClaudeRecipe />
                }



            </main>
        </>
        
        
        
    )
}