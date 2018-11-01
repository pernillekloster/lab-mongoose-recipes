const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipesSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [],
  cuisine: { type: String, required: true },
  dishType: String,
  enum: ["Breakfast", "Dish", "Snack", "Dessert", "Other"],
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: Number,
  creator: String,
  created: { type: Date, default: Date.now() }
});

const Recipe = mongoose.model("Recipe", recipesSchema);

Recipe.create({
  title: "ribbe",
  cuisine: "Norwegian",
  level: "Easy Peasy"
}).then(() => Recipe.insertMany(data));

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
  console.log("Success message")
);

Recipe.deleteOne({ title: "Carrot Cake" }).then(
  console.log("Removed succesfully")
);
