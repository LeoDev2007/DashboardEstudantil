import { useColorMode } from "../components/ui/color-mode";
import { CiSun } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button style={{cursor: 'pointer'}} onClick={toggleColorMode}>
      {colorMode === "dark" ? <CiSun color="#fff" size={20} /> : <FaRegMoon color="#fff" size={20} />}
    </button>
  );
};

export default ToggleTheme;