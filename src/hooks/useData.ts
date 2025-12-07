import useSWR from 'swr';
import { Facility, Alert, Task } from '@/lib/db';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFacilities() {
    const { data, error, isLoading } = useSWR<Facility[]>('/api/facilities', fetcher);
    return {
        facilities: data,
        isLoading,
        isError: error,
    };
}

export function useFacility(id: string) {
    const { data, error, isLoading } = useSWR<Facility>(id ? `/api/facilities/${id}` : null, fetcher);
    return {
        facility: data,
        isLoading,
        isError: error,
    };
}

export function useAlerts() {
    const { data, error, isLoading, mutate } = useSWR<Alert[]>('/api/alerts', fetcher);

    const updateAlert = async (id: string, updates: Partial<Alert>) => {
        // Optimistic update
        mutate(data?.map(a => a.id === id ? { ...a, ...updates } : a), false);
        // In a real app, send request to API
        return { ...data?.find(a => a.id === id), ...updates };
    };

    return {
        alerts: data,
        isLoading,
        isError: error,
        updateAlert
    };
}

export function useTasks() {
    const { data, error, isLoading, mutate } = useSWR<Task[]>('/api/tasks', fetcher);

    const createTask = async (newTask: Partial<Task>) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            const created = await response.json();
            mutate([...(data || []), created]);
            return created;
        } catch (e) {
            console.error('Failed to create task', e);
            throw e;
        }
    };

    const updateTask = async (id: string, updates: Partial<Task>) => {
        mutate(data?.map(t => t.id === id ? { ...t, ...updates } : t), false);
        return { ...data?.find(t => t.id === id), ...updates };
    };

    return {
        tasks: data,
        isLoading,
        isError: error,
        createTask,
        updateTask
    };
}
