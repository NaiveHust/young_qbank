/*
 * @Author: 肖环宇
 * @Date: 2021-07-03 09:49:30
 * @LastEditTime: 2021-07-08 22:38:59
 * @LastEditors: 肖环宇
 * @Description: 
 */
import { qs } from '../axios';
import rootStore from './index';
import { ElMessage } from 'element-plus'


const question = {

    namespaced: false,
    state: {
        //选择编辑的题目在题目列表中的序号
        qsOrder: 0,
        //试题库
        //暂时模拟后端数据
        qsBank: [
            {
                id: 1,
                course: '微积分上',
                type: 'Single',
                name: '1+1=?',
                level: '易',
                //content以json字符串保存在数据库
                content: {
                    //  order: oldN + i + 1,
                    //  score: deScore,
                    level: '易',
                    question: "1+1=?",
                    choice: [
                        {
                            order: 1,
                            name: "A",
                            content: "",
                        },
                        {
                            order: 2,
                            name: "B",
                            content: "",
                        },
                        {
                            order: 3,
                            name: "C",
                            content: "",
                        },
                        {
                            order: 4,
                            name: "D",
                            content: "",
                        },
                    ],
                    answer: "",
                    explain: "",
                },
            },
            {
                id: 2,
                course: '微积分上',
                type: 'Fill',
                name: '1+',
                level: '易',
                content: {
                    // order: oldN + i + 1,
                    // score: 5,
                    level: '易',
                    question: [
                        {
                            order: 1,
                            head: '1+',
                            tail: '=3',
                            answer: "2",
                        },
                    ],
                    explain: "",
                },
            },
            {
                id: 3,
                course: '微积分上',
                type: 'Multiple',
                name: '1+1>?',
                level: '易',
                content: {
                    // order: oldN + i + 1,
                    // score: deScore,
                    level: '易',
                    question: "1+1>?",
                    choice: [
                        {
                            order: 1,
                            name: "A",
                            content: "",
                        },
                        {
                            order: 2,
                            name: "B",
                            content: "",
                        },
                        {
                            order: 3,
                            name: "C",
                            content: "",
                        },
                        {
                            order: 4,
                            name: "D",
                            content: "",
                        },
                    ],
                    answer: ["C", "D"],
                    explain: "",
                },
            },
            {
                id: 4,
                course: '微积分上',
                type: 'Answer',
                name: '小明爱学习。',
                level: '易',
                content: {
                    // order: oldN + i + 1,
                    //  score: deScore,
                    level: '易',
                    question: "小明爱学习。",
                    subQ: [
                        {
                            order: 1,
                            content: "小明喜欢什么？",
                            answer: "学习",
                        }
                    ],
                    explain: "",
                },
            },
            {
                id: 5,
                course: '微积分上',
                type: 'Truefalse',
                name: '1+1=2',
                level: '易',
                content: {
                    // order: oldN + i + 1,
                    // score: deScore,
                    level: '易',
                    question: "1+1=2",
                    answer: true,
                    explain: "",
                },
            },
            {
                id: 6,
                course: '微积分上',
                type: 'Truefalse',
                name: '2+2 = 4',
                level: '易',
                content: {
                    // order: oldN + i + 1,
                    // score: deScore,
                    level: '易',
                    question: "2+2 = 4",
                    answer: true,
                    explain: "",
                },
            },
        ],
        tableHead: [
            {
                prop: "name",
                label: "题目简称",
            },
            {
                prop: "course",
                label: "所属课程",
            },
            {
                prop: "type",
                label: "题型",
            },
            {
                prop: "level",
                label: "题目难度",
            },

        ],
        //保存修改之前的题目，用于取消修改
        tempTopic: null,
        //新建题目
        newTopic: null,
        //判断是否编辑新题目
        editNew: false,
        //table加载中？
        loading: false,
        //总题数
        totalCount: 0,
    },

    mutations: {

        setQsOrder(state, order) {
            state.qsOrder = order;
        },
        setEditNew(state, boolVal) {
            state.editNew = boolVal;

        },
        setLoading(state, boolVal) {
            state.loading = boolVal;
        },
        setTempTopic(state) {
            state.tempTopic = JSON.parse(JSON.stringify(state.qsBank[state.qsOrder]));
        },
        createNewTopic(state, type) {
            //单选题
            if (type == "Single") {
                state.newTopic = {
                    level: '易',
                    question: "",
                    choice: [
                        {
                            order: 1,
                            name: "A",
                            content: "",
                        },
                        {
                            order: 2,
                            name: "B",
                            content: "",
                        },
                        {
                            order: 3,
                            name: "C",
                            content: "",
                        },
                        {
                            order: 4,
                            name: "D",
                            content: "",
                        },
                    ],
                    answer: "",
                    explain: "",
                };
            }
            //填空题   
            else if (type == "Fill") {
                state.newTopic = {

                    level: '易',
                    question: [
                        {
                            order: 1,
                            head: '',
                            tail: '',
                            answer: "",
                        },
                    ],
                    explain: "",
                }
            }
            //多选题
            else if (type == "Multiple") {
                state.newTopic = {
                    level: '易',
                    question: "",
                    choice: [
                        {
                            order: 1,
                            name: "A",
                            content: "",
                        },
                        {
                            order: 2,
                            name: "B",
                            content: "",
                        },
                        {
                            order: 3,
                            name: "C",
                            content: "",
                        },
                        {
                            order: 4,
                            name: "D",
                            content: "",
                        },
                    ],
                    answer: [],
                    explain: "",
                };
            }
            //简答题
            else if (type == "Answer") {
                state.newTopic = {

                    level: '易',
                    question: "",
                    subQ: [
                        {
                            order: 1,
                            content: "",
                            answer: "",
                        }
                    ],
                    explain: "",
                };
            }
            //判断题
            else if (type == "Truefalse") {
                state.newTopic = {

                    level: '易',
                    question: "",
                    answer: true,
                    explain: "",
                };
            }
        },
        //删除题库中的某个题目
        delBankTopic(state, id) {
            // state.qsBank.splice(order, 1);
            //     state.loading = true;
            state.loading = true;
            return new Promise(() => {

                qs.get(`question/delete_by_id/${id}`).then(res => {
                    if (res.data === 1) {
                        ElMessage.success({
                            message: '删除成功',
                            type: 'success'
                        });
                        console.log('删除了');
                    }
                    else {
                        ElMessage.error({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })

            })

        },
        /**
         * @description: 存储题目到服务器
         * @param {*} state
         * @param {*} order
         * @return {*}
         */
        saveTopic(state, type) {
            let topic = '';
            if (state.editNew) {
                console.log('新建的题目', state.newTopic);
                topic = state.newTopic;
            } else {
                console.log('保存的题目.content', state.qsBank[state.qsOrder].content);
                topic = state.qsBank[state.qsOrder].content;
            }
            let tempBody = {};
            //题型的公共部分
            tempBody.proDetail = JSON.stringify(topic);
            tempBody.proDif = topic.level;
            tempBody.proTea = rootStore.state.userInfo.id;
            tempBody.proAns = topic.explain;
            tempBody.proType = type;
            if (type === "Single") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (type == "Multiple") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (type == "Answer") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (type == "Truefalse") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (type == "Fill") {
                if (topic.question.length > 0) {
                    tempBody.proSimple = topic.question[0].head.substring(0, 8);
                }
                else {
                    tempBody.proSimple = topic.explain.substring(0, 8);
                }
            }

            console.log('body', tempBody);

            //TODO 存储到服务器
            //增
            if (state.editNew) {
                return new Promise(() => {
                    qs.post('question/add', tempBody,
                    ).then(res => {
                        console.log('res', res);
                        if (res.status == 200) {

                            ElMessage.success({
                                message: '保存成功',
                                type: 'success'
                            });
                        }
                        else {
                            ElMessage.error({
                                message: '保存失败',
                                type: 'error'
                            });
                        }
                    })
                })

            }
            //改
            else {
                tempBody.proNo = state.qsBank[state.qsOrder].id;
                return new Promise(() => {
                    qs.post('question/update_by_id', tempBody,
                    ).then(res => {
                        console.log('res', res);
                        if (res.data === 1) {

                            ElMessage.success({
                                message: '保存成功',
                                type: 'success'
                            });
                        }
                        else {
                            ElMessage.error({
                                message: '保存失败',
                                type: 'error'
                            });
                        }
                    })
                })

            }

        },

        undoTopic(state) {
            if (state.editNew) {
                state.editNew = null;
            }
            else {
                console.log(state.qsBank[state.qsOrder] = state.tempTopic);
            }
        },

        /**
         * @description: 从服务器得到个人题库
         * @param {*} state
         * @param {*} data
         * @return {*}
         */

        getPageQs(state, data) {
            qs.get(`question/findByTea/${rootStore.state.userInfo.id}/${data.index}/${data.size}`,).then(res => {
                state.qsBank = [];
                state.totalCount = res.data.totalCount;
                for (const qs of res.data.list) {
                    state.qsBank.push(
                        {
                            id: qs.proNo,
                            name: qs.proSimple,
                            course: qs.proClass,
                            type: qs.proType,
                            level: qs.proDif,
                            content: JSON.parse(qs.proDetail),
                        })
                }
                console.log('qbank', state.qsBank);
            })
        },


    },

    actions: {
        async delBankTopic(context, data) {
            //确保题目删除完成再重新分页加载

            //await context.commit('delBankTopic', data.id);
            //await context.commit('getPageQs', { index: data.currentPage, size: data.pageSize });
            context.state.loading = true;
            await qs.get(`question/delete_by_id/${data.id}`).then(res => {
                if (res.data === 1) {
                    ElMessage.success({
                        message: '删除成功',
                        type: 'success'
                    });
                    console.log('删除了');
                }
                else {
                    ElMessage.error({
                        message: '删除失败',
                        type: 'error'
                    });
                }
            })
            await qs.get(`question/findByTea/${rootStore.state.userInfo.id}/${data.currentPage}/${data.pageSize}`,).then(res => {
                context.state.qsBank = [];
                context.state.totalCount = res.data.totalCount;
                for (const qs of res.data.list) {
                    context.state.qsBank.push(
                        {
                            id: qs.proNo,
                            name: qs.proSimple,
                            course: qs.proClass,
                            type: qs.proType,
                            level: qs.proDif,
                            content: JSON.parse(qs.proDetail),
                        })
                }
                context.state.loading = false;
                console.log('qbank', context.state.qsBank);
            })
        },
        async saveTopic(context, data) {
            let topic = '';
            if (context.state.editNew) {
                console.log('新建的题目', context.state.newTopic);
                topic = context.state.newTopic;
            } else {
                console.log('保存的题目.content', context.state.qsBank[context.state.qsOrder].content);
                topic = context.state.qsBank[context.state.qsOrder].content;
            }
            let tempBody = {};
            //题型的公共部分
            tempBody.proDetail = JSON.stringify(topic);
            tempBody.proDif = topic.level;
            tempBody.proTea = rootStore.state.userInfo.id;
            tempBody.proAns = topic.explain;
            tempBody.proType = data.type;
            if (data.type === "Single") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (data.type == "Multiple") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (data.type == "Answer") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (data.type == "Truefalse") {
                tempBody.proSimple = topic.question.substring(0, 8);
            }
            else if (data.type == "Fill") {
                if (topic.question.length > 0) {
                    tempBody.proSimple = topic.question[0].head.substring(0, 8);
                }
                else {
                    tempBody.proSimple = topic.explain.substring(0, 8);
                }
            }

            console.log('body', tempBody);

            //TODO 存储到服务器
            //增
            if (context.state.editNew) {
                await qs.post('question/add', tempBody,
                ).then(res => {
                    console.log('res', res);
                    if (res.status == 200) {

                        ElMessage.success({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                    else {
                        ElMessage.error({
                            message: '保存失败',
                            type: 'error'
                        });
                    }
                })
            }
            //改
            else {
                tempBody.proNo = context.state.qsBank[context.state.qsOrder].id;
                await qs.post('question/update_by_id', tempBody,
                ).then(res => {
                    console.log('res', res);
                    if (res.data === 1) {

                        ElMessage.success({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                    else {
                        ElMessage.error({
                            message: '保存失败',
                            type: 'error'
                        });
                    }
                })
            }

            await qs.get(`question/findByTea/${rootStore.state.userInfo.id}/${data.currentPage}/${data.pageSize}`,).then(res => {
                context.state.qsBank = [];
                context.state.totalCount = res.data.totalCount;
                for (const qs of res.data.list) {
                    context.state.qsBank.push(
                        {
                            id: qs.proNo,
                            name: qs.proSimple,
                            course: qs.proClass,
                            type: qs.proType,
                            level: qs.proDif,
                            content: JSON.parse(qs.proDetail),
                        })
                }
                context.state.loading = false;
                console.log('qbank', context.state.qsBank);
            })
        },

    },
    getters: {}
}

export default question