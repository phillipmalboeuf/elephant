import { ServerClient } from 'postmark'

console.log(import.meta.env.VITE_POSTMARK_KEY)
export const email = new ServerClient(import.meta.env.VITE_POSTMARK_KEY)