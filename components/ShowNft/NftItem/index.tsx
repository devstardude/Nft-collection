import {
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from "react-share";
import {TwitterIcon,LinkedinIcon,RedditIcon,WhatsappIcon} from "react-share/lib";

type Props = {
  title: string;
  img?: string;
  address: string;
  tokenId: string;
  desc?: string;
  owner:boolean
};
const NftItem = ({ title, img, desc, address, tokenId, owner }: Props) => {
  {console.log("yo",owner)}
  return (
    <div className="PurpleBorderButton rounded-[2.3rem] p-4 w-[20rem] mb-4 transition-all duration-300 ">
      <div className="w-full h-[250px] rounded-[2.5rem] overflow-clip">
        {getExtention(img) === "mp4" ? (
          <video
            autoPlay
            muted
            loop
            className="p-0 m-0 h-full w-full object-cover"
          >
            <source src={img} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        ) : (
          <img
            src={img}
            alt="img"
            className="p-0 m-0 h-full w-full object-cover"
          />
        )}
      </div>
      <div className="px-4">
        <h3>{title}</h3>
        <p className="text-sm">
          {desc && desc?.substring(0, 80)}
          {desc && desc?.length >= 100 && (
            <span className="group relative inline-block text-blue-500 hover:text-red-500 duration-300">
              ...read more
              {/* <!-- Tooltip text here --> */}
              <span className="Tooltip">{desc}</span>
            </span>
          )}
        </p>
        {owner===true && (
          <div className="flex justify-around rounded-full border-2 border-slate-600 dark:border-[#8935FF] py-2 px-2">
            <TwitterShareButton
              title={`I just got this cool NFT "${title}"`}
              url={`https://opensea.io/assets/matic/${address}/${tokenId}`}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton
              title={`I just got this cool NFT "${title}"`}
              url={`https://opensea.io/assets/matic/${address}/${tokenId}`}
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <RedditShareButton
              title={`I just got this cool NFT "${title}"`}
              url={`https://opensea.io/assets/matic/${address}/${tokenId}`}
            >
              <RedditIcon size={32} round={true} />
            </RedditShareButton>
            <WhatsappShareButton
              title={`I just got this cool NFT "${title}"`}
              url={`https://opensea.io/assets/matic/${address}/${tokenId}`}
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div>
        )}
      </div>
    </div>
  );
};

const getExtention: (url: any) => any = (url) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

export default NftItem;
