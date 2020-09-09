import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '@/views/Landing.vue';
import TokenServices from '@/services/token';
import AuthModule from '@/store/modules/auth';
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'landing',
        component: Landing,
        meta: {
            public: true,
            guestMode: true
        }
    },
    {
        path: '/ctrade',
        name: 'ctrade',
        component: () => import(/* webpackChunkName: "signup" */ '../views/Ctrade.vue'),
        meta: {
            public: true,
            guestMode: true
        }
    },
    {
        path: '/signup',
        name: 'signup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
        meta: {
            public: true,
            guestMode: true
        }
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import(/* webpackChunkName: "signin" */ '../views/Signin.vue'),
        meta: {
            public: true,
            guestMode: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "signin" */ '../views/Home.vue')
    },
    {
        path: '*',
        redirect: '/home'
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.beforeEach(function (to, from, next) {
    const isPublic = to.matched.some(record => record.meta.public);
    const guestMode = to.matched.some(record => record.meta.guestMode);
    if (!isPublic && !TokenServices.loggedIn()) {
        return next({
            name: 'signin',
            query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
        });
    }
    if (TokenServices.loggedIn() && guestMode) {
        return next('/home');
    }
    if (TokenServices.loggedIn()) {
        AuthModule.checkLoggedIn();
    }
    next();
});
export default router;
//# sourceMappingURL=index.js.map