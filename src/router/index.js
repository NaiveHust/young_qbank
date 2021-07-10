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
import MyCourse from '../components/Workspace/MyCourse'
import TeaCourse from '../components/Workspace/TeaCourse'
import rootStore from '../store'

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
                    roles: ['student', 'teacher', 'admin'],
                },
                component:Welcome,
            },
            {
                path: "/manageuser",
                name: "ManageUser",
                meta: {
                    title: '用户管理',
                    requireAuth: true,
                    roles: ['admin'],
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
                    roles: ['teacher', 'admin'],
                },
                component: QsBank,
            },
            {
                path: "/ppbank",
                name: "PpBank",
                meta: {
                    title: '试卷管理',
                    requireAuth: true,
                    roles: ['teacher', 'admin'],
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
                path: "/mycourse",
                name: "MyCourse",
                meta: {
                    title: '我的课程',
                    requireAuth: true,
                    roles: ['student',],
                },
                component: MyCourse,
            },
            {
                path: "/teacourse",
                name: "TeaCourse",
                meta: {
                    title: '管理课程',
                    requireAuth: true,
                    roles: ['teacher','admin'],
                },
                component: TeaCourse,
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


router.beforeEach((to, from, next) => {
  //  console.log('上一个页面：', from)
  //  console.log('下一个页面：', to)
   // let userToken = localStorage.getItem('userToken');
    //let role = localStorage.getItem('role');
    let userType = localStorage.getItem('young-user-type');
    rootStore.state.userType = userType;
    let userInfo = localStorage.getItem('young-userInfo');
    if (Object.keys(rootStore.state.userInfo).length === 0&&userInfo) {
        rootStore.commit('storeUser', JSON.parse(userInfo));
       // console.log('刷新后', rootStore.state.userInfo);
    }
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) { 
       // console.log('main-token：', userToken)
        if (userInfo) { // 判断本地是否存在token
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
                path: '/login'
            })
        }
    } 
    else if (to.fullPath === '/login') {
        //如果token信息还在
      
        if (userInfo&&userType) {
           /*  next({
                path: from.fullPath
            }) */
            //转到主页
            next({
                path: '/home'
            })
        } else {
            next()
        }
    }
    else{
        next()
    }
  
   
})

export default router;

