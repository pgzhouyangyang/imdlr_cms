<template lang="html">
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="60%"
        top="0"
        >
        <div class="scrollbar dialog-main" ref="scrollbarDialog">
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
        }
    },
    data() {
        return {
            dialogVisible: false
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
            setTimeout(()=> {
                scrollbar(this.$refs.scrollbarDialog)
            },500)

        },
        close() {
            this.dialogVisible = false;
        },
        cancel() {
            this.dialogVisible = false;
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
        height:400px;
    }
    .el-dialog {
        margin: 0;
        min-width: 700px;
    }
    .dialog-main {
        height: 100%;
    }
</style>
