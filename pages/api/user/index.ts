import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      console.log(req.body)
     const user = await prisma.user.create({
       data: req.body
     })
      res.status(200).json(user)
    } else {
      res.status(200)
    }
  } catch (error: unknown) {
    console.log(error);
    res.status(400).json(error);
  }
}
