/*
 * @Author: 肖环宇
 * @Date: 2021-07-05 09:59:40
 * @LastEditTime: 2021-07-09 15:22:01
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


    },

    mutations: {
        saveCourse(state, course) {
            state.courseList.push(course);
            //TODO 将题目存到服务器 teaid coursename

        },
        undoCourse(state) {
            console.log(state.courseList);
        }

    },

    actions: {
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
         /*    await instance.get(`class/findByTea/${rootStore.state.userInfo.id}`).then(res=>{


                context.state.courseList
            }) */
        },
        async getCourses(context){
            await instance.get('class/findByPage/1/1000').then(res=>{
                context.state.courseList = [];
                for (const course of res.data.list) {
                    context.state.courseList.push({
                        id:course.id,
                        cName:course.name,
                        tid:course.id,
                        tName:course.tname
                    })
                }
                console.log('courseList',context.state.courseList);
            })
        }

    },
    getters: {}
}

export default course