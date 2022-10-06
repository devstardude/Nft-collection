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
  showMoreNft: (address: string, pageKey: string | undefined) => any;
};
const ShowNft = ({ userNft, pageKey, showMoreNft }: Props) => {
  const nftCollection: nftCollection = [
    {
      collectionName: "Custom",
      address: "0x66C469fb19a2F6dF10262aA39d630A6EF75DBCDf",
      items: userNft,
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

export default ShowNft;
