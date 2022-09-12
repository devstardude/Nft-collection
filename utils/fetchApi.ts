import { Alchemy, Network } from "alchemy-sdk";
const config = {
  apiKey: "FPpiQ92seWA0Lv3_Z15TP7hIBATvaVxH",
  network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(config);

type userNftType = {
  title: string;
  img?: string;
  address: string;
  tokenId: string;
  desc?: string;
  owner: boolean;
};
[] || [];

export const fetchUserNft = async (
  userAddress: string,
  contractAddress: string[],
  pageKey?: string
): Promise<
  | {
      title: string;
      img: string;
      address: string;
      tokenId: string;
      desc: string | undefined;
      owner: boolean;
    }[]
> => {
  const nextPageKey = pageKey ? pageKey : "";
  const GetNftsForOwnerOptions: {
    withMetadata: boolean;
    pageKey: string;
    contractAddresses: string[];
  } = {
    withMetadata: false,
    pageKey: nextPageKey,
    contractAddresses: contractAddress,
  };
  const nfts = await alchemy.nft.getNftsForOwner(
    userAddress,
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
  return fetchedNft;
};

export const fetchCollection = async (
  addressArray: string[],
  pageKey?: string
): Promise<
  | {
      title: string;
      img: string;
      address: string;
      tokenId: string;
      desc: string | undefined;
      owner: boolean;
    }[]
> => {
  const nextPageKey = pageKey ? pageKey : "";
  let collectionNftArray: any = [];
  for (let i of addressArray) {
    const omitMetadata = false;
    const response = await alchemy.nft.getNftsForContract(i, {
      omitMetadata: omitMetadata,
      pageSize: 20,
      pageKey: nextPageKey,
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
  }
  return collectionNftArray;
};
