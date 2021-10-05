
import { createWebHistory, createRouter } from 'vue-router'
import Users from '../components/Users'
const routes = [
    {
        path: "/",
        component: Users,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;