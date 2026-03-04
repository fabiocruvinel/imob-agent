export default async function handler(req, res) {

  let body = req.body

  if (typeof body === "string") {
    body = JSON.parse(body)
  }

  console.log("EVENT:", JSON.stringify(body))

  if (req.method === "POST") {

    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

    if (message) {

      const from = message.from
      const text = message.text?.body || ""

      console.log("Mensagem recebida:", text)

      await fetch("https://graph.facebook.com/v22.0/934741396399050/messages", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: from,
          type: "text",
          text: {
            body: "Olá 👋 Sou o assistente da imobiliária.\n\nDigite:\n1 - Comprar imóvel\n2 - Vender imóvel\n3 - Falar com corretor"
          }
        })
      })

    }

    return res.status(200).json({ status: "ok" })
  }

  res.status(200).send("Webhook ativo")
}