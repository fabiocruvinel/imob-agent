export async function sendMessage(phoneId, token, to, text){

await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`,{
method:"POST",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
messaging_product:"whatsapp",
to:to,
type:"text",
text:{body:text}
})
})

}