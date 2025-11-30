import { Task } from '@/types/task';

interface TaskStatusProps {
  taskData: Task | null;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ taskData }) => {
  if (!taskData) return null;

  return (
    <div className="mt-8 p-5 rounded-xl bg-black/20 border border-white/5">
      <h3 className="text-white text-base font-semibold mb-3 flex items-center gap-2">
        <span 
          className={`inline-block w-2 h-2 rounded-full ${
            taskData.status === 'completed' 
              ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' 
              : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
          }`}
        />
        {taskData.status === 'completed' ? 'Analysis Complete' : 'Analyzing Website...'}
      </h3>
      
      {taskData?.status === 'completed' && (taskData.answer || taskData.result) && (
        <div className="text-white/80 text-sm whitespace-pre-line">
          {taskData.answer || taskData.result}
        </div>
      )}
      
      {taskData.status === 'failed' && taskData.error && (
        <div className="text-red-400 text-sm">
          Error: {taskData.error}
        </div>
      )}
    </div>
  );
};

export default TaskStatus;
