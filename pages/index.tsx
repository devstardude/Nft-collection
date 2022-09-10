import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "@fontsource/plus-jakarta-sans";
import NftContainer from "../components/ShowNft/NftContainer";
import ShowNft from "../components/ShowNft";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen min-w-full dark:bg-[#1C1127] bg-slate-50 prose dark:prose-invert transition-colors duration-150">
      <div className="px-[10%]">
        <Navbar />
        <ShowNft />
      </div>
    </div>
  );
};

export default Home;
