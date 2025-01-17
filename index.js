const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    function addNewCat() {
      const newRecipe = {
        title: "Bacalhau à Brás",
        level: "Easy Peasy",
        ingredients: ["bacalhau", "batatas", "ovo"],
        cuisine: "Portuguesa",
        dishType: "main_course",
        duration: 60,
        creator: "someone",
      };

      Recipe.create(newRecipe)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    addNewCat();

    function addMany() {
      const many = data;

      Recipe.insertMany(many)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    addMany();

    function update() {
      const query = { title: "Rigatoni alla Genovese" };
      const duration = { duration: 100 };
      Recipe.findOneAndUpdate(query, duration)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    update();

    function del() {
      Recipe.deleteOne({ title: "Carrot Cake" })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    del();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
