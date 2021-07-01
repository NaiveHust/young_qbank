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
        

    },

    mutations: {
        //添加单个题目
        addTopic(state, topic) {
            state.paperContent[topic.type].topic.push(topic.content);
        },
        //删除单个题目
        deleteTopic(state, topic) {
            state.topicList.splice(topic.index, 1)
        },
        //添加单个题型
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
                    state.typeList.splice(index, 1)
                    state.paperContent
                    return;
                }
            }
            console.log('typeList:');
            console.log(state.typeList);
        },
        saveType(state) {
            for (const type in state.typeList) {
                let newN = state.typeList[type].num;
                let key = state.typeList[type].name;

                let oldN = state.paperContent[key].topic.length;

                let addN = newN - oldN;
                console.log('saveType:' + key);
                console.log('新增:' + addN);
                for (let i = 0; i < addN; i++) {
                    if (key == "Single") {
                        state.paperContent[key].topic.push({
                            order: oldN + i + 1,
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
        saveTopic(state, key, content, order) {

            state.paperContent[key].topic[order] = content;
            console.log('保存题目后');
            console.log(content);
            console.log(state.paperContent[key].topic)
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
            
            var aimTopic = state.paperContent.Single.topic[order-1];
            var i = aimTopic.choice.length;
          
            aimTopic.choice.push({
                name: String.fromCharCode(65 + i ),
                content:'',
            })
        }
    },
    actions: {
       
    },
    getters: {}
}

export default exampaper