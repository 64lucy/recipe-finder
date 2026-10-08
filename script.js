

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
const categoryList = document.getElementById("categoryList");
const dishContainer = document.getElementById("dishContainer");
const recipeDetails = document.getElementById("recipeDetails");


const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Vegetarian",
    "Vegan"
];

categories.forEach(function (category) {
    const li = document.createElement("li");
    li.innerText = category;
    categoryList.appendChild(li);
});

const recipes = [
    {
        name: "Creamy Tomato Pasta",
        image: "images/image/pasta.jpg",
        time: "25 min",
        difficulty: "Easy",
        serving: 4,
        category: "Dinner"
    },

    {
        name: "Fluffy pancakes",
        image: "images/pancakes.jpg",
        time: "20 min",
        difficulty: "Easy",
        serving: 4,
        category: "Breakfast"
    },
    {
        name: "Avocado toast",
        image: "images/avocado toast.jpg",
        time: "15 min",
        difficulty: "Easy",
        serving: 4,
        category: "Breakfast"
    },
    {
        name: "Chickpea Salad",
        image: "images/salad.jpg",
        time: "15 min",
        difficulty: "Easy",
        serving: 4,
        category: "Lunch"
    },
    {
        name: "Chocolate Brownies",
        image: "images/chocolate.jpg",
        time: "30 min",
        difficulty: "Easy",
        serving: 4,
        category: "Dessert"
    },

    {
        name: "Vaggie stir fry",
        image: "images/vaggies.jpg",
        time: "20 min",
        difficulty: "Easy",
        serving: 4,
        category: "Dinner"
    },
];
const featuredRecipe = {
    name: "Creamy Tomato Pasta",
    image: "images/Creamy Tomato Pasta.jpg",
    time: "25 min",
    difficulty: "Easy",
    servings: 2,

    ingredients: [
        "200g pasta",
        "1 cup cherry Tomatoes",
        "2 cloves garlic,minced",
        "1/2 cup heavy cream",
        "1/4 cup grated Parmesan cheese",
        "2 tbsp olive oil",
        "salt and pepper to taste",
        "Fresh basil for garnish"
    ],

    instructions: [
        "cook pasta .Drain and set aside.",
        "Heat olive oil over medium heat .Add garlic and saute for 1 Minute",
        "Prepare cherry tomatoes and cook untill soft,about 5mints",
        "Pour cream and bring to a simmer",
        "stir in parmesan cheese, salt and pepper.",
        "Add cooked pasta and toss well",
        "Garnish with fresh basil and serve hot."
    ]
};


function displayRecipes(recipeList) {
    dishContainer.innerHTML = "";
    recipeList.forEach(function (recipe) {
        const card = document.createElement("div");

        const image = document.createElement("img");
        image.src = recipe.image;
        card.appendChild(image);

        const name = document.createElement("h3");
        name.innerText = recipe.name;
        card.appendChild(name);

        const favouriteButton = document.createElement("button");
        const isFavourite = favourites.some(function (favourite) {
            return favourite.name === recipe.name;
        });
        favouriteButton.innerText = isFavourite ? "❤️" : "♡";
        favouriteButton.classList.add("favourite-btn");
        card.appendChild(favouriteButton);

        favouriteButton.addEventListener("click", function () {
            if (favouriteButton.innerText === "♡") {
                favouriteButton.innerText = "❤️";
                favourites.push(recipe);
            } else {
                favouriteButton.innerText = "♡";

                favourites = favourites.filter(function (favourite) {
                    return favourite.name !== recipe.name;

                });
            }

            localStorage.setItem("favourites", JSON.stringify(favourites));

        });

        const difficulty = document.createElement("p");
        difficulty.innerText = `⭐ ${recipe.difficulty}`;
        card.appendChild(difficulty);

        const serving = document.createElement("p");
        serving.innerText = recipe.serving;
        card.appendChild(serving);

        const time = document.createElement("p");
        time.innerText = `◴ ${recipe.time} time`;
        card.appendChild(time);

        const category = document.createElement("p");
        category.innerText = recipe.category;
        category.classList.add("recipe-category",
            recipe.category.toLowerCase()
        );
        card.appendChild(category);
        dishContainer.appendChild(card);
    });

};

displayRecipes(recipes);
searchButton.addEventListener("click", function () {

    const searchTerm = searchInput.value.toLowerCase().trim();


    const filteredRecipes = recipes.filter(function (recipe) {
        const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
        const categoryMatch = recipe.category.toLowerCase().includes(searchTerm);
        const difficultyMatch = recipe.difficulty.toLowerCase().includes(searchTerm);
        const timeMatch = recipe.time.toLowerCase().includes(searchTerm);

        return nameMatch || categoryMatch || difficultyMatch || timeMatch;
    });

    displayRecipes(filteredRecipes);
});


const categoryItems = categoryList.querySelectorAll("li");
categoryItems.forEach(function (item) {
    item.addEventListener("click", function () {
        const selectedCategory = item.innerText;

        let filteredRecipes;
        if (selectedCategory === "All") {
            filteredRecipes = recipes;
        } else {
            filteredRecipes = recipes.filter(function (recipe) {
                return recipe.category === selectedCategory;
            });
        }
        displayRecipes(filteredRecipes);
    });
});


const featuredRecipeSection = document.getElementById("featuredRecipe");

const featuredTop = document.createElement("div");
featuredTop.classList.add("featured-top");

const featuredPastaImage = document.createElement("img");
featuredPastaImage.src = featuredRecipe.image;

featuredTop.appendChild(featuredPastaImage);


const recipeStats = document.createElement("div");
recipeStats.classList.add("recipe-stats");

featuredTop.appendChild(recipeStats);

featuredRecipeSection.appendChild(featuredTop);


const time = document.createElement("p");
time.innerText = `◴ ${featuredRecipe.time} time`;
recipeStats.appendChild(time);

const difficulty = document.createElement("p");
difficulty.innerText = `📶 ${featuredRecipe.difficulty}`;
recipeStats.appendChild(difficulty);

const servings = document.createElement("p");
servings.innerText = `👥 ${featuredRecipe.servings}`;
recipeStats.appendChild(servings);


const recipeContent = document.createElement("div");
recipeContent.classList.add("recipe-content");

const ingredientsSection = document.createElement("div");
ingredientsSection.classList.add("ingredients-section");

const instructionsSection = document.createElement("div");
instructionsSection.classList.add("instructions-section");

recipeContent.appendChild(ingredientsSection);
recipeContent.appendChild(instructionsSection);

featuredRecipeSection.appendChild(recipeContent);


const ingredientsHeading = document.createElement("h3");
ingredientsHeading.innerText = "Ingredients";
ingredientsSection.appendChild(ingredientsHeading);



featuredRecipe.ingredients.forEach(function (ingredient) {
    const item = document.createElement("p");
    item.innerText = ingredient;
    ingredientsSection.appendChild(item);

});
const instructionsHeading = document.createElement("h3");
instructionsHeading.innerText = "Instructions";
instructionsSection.appendChild(instructionsHeading);


featuredRecipe.instructions.forEach(function (instruction) {
    const item = document.createElement("p");
    item.innerText = instruction;
    instructionsSection.appendChild(item);

});

const FullRecipeButton = document.getElementById("FullRecipeBtn");
recipeContent.appendChild(FullRecipeButton);
FullRecipeButton.addEventListener("click", function () {
    recipeDetails.classList.toggle("show");
});


