import { Task, TaskFormData } from "@/types/task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

export const getTaskStatus = async (taskId: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/task/${taskId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch task status');
  }
  
  return response.json();
};
