<template>
  <div class="fixed top-0 left-0 w-full h-full -z-10">
    <!-- Nebula Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-cosmic-dark via-cosmic-purple to-cosmic-dark opacity-95"></div>
    <div class="absolute inset-0 bg-gradient-radial from-transparent via-purple-950/70 to-black/80"></div>
    
    <!-- Animated Stars Canvas -->
    <canvas
      ref="canvasRef"
      class="absolute top-0 left-0 w-full h-full"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
let animationFrameId = null;
let stars = [];
let shootingStars = [];
let lastShootingStar = 0;
let resizeHandler = null;
let visibilityHandler = null;
let isVisible = true;

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  resizeHandler = resizeCanvas;
  window.addEventListener('resize', resizeHandler);

  // Pause animation when tab is not visible
  visibilityHandler = () => {
    isVisible = !document.hidden;
    if (isVisible && !animationFrameId) {
      animate();
    }
  };
  document.addEventListener('visibilitychange', visibilityHandler);

  // Create stars with cosmic colors
  const starCount = 200;
  stars = [];
  
  for (let i = 0; i < starCount; i++) {
    const starType = Math.random();
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: starType > 0.85 ? Math.random() * 2.5 + 1 : Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.9 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      color: starType > 0.95 ? 'neon-blue' : starType > 0.85 ? 'neon-purple' : starType > 0.7 ? 'neon-magenta' : 'white',
    });
  }

  // Animation loop
  const animate = () => {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create shooting star every 3 seconds
    const now = Date.now();
    if (now - lastShootingStar > 3000) {
      shootingStars.push({
        x: -80,
        y: Math.random() * canvas.height * 0.8,
        speed: 8 + Math.random() * 4,
        life: 1,
        decay: 0.012
      });
      lastShootingStar = now;
    }

    // Draw shooting stars with neon trail
    shootingStars.forEach((shootingStar, index) => {
      const gradient = ctx.createLinearGradient(shootingStar.x - 40, shootingStar.y, shootingStar.x, shootingStar.y);
      gradient.addColorStop(0, `rgba(147, 51, 234, 0)`);
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${shootingStar.life * 0.8})`);
      gradient.addColorStop(1, `rgba(236, 72, 153, ${shootingStar.life})`);
      
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(236, 72, 153, 0.6)';
      ctx.moveTo(shootingStar.x - 40, shootingStar.y);
      ctx.lineTo(shootingStar.x, shootingStar.y);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      shootingStar.x += shootingStar.speed;
      shootingStar.life -= shootingStar.decay;
      
      if (shootingStar.x > canvas.width + 50 || shootingStar.life <= 0) {
        shootingStars.splice(index, 1);
      }
    });

    stars.forEach((star) => {
      // Twinkle effect
      star.opacity += star.twinkleSpeed;
      if (star.opacity > 1 || star.opacity < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      // Slow drift
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }

      // Draw star with cosmic colors and glow
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      
      if (star.color === 'neon-blue') {
        ctx.fillStyle = `rgba(59, 130, 246, ${star.opacity})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
      } else if (star.color === 'neon-purple') {
        ctx.fillStyle = `rgba(147, 51, 234, ${star.opacity})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(147, 51, 234, 0.7)';
      } else if (star.color === 'neon-magenta') {
        ctx.fillStyle = `rgba(236, 72, 153, ${star.opacity})`;
        ctx.shadowBlur = 16;
        ctx.shadowColor = 'rgba(236, 72, 153, 0.6)';
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        if (star.radius > 0.8) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        }
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler);
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>






