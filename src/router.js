import { createWebHistory, createRouter } from "vue-router";
import GuessingGame from "@/components/GuessingGame.vue";
import About from "@/components/About.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/GuessingGame', name: 'Guessing Game', component: GuessingGame},
        { path: '/About', name: 'About', component: About}
    ]
});

export default router;