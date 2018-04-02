import Vue from 'vue'
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)

export const messageText = function(_this, {message = "", title = "提示", type = "warning",beforeClose = "", then = ""} = {}) {
    if(typeof _this != "object") {
        return
    }
    _this.$confirm(message, title, {
          type: type,
          confirmButtonLoading: false,
          beforeClose: (action, instance, done)=> {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                if(typeof beforeClose == "function") {
                    beforeClose(action, instance, done)
                }

            } else {
                done()
            }
          }
        }).then(() => {
            if(typeof then == "function") {
                then()
            }

        }).catch(() => {

        });
}
export const messageFrom = function(_this, {message= "", placeholder = "", inputErrorMessage = "", title = "提示",beforeClose = "", then = ""} = {}) {
    _this.$prompt(message, title, {
      inputPlaceholder: placeholder,
      confirmButtonLoading: false,
      inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
      inputErrorMessage: inputErrorMessage,
      beforeClose: (action, instance, done)=> {
         // 输入框的值
          // instance.inputValue
        if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            if(typeof beforeClose == "function") {
                beforeClose(action, instance, done)
            }
            // setTimeout(() => {
            //     done();
            //     _this.msg = "提交成功！"
            //     instance.confirmButtonLoading = false;
            // }, 3000);
        } else {
            done()
        }
      }
    }).then(({ value }) => {
        if(typeof then == "function") {
            then()
        }
      // _this.$message({
      //   type: 'success',
      //   message: _this.msg
      // });
    }).catch(() => {

    });
}
// export const messageText = function() {
//
// }
