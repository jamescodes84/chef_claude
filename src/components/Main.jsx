import React from "react";

export default function Main() {
    let [ingredients, setIngredients] = React.useState([])
    console.log("new state")
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))




    function handleSubmit(formData) {
        
        const ingredientFromForm = formData.get("ingredientCard");
        setIngredients(prevList => [...prevList, ingredientFromForm]) 
     
    }

    return (
        <>
            <main>
                <form action={handleSubmit} className="ingredient" >
                    <input name="ingredientCard" placeholder="e.g. nutmeg" />
                    <button >+ Add an Ingredient</button>
                    
                </form>
                
                <ul>
                    {ingredientsListItems}
                </ul>
            </main>
        </>
        
        
        
    )
}