<template lang="html">
  <div class="container">
      <!-- 导航组件 -->
      <my-header/>
      <div class="main">
          <!-- 面包屑组件 -->
          <bread
            @refresh="refresh"
            :addBtn=false>

          </bread>
          <div class="main-wrapp">
              <div>

              </div>

              <div class="main-table">
          <div class="table-group">
              <!-- 表格查询组件 -->
              <search @searchEvent="searchEvent" :searchOptions="options">
                  <!-- slot -->
                  <el-dropdown slot="search-right" trigger="click" @command="moreActions">
                    <span class="el-dropdown-link">
                      更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="调整金额">调整金额</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown></search>
              <div class="table-wrapp" id="tableWrapp">
                  <!-- 表格 -->
                  <el-table
                  :data="tableData"
                  style="width: 100%"
                  height="100%"
                  ref="multipleTable"
                  show-overflow-tooltip
                  v-loading="loading"
                  stripe
                  border
                  header-row-class-name="table-th"
                  @row-click="rowClick"
                  @selection-change="selectionChange"
                  >
                  <el-table-column
                  type="selection"
                  align="center"
                  width="55">
                   </el-table-column>
                  <el-table-column
                    fixed
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip
                    align="center"
                    min-width="120">
                  </el-table-column>
                  <el-table-column
                    prop="applyStatus"
                    label="支付状态"
                    show-overflow-tooltip
                    align="center"
                    min-width="120"
                    :filters="[{ text: '已支付', value: '已支付' }, { text: '待支付', value: '待支付' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                          <p class="popover-p"><span>审核人: </span><span>{{ scope.row.auditor }}</span></p>
                          <p class="popover-p"><span>审核时间: </span><span>{{ scope.row.registerTime?scope.row. registerTime:"-" }}</span></p>
                          <p class="popover-p"><span>金额: </span><span>{{ scope.row. paymentAmount?scope.row.paymentAmount:"-" }}</span></p>
                          <p class="popover-p"><span>支付时间: </span><span>{{ scope.row.paymentTime?scope.row.paymentTime:"-"  }}</span></p>
                          <div slot="reference" class="name-wrapper">
                              <el-tag
                                :type="scope.row.paymentTime?'':'danger'"
                                close-transition>{{scope.row.paymentTime?scope.row.paymentAmount:"待支付"}}</el-tag>
                          </div>
                        </el-popover>

                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="mobile"
                    label="手机号"
                    show-overflow-tooltip
                    align="center"
                    min-width="120">
                  </el-table-column>
                  <el-table-column
                    prop="password"
                    label="密码"
                    show-overflow-tooltip
                    align="center"
                    min-width="130">
                  </el-table-column>
                  <el-table-column
                    prop="unit"
                    label="单位"
                    show-overflow-tooltip
                    align="center"
                    min-width="200">
                  </el-table-column>
                  <el-table-column
                    prop="department"
                    label="部门"
                    show-overflow-tooltip
                    align="center"
                    min-width="200">
                  </el-table-column>
                  <el-table-column
                    prop="post"
                    label="岗位"
                    show-overflow-tooltip
                    align="center"
                    min-width="150">
                  </el-table-column>
                  <el-table-column
                    prop="referrerName"
                    label="推荐人姓名"
                    show-overflow-tooltip
                    align="center"
                    min-width="120">
                  </el-table-column>
                  <el-table-column
                    prop="referrerMobile"
                    label="推荐人手机号"
                    show-overflow-tooltip
                    align="center"
                    min-width="120">
                  </el-table-column>
                  <el-table-column
                    prop="lastLoginTime"
                    label="最后登录时间"
                    show-overflow-tooltip
                    align="center"
                    min-width="180">
                  </el-table-column>
                  <el-table-column
                  fixed="right"
                  label="操作"
                  align="center"
                  min-width="150">
                  <template slot-scope="scope">
                    <el-button @click="switchStatus(scope.row)" type="text" size="small">{{scope.row.status == 1?"禁用":"启用"}}</el-button>
                    <el-button @click="adjust(scope.row)" type="text" size="small">调整金额</el-button>
                  </template>
                </el-table-column>
                </el-table>
              </div>
              <!-- 表格底部分页 -->
              <table-footer
                  :deleteBtn=false
                  :total="count"
                  :multipleSelection="multipleSelection"
                  @handleSizeChange="handleSizeChange"
                  @handleCurrentChange="handleCurrentChange"
              ></table-footer>
          </div>

          </div>

          </div>
      </div>
  </div>
