'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white">Settings</h2>
                <p className="text-gray-400">Manage your account preferences.</p>
            </div>

            <div className="grid gap-6">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Appearance</CardTitle>
                        <CardDescription>Customize how InterviewAI looks.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-white">Dark Mode</Label>
                                <p className="text-sm text-gray-400">Always use dark theme</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Privacy</CardTitle>
                        <CardDescription>Control how your data is used.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-white">Improve AI Models</Label>
                                <p className="text-sm text-gray-400">Allow us to use your answers to train our models.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <div className="pt-4">
                    <Button variant="destructive">Delete Account</Button>
                </div>
            </div>
        </div>
    );
}
