import { API_BASE_URL } from "./api";


type TaskStatusResponse = {
    state: string;
    result?: {
        checkout_url: string;
        id: string;
        Data?: {
            url?: string;
        };
        reference: string;
    };
    error?: string;
};

async function fetchTaskStatus(taskId: string, interval = 10000): Promise<TaskStatusResponse> {
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/payments/get-task-status/?task_id=${taskId}`);
                const data: TaskStatusResponse = await response.json();

                if (data.state === 'SUCCESS') {
                    clearInterval(intervalId);
                    resolve(data);
                } else if (data.state === 'FAILURE') {
                    clearInterval(intervalId);
                    reject(new Error(data.error || 'Task failed'));
                }
            } catch (error) {
                clearInterval(intervalId);
                reject(new Error('Unable to fetch task status: ' + (error as Error).message));
            }
        }, interval);
    });
}

export default fetchTaskStatus;