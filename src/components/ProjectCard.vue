<template>
  <div
    class="group flex flex-col bg-gradient-to-br from-[#0b0014]/80 to-[#1a0033]/80 rounded-xl border border-[#a855f7]/20 hover:border-[#a855f7]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl glow-card overflow-hidden"
  >
    <!-- Preview image (links to the live demo when there is one, otherwise GitHub) -->
    <a
      :href="projectExtras[repo.name]?.demoUrl || repo.html_url"
      target="_blank"
      class="relative block overflow-hidden h-44 bg-[#0b0014]"
    >
      <img
        :src="`https://raw.githubusercontent.com/MoMo-oMo/${repo.name}/${repo.default_branch}/preview.png`"
        :alt="repo.name"
        class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="onPreviewError($event, repo.name)"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0b0014]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </a>

    <!-- Info -->
    <div class="flex flex-col flex-1 p-5 gap-3">
      <h3 class="text-lg font-bold font-orbitron text-[#a855f7] group-hover:text-[#ec4899] transition-colors line-clamp-1">
        {{ repo.name }}
      </h3>
      <p class="text-gray-400 text-sm font-poppins leading-relaxed flex-1 line-clamp-3">
        {{ repo.description || 'No description provided.' }}
      </p>

      <a
        v-if="projectExtras[repo.name]?.demoUrl"
        :href="projectExtras[repo.name].demoUrl"
        target="_blank"
        class="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-lg font-semibold text-sm text-white hover:scale-105 transition-transform glow-button"
      >
        ▶ View Live Demo
      </a>
      <div
        v-else
        :title="noDemoReason(repo.name)"
        class="flex items-center justify-center gap-2 px-4 py-2 bg-[#0b0014]/40 border border-[#a855f7]/15 rounded-lg font-semibold text-sm text-gray-500 cursor-not-allowed select-none"
      >
        ▶ View Live Demo
      </div>

      <div class="flex items-center justify-between pt-1 gap-2">
        <div class="flex items-center gap-2 flex-wrap min-w-0">
          <span v-if="repo.language" class="text-xs px-3 py-1 bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-full text-[#a855f7] font-poppins flex-shrink-0">
            {{ repo.language }}
          </span>
          <span v-if="projectExtras[repo.name]?.techChip" class="text-xs px-3 py-1 bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full text-[#f5a623] font-poppins flex-shrink-0">
            {{ projectExtras[repo.name].techChip }}
          </span>
        </div>
        <a
          :href="repo.html_url"
          target="_blank"
          class="flex items-center gap-1 text-[#a855f7]/60 hover:text-[#ec4899] text-xs font-poppins ml-auto transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { projectExtras, noDemoReason, onPreviewError } from '../data/projectExtras';

defineProps({
  repo: {
    type: Object,
    required: true,
  },
});
</script>
