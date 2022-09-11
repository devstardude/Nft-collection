import { useAppContext } from "../Context/AppContext";
import { BsSun, BsMoonStars } from "react-icons/bs";
type Props = {
  connect: () => void;
  activeClass: string;
  address: string | null;
  setActiveClass: (agr0: string) => any;
};
const Navbar = ({ connect, address, activeClass, setActiveClass }: Props) => {
  const mycontext = useAppContext();
  const theme = mycontext?.theme;
  return (
    <div className="Center flex-col pt-[2rem]">
      <div className="PurpleBorderDiv flex items-center w-full h-[65px] rounded-full px-5 ">
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
          <div
            onClick={connect}
            className="PurpleBorderButton Center rounded-full px-4  "
          >
            <h4 className="NoPad font-thin text-inherit">
              {address ? address : "Connect Wallet"}
            </h4>
          </div>
          <div
            onClick={mycontext?.setDarkHandler}
            className="PurpleBorderButton Center rounded-full w-9 h-9"
          >
            {theme == "dark" ? <BsSun /> : <BsMoonStars />}
          </div>
        </div>
      </div>
      {address && (
        <div className="pt-[2rem] flex">
          <div
            onClick={() => setActiveClass("my-nft")}
            className={`${
              activeClass === "my-nft"
                ? "PurpleActiveButton"
                : "PurpleInactiveButton"
            } rounded-l-full`}
          >
            My NFTs
          </div>
          <div
            onClick={() => setActiveClass("all-nft")}
            className={`${
              activeClass === "all-nft"
                ? "PurpleActiveButton"
                : "PurpleInactiveButton"
            } rounded-r-full`}
          >
            All NFTs
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
