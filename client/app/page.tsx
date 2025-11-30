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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <Particles />

      {/* Glass Card */}
      <div style={{
        background: 'rgba(15, 15, 35, 0.25)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        boxSizing: 'border-box',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}>
        {/* Inner glow effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '24px',
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none',
          zIndex: -1
        }} />

        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '8px',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
          letterSpacing: '-0.5px'
        }}>
          Praśna<span style={{ color: '#a855f7' }}>.</span>AI
        </h1>

        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '1rem',
          fontWeight: 400
        }}>
          Ask anything about any website
        </p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '20px' }}>
            <input
              name="url"
              placeholder="Paste website link & ask anything..."
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                marginBottom: '16px',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                e.target.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />

            <textarea
              name="question"
              placeholder="Example: What are the key features of this website?"
              required
              rows={4}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                resize: 'vertical',
                minHeight: '120px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                e.target.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #2DD4BF 100%)',
            padding: '2px',
            boxShadow: '0 4px 20px -5px rgba(139, 92, 246, 0.5)',
            transform: 'perspective(500px) rotateX(2deg)',
            transition: 'all 0.3s ease',
            overflow: 'hidden'
          }}
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
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #2DD4BF 100%)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
                opacity: isSubmitting ? 0.7 : 1,
                pointerEvents: isSubmitting ? 'none' : 'auto',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                boxShadow: 'inset 0 4px 15px rgba(255,255,255,0.2), inset 0 -4px 15px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                {isSubmitting ? 'Processing...' : 'Reveal →'}
              </span>
              {/* Glossy overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '200%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'rotate(-30deg)',
                transition: 'left 0.7s ease-in-out',
                zIndex: 1
              }}
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
          <div style={{
            marginTop: '32px',
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <h3 style={{
              color: 'white',
              marginTop: 0,
              marginBottom: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: taskData?.status === 'completed' ? '#10b981' : '#f59e0b',
                boxShadow: `0 0 8px ${taskData?.status === 'completed' ? '#10b981' : '#f59e0b'}`
              }}></span>
              {taskData?.status === 'completed' ? 'Analysis Complete' : 'Analyzing Website...'}
            </h3>

            {taskData?.status === 'completed' && (
              <div style={{
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
                fontSize: '0.95rem',
                whiteSpace: 'pre-line'
              }}>
                {taskData.answer}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtle gradient overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '40vh',
        background: 'radial-gradient(ellipse at top, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40vh',
        background: 'radial-gradient(ellipse at bottom, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
    </div >
  );
}
