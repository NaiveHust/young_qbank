<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-12 15:01:50
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="paper">
    <!-- 试卷总体信息 保存 -->
    <el-row>
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
        <div class="paper-main-info">
          <el-form :model="paperInfo" ref="form" :inline="true" size="small">
            <el-form-item :label="$t('paper.paperName')">
              <el-input v-model="paperInfo.name"></el-input>
            </el-form-item>

            <el-form-item :label="$t('paper.paperScore')">
              <el-input
                v-model.number="paperInfo.score"
                type="number"
              ></el-input>
            </el-form-item>

            <el-form-item :label="$t('paper.paperDuration')">
              <el-input
                v-model.number="paperInfo.duration"
                type="number"
                style="width: 10vw"
                ><template #append> 分钟 </template></el-input
              >
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="paperInfo.course"
                placeholder="所属课程"
                style="width: 100%; margin-left: 5vw"
              >
                <el-option
                  v-for="(course, index) in courses"
                  :key="index"
                  :label="course.cName"
                  :value="course.cName"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
          </el-form>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        
        <el-progress type="line" 
        class="paper-progress"
        :text-inside="true" 
        :stroke-width="24"
        :color="customColorMethod"
        :percentage="percent">
          <template #default="{  }">
            
            <span class="progress-val">{{nowScore}}/{{paperInfo.score}}</span>       
          </template>
        </el-progress>

      </el-col>
      <!-- 工具栏 -->
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
        <div class="paper-bar">
          <el-button type="primary" round @click="dialogVisible = true"
            >添加题型</el-button
          >
          <el-button type="primary" round @click="importTopic()"
            >导入题目</el-button
          >
          <el-button type="primary" round @click="finishPaper()"
            >保存<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
        <!-- 对话窗 添加题目区 -->
        <el-dialog
          title="添加题型"
          v-model="dialogVisible"
          width="80vw"
          center
          top="10vh"
          :close-on-click-modal="false"
          :show-close="false"
          :before-close="handleClose"
        >
          <el-form ref="topicForm" label-width="100px" class="dialog-form">
            <el-row>
              <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
                <!-- 在dialog中增加题型 -->
                <div class="type-view">
                  <el-form-item
                    v-for="type in typeList"
                    :label="$i18n.messages[$i18n.locale].topic[type.name]"
                    :key="type.key"
                    class="dialog-left-one"
                  >
                    <el-input
                      style="width: 12vw"
                      v-model.number="type.num"
                      type="number"
                      :min="0"
                    >
                      <template #prepend>数目:</template>
                    </el-input>

                    <el-input
                      style="width: 12vw"
                      v-model.number="type.score"
                      type="number"
                      :min="0"
                    >
                      <template #prepend>分值:</template>
                    </el-input>

                    <el-button
                      style="float: right"
                      class="el-icon-delete"
                      @click.prevent="deleteType(type)"
                    ></el-button>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="dialog-right">
                  <!-- value,name,index -->
                  <el-button
                    round
                    v-for="(value, name, index) in $i18n.messages[$i18n.locale]
                      .topic"
                    :key="value.key"
                    @click="chooseType(name, index)"
                  >
                    {{ "添加" }}{{ value }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveType()">确 定</el-button>
            </span>
          </template>
        </el-dialog>
        <ImportTopic ref="import"></ImportTopic>
      </el-col>
    </el-row>
    <!-- 主区域 -->
    <el-row style="height: 90%">
      <!-- <el-col>

      </el-col> -->
      <!-- 试卷大纲显示 -->
      <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4">
        <div class="paper-outline-view">
          <el-scrollbar style="height: 75vh">
            <transition-group>
              <ul
                class="type"
                v-for="type in typeListCopy"
                :key="type.index"
                style="width: 90%; display: flex; flex-direction: column"
                draggable="true"
                @dragstart="handleDragStart($event, type)"
                @dragover.prevent="handleDragOver($event, type)"
                @dragenter="handleDragEnter($event, type)"
                @dragend="handleDragEnd($event, type)"
              >
                <div>
                  <span>{{ type.label }}</span>
                  <el-button
                    size="small"
                    :class="
                      type.fold ? 'el-icon-caret-right' : 'el-icon-caret-bottom'
                    "
                    style="float: right"
                    @click="type.fold = !type.fold"
                  ></el-button>
                </div>

                <li
                  v-for="(topic, index) in paperContent[type.name].topic"
                  v-show="!type.fold"
                  :key="index"
                  style="height: 5vh"
                  class="topic"
                  @click="editTopic(type.name, topic.order)"
                >
                  第{{ topic.order }}题

                  <el-button
                    class="el-icon-delete"
                    @click.stop="deleteTopic(type.name, topic.order)"
                    style="float: right"
                  >
                  </el-button>
                </li>
              </ul>
            </transition-group>
          </el-scrollbar>
        </div>
      </el-col>

      <!-- 试卷内容编辑 -->
      <el-col :xs="16" :sm="16" :md="18" :lg="20" :xl="20" :offset="0">
        <div class="paper-edit">
          <component :is="editCom" class="topic-com"></component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Single from "../topic/Single";
import Multiple from "../topic/Multiple";
import Answer from "../topic/Answer";
import Fill from "../topic/Fill";
import Truefalse from "../topic/TrueFalse";
import ImportTopic from "./ImportTopic";
export default {
  data() {
    return {
      form: {
        paperName: "",
        paperScore: "",
        paperDuration: "",
      },

      dragging: null,
      div: null,
      dialogVisible: false,
      editCom: "",
    };
  },
  components: {
    Single,
    Multiple,
    Answer,
    Fill,
    Truefalse,
    ImportTopic,
  },
  //会有缓存，只有依赖的响应式属性发生变化时，才会重新计算。
  computed: {
    topicList() {
      return this.$store.state.paper.topicList;
    },
    typeList() {
      return this.$store.state.paper.typeList;
    },
    typeListCopy() {
      return this.$store.state.paper.typeList
        .slice(0)
        .sort((a, b) => a.order - b.order);
    },
    paperInfo() {
      return this.$store.state.paper.paperContent.Info;
    },
    paperContent() {
      return this.$store.state.paper.paperContent;
    },
    courses() {
      return this.$store.state.cs.myCourses;
    },
    nowScore(){
      return this.$store.state.paper.nowScore;
    },
    percent(){
      let percent = this.nowScore/(this.paperInfo.score===0?100:this.paperInfo.score)*100;
      return percent>100?100:percent;
    }
  },
  created() {
    this.div = document.createElement("div");
    document.body.appendChild(this.div);
    this.$store.commit("setInPaper", true);
    if (this.$store.state.userType === "teacher") {
      this.$store.dispatch("getTeaCourse");
    } else {
      this.$store.dispatch("getCourses");
    }
    console.log("ExamPaper created!");
  },
  methods: {
    handleDragStart(e, item) {
      this.dragging = item;
      e.dataTransfer.setDragImage(this.div, 0, 0);
    },
    handleDragEnd() {
      this.dragging = null;
      // console.log(e);
      //console.log(item);
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move";

      // e.dataTransfer.dropEffect="move";
      // console.log(e.target);
      //在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }
      //交换元素在数组中的顺序

      // const src = this.paperContent.indexOf(this.dragging);
      // const dst = this.paperContent.indexOf(item);
      var temp = this.dragging.order;
      this.dragging.order = item.order;
      item.order = temp;
    },
    handleClose() {
      console.log("关闭了");
    },
    addType(type) {
      this.$store.commit("addType", type);
    },
    deleteType(type) {
      this.$store.commit("deleteType", type);
    },

    chooseType(name, index) {
      this.addType({
        index: index,
        name: name,
        label: this.$i18n.messages["cn"].topic[name],
        order: index,
        //题型是否折叠
        fold: false,
        num: 0,
        //此为全局默认分数，可被全局覆盖
        score: 5,
      });
    },

    saveType() {
      this.$store.commit("saveType");
      this.dialogVisible = false;
    },
    editTopic(name, order) {
      this.editCom = name;
      this.$store.commit("setOrder", order);
      console.log(name);
    },
    importTopic() {
      this.$refs.import.dialogVisible = true;
    },
    deleteTopic(typeName, order) {
      this.$store.commit("deleteTopic", { typeName, order });
    },

    finishPaper() {
      this.$store.dispatch("finishPaper");
    },
     customColorMethod(percentage) {
       console.log(percentage)
        if (percentage < 30) {
          return '#909399';
        } else if (percentage < 70) {
          return '#e6a23c';
        } 
        else if(this.nowScore>this.paperInfo.score){
          return '#F56C6C'
        }
        else {
          return '#67c23a';
        }
        
      },
  },
};
</script>

<style scoped>
.paper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.paper-main-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
}
.paper-bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.paper-progress{
  width: 100%;
  height: 100%;
}

