export default function IngredientList({ogIngredients, processRecipe, ref}) {
    const ingredientsListItems = ogIngredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {   ogIngredients.length > 3 &&
                <div className="get-recipe-container">
                    <div ref={ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={processRecipe}>Get a recipe</button>
                </div>
            }
        </section>
    )
    
}