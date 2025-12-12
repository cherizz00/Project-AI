import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, CreditCard, History } from 'lucide-react';
import { AITester } from '@/components/ai-tester';
import { Suspense } from 'react';

async function getUsage(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const log = await db.usageLog.findFirst({
        where: { userId, date: { gte: today } }
    });
    return log?.count || 0;
}

async function DashboardContent() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/login');
    }

    const usageCount = await getUsage(session.user.id);
    // const usageCount = 0;
    const isPro = session.user.plan === 'PRO';

    return (
        <div className="space-y-8 text-white">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-gray-400">Overview of your interview preparation.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Usage</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usageCount} / {isPro ? 'Unlimited' : '10'}</div>
                        <p className="text-xs text-gray-400">Generations used today</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Plan</CardTitle>
                        <CreditCard className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{session.user.plan || 'FREE'}</div>
                        <p className="text-xs text-gray-400">{isPro ? 'Next billing date: ...' : 'Upgrade for unlimited access'}</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                        <History className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-gray-400">Saved in history</p>
                    </CardContent>
                </Card>
            </div>

            <AITester />
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="text-white p-8">Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
