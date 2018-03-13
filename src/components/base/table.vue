<template lang="html">
  <div class="table-group">
      <!-- 搜索 -->
      <div class="search-wrapp" >
          <div class="pull-left" v-if="search">
              <div class="search-select">
                  <el-select v-model="selectValue" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
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
          :max-height="maxHeight"
          :data="tableData"
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
          <el-table-column v-for="item in columnData" :key="item.prop"
            :fixed="item.fixed?item.fixed:false"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :min-width="item.width"
            >
          </el-table-column>
          <slot name="operation"></slot>

        </el-table>

      </div>

      <!-- 表格底部 -->
      <div class="table-footer" v-if="tableData.length">
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
        options: {
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
            selectValue: "",
            inputValue: "",
            pageSize: 20,
            pageNow: 1,
            maxHeight: "250",
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
    mounted() {
        var height = document.getElementById("tableWrapp").clientHeight
        this.$nextTick(()=>{
            this.maxHeight = height
        });
        window.onresize = () => {
            var height = document.getElementById("tableWrapp").clientHeight
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
        selectionChange(selections) {
            this.multipleSelection = selections;
        }
    }
}
</script>

<style lang="css">
    .table-group {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
    .search-wrapp, .table-footer {
        height: 40px;
    }
    .search-wrapp::after {
        content: "";
        display: block;
        clear: both;
    }
    .pull-left {
        display: flex;
        float: left;
    }
    .pull-right {
        float: right;
    }
    .search-select {
        width: 150px
    }
    .search-select, .search-input {
        margin-right: 10px;
    }

    .table-wrapp {
        margin-top: 20px;
        flex: 1;
        overflow: hidden;
    }
    .table-footer {
        margin-top: 20px;
    }
    .el-pagination {
        margin-top: 4px;
    }
</style>
