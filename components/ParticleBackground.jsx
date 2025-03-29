'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const numParticles = Math.min(100, Math.floor((width * height) / 10000));
    const connectionDistance = 150;
    const mouseRadius = 150;

    let mouse = {
      x: width / 2,
      y: height / 2,
      active: false,
    };

    // Redimensionar canvas ao redimensionar a janela
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    // Acompanhar movimento do mouse
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Iniciar partículas
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          initialColor: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
          activeColor: `rgba(150, 255, 150, ${Math.random() * 0.8 + 0.2})`,
        });
      }
    };

    // Desenhar as partículas
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Atualizar e desenhar cada partícula
      particles.forEach((particle, i) => {
        // Mover partícula
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Verificar limites
        if (particle.x < 0 || particle.x > width) {
          particle.vx = -particle.vx;
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy = -particle.vy;
        }

        // Verificar proximidade com o mouse
        let mouseProximity = 1;
        if (mouse.active) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            mouseProximity = distance / mouseRadius;

            // Mover partículas levemente na direção oposta ao mouse
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseRadius - distance) / mouseRadius;

            particle.vx -= forceDirectionX * force * 0.05;
            particle.vy -= forceDirectionY * force * 0.05;
          }
        }

        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          mouseProximity < 1 ? particle.activeColor : particle.initialColor;
        ctx.fill();

        // Conectar com outras partículas próximas
        for (let j = i + 1; j < particles.length; j++) {
          const particle2 = particles[j];
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(drawParticles);
    };

    // Iniciar animação
    initParticles();
    drawParticles();

    // Adicionar event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
