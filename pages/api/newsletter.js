import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "invalid data" });
      return;
    }

    const client = await MongoClient.connect(process.env.URL_MONGO_EVENTS);

    const db = client.db();
    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();
    res.status(201).json({ message: "Email OK!" });
  }
}
export default handler;
