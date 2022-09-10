import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "@fontsource/plus-jakarta-sans";
import ShowNft from "../components/ShowNft";
import SignIn from "../components/SignIn";
import { useState } from "react";

const Home: NextPage = () => {
  const [user, setUser] = useState<string | null>(null);
  const connect = () => {};
  return (
    <div className="min-h-screen min-w-full dark:bg-[#1C1127] bg-slate-50 prose dark:prose-invert transition-colors duration-150">
      <div className="px-[10%]">
        <Navbar connect={connect} />
        {user ? <ShowNft /> : <SignIn connect={connect} />}
      </div>
    </div>
  );
};

export default Home;
