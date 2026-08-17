<template>
  <div class="page-container">
    <div class="max-w-5xl mx-auto">
      <div class="space-y-12">
        <div>
          <h2 class="section-title">About Me</h2>
          <div class="section-divider" />
        </div>

        <!-- Bio -->
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <div class="flex justify-center">
            <div class="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/30 glow-border-avatar">
              <img src="/profile.jpg" alt="Mohammed Yaseen Khan" class="w-full h-full object-cover object-top" />
            </div>
          </div>

          <div class="space-y-4 text-lg text-gray-300 leading-relaxed font-poppins">
            <p>
              I'm <span class="text-[#a855f7] font-semibold">Mohammed Yaseen Khan</span>, a Software Developer with a Higher Certificate in Information Technology and hands-on experience building web and mobile applications.
            </p>
            <p>
              I work with Java, Python, JavaScript, C#, Vue.js (Vue 3), Vuetify, and Firebase, from responsive UIs to Firebase auth, live data, and clean code architecture.
            </p>
            <p>
              I blend technical ability with strong teamwork and communication skills gained through varied professional experience. I'm committed to continuous learning and reliable solutions.
            </p>
          </div>
        </div>

        <!-- Neofetch Terminal -->
        <div class="p-1 bg-gradient-to-r from-[#a855f7]/40 to-[#ec4899]/40 rounded-xl glow-card">
          <div class="bg-[#0a0010] rounded-xl overflow-x-auto font-mono text-sm">
            <!-- Terminal title bar -->
            <div class="flex items-center gap-2 px-4 py-3 bg-[#1a0033]/80 border-b border-[#a855f7]/20">
              <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span class="ml-3 text-gray-400 text-xs">yaseen@fedora ~</span>
            </div>
            <!-- Terminal body -->
            <div class="p-6 flex flex-col md:flex-row gap-8">
              <!-- Fedora ASCII art -->
              <pre class="text-[#a855f7] text-xs leading-tight flex-shrink-0 hidden sm:block">        ,--.
       |    \
     __|     |
    /    .--./
   |  _ (
   | ( \   __
    \ '--. /  \
     '._  /    |
        \/   __|
        /   /  |
       /  ,'   /
      /  /   ,'
     / ,'  ,'
    / /  ,'
   //  ,'
  / \ /
 /   V</pre>
              <!-- Info lines -->
              <div class="space-y-1 text-xs md:text-sm">
                <p><span class="text-[#a855f7] font-bold">yaseen</span><span class="text-gray-400">@</span><span class="text-[#ec4899] font-bold">fedora</span></p>
                <p class="text-[#a855f7]/60">─────────────────────────</p>
                <p><span class="text-[#a855f7]">OS:</span><span class="text-gray-300 ml-2">Fedora Linux</span></p>
                <p><span class="text-[#a855f7]">Shell:</span><span class="text-gray-300 ml-2">bash + Vue 3</span></p>
                <p><span class="text-[#a855f7]">Editor:</span><span class="text-gray-300 ml-2">Cursor</span></p>
                <p><span class="text-[#a855f7]">Version Control:</span><span class="text-gray-300 ml-2">Git + SourceTree</span></p>
                <p><span class="text-[#a855f7]">Languages:</span><span class="text-gray-300 ml-2">Java, Python, JS, C#</span></p>
                <p><span class="text-[#a855f7]">Frameworks:</span><span class="text-gray-300 ml-2">Vue 3, Vuetify, Firebase</span></p>
                <p><span class="text-[#a855f7]">DB:</span><span class="text-gray-300 ml-2">Firestore, SQL Server</span></p>
                <p><span class="text-[#a855f7]">Role:</span><span class="text-gray-300 ml-2">Software Developer @ Right Click Digital</span></p>
                <p class="text-[#a855f7]/60">─────────────────────────</p>
                <div class="flex gap-1 pt-1">
                  <span v-for="c in colors" :key="c" class="w-5 h-5 rounded" :style="{ background: c }"></span>
                </div>
              </div>
            </div>
            <p class="px-6 pb-4 text-green-400 text-xs">$ <span class="animate-pulse">█</span></p>
          </div>
        </div>

        <!-- Experience -->
        <div>
          <h3 class="text-2xl font-bold font-orbitron text-[#a855f7] mb-6">Experience</h3>
          <div class="space-y-4">
            <div v-for="job in experience" :key="job.title" class="p-6 bg-gradient-to-br from-[#0b0014]/80 to-[#1a0033]/80 rounded-xl border border-[#a855f7]/20 hover:border-[#a855f7]/50 transition-all duration-300 glow-card">
              <div class="flex flex-wrap justify-between items-start gap-2 mb-3">
                <h4 class="text-base md:text-lg font-bold font-orbitron text-white">{{ job.title }}</h4>
                <span class="text-sm text-[#a855f7] font-poppins font-medium bg-[#a855f7]/10 px-3 py-1 rounded-full border border-[#a855f7]/30">{{ job.period }}</span>
              </div>
              <ul class="space-y-1">
                <li v-for="point in job.points" :key="point" class="flex items-start gap-2 text-gray-300 font-poppins text-sm">
                  <span class="text-[#a855f7] mt-1 flex-shrink-0">▸</span>
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Education & Certificates -->
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-bold font-orbitron text-[#a855f7] mb-6">Education</h3>
            <div class="space-y-4">
              <div v-for="edu in education" :key="edu.title" class="p-5 bg-gradient-to-br from-[#0b0014]/80 to-[#1a0033]/80 rounded-xl border border-[#a855f7]/20 glow-card">
                <p class="font-bold text-white font-orbitron text-sm">{{ edu.title }}</p>
                <p class="text-[#a855f7] font-poppins text-sm mt-1">{{ edu.institution }}</p>
                <p class="text-gray-400 font-poppins text-xs mt-1">{{ edu.period }}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-bold font-orbitron text-[#a855f7] mb-6">Certificates</h3>
            <div class="space-y-4">
              <div v-for="cert in certificates" :key="cert.title" class="p-5 bg-gradient-to-br from-[#0b0014]/80 to-[#1a0033]/80 rounded-xl border border-[#a855f7]/20 glow-card">
                <p class="font-bold text-white font-orbitron text-sm">{{ cert.title }}</p>
                <p class="text-gray-400 font-poppins text-xs mt-1">{{ cert.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const colors = ['#1e1e2e', '#a855f7', '#ec4899', '#38bdf8', '#34d399', '#facc15', '#f97316', '#f87171'];

const experience = [
  {
    title: 'Software Developer | Right Click Digital',
    period: 'August 2025 – Present',
    points: [
      'Developed web and mobile features using Vue 3 and Vuetify.',
      'Built clean screens that work well on all devices.',
      'Added Firebase tools for login, live updates and stored data.',
      'Handled app data to keep things secure and smooth.',
      'Cleaned up existing code to improve speed and structure.',
      'Worked with the team to bring designs to life.',
      'Tested and solved issues to deliver solid releases.',
    ],
  },
  {
    title: 'General Worker | Freezer Fillers',
    period: 'June 2025 – August 2025',
    points: [
      'Handled customer transactions and provided efficient service.',
      'Restocked and organized freezer displays, ensuring product freshness.',
      'Assisted in preparing baked goods while maintaining hygiene standards.',
    ],
  },
  {
    title: 'Store Assistant | Paws and Claws',
    period: 'Nov 2024 – Dec 2024',
    points: [
      'Managed store operations, including inventory, pricing, and stock rotation.',
      'Cared for animals, including feeding, grooming, and health monitoring.',
      'Delivered excellent customer service and processed sales transactions.',
    ],
  },
  {
    title: 'Administrative & General Worker | Usana Trading (Pty) Ltd',
    period: 'Jan 2022 – May 2024',
    points: [
      'Organized files, prepared reports, and oversaw data entry.',
      'Processed financial documents and purchase orders with accuracy.',
      'Improved workflow by implementing efficient administrative systems.',
    ],
  },
];

const education = [
  {
    title: 'Higher Certificate in Information Technology',
    institution: 'Eduvos College',
    period: '2023 – 2025',
  },
  {
    title: 'Matric',
    institution: 'Auckland Park Academy of Excellence',
    period: '2015 – 2022',
  },
];

const certificates = [
  { title: 'FNB App Academy – Certificate of Completion', date: 'July 2025' },
  { title: 'Microsoft AI Fluency – Certificate of Completion', date: 'August 2025' },
];
</script>

<style scoped>
.glow-border-avatar {
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4),
              0 0 60px rgba(168, 85, 247, 0.2),
              inset 0 0 30px rgba(168, 85, 247, 0.1);
}
</style>
