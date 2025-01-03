import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RecipeType } from "../App";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

interface RecipeFiltersProps {
  recipeType: RecipeType;
  setRecipeType: React.Dispatch<React.SetStateAction<RecipeType>>;
  maxPotOn: boolean;
  setMaxPotOn: React.Dispatch<React.SetStateAction<boolean>>;
  maxPotSize: number;
  setMaxPotSize: React.Dispatch<React.SetStateAction<number>>;
  minPotSizeForGroup: number;
  showStats: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecipeFilters = ({
  setMaxPotSize,
  maxPotSize,
  minPotSizeForGroup,
  maxPotOn,
  recipeType,
  setRecipeType,
  showStats,
  setShowStats,
}: RecipeFiltersProps) => {
  const handlePotInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((+e.target.value).toString() === "NaN") {
      setMaxPotSize(0);
    } else {
      setMaxPotSize(+e.target.value);
    }
  };

  const statHandler = () => {
    setShowStats((prevState) => !prevState);
  };
  return (
    <>
      <button
        className="flex items-center gap-2 hover:text-sky-700 text-sky-900 lg:order-first order-last "
        onClick={statHandler}
      >
        <FontAwesomeIcon icon={showStats ? faMinus : faPlus} />{" "}
        <span className="ml-1">Show ingredient spread</span>
      </button>
      <div className="flex sm:flex-row flex-col gap-4 sm:w-fit w-full py-2">
        <button
          className={
            (recipeType !== "Curries/Stews"
              ? "bg-sky-200"
              : "bg-sky-800 text-white pointer-events-none") +
            " px-4 py-1 rounded-lg transition-all  hover:bg-sky-700 hover:text-white"
          }
          onClick={() => setRecipeType("Curries/Stews")}
        >
          Curries/Stews
        </button>
        <button
          className={
            (recipeType !== "Salads"
              ? "bg-sky-200"
              : "bg-sky-800 text-white pointer-events-none") +
            " px-4 py-1 rounded-lg  transition-all  hover:bg-sky-700 hover:text-white"
          }
          onClick={() => setRecipeType("Salads")}
        >
          Salads
        </button>
        <button
          className={
            (recipeType !== "Desserts/Drinks"
              ? "bg-sky-200"
              : "bg-sky-800 text-white pointer-events-none") +
            " px-4 py-1 rounded-lg  transition-all  hover:bg-sky-700 hover:text-white"
          }
          onClick={() => setRecipeType("Desserts/Drinks")}
        >
          Desserts/Drinks
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <label className={!maxPotOn ? "opacity-50" : ""}>Max pot size:</label>
        <input
          type="text"
          className={
            (maxPotSize !== 0 && maxPotSize < minPotSizeForGroup
              ? "text-red-700 border-red-700 "
              : "") + "rounded-lg w-24 px-4 border-2"
          }
          disabled={!maxPotOn}
          onChange={(e) => handlePotInput(e)}
          value={maxPotSize === 0 ? "" : maxPotSize}
        />
        {maxPotSize > 0 && (
          <button
            className="text-lg flex items-center text-gray-500 -ml-10 mr-3"
            onClick={() => setMaxPotSize(0)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>
    </>
  );
};

export default RecipeFilters;
