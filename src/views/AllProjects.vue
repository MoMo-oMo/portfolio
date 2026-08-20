<template>
  <div class="page-container">
    <div class="max-w-6xl mx-auto">
      <div class="space-y-10">
        <div>
          <router-link
            to="/projects"
            class="inline-flex items-center gap-2 text-[#a855f7]/70 hover:text-[#ec4899] text-sm font-poppins transition-colors mb-4"
          >
            ← Back to Projects
          </router-link>
          <h2 class="section-title">All Projects</h2>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRepos } from '../composables/useRepos';
import ProjectCard from '../components/ProjectCard.vue';

const { repos, loading, error } = useRepos();
const search = ref('');

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  return q
    ? repos.value.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q))
      )
    : repos.value;
});
</script>
