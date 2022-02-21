import { createRouter, createWebHashHistory } from "vue-router";

import Signup from "@/views/Signup.vue";
import Comment from "@/views/Comment.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Delete from "@/views/Delete.vue";

const routes = [
  {
    name: "Signup",
    path: "/",
    component: Signup,
    meta: {
      title: "Signup",
    },
  },
  {
    name: "Comment",
    path: "/profile/:id/Comment/:postId",
    component: Comment,
    meta: {
      title: "Comment",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    name: "Profile",
    path: "/profile/:id",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    name: "Delete",
    path: "/Delete",
    component: Delete,
    meta: {
      title: "Delete",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to, from) => {
  console.log(from, to);
  document.title = to.meta.title;
});

export default router;
