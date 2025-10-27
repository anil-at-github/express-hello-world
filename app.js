import express from "express";
const app = express();
app.use(express.json());

// ✅ Verification endpoint
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "bwzbPRQw3HADUvaa6JFejQdO7txTFsECgFRGmPGcIebUAjH8z8d7USgabSMLrUul"; // must match what you entered in Meta Developer dashboard

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    res.status(200).send(challenge);
  } else {
    console.log("❌ Verification failed");
    res.sendStatus(403);
  }
});

// ✅ For incoming messages
app.post("/webhook", (req, res) => {
  console.log("📩 Received message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
