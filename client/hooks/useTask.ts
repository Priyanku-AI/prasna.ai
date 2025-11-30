import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTask, getTaskStatus } from '@/lib/api';
import { Task, TaskFormData } from '@/types/task';

export const useTask = () => {
  const [taskId, setTaskId] = useState<string | null>(null);

  const createTaskMutation = useMutation({
    mutationFn: (data: TaskFormData) => createTask(data),
    onSuccess: (data) => {
      setTaskId(data.id);
    },
  });

  const { data: taskData } = useQuery<Task>({
    queryKey: ['task', taskId],
    queryFn: () => getTaskStatus(taskId as string),
    enabled: !!taskId,
    refetchInterval: (query) => {
      // Stop polling if the task is completed
      return query.state.data?.status === 'completed' ? false : 2000;
    },
  });

  const handleSubmit = (data: TaskFormData) => {
    createTaskMutation.mutate(data);
  };

  return {
    taskId,
    taskData,
    isSubmitting: createTaskMutation.isPending,
    onSubmit: handleSubmit,
  };
};
