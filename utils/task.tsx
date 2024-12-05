import { API_BASE_URL } from "./api";


type TaskStatusResponse = {
    state: string;
    result?: {
        CodeRetour: number;
        DescRetour: string;
        Data?: {
            url?: string;
        };
        reference: string;
    };
    error?: string;
};

async function fetchTaskStatus(taskId: string, interval = 2000): Promise<TaskStatusResponse> {
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/get-task-status?task_id=${taskId}`);
                const data: TaskStatusResponse = await response.json();

                if (data.state === 'SUCCESS') {
                    clearInterval(intervalId); // Arrête le polling
                    resolve(data); // Retourne les données
                } else if (data.state === 'FAILURE') {
                    clearInterval(intervalId); // Arrête le polling
                    reject(new Error(data.error || 'Task failed'));
                }
            } catch (error) {
                clearInterval(intervalId); // Arrête le polling en cas d'erreur
                reject(new Error('Unable to fetch task status: ' + (error as Error).message));
            }
        }, interval);
    });
}

export default fetchTaskStatus;