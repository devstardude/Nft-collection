import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppWrapper } from "../components/Context/AppContext";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const activeChainId = ChainId.Polygon;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <ThirdwebProvider
        supportedChains={[activeChainId]}
        desiredChainId={activeChainId}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </AppWrapper>
  );
}

export default MyApp;
