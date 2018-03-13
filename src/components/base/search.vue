<template lang="html">
  <div class="search-wrapp">
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
</template>

<script>
export default {
    props:["options"],
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
        }
    }
}
</script>

<style lang="css">
    .search-wrapp {
        display: flex;
    }
    .search-select {
        width: 150px
    }
    .search-select, .search-input {
        margin-right: 10px;
    }
</style>
