export default async function handler(req, res) {

  console.log("EVENT:", JSON.stringify(req.body))

  if (req.method === "POST") {

    const body = req.body

    if (body.object) {

      const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

      if (message) {

        const from = message.from

        await fetch(`https://graph.facebook.com/v22.0/934741396399050/messages`, {
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
        })

      }

      return res.status(200).end()

    }

  }

  res.status(404).end()

}