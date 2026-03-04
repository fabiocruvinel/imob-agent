export async function handleMessage(text){

text = text.toLowerCase()

if(text.includes("oi") || text.includes("olá")){

return `Olá 👋

Sou o assistente virtual da imobiliária.

Como posso ajudar?

1️⃣ Comprar imóvel
2️⃣ Vender imóvel
3️⃣ Falar com corretor
`

}

if(text === "1"){

return `Ótimo!

Que tipo de imóvel você procura?

🏠 Casa
🏢 Apartamento
🌱 Lote
`

}

return "Desculpe, não entendi. Digite *oi* para começar."
}