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
          <div
            v-for="repo in filtered"
            :key="repo.id"
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
        </div>

        <!-- View All -->
        <div class="flex justify-center pt-4">
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
import { ref, computed, onMounted } from 'vue';

const repos = ref([]);
const search = ref('');
const loading = ref(true);
const error = ref(null);

// Per-project overrides for repos with a live demo.
const projectExtras = {
  'echo-jump': {
    demoUrl: 'https://momo-omo.github.io/echo-jump/',
  },
  'purrfect-focus': {
    demoUrl: 'https://momo-omo.github.io/purrfect-focus/',
  },
  'Life-coaching-site-demo': {
    demoUrl: 'https://momo-omo.github.io/Life-coaching-site-demo/',
  },
  'e-com-site': {
    demoUrl: 'https://momo-omo.github.io/e-com-site/',
  },
  'snap-solve': {
    demoUrl: 'https://momo-omo.github.io/snap-solve/',
  },
  'mission-control': {
    demoUrl: 'https://momo-omo.github.io/mission-control/',
    techChip: 'Firebase',
  },
};

// Repos without a demoUrl above (no live deploy yet, or not a standalone
// web app — e.g. needs a backend) still get a Run Project button, it's
// just disabled with a note instead of a link.
function noDemoReason(repoName) {
  const reasons = {};
  return reasons[repoName] || 'No live demo deployed yet.';
}

// Each project tile first tries <repo>/preview.png from the repo itself (on
// its real default branch) — drop a preview.png in any repo's root and it
// shows up here automatically, no portfolio changes needed. Falls back to
// GitHub's auto-generated OpenGraph card for repos that don't have one.
function onPreviewError(event, repoName) {
  if (event.target.dataset.fallback) return; // already on the fallback, stop
  event.target.dataset.fallback = "true";
  event.target.src = `https://opengraph.githubassets.com/1/MoMo-oMo/${repoName}`;
}

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

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/users/MoMo-oMo/repos?sort=updated&per_page=100');
    if (!res.ok) throw new Error('Failed to fetch repositories');
    const allRepos = await res.json();
    repos.value = allRepos.filter(r => !r.fork && r.name !== 'portfolio');
  } catch (e) {
    error.value = 'Could not load projects. Check your connection or try again later.';
  } finally {
    loading.value = false;
  }
});
</script>
