require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**
 * GET /
 * Homepage
 */
exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        const thai = await Recipe.find({'category': 'Thai'}).limit(limitNumber);
        const american = await Recipe.find({ 'category' : 'American'}).limit(limitNumber);
        const chinese = await Recipe.find({ 'category' : 'Chinese'}).limit(limitNumber);

        const food = { latest, thai, american, chinese };

        res.render('index', {title: 'Cooking Blog - Home', categories, food});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured!"});
    }
}
/**
 * GET /categories
 * Categories
 */
exports.exploreCategories = async(req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);

        res.render('categories', {title: 'Cooking Blog - Categories', categories});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured!"});
    }
}

/**
 * GET /categories:/id
 * Categories By Id
 */
exports.exploreCategoriesById = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category' : categoryId}).limit(limitNumber);
        res.render('categories', {title: 'Cooking Blog - Categories', categoryById});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured!"});
    }
}

/**
 * GET /recipe/id
 * Recipe
 */
exports.exploreRecipe = async(req, res) => {
  try {
      let recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      res.render('recipe', {title: 'Cooking Blog - Recipe',recipe });
  } catch (error) {
      res.status(500).send({message: error.message || "Error Occured!"});
  }
}

/**
 * POST /search
 * Search
 */

exports.searchRecipe = async(req, res) => {

    try {
        let searchTerm =req.body.searchTerm;
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true} });
        res.render('search', { title: 'Cooking Blog - Search',recipe });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
    res.render('search', {title: 'Cooking Blog - search' });
}

/**
 * GET /explore-latest.
 * Explore Latest.
 */
exports.exploreLatest = async(req, res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('explore-latest', {title: 'Cooking Blog - Explore Latest',recipe });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured!"});
    }
  }





// async function insertDummyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Grilled Lobster",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Thai",
//         "image": "grilled-lobster-rolls.jpg"
//       },
//       { 
//         "name": "Spring Rolls",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Thai",
//         "image": "tom-daley.jpg"
//       },
//       { 
//         "name": "Pinch Salad",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Thai",
//         "image": "thai-chinese-inspired-pinch-salad.jpg"
//       },
//       { 
//         "name": "Green Curry",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Thai",
//         "image": "thai-green-curry.jpg"
//       },
//       { 
//         "name": "Vegetable Broth",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Thai",
//         "image": "thai-inspired-vegetable-broth.jpg"
//       },
//       { 
//         "name": "Red Chicken Soup",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Chinese",
//         "image": "tahi-red-chicken-soup.jpg"
//       },
//       { 
//         "name": "Mussels",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Chinese",
//         "image": "thai-style-mussels.jpg"
//       },
//       { 
//         "name": "Veggie Pad",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Chinese",
//         "image": "veggie-pad-thai.jpg"
//       },
//       { 
//         "name": "Steak Tofu Stew",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Chinese",
//         "image": "chinese-steak-tofu-stew.jpg"
//       },
//       { 
//         "name": "Chocolate Banoffe Pie",
//         "description": `Recipe Description Goes Here`, 
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Chinese",
//         "image": "chocolate-banoffe-whoopie-pies.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error);
//   }
// }


// insertDummyRecipeData();