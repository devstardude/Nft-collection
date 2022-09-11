type Props = {
  title: string;
  img?: string;
  address: string;
  tokenId: string;
  desc?: string;
};
const NftItem = ({ title, img, desc }: Props) => {
  return (
    <div className="PurpleBorderButton rounded-[2.3rem] p-4 w-[20rem] mb-4 transition-all duration-300 overflow-clip">
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
      </div>
    </div>
  );
};

const getExtention: (url: any) => any = (url) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

export default NftItem;
