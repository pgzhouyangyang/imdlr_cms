<template lang="html">
    <div class="table-footer">
        <div class="pull-left" >
          <el-button type="danger" :disabled="deleteDisabled" icon="el-icon-delete" @click="deleteEvent" v-if="deleteBtn">删除</el-button>
          <slot name="table-footer-left">

          </slot>
        </div>
        <div class="pull-right">
            <div class="table-footer-right">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="pageNow"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :total="total">
              </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        deleteBtn: {
            type: Boolean,
            default: true
        },
        total: {
            type: Number,
            default: 0
        },
        multipleSelection: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            pageSize: 20,
            pageNow: 1,
            pageSizes: [20,50,100]
        }
    },
    computed: {
        deleteDisabled() {
            if(this.multipleSelection.length) {
                return false
            }
            return true
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
        // 删除
        deleteEvent() {
            this.$emit("deleteEvent")
        },
    }
}
</script>

<style lang="css">
    .table-footer {
        margin-top: 5px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    /* .el-pagination {
        margin-top: 4px;
    } */
</style>
