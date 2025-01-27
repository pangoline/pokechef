import {
  faCircleInfo,
  faCircleMinus,
  faCirclePlus,
  faFilterCircleXmark,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps {
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setShowInfo }: ModalProps) => {
  return (
    <>
      <div
        className="fixed bg-black top-0 left-0 opacity-50 w-full h-full"
        onClick={() => setShowInfo(false)}
      ></div>
      <div className="container absolute top-0 z-10 pr-8">
        <div className="bg-white rounded-lg z-10 p-8 w-fit m-auto">
          <h1 className="text-4xl mb-4 flex gap-4 items-center text-sky-800">
            <FontAwesomeIcon icon={faCircleInfo} /> How to use this tool
          </h1>
          <ol className="list-decimal pl-12">
            <li>
              Input each ingredient into the input area. You can type numbers or
              use the{" "}
              <FontAwesomeIcon icon={faCirclePlus} className="text-xl" />{" "}
              <FontAwesomeIcon icon={faCircleMinus} className="text-xl" /> icons
              to add and remove ingredients{" "}
            </li>
            <li>
              (Optional) Exclude any ingredients you don't have producers for
              using the{" "}
              <FontAwesomeIcon icon={faFilterCircleXmark} className="text-xl" />{" "}
              button
            </li>
            <li>Select which type of meals Snorlax is requesting this week</li>
            <li>(Optional) Set a max pot size</li>
            <li>
              The page will display you a 'shopping list' per recipe based on
              your data and filters
            </li>
            <li>
              (Optional) Toggle the 'Show ingredient spread' button to see
              combined totals of all ingredients based on your filters
            </li>
            <li>
              All your settings will be saved in local storage. Click the{" "}
              <FontAwesomeIcon icon={faRotateRight} className="text-xl" /> icon
              on the bottom right of the page to clear this data to start fresh.
            </li>
          </ol>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowInfo(false)}
              className="text-3xl text-sky-800 border-2 border-sky-800 px-4 rounded-lg hover:text-white hover:bg-sky-800 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
