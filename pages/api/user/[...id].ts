import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.query.id;
    const data = await prisma.user.findFirst({
      where: { id: Number(userId) },
      include: {
        events: true,
      },
    });
    res.json(data)
  } catch (error) {
      console.log(error);
    res.status(400).json(error);
  }
}
