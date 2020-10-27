import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/user/:id',
    name: 'user-page',
    component: User
  }
];

const router = new VueRouter({
  routes
});

export default router;
