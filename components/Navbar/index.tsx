import { useAppContext } from "../Context/AppContext";
import { BsSun, BsMoonStars } from "react-icons/bs";
type Props = {};
const Navbar = ({}: Props) => {
  const mycontext = useAppContext();
  const theme = mycontext?.theme;
  console.log("theme", theme);
  return (
    <div className="Center pt-[2rem]">
      <div className="flex items-center w-full h-[65px] rounded-full border-2 px-5 dark:border-[#8935ff] border-slate-700">
        <div className="Center h-full">
          <img
            className="w-[150px] invert dark:invert-0"
            src="https://learnweb3.io/brand/logo-white.png"
            alt="brand"
          />
        </div>
        <div className="flex-grow text-center">
          <h3 className="NoPad underline decoration-wavy underline-offset-8 decoration-[#8935ff]">
            NFT Collection
          </h3>
        </div>
        <div className="flex gap-2">
          <div className="Center border-2  rounded-full px-4 dark:hover:bg-[#9b53ff42] hover:bg-[#8935ff] dark:text-white hover:text-white transition-colors duration-200 cursor-pointer dark:border-[#8935ff] border-[#ab6fff]">
            <h4 className="NoPad font-thin text-inherit">Connect wallet</h4>
          </div>
          <div
            onClick={mycontext?.setDarkHandler}
            className="Center border-2 dark:border-[#8935ff] hover:text-white  hover:bg-[#8935ff] rounded-full w-9 h-9 dark:text-white dark:hover:bg-[#9b53ff42] transition-colors duration-200 cursor-pointer border-[#ab6fff]"
          >
            {theme == "dark" ? <BsSun /> : <BsMoonStars />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
