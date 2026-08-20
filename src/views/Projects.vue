<template>
  <div class="page-container">
    <div class="max-w-6xl mx-auto">
      <div class="space-y-10">
        <div>
          <h2 class="section-title">Projects</h2>
          <div class="section-divider" />
        </div>

        <!-- Search -->
        <div class="relative max-w-md">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search projects..."
            class="w-full pl-12 pr-4 py-3 bg-[#0b0014]/60 border border-[#a855f7]/30 focus:border-[#a855f7]/70 focus:ring-2 focus:ring-[#a855f7]/20 rounded-xl text-white placeholder-gray-500 outline-none transition-all font-poppins"
          />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-20">
          <div class="w-10 h-10 border-4 border-[#a855f7]/30 border-t-[#a855f7] rounded-full animate-spin"></div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-20 text-gray-400 font-poppins">
          <p>{{ error }}</p>
        </div>

        <!-- No results -->
        <div v-else-if="filtered.length === 0" class="text-center py-20 text-gray-400 font-poppins">
          <p>No projects match <span class="text-[#a855f7]">{{ search }}</span></p>
        </div>

        <!-- Project tiles -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard v-for="repo in filtered" :key="repo.id" :repo="repo" />
        </div>

        <!-- View All -->
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <router-link
            to="/projects/all"
            class="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl font-semibold text-lg text-white hover:scale-105 transition-transform glow-button"
          >
            View All Projects
            <span class="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </router-link>
          <a
            href="https://github.com/MoMo-oMo?tab=repositories"
            target="_blank"
            class="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl font-semibold text-lg text-white hover:scale-105 transition-transform glow-button"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View All Projects on GitHub
            <span class="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRepos } from '../composables/useRepos';
import { projectExtras } from '../data/projectExtras';
import ProjectCard from '../components/ProjectCard.vue';

const { repos, loading, error } = useRepos();
const search = ref('');

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  const list = q
    ? repos.value.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q))
      )
    // Featured (has a live demo) repos surface first so they're never
    // pushed out of the default top-6 view.
    : [...repos.value]
        .sort((a, b) => (projectExtras[b.name]?.demoUrl ? 1 : 0) - (projectExtras[a.name]?.demoUrl ? 1 : 0))
        .slice(0, 6);
  return list;
});
</script>
