export default function handler(req, res) {
  // 1. VERIFICAÇÃO DO WEBHOOK (Meta Challenge)
  if (req.method === "GET") {
    const VERIFY_TOKEN = "liderconstrutora123"; 

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Token inválido");
    }
  }

  // 2. RECEBIMENTO DE MENSAGENS
  if (req.method === "POST") {
    console.log("WEBHOOK EVENT:", JSON.stringify(req.body, null, 2));
    return res.sendStatus(200);
  }

  res.sendStatus(404);
}