.paper-bar button {
  height: 80%;
  width: auto;
}
.paper-outline-view {
  width: 100%;
  height: 95%;

  background: rgb(31, 138, 180, 0.1);
  margin: 2% 0;
}
.paper-edit {
  width: 100%;
  height: 100%;
}

.topic-com {
  width: 95%;
  height: 95%;
  margin: 1%;
  border: 1vh solid rgb(41, 86, 207, 0.3);
}
.el-form-item {
  width: 20%;
}
.type {
  margin: 2vh 0;
  transition: all linear 0.3s;
  border: 1vh solid rgb(166, 186, 224);
}
.topic {
  margin: 1vh 0;
  border: 1vh solid #fff;
}
.type-view {
  height: 90%;
  width: 90%;
  margin: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px ridge rgb(62, 130, 185, 0.5);
  border-radius: 1rem;
}

.dialog-form {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(62, 130, 185, 0.5);
  border-radius: 1rem;
}
.dialog-footer {
  height: 10%;
}
.dialog-right {
  height: 50vh;
  width: 90%;
  margin: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px ridge rgb(62, 130, 185, 0.5);
  border-radius: 1rem;
}
.dialog-right .el-button {
  width: 60%;
  width: 80%;
  margin: 2% 0;

  color: rgb(36, 3, 51);
  background: rgba(21, 103, 197, 0.2);
}
.dialog-left-one {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}

.type-view .el-form-item {
  display: flex;
  width: 100%;
  color: rgba(160, 33, 219, 1);
  background: rgba(27, 28, 109, 0.1);
}
.progress-val{
  font-size: 16px;
}
</style>