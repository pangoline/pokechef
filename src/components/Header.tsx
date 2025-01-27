import { faInfoCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface HeaderProps {
  showInfo: boolean;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ showInfo, setShowInfo }: HeaderProps) => {
  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center z-10">
      <img src="/pokechef/logo.png" className="max-h-10" />
      <div className="md:block hidden">
        What's in my <span className="line-through">pantry</span> bag?
      </div>
      <button
        className="text-sky-900 hover:text-sky-700 flex items-center"
        onClick={() => setShowInfo((prev) => !prev)}
      >
        <FontAwesomeIcon icon={showInfo ? faXmarkCircle : faInfoCircle} />
      </button>
    </header>
  );
};

export default Header;
