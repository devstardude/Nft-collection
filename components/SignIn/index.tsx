type Props = {
    connect:()=>void
};
const SignIn = ({ connect }: Props) => {
  return (
    <div className="flex justify-between h-full border-b border-[#fff2]">
      <div className="flex justify-center items-center flex-col gap-3">
        <h1
          style={{ fontWeight: 800 }}
          className="text-[#9A53FF] text-[60px] m-0 p-0 "
        >
          Connect Wallet
        </h1>
        <h3 className="font-semibold mb-3 mt-0 p-0">
          To view your NFT Collection
        </h3>
        <div onClick={connect} className="Center border-2 rounded-full py-2 px-4 dark:hover:bg-[#9b53ff42] hover:bg-[#8935ff] dark:text-white hover:text-white transition-colors duration-200 cursor-pointer dark:border-[#8935ff] border-[#ab6fff]">
          <h4 className="NoPad font-thin text-inherit">Connect wallet</h4>
        </div>
      </div>
      <div className="">
        <div className="h-[75vh]">
          <img
            className="h-full filter brightness-[1.5] dark:brightness-[1]"
            src="https://www.mygateway.xyz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-background.e700b65d.png&w=1080&q=75"
            alt="bg"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
