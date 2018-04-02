// 公共js
    // 清空表单
    export const clearForm = data => {
        var formData = {...data};
        Object.keys(formData).map((item)=> {
            formData[item] = ""
        })
        return formData
    }

    export const scrollbar = el => {
        // 添加边距 隐藏滚动条
        var scrollbarEle = el;
        var scrollbarWrap = scrollbarEle.querySelector(".scrollbar__wrap");
        var scrollbarThumb = scrollbarEle.querySelector(".is-vertical .scrollbar__thumb");
        scrollbarWrap.style.marginRight = -(scrollbarWrap.offsetWidth-scrollbarWrap.clientWidth)+"px";
        scrollbarWrap.style.paddingBottom =  -(scrollbarWrap.offsetWidth-scrollbarWrap.clientWidth)+"px";
        // 设置滚动条高度
        scrollbarEle.querySelector(".is-vertical .scrollbar__thumb").style.height = scrollbarWrap.clientHeight/scrollbarWrap.scrollHeight == 1?"0px":scrollbarWrap.clientHeight/scrollbarWrap.scrollHeight*100+"%";
        // 监听滚动事件
    	scrollbarWrap.addEventListener("scroll",function(event) {
            this.parentNode.querySelector(".scrollbar__thumb").style.transform = "translateY("+(this.scrollTop/this.clientHeight*100)+"%)"
        });
        // 鼠标拖动事件
    	scrollbarThumb.addEventListener("mousedown",function(event) {
            var _this = this;
    		// 点击时鼠标Y轴坐标
    		var startY = event.clientY;
    		// 点击时滚动容器scrollTop
    		var scrollTop = this.parentNode.previousElementSibling.scrollTop;
    		// 禁用选中文本事件
    		// document.addEventListener("selectstart",docSelectstart,false)
    		// 拖动事件
    		document.addEventListener("mousemove",docMousemove,false)
    		// 鼠标抬起 取消事件
    		document.addEventListener("mouseup",function(event) {
    			// document.removeEventListener("mouseup");
                document.body.classList.remove("disabledSelectText")
    			document.removeEventListener("mousemove",docMousemove,false);
    			// document.removeEventListener("selectstart",docSelectstart,false);
    		});
            // function docSelectstart(event) {
            //     return
            // };
            function docMousemove(event) {
                document.body.classList.add("disabledSelectText")
                _this.parentNode.previousElementSibling.scrollTop = (event.clientY-startY)/_this.clientHeight*_this.parentNode.clientHeight+scrollTop
            };
            function docSelectstart() {

            };
        })
    }
