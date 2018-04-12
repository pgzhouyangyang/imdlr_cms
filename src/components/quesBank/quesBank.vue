<template lang="html">
  <div class="container">
      <!-- 导航组件 -->
      <my-header/>
      <div class="main">
          <!-- 面包屑组件 -->
          <bread @refresh="refresh"  :addBtn="false">
          </bread>
          <div class="main-wrapp">
              <div class="main-list">
                  <list
                    menuTitle="所有工种"
                    :menuList="menuList"
                    label="name"
                    @menuSelect="menuSelect"
                  ></list>
              </div>
              <div class="main-table">
              <div class="table-group">
                  <!-- 表格查询组件 -->
                  <search @searchEvent="searchEvent" :searchOptions="options">
                      <div  slot="search-right" class="search-button-group">
                            <el-radio-group v-model="radio" class="button-group-left" @change="radioChange" size="small">
                              <el-radio-button v-for="item in levelList" :label="item.name" :key="item.id"></el-radio-button>
                           </el-radio-group>
                           <el-dropdown trigger="click" @command="moreActions">
                               <span class="el-dropdown-link">
                                 {{moreActionsText}}<i class="el-icon-arrow-down el-icon--right"></i>
                               </span>
                               <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item command="0" v-if="moreActionsText!='所有题型'">所有题型
                                 </el-dropdown-item>
                                 <el-dropdown-item command="1">单选题</el-dropdown-item>
                                 <el-dropdown-item command="2">多选题</el-dropdown-item>
                                 <el-dropdown-item command="3">判断题</el-dropdown-item>
                                 <el-dropdown-item command="4">识图题</el-dropdown-item>
                                 <el-dropdown-item command="5">计算题</el-dropdown-item>
                               </el-dropdown-menu>
                           </el-dropdown>
                      </div>
                  </search>
                  <div class="table-wrapp" id="tableWrapp">
                      <!-- 表格 -->
                      <el-table
                      v-loading="loading"
                      :data="tableData"
                      style="width: 100%"
                      height="100%"
                      ref="multipleTable"
                      stripe
                      border
                      header-row-class-name="table-th"
                      @row-click="rowClick"
                      @row-dblclick="rowDblclick"
                      @selection-change="selectionChange"
                      >
                      <el-table-column
                      type="selection"
                      align="center"
                      width="55">
                       </el-table-column>
                       <el-table-column
                          type="index"
                          width="80"
                          label="序号"
                          align="center"
                          fixed
                          >
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        :formatter="formatter"
                        label="试题类型"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        min-width="100">
                      </el-table-column>
                      <el-table-column
                        prop="code"
                        label="试题编号"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        min-width="100">
                      </el-table-column>
                      <el-table-column
                        prop="difficulty"
                        label="难易度"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        min-width="100">
                      </el-table-column>
                      <el-table-column
                        prop="score"
                        label="分值"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        min-width="100">
                      </el-table-column>
                      <el-table-column
                        prop="time"
                        label="答题时长"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        min-width="100">
                      </el-table-column>
                      <el-table-column
                        prop="content"
                        label="试题正文"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        min-width="300">
                      </el-table-column>
                      <el-table-column
                        label="基本信息"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        min-width="120">
                        <template slot-scope="scope">
                            <div class="text-dec-link" @click="infoView(scope.row)">
                                基本信息
                            </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          fixed="right"
                          label="操作"
                          align="center"
                          min-width="80">
                          <template slot-scope="scope">
                            <el-button @click="switchStatus(scope.row)" type="text" size="small"><el-tag :type="scope.row.status?'danger':'success'">{{scope.row.status?"禁用":"启用"}}</el-tag></el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                  </div>
                  <!-- 表格底部分页 -->
                  <table-footer
                      :total="count"
                      :multipleSelection="multipleSelection"
                      :deleteBtn="false"
                      @handleSizeChange="handleSizeChange"
                      @handleCurrentChange="handleCurrentChange"
                  ></table-footer>
              </div>
          </div>
        </div>
      </div>

      <dialog-box ref="dialog" title="基本信息">
          <div class="info-wrapp" slot="dialog-body">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" class="my-table">
                <tr>
                    <td>试题类型：</td>
                    <td>{{quesTypeList[questionDetail.type]}}</td>
                    <td>试题编码：</td>
                    <td>{{questionDetail.code}}</td>
                </tr>

                <tr>
                    <td>等&emsp;&emsp;级：</td>
                    <td>{{questionDetail.skillLevel}}</td>
                    <td>难&emsp;&emsp;度：</td>
                    <td>{{questionDetail.difficulty}}</td>
                </tr>
                <tr>
                    <td>答题分数：</td>
                    <td>{{questionDetail.score}}</td>
                    <td>答题时间：</td>
                    <td>{{questionDetail.time}}</td>
                </tr>
                <tr>
                    <td>工种名称：</td>
                    <td colspan="3">{{questionDetail.skillItem}}</td>
                </tr>
                <tr>
                    <td>试题内容：</td>
                    <td colspan="3">
                        <div style="text-align:left">
                            <div v-html="questionDetail.content">
                            </div>
                            <div class="testOptions" v-if="questionDetail.type!=5">
                                <p v-for="(it,ind) in questionDetail.options" v-html=" '<span> '+letterArr[ind] +'：</span>'+ it.content"></p>
                            </div>
                            <div class="testOptions" v-if="questionDetail.type==5">
                                <p v-for="(it,ind) in questionDetail.calculations" v-if="it.type=='x'">
                                    变量：{{it.var}}={{it.val}} ({{it.scheme==1?"最大值："+it.maxValue+ " 最小值："+it.minValue+" 小数位数"+it.decimalPlaces : " 备选值："+it.alternative}})
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>答&emsp;&emsp;案：</td>
                    <td colspan="3">
                        <div style="text-align:left" v-if="questionDetail.type!=5">
                            {{questionDetail.answer}}
                        </div>
                        <div style="text-align:left" v-if="questionDetail.type==5" v-for="(it,ind) in questionDetail.calculations">
                            <div v-if="it.type=='y'">
                                公式：{{it.formula}}={{it.val}}
                            </div>
                        </div>

                    </td>
                </tr>
             </table>
              <!-- <ul>
                  <li><span>试题类型：</span><span>单选题</span></li>
                  <li><span>试题编码：</span><span>23232323</span></li>
                  <li><span>等级：</span><span>初级</span></li>
                  <li><span>难度：</span><span>难</span></li>
                  <li><span>答题分数：</span><span>1</span></li>
                  <li><span>答题时间：</span><span>1</span></li>
                  <li><span>试题内容：</span><span>的方法得分得分额分分额分分额分分恶风额分分谔谔分额分分</span></li>
                  <li><span>答案：</span><span>A</span></li>
              </ul> -->
          </div>
      </dialog-box>
  </div>
