import { ServerClient } from 'postmark'

let client: ServerClient | undefined

export const email = {
  sendEmailWithTemplate: (...args: Parameters<ServerClient['sendEmailWithTemplate']>) => {
    client ??= new ServerClient(import.meta.env.VITE_POSTMARK_KEY)
    return client.sendEmailWithTemplate(...args)
  }
}
