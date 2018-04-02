<template lang="html">
  <div class="container">
      <my-header/>
      <bread/>
      <div id="editor" type="text/plain" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
import MyHeader from "../base/header"
import Bread from "../base/bread"
import TableGroup from "../base/table"
import "../../../static/plugins/utf8-jsp/ueditor.config"
import "../../../static/plugins/utf8-jsp/ueditor.all"
import "../../../static/plugins/utf8-jsp/lang/zh-cn/zh-cn"
export default {
    data() {
        return {
            ue: null
        }
    },
    mounted() {
        UE.delEditor('editor');
        this.ue = UE.getEditor('editor',{
            BaseUrl: '',
            UEDITOR_HOME_URL: 'static/plugins/utf8-jsp/',
        });
    },
    components: {
        MyHeader,
        Bread,
        TableGroup
    }
}
</script>

<style lang="css">
</style>
