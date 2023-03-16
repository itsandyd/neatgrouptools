import { NextApiRequest, NextApiResponse } from "next";

const catchAllApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Incoming request:", req.url, req.method, req.query, req.body);
  res.status(404).send("Not found");
};

export default catchAllApiRoute;
