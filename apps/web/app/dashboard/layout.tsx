import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

import { getApiLimitCount } from "@/lib/api-limit";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const apiLimitCount = await getApiLimitCount();

    return (
        <div className="min-h-screen bg-black">
            <DashboardSidebar apiLimitCount={apiLimitCount} />
            <div className="pl-64">
                {/* Top Header Placeholder (can add user menu, breadcrumbs here) */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
                    <h1 className="text-sm font-medium text-gray-400">Welcome back, Demo User</h1>
                    <div className="h-8 w-8 rounded-full bg-gray-800 border border-white/10" />
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
