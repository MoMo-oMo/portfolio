<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 md:px-12 lg:px-24 py-20 ml-0 md:ml-20 lg:ml-24"
  >
    <div class="max-w-4xl w-full">
      <div class="space-y-6 md:space-y-8 animate-fade-in">
        <h1
          class="text-4xl sm:text-5xl md:text-7xl font-bold font-orbitron text-white glow-text leading-tight"
        >
          Hi, I'm
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]"
            >Mohammed Yaseen Khan</span
          >
        </h1>
        <p class="text-base sm:text-xl md:text-2xl text-gray-300 font-poppins">
          Software Developer — Vue 3, Firebase & mobile apps at Right Click Digital.
        </p>

        <div
          class="text-lg sm:text-2xl md:text-3xl text-gray-300 font-poppins min-h-[2rem] md:min-h-[3rem]"
        >
          <span>{{ typedText }}</span
          ><span class="blinking-caret text-[#a855f7]">|</span>
        </div>

        <div class="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
          <router-link
            to="/projects"
            class="group relative px-8 py-4 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl font-semibold text-lg overflow-hidden hover:scale-105 transition-transform glow-button"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-20 transition-opacity blur-xl"
            />
            <span class="relative z-10 flex items-center gap-2 text-white">
              View My Work
              <span
                class="inline-block transform group-hover:translate-x-1 transition-transform"
                >→</span
              >
            </span>
          </router-link>

          <router-link
            to="/contact"
            class="group relative px-8 py-4 bg-transparent border-2 border-[#a855f7] rounded-xl font-semibold text-lg overflow-hidden hover:scale-105 transition-all hover:bg-[#a855f7]/10 glow-button-outline"
          >
            <span
              class="relative z-10 flex items-center gap-2 text-[#a855f7] group-hover:text-[#ec4899]"
            >
              Contact Me
              <span
                class="inline-block transform group-hover:translate-x-1 transition-transform"
                >→</span
              >
            </span>
          </router-link>

          <a
            href="/Mohammed-Yaseen-Khan-CV.pdf"
            download
            class="group relative px-8 py-4 bg-transparent border-2 border-[#a855f7] rounded-xl font-semibold text-lg overflow-hidden hover:scale-105 transition-all hover:bg-[#a855f7]/10 glow-button-outline"
          >
            <span
              class="relative z-10 flex items-center gap-2 text-[#a855f7] group-hover:text-[#ec4899]"
            >
              Download CV
              <span
                class="inline-block transform group-hover:translate-x-1 transition-transform"
                >↓</span
              >
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const typedText = ref("");
const subtitle = "Developer | Dreamer | Explorer of Code & Cosmos.";
let charIndex = 0;
let intervalId = null;

const type = () => {
  if (charIndex < subtitle.length) {
    typedText.value += subtitle[charIndex];
    charIndex++;
  } else {
    clearInterval(intervalId);
  }
};

onMounted(() => {
  setTimeout(() => {
    intervalId = setInterval(type, 50);
  }, 500);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.blinking-caret {
  animation: blink 1s step-start infinite;
}

.glow-text {
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.5),
    0 0 40px rgba(168, 85, 247, 0.3);
}

.glow-button {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2);
}

.glow-button-outline {
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
}
</style>
