// Per-project overrides for repos with a live demo.
export const projectExtras = {
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
export function noDemoReason(repoName) {
  const reasons = {};
  return reasons[repoName] || 'No live demo deployed yet.';
}

// Each project tile first tries <repo>/preview.png from the repo itself (on
// its real default branch) — drop a preview.png in any repo's root and it
// shows up here automatically, no portfolio changes needed. Falls back to
// GitHub's auto-generated OpenGraph card for repos that don't have one.
export function onPreviewError(event, repoName) {
  if (event.target.dataset.fallback) return; // already on the fallback, stop
  event.target.dataset.fallback = "true";
  event.target.src = `https://opengraph.githubassets.com/1/MoMo-oMo/${repoName}`;
}
