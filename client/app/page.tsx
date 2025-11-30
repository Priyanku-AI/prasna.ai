"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

// Particle effect component
const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsla(${Math.random() * 60 + 220}, 80%, 70%, ${Math.random() * 0.5 + 0.1})`
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default function HomePage() {
  const [taskId, setTaskId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // POST create task
  const createTask = useMutation({
    mutationFn: async ({ url, question }) => {
      const res = await fetch("http://localhost:5000/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, question }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      setTaskId(data.id);
      setIsSubmitting(false);
    },
  });

  // Poll task status
  const { data: taskData } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/task/${taskId}`);
      return res.json();
    },
    enabled: !!taskId,
    refetchInterval: 2000,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = e.target.url.value;
    const question = e.target.question.value;
    createTask.mutate({ url, question });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-5 relative overflow-hidden font-['Inter']">
      <Particles />

      {/* Glass Card */}
      <div className="bg-[rgba(15,15,35,0.25)] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-10 max-w-[600px] w-full relative overflow-hidden z-10 box-border">
        {/* Inner glow effect */}
        <div 
          className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-white/10 to-white/5 -z-10 pointer-events-none"
          style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}
        />

        <h1 className="text-white text-4xl font-bold mb-2 text-center tracking-tight drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          Praśna<span className="text-purple-500">.</span>AI
        </h1>

        <p className="text-white/70 text-center mb-8 text-base font-normal">
          Ask anything about any website
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5">
            <input
              name="url"
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
              {/* Glossy overlay */}
              <div 
                className="absolute top-0 -left-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-30 transition-all duration-700 ease-in-out z-10 button-shine"
                onMouseOver={(e) => {
                  e.target.style.left = '100%';
                }}
                onMouseOut={(e) => {
                  e.target.style.left = '-100%';
                }}
              />
            </button>
          </div>
        </form>

        {/* Task Status */}
        {taskId && (
          <div className="mt-8 p-5 rounded-xl bg-black/20 border border-white/5">
            <h3 className="text-white text-base font-semibold mb-3 flex items-center gap-2">
              <span 
                className={`inline-block w-2 h-2 rounded-full ${taskData?.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-[0_0_8px_${taskData?.status === 'completed' ? '#10b981' : '#f59e0b'}]`}>
              </span>
              {taskData?.status === 'completed' ? 'Analysis Complete' : 'Analyzing Website...'}
            </h3>

            {taskData?.status === 'completed' && (
              <div className="text-white/90 leading-relaxed text-[0.95rem] whitespace-pre-line">
                {taskData.answer}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtle gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-[40vh] bg-radial-gradient(ellipse_at_top,rgba(124,58,237,0.1)_0%,rgba(0,0,0,0)_70%) pointer-events-none z-0" />

      <div className="fixed bottom-0 left-0 right-0 h-[40vh] bg-radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.1)_0%,rgba(0,0,0,0)_70%) pointer-events-none z-0" />
    </div >
  );
}
