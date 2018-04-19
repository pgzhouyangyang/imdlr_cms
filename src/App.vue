<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {

      }
  },
  computed: {
  },
  created() {

  },
  methods: {

  },
  watch: {
      $route (newVal,oldVal) {

     }
  }
}
</script>

<style>
    html, body, #app{
        height: 100%;
        overflow: hidden;
    }
    body {
        font-size: 14px;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
        font-weight: 400;
    }
    .disabledSelectText {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    a {
        color: #fff;
        cursor: pointer;
    }
    a:hover {
        color: #09c
    }
    @media (max-width:1140px) {
        .main {
            width: 100%;
            padding: 0 30px;
        }
    }
    @media (min-width:1140px) and (max-width:1600px){
        .main {
            width: 1140px;
            margin: 0 auto;
        }
    }
    @media (min-width:1600px){
        .main {
            width: 1440px;
            margin: 0 auto;
        }
    }
    .container {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        /* align-items: stretch; */
    }
    .main {
        padding-bottom: 5px;
        box-sizing: border-box;
        flex: 1;
        overflow: hidden;
        min-width: 768px;
        /* width: 1140px; */
        /* max-width: 1140px;
        min-width: 768px; */

        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
        position: relative;
    }
    .main-wrapp {
         overflow: hidden;
        display: flex;
        width: 100%;
        flex: 1
    }
    .main-list {
        height: 100%;
        /* flex: 0 0 200px; */
        margin-right: 10px;
    }
    .main-table {
        height: 100%;
        flex: 1;
        overflow: hidden;

    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409eff
    }
    .table-wrapp {
        margin-top: 20px;
        flex: 1;
        overflow: hidden;
    }
    .table-group {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        flex: 1
    }
    .el-table {
        height: 100%;
    }
    .popover-p {
        display: flex;
        margin-bottom: 5px;
    }
    .popover-p>span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .popover-p>span:first-of-type {
        width: 65px;
        text-align: right;
        margin-right: 10px;
    }
    /* .popover-p>span:last-of-type {
        width: 100px;
    } */
    .el-table__empty-block {
        position: static;
    }
    .el-table td, .el-table th {
        height: 45px;
        padding: 0;
        line-height: normal;
    }
    .el-table .cell button {
        padding: 0;
    }
    .el-table__column-filter-trigger {
        line-height: normal;
    }
    .el-table--border.el-loading-parent--relative {
        border: 1px solid #ebeef5;
    }
    .text-dec-link {
        color: #09c;
        cursor: pointer;
    }
    .text-dec-link:hover {
        text-decoration: underline;
    }
    .scrollbar {
        overflow: hidden;
        position: relative;
    }
    .scrollbar__wrap {
        margin-right: -17px;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .scrollbar__bar.is-vertical {
        width: 6px;
        top: 2px;
    }
    .scrollbar__bar {
        position: absolute;
        right: 0px;
        bottom: 2px;
        z-index: 1;
        border-radius: 4px;
        opacity: 0;
        transition: opacity .12s ease-out;
    }
    .scrollbar__thumb {
        position: relative;
        display: block;
        width: 100%;
        height: 0;
        cursor: pointer;
        border-radius: inherit;
        background-color:#dedfe0;
        transition: background-color .3s;
    }
    .scrollbar:hover .scrollbar__bar{
	    opacity: 1;
    }
    .scrollbar:focus .scrollbar__bar,.scrollbar:active .scrollbar__bar{
    	opacity: 1;
    	cursor: pointer;
    }
    .scrollbar__thumb:hover{
    	background-color:#c8c9cc;
    }
    /* 滚动条样式 */
    /* .el-table__body-wrapper::-webkit-scrollbar{
       	width: 6px;
       	height: 6px;
        border-radius: 4px;
        opacity: 0;
        transition: opacity .12s ease-out;
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb {
        border-radius: 4px;
        width: 6px;
       	height: 6px;
        opacity: 0;
        transition: all 0.3s;
    }
    .el-table__body-wrapper::-webkit-scrollbar-track {
       width: 6px;
       height: 6px;
       border-radius: 4px;
       opacity: 0;
       transition: opacity .12s ease-out;
    }
    .el-table__body-wrapper:hover::-webkit-scrollbar-thumb{
    	 background-color:#dedfe0;
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb:hover{
    	 background-color:#c8c9cc;
    } */
    /* .el-tooltip__popper  {
        color: red!important;
        background: #fff!important;
    } */
</style>
