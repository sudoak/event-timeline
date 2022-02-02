import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.extendedInventory.upsert({
      where: { eventId: req.body.eventId},
      update: {
        ...req.body
      },
      create: {
        ...req.body
      }
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
