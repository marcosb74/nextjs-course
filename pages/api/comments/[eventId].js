import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(process.env.URL_MONGO_EVENTS);

  if (req.method === "POST") {
    // add server side Validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input." });
      return;
    }
    const newComments = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    await db.collection("comments").insertOne(newComments);

    res.status(201).json({ message: "Data ok!", comment: newComments });
  }
  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
