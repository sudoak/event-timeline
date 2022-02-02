import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "444951405495-tuihqd3c9m25477jdcgj91p142chah42.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: "Abc@123",
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.userId = user.id;
      }
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.

      session.accessToken = token.accessToken;
      session.id = token.userId;
      return session;
    },
    redirect({ url, baseUrl }) {
      
      if (url.startsWith(baseUrl)) return `${url}`;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
});
