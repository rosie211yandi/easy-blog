import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    {path:'/test',component:()=> import('../views/Test.vue')},

    { path: "/detail", component: () => import("../views/Detail.vue") },
    {path:'/',component:()=> import('../views/Login.vue')},
    {
    path: "/HomePage", component: () => import("../views/HomePage.vue")
    },
    { path: "/dashboard", component: () => import("../views/dashboard/Dashboard.vue"), children: [
        {path:'/dashboard/person',component:()=> import('../views/dashboard/Person.vue')},
        { path: "/dashboard/category", component: () => import("../views/dashboard/Category.vue") },
        { path: "/dashboard/article", component: () => import("../views/dashboard/Article.vue") },
        { path: "/dashboard/person", component: () => import("../views/dashboard/Person.vue") },
    ]}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router, routes }