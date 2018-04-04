<template lang="html">
  <div class="container">
      <!-- 导航组件 -->
      <my-header/>
      <div class="main">
          <append :stateText="stateText" ref="append" @save="save">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="myForm" slot="myForm">
              <el-form-item label="字典名称" prop="name">
                <el-input v-model="ruleForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="显示编号" prop="showId">
                <el-input v-model.number ="ruleForm.showId" clearable></el-input>
              </el-form-item>
            </el-form>
          </append>
          <!-- 面包屑组件 -->
          <bread @refresh="refresh" @addition="addition" :addBtn="isAddBtn">
          </bread>
          <div class="main-wrapp">
              <div class="main-list">
                  <list
                    menuTitle="全部字典"
                    :menuList="menuList"
                    @menuSelect="menuSelect"
                  ></list>
              </div>
              <div class="main-table">
              <div class="table-group">
                  <!-- 表格查询组件 -->
                  <search @searchEvent="searchEvent" :searchOptions="options">
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
                        prop="num"
                        label="序号"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center"
                        width="80"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="字典名称"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="showId"
                        label="显示编号"
                        show-overflow-tooltip
                        tooltip-effect="light"
                        align="center">
                        </el-table-column>
                    </el-table>
                  </div>
                  <!-- 表格底部分页 -->
                  <table-footer
                      :total="count"
                      :deleteBtn="idDelBtn"
                      :multipleSelection="multipleSelection"
                      @deleteEvent="deleteEvent"
                      @handleSizeChange="handleSizeChange"
                      @handleCurrentChange="handleCurrentChange"
                  >
                <el-button type="success" icon="el-icon-share" slot="table-footer-left" :disabled="releDisabled" v-if="releBtn" @click="releLevel">关联等级</el-button>
                </table-footer>
              </div>
          </div>
        </div>
      </div>
      <dialog-box ref="dialog"
      title="关联等级"
      @dialogConfirm="dialogConfirm"
      :isFooter="true"
      width="600px"
      >
          <el-table
          slot="dialog-body"
          :data="levelData"
          style="width: 100%"
          height="271px"
          ref="relemultipleTable"
          stripe
          border
          header-row-class-name="table-th"
          @row-click="relerowClick"
          @selection-change="releselectionChange"
          >
          <el-table-column
          type="selection"
          align="center"
          width="55">
           </el-table-column>
          <el-table-column
             type="index"
             label="序号"
             show-overflow-tooltip
             tooltip-effect="light"
             align="center"
             width="80"
             >
           </el-table-column>
          <el-table-column
            prop="name"
            label="工种名称"
            show-overflow-tooltip
            tooltip-effect="light"
            align="center">
          </el-table-column>
        </el-table>
      </dialog-box>
  </div>
</template>

