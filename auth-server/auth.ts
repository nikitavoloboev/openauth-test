// sets up openauth server
// as per docs: https://openauth.js.org/docs
// TODO: deploy this on docker container, sst or railway
import { issuer } from "@openauthjs/openauth"
import { GoogleProvider } from "@openauthjs/openauth/provider/google"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { createSubjects } from "@openauthjs/openauth/subject"
import { object, string } from "valibot"

const subjects = createSubjects({
  user: object({
    id: string(),
  }),
})

export default issuer({
  subjects,
  // TODO: change to persistent storage
  storage: MemoryStorage({
    persist: "./persist.json",
  }),
  // just having google oauth for now
  providers: {
    google: GoogleProvider({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scopes: ["email", "profile"],
    }),
  },
  async allow() {
    return true
  },
  // TODO: how should success look for google oauth
  success: async (ctx, value) => {
    if (value.provider === "google") {
      return ctx.subject("user", {
        id: await getUser(value.tokenset.email),
      })
    }
    throw new Error("Invalid provider")
  },
})

// TODO: how should this function look?
async function getUser(email: string) {
  return "123"
}
