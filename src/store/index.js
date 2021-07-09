/*
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-09 10:58:48
 * @LastEditors: 肖环宇
 * @Description: 
 */

import { createStore } from 'vuex'
import exampaper from './paper'
import question from './question'
import course from './course'
import admin from './admin'
export default createStore({
    state: {
        //用户类型
        userType: null,
        /* let userInfo = {
              id: res.data.id,
              pwd: res.data.pwd,
              name: res.data.name,
              token: "mock",
            }; */
        userInfo: {},
        //路由便签列表
        tagsList: [

        ],
        items: [
            {
                icon: "el-icon-s-home",
                index: "welcome",
                title: "系统首页",
                roles: ["student", "teacher", "admin"],
            },
            {
                icon: "el-icon-apple",
                index: "manageuser",
                title: "用户管理",
                roles: ["admin"],
            },
            {
                icon: "el-icon-apple",
                index: "teacourse",
                title: "管理课程",
                roles: ["teacher"],
            },
            {
                icon: "el-icon-apple",
                index: "exampaper",
                title: "创建试卷",
                roles: ["teacher"],
            },

            {
                icon: "el-icon-apple",
                index: "qsbank",
                title: "题库管理",
                roles: ["teacher", "admin"],
            },
            {
                icon: "el-icon-apple",
                index: "ppbank",
                title: "试卷管理",
                roles: ["teacher", "admin"],
            },
            {
                icon: "el-icon-apple",
                index: "markpaper",
                title: "我要阅卷",
                roles: ["teacher"],
            },
            {
                icon: "el-icon-apple",
                index: "mycourse",
                title: "我的课程",
                roles: ["student",],
            },
            {
                icon: "el-icon-apple",
                index: "takeexam",
                title: "我的考试",
                roles: ["student"],
            },
        ],

        //可用的题目对象
        //值为i18n中的键名
        //暂时没用
        typeOptions: [
            "single",
            "multiply",
            "truefalse",
            "fill",
            "answer",
        ],
        // current:,
        collapse: false,
        order: 0,

    },
    mutations: {
        //保存用户基础信息
        storeUser(state, data) {
            state.userInfo.id = data.id;
            state.userInfo.pwd = data.pwd;
            state.userInfo.name = data.name;
            state.userInfo.token = data.token;
            console.log('登录的用户', state.userInfo);
        },
        showTem(state) {
            console.log('store');
            console.log(state.sTem);
        },
        //删除1个index序号的tag
        delTagsItem(state, data) {
            state
                .tagsList
                .splice(data.index, 1);
        },
        //增添一个
        setTagsItem(state, data) {
            state
                .tagsList
                .push(data)
        },
        //清空
        clearTags(state) {
            state.tagsList = []
        },
        //关闭非用标签
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        //关闭当前标签
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        hadndleCollapse(state, data) {
            state.collapse = data;
        },
        setUserType(state, type) {
            state.userType = type;
            localStorage.setItem('young-user-type', type);
        },
        //增加选项
        addTopicItem(state, data) {
            let aimTopic = state.paper.inPaper ?
                state.paper.paperContent[data.tType].topic[data.tOrder - 1] :
                state.qs.editNew ?
                    state.qs.newTopic :
                    state.qs.qsBank[state.qs.qsOrder].content;
            console.log('目标题目', aimTopic);
            aimTopic[data.iType].push(data.content);

        },
        delTopicItem(state, data) {
            let aimTopic = state.paper.inPaper ?
                state.paper.paperContent[data.tType].topic[data.tOrder - 1] :
                state.qs.editNew ?
                    state.qs.newTopic :
                    state.qs.qsBank[state.qs.qsOrder].content;
            console.log('目标题目', aimTopic);
            let aimItems = aimTopic[data.iType];
            for (const key in aimItems) {
                if (aimItems[key].order > data.iOrder) {
                    aimItems[key].order--;
                    if (aimItems[key].name) {
                        aimItems[key].name = String.fromCharCode(65 + aimItems[key].order - 1);
                    }
                }

            }

            aimItems.splice(data.iOrder - 1, 1);
            console.log('删除后的:', aimItems);


        },

    },
    actions: {},
    modules: {
        paper: exampaper,
        qs: question,
        cs: course,
        ad:admin,
    }
})