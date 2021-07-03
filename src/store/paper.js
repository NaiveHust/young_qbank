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
        //整张试卷的对象
        paperContent: {
            Info: {
                name: '',
                score: '',
                duration:'',
                
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
        inPaper:false,

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
            console.log('typeList:');
            console.log(state.typeList);
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
                            level:0,
                            question: "",
                            choice: [
                                {
                                    order:1,
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
                            explain:"",
                        });
                    }
                    //填空题   
                    else if (key == "Fill") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: 5,
                            level: 0,
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
                    else if(key == "Multiple"){
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            level: 0,
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
                            level: 0,
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
                            level: 0,
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
        //增加选项
        addTopicItem(state, data) {
          
            let aimTopic = state.paperContent[data.tType].topic[data.tOrder - 1];
            
            aimTopic[data.iType].push(data.content);
        },
        delTopicItem(state,data) {
            let aimTopic = state.paperContent[data.tType].topic[data.tOrder - 1];
            let aimItems = aimTopic[data.iType];
            for (const key in aimItems ) {
                if (aimItems[key].order > data.iOrder) {     
                    aimItems[key].order--;
                    if (aimItems[key].name) {
                        aimItems[key].name = String.fromCharCode(65 + aimItems[key].order - 1);
                    }
                }
                
            }

            aimItems.splice(data.iOrder - 1, 1);
            console.log('删除后的:',aimItems);


        },
        addFillItem(state, order) {
            /*{
                   order: 0,
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
        finishPaper(state) {
            console.log('编辑完成后的试卷');
            console.log(state.paperContent);
            console.log(JSON.stringify(state.paperContent));
        },
        setInPaper(state, boolVal) {
            state.inPaper = boolVal;
            console.log('在试卷中编辑:',state.inPaper);
        }
    },
    actions: {

    },
    getters: {}
}

export default exampaper