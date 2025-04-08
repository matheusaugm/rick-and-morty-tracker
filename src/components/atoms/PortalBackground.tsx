import { useEffect, useRef } from 'react';

interface PortalBackgroundProps {
  className?: string;
}

export function PortalBackground({ className }: PortalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const inboundParticles: InboundParticle[] = [];
    const colors = ["#00ff00", "#66ff66", "#99ff99", "#ccffcc"];
    const center = { x: width / 2, y: height / 2 };

    const portalRadius = Math.min(width, height) / 4;
    let portalAngle = 0;
    let swirlAngle = 0;
    let glowPulse = 0;
    let glowDirection = 1;
    let animationId: number;

    interface Particle {
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
    }

    interface InboundParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }

    function createParticle(): Particle {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * portalRadius * 0.8;
      return {
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
        angle,
        radius,
        speed: Math.random() * 0.5 + 0.2,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    for (let i = 0; i < 400; i++) {
      particles.push(createParticle());
    }

    function drawPortalBase() {
      ctx!.save();
      ctx!.translate(center.x, center.y);
      ctx!.rotate(portalAngle);

      for (let i = 0; i < 10; i++) {
        const swirlRadius = portalRadius - i * 15;
        const swirlColor = `rgba(${50 + i * 20}, 255, ${50 + i * 10}, 0.15)`;
        ctx!.beginPath();
        
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const r = swirlRadius + Math.sin(a * 6 + swirlAngle + i * 1.5) * (10 + Math.sin(a * 5 + swirlAngle * 2) * 5);
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (a === 0) {
            ctx!.moveTo(x, y);
          } else {
            ctx!.lineTo(x, y);
          }
        }
        ctx!.closePath();
        ctx!.fillStyle = swirlColor;
        ctx!.fill();
      }

      ctx!.shadowColor = 'lime';
      ctx!.shadowBlur = 30 + 20 * Math.sin(glowPulse);
      ctx!.restore();
    }

    function animate() {

      if (Math.random() < 0.5 && inboundParticles.length < 200) {
        const edge = Math.floor(Math.random() * 4);
        let x, y;
        if (edge === 0) { x = Math.random() * width; y = -10; }
        else if (edge === 1) { x = width + 10; y = Math.random() * height; }
        else if (edge === 2) { x = Math.random() * width; y = height + 10; }
        else { x = -10; y = Math.random() * height; }

        const angle = Math.atan2(center.y - y, center.x - x);

        inboundParticles.push({
          x, y,
          vx: Math.cos(angle) * (1 + Math.random()),
          vy: Math.sin(angle) * (1 + Math.random()),
          size: Math.random() * 2 + 1,
          color: `rgba(255, 255, ${100 + Math.floor(Math.random() * 100)}, 0.7)`
        });
      }
      
      ctx!.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx!.fillRect(0, 0, width, height);

      drawPortalBase();
      portalAngle += 0.002;
      swirlAngle += 0.01;
      glowPulse += glowDirection * 0.05;
      if (glowPulse > Math.PI || glowPulse < 0) glowDirection *= -1;

      particles.forEach((p) => {
        p.angle += p.speed * 0.01;
        p.radius += p.speed * 0.1;
        if (p.radius > portalRadius) {
          Object.assign(p, createParticle());
        }
        p.x = center.x + Math.cos(p.angle) * p.radius;
        p.y = center.y + Math.sin(p.angle) * p.radius;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.fill();
      });


      for (let i = inboundParticles.length - 1; i >= 0; i--) {
        const p = inboundParticles[i];
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - center.x;
        const dy = p.y - center.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < portalRadius * 0.5) {
          inboundParticles.splice(i, 1);
          continue;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }


    animate();


    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      center.x = width / 2;
      center.y = height / 2;
    };

    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -10,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          zIndex: -5,
          pointerEvents: 'none',
        }}
      />
    </>
  );
} 