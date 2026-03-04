export default async function handler(req, res) {

  const body = req.body

  console.log("EVENT:", JSON.stringify(body))

  if (req.method === "POST") {

    const entry = body.entry?.[0]
    const change = entry?.changes?.[0]
    const value = change?.value

    // Só processa mensagens (ignora status)
    if (value?.messages) {

      const message = value.messages[0]
      const from = message.from
      const text = message.text?.body || ""

      console.log("Mensagem recebida:", text)

      try {

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
                body: "🤖 Bot ativo!\n\nDigite:\n1 - Comprar imóvel\n2 - Vender imóvel\n3 - Falar com corretor"
              }
            })
          }
        )

        const data = await response.text()

        console.log("META RESPONSE:", data)

      } catch (error) {

        console.error("Erro ao enviar mensagem:", error)

      }

    }

    return res.status(200).end()
  }

  res.status(200).send("Webhook ativo")
}