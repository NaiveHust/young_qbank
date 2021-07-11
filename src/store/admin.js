/*
 * @Author: 肖环宇
 * @Date: 2021-07-09 10:56:25
 * @LastEditTime: 2021-07-10 22:33:06
 * @LastEditors: 肖环宇
 * @Description: 
 */
import { instance,  } from '../axios';
//import rootStore from './index';
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
        chartData:[],
    },

    mutations: {


    },

    actions: {

        async getStus(context, data) {
            context.state.tableHead =  [
                {
                    prop: "id",
                    label: "学生账号",
                    chart:false,
                },
                {
                    prop: "pwd",
                    label: "学生密码",
                    chart:false,
                },
                {
                    prop: "name",
                    label: "学生姓名",
                    chart:false,
                },
                {
                    prop: "discipline",
                    label: "学生专业",
                    chart:false,
                },
                {
                    prop: "grade",
                    label: "学生年级",
                    chart:false,
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
                    chart:false,
                },
                {
                    prop: "pwd",
                    label: "老师密码",
                    chart:false,
                },
                {
                    prop: "name",
                    label: "老师姓名",
                    chart:false,
                },
                {
                    prop: "discipline",
                    label: "老师专业",
                    chart:false,
                },
                {
                    prop: "mail",
                    label: "老师邮箱",
                    chart:false,
                },
            ]
            return instance.get(`teacher/findByPage/${data.index}/${data.size}`).then(res => {
                //查询为空
                if (res.data !== 0)
                    context.state.totalCount = res.data.totalCount;
                    context.state.teaList = res.data.list;
                
            })
        },
        async getchartData({state}){
            state.chartData=[];
            await instance.get(`student/findByPage/1/0`).then(res => {
                //查询为空
                if (res.data !== 0) {
                    
                    state.chartData.push({value:res.data.totalCount,name:'学生'})
                }
            })
            await instance.get(`teacher/findByPage/1/0`).then(res => {
                //查询为空
                if (res.data !== 0) {
                    
                    state.chartData.push({value:res.data.totalCount,name:'老师'})
                }
            })
            
            
        },
        


        
    },
    getters: {}
}

export default admin;