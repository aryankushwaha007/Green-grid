import { useEffect, useState } from 'react';

export interface RealtimeData {
    facility_id: string;
    timestamp: string;
    temperature: number;
    vibration: number;
    power_output: number;
    efficiency: number;
    status: 'healthy' | 'warning' | 'critical';
}

export function useRealtimeData(facilityId: string) {
    const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error' | 'disconnected'>('connecting');

    useEffect(() => {
        if (!facilityId) return;

        const ws = new WebSocket('ws://localhost:8000');

        ws.onopen = () => {
            setConnectionStatus('connected');
            ws.send(JSON.stringify({
                type: 'subscribe',
                facility_id: facilityId
            }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setRealtimeData(data);
            } catch (e) {
                console.error('Failed to parse websocket message', e);
            }
        };

        ws.onerror = () => setConnectionStatus('error');
        ws.onclose = () => setConnectionStatus('disconnected');

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [facilityId]);

    return { realtimeData, connectionStatus };
}
