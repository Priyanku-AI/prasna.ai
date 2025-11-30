import { Task } from '@/types/task';

interface TaskStatusProps {
  taskData: Task | null;
  isFetching?: boolean;
  isError?: boolean;
  error?: Error | null;
}

const Loader = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const TaskStatus: React.FC<TaskStatusProps> = ({ 
  taskData, 
  isFetching = false, 
  isError = false, 
  error = null 
}) => {
  if (!taskData && !isFetching) return null;

  const showLoading = isFetching || (taskData?.status === 'pending' || taskData?.status === 'processing');
  const showError = isError || taskData?.status === 'failed';
  const showResult = !isFetching && taskData?.status === 'completed' && (taskData.answer || taskData.result);

  return (
    <div className="mt-8 p-5 rounded-xl bg-black/20 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          {showLoading ? (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />
              Analyzing...
            </>
          ) : showError ? (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              {taskData?.status === 'failed' ? 'Processing Failed' : 'Error'}
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              Analysis Complete
            </>
          )}
        </h3>
        {showLoading && <span className="text-xs text-white/50">This may take a moment...</span>}
      </div>
      
      {showLoading && <Loader />}
      
      {showResult && (
        <div className="text-white/80 text-sm whitespace-pre-line">
          {taskData?.answer || taskData?.result}
        </div>
      )}
      
      {showError && (
        <div className="text-red-400 text-sm">
          Error: {error?.message || taskData?.error || 'An unknown error occurred'}
        </div>
      )}
    </div>
  );
};

export default TaskStatus;
