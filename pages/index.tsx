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
  }[];
  const [userNft, setUserNft] = useState<userNftType>([]);
  const connectWithMetamask = useMetamask();
  const address = useAddress();

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

      NftOfUserRun();
    }
    if (!address) {
      setUserNft([]);
    }
  }, [address]);

  return (
    <div className="min-h-screen min-w-full dark:bg-[#1C1127] bg-slate-50 prose dark:prose-invert transition-colors duration-150">
      <div className="px-[10%]">
        <Navbar
          address={address ? truncateEthAddress(address) : null}
          connect={connectWithMetamask}
        />
        {address ? (
          <ShowNft userNft={userNft} />
        ) : (
          <SignIn connect={connectWithMetamask} />
        )}
      </div>
    </div>
  );
};

export default Home;
