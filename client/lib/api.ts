import { Task, TaskFormData } from "@/types/task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Submits a new task to the server
 * @param data - Task form data containing URL and question
 * @returns Promise resolving to the created task ID
 */
export const createTask = async (data: TaskFormData): Promise<{ id: string }> => {
  const response = await fetch(`${API_BASE_URL}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  
  return response.json();
};

/**
 * Polls the server for task status updates
 * @param taskId - ID of the task to check
 * @returns Promise resolving to the current task state
 */
export const getTaskStatus = async (taskId: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/task/${taskId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch task status');
  }
  
  return response.json();
};