import { createRouter, createWebHashHistory } from "vue-router";

import Signup from "@/views/Signup.vue";
import Comment from "@/views/Comment.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";

const routes = [
    {
        name: "Signup",
        path: "/",
        component: Signup,
        meta: {
            title: 'Signup'
          }
    }, {
        name: "Comment",
        path: "/Comment/:id",
        component: Comment,
        meta: {
            title: 'Comment'
          }
    }, 
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title : 'Login'
          }
    }, {
        name: "Profile",
        path: "/profile/:id",
        component: Profile,
        meta: {
            title: 'Profile'
          }
    }
        
];



const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });


  router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title;
  })

  export default router;