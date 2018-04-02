<template lang="html">
    <!-- 面包屑 -->
    <div class="source">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.name">{{item,index,breadList,stateText|filterText}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="source-buttons">
            <el-button type="primary" slot="slot-buttons" icon="el-icon-refresh"  @click="refresh" v-if="refreshBtn">刷新</el-button>
            <el-button type="primary" slot="slot-buttons" icon="el-icon-plus" @click="addition" v-if="addBtn">添加</el-button >
            <slot name="source-buttons">

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        refreshBtn: {
            type: Boolean,
            default: true
        },
        addBtn: {
            type: Boolean,
            default: true
        },
        stateText: {
            type: String,
            default: ""
        },
    },
    filters: {
        filterText(item,index,breadList,stateText) {
            if(index+1 == breadList.length && stateText) {
                return item.name+"（"+stateText+"）"
            }
            return item.name
        }
    },
    data() {
        return {

        }
    },
    created() {
        this.breadList = this.createBreadList(this.$route.matched);
    },
    methods: {
        createBreadList(route) {
          var list = []
          route.map((item)=> {
              list.push(
                  {
                      name: item.meta.name
                  }
              )
          })
          return  list
        },
        refresh() {
            if(this.refreshBtn) {
                this.$emit("refresh")
            }

        },
        addition() {
            if(this.addBtn) {
                this.$emit("addition")
            }

        }
    },
    watch: {
        $route (newVal,oldVal) {
            this.breadList = this.createBreadList(this.$route.matched);
       }
    }
}
</script>

<style lang="css">
    .source {
        flex: 0 0 60px;
        display: flex;
        height: 60px;
        justify-content: space-between;
        align-items: center;
    }
    .source-buttons {
        display: flex;
    }
</style>
