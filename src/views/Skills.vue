<template>
  <div class="page-container">
    <div class="max-w-6xl mx-auto">
      <div class="space-y-12">
        <div>
          <h2 class="section-title">Skills</h2>
          <div class="section-divider" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="category in skillCategories"
            :key="category.name"
            class="p-6 bg-gradient-to-br from-[#0b0014]/80 to-[#1a0033]/80 rounded-xl border border-[#a855f7]/20 hover:border-[#a855f7]/60 transition-all duration-300 md:hover:scale-105 glow-card"
          >
            <h3 class="text-2xl font-bold font-orbitron text-[#a855f7] mb-6 flex items-center gap-3">
              <img :src="`https://cdn.simpleicons.org/${category.icon}/a855f7`" :alt="category.name" class="w-6 h-6" />
              {{ category.name }}
            </h3>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="flex items-center gap-2 px-4 py-2 bg-[#a855f7]/10 hover:bg-[#a855f7]/20 rounded-lg border border-[#a855f7]/30 hover:border-[#ec4899]/60 transition-all cursor-pointer group hover:shadow-[0_0_12px_rgba(168,85,247,0.4)]"
              >
                <img
                  :src="`https://cdn.simpleicons.org/${skill.icon}/a855f7`"
                  :alt="skill.name"
                  class="w-5 h-5 transition-all group-hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.9)]"
                  @error="e => e.target.style.display='none'"
                />
                <span class="text-[#a855f7]/70 group-hover:text-[#ec4899] font-poppins text-sm font-medium transition-colors">
                  {{ skill.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const skillCategories = [
  {
    name: 'Programming & Development',
    icon: 'javascript',
    skills: [
      { name: 'Java',       icon: 'java' },
      { name: 'C#',         icon: 'csharp' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML',       icon: 'html5' },
      { name: 'Python',     icon: 'python' },
    ],
  },
  {
    name: 'Frameworks & Platforms',
    icon: 'vuedotjs',
    skills: [
      { name: 'Vue.js (Vue 3)', icon: 'vuedotjs' },
      { name: 'Vuetify',        icon: 'vuetify' },
      { name: 'Firebase',       icon: 'firebase' },
    ],
  },
  {
    name: 'Databases',
    icon: 'postgresql',
    skills: [
      { name: 'SQL Server',      icon: 'microsoftsqlserver' },
      { name: 'Firestore',       icon: 'firebase' },
      { name: 'Database Design', icon: 'postgresql' },
    ],
  },
  {
    name: 'Tools & Environments',
    icon: 'git',
    skills: [
      { name: 'Git',              icon: 'git' },
      { name: 'SourceTree',       icon: 'sourcetree' },
      { name: 'Linux OS',         icon: 'linux' },
      { name: 'Microsoft Office', icon: 'microsoftoffice' },
      { name: 'Cursor',           icon: 'cursor' },
      { name: 'GitKraken',        icon: 'gitkraken' },
    ],
  },
  {
    name: 'Core Competencies',
    icon: 'github',
    skills: [
      { name: 'Analytical Thinking', icon: 'stackoverflow' },
      { name: 'Problem-solving',     icon: 'leetcode' },
      { name: 'Adaptability',        icon: 'github' },
      { name: 'Teamwork',            icon: 'slack' },
      { name: 'Customer Service',    icon: 'jira' },
    ],
  },
];
</script>
