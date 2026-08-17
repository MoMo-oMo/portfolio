<template>
  <!-- Mobile Navigation Toggle -->
  <button
    @click="toggleMobile"
    class="md:hidden fixed top-4 left-4 z-50 p-3 bg-[#a855f7]/20 backdrop-blur-md rounded-xl border border-[#a855f7]/30"
    aria-label="Toggle navigation"
    :aria-expanded="isMobileOpen"
  >
    <svg class="w-6 h-6 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <!-- Mobile Backdrop -->
  <div
    v-if="isMobileOpen"
    class="fixed inset-0 z-40 bg-black/60 md:hidden"
    @click="toggleMobile"
  />

  <nav
    :class="[
      'fixed left-0 top-0 h-screen transition-all duration-300 z-50',
      'md:block',
      isExpanded ? 'md:w-56' : 'md:w-20',
      isMobileOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full',
      'md:translate-x-0'
    ]"
  >
    <div class="h-full bg-gradient-to-b from-[#0b0014]/95 to-[#1a0033]/95 backdrop-blur-md border-r border-[#a855f7]/20 flex flex-col items-center py-8">
      <div class="hidden md:flex w-full px-3 mb-6" :class="isExpanded ? 'justify-end' : 'justify-center'">
        <button
          @click="isExpanded = !isExpanded"
          class="flex items-center justify-center w-10 h-10 rounded-xl text-[#a855f7]/50 hover:text-[#ec4899] hover:bg-[#a855f7]/10 transition-all duration-300"
          :aria-label="isExpanded ? 'Collapse navigation' : 'Expand navigation'"
          :aria-expanded="isExpanded"
        >
          <svg
            class="w-5 h-5 transition-transform duration-300"
            :class="isExpanded ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="flex flex-col gap-6 w-full px-3">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="isMobileOpen = false"
          class="relative group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          :class="[
            route.path === item.to
              ? 'bg-[#a855f7]/20 text-[#a855f7] glow-item'
              : 'text-[#a855f7]/40 hover:text-[#ec4899] hover:bg-[#a855f7]/10'
          ]"
        >
          <component
            :is="item.icon"
            class="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            :class="route.path === item.to
              ? 'text-[#a855f7] drop-shadow-[0_0_8px_rgba(168,85,247,1)]'
              : 'text-[#a855f7]/40 group-hover:text-[#ec4899] group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.9)]'"
          />
          <span
            v-show="isExpanded || isMobileOpen"
            class="text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 font-poppins"
            :class="route.path === item.to ? 'text-[#a855f7]' : 'text-[#a855f7]/40 group-hover:text-[#ec4899]'"
          >
            {{ item.label }}
          </span>

          <!-- Active indicator glow -->
          <div
            v-if="route.path === item.to"
            class="absolute right-0 w-1 h-8 bg-gradient-to-b from-[#a855f7] to-[#ec4899] rounded-l-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
          />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, h } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isExpanded = ref(false);
const isMobileOpen = ref(false);

const toggleMobile = () => {
  isMobileOpen.value = !isMobileOpen.value;
};

const svgBase = (attrs) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '1.5',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  ...attrs,
})

// Rocket — Home
const RocketIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('path', { d: 'M12 2S8 5.5 8 11v1H6l-2 3h4v2.5l2 .5 2-.5V15h4l-2-3h-2v-1c0-5.5-2-9-2-9z' }),
  h('circle', { cx: '12', cy: '8.5', r: '1.5' }),
])

// Planet — About
const PlanetIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('circle', { cx: '12', cy: '12', r: '4.5' }),
  h('ellipse', { cx: '12', cy: '12', rx: '10.5', ry: '3.5', transform: 'rotate(-25 12 12)' }),
])

// UFO — Projects
const UfoIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('ellipse', { cx: '12', cy: '14', rx: '9', ry: '3' }),
  h('path', { d: 'M7 14c0-3 2.5-6 5-6s5 3 5 6' }),
  h('circle', { cx: '12', cy: '8', r: '1.5' }),
  h('circle', { cx: '8', cy: '14', r: '.5', fill: 'currentColor' }),
  h('circle', { cx: '12', cy: '16', r: '.5', fill: 'currentColor' }),
  h('circle', { cx: '16', cy: '14', r: '.5', fill: 'currentColor' }),
])

// Star — Skills
const StarIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('polygon', { points: '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26' }),
])

// Satellite dish — Contact
const SatelliteIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('path', { d: 'M4.93 4.93a9.9 9.9 0 0 1 14.14 0' }),
  h('path', { d: 'M7.76 7.76a5.66 5.66 0 0 1 8 0' }),
  h('path', { d: 'M10.6 10.6a1.41 1.41 0 0 1 2 0' }),
  h('line', { x1: '12', y1: '12', x2: '12', y2: '20' }),
  h('line', { x1: '8.5', y1: '20', x2: '15.5', y2: '20' }),
])

const navItems = [
  { to: '/', label: 'Home', icon: RocketIcon },
  { to: '/about', label: 'About', icon: PlanetIcon },
  { to: '/projects', label: 'Projects', icon: UfoIcon },
  { to: '/skills', label: 'Skills', icon: StarIcon },
  { to: '/contact', label: 'Contact', icon: SatelliteIcon },
];
</script>

<style scoped>
.glow-item {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3),
              inset 0 0 20px rgba(236, 72, 153, 0.1);
}

nav {
  font-family: 'Poppins', sans-serif;
}
</style>
