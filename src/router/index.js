/*eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import RestaurantS from "../views/RestaurantS.vue";
import store from "./../store";

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser;
  if (currentUser && !currentUser.isAdmin) {
    next("/404")
    return;
  }

  next();
};

const routes = [
  {
    path: '/',
    name: 'root',
    component: SignIn
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: "/restaurants",
    name: "restaurants",
    component: RestaurantS,
  },
  {
    path: "/restaurants/feeds",
    name: "restaurants-feed",
    component: () => import("../views/RestaurantsFeed.vue"),
  },
  {
    path: "/restaurants/top",
    name: "restaurants-top",
    component: () => import("../views/RestaurantsTop.vue"),
  },
  {
    path: "/restaurants/:id",
    name: "restaurant",
    component: () => import("../views/Restaurant.vue"),
  },
  {
    path: "/restaurants/:id/dashboard",
    name: "restaurant-dashboard",
    component: () => import("../views/RestaurantDashboard.vue"),
  },
  {
    path: "/users/top",
    name: "users-top",
    component: () => import("../views/UsersTop.vue"),
  },
  {
    path: "/users/:id/edit",
    name: "user-edit",
    component: () => import("../views/AdminUserEdit.vue"),
  },
  {
    path: "/usersingle/:id",
    name: "user-single",
    component: () => import("../views/UserSingle.vue"),
  },
  {
    path: "/admin",
    exact: true,
    redirect: "/admin/restaurants",
  },
  {
    path: "/admin/restaurants",
    name: "admin-restaurants",
    component: () => import("../views/AdminRestaurants.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/restaurants/new",
    name: "admin-restaurant-new",
    component: () => import("../views/AdminRestaurantNew.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/restaurants/:id/edit",
    name: "admin-restaurant-edit",
    component: () => import("../views/AdminRestaurantEdit.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/restaurants/:id",
    name: "admin-restaurant",
    component: () => import("../views/AdminRestaurant.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/categories",
    name: "admin-categories",
    component: () => import("../views/AdminCategories.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("../views/AdminUsers.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: "active",
  routes,
})

router.beforeEach(async (to, from, next) => {
  // 從 localStorage 取出 token
  const tokenInLocalStorage = localStorage.getItem("token");
  const tokenInStore = store.state.token;
  let isAuthenticated = store.state.isAuthenticated;

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch("fetchCurrentUser");
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ["Sign-up", "Sign-in"];

  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next("/signin");
    return;
  }

  // 如果 token 有效則轉址到餐廳首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next("/restaurants");
    return;
  }
  next();
});

export default router
