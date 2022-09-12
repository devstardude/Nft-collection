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
  const [activeClass, setActiveClass] = useState<string>("my-nft");
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const setActiveClassHandler: (arg0: string) => void = (activeClassName) => {
    setActiveClass(activeClassName);
  };
  useEffect(() => {
    if (address) {
      //Nft of user
      const NftOfUser = async (pageKey: string = "") => {
        // Get all NFTs
        const GetNftsForOwnerOptions: {
          withMetadata: boolean;
          pageKey: string;
          contractAddresses: [string, string];
        } = {
          withMetadata: false,
          pageKey: pageKey,
          contractAddresses: [
            "0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33",
            "0x3CD266509D127d0Eac42f4474F57D0526804b44e",
          ],
        };
        const nfts = await alchemy.nft.getNftsForOwner(
          "0x4A40Eb870DcF533D4dC097c3d87aaFE9f64490A1",
          GetNftsForOwnerOptions
        );
        const fetchedNft = nfts.ownedNfts.map((item) => {
          return {
            title: item.title,
            img: item.media[0].gateway,
            address: item.contract.address,
            tokenId: item.tokenId,
            desc: item.rawMetadata?.description,
            owner: true,
          };
        });
        setUserNft(() => [...fetchedNft]);
        if (nfts.pageKey === undefined) {
          return;
        }
        if (nfts.pageKey !== undefined || nfts.pageKey !== "") {
          NftOfUser(nfts.pageKey);
        }
      };
      const NftOfUserRun = async () => {
        try {
          await NftOfUser();
        } catch (error) {
          console.log(error);
        }
      };

      const getCollectionNft = () => {
        const addresses: string[] = [
          "0x1ed25648382c2e6da067313e5dacb4f138bc8b33",
          "0x3cd266509d127d0eac42f4474f57d0526804b44e",
        ];
        let collectionNftArray: userNftType = [];
        for (let i of addresses) {
          const main = async () => {
            // Contract address
            // Flag to omit metadata
            const omitMetadata = false;
            // Get all NFTs
            const response = await alchemy.nft.getNftsForContract(i, {
              omitMetadata: omitMetadata,
              pageSize: 20,
            });
            const mutatedArray = response.nfts.map((item) => {
              return {
                title: item.title,
                img: item.media[0].gateway,
                address: item.contract.address,
                tokenId: item.tokenId,
                desc: item.rawMetadata?.description,
                owner: false,
              };
            });

            collectionNftArray = [...collectionNftArray, ...mutatedArray];
          };
          const runMain = async () => {
            try {
              await main();
              setUserNft(collectionNftArray);
              console.log("mutated-1", collectionNftArray);
            } catch (error) {
              console.log(error);
            }
          };
          runMain();
        }
      };
      if (activeClass === "my-nft") {
        NftOfUserRun();
      } else {
        getCollectionNft();
      }
    }

    if (!address) {
      setUserNft([]);
    }
  }, [address, activeClass]);
  return (
    <div className="min-h-screen min-w-full dark:bg-[#1C1127] bg-slate-50 prose dark:prose-invert transition-colors duration-150">
      <div className="px-[10%]">
        <div>{isMismatched && <p className="pt-2 m-0 text-red-500 text-center">Please connect to Polygon Mainnet</p>}</div>
        <Navbar
          setActiveClass={setActiveClassHandler}
          activeClass={activeClass}
          address={address ? truncateEthAddress(address) : null}
          connect={connectWithMetamask}
        />
        {address && !isMismatched ? (
          <ShowNft userNft={userNft} />
        ) : (
          <SignIn connect={connectWithMetamask} />
        )}
      </div>
    </div>
  );
};

export default Home;
