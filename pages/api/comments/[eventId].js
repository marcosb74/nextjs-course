function handler(req, res) {
  const eventId = req.query.eventId;

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
    };
    console.log(newComments);

    res.status(201).json({ message: "Data ok!", comment: newComments });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "max", text: "text@test.com" },
      { id: "c2", name: "maximiliano", text: "segundo@test.com" },
      { id: "c3", name: "maxmuis", text: "text22@test.com" },
      { id: "c4", name: "ranapepe", text: "tercerotest.com" },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
