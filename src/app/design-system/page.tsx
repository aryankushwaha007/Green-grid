import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DesignSystemPage() {
    return (
        <div className="container mx-auto py-10 space-y-10">
            <h1 className="text-4xl font-bold">GreenGrid Design System</h1>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Typography</h2>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">Heading 1 (4xl)</h1>
                    <h2 className="text-3xl font-bold">Heading 2 (3xl)</h2>
                    <h3 className="text-2xl font-bold">Heading 3 (2xl)</h3>
                    <h4 className="text-xl font-bold">Heading 4 (xl)</h4>
                    <p className="text-base">Body text (base). The quick brown fox jumps over the lazy dog.</p>
                    <p className="text-sm text-muted-foreground">Small text (sm) with muted foreground.</p>
                    <code className="text-sm bg-muted p-1 rounded">Monospace code</code>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-primary text-primary-foreground rounded-md">Primary</div>
                    <div className="p-4 bg-secondary text-secondary-foreground rounded-md">Secondary</div>
                    <div className="p-4 bg-destructive text-destructive-foreground rounded-md">Destructive</div>
                    <div className="p-4 bg-muted text-muted-foreground rounded-md">Muted</div>
                    <div className="p-4 bg-accent text-accent-foreground rounded-md">Accent</div>
                    <div className="p-4 bg-card text-card-foreground rounded-md border">Card</div>
                    <div className="p-4 bg-popover text-popover-foreground rounded-md border">Popover</div>
                    <div className="p-4 bg-background text-foreground rounded-md border">Background</div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Components</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Default Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Button</Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>This is a card component using the design system.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
