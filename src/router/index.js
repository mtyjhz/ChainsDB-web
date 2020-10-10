/*
 * @Author: cuijiajun
 * @Date: 2020-10-09 14:08:44
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-10 16:35:23
 * @FilePath: /sr2/src/router/index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Generalquery',
    name: 'Generalquery',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Generalquery.vue'),
  }, {
    path: '/table',
    name: 'table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "table" */ '../views/table.vue'),
  },
  {
    path: '/download',
    name: 'download',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "table" */ '../views/download.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
