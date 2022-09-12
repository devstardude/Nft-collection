import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "@fontsource/plus-jakarta-sans";
import ShowNft from "../components/ShowNft";
import SignIn from "../components/SignIn";
import { useEffect, useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { Alchemy, Network } from "alchemy-sdk";
import { useNetworkMismatch } from "@thirdweb-dev/react";
import { fetchUserNft, fetchCollection } from "../utils/fetchApi";

const config = {
  apiKey: "FPpiQ92seWA0Lv3_Z15TP7hIBATvaVxH",
  network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(config);
const Home: NextPage = () => {
  type userNftType = {
    title: string;
    img?: string;
    address: string;
    tokenId: string;
    desc?: string;
    owner: boolean;
  }[];

  const [userNft, setUserNft] = useState<userNftType>([]);
  const [collectionNft, setCollectionNft] = useState<userNftType>([]);
  const [activeClass, setActiveClass] = useState<string>("my-nft");
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const setActiveClassHandler: (arg0: string) => void = (activeClassName) => {
    setActiveClass(activeClassName);
  };
  useEffect(() => {
    if (address) {
      const fetchNewUserNft = async () => {
        const newRes = await fetchUserNft(
          "0x4A40Eb870DcF533D4dC097c3d87aaFE9f64490A1",
          [
            "0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33",
            "0x3CD266509D127d0Eac42f4474F57D0526804b44e",
          ]
        );
        setUserNft(newRes);
      };
      fetchNewUserNft();

      // Collection
      const fetchCollectionNft = async () => {
        const addresses: string[] = [
          "0x1ed25648382c2e6da067313e5dacb4f138bc8b33",
          "0x3cd266509d127d0eac42f4474f57d0526804b44e",
        ];
        const newRes = await fetchCollection(addresses);
        setCollectionNft(newRes);
      };
      fetchCollectionNft();
    }
    if (!address) {
      setUserNft([]);
    }
  }, [address]);
  return (
    <div className="min-h-screen min-w-full dark:bg-[#1C1127] bg-slate-50 prose dark:prose-invert transition-colors duration-150">
      <div className="px-[10%]">
        <div>
          {isMismatched && (
            <p className="pt-2 m-0 text-red-500 text-center">
              Please connect to Polygon Mainnet
            </p>
          )}
        </div>
        <Navbar
          setActiveClass={setActiveClassHandler}
          activeClass={activeClass}
          address={address ? truncateEthAddress(address) : null}
          connect={connectWithMetamask}
        />
        {address && !isMismatched ? (
          <ShowNft
            userNft={activeClass === "my-nft" ? userNft : collectionNft}
          />
        ) : (
          <SignIn connect={connectWithMetamask} />
        )}
      </div>
    </div>
  );
};

export default Home;
