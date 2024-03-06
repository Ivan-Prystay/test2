import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("test2");

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const drags = await db
      .collection("newlifes")
      .find({})
      .sort([
        ["Manufacturer: Ukrainian name", -1],
        ["_id", 1],
      ])
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json(drags);
  } catch (e) {
    console.error(e);
  }
};
