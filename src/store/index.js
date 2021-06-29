import { createStore } from 'vuex'

export default createStore({
    state: {
        tagsList: [
            
        ],
       // current:,
        collapse: false
    },
    mutations: {
        //删除1个index序号的tag
        delTagsItem( state,data) {
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
        }
    },
    actions: {},
    modules: {}
})