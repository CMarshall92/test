import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Add your custom properties here */
      verified: boolan
      subscriptionActive: boolan
    } & DefaultSession["user"]; // Retain default properties like name, email, etc.
  }

  interface User {
    /** Add custom user properties if needed */
  }
}