// src/lib/api.ts
interface ApiFetchOptions<T = any> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: T;
    headers?: Record<string, string>;
}

export async function apiFetch<Payload = any>(
    endpoint: string,
    options: ApiFetchOptions<Payload> = {}
): Promise<Response> {
    const config: RequestInit = {
        method: options.method || 'GET',
        headers: {
            'Content-Type': 'application/json', // Set once here
            ...options.headers,
        },
    };

    if (options.data !== undefined) {
        config.body = JSON.stringify(options.data);
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${baseUrl}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: `HTTP error! status: ${response.status}`,
            status: response.status
        }));
        throw error; // Throw the full error object
    }

    return response;
}