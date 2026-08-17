<template>
  <!-- Replay trigger -->
  <button
    @click="open"
    class="fixed top-4 right-4 z-40 w-11 h-11 flex items-center justify-center bg-[#a855f7]/20 hover:bg-[#a855f7]/30 backdrop-blur-md rounded-xl border border-[#a855f7]/30 text-[#a855f7] hover:text-[#ec4899] font-orbitron font-bold transition-all hover:scale-105"
    aria-label="Show quick tour"
    title="Quick tour"
  >
    ?
  </button>

  <!-- Tour modal -->
  <transition name="tour-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="w-full max-w-md bg-gradient-to-br from-[#0b0014] to-[#1a0033] border border-[#a855f7]/30 rounded-2xl shadow-2xl p-6 sm:p-8 relative">
        <button
          @click="close"
          class="absolute top-4 right-4 text-gray-500 hover:text-[#ec4899] transition-colors"
          aria-label="Close tour"
        >
          ✕
        </button>

        <p class="text-xs uppercase tracking-widest text-[#a855f7]/70 font-poppins font-semibold mb-1">
          Quick Tour · {{ stepIndex + 1 }}/{{ steps.length }}
        </p>

        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 text-[#a855f7]">
            <component :is="currentStep.icon" class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold font-orbitron text-white">{{ currentStep.title }}</h3>
        </div>

        <p class="text-gray-300 font-poppins leading-relaxed mb-6">
          {{ currentStep.text }}
        </p>

        <!-- Progress dots -->
        <div class="flex items-center gap-2 mb-6">
          <span
            v-for="(step, i) in steps"
            :key="step.title"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="i === stepIndex ? 'w-6 bg-gradient-to-r from-[#a855f7] to-[#ec4899]' : 'w-1.5 bg-[#a855f7]/20'"
          />
        </div>

        <div class="flex items-center justify-between gap-3">
          <button
            @click="close"
            class="text-sm text-gray-500 hover:text-gray-300 font-poppins transition-colors"
          >
            Skip
          </button>

          <div class="flex items-center gap-3">
            <button
              v-if="stepIndex > 0"
              @click="stepIndex--"
              class="px-4 py-2 rounded-lg border border-[#a855f7]/30 text-[#a855f7] hover:bg-[#a855f7]/10 font-poppins text-sm font-semibold transition-all"
            >
              Back
            </button>
            <button
              @click="next"
              class="px-5 py-2 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-poppins text-sm font-semibold hover:scale-105 transition-transform"
            >
              {{ isLastStep ? "Got it" : "Next" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, h } from "vue";

const STORAGE_KEY = "portfolio-tour-seen";

const svgBase = (attrs) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  ...attrs,
});

const RocketIcon = (_, { attrs }) => h("svg", svgBase(attrs), [
  h("path", { d: "M12 2S8 5.5 8 11v1H6l-2 3h4v2.5l2 .5 2-.5V15h4l-2-3h-2v-1c0-5.5-2-9-2-9z" }),
  h("circle", { cx: "12", cy: "8.5", r: "1.5" }),
]);

const PlanetIcon = (_, { attrs }) => h("svg", svgBase(attrs), [
  h("circle", { cx: "12", cy: "12", r: "4.5" }),
  h("ellipse", { cx: "12", cy: "12", rx: "10.5", ry: "3.5", transform: "rotate(-25 12 12)" }),
]);

const UfoIcon = (_, { attrs }) => h("svg", svgBase(attrs), [
  h("ellipse", { cx: "12", cy: "14", rx: "9", ry: "3" }),
  h("path", { d: "M7 14c0-3 2.5-6 5-6s5 3 5 6" }),
  h("circle", { cx: "12", cy: "8", r: "1.5" }),
  h("circle", { cx: "8", cy: "14", r: ".5", fill: "currentColor" }),
  h("circle", { cx: "12", cy: "16", r: ".5", fill: "currentColor" }),
  h("circle", { cx: "16", cy: "14", r: ".5", fill: "currentColor" }),
]);

const StarIcon = (_, { attrs }) => h("svg", svgBase(attrs), [
  h("polygon", { points: "12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" }),
]);

const SatelliteIcon = (_, { attrs }) => h("svg", svgBase(attrs), [
  h("path", { d: "M4.93 4.93a9.9 9.9 0 0 1 14.14 0" }),
  h("path", { d: "M7.76 7.76a5.66 5.66 0 0 1 8 0" }),
  h("path", { d: "M10.6 10.6a1.41 1.41 0 0 1 2 0" }),
  h("line", { x1: "12", y1: "12", x2: "12", y2: "20" }),
  h("line", { x1: "8.5", y1: "20", x2: "15.5", y2: "20" }),
]);

const steps = [
  {
    icon: RocketIcon,
    title: "Home",
    text: "The landing page — a quick intro with one-click links to jump straight to my work, get in touch, or download my CV.",
  },
  {
    icon: PlanetIcon,
    title: "About",
    text: "My background: work experience, education and certificates — the full story.",
  },
  {
    icon: UfoIcon,
    title: "Projects",
    text: "Live GitHub repos pulled in automatically. Click a card to open the repo, or hit ▶ View Live Demo for a live demo where one exists.",
  },
  {
    icon: StarIcon,
    title: "Skills",
    text: "Languages, frameworks, databases and tools I work with, grouped by category.",
  },
  {
    icon: SatelliteIcon,
    title: "Contact",
    text: "Send a message directly, or find me on email, GitHub or LinkedIn. Use the icons on the left (or the menu button on mobile) to jump between all of these anytime.",
  },
];

const isOpen = ref(false);
const stepIndex = ref(0);

const currentStep = computed(() => steps[stepIndex.value]);
const isLastStep = computed(() => stepIndex.value === steps.length - 1);

const open = () => {
  stepIndex.value = 0;
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
  localStorage.setItem(STORAGE_KEY, "true");
};

const next = () => {
  if (isLastStep.value) {
    close();
  } else {
    stepIndex.value++;
  }
};

const onKeydown = (e) => {
  if (e.key === "Escape") close();
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  if (!localStorage.getItem(STORAGE_KEY)) {
    setTimeout(open, 1000);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.tour-fade-enter-active,
.tour-fade-leave-active {
  transition: opacity 0.25s ease;
}

.tour-fade-enter-from,
.tour-fade-leave-to {
  opacity: 0;
}
</style>