</template>

<script>
import MyHeader from "../base/header"
import Bread from "../base/bread"
import Search from "../base/search"
import List from "../base/list"
import TableFooter from "../base/tableFooter"
import Append from "../base/append"
import DialogBox from "../base/dialog"
import { questionMenu, questionAll, questionOff, questionOn, questionDetail} from "@/api/getData"
import { messageText } from "@/assets/js/message"
export default {
    data() {
        return {
            options: [{
              value: 'code',
              label: '试题编号'
            }, {
              value: 'content',
              label: '试题内容'
            }, {
              value: 'difficulty',
              label: '难易度'
            }, {
              value: 'score',
              label: '分数'
            }, {
              value: 'time',
              label: '作答时间'
            }],
            quesTypeList: ["所有题型","单选题","多选题","判断题","识图题","计算题"],
            questionDetail: {},
            letterArr: ["A","B","C","D","E","F"],
            // 左侧菜单数据
            menuList: [],
            levelList: [],
            pageSize: 20,
            pageNow: 1,
            tableData: [],
            multipleSelection: [],
            loading: false,
            count: 0,
            moreActionsText: "所有题型",
            // 当前等级选中
            radio: "初级",
            // 左侧菜单选中id
            currentMenu: 0,
            // 当前题型选中
            currentQuesType: 0,
            query: "",
            queryValue: "",
        }
    },
    created() {
        this.getTree();
    },
    computed: {
        getDataQuery() {
            var obj = {};
            if(this.currentMenu != 0) {
                obj.skillItem = this.currentMenu
            }
            if(this.currentQuesType&&this.currentQuesType!=0) {
                obj.type = this.currentQuesType;
            }
            obj.skillLevel = this.radio;
            if(this.query) {
                obj[this.query] = this.queryValue
            }
            console.log(obj);
            return obj
        }
    },
    components: {
        MyHeader,
        Bread,
        Search,
        TableFooter,
        Append,
        List,
        DialogBox
        // TableGroup
    },
    methods: {
        getTree() {
            questionMenu().then((data)=> {
                this.menuList = this.substringSkill(data.data.skill);
                this.levelList = data.data.level;
                this.getData();
            });
        },
        getData() {
            var _this = this
            this.loading = true;
            questionAll({
                appendUrl: "/"+_this.pageNow+"/"+_this.pageSize,
                param: _this.getDataQuery,
            }).then((data)=> {
                this.tableData = data.data.testList;
                this.count = data.data.count
                // this.tableData = data.data.data;
                // this.count = data.data.count;
                this.loading = false;
            })
        },
        substringSkill(data) {
            data.map((item)=> {
                item.name = item.name.substring(0,item.name.indexOf("(")).trim()
            })
            return data
        },
        // messageBox
        messageBox(data,state) {

			var that = this;
            var message = "此操作将"+state+"该试题, 是否继续?"
			messageText(this, {
				message:message,
				beforeClose(action, instance, done) {
                    if(state == "禁用") {
                        console.log(data);
                        questionOff({
                            appendUrl: "/"+data,
                        }).then((data)=> {
							if(data.data.success) {
                                that.$message({
            						type: 'success',
            						message: state+"成功"
            					});
								that.getData()
							} else {

							}
							done();
							instance.confirmButtonLoading = false;
                        })
                    } else {
                        questionOn({
                            appendUrl: "/"+data,
                        }).then((data)=> {
							if(data.data.success) {
                                that.$message({
            						type: 'success',
            						message: state+"成功"
            					});
								that.getData()
							} else {

							}
							done();
							instance.confirmButtonLoading = false;
                        })
                    }
				}

			})
		},
        // 单击
        rowClick(row, event, column) {
            if(column.type == "selection") {
                this.$refs.multipleTable.toggleRowSelection(row)
            } else {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row)
            }

        },
        rowDblclick(row) {
            this.$refs.dialog.open();
            this.questionDetail = {};
            questionDetail({
                appendUrl: "/"+row.id
            }).then((data)=> {
                this.questionDetail = this.filterTest(data.data.test);
                this.$refs.dialog.loading = false;
            })
        },
        // 表格选中事件
        selectionChange(selections) {
            this.multipleSelection = selections;
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData()
        },
        handleCurrentChange(val) {
            this.pageNow = val
            this.getData()
        },
        //搜索
        searchEvent(data) {
            this.query = data.selectValue;
            this.queryValue = data.inputValue;
            this.getData()
        },
        // 刷新
        refresh() {
            this.getData();
        },
        // 左侧菜单选中
        menuSelect(val) {
            this.currentMenu = val;
            this.getData()
        },
        // 工种等级选中
        radioChange(val) {
            this.radio = val;
            this.getData()
        },
        // 所有题型
        moreActions(val) {
            this.moreActionsText = this.quesTypeList[val];
            this.currentQuesType = val;
            this.getData()
        },
        formatter(row) {
            return this.quesTypeList[row.type]
        },
        formatterInfo() {
            return "基本信息"
        },
        switchStatus(row) {
            var stateText = row.status == 1 ? "禁用": "启用"
			this.messageBox(row.id, stateText)
        },
        filterTest(data) {
            if(data.type == 5) {

            } else {
                var answer = "";
                data.options.map((item,index)=> {
                    if(item.isAnswer) {
                        answer += this.letterArr[index]
                    }
                })
                data.answer = answer
            }
            return data
        },
        // 基本信息
        infoView(row) {
            this.$refs.dialog.open();
            this.questionDetail = {};
            questionDetail({
                appendUrl: "/"+row.id
            }).then((data)=> {
                this.questionDetail = this.filterTest(data.data.test);
                this.$refs.dialog.loading = false;
            })
        }
    }
}
</script>

<style lang="css">
    .search-button-group {
        display: flex;
        align-items: center;
        height: 40px;
    }
    .search-button-group .el-dropdown {
        width: 100px;
        text-align: right;
    }
    .button-group-left {
        /* margin-right: 30px */
    }
    .info-wrapp ul {
        display: flex;
        flex-wrap: wrap;
    }
    .info-wrapp ul li {
        flex: 1 1 50%;

    }
    .info-wrapp ul li>span {
        line-height: 32px;
        height: 32px;
    }
    .info-wrapp ul li span:first-of-type {
        margin-right: 20px;
    }
    .my-table {
        border-collapse: collapse;
        table-layout: fixed;
    }
    .my-table td {
        border: 1px solid #ebeef5;
        height: 32px;
        padding: 5px 10px;
        text-align: center;
    }
    .my-table td img {
        width: 120px;
        display: block;
        margin: auto;
    }
    .testOptions {
        margin-top: 10px;
    }
    .info-wrapp {
        height: 500px;
    }
</style>
