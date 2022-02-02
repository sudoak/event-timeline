import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(prisma);

  try {
    let data = null;
    console.log(req.body)
    if (req.method === "POST") {
      const data = await prisma.event.create({
        data: {
          ...req.body,
          startDate: new Date(req.body.startDate),
          endDate: new Date(req.body.endDate),
        },
      });
      res.json(data);
    }
    if (req.method === "PATCH") {
      data = await prisma.event.update({
        where: { id: req.body.id },
        data: req.body
      })
    }
    res.status(200).json({ message: "lol" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
