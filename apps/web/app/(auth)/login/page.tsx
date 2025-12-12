'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Github } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const registered = searchParams.get("registered")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            console.log("[LOGIN] SignIn result:", res);

            if (res?.error) {
                setError("Invalid email or password")
            } else {
                router.refresh()
                router.push("/dashboard")
            }
        } catch (err) {
            console.error("[LOGIN] Error:", err)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                </div>
                <CardTitle className="text-2xl text-center text-white">Login to InterviewAI</CardTitle>
                <CardDescription className="text-center text-gray-400">
                    Enter your email to continue to your dashboard
                </CardDescription>
                {registered && (
                    <div className="p-2 text-sm text-green-500 bg-green-500/10 rounded text-center">
                        Account created! Please sign in.
                    </div>
                )}
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="grid gap-4">
                    {error && (
                        <div className="p-2 text-sm text-red-500 bg-red-500/10 rounded text-center">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-6">
                        <Button
                            variant="outline"
                            type="button"
                            className="border-white/10 hover:bg-white/5 hover:text-white"
                            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        >
                            <Github className="mr-2 h-4 w-4" /> Github
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            className="border-white/10 hover:bg-white/5 hover:text-white"
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        >
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input name="email" id="email" type="email" placeholder="m@example.com" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-indigo-500" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input name="password" id="password" type="password" required className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700">
                        {loading ? "Signing in..." : "Login"}
                    </Button>
                    <div className="text-sm text-center text-gray-400">
                        Don&apos;t have an account? <Link href="/register" className="text-indigo-400 hover:underline">Sign up</Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
