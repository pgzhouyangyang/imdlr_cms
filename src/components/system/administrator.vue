<template lang="html">
	<div class="container">
		<!-- 导航组件 -->
		<my-header></my-header>
		<div class="main">
			<append ref="append" @save="save">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="myForm" slot="myForm">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="登录名" prop="loginName">
                  <el-input v-model="ruleForm.loginName" clearable></el-input>
                </el-form-item>
				<el-form-item label="密码" prop="password" :rules="passwordRules">
                  <el-input v-model="ruleForm.password" clearable type="password" :maxlength="15"></el-input>
                </el-form-item>
				<el-form-item label="手机号" prop="mobile">
                  <el-input v-model.number="ruleForm.mobile" clearable :maxlength="11"></el-input>
                </el-form-item>
				<el-form-item label="电子邮件" prop="email">
                  <el-input v-model="ruleForm.email" clearable></el-input>
                </el-form-item>
              </el-form>
            </append>
			<!-- 面包屑组件 -->
			<bread @refresh="refresh" @addition="addition">
            </bread>
			<div class="main-wrapp">
				<!-- list -->
				<div></div>
				<div class="main-table">
					<div class="table-group">
						<!-- 表格查询组件 -->
						<search @searchEvent="searchEvent" :searchOptions="options">
						</search>
						<div class="table-wrapp" id="tableWrapp">
							<!-- 表格 -->
							<el-table v-loading="loading" :data="tableData" style="width: 100%" height="100%" ref="multipleTable" stripe border header-row-class-name="table-th" @row-click="rowClick"  @row-dblclick="rowDblclick" @selection-change="selectionChange">
								<el-table-column type="selection" align="center" width="55">
								</el-table-column>
								<el-table-column fixed prop="name" label="姓名" show-overflow-tooltip tooltip-effect="light" align="center" min-width="120">
								</el-table-column>

								<el-table-column prop="loginName" label="登录名" show-overflow-tooltip align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="password" label="密码" show-overflow-tooltip align="center" min-width="190">
								</el-table-column>
								<el-table-column prop="mobile" label="手机号" show-overflow-tooltip align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="email" label="电子邮箱" show-overflow-tooltip align="center" min-width="120">
								</el-table-column>
								<el-table-column
		                            fixed="right"
		                            label="操作"
		                            align="center"
		                            min-width="80">
		                            <template slot-scope="scope">
		                              <el-button @click="switchStatus(scope.row)" type="text" size="small">
										<el-tag :type="scope.row.status?'danger':'success'">{{scope.row.status?"禁用":"启用"}}</el-tag>
									  </el-button>
		                            </template>
		                          </el-table-column>
							</el-table>
						</div>
						<!-- 表格底部分页 -->
						<table-footer  :total="count" :multipleSelection="multipleSelection"
						 @deleteEvent="deleteEvent" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
						</table-footer>
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
import Append from "../base/append"
import { admin, addAdmin, editAdmin, delAdmin, adminOff, adminOn } from "@/api/getData"
import { messageText, messageFrom } from "@/assets/js/message"
import { clearForm } from "@/assets/js/common"
import { isvalidPwd, isvalidPhone } from "@/assets/js/validate"
export default {
	data() {
		return {
			options: [{
				value: 'name',
				label: '姓名'
			},{
				value: 'loginName',
				label: '登录名'
			},{
				value: 'mobile',
				label: '手机号'
			}],
			ruleForm: {
				name: "",
				loginName: "",
				password: "",
				mobile: "",
				email: ""
			},
			rules: {
				name: [
					{ required: true, message: '姓名不能为空', trigger: 'blur' }
				],
				loginName: [
					{ required: true, message: '登录名不能为空', trigger: 'blur' }
				],
				mobile: [
					{validator: isvalidPhone, trigger: 'blur'  }
				],
				email: [
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
				]

			},
			tableData: [],
			multipleSelection: [],
			loading: false,
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
        },
		passwordRules() {
			if(this.stateText == "添加") {
				return [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{  validator: isvalidPwd, trigger: 'blur' }
				]
			} else {
				return [
					{ required: true, message: '密码不能为空', trigger: 'blur' }
				]
			}

		}
    },
	components: {
		MyHeader,
		Bread,
		Search,
		TableFooter,
		Append
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
			admin({
                appendUrl: "/"+_this.pageNow+"/"+_this.pageSize,
                param: _this.getDataQuery,
			}).then((data) => {
				this.tableData = this.addSequence(data.data.adminList);
                this.count = data.data.count;
                this.loading = false;
			}).catch((data)=>{

			})
		},
		// messageText
		messageBox(data,state) {
			var that = this;
            var message = "此操作将"+state+"该用户的账号, 是否继续?"
			messageText(this, {
				message:message,
				beforeClose(action, instance, done) {
                    if(state == "禁用") {
                        adminOff({
                            appendUrl: "/"+data,
                        }).then((data)=> {
							if(data.data.success) {
	                        	that.msg = state+"成功"
								that.getData()
							} else {
								that.msg = data.data.errmsg
							}
							done();
							instance.confirmButtonLoading = false;
                        })
                    } else {
                        adminOn({
                            appendUrl: "/"+data,
                        }).then((data)=> {
							if(data.data.success) {
	                        	that.msg = state+"成功"
								that.getData()
							} else {
								that.msg = data.data.errmsg
							}
							done();
							instance.confirmButtonLoading = false;
                        })
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
		// 分页
		handleSizeChange(val) {
            this.pageSize = val;
            this.getData()
		},
		handleCurrentChange(val) {
            this.pageNow = val
            this.getData()
		},
		// 添加
		addition() {
			this.ruleForm = clearForm(this.ruleForm);
            this.stateText = "添加";
            this.$refs.append.open();
		},
		// 编辑
		rowDblclick(row) {
			this.stateText = "编辑";
			this.$refs.append.open();
			this.ruleForm = row
		},
		// 保存
		save() {
            this.$refs.ruleForm.validate((valid) => {
             if (valid) {
                 var that = this;
				 this.ruleForm.status = 1;
                 if(this.stateText == "添加") {
                     addAdmin({
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
                             this.$message({
                               type: 'error',
                               message: data.data.errmsg
                             });
                         }

                     })
                 } else if(this.stateText == "编辑") {
                    editAdmin({
                        param: that.ruleForm
                    }).then((msg)=> {
						if(msg.data.success) {
							this.getData();
							this.$refs.append.close();
							this.$message({
							  type: 'success',
							  message: "修改成功"
							});
						} else {
							this.$message({
							  type: 'error',
							  message: msg.data.errmsg
							});
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
                    delAdmin({
                        param: {
                            ids: ids
                        }
                    }).then((msg)=> {
                        if(msg.data.success) {
                            that.getData();
                            that.msg = "删除成功"
                        } else {
                            that.msg = msg.data.errmsg
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
		// 禁用 / 启用
		switchStatus(row) {
			var stateText = row.status == 1 ? "禁用": "启用"
			this.messageBox(row.id, stateText)
		},
		//搜索
		searchEvent(val) {
            this.query = val.selectValue;
            this.queryValue = val.inputValue;
			this.getData()
		},
		// 刷新
		refresh() {
            this.getData()
		}
	}
}
</script>

<style lang="css">

</style>
