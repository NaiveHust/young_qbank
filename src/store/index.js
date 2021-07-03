import { createStore } from 'vuex'
import exampaper from './paper'
import question from './question'
export default createStore({
    state: {
        //用户类型
        userType: localStorage.getItem('young-user-type'),
        //路由便签列表
        tagsList: [

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
        setUserType(state,type) {
            state.userType = type;
        }


    },
    actions: {},
    modules: {
        paper: exampaper,
        qs:question,

    }
})