<script>
import MyHeader from "../base/header"
import Bread from "../base/bread"
import Search from "../base/search"
import List from "../base/list"
import TableFooter from "../base/tableFooter"
import DialogBox from "../base/dialog"
import Append from "../base/append"
import { dictionaryTree, dictionaryAll, addDictionary, editDictionary, delDictionary, releLevel, saveReleLevel } from "@/api/getData"
import { messageText, messageFrom } from "@/assets/js/message"
import { clearForm } from "@/assets/js/common"
export default {
    data() {
        return {
            // 搜索下拉列表
            options: [{
              value: 'name',
              label: '字典名称'
            }],
            // 表单数据
            ruleForm: {
              name: "",
              showId: ""
            },
            // 验证规则
            rules: {
                name: [
                    { required: true, message: '请输入字典名称', trigger: 'blur' },
                ],
                showId: [
                    { required: true, message: '请输入显示编号', trigger: 'blur' },
                    { type: "number", message: '请输入数字', trigger: 'blur' }
                ],
            },
            // 添加/编辑显示内容
            stateText: "",
            // 表格数据源
            tableData: [],
            // 总条数
            count: 0,
            // 表格选中数据
            multipleSelection: [],
            relemultipleSelection: [],
            // 表格加载loading
            loading: false,
            // 左侧菜单数据
            menuList: [
                {name:"油务员",id:1},
                {name: "ddd",id:2}
            ],
            // 每页显示数量
            pageSize: 20,
            // 当前页数
            pageNow: 1,
            // 左侧菜单选中id
            currentMenuId: 0,
            // 查询参数
            query: "",
            queryValue: "",
            levelData: []
        }
    },
    created() {
        // 获取表格数据
        this.getTree();
    },
    computed: {
        // 查询参数
        getDataQuery() {
            var obj = {};
            if(this.query) {
                obj["pid"] = this.currentMenuId;
                obj[this.query] = this.queryValue
            } else {
                obj["pid"] = this.currentMenuId;
            }
            return obj
        },
        isAddBtn() {
            return this.currentMenuId == 0 ? false : true
        },
        idDelBtn() {
            return this.currentMenuId == 0 ? false : true
        },
        releDisabled() {
            if(this.multipleSelection.length) {
                return false
            }
            return true
        },
        releBtn() {
            return this.currentMenuId == 1 ? true : false
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
    },
    methods: {
        // 获取左侧菜单
        getTree() {
            dictionaryTree().then((data)=> {
                this.menuList = this.addSequence(data.data.tree);
                this.getData()
            });
        },
        getData() {
            var _this = this
            this.loading = true;
            if(this.currentMenuId == 0) {
               this.getTree()
            }
            dictionaryAll({
                appendUrl: "/"+_this.pageNow+"/"+_this.pageSize,
                param: _this.getDataQuery,
            }).then((data)=> {
                this.tableData = this.addSequence(data.data.dictList);
                this.count = data.data.count
                this.loading = false;
            })
        },
        addSequence(data) {
            data.map((item,index)=> {
                item.num = index+1;
            });
            return data
        },
        // messageBox
        messageBox(beforeClose) {
            var that = this
            var count = this.multipleSelection.length
            messageText(this,{
                message: "此操作将删除"+count+"条选中记录, 是否继续?",
                beforeClose(action, instance, done) {
                    if(beforeClose) {
                        beforeClose(action, instance, done)
                    }
                },
                then() {
                    that.$message({
                      type: 'success',
                      message: that.msg
                    });
                }

            })
        },
        // 添加
        addition() {
            // 清空form表单
            this.ruleForm = clearForm(this.ruleForm);
            this.ruleForm.showId = this.count+1;
            this.stateText = "添加";
            this.$refs.append.open();
        },
        // 编辑
        rowDblclick(row) {
            this.stateText = "编辑";
            this.ruleForm = {
                name: row.name,
                showId: row.showId,
                pid: row.pid,
                id: row.id
            }
            this.$refs.append.open();
        },
        // 保存
        save() {
            this.$refs.ruleForm.validate((valid) => {
             if (valid) {
                 var that = this;
                 if(this.stateText == "添加") {
                     this.ruleForm.pid = this.currentMenuId;
                     addDictionary({
                         param: that.ruleForm
                     }).then((data)=> {
                         if(data.data.success) {
                             this.getData();
                             this.$refs.append.close();
                             this.$message({
                               type: 'success',
                               message: "添加成功"
                             });
                         } else {

                         }
                     })
                 } else if(this.stateText == "编辑") {
                    editDictionary({
                        param: that.ruleForm
                    }).then((msg)=> {
                        if(data.data.success) {
                            this.getData();
                            this.$refs.append.close();
                            this.$message({
                              type: 'success',
                              message: "修改成功"
                            });
                        } else {

                        }
                    })
                 }
             } else {
               return false;
             }
           });
        },
        // 删除
        deleteEvent() {
            var that = this;
            var ids = [];
            this.multipleSelection.map((item)=> {
                ids.push(item.id)
            });
            var count = this.multipleSelection.length
            messageText(this,{
                message: "此操作将删除"+count+"条选中记录, 是否继续?",
                beforeClose(action, instance, done) {
                    delDictionary({
                        param: {
                            ids: ids
                        }
                    }).then((msg)=> {
                        if(msg.data.success) {
                            this.getData();
                            this.$message({
                              type: 'success',
                              message: "删除成功"
                            });
                        } else {

                        }
                        done();
                        instance.confirmButtonLoading = false;
                    })
                },
                then() {
                    that.$message({
                      type: 'success',
                      message: that.msg
                    });
                }

            })
        },
        // 关联等级
        releLevel() {
            if(this.multipleSelection.length>1) {
                this.$message.error("请选择一条记录");
                return
            }
            this.$refs.dialog.open();
            releLevel({
                appendUrl: "/"+this.multipleSelection[0].id
            }).then((data)=> {
                this.levelData = data.data.levelList;
                setTimeout(()=> {
                    data.data.levelList.map((item)=> {
                        if(item.isCorrelation) {
                            this.$refs.relemultipleTable.toggleRowSelection(item)
                        }
                    });
                    this.$refs.dialog.loading = false;
                },100);
            })

        },
        dialogConfirm() {
            var ids= [];
            this.relemultipleSelection.map((item)=> {
                ids.push(item.id)
            })
            saveReleLevel({
                appendUrl: "/"+this.multipleSelection[0].id,
                param: {
                    ids: ids
                }
            }).then((msg)=> {
                if(msg.data.success) {
                    this.$refs.dialog.close();
                    this.$message({
                      type: 'success',
                      message: "关联成功"
                    });
                } else {
                    
                }
            });
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
        relerowClick(row, event, column) {
            if(column.type == "selection") {
                this.$refs.relemultipleTable.toggleRowSelection(row)
            } else {
                this.$refs.relemultipleTable.clearSelection();
                this.$refs.relemultipleTable.toggleRowSelection(row)
            }
        },
        // 表格选中事件
        selectionChange(selections) {
            this.multipleSelection = selections;
        },
        releselectionChange(selections) {
            this.relemultipleSelection = selections;
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData({pid:this.currentMenuId});
        },
        handleCurrentChange(val) {
            this.pageNow = val;
            this.getData({pid:this.currentMenuId});
        },
        //搜索
        searchEvent(val) {
            this.query = val.selectValue;
            this.queryValue = val.inputValue;
            this.getData();
        },
        // 刷新
        refresh() {
            this.getData();
        },
        // 左侧导航选中事件
        menuSelect(val) {
            this.currentMenuId = val;
            this.getData();
        }
    }
}
</script>

<style lang="css">

</style>
