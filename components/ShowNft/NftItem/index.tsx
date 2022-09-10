type Props = {
  title: string;
  img: string;
};
const NftItem = ({ title, img }: Props) => {
  return (
    <div className="cursor-pointer dark:hover:bg-[#9b53ff42] hover:bg-slate-200 rounded-[2.3rem] border-2 dark:border-[#8935ff] border-slate-600 p-4 w-[20rem] mb-4 transition-all duration-300 overflow-clip">
      <div className="w-full h-[250px] rounded-[2.5rem] overflow-clip">
        <img
          src={img}
          alt="img"
          className="p-0 m-0 h-full w-full object-cover"
        />
      </div>
      <div className="px-4">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default NftItem;
