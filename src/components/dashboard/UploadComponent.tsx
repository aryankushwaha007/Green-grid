"use client";

import { useState } from 'react';
import { uploadImage, uploadCSV } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, FileText, Image as ImageIcon } from 'lucide-react';

export function UploadComponent({ facilityId = "facility-001" }: { facilityId?: string }) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await uploadImage(e.target.files[0], facilityId);
            setResult(res);
        } catch (err) {
            // Display the actual error message from the API or network error
            const errorMessage = err instanceof Error ? err.message : "Failed to upload image. Please try again.";
            setError(errorMessage);
            console.error('Upload error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await uploadCSV(e.target.files[0], facilityId);
            setResult(res);
        } catch (err) {
            // Display the actual error message from the API or network error
            const errorMessage = err instanceof Error ? err.message : "Failed to upload CSV. Please try again.";
            setError(errorMessage);
            console.error('Upload error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Data Upload</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="image">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="image">Solar Panel Image</TabsTrigger>
                        <TabsTrigger value="csv">IoT Sensor CSV</TabsTrigger>
                    </TabsList>

                    <TabsContent value="image" className="space-y-4">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 transition-colors">
                            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-4">Upload panel image for defect detection</p>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={loading}
                                className="max-w-xs"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="csv" className="space-y-4">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 transition-colors">
                            <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-4">Upload sensor data CSV</p>
                            <Input
                                type="file"
                                accept=".csv"
                                onChange={handleCSVUpload}
                                disabled={loading}
                                className="max-w-xs"
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {loading && (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>Processing...</span>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold mb-2">Result:</h3>
                        {result.detections ? (
                            <div className="space-y-2">
                                <p><strong>Gemini Suggestion:</strong> {result.gemini_suggestion}</p>
                                <p><strong>Detections:</strong> {result.detections.length} found</p>
                                <ul className="list-disc pl-5 text-sm">
                                    {result.detections.map((d: any, i: number) => (
                                        <li key={i}>{d.class} ({Math.round(d.confidence * 100)}%)</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
