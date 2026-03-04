export default async function handler(req, res) {

  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === "liderconstrutora123") {
      return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
  }

  if (req.method === "POST") {

    const body = req.body;

    console.log("WEBHOOK EVENT:", JSON.stringify(body, null, 2));

    if (body.object) {

      const change = body.entry?.[0]?.changes?.[0]?.value;

      // se for mensagem
      if (change?.messages) {
        const message = change.messages[0];
        console.log("Mensagem recebida:", message);
      }

      // se for status
      if (change?.statuses) {
        const status = change.statuses[0];
        console.log("Status da mensagem:", status.status);
      }

      return res.sendStatus(200);
    }

    return res.sendStatus(404);
  }

  res.sendStatus(405);
}