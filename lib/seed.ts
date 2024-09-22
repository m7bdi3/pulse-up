import {
  BodyPart,
  DifficultyLevel,
  ExerciseCategory,
  ExerciseEquipment,
  FoodCategory,
  Goal,
  MealType,
} from "@prisma/client";
import { db } from "./db";

async function main() {
  // const foodIngredients = [
  //   {
  //     name: "Chicken Breast",
  //     calories: 165,
  //     protein: 31,
  //     carbs: 0,
  //     fats: 3.6,
  //     image:
  //       "https://www.themealdb.com/images/ingredients/Chicken%20Breast.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Salmon",
  //     calories: 208,
  //     protein: 20,
  //     carbs: 0,
  //     fats: 13,
  //     image: "https://www.themealdb.com/images/ingredients/Salmon.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Broccoli",
  //     calories: 34,
  //     protein: 2.8,
  //     carbs: 7,
  //     fats: 0.4,
  //     image: "https://www.themealdb.com/images/ingredients/Broccoli.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Almonds",
  //     calories: 579,
  //     protein: 21,
  //     carbs: 22,
  //     fats: 50,
  //     image: "https://www.themealdb.com/images/ingredients/Almonds.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Rice",
  //     calories: 130,
  //     protein: 2.4,
  //     carbs: 28,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Rice.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Olive Oil",
  //     calories: 884,
  //     protein: 0,
  //     carbs: 0,
  //     fats: 100,
  //     image: "https://www.themealdb.com/images/ingredients/Olive%20Oil.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Banana",
  //     calories: 89,
  //     protein: 1.1,
  //     carbs: 23,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Banana.png",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Egg",
  //     calories: 155,
  //     protein: 13,
  //     carbs: 1.1,
  //     fats: 11,
  //     image: "https://www.themealdb.com/images/ingredients/Egg.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Spinach",
  //     calories: 23,
  //     protein: 2.9,
  //     carbs: 3.6,
  //     fats: 0.4,
  //     image: "https://www.themealdb.com/images/ingredients/Spinach.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Quinoa",
  //     calories: 120,
  //     protein: 4.1,
  //     carbs: 21,
  //     fats: 1.9,
  //     image: "https://www.themealdb.com/images/ingredients/Quinoa.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Avocado",
  //     calories: 160,
  //     protein: 2,
  //     carbs: 9,
  //     fats: 15,
  //     image: "https://www.themealdb.com/images/ingredients/Avocado.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Greek Yogurt",
  //     calories: 59,
  //     protein: 10,
  //     carbs: 3.6,
  //     fats: 0.4,
  //     image: "https://www.themealdb.com/images/ingredients/Greek%20Yogurt.png",
  //     category: FoodCategory.DAIRY,
  //   },
  //   {
  //     name: "Tomato",
  //     calories: 18,
  //     protein: 0.9,
  //     carbs: 3.9,
  //     fats: 0.2,
  //     image: "https://www.themealdb.com/images/ingredients/Tomato.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Shrimp",
  //     calories: 99,
  //     protein: 24,
  //     carbs: 0.2,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Prawns.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Potato",
  //     calories: 77,
  //     protein: 2,
  //     carbs: 17,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Potato.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Apple",
  //     calories: 52,
  //     protein: 0.3,
  //     carbs: 14,
  //     fats: 0.2,
  //     image: "https://www.themealdb.com/images/ingredients/Apple.png",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Carrot",
  //     calories: 41,
  //     protein: 0.9,
  //     carbs: 10,
  //     fats: 0.2,
  //     image: "https://www.themealdb.com/images/ingredients/Carrot.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Cottage Cheese",
  //     calories: 98,
  //     protein: 11,
  //     carbs: 3.4,
  //     fats: 4.3,
  //     image:
  //       "https://utfs.io/f/5b7ea91b-f110-472d-b99d-82d96b5214fa-gllm3u.jpg",
  //     category: FoodCategory.DAIRY,
  //   },
  //   {
  //     name: "Peanut Butter",
  //     calories: 588,
  //     protein: 25,
  //     carbs: 20,
  //     fats: 50,
  //     image: "https://www.themealdb.com/images/ingredients/Peanut%20Butter.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Bell Pepper",
  //     calories: 20,
  //     protein: 0.9,
  //     carbs: 4.6,
  //     fats: 0.2,
  //     image: "https://www.themealdb.com/images/ingredients/Green%20Pepper.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Oats",
  //     calories: 389,
  //     protein: 16.9,
  //     carbs: 66,
  //     fats: 6.9,
  //     image: "https://www.themealdb.com/images/ingredients/Oats.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Cheddar Cheese",
  //     calories: 403,
  //     protein: 25,
  //     carbs: 1.3,
  //     fats: 33,
  //     image:
  //       "https://www.themealdb.com/images/ingredients/Cheddar%20Cheese.png",
  //     category: FoodCategory.DAIRY,
  //   },

  //   {
  //     name: "Chickpeas",
  //     calories: 364,
  //     protein: 19,
  //     carbs: 61,
  //     fats: 6,
  //     image: "https://www.themealdb.com/images/ingredients/Chickpeas.png",
  //     category: FoodCategory.CARBS,
  //   },

  //   {
  //     name: "Tuna",
  //     calories: 132,
  //     protein: 29,
  //     carbs: 0,
  //     fats: 0.9,
  //     image: "https://www.themealdb.com/images/ingredients/Tuna.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Walnuts",
  //     calories: 654,
  //     protein: 15,
  //     carbs: 14,
  //     fats: 65,
  //     image: "https://www.themealdb.com/images/ingredients/Walnuts.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Blueberries",
  //     calories: 57,
  //     protein: 0.7,
  //     carbs: 14,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Blueberries.png",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Pasta",
  //     calories: 131,
  //     protein: 5,
  //     carbs: 25,
  //     fats: 1.1,
  //     image: "https://www.themealdb.com/images/ingredients/Farfalle.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Beef Mince",
  //     calories: 250,
  //     protein: 26,
  //     carbs: 0,
  //     fats: 17,
  //     image: "https://www.themealdb.com/images/ingredients/Minced%20Beef.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Orange",
  //     calories: 47,
  //     protein: 0.9,
  //     carbs: 12,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Orange.png",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Butter",
  //     calories: 717,
  //     protein: 0.9,
  //     carbs: 0.1,
  //     fats: 81,
  //     image: "https://www.themealdb.com/images/ingredients/Butter.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Zucchini",
  //     calories: 17,
  //     protein: 1.2,
  //     carbs: 3.1,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Zucchini.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Milk",
  //     calories: 42,
  //     protein: 3.4,
  //     carbs: 5,
  //     fats: 1,
  //     image: "https://www.themealdb.com/images/ingredients/Milk.png",
  //     category: FoodCategory.DAIRY,
  //   },
  //   {
  //     name: "Pumpkin Seeds",
  //     calories: 446,
  //     protein: 19,
  //     carbs: 54,
  //     fats: 19,
  //     image: "https://www.themealdb.com/images/ingredients/Pumpkin.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Grapes",
  //     calories: 69,
  //     protein: 0.7,
  //     carbs: 18,
  //     fats: 0.2,
  //     image:
  //       "https://utfs.io/f/748f4a77-ce26-4226-a3dc-e70dab2a7864-kh04fs.jpg",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Turkey Breast",
  //     calories: 135,
  //     protein: 30,
  //     carbs: 0,
  //     fats: 1,
  //     image: "https://www.themealdb.com/images/ingredientsTurkey%20Mince.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Sweet Potato",
  //     calories: 86,
  //     protein: 1.6,
  //     carbs: 20,
  //     fats: 0.1,
  //     image:
  //       "https://www.themealdb.com/images/ingredients/Sweet%20Potatoes.png",
  //     category: FoodCategory.CARBS,
  //   },

  //   {
  //     name: "Pineapple",
  //     calories: 50,
  //     protein: 0.5,
  //     carbs: 13,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Pineapple.png",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Lentils",
  //     calories: 116,
  //     protein: 9,
  //     carbs: 20,
  //     fats: 0.4,
  //     image: "https://www.themealdb.com/images/ingredients/Lentils.png",
  //     category: FoodCategory.CARBS,
  //   },

  //   {
  //     name: "Garlic",
  //     calories: 149,
  //     protein: 6.4,
  //     carbs: 33,
  //     fats: 0.5,
  //     image: "https://www.themealdb.com/images/ingredients/Garlic.png",
  //     category: FoodCategory.VEGETABLES,
  //   },

  //   {
  //     name: "Asparagus",
  //     calories: 20,
  //     protein: 2.2,
  //     carbs: 3.9,
  //     fats: 0.2,
  //     image: "https://www.themealdb.com/images/ingredients/Asparagus.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Honey",
  //     calories: 304,
  //     protein: 0.3,
  //     carbs: 82,
  //     fats: 0,
  //     image: "https://www.themealdb.com/images/ingredients/Honey.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Cashews",
  //     calories: 553,
  //     protein: 18,
  //     carbs: 30,
  //     fats: 44,
  //     image: "https://www.themealdb.com/images/ingredients/Cashews.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Raspberries",
  //     calories: 52,
  //     protein: 1.2,
  //     carbs: 12,
  //     fats: 0.7,
  //     image: "https://www.themealdb.com/images/ingredients/Raspberries.png",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Beef Steak",
  //     calories: 271,
  //     protein: 25,
  //     carbs: 0,
  //     fats: 19,
  //     image: "https://www.themealdb.com/images/ingredients/Beef%20Fillet.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Cabbage",
  //     calories: 25,
  //     protein: 1.3,
  //     carbs: 6,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Cabbage.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Mozzarella",
  //     calories: 280,
  //     protein: 28,
  //     carbs: 3,
  //     fats: 17,
  //     image: "https://www.themealdb.com/images/ingredients/Mozzarella.png",
  //     category: FoodCategory.DAIRY,
  //   },
  //   {
  //     name: "Black Beans",
  //     calories: 341,
  //     protein: 21,
  //     carbs: 62,
  //     fats: 1,
  //     image: "https://www.themealdb.com/images/ingredients/Black%20Beans.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Peas",
  //     calories: 81,
  //     protein: 5.4,
  //     carbs: 14,
  //     fats: 0.4,
  //     image: "https://www.themealdb.com/images/ingredients/Peas.png",
  //     category: FoodCategory.VEGETABLES,
  //   },

  //   {
  //     name: "Cranberries",
  //     calories: 46,
  //     protein: 0.4,
  //     carbs: 12,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Cranberries.png",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Chicken Thigh",
  //     calories: 209,
  //     protein: 20,
  //     carbs: 0,
  //     fats: 14,
  //     image: "https://www.themealdb.com/images/ingredients/Chicken%20Thigh.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Mango",
  //     calories: 60,
  //     protein: 0.8,
  //     carbs: 15,
  //     fats: 0.4,
  //     image:
  //       "https://utfs.io/f/e59fbee5-cf13-4d7c-b92f-c1654890f31b-184fj6.jpg",
  //     category: FoodCategory.FRUITS,
  //   },
  //   {
  //     name: "Brussels Sprouts",
  //     calories: 43,
  //     protein: 3.4,
  //     carbs: 9,
  //     fats: 0.3,
  //     image:
  //       "https://www.themealdb.com/images/ingredients/Brussels%20Sprouts.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Tofu",
  //     calories: 76,
  //     protein: 8,
  //     carbs: 1.9,
  //     fats: 4.8,
  //     image: "https://www.themealdb.com/images/ingredients/Tofu.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Papaya",
  //     calories: 43,
  //     protein: 0.5,
  //     carbs: 11,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Papaya.png",
  //     category: FoodCategory.FRUITS,
  //   },

  //   {
  //     name: "Watermelon",
  //     calories: 30,
  //     protein: 0.6,
  //     carbs: 8,
  //     fats: 0.2,
  //     image:
  //       "https://utfs.io/f/36e7666b-5820-4f64-ac78-b350ae03c927-5f1l2c.jpg",
  //     category: FoodCategory.FRUITS,
  //   },

  //   {
  //     name: "Onion",
  //     calories: 40,
  //     protein: 1.1,
  //     carbs: 9,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Onion.png",
  //     category: FoodCategory.VEGETABLES,
  //   },

  //   {
  //     name: "Couscous",
  //     calories: 112,
  //     protein: 3.8,
  //     carbs: 23,
  //     fats: 0.2,
  //     image: "https://www.themealdb.com/images/ingredients/Couscous.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Strawberries",
  //     calories: 32,
  //     protein: 0.7,
  //     carbs: 7.7,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Strawberries.png",
  //     category: FoodCategory.FRUITS,
  //   },

  //   {
  //     name: "Pear",
  //     calories: 57,
  //     protein: 0.4,
  //     carbs: 15,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Pears.png",
  //     category: FoodCategory.FRUITS,
  //   },

  //   {
  //     name: "Lamb",
  //     calories: 294,
  //     protein: 25,
  //     carbs: 0,
  //     fats: 21,
  //     image: "https://www.themealdb.com/images/ingredients/Lamb.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Yogurt",
  //     calories: 59,
  //     protein: 10,
  //     carbs: 3.6,
  //     fats: 0.4,
  //     image: "https://www.themealdb.com/images/ingredients/Plain%20Yogurt.png",
  //     category: FoodCategory.DAIRY,
  //   },

  //   {
  //     name: "Brown Rice",
  //     calories: 111,
  //     protein: 2.6,
  //     carbs: 23,
  //     fats: 0.9,
  //     image: "https://www.themealdb.com/images/ingredients/Brown%20Rice.png",
  //     category: FoodCategory.CARBS,
  //   },

  //   {
  //     name: "Mushrooms",
  //     calories: 22,
  //     protein: 3.1,
  //     carbs: 3.3,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Mushroom.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Prawns",
  //     calories: 99,
  //     protein: 24,
  //     carbs: 0.2,
  //     fats: 0.3,
  //     image: "https://www.themealdb.com/images/ingredients/Prawns.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  //   {
  //     name: "Cucumber",
  //     calories: 16,
  //     protein: 0.7,
  //     carbs: 3.6,
  //     fats: 0.1,
  //     image: "https://www.themealdb.com/images/ingredients/Cucumber.png",
  //     category: FoodCategory.VEGETABLES,
  //   },
  //   {
  //     name: "Beef",
  //     calories: 250,
  //     protein: 26,
  //     carbs: 0,
  //     fats: 15,
  //     image: "https://www.themealdb.com/images/ingredients/Beef.png",
  //     category: FoodCategory.PROTEIN,
  //   },

  //   {
  //     name: "Coconut Milk",
  //     calories: 230,
  //     protein: 2.3,
  //     carbs: 6,
  //     fats: 24,
  //     image: "https://www.themealdb.com/images/ingredients/Coconut%20Milk.png",
  //     category: FoodCategory.FATS,
  //   },
  //   {
  //     name: "Whole Grain Bread",
  //     calories: 246,
  //     protein: 8.5,
  //     carbs: 43.3,
  //     fats: 4.4,
  //     image: "https://www.themealdb.com/images/ingredients/Bread.png",
  //     category: FoodCategory.CARBS,
  //   },
  //   {
  //     name: "Hummus",
  //     calories: 177,
  //     protein: 8,
  //     carbs: 14.3,
  //     fats: 9.6,
  //     image: "https://www.themealdb.com/images/ingredients/Tahini.png",
  //     category: FoodCategory.PROTEIN,
  //   },
  // ];

  // const highProteinDietPlan = [
  //   // Breakfast
  //   {
  //     name: "Egg and Spinach Omelette",
  //     description: "A high-protein omelette with eggs and fresh spinach.",
  //     calories: 178,
  //     protein: 15.9,
  //     carbs: 4.7,
  //     fats: 11.4,
  //     servingSize: 100,
  //     mealType: MealType.BREAKFAST,
  //     foods: [
  //       "e3e48664-9aba-45e6-b20f-e18e5f9b2852",
  //       "ca0334e0-d8ef-443a-9a2f-3b2e419de612",
  //     ],
  //   },
  //   {
  //     name: "Greek Yogurt with Blueberries",
  //     description: "Creamy Greek yogurt topped with fresh blueberries.",
  //     calories: 116,
  //     protein: 10.7,
  //     carbs: 17.6,
  //     fats: 0.7,
  //     servingSize: 100,
  //     mealType: MealType.BREAKFAST,
  //     foods: [
  //       "9636e99a-a234-47ef-a99e-677218e8d4e6",
  //       "426dc4e7-8866-40f5-8f83-e98019630ff8",
  //     ],
  //   },
  //   {
  //     name: "Oats with Almonds and Banana",
  //     description: "A hearty bowl of oats with almonds and banana slices.",
  //     calories: 363,
  //     protein: 20,
  //     carbs: 111,
  //     fats: 7.2,
  //     servingSize: 100,
  //     mealType: MealType.BREAKFAST,
  //     foods: [
  //       "1c79a72d-904a-4b93-bc3b-5923d09d2a5e",
  //       "63ec594d-f07e-4679-b3fa-e9fe5ab0ffa0",
  //       "dd1234fd-974e-49cf-81f0-c8472b298478",
  //     ],
  //   },
  //   {
  //     name: "Avocado Toast with Egg",
  //     description: "Whole-grain toast topped with avocado and a poached egg.",
  //     calories: 315,
  //     protein: 15,
  //     carbs: 19,
  //     fats: 26.3,
  //     servingSize: 100,
  //     mealType: MealType.BREAKFAST,
  //     foods: [
  //       "91272a28-4de1-4e05-88f6-46867d8c84de",
  //       "e3e48664-9aba-45e6-b20f-e18e5f9b2852",
  //       "230a56dc-4b42-4a0f-b424-bd23a16b48ee",
  //     ],
  //   },
  //   {
  //     name: "Cottage Cheese with Raspberries",
  //     description: "Cottage cheese paired with fresh raspberries.",
  //     calories: 150,
  //     protein: 12.2,
  //     carbs: 15.4,
  //     fats: 5,
  //     servingSize: 100,
  //     mealType: MealType.BREAKFAST,
  //     foods: [
  //       "fd433c8b-9f3f-4a87-925b-93c90969f92a",
  //       "26ca6e26-c3a9-48a9-a086-c1c188914429",
  //     ],
  //   },
  //   {
  //     name: "Protein Smoothie",
  //     description: "A smoothie made with Greek yogurt, spinach, and banana.",
  //     calories: 169,
  //     protein: 13.9,
  //     carbs: 27.6,
  //     fats: 0.7,
  //     servingSize: 100,
  //     mealType: MealType.BREAKFAST,
  //     foods: [
  //       "9636e99a-a234-47ef-a99e-677218e8d4e6",
  //       "ca0334e0-d8ef-443a-9a2f-3b2e419de612",
  //       "dd1234fd-974e-49cf-81f0-c8472b298478",
  //     ],
  //   },
  //   {
  //     name: "Oatmeal with Peanut Butter",
  //     description: "A filling bowl of oatmeal mixed with peanut butter.",
  //     calories: 475,
  //     protein: 26.9,
  //     carbs: 86,
  //     fats: 26.9,
  //     servingSize: 100,
  //     mealType: MealType.BREAKFAST,
  //     foods: [
  //       "1c79a72d-904a-4b93-bc3b-5923d09d2a5e",
  //       "34a7fbde-ec00-4831-b121-62dc133e2c5c",
  //     ],
  //   },

  //   // Lunch
  //   {
  //     name: "Chicken and Broccoli",
  //     description: "Grilled chicken breast served with steamed broccoli.",
  //     calories: 199,
  //     protein: 33.8,
  //     carbs: 7,
  //     fats: 4,
  //     servingSize: 100,
  //     mealType: MealType.LUNCH,
  //     foods: [
  //       "fbe502eb-15d0-4bc7-a6af-33455fa5879b",
  //       "946adb90-58fd-4592-b2ef-40e9eb045be8",
  //     ],
  //   },
  //   {
  //     name: "Salmon and Quinoa",
  //     description: "Baked salmon filet served with quinoa.",
  //     calories: 328,
  //     protein: 24.1,
  //     carbs: 21,
  //     fats: 14.9,
  //     servingSize: 100,
  //     mealType: MealType.LUNCH,
  //     foods: [
  //       "442af326-cede-4c31-bb98-7f92d95ed35a",
  //       "5e3b14fa-59c3-4525-9dff-08c52d00e970",
  //     ],
  //   },
  //   {
  //     name: "Tuna Salad",
  //     description: "A fresh salad with tuna, spinach, and cherry tomatoes.",
  //     calories: 158,
  //     protein: 33.9,
  //     carbs: 9.5,
  //     fats: 1.6,
  //     servingSize: 100,
  //     mealType: MealType.LUNCH,
  //     foods: [
  //       "cac94132-16b6-4a4e-add9-1d1c615ba71d",
  //       "ca0334e0-d8ef-443a-9a2f-3b2e419de612",
  //       "43dfd447-08e2-4236-8fe1-d46e95dee000",
  //     ],
  //   },
  //   {
  //     name: "Turkey Breast and Sweet Potato",
  //     description: "Roasted turkey breast with sweet potato slices.",
  //     calories: 222,
  //     protein: 31.6,
  //     carbs: 20,
  //     fats: 1.1,
  //     servingSize: 100,
  //     mealType: MealType.LUNCH,
  //     foods: [
  //       "7c2141d4-8190-4959-abe5-d1e40434bfe8",
  //       "7757174d-0867-4481-af8e-a63bc9bc464d",
  //     ],
  //   },
  //   {
  //     name: "Shrimp Stir-Fry",
  //     description: "Stir-fried shrimp with zucchini and bell peppers.",
  //     calories: 136,
  //     protein: 27.1,
  //     carbs: 7.7,
  //     fats: 0.8,
  //     servingSize: 100,
  //     mealType: MealType.LUNCH,
  //     foods: [
  //       "7fd3bd77-1be5-4ef1-b82d-0dc5b0570d37",
  //       "ee057e02-46c9-4ecf-9d68-f17083c22606",
  //       "e8b91057-d53d-4d3e-b875-b12889d44f52",
  //     ],
  //   },
  //   {
  //     name: "Quinoa Chickpea Salad",
  //     description: "A protein-packed salad with quinoa and chickpeas.",
  //     calories: 216,
  //     protein: 23.1,
  //     carbs: 82,
  //     fats: 7.9,
  //     servingSize: 100,
  //     mealType: MealType.LUNCH,
  //     foods: [
  //       "5e3b14fa-59c3-4525-9dff-08c52d00e970",
  //       "71d25c22-97a1-4543-beba-dcbc05aaca97",
  //     ],
  //   },
  //   {
  //     name: "Beef and Asparagus",
  //     description: "Grilled beef steak with asparagus spears.",
  //     calories: 291,
  //     protein: 28.2,
  //     carbs: 3.9,
  //     fats: 19.2,
  //     servingSize: 100,
  //     mealType: MealType.LUNCH,
  //     foods: [
  //       "3ddb783e-d45c-4fed-bd97-bb4189faff0b",
  //       "ae068762-ce6f-4e79-a0de-039603ee9a0a",
  //     ],
  //   },

  //   // Dinner
  //   {
  //     name: "Grilled Salmon and Avocado",
  //     description: "Grilled salmon served with sliced avocado.",
  //     calories: 368,
  //     protein: 22,
  //     carbs: 9,
  //     fats: 28,
  //     servingSize: 100,
  //     mealType: MealType.DINNER,
  //     foods: [
  //       "442af326-cede-4c31-bb98-7f92d95ed35a",
  //       "91272a28-4de1-4e05-88f6-46867d8c84de",
  //     ],
  //   },
  //   {
  //     name: "Chicken Stir-Fry with Vegetables",
  //     description: "Chicken breast stir-fried with mixed vegetables.",
  //     calories: 243,
  //     protein: 33.8,
  //     carbs: 10.1,
  //     fats: 6.2,
  //     servingSize: 100,
  //     mealType: MealType.DINNER,
  //     foods: [
  //       "fbe502eb-15d0-4bc7-a6af-33455fa5879b",
  //       "946adb90-58fd-4592-b2ef-40e9eb045be8",
  //       "e8b91057-d53d-4d3e-b875-b12889d44f52",
  //     ],
  //   },
  //   {
  //     name: "Beef Mince with Sweet Potato",
  //     description: "Savory beef mince cooked with sweet potato.",
  //     calories: 336,
  //     protein: 27.6,
  //     carbs: 20,
  //     fats: 17.1,
  //     servingSize: 100,
  //     mealType: MealType.DINNER,
  //     foods: [
  //       "601a31b6-78aa-426d-bd32-987dfa2166e4",
  //       "7757174d-0867-4481-af8e-a63bc9bc464d",
  //     ],
  //   },
  //   {
  //     name: "Shrimp and Asparagus",
  //     description: "Garlic shrimp paired with grilled asparagus.",
  //     calories: 122,
  //     protein: 26.2,
  //     carbs: 4.1,
  //     fats: 0.6,
  //     servingSize: 100,
  //     mealType: MealType.DINNER,
  //     foods: [
  //       "7fd3bd77-1be5-4ef1-b82d-0dc5b0570d37",
  //       "ae068762-ce6f-4e79-a0de-039603ee9a0a",
  //     ],
  //   },
  //   {
  //     name: "Turkey and Quinoa Bowl",
  //     description: "Turkey breast served over quinoa with mixed veggies.",
  //     calories: 255,
  //     protein: 34.1,
  //     carbs: 21,
  //     fats: 2.9,
  //     servingSize: 100,
  //     mealType: MealType.DINNER,
  //     foods: [
  //       "7c2141d4-8190-4959-abe5-d1e40434bfe8",
  //       "5e3b14fa-59c3-4525-9dff-08c52d00e970",
  //       "ca0334e0-d8ef-443a-9a2f-3b2e419de612",
  //     ],
  //   },
  //   {
  //     name: "Baked Chicken with Brussels Sprouts",
  //     description: "Oven-baked chicken breast with roasted Brussels sprouts.",
  //     calories: 215,
  //     protein: 33.8,
  //     carbs: 9,
  //     fats: 4.2,
  //     servingSize: 100,
  //     mealType: MealType.DINNER,
  //     foods: [
  //       "fbe502eb-15d0-4bc7-a6af-33455fa5879b",
  //       "946adb90-58fd-4592-b2ef-40e9eb045be8",
  //     ],
  //   },
  //   {
  //     name: "Beef Steak with Zucchini",
  //     description: "Grilled beef steak served with sautéed zucchini.",
  //     calories: 288,
  //     protein: 26.2,
  //     carbs: 3.1,
  //     fats: 19.3,
  //     servingSize: 100,
  //     mealType: MealType.DINNER,
  //     foods: [
  //       "3ddb783e-d45c-4fed-bd97-bb4189faff0b",
  //       "ee057e02-46c9-4ecf-9d68-f17083c22606",
  //     ],
  //   },

  //   // Snacks
  //   {
  //     name: "Almonds and Apple",
  //     description: "A light snack with almonds and apple slices.",
  //     calories: 316,
  //     protein: 21.3,
  //     carbs: 36,
  //     fats: 50.2,
  //     servingSize: 100,
  //     mealType: MealType.SNACK,
  //     foods: [
  //       "63ec594d-f07e-4679-b3fa-e9fe5ab0ffa0",
  //       "ebdfb5bd-24eb-40d6-8e42-2ba3beb06973",
  //     ],
  //   },
  //   {
  //     name: "Peanut Butter and Banana",
  //     description: "Banana slices topped with a spread of peanut butter.",
  //     calories: 340,
  //     protein: 26.1,
  //     carbs: 43,
  //     fats: 50.3,
  //     servingSize: 100,
  //     mealType: MealType.SNACK,
  //     foods: [
  //       "34a7fbde-ec00-4831-b121-62dc133e2c5c",
  //       "dd1234fd-974e-49cf-81f0-c8472b298478",
  //     ],
  //   },
  //   {
  //     name: "Cottage Cheese and Pineapple",
  //     description: "A creamy mix of cottage cheese with fresh pineapple.",
  //     calories: 177,
  //     protein: 14.1,
  //     carbs: 17.5,
  //     fats: 6.1,
  //     servingSize: 100,
  //     mealType: MealType.SNACK,
  //     foods: [
  //       "fd433c8b-9f3f-4a87-925b-93c90969f92a",
  //       "f69d9e05-c67b-4535-9402-4184cbe738b7",
  //     ],
  //   },
  //   {
  //     name: "Greek Yogurt with Nuts",
  //     description: "Thick Greek yogurt topped with mixed nuts.",
  //     calories: 198,
  //     protein: 14.7,
  //     carbs: 12.7,
  //     fats: 10.6,
  //     servingSize: 100,
  //     mealType: MealType.SNACK,
  //     foods: [
  //       "9636e99a-a234-47ef-a99e-677218e8d4e6",
  //       "63ec594d-f07e-4679-b3fa-e9fe5ab0ffa0",
  //     ],
  //   },
  //   {
  //     name: "Egg Salad on Whole Grain",
  //     description: "A simple egg salad served on whole-grain toast.",
  //     calories: 243,
  //     protein: 14.1,
  //     carbs: 18,
  //     fats: 12,
  //     servingSize: 100,
  //     mealType: MealType.SNACK,
  //     foods: [
  //       "e3e48664-9aba-45e6-b20f-e18e5f9b2852",
  //       "230a56dc-4b42-4a0f-b424-bd23a16b48ee",
  //     ],
  //   },
  //   {
  //     name: "Avocado and Tuna Dip",
  //     description: "A rich avocado and tuna dip with vegetable sticks.",
  //     calories: 182,
  //     protein: 29.5,
  //     carbs: 12,
  //     fats: 16.1,
  //     servingSize: 100,
  //     mealType: MealType.SNACK,
  //     foods: [
  //       "91272a28-4de1-4e05-88f6-46867d8c84de",
  //       "cac94132-16b6-4a4e-add9-1d1c615ba71d",
  //     ],
  //   },
  //   {
  //     name: "Hummus with Veggie Sticks",
  //     description: "Classic hummus served with mixed vegetable sticks.",
  //     calories: 177,
  //     protein: 10.4,
  //     carbs: 17.2,
  //     fats: 7.8,
  //     servingSize: 100,
  //     mealType: MealType.SNACK,
  //     foods: [
  //       "17b6faa4-3ed3-45f4-b616-4ac6da0f7bef",
  //       "db69959b-fe05-41fc-90b2-336e5d84694f",
  //       "e8b91057-d53d-4d3e-b875-b12889d44f52",
  //     ],
  //   },
  // ];

  // const workoutPlans = [
  //   {
  //     name: "Full-Body Strength Training",
  //     description:
  //       "A full-body strength training routine focusing on major muscle groups to improve muscle gain, weight gain, and overall health.",
  //     goal: Goal.MUSCLE_GAIN,
  //     difficulty: DifficultyLevel.BEGINNER,
  //     duration: 30,
  //     image:
  //       "https://utfs.io/f/5d569f69-04e7-4d56-9557-5e16a947198b-i8qqfj.jpg",
  //   },
  //   {
  //     name: "HIIT for Weight Loss and Stamina",
  //     description:
  //       "High-Intensity Interval Training (HIIT) combining cardio and bodyweight exercises to promote weight loss, increase stamina, and improve overall health.",
  //     goal: Goal.WEIGHT_LOSS,
  //     difficulty: DifficultyLevel.INTERMEDIATE,
  //     duration: 21,
  //     image:
  //       "https://utfs.io/f/cffb9f46-bf8c-409b-8f97-90438149bf84-v5zfjy.jpg",
  //   },
  //   {
  //     name: "Flexibility and Core Stability",
  //     description:
  //       "A yoga-based workout plan aimed at increasing flexibility, enhancing core stability, and maintaining weight. Great for improving overall health and energy levels.",
  //     goal: Goal.INCREASE_FLEXIBILITY,
  //     difficulty: DifficultyLevel.BEGINNER,
  //     duration: 14,
  //     image:
  //       "https://utfs.io/f/7e719a31-5cd8-4ad2-93f2-6807b643ee8d-hrkc40.jpg",
  //   },
  //   {
  //     name: "Cardio and Core for Stamina and Weight Management",
  //     description:
  //       "A blend of cardio exercises and core workouts to increase stamina, maintain weight, and boost energy levels.",
  //     goal: Goal.INCREASE_STAMINA,
  //     difficulty: DifficultyLevel.INTERMEDIATE,
  //     duration: 28,
  //     image:
  //       "https://utfs.io/f/9740e2ae-7d58-484e-a7a8-64e9840d04cd-aqme1p.jpg",
  //   },
  //   {
  //     name: "Muscle Building and Weight Gain",
  //     description:
  //       "A specialized resistance training plan focused on muscle hypertrophy for individuals looking to gain muscle and weight.",
  //     goal: Goal.WEIGHT_GAIN,
  //     difficulty: DifficultyLevel.ADVANCED,
  //     duration: 60,
  //     image:
  //       "https://utfs.io/f/f3cbd926-b953-4603-8662-d58d85b5e94e-9vuanw.jpg",
  //   },
  //   {
  //     name: "Balanced Wellness Routine",
  //     description:
  //       "A comprehensive workout plan combining elements of strength, cardio, and flexibility exercises aimed at improving overall health and energy levels.",
  //     goal: Goal.IMPROVE_OVERALL_HEALTH,
  //     difficulty: DifficultyLevel.BEGINNER,
  //     duration: 30,
  //     image:
  //       "https://utfs.io/f/43231ee8-9065-4826-a249-0ee7abb3bbfe-wjuhle.jpg",
  //   },
  //   {
  //     name: "Energy Boost and Stamina",
  //     description:
  //       "A mix of moderate cardio, plyometrics, and dynamic stretching to boost energy levels and increase stamina.",
  //     goal: Goal.INCREASE_ENERGY_LEVEL,
  //     difficulty: DifficultyLevel.INTERMEDIATE,
  //     duration: 20,
  //     image:
  //       "https://utfs.io/f/df5074d9-33bd-46f9-887d-91c388e3fc84-ku2n1s.jpg",
  //   },
  // ];

  // const exercises = [
  //   {
  //     name: "Squat",
  //     description:
  //       "Squat is a type of bodyweight exercise. It is one of the most popular exercises for strength and muscle growth. Squat is particularly effective for focusing on the muscles of the leg and hips. Squat are an easy exercise for beginners to do. It can help strengthen leg muscles, tighten hip muscles and burn calories to lose weight. It tightens the butt and legs. Squats are very effective for firming and strengthening your legs by acting on the gluteus,hip flexors, quadriceps, hamstrings and inner thigh muscles. Also, bodyweight squats can help shape your glutes and butt.",
  //     duration: 4.6,
  //     caloriesBurned: 37,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://wger.de/media/exercise-images/849/783d980c-af07-4ac0-a525-6dc8c426a204.gif",
  //       "https://wger.de/media/exercise-images/849/30b2631d-d7ec-415c-800b-7eb082314c0a.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL, ExerciseEquipment.SQUAT_RACK],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Bench Press",
  //     description:
  //       "Lay down on a bench, the bar should be directly above your eyes, the knees are somewhat angled and the feet are firmly on the floor. Concentrate, breath deeply and grab the bar more than shoulder wide. Bring it slowly down till it briefly touches your chest at the height of your nipples. Push the bar up. If you train with a high weight it is advisable to have a spotter that can help you up if you can't lift the weight on your own. With the width of the grip you can also control which part of the chest is trained more: wide grip: outer chest muscles narrow grip: inner chest muscles and triceps.Notes: Don't stretch your arms completly",
  //     duration: 4.2,
  //     caloriesBurned: 26,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL, ExerciseEquipment.BENCH],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Deadlift",
  //     description:
  //       "Stand firmly, with your feet slightly more than shoulder wide apart. Stand directly behind the bar where it should barely touch your shin, your feet pointing a bit out. Bend down with a straight back, the knees also pointing somewhat out. Grab the bar with a shoulder wide grip, one underhand, one reverse grip. Pull the weight up. At the highest point make a slight hollow back and pull the bar back. Hold 1 or 2 seconds that position. Go down, making sure the back is not bent. Once down you can either go back again as soon as the weights touch the floor, or make a pause, depending on the weight.",
  //     caloriesBurned: 34,
  //     duration: 4.2,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.BACK,
  //     images: [
  //       "https://wger.de/media/exercise-images/184/1709c405-620a-4d07-9658-fade2b66a2df.jpeg",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Pull-Up",
  //     description:
  //       "Grab the pull up bar with a wide grip, the body is hanging freely. Keep your chest out and pull yourself up till your chin reaches the bar or it touches your neck, if you want to pull behind you. Go with a slow and controlled movement down, always keeping the chest out.Notes: Keep your head up, Keep your chest out, The elbows always point back, don't let them open sidewards",
  //     caloriesBurned: 34,
  //     duration: 3.7,
  //     repetitions: 8,
  //     sets: 3,
  //     bodyPart: BodyPart.BACK,
  //     images: [
  //       "https://wger.de/media/exercise-images/475/b0554016-16fd-4dbe-be47-a2a17d16ae0e.jpg",
  //     ],
  //     equipment: [ExerciseEquipment.PULLUP_BAR],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Overhead Press",
  //     description:
  //       "Sit on a bench, the back rest should be almost vertical. Take a barbell with a shoulder wide grip and bring it up to chest height. Press the weight up, but don't stretch the arms completely. Go slowly down and repeat.",
  //     duration: 4.6,
  //     caloriesBurned: 28,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://wger.de/media/exercise-images/119/seated-barbell-shoulder-press-large-1.png",
  //       "https://wger.de/media/exercise-images/119/seated-barbell-shoulder-press-large-2.png",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Lunges",
  //     description:
  //       "A lower-body exercise that targets the quadriceps, hamstrings, and glutes.",
  //     duration: 4.6,
  //     caloriesBurned: 33,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://wger.de/media/exercise-images/113/Walking-lunges-1.png",
  //       "https://wger.de/media/exercise-images/113/Walking-lunges-2.png",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Dumbbell Rows",
  //     description:
  //       "With dumbbells in hand, bend at the hip until hands hang just below the knees (similar to straight-legged-deadlift starting position). Keep upper body angle constant while contracting your lats to pull you ellbows back pinching the shoulder blades at the top. Try not to stand up with every rep, check hands go below knees on every rep.",
  //     duration: 4.6,
  //     caloriesBurned: 33,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.BACK,
  //     images: [
  //       "https://wger.de/media/exercise-images/1362/65bd3b6e-6c33-43d3-bb05-cc05d5a834e8.webp",
  //       "https://wger.de/media/exercise-images/81/a751a438-ae2d-4751-8d61-cef0e9292174.png",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Biceps Curls",
  //     description:
  //       "Hold the Barbell shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement. Don't allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows). Notes: Keep your upper body straight, Fluid movements with no pauses at the top or the bottom",
  //     duration: 4.6,
  //     caloriesBurned: 23,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ARMS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Tricep Dips",
  //     description: "An arm exercise that targets the triceps.",
  //     duration: 4.2,
  //     caloriesBurned: 30,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.ARMS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DIP_BARS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Leg Press",
  //     description:
  //       "Adjust the seat position: Sit on the seat with your back against the backrest and your feet resting flat on the platform. Your knees should be bent at a 90-degree angle. Adjust the weight: Add weight plates to the machine according to your desired intensity level. Start with a weight that you can comfortably handle and gradually increase it as you progress. Foot placement: Position your feet hip-width apart on the platform, with toes pointing forward or slightly outward. Ensure your feet are placed firmly and securely on the platform. Preparation: Grip the handles or side supports of the machine for stability. Take a deep breath and brace your core muscles. Execution: Push against the platform with your feet and extend your legs, driving the platform away from your body. Keep your back against the seat throughout the movement and avoid locking your knees at the top of the movement. Lowering the weight: Slowly bend your knees and lower the weight back down, allowing your knees to reach a 90-degree angle or slightly beyond without letting the weight touch down completely. Repeat: Complete the desired number of repetitions, maintaining control and proper form throughout the exercise. Remember to start with lighter weights and gradually increase the load as you become more comfortable and confident with the exercise.",
  //     duration: 4.2,
  //     repetitions: 10,
  //     caloriesBurned: 34,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.LEG_PRESS_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Chest Dumbbell Fly",
  //     description:
  //       "Dumbbell fly exercise targets the sternal heads of your pectoralis major muscles, which are found in your chest, but also strengthens your triceps, deltoids, biceps, wrist flexors and brachialis muscles. Dumbbell fly exercise will help you build fully defined pectorals. It is one of the best exercises you should do If you want a defined and more shred chest muscle. Dumbbell flyes are very effective for the work of the large pectoralis major and smaller pectoralis minor muscles. Exercising these muscles can give you the ‘chest separation’ look.",
  //     duration: 4.6,
  //     repetitions: 12,
  //     caloriesBurned: 28,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS, ExerciseEquipment.BENCH],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Cable Rows",
  //     description:
  //       "Place your feet firmly on the footrest or platform provided by the cable machine.\n Keep your back straight and avoid slouching or rounding your shoulders forward. Engage your core muscles to help maintain good posture. This will help you maintain stability and prevent your lower back from rounding.\n Before starting the exercise, retract your shoulder blades and keep them in this position throughout the movement. This will help engage the muscles of the upper back and prevent excessive strain on the shoulders and neck.\n As you pull the cable handles towards you, keep your elbows flared out to the sides and squeeze your shoulder blades together at the end of the movement. This will help engage the muscles of the upper back and prevent excessive strain on the shoulders.\n Pause for a second at the top of the movement and then slowly release back to the starting position. Exhale as you pull the cable towards your body and inhale as you return to the starting position. \n Repeat for the desired number of repetitions.\r\n\r\nTips:\r\n\r\nRounding the back: Maintain proper posture throughout the movement by keeping your back straight and your chest up. \n Using too much weight: Start with a lighter weight and gradually increase as you become more comfortable with the exercise. Using momentum: Focus on using a slow and controlled movement to engage the target muscles effectively.",
  //     duration: 4.6,
  //     caloriesBurned: 28,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.BACK,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CABLE_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Hip Thrusts",
  //     description:
  //       "**Exercise Instructions:**\n\n" +
  //       "1. **Starting Position:**\n" +
  //       "Sit on the floor with your back against a bench.\n" +
  //       "Position a barbell across your hips.\n" +
  //       "Plant your feet firmly on the ground, with your knees bent and heels about hip-width apart.\n\n" +
  //       "2. **Execution:**\n" +
  //       "Roll the barbell up your legs until it is directly above your hips.\n" +
  //       "Tighten your core and glutes.\n" +
  //       "Drive your hips up towards the ceiling until your body forms a straight line from your knees to your shoulders.\n" +
  //       "Pause at the top of the movement.\n" +
  //       "Lower your hips back down to the starting position.\n" +
  //       "Repeat for your desired number of repetitions.\n\n" +
  //       "**Tips:**\n\n" +
  //       "- **Start with a Lighter Weight:**\n" +
  //       "Begin with a lighter weight to ensure you maintain good form throughout the exercise.\n\n" +
  //       "- **Position Yourself Correctly:**\n" +
  //       "Sit with your back against the bench.\n" +
  //       "Position the barbell comfortably on your pelvic bone.\n" +
  //       "Keep your head and neck in a neutral position, with shoulders down and back.\n\n" +
  //       "- **Feet Placement:**\n" +
  //       "Keep your feet shoulder-width apart and ensure your toes point straight ahead.\n\n" +
  //       "- **Engage Core and Glutes:**\n" +
  //       "Engage your core and glutes before lifting your hips to use the correct muscles during the exercise.\n\n" +
  //       "- **Smooth Lift:**\n" +
  //       "Lift your hips in a smooth and controlled motion, avoiding arching your back or straining your neck.\n\n" +
  //       "- **Squeeze Glutes:**\n" +
  //       "At the top of the movement, squeeze your glutes to target them effectively.\n\n" +
  //       "- **Controlled Descent:**\n" +
  //       "Lower your hips back to the ground slowly and controlled, keeping your core and glutes engaged.",
  //     duration: 4.6,
  //     caloriesBurned: 37,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.GLUTES,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Plank",
  //     description:
  //       "**Exercise Instructions:**\n\n" +
  //       "1. **Starting Position:**\n" +
  //       "   Lie face down on an exercise mat with your elbows to your sides, your head facing forward, and palms flat on the floor.\n\n" +
  //       "2. **Execution:**\n" +
  //       "   Engaging your core and glutes, raise your body from the floor, supporting your weight on your forearms and toes while breathing freely. Concentrate on maintaining a straight line through your core and legs.\n\n" +
  //       "3. **Hold and Return:**\n" +
  //       "   Hold the plank position, maintaining good form and keeping your glutes tensed, then return to the start position slowly and with good control.\n\n" +
  //       "**Tips:**\n\n" +
  //       "- Keep the spine neutral; engage in 'abdominal stabilization' by pulling abdominal muscles.\n" +
  //       "- Lower the shoulder blades, activating the anterior dentate muscles and the lower parts of the trapezius muscles.\n" +
  //       "- Do not round or bend your back. Keep your pelvis in a neutral position.\n" +
  //       "- Do not slouch or hunch. Keep your chest flat and the shoulder blades flattened.\n" +
  //       "- Do not hold your breath. Breathe freely and naturally.\n" +
  //       "- The main goal is to maintain stabilization and balance of all parts of the body.\n" +
  //       "- Start at 10-second intervals and gradually move on to 60-second intervals.",
  //     duration: 5.5,
  //     caloriesBurned: 28,
  //     repetitions: null,
  //     sets: 3,
  //     bodyPart: BodyPart.CORE,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/plank.gif",
  //     ],
  //     equipment: [ExerciseEquipment.YOGA_MAT],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Russian Twists",
  //     description:
  //       "The Russian twist is a popular core exercise that targets the muscles of the abdomen, particularly the obliques. It also engages the lower back and hip muscles to a certain extent. The exercise involves a twisting motion of the torso while sitting on the floor. While the Russian twist can be an effective exercise for strengthening the core and improving rotational stability, it's important to be aware of potential risks and considerations.\n\n" +
  //       "How to do Russian Twist:\n\n" +
  //       "1. Sit on the floor with your knees bent and your feet flat on the ground.\n" +
  //       "2. Lean back slightly so that your upper body forms a V shape with your thighs. Keep your back straight, and engage your core muscles.\n" +
  //       "3. Clasp your hands together in front of you or hold a weight or medicine ball with both hands. This adds resistance to the exercise.\n" +
  //       "4. Twist your torso to one side, bringing the weight or your hands beside your hip. Keep your core engaged throughout the movement.\n" +
  //       "5. Return to the center and then twist to the other side.\n" +
  //       "6. Repeat the twisting motion from side to side for the desired number of repetitions or time.",
  //     duration: 5.5,
  //     caloriesBurned: 33,
  //     repetitions: 15,
  //     sets: 3,
  //     bodyPart: BodyPart.CORE,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif",
  //     ],
  //     equipment: [ExerciseEquipment.NONE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Mountain Climbers",
  //     description:
  //       "The Cross Body Mountain Climber is a dynamic exercise that targets the core muscles, including the abdominals, obliques, and hip flexors. It also provides a challenging and effective workout for your core and upper body while increasing cardiovascular endurance.\n\n" +
  //       "How to do Cross Body Mountain Climber:\n\n" +
  //       "1. Start in a high plank position with your hands directly under your shoulders and your body forming a straight line from head to heels.\n" +
  //       "2. Engage your core muscles by drawing your navel toward your spine and maintaining a stable core throughout the exercise.\n" +
  //       "3. Lift your right foot off the ground and bring your right knee toward your left elbow, crossing your body diagonally.\n" +
  //       "4. As you bring your knee in, engage your core and maintain a strong plank position.\n" +
  //       "5. Extend your right leg back to the starting position while simultaneously repeating the movement on the other side.\n" +
  //       "6. Lift your left foot off the ground and bring your left knee toward your right elbow, crossing your body diagonally.\n" +
  //       "7. Repeat for the desired number of repetitions or follow a set time frame for your workout.\n\n" +
  //       "Tips:\n\n" +
  //       "- Maintain a steady and rhythmic pace, focusing on keeping your hips stable and your core engaged throughout the exercise.\n" +
  //       "- Continue alternating sides in a fluid and controlled motion, mimicking the movement of climbing a mountain.\n" +
  //       "- Aim for a full range of motion, bringing your knees as close to your elbows as possible without compromising form.\n" +
  //       "- If you're new to this exercise, start with a slower tempo and gradually increase the intensity and speed as you become more comfortable and confident in the movement.",
  //     duration: 5.5,
  //     caloriesBurned: 55,
  //     repetitions: null,
  //     sets: 3,
  //     bodyPart: BodyPart.CORE,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/07/Cross-Body-Mountain-Climber.gif",
  //     ],
  //     equipment: [ExerciseEquipment.NONE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Leg Raises",
  //     description:
  //       "Leg raises are an effective core exercise that primarily targets the lower abdominal muscles. Here's how to perform them:\n\n" +
  //       "1. Lie on your back with your arms placed by your sides. Raise your legs into a vertical position, keeping your knees and feet together and your back and hips neutral.\n\n" +
  //       "2. Slowly lower your legs, keeping your feet and knees together, controlling the movement with your core and keeping your torso stationary.\n\n" +
  //       "3. Continue the movement until your feet are as near to the floor as you can get, maintaining a neutral back. Hold this position briefly, then slowly lift your legs back to the start position, with a controlled, smooth motion. Avoid lifting your lower back as you repeat.\n\n" +
  //       "Remember to engage your core throughout the exercise and breathe steadily. If you experience lower back discomfort, try placing your hands under your lower back for support or only lower your legs as far as you can while maintaining proper form.",
  //     duration: 5.5,
  //     caloriesBurned: 33,
  //     repetitions: 15,
  //     sets: 3,
  //     bodyPart: BodyPart.ABS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Raise.gif",
  //     ],
  //     equipment: [ExerciseEquipment.NONE],
  //     category: ExerciseCategory.STRENGTH,
  //   },

  //   {
  //     name: "Tricep Extensions",
  //     description:
  //       "Tricep Extensions are an effective exercise for targeting the triceps muscles. Here's how to perform them:\n\n" +
  //       "1. Starting Position: Lie on a decline bench holding two dumbbells. Extend your arms straight up towards the ceiling.\n\n" +
  //       "2. Movement: Inhale as you slowly bend your elbows, lowering the dumbbells to the sides of your head. Pause briefly, then exhale as you extend your arms back to the starting position.\n\n" +
  //       "3. Form Tips: Keep your upper arms stationary throughout the movement. Focus on moving only at the elbow joint.\n\n" +
  //       "4. Beginner Tips: Start with lighter weights to develop proper form and stability. As you practice, you'll improve coordination and can gradually increase the weight.\n\n" +
  //       "Remember to maintain control throughout the exercise and avoid swinging or using momentum to lift the weights.",
  //     duration: 4.6,
  //     caloriesBurned: 23,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ARMS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/02/Decline-Dumbbell-Triceps-Extension.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Seated Shoulder Press",
  //     description:
  //       "The dumbbell shoulder press, also known as the dumbbell overhead press, is an exercise that targets the muscles of the shoulders and upper body. It involves lifting a pair of dumbbells from shoulder level to an overhead position, using the shoulders and arms.\n\n" +
  //       "The dumbbell shoulder press targets the shoulder muscles, specifically the front deltoids. Dumbbells are easily accessible and can be used in various settings, including home workouts and gym environments.\n\n" +
  //       "How to do:\n" +
  //       "Dumbbell Shoulder Press\n" +
  //       "Starting Position: Begin seated with your feet firmly on the floor. Hold the dumbbells at shoulder height with your palms facing forwards.\n\n" +
  //       "Form: Exhale and press the dumbbells over your head. Hold for a brief second at the top and then slowly lower to the starting position.\n\n" +
  //       "Personal Trainer Tips: Be mindful of your lower back position. As you press overhead, your back will have the tendency to arch. Remember to start with lighter weights and gradually increase the load as you progress. Keep your core muscles engaged so that you maintain good posture.",
  //     duration: 4.2,
  //     caloriesBurned: 26,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Side Plank",
  //     description:
  //       "The Side Plank is an effective core exercise that targets the obliques and improves overall stability. Here's how to perform it:\n\n" +
  //       "1. Starting Position: Lie on your right side, raising yourself onto your right forearm. Place your right shoulder directly above your right elbow, keeping your shoulders, hips, and knees in one straight line.\n\n" +
  //       "2. Preparation: Rest your left arm along the side of your body. Before you press up, draw your abs in, drop your shoulders away from your ears, and lengthen your spine.\n\n" +
  //       "3. Movement: Push up so that your body is straight. Hold for 10 seconds if you're a beginner, or up to 1 minute if you're more advanced. Repeat on your left side.\n\n" +
  //       "4. Technique Points:\n" +
  //       "   a) Arm Positioning: Your elbow must be placed directly beneath your shoulder. Weight should be placed beneath your upper arm, under your elbow, with no additional weight on the forearm, wrist, or hand.\n" +
  //       "   b) Shoulder Position: Release your shoulders down from your ears to help connect the structure of your arms to your core muscles. Actively contract the lat muscles of your back to help pull your shoulders down into the proper position.\n" +
  //       "   c) Spinal Alignment: Lengthen your spine. Lift your head away from your shoulders, lengthening your neck while simultaneously reaching your tailbone in the opposite direction. Maintain this long spine throughout the entire duration of the exercise. Do not let your mid-section sag.\n" +
  //       "   d) Breathing Technique: Breathe naturally and slowly. Pay attention to how your body reacts at different stages of your breath, as this may reveal areas in your core that need focus.\n\n" +
  //       "Remember to maintain proper form throughout the exercise for maximum benefit and to prevent injury.",
  //     duration: 3.5,
  //     caloriesBurned: 18,
  //     repetitions: null,
  //     sets: 3,
  //     bodyPart: BodyPart.CORE,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.YOGA_MAT],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Goblet Squat",
  //     description:
  //       "Stand with your feet shoulder-width apart. Hold a dumbbell vertically in front of your chest, with both hands gripping the top of the weight.\n\n" +
  //       "Brace your core and keep your back straight. Push your hips back and bend your knees as if you're going to sit down in a chair. Lower yourself until your thighs are parallel to the floor (or as low as comfortably possible).\n\n" +
  //       "Pause for a second at the bottom, then push through your heels to drive yourself back up to the starting position.\n\n" +
  //       "Perform the desired number of repetitions, maintaining proper form and control.\n\n" +
  //       "Tips:\n" +
  //       "• Avoid rounding your back or letting your knees cave inward.\n" +
  //       "• Keep your weight evenly distributed on your feet.\n" +
  //       "• Start with a lighter weight to master the technique before increasing the load.\n" +
  //       "• If you experience any pain or discomfort, stop the exercise and reassess your form.",
  //     duration: 4.6,
  //     caloriesBurned: 37,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/06/kettlebell-goblet-squat.gif",
  //     ],
  //     equipment: [ExerciseEquipment.KETTLEBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Dumbbell Bench Press",
  //     description:
  //       "The Dumbbell Bench Press is a compound exercise that targets the chest, shoulders, and triceps. Here's how to perform it:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Lie flat on a bench with your feet firmly planted on the ground.\n" +
  //       "   • Hold a dumbbell in each hand, resting them on your thighs.\n\n" +
  //       "2. Starting Position:\n" +
  //       "   • Using a controlled motion, bring the dumbbells up to shoulder level.\n" +
  //       "   • Your palms should be facing forward, and your wrists should be in a neutral position.\n\n" +
  //       "3. Execution:\n" +
  //       "   • Inhale and engage your core muscles.\n" +
  //       "   • Slowly lower the dumbbells towards your chest, keeping your elbows at about a 45-degree angle to your body.\n" +
  //       "   • Lower until your elbows are slightly below the bench level or until you feel a gentle stretch in your chest.\n\n" +
  //       "4. Pushing Phase:\n" +
  //       "   • Exhale and push the dumbbells back up to the starting position, fully extending your arms without locking your elbows.\n" +
  //       "   • Keep your chest engaged and maintain a slight arch in your lower back throughout the movement.\n\n" +
  //       "5. Repeat:\n" +
  //       "   • Perform the desired number of repetitions, maintaining proper form and control.\n\n" +
  //       "Tips:\n" +
  //       "• Start with a comfortable weight and gradually increase as you become stronger.\n" +
  //       "• Focus on controlled movements during both lowering and pushing phases.\n" +
  //       "• Keep your shoulder blades retracted to provide stability and support to your shoulders.",
  //     duration: 4.2,
  //     caloriesBurned: 26,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS, ExerciseEquipment.BENCH],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Lat Pulldown",
  //     description:
  //       "The Lat Pulldown is a compound exercise that targets the back muscles, particularly the latissimus dorsi. Here's how to perform it:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Attach a wide handle bar to the cable of the lat pulldown machine.\n" +
  //       "   • Sit on the machine with your feet flat on the ground and knees firmly pressed against the pad.\n" +
  //       "   • Your thighs should be parallel to the ground.\n\n" +
  //       "2. Starting Position:\n" +
  //       "   • Grab the bar with both hands, palms facing away from you.\n" +
  //       "   • Your grip should be wider than shoulder-width apart.\n\n" +
  //       "3. Execution:\n" +
  //       "   • Keep your back straight and chest up.\n" +
  //       "   • Pull the bar down towards your chest by contracting your back muscles.\n" +
  //       "   • Your elbows should point downwards and stay close to your body.\n\n" +
  //       "4. Return:\n" +
  //       "   • Pause briefly when the bar reaches your chest.\n" +
  //       "   • Slowly release the bar back up to the starting position, extending your arms fully.\n\n" +
  //       "5. Repeat:\n" +
  //       "   • Perform the desired number of repetitions.\n\n" +
  //       "Tips:\n" +
  //       "• Use controlled movements and focus on engaging your back muscles.\n" +
  //       "• Keep your shoulders down and away from your ears throughout the exercise.\n" +
  //       "• Exhale as you pull the bar down, inhale as you release it up.\n" +
  //       "• Start with a lighter weight to ensure proper form before increasing.\n" +
  //       "• Aim for 3-4 sets of 8-12 reps, 2 times per week in your routine.",
  //     duration: 4.6,
  //     repetitions: 12,
  //     caloriesBurned: 28,
  //     sets: 3,
  //     bodyPart: BodyPart.BACK,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
  //     ],
  //     equipment: [ExerciseEquipment.LAT_PULLDOWN_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Chest Press",
  //     description:
  //       "The chest press machine is an exercise preferred by beginners as it focuses on the entire pectoral muscles and provides greater stability. Targeting the pectorals, triceps and deltoids, chest press machine exercise help to build upper body strength and increase muscle mass.",
  //     caloriesBurned: 26,
  //     duration: 4.2,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Press-Machine.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CHEST_PRESS_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Hip Abduction Machine",
  //     description:
  //       "A lower-body exercise that targets the hip abductors and glutes.",
  //     caloriesBurned: 23,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.GLUTES,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/HiP-ABDUCTION-MACHINE.gif",
  //     ],
  //     equipment: [ExerciseEquipment.LEG_ABDUCTOR_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Standing Calf Raises",
  //     description: "A lower-body exercise that targets the calves.",
  //     duration: 5.5,
  //     caloriesBurned: 28,
  //     repetitions: 15,
  //     sets: 3,
  //     bodyPart: BodyPart.CALVES,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Calf-Raise.gif",
  //     ],
  //     equipment: [ExerciseEquipment.NONE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Ab Wheel Rollouts",
  //     description:
  //       "A core exercise that targets the abdominal muscles and improves stability.",
  //     caloriesBurned: 2,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ABS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/06/Ab-Wheel-Rollout.gif",
  //     ],
  //     equipment: [ExerciseEquipment.AB_WHEEL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Incline Bench Press",
  //     description:
  //       "An upper-body exercise that targets the chest, shoulders, and triceps using an inclined bench and barbell. Set up the incline bench at a 30-45 degree angle. Lie on the bench with feet flat on the ground, grip the barbell slightly wider than shoulder-width. Lower the bar to your upper chest, then press it back up. Maintain proper form throughout, keeping your core tight and back flat against the bench. Start with a lighter weight and gradually increase as your strength improves.",
  //     caloriesBurned: 26,
  //     duration: 4.2,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL, ExerciseEquipment.BENCH],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Hack Squats Machine",
  //     description:
  //       "The focus of the hack squat machine is the quadriceps muscles. It is also a machine exercise designed to train and strengthen the entire lower body, including the hips, hamstrings, quads, and core muscles. Since its application is more secure, beginners may prefer it. The hack squat machine is useful because the weight load is distributed at an angle to your center of mass. This reduces stress on the spine and allows more weight to be lifted overall. You can include it in your training programs to increase functional strength and improve the stabilizing muscles of the legs.",
  //     caloriesBurned: 33,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Sled-Hack-Squat.gif",
  //     ],
  //     equipment: [ExerciseEquipment.HACK_SQUAT_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "TRX Rows",
  //     description:
  //       "An upper-body exercise that targets the back and biceps using TRX bands.",
  //     caloriesBurned: 37,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.BACK,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/01/Ring-Inverted-Row.gif",
  //     ],
  //     equipment: [ExerciseEquipment.TRX_SUSPENSION],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Kettlebell Swings",
  //     description:
  //       "A dynamic lower-body exercise that targets the glutes, hamstrings, and core using a kettlebell. Stand with feet shoulder-width apart, grip the kettlebell with both hands. Hinge at the hips, swinging the kettlebell between your legs, then explosively drive your hips forward, swinging the kettlebell up to chest height. Let the kettlebell fall back down naturally, hinging at the hips again to absorb the momentum. Repeat in a fluid motion. Keep your back straight, core engaged, and use your hips to generate power, not your arms. This exercise improves power, cardiovascular fitness, and strengthens the posterior chain.",
  //     caloriesBurned: 66,
  //     duration: 5.5,
  //     repetitions: 15,
  //     sets: 3,
  //     bodyPart: BodyPart.GLUTES,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Swings.gif",
  //     ],
  //     equipment: [ExerciseEquipment.KETTLEBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Dumbbell Lunges",
  //     description:
  //       "Builds size and strength in quads, glutes, and hamstrings. Dumbbell lunges are one of the effective lower body exercises that completely improve leg strength, stability, and balance. Dumbbell lunges target the quadriceps and hip muscles most intensely, but also hit the knee tendons, thighs, and core.Dumbbell lunges are an easy exercise for beginners to do. It can help strengthen leg muscles, tighten hip muscles, and burn calories to lose weight.It tightens the butt. Dumbbell lunges are one of the best exercises that can help you achieve a firmer and more toned butt by acting on the deepest gluteus muscles.",
  //     caloriesBurned: 33,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Barbell Hip Thrusts",
  //     description:
  //       "The Barbell Hip Thrust is a powerful exercise that targets the glutes, helping to improve strength and muscle mass. Here's how to perform it:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Sit on the floor with your back against a bench, positioning a barbell across your hips.\n" +
  //       "   • Plant your feet on the ground, with knees bent and heels about hip-width apart.\n\n" +
  //       "2. Starting Position:\n" +
  //       "   • Roll the barbell up your legs until it's directly above your hips.\n" +
  //       "   • Tighten your core and glutes.\n\n" +
  //       "3. Execution:\n" +
  //       "   • Drive your hips up towards the ceiling, forming a straight line from your knees to your shoulders.\n" +
  //       "   • Pause at the top of the movement.\n\n" +
  //       "4. Return:\n" +
  //       "   • Lower your hips back down to the starting position in a controlled manner.\n\n" +
  //       "5. Repeat:\n" +
  //       "   • Perform the desired number of repetitions.\n\n" +
  //       "Tips:\n" +
  //       "• Start with a lighter weight to ensure good form throughout the exercise.\n" +
  //       "• Position yourself correctly: back against the bench, barbell on your pelvic bone, head and neck neutral, shoulders down and back.\n" +
  //       "• Keep your feet firmly on the ground, shoulder-width apart, toes pointing straight ahead.\n" +
  //       "• Engage your core and glutes before lifting your hips to use the correct muscles.\n" +
  //       "• Lift your hips smoothly, avoiding back arching or neck straining.\n" +
  //       "• Squeeze your glutes at the top of the movement to target them effectively.\n" +
  //       "• Lower your hips slowly, keeping your core and glutes engaged.\n\n" +
  //       "For Beginners:\n" +
  //       "• Start with a lighter weight and gradually increase as you get stronger. A good starting weight is around 40-50% of your one-rep max.\n" +
  //       "• As you gain experience, you can increase the weight to around 80-90% of your one-rep max.",
  //     duration: 4.6,
  //     caloriesBurned: 37,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.GLUTES,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Leg Extensions",
  //     description:
  //       "The Leg Extension is an isolation exercise that targets the quadriceps. Follow these steps to perform it correctly:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Set the leg extension machine to your appropriate height and adjust the backrest and footpad to align with your body.\n" +
  //       "   • Sit on the machine with your back against the backrest and your feet firmly placed against the footpad. Ensure your knees are aligned with the pivot point of the machine.\n\n" +
  //       "2. Starting Position:\n" +
  //       "   • Position your legs under the padded lever or roller of the machine. The pad should rest against the front of your ankles, just above your feet.\n" +
  //       "   • Grasp the handles provided on the machine for stability and support throughout the exercise. Keep your upper body relaxed and maintain good posture.\n\n" +
  //       "3. Execution:\n" +
  //       "   • Exhale and contract your quadriceps to extend your legs. Straighten your knees and lift the weighted lever or roller by pushing your feet forward.\n" +
  //       "   • Continue the movement until your legs are fully extended, but avoid locking your knees at the top of the movement.\n" +
  //       "   • Pause briefly in the extended position, focusing on squeezing your quadriceps.\n\n" +
  //       "4. Return:\n" +
  //       "   • Inhale and slowly lower the weight by bending your knees and returning to the starting position, controlling the descent.\n\n" +
  //       "5. Repeat:\n" +
  //       "   • Perform the exercise for the desired number of repetitions.\n\n",
  //     duration: 4.6,
  //     caloriesBurned: 28,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
  //     ],
  //     equipment: [ExerciseEquipment.LEG_EXTENSION_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Leg Curls",
  //     description:
  //       "The leg curl is an isolation exercise that targets the muscles of the back of the thigh, specifically the hamstrings. It is an effective exercise for developing strength, size, and muscular endurance in the hamstrings. It is commonly performed using a leg curl machine found in gyms or fitness centers.",
  //     duration: 4.6,
  //     caloriesBurned: 28,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif",
  //     ],
  //     equipment: [ExerciseEquipment.LEG_CURL_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Chest Dips",
  //     description:
  //       "Chest Dips are an effective exercise for targeting the chest, triceps, and shoulders. Here's how to perform them:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Stand facing a set of parallel bars with your hands shoulder-width apart and palms facing inward.\n" +
  //       "   • Jump up and straighten your arms so that your body is fully extended with your feet off the ground.\n\n" +
  //       "2. Execution:\n" +
  //       "   • Lower your body by bending your elbows and leaning forward slightly, keeping your elbows close to your sides.\n" +
  //       "   • Continue lowering until your shoulders are slightly below your elbows or until you feel a stretch in your chest.\n\n" +
  //       "3. Return:\n" +
  //       "   • Push yourself back up to the starting position by straightening your arms, exhaling as you do so.\n\n" +
  //       "4. Repeat:\n" +
  //       "   • Perform the desired number of repetitions.\n\n" +
  //       "Tips:\n" +
  //       "• Keep your core engaged and your body in a straight line throughout the movement.\n" +
  //       "• For beginners, start with assisted dips using resistance bands or a dip machine until you build up the strength to perform them unassisted.",
  //     duration: 4.2,
  //     caloriesBurned: 34,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/06/Chest-Dips.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DIP_BARS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Cable Chest Fly",
  //     description:
  //       "An upper-body exercise that targets the chest muscles using a cable machine.",
  //     duration: 4.6,
  //     caloriesBurned: 28,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/02/Seated-Cable-Chest-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CABLE_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Reverse Fly",
  //     description:
  //       "The Dumbbell Reverse Fly is a free weights exercise that primarily targets the rear shoulders. It's an excellent addition to any workout program for isolating and strengthening the rear shoulder and rotator cuff muscles. Here's how to perform it:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Stand with your feet shoulder-width apart, holding a dumbbell in each hand.\n" +
  //       "   • Bend at your hips and slightly at your knees, keeping your back straight and letting the dumbbells hang down.\n\n" +
  //       "2. Execution:\n" +
  //       "   • With a slight bend in your elbows, raise the dumbbells out to the sides until they are at shoulder level.\n" +
  //       "   • Squeeze your shoulder blades together at the top of the movement.\n\n" +
  //       "3. Return:\n" +
  //       "   • Lower the dumbbells back to the starting position in a controlled manner.\n\n" +
  //       "4. Repeat:\n" +
  //       "   • Perform the desired number of repetitions.\n\n" +
  //       "Muscle Activation:\n" +
  //       "• This exercise activates the rear deltoids, trapezius, infraspinatus, and subscapularis muscles, which can help improve posture and alleviate discomfort from muscle weakness.",
  //     duration: 4.6,
  //     caloriesBurned: 28,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Reverse-Fly.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Rope Pushdown",
  //     description:
  //       "The Rope Pushdown is a triceps exercise performed on a cable machine with a rope attachment, effectively targeting the triceps muscles. It provides a unique grip and hand positioning, enhancing overall arm strength and definition. Here's how to perform it:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Attach a rope attachment to the upper part of a cable machine.\n" +
  //       "   • Stand upright and hold the rope with your hands facing each other, elbows close to your body.\n\n" +
  //       "2. Execution:\n" +
  //       "   • Exhale and pull the rope down towards your waist, extending your arms fully while keeping your elbows stationary.\n" +
  //       "   • Hold for a brief moment at the bottom of the movement.\n\n" +
  //       "3. Return:\n" +
  //       "   • Slowly return to the starting position, allowing your arms to bend without letting your shoulders tip forward.\n\n" +
  //       "4. Repeat:\n" +
  //       "   • Perform the desired number of repetitions.\n\n" +
  //       "Tips:\n" +
  //       "• Keep your shoulders in alignment and stationary throughout the exercise to isolate and focus on the triceps.\n" +
  //       "• Stand up straight with your back in good alignment, avoiding any leaning or swaying.\n" +
  //       "• Use slow and controlled movements to maximize muscle engagement and prevent injury.",
  //     duration: 4.6,
  //     caloriesBurned: 28,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ARMS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/06/Rope-Pushdown.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CABLE_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Cable Bicep Curl",
  //     description:
  //       "An arm exercise that targets the biceps using a cable machine.",
  //     caloriesBurned: 23,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ARMS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/06/One-Arm-Cable-Bicep-Curl.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CABLE_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Sled Push",
  //     description: "A full-body exercise that improves strength and power.",
  //     caloriesBurned: 42,
  //     duration: 4.2,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://utfs.io/f/7701c0be-73a9-42c3-a735-6648acd21821-1mk8db.webp",
  //     ],
  //     equipment: [ExerciseEquipment.NONE],
  //     category: ExerciseCategory.STRENGTH,
  //   },

  //   {
  //     name: "Hanging Leg Raises",
  //     description:
  //       "Your own body weight acts as the resistance that assists in increasing your stamina and building endurance. This exercise that works the hip flexors improves your core muscles, especially the lower abdominal muscles. It is one of the best abs exercises that activate the entire core by working out not just your lower abs but also the upper abdominal muscles.",
  //     caloriesBurned: 3,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ABS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/08/Hanging-Leg-Raises.gif",
  //     ],
  //     equipment: [ExerciseEquipment.PULLUP_BAR],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Single-Leg Deadlift",
  //     description:
  //       "A lower-body exercise that targets the hamstrings, glutes, and core stability.",
  //     caloriesBurned: 37,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/09/Dumbbell-Single-Leg-Deadlift.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Cable Face Pull",
  //     description:
  //       "Cross cable face pull is a cable exercise that activates and develops your back and traps. The exercise also improves the shoulders in general and the rotator cuff muscles such as the infraspinatus. In addition, this exercise is one of the corrective exercises that helps to compensate for poor posture and shoulder dysfunction and benefits posture.",
  //     caloriesBurned: 28,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/04/Cross-Cable-Face-Pull.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CABLE_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Medicine Ball Slams",
  //     description:
  //       "The Medicine Ball Slam is a dynamic exercise that targets the core, shoulders, and legs. It enhances explosive power and cardiovascular fitness. Here's how to perform it:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Stand with your feet shoulder-width apart, holding a medicine ball in both hands.\n" +
  //       "   • Keep your back in a neutral position, engage your core, and raise the medicine ball above your head with straight arms and shoulders aligned.\n\n" +
  //       "2. Execution:\n" +
  //       "   • In one powerful movement, drive the medicine ball down toward the floor in front of you.\n" +
  //       "   • Keep your arms straight, pivot at your shoulders, and use your core to generate force.\n\n" +
  //       "3. Release:\n" +
  //       "   • Let go of the ball at the bottom of the downward movement while maintaining alignment of your shoulders and hips.\n" +
  //       "   • Your legs should remain straight, and ideally, the force should lift your body slightly off the ground.\n\n" +
  //       "4. Repeat:\n" +
  //       "   • Retrieve the ball and perform the desired number of repetitions.\n\n" +
  //       "Tips:\n" +
  //       "• Focus on engaging your core throughout the exercise to maximize power and stability.\n" +
  //       "• Use controlled breathing: inhale as you raise the ball and exhale forcefully as you slam it down.\n" +
  //       "• Ensure proper form by keeping your shoulders aligned and avoiding any twisting of your torso.",
  //     duration: 5.5,
  //     caloriesBurned: 55,
  //     repetitions: 15,
  //     sets: 3,
  //     bodyPart: BodyPart.CORE,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2022/06/Medicine-ball-Overhead-Slam-exercise.gif",
  //     ],
  //     equipment: [ExerciseEquipment.MEDICINE_BALL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Incline Dumbbell Press",
  //     description:
  //       "The Incline Dumbbell Press targets the upper chest and shoulders. Here's a step-by-step guide on how to perform it:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Set an incline bench to a 30-45 degree angle.\n" +
  //       "   • Sit on the bench with your back flat against the bench and your feet flat on the ground.\n\n" +
  //       "2. Starting Position:\n" +
  //       "   • Hold a dumbbell in each hand at shoulder width, with your wrists rotated so that your palms are facing away from your body.\n\n" +
  //       "3. Execution:\n" +
  //       "   • Press the dumbbells upward and together until they meet over your chest.\n" +
  //       "   • Pause briefly at the top of the movement.\n\n" +
  //       "4. Return:\n" +
  //       "   • Lower the dumbbells back to the starting position, keeping your elbows at a 45-degree angle to your body.\n\n" +
  //       "5. Repeat:\n" +
  //       "   • Perform the desired number of repetitions.\n\n" +
  //       "Note:\n" +
  //       "• Use a weight that challenges you but allows you to maintain proper form throughout the exercise.\n" +
  //       "• Warm up properly before starting the exercise to prevent injury.",
  //     caloriesBurned: 26,
  //     duration: 4.2,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.CHEST,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS, ExerciseEquipment.BENCH],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Barbell Shrugs",
  //     description:
  //       "Behind the back barbell shrugs are an exercise that primarily targets the trapezius muscles of the back. This exercise is performed by standing with your feet shoulder-width apart and holding a barbell behind your back with an pronated grip (palms facing back).",
  //     caloriesBurned: 28,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2023/03/Behind-The-Back-Barbell-Shrug-Reverse-Barbell-Shrug.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Cable Lateral Raises",
  //     description:
  //       "The Cable Lateral Raise is an effective exercise for targeting the lateral deltoids and improving shoulder strength and stability. It can be incorporated into your upper body or shoulder workout routine, or used as part of a full-body strength training program.\n\n" +
  //       "How to do:\n\n" +
  //       "1. Starting Position:\n" +
  //       "   • Attach a handle to the bottom of a cable machine.\n" +
  //       "   • Grasp the handle with an overhand grip, standing with your feet shoulder-width apart.\n\n" +
  //       "2. Execution:\n" +
  //       "   • Exhale and lift your arm out to the side until it reaches about 90 degrees.\n" +
  //       "   • Hold briefly at the top of the movement, then slowly return to the starting position.\n\n" +
  //       "Personal Trainer Tips:\n" +
  //       "• Maintain proper posture and form throughout the exercise. Avoid shrugging your shoulders or tilting your hips and lower back as you lift the weight.\n" +
  //       "• Engage your abdominal muscles to stabilize your pelvis and lower back.\n" +
  //       "• Keep your shoulder blades pulled down and back to maintain a strong and stable position as you perform the lift.",
  //     caloriesBurned: 23,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/07/one-arm-Cable-Lateral-Raise.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CABLE_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Barbell Rows",
  //     description:
  //       "The Barbell Bent Over Row is a compound weightlifting exercise that primarily targets the muscles of the upper back, including the lats (latissimus dorsi), rhomboids, and traps, as well as the biceps and rear deltoids. It also engages the core muscles for stability. This exercise is commonly used to build strength and muscle mass in the back and arms.\n\n" +
  //       "How to do:\n" +
  //       "Barbell Bent Over Row\n\n" +
  //       "1. Setup:\n" +
  //       "   • Stand with your feet shoulder-width apart, toes pointing forward, and the barbell in front of you on the floor.\n" +
  //       "   • You can choose to use an overhand grip (palms facing you) or an underhand grip (palms facing away) on the bar, depending on your preference and comfort.\n\n" +
  //       "2. Bend at the Hips:\n" +
  //       "   • Hinge at your hips while keeping your back straight.\n" +
  //       "   • Lower your torso until it is almost parallel to the floor.\n" +
  //       "   • Keep your knees slightly bent throughout the movement.\n\n" +
  //       "3. Grasp the Barbell:\n" +
  //       "   • Reach down and grip the barbell with your hands slightly wider than shoulder-width apart.\n" +
  //       "   • Your arms should be fully extended, and your grip should be firm.\n\n" +
  //       "4. Starting Position:\n" +
  //       "   • Your back should be flat, chest out, and shoulder blades pulled back and down. This is the starting position.\n\n" +
  //       "5. The Row:\n" +
  //       "   • Pull the barbell towards your upper abdomen or lower chest while keeping your elbows close to your body.\n" +
  //       "   • Focus on squeezing your shoulder blades together at the top of the movement to engage your back muscles fully.\n" +
  //       "   • Keep your core tight throughout the exercise.\n\n" +
  //       "6. Lower the Barbell:\n" +
  //       "   • Slowly lower the barbell back down to the starting position while maintaining control.\n" +
  //       "   • Do not allow the weight to pull you forward; instead, control the descent.\n\n" +
  //       "Tips for Proper Form:\n" +
  //       "• Avoid rounding your back during the exercise, as this can lead to injury. Keep your back straight and engage your core for stability.\n" +
  //       "• Keep your head in a neutral position, looking slightly forward, to maintain proper spinal alignment.\n" +
  //       "• Do not use momentum to lift the weight; focus on using your back and arm muscles to perform the rowing movement.\n" +
  //       "• You can use a weightlifting belt for extra support if needed, especially when lifting heavy loads.",
  //     caloriesBurned: 30,
  //     duration: 4.2,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.BACK,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif",
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/05/bent-over-form.gif",
  //     ],
  //     equipment: [ExerciseEquipment.BARBELL],
  //     category: ExerciseCategory.STRENGTH,
  //   },

  //   {
  //     name: "Single-Leg Squats",
  //     description:
  //       "The Curtsy Lunge is a variation of the traditional lunge exercise that targets the muscles of the lower body, particularly the quadriceps, glutes, and adductors, while also engaging the core for stability. It involves stepping one leg behind the body at an angle, similar to performing a curtsy, hence the name.\n\n" +
  //       "The Curtsy Lunge is an effective exercise for targeting multiple muscles in the lower body and can help improve strength, stability, and mobility. It’s commonly incorporated into lower body workouts or as part of a dynamic warm-up routine.\n\n" +
  //       "How to Perform a Curtsy Lunge:\n\n" +
  //       "1. Position:\n" +
  //       "   • Stand with your feet spaced hip-width apart.\n" +
  //       "   • Keep your hands in front of your chest to help maintain balance.\n\n" +
  //       "2. Step:\n" +
  //       "   • Take a step diagonally behind you with your left foot, crossing it behind your right leg as if you were curtsying.\n\n" +
  //       "3. Lunge:\n" +
  //       "   • Bend both knees, lowering your body until your right thigh is parallel to the floor, and your left knee nearly touches the floor.\n\n" +
  //       "4. Return:\n" +
  //       "   • Push through your right heel to drive yourself back up to the starting position.\n" +
  //       "   • Keep your torso upright and your chest lifted throughout the movement.\n\n" +
  //       "5. Alternate:\n" +
  //       "   • Continue alternating sides for the desired number of repetitions.",
  //     caloriesBurned: 34,
  //     duration: 4.2,
  //     repetitions: 10,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2023/09/curtsy-lunge.gif",
  //     ],
  //     equipment: [ExerciseEquipment.NONE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Arnold Press",
  //     description:
  //       "The Arnold Press is a popular strength training exercise developed by Arnold Schwarzenegger in the 1970s. This exercise is a variation of the traditional shoulder press and involves a rotational movement that targets multiple muscles in the shoulders, triceps, and upper back. Here’s a comprehensive guide to the Arnold Press, including its benefits, technique, and variations.\n\n" +
  //       "How to do Arnold Press:\n\n" +
  //       "1. Equipment:\n" +
  //       "   • Use a bench with back support and two dumbbells of an appropriate weight for your fitness level.\n\n" +
  //       "2. Starting Position:\n" +
  //       "   • Sit on the bench with a straight back.\n" +
  //       "   • Hold a dumbbell in each hand at chest height.\n" +
  //       "   • Palms should face your body, and dumbbells should be at shoulder level.\n\n" +
  //       "3. Form:\n" +
  //       "   • Ensure your palms are facing your body and elbows are bent, arms close to your torso.\n" +
  //       "   • Inhale and raise the dumbbells while rotating your hands so that the palms face outwards.\n" +
  //       "   • Exhale slowly and continue raising the dumbbells until your arms are fully extended above you with elbows locked.\n" +
  //       "   • Pause for a count of two at the top of the movement.\n" +
  //       "   • Lower the dumbbells slowly and in a controlled manner with your palms facing your body, returning to the starting position.\n" +
  //       "   • Repeat the movement for the desired number of repetitions.\n\n" +
  //       "Tips:\n" +
  //       "• Use proper technique to avoid injury and maximize results.\n" +
  //       "• Start with a lighter weight and gradually increase as strength improves.\n" +
  //       "• Focus on a full 180-degree rotation with both hands and arms during the movement.",
  //     caloriesBurned: 28,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Dumbbell Goblet Squat",
  //     description:
  //       "The goblet squat is a lower body exercise that targets your quadriceps, glutes, and hamstrings. It is similar to the barbell squat or dumbbell front squat, but with the weight held in front of your torso. This slight forward lean during the exercise helps mimic natural movement patterns, making it beneficial for everyday activities and improving overall functional fitness.\n\n" +
  //       "How to do a Dumbbell Goblet Squat:\n\n" +
  //       "1. Starting Position:\n" +
  //       "   • Stand with your feet shoulder-width apart.\n" +
  //       "   • Hold a dumbbell vertically in front of your chest, gripping the top of the weight with both hands.\n\n" +
  //       "2. Execution:\n" +
  //       "   • Brace your core and keep your back straight.\n" +
  //       "   • Push your hips back and bend your knees as if you’re sitting down in a chair.\n" +
  //       "   • Lower yourself until your thighs are parallel to the floor or as low as comfortably possible.\n" +
  //       "   • Pause for a second at the bottom, then push through your heels to return to the starting position.\n\n" +
  //       "3. Repetition:\n" +
  //       "   • Perform the desired number of repetitions, maintaining proper form and control throughout the movement.\n\n" +
  //       "Tips:\n" +
  //       "• Avoid rounding your back or letting your knees cave inward.\n" +
  //       "• Keep your weight evenly distributed on your feet.\n" +
  //       "• Start with a lighter weight to master the technique before increasing the load.\n" +
  //       "• If you experience any pain or discomfort, stop the exercise and reassess your form.",
  //     caloriesBurned: 37,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2023/01/Dumbbell-Goblet-Squat.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Bent Over Kickback",
  //     description:
  //       "How to do Bent Over Triceps Kickback:\n\n" +
  //       "1. Starting Position:\n" +
  //       "   • Begin by holding 2 dumbbells in your hands.\n" +
  //       "   • Keep a slight bend in your knees.\n" +
  //       "   • Hinge forward from your waist, maintaining a flat back.\n\n" +
  //       "2. Form:\n" +
  //       "   • Pull back your upper arm so that it is parallel to your body.\n" +
  //       "   • While keeping your upper arm next to your body, exhale and straighten your elbow.\n" +
  //       "   • Hold for a brief second and then slowly lower the dumbbells back to the starting position.\n\n" +
  //       "3. Tips:\n" +
  //       "• Strengthen the postural and lower back muscles by maintaining good form throughout the exercise.\n" +
  //       "• Be mindful of your lower back position. Avoid rounding your lower back too far forward.\n" +
  //       "• Use your lower back muscles to keep your spine and pelvis in a neutral position.\n" +
  //       "• If your hamstrings are tight, it may be difficult to maintain the correct position. Bend your knees a little more and stretch your hamstrings to relieve stiffness.\n" +
  //       "• Keep your upper arm at your side throughout the entire exercise to maximize effectiveness.",
  //     caloriesBurned: 28,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ARMS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Triceps-Kickback.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Dumbbell Deadlifts",
  //     description:
  //       "The Dumbbell Deadlift is a compound exercise that targets the lower back, glutes, hamstrings, and quadriceps. It is similar to the barbell deadlift but utilizes dumbbells, making it suitable for athletes, powerlifters, and individuals aiming to enhance overall fitness.\n\n" +
  //       "How to do Dumbbell Deadlift:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Stand with your feet hip-width apart.\n" +
  //       "   • Place a dumbbell on each side of your feet.\n" +
  //       "   • Ensure the dumbbells are parallel to your feet with the handles perpendicular to your body.\n\n" +
  //       "2. Stance:\n" +
  //       "   • Bend at your hips and knees to lower yourself down.\n" +
  //       "   • Keep your back straight, chest up, and shoulders back.\n" +
  //       "   • Grip the dumbbells firmly with your palms facing your body. Your hands should be just outside your knees.\n\n" +
  //       "3. Lift:\n" +
  //       "   • Push through your heels and lift the dumbbells by straightening your hips and knees.\n" +
  //       "   • Maintain a neutral spine throughout the movement and avoid rounding your back.\n" +
  //       "   • Keep the dumbbells close to your body as you lift them.\n" +
  //       "   • Stand fully upright with your chest out and shoulders back.\n\n" +
  //       "4. Lower:\n" +
  //       "   • Reverse the movement by pushing your hips back first, then bending your knees to lower the dumbbells back to the ground.\n" +
  //       "   • Keep the dumbbells close to your body and maintain good form.\n\n" +
  //       "5. Repetition:\n" +
  //       "   • Repeat the lift for the desired number of repetitions.\n" +
  //       "   • Exhale as you lift the dumbbells and inhale as you lower them.\n\n" +
  //       "Tips:\n" +
  //       "• Start with a light weight to practice proper form and gradually increase the weight as you become more comfortable and stronger.\n" +
  //       "• Engage your core muscles to stabilize your spine throughout the exercise.\n" +
  //       "• Keep your head in a neutral position, looking forward or slightly upward.\n" +
  //       "• Avoid jerky or fast movements; focus on controlled and smooth lifting and lowering.\n" +
  //       "• If you have pre-existing back or lower-body issues, consult a fitness professional or medical expert before attempting this exercise.",
  //     caloriesBurned: 33,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.LEGS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-deadlifts.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Bicycle Crunches",
  //     description:
  //       "The Bicycle Crunch is a dynamic abdominal exercise that effectively targets the core muscles, including the obliques and rectus abdominis. By combining upper and lower body movements, it provides a comprehensive core workout.\n\n" +
  //       "How to do Bicycle Crunch:\n\n" +
  //       "1. Starting Position:\n" +
  //       "   • Lie flat on your back on a mat or comfortable surface.\n" +
  //       "   • Place your hands behind your head with elbows pointing outward.\n" +
  //       "   • Lift your legs off the ground, bending your knees at a 90-degree angle. This is your starting position.\n\n" +
  //       "2. Execution:\n" +
  //       "   • Lift your head, shoulders, and feet off the ground, engaging your core muscles.\n" +
  //       "   • Bring your right elbow and left knee toward each other in a twisting motion.\n" +
  //       "   • Simultaneously, straighten your right leg while keeping it elevated above the ground.\n" +
  //       "   • Alternate by bringing your left elbow toward your right knee while straightening your left leg.\n" +
  //       "   • Continue this pedaling motion, engaging your core and avoiding pulling on your neck with your hands.\n\n" +
  //       "3. Breathing:\n" +
  //       "   • Exhale as you twist and bring your elbow to the opposite knee.\n" +
  //       "   • Inhale as you switch to the other side.\n\n" +
  //       "4. Repeat:\n" +
  //       "   • Continue the pedaling motion for the desired number of repetitions or duration.\n\n" +
  //       "5. Tips:\n" +
  //       "• Focus on controlled and deliberate movements to effectively engage the abdominal muscles.\n" +
  //       "• Keep your lower back pressed into the floor to maintain proper form.\n" +
  //       "• Emphasize the twisting motion, engaging both the upper and lower body.\n" +
  //       "• Avoid pulling on your neck with your hands; instead, use your core to lift your upper body.",
  //     caloriesBurned: 44,
  //     duration: 5.5,
  //     repetitions: 15,
  //     sets: 3,
  //     bodyPart: BodyPart.ABS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bicycle-Crunch.gif",
  //     ],
  //     equipment: [ExerciseEquipment.NONE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Cable Ab Crunch",
  //     description:
  //       "The Standing Cable Crunch is an effective exercise that targets the abdominal muscles, particularly the rectus abdominis. It involves using a cable machine to provide resistance throughout the movement.\n\n" +
  //       "How to do Standing Cable Crunch:\n\n" +
  //       "1. Setup:\n" +
  //       "   • Set the cable machine to a high position and attach a rope or handle to the cable.\n" +
  //       "   • Stand with your back to the machine, feet shoulder-width apart.\n" +
  //       "   • Grab the rope or handle with both hands, placing your hands near your ears or temples.\n" +
  //       "   • Take a step or two away from the machine to create tension in the cable.\n\n" +
  //       "2. Position:\n" +
  //       "   • Ensure your elbows are pointing out to the sides and your upper body is upright.\n\n" +
  //       "3. Execution:\n" +
  //       "   • Initiate the movement by bending at the waist and bringing your elbows and head downwards towards your knees.\n" +
  //       "   • Focus on contracting your abdominal muscles and exhale as you crunch down.\n" +
  //       "   • Hold the crunch position briefly, squeezing your abs.\n\n" +
  //       "4. Return:\n" +
  //       "   • Slowly return to the starting position by extending your torso back up, allowing your arms to fully extend.\n\n" +
  //       "5. Repeat:\n" +
  //       "   • Perform the exercise for the desired number of repetitions.\n\n" +
  //       "Tips:\n" +
  //       "• Maintain proper form and engage your core muscles throughout the movement.\n" +
  //       "• Start with a weight or resistance level that suits your fitness level and gradually increase as you become stronger.\n" +
  //       "• Avoid using momentum; focus on controlled movements to effectively target your abs.",
  //     caloriesBurned: 28,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.ABS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2021/09/Standing-Cable-Crunch.gif",
  //     ],
  //     equipment: [ExerciseEquipment.CABLE_MACHINE],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  //   {
  //     name: "Standing Shoulder Press",
  //     description:
  //       "The Standing Dumbbell Shoulder Press, also known as the Dumbbell Overhead Press, is a strength training exercise that targets the deltoid muscles of the shoulders. This compound exercise also engages the triceps and upper chest, making it an effective movement for overall upper body strength.\n\n" +
  //       "How to do Standing Dumbbell Shoulder Press:\n\n" +
  //       "1. Starting Position:\n" +
  //       "   • Stand with your feet shoulder-width apart.\n" +
  //       "   • Hold a dumbbell in each hand at shoulder height. Your palms should be facing forward and elbows bent at 90 degrees. You can start with the dumbbells resting on your shoulders or at shoulder height.\n\n" +
  //       "2. Execution:\n" +
  //       "   • Exhale and press the dumbbells upward, extending your arms fully without locking your elbows at the top.\n" +
  //       "   • Keep your head straight and your back in a neutral position. Avoid excessive arching.\n" +
  //       "   • Your wrists should stay aligned with your forearms throughout the movement.\n" +
  //       "   • At the top of the movement, your arms should be fully extended overhead.\n\n" +
  //       "3. Lowering:\n" +
  //       "   • Inhale and slowly lower the dumbbells back to shoulder height in a controlled manner.\n\n" +
  //       "4. Personal Trainer Tips:\n" +
  //       "   • Choose a weight that is challenging but allows you to maintain proper form.\n" +
  //       "   • Engage your core to support your back and stabilize your body.\n" +
  //       "   • Avoid arching your back or using momentum to lift the dumbbells.\n" +
  //       "   • Maintain a controlled tempo throughout the exercise.\n   • Warm up your shoulders with light stretching before starting.\n",
  //     caloriesBurned: 28,
  //     duration: 4.6,
  //     repetitions: 12,
  //     sets: 3,
  //     bodyPart: BodyPart.SHOULDERS,
  //     images: [
  //       "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
  //     ],
  //     equipment: [ExerciseEquipment.DUMBBELLS],
  //     category: ExerciseCategory.STRENGTH,
  //   },
  // ];

  // for (const item of exercises) {
  //   await db.exercise.create({
  //     data: {
  //       ...item,
  //       duration: Math.ceil(item.duration),
  //     },
  //   });
  // }
  // for (const item of foodIngredients) {
  //   await db.food.create({
  //     data: {
  //       ...item,
  //     },
  //   });
  // }

  // for (const plan of workoutPlans) {
  //   await db.workoutPlan.create({
  //     data: {
  //       ...plan,
  //     },
  //   });
  // }

  // for (const meal of highProteinDietPlan) {
  //   await db.meal.create({
  //     data: {
  //       ...meal,
  //       foods: {
  //         connect: meal.foods.map((food) => ({ id: food })),
  //       },
  //     },
  //   });
  // }

  // const challenges = [
  //   {
  //     name: "50 km Sprint Challenge",
  //     description:
  //       "Complete a cumulative sprint distance of 50 km within the given time frame.",
  //     startDate: randomStartDate(2, 7),
  //     duration: 10, // 10 days
  //     expiryDate: function () {
  //       return new Date(
  //         this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000
  //       );
  //     },
  //   },
  //   {
  //     name: "Step to the Moon Challenge",
  //     description:
  //       "Take a massive number of steps equivalent to the distance to the moon over the given period.",
  //     startDate: randomStartDate(2, 7),
  //     duration: 30, // 30 days
  //     expiryDate: function () {
  //       return new Date(
  //         this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000
  //       );
  //     },
  //   },
  //   {
  //     name: "Hydration Mastery: 100 Liters in 10 Days",
  //     description:
  //       "Drink 100 liters of water over the course of 10 days to achieve ultimate hydration.",
  //     startDate: randomStartDate(2, 7),
  //     duration: 10, // 10 days
  //     expiryDate: function () {
  //       return new Date(
  //         this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000
  //       );
  //     },
  //   },
  //   {
  //     name: "Sleep 8 Hours for a Week",
  //     description:
  //       "Ensure you sleep at least 8 hours each night for 7 consecutive days.",
  //     startDate: randomStartDate(2, 7),
  //     duration: 7, // 7 days
  //     expiryDate: function () {
  //       return new Date(
  //         this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000
  //       );
  //     },
  //   },
  //   {
  //     name: "Mindfulness Marathon: 20 Hours of Meditation",
  //     description: "Accumulate 20 hours of meditation over a 14-day period.",
  //     startDate: randomStartDate(2, 7),
  //     duration: 14, // 14 days
  //     expiryDate: function () {
  //       return new Date(
  //         this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000
  //       );
  //     },
  //   },
  // ];

  // function randomStartDate(minDays: number, maxDays: number): Date {
  //   const randomDays =
  //     Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  //   return new Date(Date.now() + randomDays * 24 * 60 * 60 * 1000);
  // }

  // for (const challenge of challenges) {
  //   await db.challenge.create({
  //     data: {
  //       ...challenge,
  //       expiryDate: challenge.expiryDate(),
  //     },
  //   });
  // }

  const events = [
    {
      name: "Nutrition Seminar",
      date: "2024-10-01",
    },
    {
      name: "Healthy Eating Workshop",
      date: "2024-10-10",
    },
    {
      name: "Fitness Expo",
      date: "2024-11-05",
    },
    {
      name: "Mental Wellness Webinar",
      date: "2024-11-15",
    },
    {
      name: "Hydration Awareness Day",
      date: "2024-12-02",
    },
    {
      name: "Sleep Optimization Conference",
      date: "2024-12-15",
    },
    {
      name: "Outdoor Yoga Retreat",
      date: "2025-01-10",
    },
    {
      name: "Mindfulness Meditation Session",
      date: "2025-01-20",
    },
    {
      name: "Cardio Challenge Bootcamp",
      date: "2025-02-05",
    },
    {
      name: "Strength Training Masterclass",
      date: "2025-02-25",
    },
  ];

  for (const event of events) {
    await db.event.create({
      data: {
        name: event.name,
        date: new Date(event.date), // Convert to Date object
      },
    });
  }
}
main();
