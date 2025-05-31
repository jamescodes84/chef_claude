



export default function Main() {
    const ingredients = ["Chicken", "Oregano", "Tomatoes"]

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(event) {
        // stop form submit from refreshing page
        event.preventDefault();
        
        // create FormData object from form that was submitted
        const formData = new FormData(event.currentTarget);
        // retrieve the input and set as newIngredient
        const formInputIngredient = formData.get("ingredientCard");
        console.log(formInputIngredient)
        ingredients.push(formInputIngredient)

        console.log(ingredients)
        
     
    }

    return (
        <>
            <main>
                <form className="ingredient" onSubmit={handleSubmit}>
                    <input name="ingredientCard" placeholder="e.g. nutmeg" />
                    <button >+ Add an Ingredient</button>
                </form>

                <ul>
                    {/*ingredientsListItems*/}
                </ul>
            </main>
        </>
        
        
        
    )
}