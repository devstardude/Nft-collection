import type { NextApiRequest, NextApiResponse } from "next";
import { fetchUserNft } from "../../../utils/fetchApi";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;
  const address: any = slug && slug[0];
  if (slug && slug.length === 3) {
    const contractAddress = slug[1];
    const pageKey = slug[2];

    try {
      const newRes: any = await fetchUserNft(
        address,
        [contractAddress],
        pageKey
      );
      res.status(200).json(newRes);
    } catch {
      res.status(404).json({ message: "Could not reach server" });
    }
  } else {
    try {
      const newRes: any = await fetchUserNft(address, [
        "0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33",
        "0x3CD266509D127d0Eac42f4474F57D0526804b44e",
      ]);
      res.status(200).json(newRes);
    } catch {
      res.status(404).json({ message: "Could not reach server" });
    }
  }
}
