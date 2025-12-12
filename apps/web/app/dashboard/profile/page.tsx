import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="max-w-xl space-y-8 text-white">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
                <p className="text-gray-400">Manage your account information.</p>
            </div>

            <div className="space-y-4 bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input disabled value={session?.user?.name || ''} className="bg-black/20 border-white/10 text-white" />
                </div>

                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input disabled value={session?.user?.email || ''} className="bg-black/20 border-white/10 text-white" />
                </div>

                <div className="space-y-2">
                    <Label>Current Plan</Label>
                    <div className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-sm font-medium inline-block">
                        {session?.user?.plan || 'FREE'}
                    </div>
                </div>

                <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