</template>

<script>
import MyHeader from "../base/header"
import Bread from "../base/bread"
import Search from "../base/search"
import TableFooter from "../base/tableFooter"
import { prepaid, amount, sysUserOff, sysUserOn } from "@/api/getData"
import { messageText, messageFrom } from "@/assets/js/message"
export default {
    data() {
        return {
            options: [{
                value: 'name',
                label: '姓名'
            },{
                value: 'unit',
                label: '单位'
            },{
                value: 'mobile',
                label: '部门'
            },{
                value: 'post',
                label: '岗位'
            }],
            tableData: [],
            multipleSelection: [],
            loading: true,
            pageSize: 20,
            pageNow: 1,
            count: 0,
            query: "",
            queryValue: ""
        }
    },
    created() {
        this.getData()
    },
    computed: {
        getDataQuery() {
            var obj = {};
            if(this.query) {
                obj[this.query] = this.queryValue
            }
            return obj
        }
    },
    components: {
        MyHeader,
        Bread,
        Search,
        TableFooter
    },
    methods: {
        addSequence(data) {
            data.map((item,index)=> {
                item.num = index+1;
            });
            return data
        },
        getData() {
            var _this = this
            this.loading = true;
            prepaid({
                appendUrl: "/"+_this.pageNow+"/"+_this.pageSize,
                param: _this.getDataQuery,
            }).then((data) => {
                this.tableData = this.addSequence(data.data.userList);
                this.count = data.data.count;
                this.loading = false;
            })
        },
        // messageText
        messageBox(data,state) {
            var that = this;
            var message =  "此操作将"+state+"该用户的账号, 是否继续?";
            messageText(this, {
                message:message,
                beforeClose(action, instance, done) {
                    if(state == "禁用") {
                        sysUserOff({
                            appendUrl: "/"+data,
                        }).then((data)=> {
                            done();
                            instance.confirmButtonLoading = false;
                            if(data.data.success) {
                                that.$message({
                                    type: 'success',
                                    message: state + "成功"
                                });

                                that.getData()
                            } else {

                            }
                        })
                    } else {
                        sysUserOn({
                            appendUrl: "/"+data,
                        }).then((data)=> {
                            done();
                            instance.confirmButtonLoading = false;
                            if(data.data.success) {
                                that.$message({
                                    type: 'success',
                                    message: state + "成功"
                                });
                                that.getData()
                            } else {

                            }
                        })
                    }
                }
                // then() {
                //     that.$message({
                //         type: 'success',
                //         message: that.msg
                //     });
                // }

            })
        },
        // messageFrom
        messageFrom(data) {
            var that = this
            messageFrom(this, {
                message: "请输入金额(￥)",
                placeholder: "请输入金额",
                inputErrorMessage: "请输入正确的金额",
                beforeClose(action, instance, done) {
                    amount({
                            param: {
                                ids: data,
                                amount: instance.inputValue
                            }
                    }).then((data)=> {
                        done();
                        instance.confirmButtonLoading = false;
                        if(data.data.success) {
                            that.$message({
                                type: 'success',
                                message: "提交成功"
                            });
                            that.getData();
                        } else {

                        }

                    })
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
        // 表格选中事件
        selectionChange(selections) {
            this.multipleSelection = selections;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
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
        searchEvent(val) {
            //搜索
            this.query = val.selectValue;
            this.queryValue = val.inputValue;
            this.getData()

        },
        // 刷新
        refresh() {
            this.getData()
        },
        // 禁用/启用
        switchStatus(row) {
            var stateText = row.status == 1 ? "禁用": "启用"
            this.messageBox(row.wechatId,stateText)
        },
        // 调整金额
        adjust(row) {
            console.log(row);
            this.messageFrom(row.wechatId)
        },
        // 更多操作
        moreActions(val) {
            if(!this.multipleSelection.length) {
                this.$message.error("请最少选择一条记录");
                return
            }
            var ids = [];
            this.multipleSelection.map((item)=> {
                ids.push(item.wechatId)
            });
            if(val == "调整金额") {
                this.messageFrom(ids)
            }
        }
    }
}
</script>

<style lang="css">
</style>
