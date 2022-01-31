import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../../lib/db";
import decoration from "../decoration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   const data = await prisma.timeline.create({
       data: req.body
   })
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
