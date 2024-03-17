const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    // Store in a database
    res.status(201).json({ message: "Signed up!" , data: userEmail });
  }
};

export default handler;
