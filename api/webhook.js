export default async function handler(req, res) {

  console.log("EVENT:", JSON.stringify(req.body))

  if (req.method === "POST") {

    const body = req.body

    if (body.object) {

      const message =
        body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

      if (message) {

        const from = message.from

        await sendWhatsAppMessage(
          from,
          "Olá 👋\n\nSou o assistente virtual da imobiliária.\n\n1️⃣ Comprar imóvel\n2️⃣ Vender imóvel\n3️⃣ Falar com corretor"
        )

      }

      return res.status(200).end()

    }

  }

  res.status(404).end()

}