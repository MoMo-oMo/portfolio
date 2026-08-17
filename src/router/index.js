import { createRouter, createWebHashHistory } from "vue-router";
const Home = () => import("../views/Home.vue");
const About = () => import("../views/About.vue");
const Projects = () => import("../views/Projects.vue");
const Contact = () => import("../views/Contact.vue");
const Skills = () => import("../views/Skills.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/skills", name: "Skills", component: Skills },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  // Hash mode: no server-side rewrite needed, so direct links and refreshes
  // to any route work on any static host (GitHub Pages included) without
  // extra deploy config, regardless of whether this ends up at a domain
  // root or a subpath.
  history: createWebHashHistory(),
  routes,
});

export default router;
