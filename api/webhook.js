export default async function handler(req, res) {

  const body = req.body

  console.log("EVENT:", JSON.stringify(body))

  if (req.method === "POST") {

    const change = body?.entry?.[0]?.changes?.[0]
    const message = change?.value?.messages?.[0]

    if (message) {

      const from = message.from
      const text = message.text?.body || ""

      console.log("Mensagem recebida:", text)

      const response = await fetch(
        "https://graph.facebook.com/v22.0/934741396399050/messages",
        {
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
              body: "Olá 👋\nSou o assistente virtual da imobiliária.\n\nDigite:\n1 - Comprar imóvel\n2 - Vender imóvel\n3 - Falar com corretor"
            }
          })
        }
      )

      const result = await response.text()
      console.log("Resposta WhatsApp:", result)

    }

    return res.status(200).end()
  }

  res.status(200).send("ok")
}