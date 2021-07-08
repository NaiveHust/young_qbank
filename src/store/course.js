/*
 * @Author: 肖环宇
 * @Date: 2021-07-05 09:59:40
 * @LastEditTime: 2021-07-07 12:34:50
 * @LastEditors: 肖环宇
 * @Description: 
 */

const course = {

    namespaced: false,
    state: {

        tableHead: [
            {
                prop: "name",
                label: "课程名称",
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

    },
    getters: {}
}

export default course