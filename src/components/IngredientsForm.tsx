import {
  faFilterCircleXmark,
  faFilter,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IngredientCount, IngredientData } from "../App";

interface IngredientsFormProps {
  ingredient: IngredientData;
  availableIngredients: IngredientCount[];
  setAvailableIngredients: React.Dispatch<
    React.SetStateAction<IngredientCount[]>
  >;
  excludedIngredients: string[];
  setExcludedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const IngredientsForm = ({
  ingredient,
  availableIngredients,
  setAvailableIngredients,
  excludedIngredients,
  setExcludedIngredients,
}: IngredientsFormProps) => {
  const handleAddIngredient = (ingredient: string) => {
    setAvailableIngredients((prevState) => {
      const clone = [...prevState];
      if (prevState.find((i) => i.name === ingredient)) {
        const index = prevState.map((i) => i.name).indexOf(ingredient);
        clone[index] = {
          name: ingredient,
          amount: clone[index].amount + 1,
        };
        return clone;
      } else {
        return [...prevState, { name: ingredient, amount: 1 }];
      }
    });
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setAvailableIngredients((prevState) => {
      const clone = [...prevState];
      if (prevState.find((i) => i.name === ingredient)) {
        const index = prevState.map((i) => i.name).indexOf(ingredient);
        if (clone[index].amount > 1) {
          clone[index] = {
            name: ingredient,
            amount: clone[index].amount - 1,
          };
          return clone;
        } else {
          clone.splice(index, 1);
          return clone;
        }
      } else {
        return prevState;
      }
    });
  };

  const handleInputIngredient = (
    ingredient: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAvailableIngredients((prevState) => {
      const clone = [...prevState];

      if ((+e.target.value).toString() === "NaN") {
        return prevState;
      } else if (+e.target.value === 0) {
        const index = prevState.map((i) => i.name).indexOf(ingredient);
        clone.splice(index, 1);
        return clone;
      } else if (
        prevState.find((i) => i.name === ingredient) &&
        typeof prevState.find((i) => i.name === ingredient)?.amount === "number"
      ) {
        const index = prevState.map((i) => i.name).indexOf(ingredient);
        clone[index] = {
          name: ingredient,
          amount: +e.target.value,
        };
        return clone;
      } else {
        return [
          ...prevState,
          {
            name: ingredient,
            amount: +e.target.value,
          },
        ];
      }
    });
  };

  const handleToggleFilter = (ingredient: string) => {
    setExcludedIngredients((prevState) => {
      const isExcluded = prevState.indexOf(ingredient);
      if (isExcluded !== -1) {
        const array = [...prevState];
        array.splice(isExcluded, 1);
        return array;
      } else {
        return [...prevState, ingredient];
      }
    });
  };
  return (
    <div className="shadow-md rounded-lg">
      <div
        className={
          (excludedIngredients.indexOf(ingredient.name) === -1
            ? ""
            : "pointer-events-none opacity-50") +
          " bg-white rounded-t-lg text-center flex flex-col px-2 transition-all"
        }
      >
        <img src={ingredient.img} alt={ingredient.name} className="m-auto" />
        <input
          type="text"
          className="border-2 w-20 rounded-lg px-2 text-center mb-3 mx-auto"
          onChange={(e) => handleInputIngredient(ingredient.name, e)}
          value={
            availableIngredients.find((i) => i.name === ingredient.name)
              ? availableIngredients.find((i) => i.name === ingredient.name)
                  ?.amount
              : ""
          }
          min={1}
        />
        <div className="flex justify-around  mb-2 ">
          <button
            onClick={() => handleAddIngredient(ingredient.name)}
            className="hover:text-sky-700 text-sky-900 transition-colors"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
          <button
            onClick={() => handleRemoveIngredient(ingredient.name)}
            className="hover:text-sky-700 text-sky-900 transition-colors"
          >
            <FontAwesomeIcon icon={faCircleMinus} />
          </button>
        </div>
      </div>
      <button
        className="bg-white rounded-b-lg text-center px-2 text-sky-900 w-full py-2 flex items-center justify-center gap-2 hover:bg-sky-700 hover:text-white border-t-2 border-dashed border-black border-opacity-30 transition-all [&>span]:hover:max-w-20 [&>span]:hover:opacity-100 [&>span]:max-w-0 [&>span]:opacity-0 hover:border-transparent duration-300"
        onClick={() => handleToggleFilter(ingredient.name)}
      >
        {excludedIngredients.indexOf(ingredient.name) === -1 ? (
          <>
            <FontAwesomeIcon icon={faFilterCircleXmark} />{" "}
            <span className="overflow-hidden transition-all">Exclude</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faFilter} />{" "}
            <span className="overflow-hidden transition-all">Include</span>
          </>
        )}
      </button>
    </div>
  );
};

export default IngredientsForm;
