import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCollection } from "../../../utils/fetchApi";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;
  if (slug && slug.length === 2) {
    const contractAddress = slug[0];
    const pageKey = slug[1];
    try {
      const addresses: string[] = [contractAddress];
      const newRes: any = await fetchCollection(addresses, pageKey);
      res.status(200).json(newRes);
    } catch {
      res.status(404).json({ message: "Could not reach server" });
    }
  } else {
    try {
      const addresses: string[] = [
        "0x1ed25648382c2e6da067313e5dacb4f138bc8b33",
        "0x3cd266509d127d0eac42f4474f57d0526804b44e",
      ];
      const newRes: any = await fetchCollection(addresses);
      res.status(200).json(newRes);
    } catch {
      res.status(404).json({ message: "Could not reach server" });
    }
  }
}