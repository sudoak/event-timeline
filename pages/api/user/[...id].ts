import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id[0] || 1;
    console.log("id->", id);

    const data = await prisma.user.findFirst({
      where: {
        id: id as string,
      },
      include: {
        events: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
