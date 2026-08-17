<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Animated Space Background -->
    <BackgroundStars />

    <!-- Navigation Bar -->
    <Navbar />

    <!-- Main Page Content (Controlled by Vue Router) -->
    <main class="min-h-screen pb-8 sm:pb-10 md:pb-12">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
    <WelcomeTour />
  </div>
</template>

<script setup>
// Components
import Navbar from "./components/Navbar.vue";
import BackgroundStars from "./components/BackgroundStars.vue";
import Footer from "./components/Footer.vue";
import WelcomeTour from "./components/WelcomeTour.vue";
</script>

<style>
/* Smooth Page Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

/* Optional — ensure background takes full space */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}
</style>
