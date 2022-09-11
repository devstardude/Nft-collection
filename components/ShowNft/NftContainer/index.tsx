import NftItem from "../NftItem";

type Props = {
  collectionName: string;
  items: {
    title: string;
    img?: string;
    address: string;
    tokenId: string;
    desc?: string;
  }[];
};
const NftContainer = ({ collectionName, items }: Props) => {

  return (
    <div className="py-[3rem]">
      <div className="flex">
        <h1 className="dark:border-[#8935ff] border-slate-600 border-2 bg-slate-200 dark:bg-[#9b53ff42] px-6 py-3 rounded-[1.3rem]">
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
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default NftContainer;
