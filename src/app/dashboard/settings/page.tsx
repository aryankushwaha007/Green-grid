"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    User,
    Bell,
    Shield,
    Palette,
    Mail,
    Smartphone,
    Globe,
    Moon,
    Sun,
    Laptop,
    Key,
    LogOut
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 pb-10">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px] md:grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your profile details and public information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/avatars/01.png" alt="@jdoe" />
                                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <Button variant="outline" size="sm">Change Avatar</Button>
                                    <p className="text-xs text-muted-foreground">
                                        JPG, GIF or PNG. Max size of 800K.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" placeholder="John" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" defaultValue="john.doe@greengrid.com" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" placeholder="Role or department" defaultValue="Senior Facility Manager" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Settings</CardTitle>
                            <CardDescription>
                                Set your language and timezone preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English (US)</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="de">Deutsch</SelectItem>
                                            <SelectItem value="ar">العربية</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select defaultValue="utc-3">
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                                            <SelectItem value="utc-3">Riyadh (GMT+3)</SelectItem>
                                            <SelectItem value="utc-4">Dubai (GMT+4)</SelectItem>
                                            <SelectItem value="est">New York (GMT-5)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button variant="outline">Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alert Preferences</CardTitle>
                            <CardDescription>
                                Choose how you want to be notified about system alerts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                                        <AlertCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Critical Alerts</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive immediate notifications for critical system failures.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="critical-email" defaultChecked />
                                    <Label htmlFor="critical-email">Email</Label>
                                    <Checkbox id="critical-sms" defaultChecked className="ml-4" />
                                    <Label htmlFor="critical-sms">SMS</Label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                                        <AlertTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Warnings</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Notifications for efficiency drops and maintenance reminders.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="warning-email" defaultChecked />
                                    <Label htmlFor="warning-email">Email</Label>
                                    <Checkbox id="warning-sms" className="ml-4" />
                                    <Label htmlFor="warning-sms">SMS</Label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                        <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Daily Reports</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Daily summary of facility performance and tasks.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="report-email" defaultChecked />
                                    <Label htmlFor="report-email">Email</Label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Update Notifications</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme</CardTitle>
                            <CardDescription>
                                Customize the look and feel of the dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <div className="h-24 rounded-lg border-2 border-primary bg-background p-2 shadow-sm flex items-center justify-center">
                                        <div className="space-y-2 w-full">
                                            <div className="h-2 w-[80%] rounded-lg bg-muted" />
                                            <div className="h-2 w-[60%] rounded-lg bg-muted" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <Sun className="h-4 w-4" />
                                        <span className="text-sm font-medium">Light</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-24 rounded-lg border border-muted bg-slate-950 p-2 shadow-sm flex items-center justify-center">
                                        <div className="space-y-2 w-full">
                                            <div className="h-2 w-[80%] rounded-lg bg-slate-800" />
                                            <div className="h-2 w-[60%] rounded-lg bg-slate-800" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <Moon className="h-4 w-4" />
                                        <span className="text-sm font-medium">Dark</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-24 rounded-lg border border-muted bg-background p-2 shadow-sm flex items-center justify-center">
                                        <div className="space-y-2 w-full">
                                            <div className="h-2 w-[80%] rounded-lg bg-muted" />
                                            <div className="h-2 w-[60%] rounded-lg bg-muted" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <Laptop className="h-4 w-4" />
                                        <span className="text-sm font-medium">System</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Density</CardTitle>
                            <CardDescription>
                                Adjust the information density of the interface.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="compact-mode" />
                                    <Label htmlFor="compact-mode" className="font-medium">Compact Mode</Label>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">
                                    Reduces padding and font sizes to show more data on screen.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password to keep your account secure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Update Password</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>
                                Add an extra layer of security to your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <Smartphone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Authenticator App</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Use an app like Google Authenticator or Authy.
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline">Setup</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 dark:border-red-900">
                        <CardHeader>
                            <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                            <CardDescription>
                                Irreversible and destructive actions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" className="w-full sm:w-auto">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out of all devices
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function AlertCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    )
}

function AlertTriangleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}

function InfoIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    )
}
