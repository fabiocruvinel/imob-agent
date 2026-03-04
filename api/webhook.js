import { handleMessage } from "../bot/engine.js"
import { sendMessage } from "../services/whatsapp.js"

export default async function handler(req, res) {

if(req.method === "GET"){

const verify_token = "liderconstrutora123"

const mode = req.query["hub.mode"]
const token = req.query["hub.verify_token"]
const challenge = req.query["hub.challenge"]

if(mode === "subscribe" && token === verify_token){
return res.status(200).send(challenge)
}

return res.sendStatus(403)
}

if(req.method === "POST"){

const body = req.body

console.log("EVENT:", JSON.stringify(body))

try{

const change = body.entry?.[0]?.changes?.[0]?.value

const message = change?.messages?.[0]

if(!message) return res.sendStatus(200)

const phoneId = change.metadata.phone_number_id
const from = message.from
const text = message.text?.body || ""

const reply = await handleMessage(text)

if(reply){

await sendMessage(
phoneId,
process.env.WHATSAPP_TOKEN,
from,
reply
)

}

}catch(err){

console.log("ERRO:", err)

}

return res.sendStatus(200)

}

}