/*
 * @Author: 肖环宇
 * @Date: 2021-07-05 09:59:40
 * @LastEditTime: 2021-07-12 15:43:24
 * @LastEditors: 肖环宇
 * @Description: 
 */

import { instance } from '../axios';
import rootStore from './index';
import { ElMessage } from 'element-plus'

const course = {

    namespaced: false,
    state: {

        tableHead: [
            {
                prop: "cName",
                label: "课程名称",
            },
            {
                prop: "tName",
                label: "老师名称",
            },

        ],
        courseList: [],
        //已加入的课程
        myCourses: [],
        totalCount:0,

    },

    mutations: {
      


    },

    actions: {
       
        //分页得到所有课程
        async getCourses(context,data) {
            return instance.get(`class/findByPage/${data.index}/${data.size}`).then(res => {
                context.state.courseList = [];
                context.state.totalCount = res.data.totalCount;
                for (const course of res.data.list) {
                    context.state.courseList.push({
                        id: course.id,
                        cName: course.name,
                        tid: course.tid,
                        tName: course.tname
                    })
                }
                console.log('courseList', context.state.courseList);
            })
        },
        //学生得到已选课程
        async getChosen(context) {
            return instance.get(`class/findClaByStu/${rootStore.state.userInfo.id}/1/1000`).then(res => {
                context.state.myCourses = [];
                for (const course of res.data.list) {
                    context.state.myCourses.push({
                        id: course.id,
                        cName: course.name,
                        tid: course.tid,
                        tName: course.tname
                    })
                }
                console.log('已选课程', context.state.myCourses);
            })
        },
        //学生加入课程
        async joinCourse(context, course) {
            let tempBody = {};
            tempBody.cid = course.id;
            tempBody.tid = course.tid;
            tempBody.sid = rootStore.state.userInfo.id;
            //加入课程
            await instance.post('class/choose_lesson', tempBody).then(res => {
                if (res.status === 200) {
                    ElMessage.success({
                        message: '加入成功',
                        type: 'success'
                    });
                }
                else {
                    ElMessage.error({
                        message: '加入失败',
                        type: 'error'
                    });
                }
            });

            await context.dispatch('getChosen');
            await context.dispatch('getCourses',{index:1,size:1000});

        },
        //老师得到自己创建的课程
        async getTeaCourse(context) {
            return instance.get(`class/findClaByTea/${rootStore.state.userInfo.id}/1/1000`).then(res => {
                context.state.myCourses = [];
                context.state.totalCount = res.data.totalCount;
                for (const course of res.data.list) {
                    context.state.myCourses.push({
                        id: course.id,
                        cName: course.name,
                        tid: course.tid,
                        tName: course.tname
                    })
                }
                console.log('已交课程', context.state.myCourses);
            })
        },
         //老师创建课程
         async saveCourse(context, name) {
            await instance.post('class/addClass', {
                name: name,
                tid: rootStore.state.userInfo.id,
                tname: rootStore.state.userInfo.name,
            }).then(res => {
                if (res.data === 1) {
                    ElMessage.success({
                        message: '创建成功',
                        type: 'success'
                    });
                }
                else {
                    ElMessage.error({
                        message: '创建失败',
                        type: 'error'
                    });
                }
            })
            //刷新课程列表
               await context.dispatch('getTeaCourse');
        },
        //按照搜索所有课程
        async searchAllCs({state},data){
            if(data.type==='course'){
                await instance.get(`class/findByName/${data.val}`).then(res=>{
                    state.courseList = [];
                    for (const course of res.data) {
                        state.courseList.push({
                            id: course.id,
                            cName: course.name,
                            tid: course.tid,
                            tName: course.tname
                        })
                    }
                })
            }
            else if(data.type==='teacher'){
                await instance.get(`class/findByName/${data.val}`).then(res=>{
                    state.myCourses = [];
                    for (const course of res.data.list) {
                        state.myCourses.push({
                            id: course.id,
                            cName: course.name,
                            tid: course.tid,
                            tName: course.tname
                        })
                    }
                })
            }
           
        },
    },
    getters: {}
}

export default course