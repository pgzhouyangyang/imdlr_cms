<template lang="html">
  <div class="container">
      <my-header/>
      <bread/>
      <div class="">
          待开发
      </div>
  </div>
</template>

<script>
import MyHeader from "../base/header"
import Bread from "../base/bread"
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
    }
}
</script>

<style lang="css">
</style>
