import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/db"
import { verifyPassword } from "@/lib/password"

if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL environment variable");
}

if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === "production") {
    console.warn("WARN: NEXTAUTH_SECRET is not set. This is required for production.");
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables");
}

console.log("[AUTH] GOOGLE_CLIENT_ID Loaded:", !!process.env.GOOGLE_CLIENT_ID);
console.log("[AUTH] GOOGLE_CLIENT_SECRET Loaded:", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("[AUTH] NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

export const authOptions: NextAuthOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adapter: PrismaAdapter(db as any),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("[AUTH] Authorizing user:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("[AUTH] Missing credentials");
                    return null
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user || !user.password) {
                    console.log("[AUTH] User not found or no password hash");
                    return null
                }

                console.log("[AUTH] Verifying password...");
                const passwordsMatch = await verifyPassword(credentials.password, user.password)
                console.log("[AUTH] Password match result:", passwordsMatch);

                if (!passwordsMatch) {
                    return null
                }

                return user
            }
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.plan = token.plan
            }

            return session
        },
        async jwt({ token, user }) {
            if (!token.email) {
                if (user) {
                    token.id = user.id
                }
                return token
            }

            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,
                },
            })

            if (!dbUser) {
                if (user) {
                    token.id = user.id
                }
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                plan: dbUser.plan,
            }
        },
    },
}
