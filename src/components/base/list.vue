<template lang="html">
    <div class="list">
        <el-menu
          default-active="0"
          class="el-menu-vertical"
          @select="menuSelect"
          background-color="#EAEDF1"
          >
          <el-menu-item index="0">
            <span slot="title">{{menuTitle}}</span>
            <i class="el-icon-caret-bottom"></i>
          </el-menu-item>
          <div class="list-view scrollbar" ref="scrollbar">
              <div class="scrollbar__wrap">
                  <div class="scrollbar-view">
                      <el-menu-item  v-for="(item,index) in menuList" :key="index" :index="item[label].toString()">
                          <i class="el-icon-menu"></i>
                          <span slot="title" :title="item.name">{{item.name}}</span>
                      </el-menu-item>
                  </div>
              </div>
              <div class="scrollbar__bar is-vertical">
                  <div class="scrollbar__thumb">

                  </div>
              </div>
          </div>
        </el-menu>
    </div>

</template>

<script>
import { scrollbar } from "@/assets/js/common"
export default {
    props: {
        menuTitle: {
            type: String,
            default: ""
        },
        menuList: {
            type: Array,
            default: function() {
                return []
            }
        },
        label: {
            type: String,
            default: "id"
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        // 设置滚动条高度
        this.$nextTick(()=> {
            setTimeout(()=> {
                scrollbar(this.$refs.scrollbar)
            },1000)
        })
        // // 添加边距 隐藏滚动条
        // var scrollbarEle = this.$refs.scrollbar;
        // var scrollbarWrap = scrollbarEle.querySelector(".scrollbar__wrap");
        // var scrollbarThumb = scrollbarEle.querySelector(".is-vertical .scrollbar__thumb");
        // scrollbarWrap.style.marginRight = -(scrollbarWrap.offsetWidth-scrollbarWrap.clientWidth)+"px";
        // scrollbarWrap.style.paddingBottom =  -(scrollbarWrap.offsetWidth-scrollbarWrap.clientWidth)+"px";
        // // 设置滚动条高度
        // this.$nextTick(()=> {
        //     setTimeout(()=> {
        //         scrollbar(this.$refs.scrollbar)
        //         scrollbarEle.querySelector(".is-vertical .scrollbar__thumb").style.height = scrollbarWrap.clientHeight/scrollbarWrap.scrollHeight == 1?"0px":scrollbarWrap.clientHeight/scrollbarWrap.scrollHeight*100+"%";
        //     },500)
        //
        // })
        //
        // // 监听滚动事件
    	// scrollbarWrap.addEventListener("scroll",function(event) {
        //     this.parentNode.querySelector(".scrollbar__thumb").style.transform = "translateY("+(this.scrollTop/this.clientHeight*100)+"%)"
        // });
        // // 鼠标拖动事件
    	// scrollbarThumb.addEventListener("mousedown",function(event) {
        //     var _this = this;
    	// 	// 点击时鼠标Y轴坐标
    	// 	var startY = event.clientY;
    	// 	// 点击时滚动容器scrollTop
    	// 	var scrollTop = this.parentNode.previousElementSibling.scrollTop;
    	// 	// 禁用选中文本事件
    	// 	// document.addEventListener("selectstart",docSelectstart,false)
    	// 	// 拖动事件
    	// 	document.addEventListener("mousemove",docMousemove,false)
    	// 	// 鼠标抬起 取消事件
    	// 	document.addEventListener("mouseup",function(event) {
    	// 		// document.removeEventListener("mouseup");
        //         document.body.classList.remove("disabledSelectText")
    	// 		document.removeEventListener("mousemove",docMousemove,false);
    	// 		// document.removeEventListener("selectstart",docSelectstart,false);
    	// 	});
        //     // function docSelectstart(event) {
        //     //     return
        //     // };
        //     function docMousemove(event) {
        //         document.body.classList.add("disabledSelectText")
        //         _this.parentNode.previousElementSibling.scrollTop = (event.clientY-startY)/_this.clientHeight*_this.parentNode.clientHeight+scrollTop
        //     };
        //     function docSelectstart() {
        //
        //     };
        // })
    },
    methods: {
        menuSelect(val) {
            this.$emit("menuSelect",val)
        }
    }
}
</script>

<style lang="css">
    .list {
        height: 100%;
        background: #EAEDF1;
        width: 200px;
        /* margin-right: 10px; */
    }
    .list .el-menu {
        border-right: none;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .list-view {
        flex: 1;
    }
    .list .el-menu-item.is-active {
        background: #fff!important;
    }
    .list .el-menu-item:hover {
        background: #fff!important;
    }
    .list .el-menu-item {
        display: flex;
        align-items: center;
    }
    .list .el-menu-item i {
        flex:0;
    }
    .list .el-menu-item span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }

</style>
