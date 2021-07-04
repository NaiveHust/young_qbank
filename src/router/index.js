import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home';
import Login from '../components/Login/Login';
import Notfound from '../components/404';
import ExamPaper from '../components/Workspace/ExamPaper'
import Welcome from '../components/Workspace/Welcome'
import QsBank from '../components/Workspace/QsBank'
import PpBank from '../components/Workspace/PpBank'
import MarkPaper from '../components/Workspace/MarkPaper'
import TakeExam from '../components/Workspace/TakeExam'
import ManageUser from '../components/Workspace/ManageUser'


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
                    title: '欢迎！',
                    requireAuth: true,
                    roles: ['student', 'teacher', 'manager'],
                },
                component:Welcome,
            },
            {
                path: "/manageuser",
                name: "ManageUser",
                meta: {
                    title: '用户管理',
                    requireAuth: true,
                    roles: ['manager'],
                },
                component: ManageUser,
            },
            {
                path: "/exampaper",
                name: "ExamPaper",
                meta: {
                    title: '创建试卷',
                    requireAuth: true,
                    roles: ['teacher',],
                },
                component: ExamPaper,
            },
            {
                path: "/qsbank",
                name: "QsBank",
                meta: {
                    title: '题库管理',
                    requireAuth: true,
                    roles: ['teacher', 'manager'],
                },
                component: QsBank,
            },
            {
                path: "/ppbank",
                name: "PpBank",
                meta: {
                    title: '试卷管理',
                    requireAuth: true,
                    roles: ['teacher', 'manager'],
                },
                component: PpBank,
            },
            {
                path: "/markpaper",
                name: "MarkPaper",
                meta: {
                    title: '我要阅卷',
                    requireAuth: true,
                    roles: ['teacher',],
                },
                component: MarkPaper,
            },
            {
                path: "/takeexam",
                name: "TakeExam",
                meta: {
                    title: '我的考试',
                    requireAuth: true,
                    roles: ['student',],
                },
                component: TakeExam,
            },
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
router.beforeEach((to, from, next) => {
    console.log('上一个页面：', from)
    console.log('下一个页面：', to)
   // let userToken = localStorage.getItem('userToken');
    //let role = localStorage.getItem('role');
    let userType = localStorage.getItem('young-user-type');
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
       // console.log('main-token：', userToken)
        if (userType) { // 判断本地是否存在token
            if (to.meta.roles.length !== 0) {
                for (let i = 0; i < to.meta.roles.length; i++) {
                    if (userType === to.meta.roles[i]) {
                        next()
                        break
                    } else if (i === to.meta.roles.length - 1) {
                        next({
                            path: '/Error'
                        })
                    }
                }
            } else {
                next()
            }
        } else {
            next({
                path: '/Login'
            })
        }
    } else {
        next()
    }
    /* 如果本地存在token,则不允许直接跳转到登录页面 */
    /* if (to.fullPath === '/Login') {
        if (userToken) {
            next({
                path: from.fullPath
            })
        } else {
            next()
        }
    } */
})

export default router;

