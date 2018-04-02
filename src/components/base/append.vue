<template lang="html">
    <transition name="transfrom">
        <div class="dialog" v-if="dialogVisible" ref="dialog">
            <div class="dialog-header">
                <div class="">
                    <el-button type="danger" @click="back" icon="el-icon-back">返回</el-button>
                </div>
                <div class="">
                    <el-button type="primary" @click="sumbit" icon="el-icon-edit">保存</el-button>
                </div>
            </div>
            <div class="dialog-body">
                <div class="dialog-body-header">

                </div>
                <div class="dialog-body-con">
                    <div class="myForm-wrapp">
                        <slot name="myForm"></slot>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Bread from "./bread"
export default {
    data() {
        return {
            dialogVisible: false
        }
    },
    components: {
        Bread
    },
    methods: {
        // 保存
        sumbit() {
            this.$emit("save");
        },
        // 取消
        cancel() {
            this.close()
        },
        // 返回
        back() {
            this.close()
        },
        // 打开
        open() {
            this.dialogVisible = true
        },
        // 关闭
        close() {
            this.dialogVisible = false
            this.clearInput()
        },
        // 清空
        clearInput() {
            this.$parent.$refs.ruleForm.resetFields()
        }
    },
    mounted() {
        document.onkeyup = (e)=> {
            if(this.dialogVisible) {
                switch (e.keyCode) {
                    case 27:
                        this.close()
                        break;
                    default:
                }

            }
        }
    }
}
</script>

<style lang="css">
    .transfrom-enter {
        transform: translateX(100%);
        opacity: 0;
    }
    .transfrom-enter-active {
        transition: all 0.5s;
    }
    .transfrom-leave-active {
        transform: translateX(-100%);
        transition: all 0.5s
    }
    .transfrom-leave-to {
        opacity: 0;
    }
    @media (max-width:1140px) {
        .dialog {
            padding: 0 30px;
        }
    }
    @media (min-width:1140px) {
        .dialog {
            padding: 0 ;
        }
    }
    .dialog {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 10;
        background: #fff;
        display: flex;
        flex-direction: column;
    }
    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding-bottom: 30px; */
        border-bottom: 1px solid rgba(204, 204, 204, 0.4);
        height: 60px;
    }
    .dialog-body {
        padding-top: 30px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .dialog-body-header {
        height: 30px;
        line-height: 30px;

    }
    .dialog-body-con {
        flex: 1;
        display: flex;
        justify-content: center;
        overflow-y: auto;
    }
    .myForm-wrapp {
        width: 400px;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .myForm-wrapp form {
        display: block;
        width: 100%;
    }
    .el-icon-back {
        cursor: pointer;
    }
    .el-icon-back:hover {
        color: #09c;
    }
    .backText {
        margin-left: 10px;
    }
</style>
