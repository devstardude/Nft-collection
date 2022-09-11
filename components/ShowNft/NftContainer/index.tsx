import NftItem from "../NftItem";

type Props = {
  collectionName: string;
  items: {
    title: string;
    img?: string;
    address: string;
    tokenId: string;
    desc?: string;
    owner:boolean
  }[];
};
const NftContainer = ({ collectionName, items }: Props) => {

  return (
    <div className="py-[3rem]">
      <div className="flex">
        <h1 className="PurpleBorderDiv px-6 py-3 rounded-[1.3rem]">
          {collectionName}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
        {items.map((nft, i) => (
          <NftItem
            title={nft.title}
            img={nft.img}
            desc={nft.desc}
            address={nft.address}
            tokenId={nft.tokenId}
            owner={nft.owner}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default NftContainer;
