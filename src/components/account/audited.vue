<template lang="html">
  <div class="container">
      <my-header/>

      <div class="main">
          <bread
            @refresh="refresh"
            @addition="addition"
            :addBtn=false>
                <el-button type="primary" slot="slot-buttons" icon="el-icon-plus">添加</el-button>
          </bread>
          <table-group
            :searchOptions="options"
            :columnData="columnData"
            :tableData="tableData"
            :deleteBtn=false
            @searchEvent="searchEvent"
            @deleteEvent="deleteEvent"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            @rowDblclick="rowDblclick"
            ref="refTable">
            <!-- slot -->
            <el-dropdown slot="search-right" trigger="click" @command="moreActions">
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="批量通过">批量通过</el-dropdown-item>
                <el-dropdown-item command="批量驳回">批量驳回</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-table-column
              slot="operation"
              fixed="right"
              label="操作"
              align="center"
              min-width="100">
              <template slot-scope="scope">
                <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
                <el-button type="text" size="small" @click="handleReject(scope.row)">驳回</el-button>
              </template>
            </el-table-column>
          </table-group>
      </div>
  </div>
</template>

<script>
import MyHeader from "../base/header"
import Bread from "../base/bread"
import TableGroup from "../base/table"
import { authstr } from "@/api/getData"
import { messageText, messageFrom } from "@/assets/js/message"
export default {
    data() {
        return {
            options: [{
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            columnData: [
                {
                    prop: "name",
                    label: "姓名",
                    width: "150",
                    fixed: true
                },
                {
                    prop: "phone",
                    label: "手机号",
                    width: "120"
                },
                {
                    prop: "password",
                    label: "密码",
                    width: "120"
                },
                {
                    prop: "unit",
                    label: "单位",
                    width: "120"
                },
                {
                    prop: "department",
                    label: "部门",
                    width: "300"
                },
                {
                    prop: "post",
                    label: "岗位",
                    width: "120"
                },
                {
                    prop: "referrerName",
                    label: "推荐人姓名",
                    width: "120"
                },
                {
                    prop: "referrerPhone",
                    label: "推荐人手机号",
                    width: "120"
                },
                {
                    prop: "registerTime",
                    label: "注册时间",
                    width: "120"
                }

            ],
            tableData: []
        }
    },
    created() {
        authstr().then((data)=> {
            this.tableData = data.data.data
        })
        // authstr()
    },
    components: {
        MyHeader,
        Bread,
        TableGroup
    },
    methods: {
        // messageBox
        messageBox() {
            var that = this
            messageText(this,{
                message: "此操作将驳回该用户的申请, 是否继续?",
                beforeClose(action, instance, done) {
                    setTimeout(() => {
                        done();
                        that.msg="驳回成功！"
                        instance.confirmButtonLoading = false;
                    }, 3000);
                },
                then() {
                    that.$message({
                      type: 'success',
                      message: that.msg
                    });
                }

            })
        },
        // messageFrom
        messageFrom() {
            var that = this
            messageFrom(this,{
                message: "请输入金额(￥)",
                placeholder: "请输入金额",
                inputErrorMessage: "请输入正确的金额",
                beforeClose(action, instance, done) {
                    setTimeout(() => {
                        done();
                        that.msg="提交成功"
                        instance.confirmButtonLoading = false;
                    }, 3000);
                },
                then() {
                    that.$message({
                      type: 'success',
                      message: that.msg
                    });
                }

            })
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //搜索
        searchEvent(data) {
            console.log(data);
        },
        // 删除
        deleteEvent(multipleSelection) {
            console.log(multipleSelection);
        },
        // 双击
        rowDblclick(row) {
            console.log(row);
        },
        // 添加
        addition() {

        },
        // 刷新
        refresh() {

        },
        // 操作   通过
        handlePass(val) {
            this.messageFrom()
        },
        // 驳回
        handleReject(val) {
            this.messageBox()
        },
        // 更多操作
        moreActions(val) {
            if(!this.$refs.refTable.multipleSelection.length) {
                this.$message.error("请最少选择一条记录");
                return
            }
            if(val == "批量通过") {
                this.messageFrom()
            } else if(val == "批量驳回") {
                this.messageBox()
            }
        }
    }
}
</script>

<style lang="css">
</style>
