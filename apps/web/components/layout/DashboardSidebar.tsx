'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";
import { LayoutDashboard, User, Zap, Sparkles, FileText, Settings, LogOut, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Zap, label: 'Interview Session', href: '/dashboard/session' },
    { icon: FileText, label: 'Question Library', href: '/dashboard/questions' },
    { icon: User, label: 'Profile & Resume', href: '/dashboard/profile' },
    { icon: CreditCard, label: 'Billing & Plans', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

import { FreeCounter } from '@/components/free-counter';

interface DashboardSidebarProps {
    apiLimitCount: number;
}

export function DashboardSidebar({ apiLimitCount = 0 }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen border-r border-white/10 bg-black flex flex-col fixed left-0 top-0">
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-white">InterviewAI</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-indigo-600/10 text-indigo-400"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-4">
                <FreeCounter apiLimitCount={apiLimitCount} />
                <Button onClick={() => signOut()} variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </div>
        </div>
    );
}
