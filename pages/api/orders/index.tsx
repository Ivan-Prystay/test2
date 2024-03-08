import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db("test2");

  if (req.method === "POST") {
    // Обробка POST-запиту
    const newOrder = req.body; // дані замовлення отримані з тіла запиту
    const result = await db.collection("orders").insertOne(newOrder);
    res.json(result);
  } else if (req.method === "GET") {
    // Обробка GET-запиту
    const orders = await db.collection("orders").find({}).toArray();
    res.json(orders);
  } else {
    // Обробка інших типів запитів
    res.status(405).send({ message: "Метод не підтримується" });
  }
};
