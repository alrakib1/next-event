const handler = async (req, res) => {
    if (req.method === "POST") {
        const eventId = req.body.eventId;
        const email = req.body.email;
        const name = req.body.name;
        const text = req.body.text;
    
        if (
        !eventId ||
        !email ||
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === ""
        ) {
        res.status(422).json({ message: "Invalid input." });
        return;
        }
    
        const newComment = {
        id: eventId,
        email,
        name,
        text,
        };
    
        console.log(newComment);
    
        res.status(201).json({ message: "Added comment.", comment: newComment });
    }
};

export default handler;