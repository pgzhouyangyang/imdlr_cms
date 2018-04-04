import Vue from 'vue'

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

        if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            if(typeof beforeClose == "function") {
                beforeClose(action, instance, done)
            }
        } else {
            done()
        }
      }
    }).then(({ value }) => {
        if(typeof then == "function") {
            then()
        }
    }).catch(() => {

    });
}
