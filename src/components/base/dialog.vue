<template lang="html">
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :width="width"
        top="0"
        >
        <div class="scrollbar dialog-main" ref="scrollbarDialog" v-loading="loading">
            <div class="scrollbar__wrap">
                <div class="scrollbar-view">
                    <slot name="dialog-body">
                    </slot>
                </div>
            </div>
            <div class="scrollbar__bar is-vertical">
                <div class="scrollbar__thumb">

                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer" v-if="isFooter">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>

  </el-dialog>
</template>

<script>
import { scrollbar } from "@/assets/js/common"
export default {
    props: {
        title: {
            type: String,
            default: "提示"
        },
        text: {
            type: String,
            default: ""
        },
        isFooter: {
            Boolean,
            default: false
        },
        width: {
            String,
            default: "60%"
        }
    },
    data() {
        return {
            dialogVisible: false,
            loading: false
        }
    },
    mounted() {

        // setTimeout(()=> {
        //     scrollbar(this.$refs.scrollbar)
        // },1000)

    },
    methods: {
        dialogConfirm() {
            this.$emit("dialogConfirm")
        },
        dialogCancel() {
            this.close()
        },
        open() {
            this.dialogVisible = true;
            this.loading = true;
            setTimeout(()=> {
                scrollbar(this.$refs.scrollbarDialog)
            },500)
        },
        close() {
            this.dialogVisible = false;
            this.loading = false;
        },
        cancel() {
            this.dialogVisible = false;
            this.loading = false;
        },
        confirm() {
            this.$emit("dialogConfirm")
        }
    }
}
</script>

<style lang="css">
    .el-dialog__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-dialog__body {
        max-height:400px;
    }
    .el-dialog {
        margin: 0;
    }
    .dialog-main {
        height: 100%;
    }
</style>
