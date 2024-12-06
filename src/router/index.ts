import { createRouter, createWebHistory } from '@ionic/vue-router';
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import StartPage from '@/views/StartPage.vue';
import { useAuthentication } from '@/composables/authentication';

const { isAuthenticated } = useAuthentication();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/start',
  },
  {
    path: '/start',
    component: StartPage,
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/unlock',
    component: () => import('@/views/UnlockPage.vue'),
  },
  {
    path: '/tabs/',
    component: () => import('@/views/TabsPage.vue'),
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const checkAuthStatus = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (to.matched.some((r) => r.meta.requiresAuth)) {
    if (!(await isAuthenticated())) {
      return next('/tabs/tab1');
    }
  }
  next();
};

router.beforeEach(checkAuthStatus);

export default router;
