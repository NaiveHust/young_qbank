/*
 * @Author: 肖环宇
 * @Date: 2021-07-01 19:40:10
 * @LastEditTime: 2021-07-12 15:17:40
 * @LastEditors: 肖环宇
 * @Description: 
 */
import { pp } from '../axios';
import rootStore from './index';
import { ElMessage } from 'element-plus'

const exampaper = {

    namespaced: false,
    state: {
        //试卷的题目列表
        topicList: [

        ],
        tableHead: [
            {
                prop: "name",
                label: "试卷名称",
                chart: false,
                roles: ['teacher', 'admin']
            },
            {
                prop: "course",
                label: "所属课程",
                chart: true,
                roles: ['teacher', 'admin']
            },
            {
                prop: "tid",
                label: "出卷人编号",
                chart: false,
                roles: ['admin']
            },
        ],
        //题型列表
        /* 
        {
        
        }
         */
        typeList: [

        ],
        //试卷库
        paperList: [],
        //整张试卷的对象
        nowScore: 0,
        paperContent: {
            Info: {
                name: '',
                score: '',
                duration: '',
                course: '',
                type:'',
                
            },
            //当前的总分

            Single: {
                //题型描述
                info: '',
                //题目 元素是single中sContent对象

                topic: [

                ],
            },
            Multiple: {
                //题型描述
                info: '',
                //题目
                topic: [],
            },
            Truefalse: {
                //题型描述
                info: '',
                //题目
                topic: [],
            },
            Fill: {
                //题型描述
                info: '',
                //题目
                topic: [],
            },
            Answer: {
                //题型描述
                info: '',
                //题目
                topic: [],
            }
        }
        ,
        currentOrder: 0,
        //总试卷数
        totalCount: 0,
        //判断是在试卷中编辑题目还是在题库中编辑题目
        inPaper: false,
        //判断实在编辑旧试卷的id,平时为null，只有点击编辑时临时赋值
        editId: null,
        chartData: [],
    },

    mutations: {
        //添加单个题目
        addTopic(state, topic) {
            state.paperContent[topic.type].topic.push(topic.content);
            this.commit('countNowCount');
        },
        //删除单个题目
        //data  {typeName,order}
        deleteTopic(state, data) {
            //此处order为题目order，从1开始
            let topics = state.paperContent[data.typeName].topic;
            for (const key in topics) {
                if (topics[key].order > data.order) {
                    topics[key].order--;
                }
            }
            topics.splice(data.order - 1, 1);

            for (const key in state.typeList) {
                if (state.typeList[key].name === data.typeName) {
                    state.typeList[key].num = topics.length;
                    break;
                }
            }
            this.commit('countNowCount');
        },

        addType(state, type) {
            state.typeList = state.typeList.splice(0);
            for (const item of state.typeList) {
                if (item.index === type.index) {
                    return;
                }
            }
            state.typeList.push(type);
            state.typeList.sort((a, b) => a.index - b.index);
            //console.log('typeList:');
            //console.log(state.typeList);

        },
        //删除单个题型
        deleteType(state, type) {
            state.typeList = state.typeList.splice(0);
            for (const index in state.typeList) {
                if (state.typeList[index].index == type.index) {
                    state.typeList.splice(index, 1);
                    break;
                }
                state.paperContent[type.name] = {
                    //题型描述
                    info: '',
                    //题目 元素是single中sContent对象
                    topic: [
                    ],
                };
            }
            this.commit('countNowCount');
        },
        saveType(state) {
            for (const type in state.typeList) {

                state.typeList[type].num = state.typeList[type].num < 0 ? 0 : state.typeList[type].num
                let newN = state.typeList[type].num;

                let key = state.typeList[type].name;

                let oldN = state.paperContent[key].topic.length;

                let addN = newN - oldN;
                console.log('saveType:' + key);
                console.log('新增:' + addN);
                //该题型默认分值
                //所有的order键都是为了将来的的题目，题型拖拽换位
                let deScore = state.typeList[type].score;
                for (let i = 0; i < addN; i++) {
                    //单选题
                    if (key == "Single") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            level: '易',
                            question: "",
                            course: "",
                            
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
                        });
                    }
                    //填空题   
                    else if (key == "Fill") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            level: '易',
                            course: "",
                            question: [
                                {
                                    order: 1,
                                    head: '',
                                    tail: '',
                                    answer: "",
                                },
                            ],
                            explain: "",
                        })
                    }
                    //多选题
                    else if (key == "Multiple") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            level: '易',
                            course: "",
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
                        });
                    }
                    //简答题
                    else if (key == "Answer") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            level: '易',
                            course: "",
                            question: "",
                            subQ: [
                                {
                                    order: 1,
                                    content: "",
                                    answer: "",
                                }
                            ],
                            explain: "",
                        });
                    }
                    //判断题
                    else if (key == "Truefalse") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            level: '易',
                            course: "",
                            question: "",
                            answer: true,
                            explain: "",
                        });
                    }
                }

            }
            this.commit('countNowCount');


        },
        setOrder(state, order) {
            state.currentOrder = order;
        },
        setEditId(state, id) {
            state.editId = id;
            console.log('创建试卷中:', id);
        },

        resetPaper(state) {
            state.paperContent = {
                Info: {
                    name: '',
                    score: '',
                    duration: '',
                    course: '',
                    type:'',

                },
                Single: {
                    //题型描述
                    info: '',
                    //题目 元素是single中sContent对象

                    topic: [

                    ],
                },
                Multiple: {
                    //题型描述
                    info: '',
                    //题目
                    topic: [],
                },
                Truefalse: {
                    //题型描述
                    info: '',
                    //题目
                    topic: [],
                },
                Fill: {
                    //题型描述
                    info: '',
                    //题目
                    topic: [],
                },
                Answer: {
                    //题型描述
                    info: '',
                    //题目
                    topic: [],
                }
            }
            this.commit('countNowCount');
        },
        setInPaper(state, boolVal) {
            state.inPaper = boolVal;
            console.log('在试卷中编辑:', state.inPaper);
        },
        setNewPaper(state, boolVal) {
            state.newPaper = boolVal;
            console.log('创建试卷中:', state.newPaper);
        },
        //导入题目
        importTopics(state, topics) {
            var paper = state.paperContent;
            for (const key0 in topics) {
                let type = topics[key0].type;
                let pTopics = paper[type].topic;
                let repeat = false;
                for (const key1 in pTopics) {
                    //pTopics[key1].id默认不存在
                    if (pTopics[key1].id === topics[key0].id) {
                        //如果题目已经添加过，则覆盖
                        //1.先记录下原题目的序号与分值，因为这两个属性被覆盖时不会被保留
                        let order = pTopics[key1].order;
                        let score = pTopics[key1].score;
                        pTopics[key1] = topics[key0].content;
                        pTopics[key1].order = order;
                        pTopics[key1].score = score;
                        repeat = true;
                        console.log('覆盖', type, order);
                        break;
                    }
                }
                if (!repeat) {
                    //否则，直接加在题目数组的末尾
                    let order = pTopics.length + 1;
                    // let score = state.typeList[type].score;
                    topics[key0].content.score = 0;
                    topics[key0].content.order = order;
                    topics[key0].content.id = topics[key0].id;
                    
                    for (const tType of state.typeList) {
                        if (tType.name === type) {
                            topics[key0].content.score = tType.score;
                        }
                    }
                    pTopics.push(topics[key0].content);
                    console.log('新增', order, topics[key0].content);
                }

            }
            //同步题型列表中，题目的数量
            for (const tType of state.typeList) {
                tType.num = state.paperContent[tType.name].topic.length;
            }
            this.commit('countNowCount');
        },

        //改变当前编辑的试卷
        setCurrentPaper(state, data) {
            state.paperContent = data;
        },
        countNowCount(state) {
            state.nowScore = 0;
            let paper = state.paperContent
            for (const type in paper) {
                if (Object.prototype.hasOwnProperty.call(paper[type], "topic")) {
                    for (const tp of paper[type].topic) {
                        state.nowScore += tp.score;
                    }
                }

            }
            console.log('当前总分', state.nowScore);
        },



    },
    actions: {
        async getPapers({ state }, data) {

            let url = '';
            if (rootStore.state.userType === 'teacher') {
                url = `paper/findByTea/${rootStore.state.userInfo.id}/${data.index}/${data.size}`;
            }
            else {
                url = `paper/findByPage/${data.index}/${data.size}`
            }

            pp.get(url).then(res => {
                state.paperList = [];
                state.totalCount = res.data.totalCount;
                for (const paper of res.data.list) {
                    state.paperList.push({
                        id: paper.paperNo,
                        tid: paper.paperTea,
                        name: paper.paperName,
                        course: paper.paperClass,
                        type:paper.paperType,
                        json: paper.paperInfo,
                    });
                }
                console.log('paperList', state.paperList);
            })
        },
        //保存创建试卷
        async finishPaper(context) {
            let tempBody = {};
            tempBody.paperName = context.state.paperContent.Info.name;
            tempBody.paperScore = context.state.paperContent.Info.score;
            tempBody.paperTime = context.state.paperContent.Info.duration;
            tempBody.paperClass = context.state.paperContent.Info.course;
            tempBody.paperTea = rootStore.state.userInfo.id;
            tempBody.paperInfo = JSON.stringify(context.state.paperContent);
            tempBody.paperType = 'no';
            //如果没有试卷id,即在创建试卷
            if (!context.state.editId) {
                await pp.post('paper/add', tempBody).then(res => {
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
            else {
                tempBody.paperNo = context.state.editId;
                await pp.post('paper/update_by_id', tempBody).then(res => {
                    if (res.data === 1) {
                        ElMessage.success({
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                    else {
                        ElMessage.error({
                            message: '修改失败',
                            type: 'error'
                        });
                    }
                })
            }
            await context.dispatch('getPapers', { index: 1, size: 10000 })

        },
        //删除试卷
        async delPaper(context, id) {
            // state.paperList.splice(index, 1);
            await pp.get(`paper/delete_by_id/${id}`).then(res => {
                if (res.data === 1) {
                    ElMessage.success({
                        message: '删除成功',
                        type: 'success'
                    });
                }
                else {
                    ElMessage.error({
                        message: '删除失败',
                        type: 'error'
                    });
                }
            })

            await context.dispatch('getPapers', { index: 1, size: 10000 })

        },
        async getPNumByCs({ state }) {
            state.chartData = [];
            let courses = rootStore.state.userType === 'teacher' ?
                rootStore.state.cs.myCourses :
                rootStore.state.cs.courseList;


            let noreapts = [];
            for (const cs of courses) {
                if (noreapts.indexOf(cs.cName) < 0) {
                    noreapts.push(cs.cName);
                }
            }
            console.log('norepeats', noreapts);
            let id = rootStore.state.userInfo.id;

            if (rootStore.state.userType === 'teacher') {
                for (const cs of noreapts) {
                    await pp.get(`paper/findByClaAndTea/${cs}/${id}/1/0`).then(res => {
                        if (res.data === 0) {
                            state.chartData.push({ value: 0, name: cs })
                        }
                        else {
                            state.chartData.push({ value: res.data.totalCount, name: cs })
                        }
                    })
                }
            } else {
                for (const cs of noreapts) {
                    await pp.get(`paper/findByCla/${cs}/1/0`).then(res => {
                        if (res.data === 0) {
                            state.chartData.push({ value: 0, name: cs })
                        }
                        else {
                            state.chartData.push({ value: res.data.totalCount, name: cs })
                        }
                    })
                }
            }

        },
        async pushPaper({state},key){
            let tempBody={};
            tempBody.paperNo = state.paperList[key].id;
            state.paperList[key].type='yes';
            tempBody.paperType = 'yes';
            
            await pp.post('paper/update_by_id', tempBody).then(res => {
                if (res.data === 1) {
                    ElMessage.success({
                        message: '发布成功',
                        type: 'success'
                    });
                }
                else {
                    ElMessage.error({
                        message: '发布失败',
                        type: 'error'
                    });
                }
            })
        },
    },
    getters: {}

}
export default exampaper