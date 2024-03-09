import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("test2");

    const collectionName =
      typeof req.query.name === "string" ? req.query.name : undefined;

    if (!collectionName) {
      res.status(400).json({ error: "Invalid collection name" });
      return;
    }

    const page =
      typeof req.query.page === "string" ? parseInt(req.query.page) : 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const drags = await db
      .collection(collectionName)
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json(drags);
  } catch (e) {
    console.error(e);
  }
};
