import React from "react";

export default function Main() {
    let [ingredients, setIngredients] = React.useState([])
    console.log("new state")
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(event) {
        // stop form submit from refreshing page
        event.preventDefault();
        
        // create FormData object from form that was submitted
        const formData = new FormData(event.currentTarget);
        // retrieve the input and set as newIngredient
        const ingredientFromForm = formData.get("ingredientCard");
        console.log(ingredientFromForm)
        setIngredients(prevList => [...prevList, ingredientFromForm])
        

        
        
     
    }

    return (
        <>
            <main>
                <form className="ingredient" onSubmit={handleSubmit}>
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