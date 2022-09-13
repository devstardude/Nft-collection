import NftItem from "../NftItem";
import { useEffect, useState } from "react";
type pageKeyType = {
  address: string;
  pageKey: string | undefined;
}[];
type Props = {
  collectionName: string;
  items: {
    title: string;
    img?: string;
    address: string;
    tokenId: string;
    desc?: string;
    owner: boolean;
  }[];
  pageKey: pageKeyType;
  address: string;
  showMoreNft: (address: string, pageKey: string | undefined) => any;
};
const NftContainer = ({
  collectionName,
  items,
  pageKey,
  address,
  showMoreNft,
}: Props) => {
  const lowcaseAddress = "0x" + address.substring(2).toLowerCase();
  const showMore: pageKeyType = pageKey.filter(
    (i) => i.address === address || i.address === lowcaseAddress
  );
  const [show, setShow] = useState<string>("Please wait");

  useEffect(() => {
    let timer1 = setTimeout(() => setShow("No Nfts"), 4000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return (
    <div className="py-[3rem]">
      <div className="flex">
        <h1 className="PurpleBorderDiv px-6 py-3 rounded-[1.3rem]">
          {collectionName}
        </h1>
      </div>
      <div>
        {items && items.length !== 0 ? (
          <div>
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
            {showMore[0] && showMore[0].pageKey !== undefined && (
              <div className="mt-5  Center">
                <p
                  onClick={() => showMoreNft(address, showMore[0].pageKey)}
                  className="PurpleBorderDiv px-4 py-2 rounded-[2.3rem] cursor-pointer "
                >
                  Show More
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="min-h-[12rem]">{show}</p>
        )}
      </div>
    </div>
  );
};

export default NftContainer;
