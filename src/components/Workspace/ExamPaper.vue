<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-11 13:39:07
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="paper">
    <!-- 试卷总体信息 保存 -->
    <el-row>
      <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
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
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="paperInfo.course"
                placeholder="所属课程"
                style="width: 100%"
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
      <!-- 工具栏 -->
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="paper-bar">
          <el-button type="primary" @click="dialogVisible = true"
            >编辑题目</el-button
          >
          <el-button type="primary" @click="importTopic()">导入题目</el-button>
          <el-button type="primary" @click="finishPaper()"
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
                    style="float:right"
                    class="el-icon-delete"
                    @click.prevent="deleteType(type)"
                      ></el-button
                    >
                  </el-form-item>
                </div>
              </el-col>

              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="dialog-right">
                  
                    <!-- value,name,index -->
                    <el-button
                     
                      round
                      v-for="(value, name, index) in $i18n.messages[
                        $i18n.locale
                      ].topic"
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
      <!-- 试卷大纲显示 -->
      <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4">
        <div class="paper-outline-view">
          <el-scrollbar style="height: 75vh">
            <transition-group>
              <ul
                class="item"
                v-for="type in typeListCopy"
                :key="type.index"
                style="width: 90%; display: flex; flex-direction: column"
                draggable="true"
                @dragstart="handleDragStart($event, type)"
                @dragover.prevent="handleDragOver($event, type)"
                @dragenter="handleDragEnter($event, type)"
                @dragend="handleDragEnd($event, type)"
              >
                {{
                  type.name
                }}
                {{
                  type.order
                }}
                {{
                  type.num
                }}
                {{
                  type.score
                }}

                <li
                  v-for="(topic, index) in paperContent[type.name].topic"
                  :key="index"
                  style="height: 5vh"
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
          <component
            :is="editCom"
            style="width: 100%; height: 100%"
          ></component>
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
        order: index,
        num: 1,
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

.paper-bar button {
  height: 80%;
  width: auto;
}
.paper-outline-view {
  width: 100%;
  height: 95%;
  
  background: rgb(31, 138, 180,0.2);
  margin: 2% 0;
}
.paper-edit {
  width: 100%;
  height: 100%;
}
.el-form-item {
  width: 20%;
}
.item {
  margin-top: 10px;
  transition: all linear 0.3s;
}

.type-view {
  height: 90%;
  width: 90%;
  margin: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
   border:  2px ridge rgb(62, 130, 185, 0.5);
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
  border:  2px ridge rgb(62, 130, 185, 0.5);
  border-radius: 1rem;
}
.dialog-right .el-button{
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
</style>