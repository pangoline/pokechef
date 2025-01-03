import { useEffect, useState } from "react";
import { ingredientData, recipeData } from "./data/Data";
import RecipeCard from "./components/RecipeCard";
import IngredientsForm from "./components/IngredientsForm";
import RecipeFilters from "./components/RecipeFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

export interface IngredientCount {
  name: string;
  amount: number;
}

export interface IngredientData {
  name: string;
  img: string;
}

export interface Recipe {
  name: string;
  img: string;
  minPotSize: null | number;
  baseStrength: null | number;
  ingredients: IngredientCount[];
  type: RecipeType;
}

export type RecipeType = "Curries/Stews" | "Salads" | "Desserts/Drinks";

function App() {
  const [availableIngredients, setAvailableIngredients] = useState<
    IngredientCount[]
  >([]);
  const [recipeType, setRecipeType] = useState<RecipeType>("Curries/Stews");
  const [maxPotSize, setMaxPotSize] = useState<number>(0);
  const [maxPotOn, setMaxPotOn] = useState<boolean>(false);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const minPotSizeForGroup =
    recipeData
      .filter((r) => r.type === recipeType && r.minPotSize)
      .map((r) => r.minPotSize)
      .sort((a, b) => a! - b!)[0] ?? 0;

  useEffect(() => {
    const local = localStorage.getItem("pokeChefData");

    if (local) {
      const localObj = JSON.parse(local);
      if (
        localObj.recipeType &&
        (localObj.recipeType === "Salads" ||
          localObj.recipeType === "Desserts/Drinks")
      ) {
        setRecipeType(localObj.recipeType);
      }

      if (
        localObj.maxPotSize &&
        typeof localObj.maxPotSize === "number" &&
        localObj.maxPotSize > 0
      ) {
        setMaxPotOn(true);
        setMaxPotSize(localObj.maxPotSize);
      }

      if (
        localObj.excludedIngredients &&
        localObj.excludedIngredients.length > 0
      ) {
        setExcludedIngredients(localObj.excludedIngredients);
      }

      if (
        localObj.availableIngredients &&
        localObj.availableIngredients.length > 0
      ) {
        setAvailableIngredients(localObj.availableIngredients);
      }
    } else {
      localStorage.setItem(
        "pokeChefData",
        JSON.stringify({
          recipeType: "Curries/Stews",
          maxPotSize: 0,
          excludedIngredients: [],
          availableIngredients: [],
        })
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pokeChefData",
      JSON.stringify({
        recipeType: recipeType,
        maxPotSize: maxPotSize,
        excludedIngredients: excludedIngredients,
        availableIngredients: availableIngredients,
      })
    );
  }, [recipeType, maxPotSize, excludedIngredients, availableIngredients]);

  const resetHandler = () => {
    setRecipeType("Curries/Stews");
    setMaxPotSize(0);
    setExcludedIngredients([]);
    setAvailableIngredients([]);
  };

  const filteredRecipeData = recipeData
    .filter((r) => r.type === recipeType && r.baseStrength && r.minPotSize)
    .filter((r) =>
      !maxPotOn || maxPotSize === 0 ? r : r.minPotSize! <= maxPotSize
    )
    .filter(
      (r) =>
        excludedIngredients.filter((i) =>
          r.ingredients.map((a) => a.name).includes(i)
        ).length < 1
    )
    .sort((a, b) => {
      if (a.baseStrength && b.baseStrength) {
        return a.baseStrength - b.baseStrength;
      } else {
        return -1;
      }
    });

  let ingredientSummary: IngredientCount[] = [];

  filteredRecipeData
    .map((recipe) => recipe.ingredients)
    .filter((ingArray) => ingArray.length > 0)
    .forEach((array) => {
      array.forEach((ingredient) => {
        if (
          ingredientSummary.filter((i) => i.name === ingredient.name).length > 0
        ) {
          const index = ingredientSummary
            .map((i) => i.name)
            .indexOf(ingredient.name);
          ingredientSummary[index] = {
            name: ingredient.name,
            amount: ingredientSummary[index].amount + ingredient.amount,
          };
        } else {
          ingredientSummary.push(ingredient);
        }
      });
    });

  const ingredientSummaryTotal = ingredientSummary.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header setShowInfo={setShowInfo} showInfo={showInfo} />
      <main className="container m-auto px-4 relative lg:my-12 md:my-8 my-4">
        <div className="grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-4 grid-cols-2 flex-wrap rounded-lg gap-4 mb-8 justify-center">
          {ingredientData.map((ingredient) => (
            <IngredientsForm
              setAvailableIngredients={setAvailableIngredients}
              ingredient={ingredient}
              availableIngredients={availableIngredients}
              setExcludedIngredients={setExcludedIngredients}
              excludedIngredients={excludedIngredients}
              key={ingredient.name.toString()}
            />
          ))}
        </div>
        <div className="flex lg:flex-row flex-col md:justify-between items-center gap-4 mb-6 bg-white rounded-lg px-4 py-2 shadow-md">
          <RecipeFilters
            recipeType={recipeType}
            setRecipeType={setRecipeType}
            maxPotOn={maxPotOn}
            setMaxPotOn={setMaxPotOn}
            maxPotSize={maxPotSize}
            setMaxPotSize={setMaxPotSize}
            minPotSizeForGroup={minPotSizeForGroup}
            showStats={showStats}
            setShowStats={setShowStats}
          />
        </div>

        <div
          className={
            (showStats
              ? "mb-6 max-h-full"
              : "max-h-0 overflow-hidden opacity-0") +
            " grid xl:grid-cols-12 lg:grid-cols-8 md:grid-cols-4 grid-cols-2 flex-wrap rounded-lg gap-4 justify-center transition-all duration-300"
          }
        >
          {ingredientSummary
            .sort((a, b) => b.amount - a.amount)
            .map((ingredient) => (
              <div
                className="bg-white rounded-lg flex flex-col items-center pb-2 shadow-md"
                key={ingredient.name}
              >
                <img
                  src={
                    ingredientData.find((id) => id.name === ingredient.name)
                      ? ingredientData.find(
                          (id) => id.name === ingredient.name
                        )!.img
                      : ""
                  }
                  alt={ingredient.name}
                />{" "}
                <strong className="leading-none">{ingredient.amount}</strong>
                <span className="text-sky-800">
                  (
                  {Math.round(
                    (ingredient.amount / ingredientSummaryTotal) * 100
                  )}
                  %)
                </span>
              </div>
            ))}
        </div>

        <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-4 ">
          {filteredRecipeData.map((recipe) => (
            <RecipeCard
              key={recipe.name.toString()}
              ingredientData={ingredientData}
              recipe={recipe}
              availableIngredients={availableIngredients}
            />
          ))}
        </div>
        <button
          className="fixed bottom-4 right-6 bg-white px-2 rounded-full text-red-900 hover:bg-red-900 hover:text-white border-2 border-red-900 shadow-md  overflow-hidden max-w-[50px] h-[50px] hover:max-w-[140px] transition-all duration-250"
          onClick={resetHandler}
        >
          <div className="flex items-center gap-3 w-[200px]">
            <FontAwesomeIcon icon={faRotateRight} className="mr-[2px]" /> Reset
            Data
          </div>
        </button>
        {showInfo && <Modal setShowInfo={setShowInfo} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
