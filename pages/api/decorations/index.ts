import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const data = await prisma.decoration.create({
        data: req.body,
      });
      res.json(data);
    }
    res.status(200).json({ message: "lol" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
