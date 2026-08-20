import { ref, onMounted } from 'vue';

// Shared GitHub repo fetch used by both the featured Projects page and the
// full All Projects listing, so they always show the same underlying data.
export function useRepos() {
  const repos = ref([]);
  const loading = ref(true);
  const error = ref(null);

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

  return { repos, loading, error };
}
