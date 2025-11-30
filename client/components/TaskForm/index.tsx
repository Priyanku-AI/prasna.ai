import { FC, FormEvent } from 'react';
import { TaskFormData } from '@/types/task';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  isSubmitting: boolean;
}

const TaskForm: FC<TaskFormProps> = ({ onSubmit, isSubmitting }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: TaskFormData = {
      url: formData.get('url') as string,
      question: formData.get('question') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-5">
        <input
          name="url"
          type="url"
          placeholder="Paste website link & ask anything..."
          required
          className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white text-base outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 mb-4"
        />

        <textarea
          name="question"
          placeholder="Example: What are the key features of this website?"
          required
          rows={4}
          className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white text-base outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 resize-y min-h-[120px] font-sans"
        />
      </div>

      <div 
        className="relative w-full rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 p-0.5 shadow-[0_4px_20px_-5px_rgba(139,92,246,0.5)] transform perspective-500 rotate-x-1 transition-all duration-300 overflow-hidden hover:rotate-x-2 hover:scale-102 hover:shadow-[0_8px_30px_-5px_rgba(139,92,246,0.7)]"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'perspective(500px) rotateX(5deg) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 30px -5px rgba(139, 92, 246, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'perspective(500px) rotateX(2deg)';
          e.currentTarget.style.boxShadow = '0 4px 20px -5px rgba(139, 92, 246, 0.5)';
        }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-4 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-white text-base font-bold tracking-wide border-none cursor-pointer relative overflow-hidden z-10 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
          style={{
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            boxShadow: 'inset 0 4px 15px rgba(255,255,255,0.2), inset 0 -4px 15px rgba(0,0,0,0.2)'
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? 'Processing...' : 'Reveal →'}
          </span>
          <div 
            className="absolute top-0 -left-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-30 transition-all duration-700 ease-in-out z-10 button-shine"
            onMouseOver={(e) => {
              e.currentTarget.style.left = '100%';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.left = '-100%';
            }}
          />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
