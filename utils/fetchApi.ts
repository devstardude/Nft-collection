import { Alchemy, Network } from "alchemy-sdk";
const config = {
  apiKey: "FPpiQ92seWA0Lv3_Z15TP7hIBATvaVxH",
  network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(config);

export const fetchUserNft = async (
  userAddress: string,
  contractAddress: string[],
  pageKey?: string | undefined
): Promise<{
  nftCollection: {
    title: string;
    img: string;
    address: string;
    tokenId: string;
    desc: string | undefined;
    owner: boolean;
  }[];
  pageKey: { address: string; pageKey: string | undefined }[];
}> => {
  let collectionNftArray: any = [];
  let pageKeyArray: any = [];
  for (let i of contractAddress) {
    const GetNftsForOwnerOptions: {
      withMetadata: boolean;
      pageKey: string | undefined;
      contractAddresses: string[];
      pageSize: number;
    } = {
      withMetadata: true,
      pageKey: pageKey,
      contractAddresses: [i],
      pageSize: 20,
    };
    const response = await alchemy.nft.getNftsForOwner(
      userAddress,
      GetNftsForOwnerOptions
    );
    const mutatedArray = response.ownedNfts.map((item) => {
      return {
        title: item.title,
        img: item.media[0].gateway,
        address: item.contract.address,
        tokenId: item.tokenId,
        desc: item.rawMetadata?.description,
        owner: true,
      };
    });

    collectionNftArray = [...collectionNftArray, ...mutatedArray];

    pageKeyArray = [
      ...pageKeyArray,
      {
        address: i,
        pageKey: response.pageKey,
      },
    ];
  }

  return {
    nftCollection: collectionNftArray,
    pageKey: pageKeyArray,
  };
};

export const fetchCollection = async (
  addressArray: string[],
  pageKey?: string
): Promise<{
  nftCollection: {
    title: string;
    img: string;
    address: string;
    tokenId: string;
    desc: string | undefined;
    owner: boolean;
  }[];
  pageKey: { address: string; pageKey: string | undefined }[];
}> => {
  const nextPageKey = pageKey ? pageKey : "";
  let collectionNftArray: any = [];
  let pageKeyArray: any = [];
  for (let i of addressArray) {
    const omitMetadata = false;
    const response = await alchemy.nft.getNftsForContract(i, {
      omitMetadata: omitMetadata,
      pageSize: 1,
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
    pageKeyArray = [
      ...pageKeyArray,
      {
        address: i,
        pageKey: response.pageKey,
      },
    ];
  }
  return {
    nftCollection: collectionNftArray,
    pageKey: pageKeyArray,
  };
};
