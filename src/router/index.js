import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home/index.vue';
import Login from '@/views/login/index.vue';
import Register from '@/views/register/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: Register,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
