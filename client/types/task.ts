export interface Task {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: string;
  answer?: string;
  error?: string;
}

export interface TaskFormData {
  url: string;
  question: string;
}

export interface TaskStatusProps {
  taskId: string | null;
  taskData: Task | null;
}
