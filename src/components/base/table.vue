<template lang="html">
  <div class="table-group">
      <!-- 搜索 -->
      <div class="search-wrapp" >
          <div class="pull-left" v-if="search">
              <div class="search-select">
                  <el-select v-model="selectValue" clearable placeholder="请选择">
                  <el-option
                    v-for="item in searchOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="search-input">
                  <el-input v-model="inputValue"  clearable placeholder="请输入内容"></el-input>
              </div>
              <div class="sumbit">
                  <el-button type="primary" icon="el-icon-search" @click="sumbit">搜索</el-button>
              </div>
          </div>
          <div class="pull-right">
              <slot name="search-right"></slot>
          </div>
      </div>

      <!-- 表格主体 -->
      <div class="table-wrapp" id="tableWrapp">
          <el-table
          ref="multipleTable"
          show-overflow-tooltip
          :cell-class-name="cellStyleFn"
          :height="maxHeight"
          :data="tableData"
          element-loading-text="加载中"
          @row-click="rowClick"
          @row-dblclick="rowDblclick"
          @selection-change="selectionChange"
          stripe
          border
          header-row-class-name="table-th"
          style="width: 100%">
          <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
          <el-table-column v-for="(item,index) in columnData" :key="item.prop"
            :fixed="item.fixed?item.fixed:false"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :min-width="item.width"
            >
            <template slot-scope="scope" v-if="index == 2">
               <el-popover trigger="hover" placement="top">
                 <p>姓名: {{ scope.row.name }}</p>
                 <p>审核状态: {{ scope.row.applyStatus }}</p>
                 <div slot="reference" class="name-wrapper">
                   <el-tag size="medium">{{ scope.row.name }}</el-tag>
                 </div>
               </el-popover>
            </template>
          </el-table-column>
          <slot name="operation"></slot>
        </el-table>

      </div>

      <!-- 表格底部 -->
      <div class="table-footer" >
          <div class="pull-left" v-if="deleteBtn">
            <el-button type="danger" :disabled="deleteDisabled" icon="el-icon-delete" @click="deleteEvent">删除</el-button>
            <slot name="table-footer-left"></slot>
          </div>
          <div class="pull-right">
              <div class="table-footer-right">
                  <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  :current-page="pageNow"
                  :page-sizes="[20,50,100]"
                  :page-size="pageSize"
                  :total="total">
                </el-pagination>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        search: {
          type: Boolean,
          default: true
        },
        deleteBtn: {
            type: Boolean,
            default: true
        },
        searchOptions: {
            type: Array,
            default: []
        },
        selection: {
            type: Boolean,
            default: true
        },
        columnData: {
            type: Array,
            default: []
        },
        tableData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            loading: true,
            selectValue: "",
            inputValue: "",
            pageSize: 20,
            pageNow: 1,
            maxHeight: "500",
            multipleSelection: []
        }
    },
    computed: {
        total() {
            return this.tableData.length
        },
        deleteDisabled() {
            if(this.multipleSelection.length) {
                return false
            }
            return true
        }
    },
    watch: {
        tableData(newVal) {
            if(newVal.length) {
                this.$nextTick(()=>{
                    var height = document.getElementById("tableWrapp").clientHeight
                    this.maxHeight = height
                });
            }
        }
    },
    mounted() {
        // this.$nextTick(()=>{
            // var height = document.getElementById("tableWrapp").clientHeight
            // this.maxHeight = height
        // });
        window.onresize = () => {
            var height = document.getElementById("tableWrapp")?document.getElementById("tableWrapp").clientHeight: ""
            console.log(height);
            this.maxHeight = height
        }
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.$emit("handleSizeChange",val)
        },
        handleCurrentChange(val) {
            this.$emit("handleCurrentChange",val)
        },
        // 搜索
        sumbit() {
            var data = {
                selectValue: this.selectValue,
                inputValue: this.inputValue,
            }
            this.$emit("searchEvent",data)
        },
        // 删除
        deleteEvent() {
            this.$emit("deleteEvent",this.multipleSelection)
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
        // 双击
        rowDblclick(row) {
            this.$emit("rowDblclick",row)
        },
        // 表格选中事件
        selectionChange(selections) {
            this.multipleSelection = selections;
        },
        cellStyleFn(val) {
            if(val.columnIndex == 3) {
                if(val.row.applyStatus == "待审核") {
                    val.column.className = "eeee"
                }
            }
            console.log(val);
        }
    }
}
</script>

<style lang="css">

</style>
