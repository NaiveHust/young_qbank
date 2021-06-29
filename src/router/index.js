import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home';
import Login from '../components/Login/Login';
import Notfound from '../components/404';
import ExamPaper from '../components/Workspace/ExamPaper'
import Welcome from '../components/Workspace/Welcome'
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        //path/后的字符串要与Sidebar.vue中items.index对应相等
        name: "login",
        component: Login,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/welcome",
                name: "Welcome",
                meta: {
                    title: '欢迎！'
                },
                component:Welcome,
            },
            {
                path: "/table",
                name: "BaseTable",
                meta: {
                    title: '表格'
                },
                component: () => import(
                    /* webpackChunkName: "table" */
                    "../components/BaseTable.vue")
            }, {
                path: "/tabs",
                name: "Tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import(
                    /* webpackChunkName: "tabs" */
                    "../components/Tabs.vue")
            },
            {
                path: "/exampaper",
                name: "ExamPaper",
                meta: {
                    title: '创建试卷'
                },
                component: ExamPaper,
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: "notfound",
        component: Notfound
    }

];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// router.beforeEach((to, from, next) => {
//     console.log(from);
//     console.log(to);
   
    
//     if (to.matched.length === 0) {  // 如果未匹配到路由
//         //from.path ? next({ path: from.path }) : next('/login')
//         console.log('path:'+lastPath);
//         lastPath ? router.push(lastPath) : next('/login');

//     } else {
//         lastPath = to.path
        
//         next()  // 如果匹配到正确跳转
//     }
// })

/* router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
}); */
export default router;

