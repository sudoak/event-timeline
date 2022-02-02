import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const eventId = req.query.id;
    const data = await prisma.event.findFirst({
      where: { id: Number(eventId[0]) },
      include: {
        inventory: true,
        timeline: true,
        decoration: {
          include: {
            DecorationMeta: true,
          },
        },
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
