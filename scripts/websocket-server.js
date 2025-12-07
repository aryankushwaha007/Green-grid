const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

console.log('WebSocket server started on port 8000');

const facilities = ['facility-001', 'facility-002', 'facility-003'];

wss.on('connection', (ws) => {
    console.log('Client connected');
    let subscribedFacility = null;
    let intervalId = null;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'subscribe' && data.facility_id) {
                subscribedFacility = data.facility_id;
                console.log(`Client subscribed to ${subscribedFacility}`);

                // Send initial data immediately
                sendData(ws, subscribedFacility);

                // Clear existing interval if any
                if (intervalId) clearInterval(intervalId);

                // Send updates every 3 seconds
                intervalId = setInterval(() => {
                    sendData(ws, subscribedFacility);
                }, 3000);
            }
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        if (intervalId) clearInterval(intervalId);
    });
});

function sendData(ws, facilityId) {
    if (ws.readyState === WebSocket.OPEN) {
        const data = generateMockData(facilityId);
        ws.send(JSON.stringify(data));
    }
}

function generateMockData(facilityId) {
    const timestamp = new Date().toISOString();

    // Random variations based on facility type simulation
    const baseTemp = 30 + Math.random() * 5;
    const basePower = 4 + Math.random() * 0.5;
    const baseEfficiency = 90 + Math.random() * 5;

    return {
        facility_id: facilityId,
        timestamp,
        temperature: parseFloat(baseTemp.toFixed(1)),
        vibration: parseFloat((0.5 + Math.random() * 0.2).toFixed(2)),
        power_output: parseFloat(basePower.toFixed(2)),
        efficiency: parseFloat(baseEfficiency.toFixed(1)),
        status: Math.random() > 0.95 ? 'warning' : 'healthy' // Occasional random warning
    };
}
