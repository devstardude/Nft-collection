import NftContainer from "./NftContainer";
type nft = {
  title: string;
  img?: string;
  address: string;
  tokenId: string;
  desc?: string;
}[];

type nftCollection = {
  collectionName: string;
  items: nft;
}[];
type Props = { userNft: nft };
const ShowNft = ({ userNft }: Props) => {
  const nftCollection: nftCollection = [
    { collectionName: "Learn Web 3", items: filter(userNft, "lw3") },
    { collectionName: "Buildspace", items: filter(userNft, "buildspace") },
  ];
  return (
    <div>
      {nftCollection.map((data, i) => (
        <NftContainer
          key={i}
          collectionName={data.collectionName}
          items={data.items}
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
