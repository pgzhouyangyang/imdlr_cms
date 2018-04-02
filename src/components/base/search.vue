<template lang="html">
    <!-- 搜索 -->
    <div class="search-wrapp" >
        <div class="pull-left" v-if="search">
            <div class="search-select">
                <el-select v-model="selectValue" clearable placeholder="请选择" @clear="clearSelection">
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="search-input">
                <el-input v-model="inputValue" clearable  @clear="clearInput" placeholder="输入查询关键字" @keyup.enter.native="onkeyup"></el-input>
            </div>
            <div class="sumbit">
                <el-button type="primary" icon="el-icon-search" @click="sumbit">搜索</el-button>
            </div>
        </div>
        <div class="pull-right">
            <slot name="search-right"></slot>
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
        searchOptions: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            selectValue: "",
            inputValue: ""
        }
    },
    methods: {
        sumbit() {
            var data = {
                selectValue: this.selectValue,
                inputValue: this.inputValue,
            }
            this.$emit("searchEvent",data)
        },
        clearSelection() {
            this.$parent.query = ""
        },
        clearInput() {
            this.$parent.queryValue = ""
        },
        onkeyup(e) {
            this.sumbit()
        }
    }
}
</script>

<style lang="css">
    .search-wrapp {
        /* flex: 0 0 40px; */
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .pull-left {
        display: flex;
        float: left;
        flex: 1 1;
    }
    .pull-right {
        height: 100%;
        float: right;
        display: flex;
        align-items: center;
        /* flex: 1 1; */
    }
    .search-select {
        width: 150px
    }
    .search-select, .search-input {
        margin-right: 10px;
    }

</style>
