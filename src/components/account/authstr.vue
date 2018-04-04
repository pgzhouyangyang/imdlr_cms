<template lang="html">
	<div class="container">
		<!-- 导航组件 -->
		<my-header></my-header>
		<div class="main">
			<!-- 面包屑组件 -->
			<bread @refresh="refresh" :addBtn=false>
            </bread>
			<div class="main-wrapp">
				<!-- list -->
				<div></div>
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
									<el-dropdown-item command="批量通过">批量通过</el-dropdown-item>
									<el-dropdown-item command="批量驳回">批量驳回</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</search>
						<div class="table-wrapp" id="tableWrapp">
							<!-- 表格 -->
							<el-table v-loading="loading" :data="tableData" style="width: 100%" height="100%" ref="multipleTable" stripe border header-row-class-name="table-th" @row-click="rowClick" @selection-change="selectionChange">
								<el-table-column type="selection" align="center" width="55">
								</el-table-column>
								<el-table-column fixed prop="name" label="姓名" show-overflow-tooltip tooltip-effect="light" align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="applyStatus" label="审核状态" show-overflow-tooltip align="center" min-width="120" :filters="[{ text: '待审核', value: '0' }, { text: '已驳回', value: '-1' }]" :filter-method="filterTag" filter-placement="bottom-end">
									<template slot-scope="scope">
										<el-popover trigger="hover" placement="top">
											<p class="popover-p"><span>姓名 : </span><span>{{ scope.row.name }}</span></p>
											<p class="popover-p"><span>注册时间 : </span><span>{{ scope.row.registerTime?scope.row. registerTime:"-" }}</span></p>
											<p class="popover-p"><span>审核人 : </span><span>{{ scope.row.auditor?scope.row.auditor:"-" }}</span></p>
											<p class="popover-p"><span>审核时间 : </span><span>{{ scope.row.address?scope.row.address:"-"  }}</span></p>
											<div slot="reference" class="name-wrapper">
												<el-tag :type="scope.row.applyStatus == '-1' ? 'danger' : ''" close-transition size="small">{{scope.row.applyStatus == "-1" ? "已驳回" : "待审核"}}</el-tag>
											</div>
										</el-popover>

									</template>
								</el-table-column>
								<el-table-column prop="mobile" label="手机号" show-overflow-tooltip align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="password" label="密码" show-overflow-tooltip align="center" min-width="130">
								</el-table-column>
								<el-table-column prop="unit" label="单位" show-overflow-tooltip align="center" min-width="200">
								</el-table-column>
								<el-table-column prop="department" label="部门" show-overflow-tooltip align="center" min-width="200">
								</el-table-column>
								<el-table-column prop="post" label="岗位" show-overflow-tooltip align="center" min-width="150">
								</el-table-column>
								<el-table-column prop="referrerName" label="推荐人姓名" show-overflow-tooltip align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="referrerMobile" label="推荐人手机号" show-overflow-tooltip align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="registerTime" label="注册时间" show-overflow-tooltip align="center" min-width="180">
								</el-table-column>
								<el-table-column fixed="right" label="操作" align="center" min-width="100">
									<template slot-scope="scope">
										<el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
										<el-button type="text" size="small" @click="handleReject(scope.row)">驳回</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!-- 表格底部分页 -->
						<table-footer :deleteBtn=false :total="count" :multipleSelection="multipleSelection" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
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
	import { authstr, applyPass, batchApplyPass, applyReject, batchApplyReject, amount } from "@/api/getData"
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
				authstr({
                    appendUrl: "/"+_this.pageNow+"/"+_this.pageSize,
                    param: _this.getDataQuery,
				}).then((data) => {
					this.tableData = this.addSequence(data.data.userList);
                    this.count = data.data.count;
                    this.loading = false;
				})
			},
			// messageText
			messageBox(data) {
				var that = this;
                var message =  this.multipleSelection.length<=1 ? "此操作将驳回该用户的申请, 是否继续?" : "此操作将驳回"+this.multipleSelection.length+"条选中记录, 是否继续?"
				messageText(this, {
					message:message,
					beforeClose(action, instance, done) {
                        if(Array.isArray(data)) {
                            batchApplyReject({
                                param: {
									ids: data
								}
                            }).then((data)=> {
								done();
								instance.confirmButtonLoading = false;
								if(data.data.success) {
									that.$message({
										type: 'success',
										message: "驳回成功"
									});
									that.getData();
								} else {

								}
                            })
                        } else {
                            applyReject({
                                appendUrl: "/"+data,
                            }).then((data)=> {
								done();
								instance.confirmButtonLoading = false;
								if(data.data.success) {
									that.$message({
										type: 'success',
										message: "驳回成功"
									});
									that.getData();
								}

                            })
                        }
					}
					// then() {
					// 	that.$message({
					// 		type: 'error',
					// 		message: that.msg
					// 	});
					// }

				})
			},
			// messageFrom
			messageFrom(ids) {
				var that = this
				messageFrom(this, {
					message: "请输入金额(￥)",
					placeholder: "请输入金额",
					inputErrorMessage: "请输入正确的金额",
					beforeClose(action, instance, done) {
                        if(Array.isArray(ids)) {
                            batchApplyPass({
                                    param: {
                                        ids: ids,
                                    }
                            }).then((data)=> {
								done();
								instance.confirmButtonLoading = false;
								if(data.data.success) {
									amount({
										param: {
											ids: ids,
											amount: instance.inputValue
										}
									}).then((msg)=> {
										if(msg.data.success) {
											that.$message({
												type: 'success',
												message: "提交成功"
											});
											that.getData();
										} else {

										}
									})
								} else {

								}
                            })
                        } else {
                            applyPass({
                                appendUrl: "/"+ids,
                            }).then((data)=> {
								done();
								instance.confirmButtonLoading = false;
								if(data.data.success) {
									amount({
										param: {
											ids: ids,
											amount: instance.inputValue
										}
									}).then((msg)=> {

										if(msg.data.success) {
											that.$message({
												type: 'success',
												message: "提交成功"
											});
											that.getData();
										} else {

										}
									})
								} else {

								}

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
			// 表格选中事件
			selectionChange(selections) {
				this.multipleSelection = selections;
			},
			filterTag(value, row) {
				return row.applyStatus === value;
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
                this.query = val.selectValue;
                this.queryValue = val.inputValue;
				this.getData()
			},
			// 刷新
			refresh() {
                this.getData()
			},
			// 操作   通过
			handlePass(val) {

                this.messageFrom(val.wechatId)
			},
			// 驳回
			handleReject(val) {
				// if(val.applyStatus == -1) {
				// 	this.$message.error("该记录已驳回无法操作");
				// 	return;
				// }
				this.messageBox(val.wechatId)
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
				if(val == "批量通过") {
					this.messageFrom(ids)
				} else if(val == "批量驳回") {
					this.messageBox(ids)
				}
			}
		}
	}
</script>

<style lang="css">

</style>
