function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "invalid data" });
      return;
    }
    console.log(userEmail);
    res.status(201).json({ message: "Email OK!" });
  }
}
export default handler;
