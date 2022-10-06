import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API,
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
      pageSize: 40,
    };
    const response = await alchemy.nft.getNftsForOwner(
      userAddress,
      GetNftsForOwnerOptions
    );
    let mutatedArray: any = [];
    for (const i of response.ownedNfts) {
      let urlStringInitial = i.tokenUri?.raw.replace("{id}", i.tokenId);
      const urlStringFinal = urlStringInitial?.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
      const reponse = async () => {
        if (urlStringFinal) {
          const loadNftData = async () => {
            const response = await fetch(urlStringFinal);
            const info = await response.json();
            const nftData = {
              title: info.name,
              img: info.image.replace(
                "ipfs://",
                "https://gateway.ipfs.io/ipfs/"
              ),
              address: i.contract.address,
              tokenId: i.tokenId,
              desc: info.description,
              owner: true,
            };
            mutatedArray.push(nftData);
          };
          await loadNftData();
        }
      };
      await reponse();
    }
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
      pageSize: 40,
      pageKey: nextPageKey,
    });
    let mutatedArray: any = [];
    for (const i of response.nfts) {
      let urlStringInitial = i.tokenUri?.raw.replace("{id}", i.tokenId);
      const urlStringFinal = urlStringInitial?.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
      const reponse = async () => {
        if (urlStringFinal) {
          const loadNftData = async () => {
            const response = await fetch(urlStringFinal);
            const info = await response.json();

            const nftData = {
              title: info.name,
              img: info.image.replace(
                "ipfs://",
                "https://gateway.ipfs.io/ipfs/"
              ),
              address: i.contract.address,
              tokenId: i.tokenId,
              desc: info.description,
              owner: false,
            };
            mutatedArray.push(nftData);
          };
          await loadNftData();
        }
      };
      await reponse();
    }
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
