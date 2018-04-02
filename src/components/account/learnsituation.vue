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
						</search>
						<div class="table-wrapp" id="tableWrapp">
							<!-- 表格 -->
							<el-table v-loading="loading" :data="tableData" style="width: 100%" height="100%" ref="multipleTable" stripe border header-row-class-name="table-th" @row-click="rowClick" @selection-change="selectionChange">
								<el-table-column type="selection" align="center" width="55">
								</el-table-column>
								<el-table-column fixed prop="name" label="姓名" show-overflow-tooltip tooltip-effect="light" align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="unit" label="单位" show-overflow-tooltip align="center" min-width="200">
								</el-table-column>
								<el-table-column prop="department" label="部门" show-overflow-tooltip align="center" min-width="200">
								</el-table-column>
								<el-table-column prop="post" label="岗位" show-overflow-tooltip align="center" min-width="150">
								</el-table-column>
								<el-table-column prop="skillItem" label="鉴定工种" show-overflow-tooltip align="center" min-width="200">
								</el-table-column>
                                <el-table-column prop="skillLevel" label="鉴定等级" show-overflow-tooltip align="center" min-width="120">
								</el-table-column>
								<el-table-column prop="lastLoginTime" label="最后登录时间" show-overflow-tooltip align="center" min-width="180">
								</el-table-column>
                                <el-table-column
                                fixed="right"
                                label="操作"
                                align="center"
                                min-width="180">
                                <template slot-scope="scope">
                                  <el-button @click="collect(scope.row)" type="text" size="small">收藏</el-button>
                                  <el-button type="text" size="small" @click="wrong(scope.row)">错题</el-button>
                                  <el-button type="text" size="small" @click="learningTime(scope.row)">时间段</el-button>
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
	import { learn } from "@/api/getData"
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
				},{
					value: 'skillItem',
					label: '鉴定工种'
				}, {
					value: 'skillLevel',
					label: '鉴定等级'
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
				obj.applyStatus = 0;
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
				learn({
                    appendUrl: "/"+_this.pageNow+"/"+_this.pageSize,
                    param: _this.getDataQuery,
				}).then((data) => {
					// if(data) {
					//
					// }
					this.tableData = this.addSequence(data.data.userList);
                    this.count = data.data.count;
                    this.loading = false;
				}).catch((data)=>{

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
