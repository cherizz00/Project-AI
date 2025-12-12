import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Code, MessageSquare, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <header className="fixed w-full border-b border-white/10 bg-black/80 backdrop-blur-xl z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="size-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500" />
            <span>AI Interview</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition">Features</Link>
            <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="#docs" className="hover:text-white transition">Extension</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white">Sign In</Link>
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Now available as Chrome Extension
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent pb-2">
              Master Your Tech Interviews with AI
            </h1>
            <p className="text-xl text-gray-400 max-w-[600px] mx-auto">
              Real-time answers, code explanations, and structural guidance during your interview. Powered by advanced AI models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full">
                <Link href="/docs">
                  Download Extension <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 border-white/20 hover:bg-white/10 text-white rounded-full">
                <Link href="#how-it-works">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Mockup */}
          <div className="mt-20 mx-auto max-w-5xl rounded-xl border border-white/10 bg-gray-900/50 p-2 shadow-2xl backdrop-blur-sm">
            <div className="rounded-lg bg-black aspect-video flex items-center justify-center border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-50" />
              <div className="z-10 text-center space-y-2">
                <p className="text-gray-500 text-sm">Interactive Demo Preview</p>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto backdrop-blur-md cursor-pointer hover:scale-110 transition">
                  <div className="border-l-8 border-l-white border-y-4 border-y-transparent h-4 ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="container mx-auto px-4 md:px-6 py-24 border-t border-white/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to ace the interview</h2>
            <p className="text-gray-400">Comprehensive toolkit for software engineers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Real-time Answers", desc: "Get instant answers to technical questions without leaving your meeting tab." },
              { icon: Code, title: "Code Generation", desc: "Generate clean, optimized code snippets in Python, JS, Go and more." },
              { icon: MessageSquare, title: "Context Awareness", desc: "AI understands your role and experience level to tailor the response." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <feature.icon className="size-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white/5 border-y border-white/10">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">How it works</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold mx-auto">1</div>
                <h3 className="text-xl font-bold">Install Extension</h3>
                <p className="text-gray-400">Add to Chrome and log in with your dashboard account.</p>
              </div>
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold mx-auto">2</div>
                <h3 className="text-xl font-bold">Select Question</h3>
                <p className="text-gray-400">Highlight any technical question on your screen or paste it.</p>
              </div>
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold mx-auto">3</div>
                <h3 className="text-xl font-bold">Get Answer</h3>
                <p className="text-gray-400">Receive a structured, interview-ready answer instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-4 md:px-6 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="p-8 rounded-2xl border border-white/10 bg-black hover:border-white/20 transition flex flex-col">
              <h3 className="text-xl font-medium text-gray-400 mb-2">Free Starter</h3>
              <div className="text-4xl font-bold mb-6">$0</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><Check className="size-4 text-green-500" /> 10 AI Generations / Day</li>
                <li className="flex items-center gap-2 text-sm"><Check className="size-4 text-green-500" /> Basic Models</li>
                <li className="flex items-center gap-2 text-sm"><Check className="size-4 text-green-500" /> Web Dashboard Access</li>
              </ul>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">Start for Free</Button>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl border border-blue-500 bg-blue-500/5 relative flex flex-col">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-medium text-blue-400 mb-2">Pro Interviewer</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><Check className="size-4 text-blue-500" /> Unlimited Generations</li>
                <li className="flex items-center gap-2 text-sm"><Check className="size-4 text-blue-500" /> Advanced Models (Gemini 1.5)</li>
                <li className="flex items-center gap-2 text-sm"><Check className="size-4 text-blue-500" /> Chrome Extension Access</li>
                <li className="flex items-center gap-2 text-sm"><Check className="size-4 text-blue-500" /> Priority Support</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">Upgrade to Pro</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2024 AI Interview Assistant. All rights reserved.</p>
      </footer>
    </div>
  )
}
