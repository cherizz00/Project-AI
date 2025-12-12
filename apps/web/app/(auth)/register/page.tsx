'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")
        const role = formData.get("role")

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || "Registration failed")
            }

            // Redirect to login or auto-login
            router.push("/login?registered=true")
        } catch (err: any) {
            setError(err.message)
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
                <CardTitle className="text-2xl text-center text-white">Create an account</CardTitle>
                <CardDescription className="text-center text-gray-400">
                    Get started with your AI interview assistant
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="grid gap-4">
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input name="email" id="email" type="email" placeholder="m@example.com" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-indigo-500" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input name="password" id="password" type="password" required minLength={6} className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role" className="text-gray-300">Target Role</Label>
                        <Input name="role" id="role" placeholder="e.g. Software Engineer" className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700">
                        {loading ? "Creating..." : "Create Account"}
                    </Button>
                    <div className="text-sm text-center text-gray-400">
                        Already have an account? <Link href="/login" className="text-indigo-400 hover:underline">Login</Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}

