import {createRouter, createWebHistory} from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed';
import Register from '@/views/Register';
import Login from '@/views/Login';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },{
    path: '/feed',
    name: 'yourFeed',
    component: GlobalFeed,
  },{
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed,
  },{
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed,
  },{
    path: '/articles/:slug',
    name: 'article',
    component: GlobalFeed,
  },{
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed,
  },{
    path: '/settings',
    name: 'setting',
    component: GlobalFeed,
  },{
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  }, {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  }, {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
