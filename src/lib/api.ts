export const API_BASE_URL = '/api/py';

export async function fetchFacilities() {
    const res = await fetch(`${API_BASE_URL}/facilities`);
    if (!res.ok) throw new Error('Failed to fetch facilities');
    return res.json();
}

export async function uploadImage(file: File, facilityId: string) {
    console.log("Uploading to:", `${API_BASE_URL}/upload/image`);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch(`${API_BASE_URL}/upload/image?facility_id=${facilityId}`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            // Try to get detailed error message from response
            let errorMessage = 'Failed to upload image';
            try {
                const errorData = await res.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch {
                // If response is not JSON, use status text
                errorMessage = `${errorMessage}: ${res.status} ${res.statusText}`;
            }
            throw new Error(errorMessage);
        }
        return res.json();
    } catch (error) {
        // Check if it's a network error (backend not running)
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Cannot connect to backend server. Please ensure the backend is running on port 8000.');
        }
        // Re-throw other errors
        throw error;
    }
}

export async function uploadCSV(file: File, facilityId: string) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch(`${API_BASE_URL}/upload/csv?facility_id=${facilityId}`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            // Try to get detailed error message from response
            let errorMessage = 'Failed to upload CSV';
            try {
                const errorData = await res.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch {
                // If response is not JSON, use status text
                errorMessage = `${errorMessage}: ${res.status} ${res.statusText}`;
            }
            throw new Error(errorMessage);
        }
        return res.json();
    } catch (error) {
        // Check if it's a network error (backend not running)
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Cannot connect to backend server. Please ensure the backend is running on port 8000.');
        }
        // Re-throw other errors
        throw error;
    }
}
