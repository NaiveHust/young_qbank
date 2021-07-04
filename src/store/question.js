
const question = {

    namespaced: false,
    state: {
        //选择编辑的题目在题目列表中的序号
        qsOrder:0,
        //试题库
        //暂时模拟后端数据
        qsBank:[ 
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
        
      
    },

    mutations: {
     
        setQsOrder(state, order) {
            state.qsOrder = order;
        },
        },
       
    actions: {

    },
    getters: {}
}

export default question