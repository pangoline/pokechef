import { IngredientCount, IngredientData, Recipe } from "../App";
import IngredientsNeeded from "./IngredientsNeeded";

interface RecipeCardProps {
  recipe: Recipe;
  ingredientData: IngredientData[];
  availableIngredients: IngredientCount[];
}

const RecipeCard = ({
  recipe,
  ingredientData,
  availableIngredients,
}: RecipeCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg flex-col flex relative shadow-lg">
      <div className="flex justify-between">
        {recipe.minPotSize && (
          <div className="text-center text-sky-600 border border-sky-600 px-2 bg-white  text-3xl font-semibold rounded-full w-10 flex items-center justify-center">
            {recipe.minPotSize}
          </div>
        )}
        <div className=" text-center text-amber-600   border border-amber-600 rounded px-2 bg-white  text-3xl font-semibold">
          {recipe.baseStrength ? recipe.baseStrength : 0}
        </div>
      </div>
      <img src={recipe.img} className="mx-auto" alt={recipe.name} />
      <div className="text-center text-3xl bg-sky-700 text-white px-4 -mx-4 my-2">
        {recipe.name}
      </div>

      <div className="flex flex-wrap justify-center mb-3">
        {recipe.ingredients.map((i) => (
          <div
            className="flex items-center pl-2 rounded-lg"
            key={i.name.toString()}
          >
            {i.amount + "x "}
            <img
              src={
                ingredientData.find((id) => id.name === i.name)
                  ? ingredientData.find((id) => id.name === i.name)!.img
                  : ""
              }
              alt={i.name}
            />
          </div>
        ))}
      </div>

      <hr className="w-[calc(100%+ + 2rem)] border border-dashed border-black opacity-30 mb-4 -mx-4" />

      <IngredientsNeeded
        ingredients={recipe.ingredients ? recipe.ingredients : []}
        bag={availableIngredients}
        db={ingredientData}
      />
    </div>
  );
};

export default RecipeCard;
