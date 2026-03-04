export async function handleMessage(client, message) {

const text = message.text.body.toLowerCase()

if(text.includes("oi") || text.includes("olá")){

return `
Olá! 👋

Sou o assistente da ${client.name}

1️⃣ Comprar imóvel
2️⃣ Vender imóvel
3️⃣ Falar com corretor
`
}

}