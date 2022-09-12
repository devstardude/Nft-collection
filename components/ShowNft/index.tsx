import NftContainer from "./NftContainer";
type nft = {
  title: string;
  img?: string;
  address: string;
  tokenId: string;
  desc?: string;
  owner: boolean;
}[];

type nftCollection = {
  collectionName: string;
  items: nft;
  address: string;
}[];
type pageKeyType = {
  address: string;
  pageKey: string | undefined;
}[];
type Props = {
  userNft: nft;
  pageKey: pageKeyType;
  showMoreNft: (pageKey: string | undefined) => any;
};
const ShowNft = ({ userNft, pageKey, showMoreNft }: Props) => {
  const nftCollection: nftCollection = [
    {
      collectionName: "Learn Web 3",
      address: "0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33",
      items: filter(userNft, "lw3"),
    },
    {
      collectionName: "Buildspace",
      address: "0x3CD266509D127d0Eac42f4474F57D0526804b44e",
      items: filter(userNft, "buildspace"),
    },
  ];
  return (
    <div>
      {nftCollection.map((data, i) => (
        <NftContainer
          key={i}
          collectionName={data.collectionName}
          items={data.items}
          pageKey={pageKey}
          address={data.address}
          showMoreNft={showMoreNft}
        />
      ))}
    </div>
  );
};

const filter: (a: nft, b: string) => nft = (a, b) => {
  if (b === "lw3") {
    const filteredItems = a.filter(
      (item) => item.address === "0x1ed25648382c2e6da067313e5dacb4f138bc8b33"
    );
    return filteredItems;
  } else {
    const filteredItems = a.filter(
      (item) => item.address === "0x3cd266509d127d0eac42f4474f57d0526804b44e"
    );
    return filteredItems;
  }
};

export default ShowNft;
