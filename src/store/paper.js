const exampaper = {

    namespaced: false,
    state: {
        //试卷的题目列表
        topicList: [

        ],
        //题型模板
        sTem: {
            order: 1,
            score: 5,
            question: "",
            choice: [
                {
                    name: "A",
                    content: "",
                },
                {
                    name: "B",
                    content: "",
                },
                {
                    name: "C",
                    content: "",
                },
                {
                    name: "D",
                    content: "",
                },
            ],
            answer: "",
        },
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
            console.log(topics)
        },
        //添加单个题型
        /* {
        index: index,
        name: name,
        order: index,
        num: 0,
      } */
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
                let newN = state.typeList[type].num;
                let key = state.typeList[type].name;

                let oldN = state.paperContent[key].topic.length;

                let addN = newN - oldN;
                console.log('saveType:' + key);
                console.log('新增:' + addN);
                //该题型默认分值
                let deScore = state.typeList[type].score;
                for (let i = 0; i < addN; i++) {
                    //单选题
                    if (key == "Single") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: deScore,
                            question: "",
                            choice: [
                                {
                                    name: "A",
                                    content: "",
                                },
                                {
                                    name: "B",
                                    content: "",
                                },
                                {
                                    name: "C",
                                    content: "",
                                },
                                {
                                    name: "D",
                                    content: "",
                                },
                            ],
                            answer: "",
                        });
                    }
                    //填空题   
                    else if (key == "Fill") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
                            score: 5,
                            question: [
                                {
                                    order: 1,
                                    head: '',
                                    tail: '',
                                    answer: "",
                                },
                            ],
                        })
                    }
                    else {
                        state.paperContent[key].topic.push({
                            order: ++state.order,
                            score: 5,
                            question: "",
                            choice: [
                                {
                                    name: "A",
                                    content: "",
                                },
                                {
                                    name: "B",
                                    content: "",
                                },
                                {
                                    name: "C",
                                    content: "",
                                },
                                {
                                    name: "D",
                                    content: "",
                                },
                            ],
                            answer: "",
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
        addSingleItem(state, order) {
            /*
                {
                  order:0,
                   question: "",
                  choice: [],
                      answer: "",
                  },
               */
            /*{
            name:'A',
            content:'',
            }
            
            */

            var aimTopic = state.paperContent.Single.topic[order - 1];
            var i = aimTopic.choice.length;

            aimTopic.choice.push({
                name: String.fromCharCode(65 + i),
                content: '',
            })
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
    },
    actions: {

    },
    getters: {}
}

export default exampaper