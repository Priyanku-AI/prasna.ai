"use client";

import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { useTask } from '@/hooks/useTask';
import TaskForm from '@/components/TaskForm';
import TaskStatus from '@/components/TaskStatus';

// Dynamically import Particles component with SSR disabled
const Particles = dynamic(
  () => import('@/components/Particles'),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  const { taskData, isSubmitting, onSubmit } = useTask();

  return (
    <div className={`min-h-screen bg-black flex flex-col items-center justify-center p-5 relative overflow-hidden ${inter.className}`}>
      <Particles />

      {/* Subtle gradient overlays */}
      <div className="fixed top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none z-0" />

      {/* Glass Card */}
      <div className="bg-[rgba(15,15,35,0.25)] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-10 max-w-[600px] w-full relative overflow-hidden z-10 box-border">
        {/* Inner glow effect */}
        <div 
          className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-white/10 to-white/5 -z-10 pointer-events-none"
          style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}
        />

        <h1 className="text-white text-4xl font-bold mb-2 text-center tracking-tight drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          Praśna<span className="text-purple-500">.</span>AI
        </h1>

        <p className="text-white/70 text-center mb-8 text-base font-normal">
          Ask anything about any website
        </p>

        <TaskForm 
          onSubmit={onSubmit} 
          isSubmitting={isSubmitting} 
        />

        {taskData && <TaskStatus taskData={taskData} />}
      </div>
    </div>
  );
}
