/*
 * @Author: 肖环宇
 * @Date: 2021-07-01 19:40:10
 * @LastEditTime: 2021-07-06 19:41:59
 * @LastEditors: 肖环宇
 * @Description: 
 */

const exampaper = {

    namespaced: false,
    state: {
        //试卷的题目列表
        topicList: [

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
        paperContent: {
            Info: {
                name: '',
                score: '',
                duration: '',

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
        ,
        currentOrder: 0,

        //判断是在试卷中编辑题目还是在题库中编辑题目
        inPaper: false,

    },

    mutations: {
        //添加单个题目
        addTopic(state, topic) {
            state.paperContent[topic.type].topic.push(topic.content);
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

            console.log(topics)
        },

        addType(state, type) {
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
            console.log('typeList:');
            console.log(state.typeList);
            console.log('paperContent:');
            console.log(state.paperContent);
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
                            score: 5,
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
                        })
                    }
                    //多选题
                    else if (key == "Multiple") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
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
                        });
                    }
                    //简答题
                    else if (key == "Answer") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
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
                        });
                    }
                    //判断题
                    else if (key == "Truefalse") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            level: '易',
                            question: "",
                            answer: true,
                            explain: "",
                        });
                    }
                }

            }
            console.log('json:');
            console.log(state.paperContent);

        },
        setOrder(state, order) {
            state.currentOrder = order;
        },

        addFillItem(state, order) {
            /*{
                   order: '易',
                   score: 5,
                   question: [
                                {
                                    order: i + 1,
                                    head: '',
                                    tail:'',
                                    answer:'',
                                },
                            ],
                          
                            ,
                        }*/
            var aimTopic = state.paperContent.Fill.topic[order - 1];
            var i = aimTopic.question.length;
            aimTopic.question.push({
                order: i + 1,
                head: '',
                tail: '',
                answer: '',
            });

        },
        //保存创建试卷
        finishPaper(state) {
            console.log('编辑完成后的试卷');
            console.log(state.paperContent);
            console.log(JSON.stringify(state.paperContent));
            let i = state.paperList.length;
            state.paperList.push({
                //id由后端自动生成,目前只是前端模仿生成.
                id: i,
                name: state.paperContent.Info.name,
                json: JSON.stringify(state.paperContent),
            });
            console.log('paperList', state.paperList);
        },
        setInPaper(state, boolVal) {
            state.inPaper = boolVal;
            console.log('在试卷中编辑:', state.inPaper);
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
                            topics[key0].content.score = type.score;
                        }
                    }
                    pTopics.push(topics[key0].content);
                    console.log('新增', order, type);
                }

            }
            //同步题型列表中，题目的数量
            for (const tType of state.typeList) {
                tType.num = state.paperContent[tType.name].topic.length;
            }
        },
        //删除试卷
        delPaper(state, index) {
            state.paperList.splice(index, 1);
        },
        //改变当前编辑的试卷
        setCurrentPaper(state, data) {
            state.paperContent = data;
        }


    },
    actions: {

    },
    getters: {}
}

export default exampaper