import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "@fontsource/plus-jakarta-sans";
import ShowNft from "../components/ShowNft";
import SignIn from "../components/SignIn";
import { useEffect, useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNetworkMismatch } from "@thirdweb-dev/react";
import { fetchUserNft, fetchCollection } from "../utils/fetchApi";

const Home: NextPage = () => {
  type userNftType = {
    title: string;
    img?: string;
    address: string;
    tokenId: string;
    desc?: string;
    owner: boolean;
  }[];
  type pageKeyType = {
    address: string;
    pageKey: string | undefined;
  }[];
  const fakeUserAddress = "0x4A40Eb870DcF533D4dC097c3d87aaFE9f64490A1";
  const [userNft, setUserNft] = useState<userNftType>([]);
  const [collectionNft, setCollectionNft] = useState<userNftType>([]);
  const [userPageKey, setUserPageKey] = useState<pageKeyType>([]);
  const [collectionPageKey, setCollectionPageKey] = useState<pageKeyType>([]);
  const [activeClass, setActiveClass] = useState<string>("my-nft");
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const setActiveClassHandler: (arg0: string) => void = (activeClassName) => {
    setActiveClass(activeClassName);
  };
  const showMoreNftHandler = (
    contractAddress: string,
    key: string | undefined
  ) => {
    if (activeClass === "my-nft" && address) {
      const fetchNewUserNft = async () => {
        const newRes = await fetchUserNft(
          address,
          [contractAddress],
          key
        );
        setUserNft((prev) => [...prev, ...newRes.nftCollection]);
        setUserPageKey((prev) => {
          const objIndex = prev.findIndex(
            (obj) => obj.address == contractAddress
          );
          const newPageKeyArray = [...prev];
          newPageKeyArray[objIndex].pageKey = newRes.pageKey[0].pageKey;
          return newPageKeyArray;
        });
      };
      fetchNewUserNft();
    } else {
      const fetchCollectionNft = async () => {
        const lowcaseAddress =
          "0x" + contractAddress.substring(2).toLowerCase();
        const addresses: string[] = [lowcaseAddress];
        const newRes = await fetchCollection(addresses, key);
        setCollectionNft((prev) => [...prev, ...newRes.nftCollection]);
        setCollectionPageKey((prev) => {
          const objIndex = prev.findIndex(
            (obj) =>
              obj.address == contractAddress || obj.address == lowcaseAddress
          );
          const newPageKeyArray = [...prev];
          newPageKeyArray[objIndex].pageKey = newRes.pageKey[0].pageKey;
          return newPageKeyArray;
        });
      };
      fetchCollectionNft();
    }
  };
  useEffect(() => {
    if (address) {
      const fetchNewUserNft = async () => {
        const newRes = await fetchUserNft(address, [
          "0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33",
          "0x3CD266509D127d0Eac42f4474F57D0526804b44e",
        ]);
        setUserNft(newRes.nftCollection);
        setUserPageKey(newRes.pageKey);
      };
      fetchNewUserNft();

      // Collection
      const fetchCollectionNft = async () => {
        const addresses: string[] = [
          "0x1ed25648382c2e6da067313e5dacb4f138bc8b33",
          "0x3cd266509d127d0eac42f4474f57d0526804b44e",
        ];
        const newRes = await fetchCollection(addresses);
        setCollectionNft(newRes.nftCollection);
        setCollectionPageKey(newRes.pageKey);
      };
      fetchCollectionNft();
    }
    if (!address) {
      setUserNft([]);
    }
  }, [address]);
  return (
    <div>
      <Head>
        <title>NFT | Learn Web 3</title>
        <meta
          name="description"
          content="Fetch User's NFT Task for Learn Web 3"
        />
      </Head>
      <div className="min-h-screen min-w-full dark:bg-[#1C1127] bg-slate-50 prose  dark:prose-invert  transition-colors duration-150">
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
              pageKey={
                activeClass === "my-nft" ? userPageKey : collectionPageKey
              }
              userNft={activeClass === "my-nft" ? userNft : collectionNft}
              showMoreNft={showMoreNftHandler}
            />
          ) : (
            <SignIn connect={connectWithMetamask} />
          )}
        </div>
        {address && (
          <div>
            <p className="m-0 Center bg-[#7c1effae] py-2 text-[#fff] dark:bg-[#9b53ff42]">
              {" "}
              Made by Arun Shekhar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
