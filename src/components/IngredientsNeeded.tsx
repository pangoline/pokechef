import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IngredientCount } from "../App";
import {
  faSquareMinus,
  faSquareCheck,
  faSquareXmark,
  IconDefinition,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

interface IngredientsNeededProps {
  ingredients: IngredientCount[];
  bag: IngredientCount[];
  db: { name: string; img: string }[];
}

const IngredientsNeeded = ({
  ingredients,
  bag,
  db,
}: IngredientsNeededProps) => {
  let array: {
    name: string;
    recipeAmount: number;
    bagAmount: number;
    need: number;
    emoji: IconDefinition;
    emojiColor: string;
  }[] = [];
  ingredients.forEach((a) => {
    if (bag.filter((item) => item.name === a.name).length > 0) {
      const bagAmount = bag.find((item) => item.name === a.name)!.amount;
      const difference = a.amount - bagAmount;
      array.push({
        name: a.name,
        recipeAmount: a.amount,
        bagAmount: bagAmount,
        need: difference > 0 ? difference : 0,
        emoji: difference > 0 ? faSquareMinus : faSquareCheck,
        emojiColor: difference > 0 ? "text-yellow-500" : "text-green-500",
      });
    } else {
      array.push({
        name: a.name,
        recipeAmount: a.amount,
        bagAmount: 0,
        need: a.amount,
        emoji: faSquareXmark,
        emojiColor: "text-red-500",
      });
    }
  });

  const minPotSize = array.reduce((prev, curr) => prev + curr.recipeAmount, 0);

  const totalIngredientsLeft = array.reduce(
    (prev, curr) => prev + curr.need,
    0
  );

  return (
    <div>
      {totalIngredientsLeft > 0 ? (
        totalIngredientsLeft === minPotSize ? (
          <p className="text-center text-gray-400">
            You don't have any of the necessary ingredients!
          </p>
        ) : (
          <p className="text-center">
            Need <strong>{totalIngredientsLeft}</strong> more items
          </p>
        )
      ) : minPotSize > 0 ? (
        <p className="text-center text-green-600 border-2 border-green-600 rounded-lg flex justify-center gap-2 px-4 items-center">
          <FontAwesomeIcon icon={faCheck} />
          All ingredients gathered!
        </p>
      ) : (
        ""
      )}
      <ul className="pl-2 flex flex-wrap gap-x-2">
        {totalIngredientsLeft !== minPotSize &&
          totalIngredientsLeft !== 0 &&
          array.map((ingredient) => (
            <li className="flex items-center" key={ingredient.name}>
              <FontAwesomeIcon
                icon={ingredient.emoji}
                className={ingredient.emojiColor + " mr-2"}
              />{" "}
              {ingredient.need ? ingredient.need + "x " : ""}
              <img
                src={db.find((i) => i.name === ingredient.name)?.img}
                alt={ingredient.name}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default IngredientsNeeded;
