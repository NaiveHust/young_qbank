/*
 * @Author: 肖环宇
 * @Date: 2021-07-09 10:56:25
 * @LastEditTime: 2021-07-09 20:44:36
 * @LastEditors: 肖环宇
 * @Description: 
 */
import { instance, pp, qs } from '../axios';
import rootStore from './index';
//import { ElMessage } from 'element-plus'

const admin = {
    namespaced: false,
    state: {

        userType: [
            { label: '学生', value: 1 },
            { label: '老师', value: 2 },
            
            { label: '课程', value: 3 },
            { label: '试题', value: 4 },
            { label: '试卷', value: 5 },
        ],
        //学生
        stuList: [],

        
       
        //  老师
        teaList: [],
       

        tableHead:[],
        //实体的总数mu
        totalCount: 0,
    },

    mutations: {


    },

    actions: {

        async getStus(context, data) {
            context.state.tableHead =  [
                {
                    prop: "id",
                    label: "学生账号",
                },
                {
                    prop: "pwd",
                    label: "学生密码",
                },
                {
                    prop: "name",
                    label: "学生姓名",
                },
                {
                    prop: "discipline",
                    label: "学生专业",
                },
                {
                    prop: "grade",
                    label: "学生年级",
                },
    
            ]
            return instance.get(`student/findByPage/${data.index}/${data.size}`).then(res => {
                //查询为空
                if (res.data !== 0) {
                
                    context.state.totalCount = res.data.totalCount;
                    context.state.stuList = res.data.list;
               /*      for (const stu of res.data.list) {
                        context.state.stuList.push({
                            id:stu.id,
                            name:stu.name,
                            pwd:stu.pwd,
                            pro:stu.discipline,
                            grade:stu.grade,
                        })
                    } */
                }
            })
        },
        async getTeas(context,data){
            context.state.tableHead =  [
                {
                    prop: "id",
                    label: "老师账号",
                },
                {
                    prop: "pwd",
                    label: "老师密码",
                },
                {
                    prop: "name",
                    label: "老师姓名",
                },
                {
                    prop: "discipline",
                    label: "老师专业",
                },
                {
                    prop: "mail",
                    label: "老师邮箱",
                },
            ]
            return instance.get(`teacher/findByPage/${data.index}/${data.size}`).then(res => {
                //查询为空
                if (res.data !== 0)
                    context.state.totalCount = res.data.totalCount;
                    context.state.teaList = res.data.list;
                
            })
        },
        async getQts(context,data){
            context.state.tableHead =  [
                {
                    prop: "id",
                    label: "题目编号",
                },
                {
                    prop: "tid",
                    label: "出题人",
                },
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
                    label: "难度",
                },
            ]
            return qs.get(`question/findByPage/${data.index}/${data.size}`).then(res => {
                //查询为空
                if (res.data !== 0) {
                    rootStore.state.qs.qsBank = [];
                    context.state.totalCount = res.data.totalCount;
                    for (const qs of res.data.list) {
                        rootStore.state.qs.qsBank.push( {
                            id: qs.proNo,
                            tid:qs.proTea,
                            name: qs.proSimple,
                            course: qs.proClass,
                            type: qs.proType,
                            level: qs.proDif,
                            content: JSON.parse(qs.proDetail),
                        })
                    }
                    
                }
            })
        },
        async getPps(context,data){
            context.state.tableHead =  [
                {
                    prop: "id",
                    label: "试卷id",
                },
                {
                    prop: "name",
                    label: "试卷名称",
                },
                {
                    prop: "tid",
                    label: "出卷人",
                },
                {
                    prop: "course",
                    label: "所属课程",
                },
            ]
            return pp.get(`paper/findByPage/${data.index}/${data.size}`).then(res => {
                //查询为空
                if (res.data !== 0) {
                    context.state.totalCount = res.data.totalCount;
                    for (const paper of res.data.list) {
                        rootStore.state.paper.paperList.push({
                            id: paper.paperNo,
                            name: paper.paperName,
                            tid:paper.paperTea,
                            course:paper.paperClass,
                            json: paper.paperInfo,
                        });
                    }
                }
            })
        },
        async getCrs(context,data){
            context.state.tableHead =  [
                {
                    prop: "id",
                    label: "课程编号",
                },
                {
                    prop: "name",
                    label: "课程名称",
                },
                {
                    prop: "tid",
                    label: "开课人",
                },
                {
                    prop: "tname",
                    label: "老师姓名",
                },
              
            ]
            return instance.get(`class/findByPage/${data.index}/${data.size}`).then(res => {
                //查询为空
                if (res.data !== 0) {
                    context.state.totalCount = res.data.totalCount;
                    rootStore.state.cs.courseList = res.data.list;
                }
            })
        }
        


        
    },
    getters: {}
}

export default admin;