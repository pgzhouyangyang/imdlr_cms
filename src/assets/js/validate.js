// 自定义表单验证 结合element表单

    // 密码验证     6-15位字母、数字、特殊字符（仅限 .@!#$%^&*）的组合
    export const isvalidPwd = (rule, value, callback)=> {
        var reg = /^([a-zA-Z0-9\.\@\!\#\$\%\^\&\*]){6,15}$/;
        if(value.length>15||value.length<6) {
            callback(new Error('请输入6-15位中文或数字的密码'));
        }
        if (reg.test(value)) {
            callback();

        } else {
            callback(new Error('请输入正确的密码'));
        }
    }
    // 手机号验证
    export const isvalidPhone = (rule, value, callback)=> {
        var reg = /^\s*$|(^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8})$/;
        if (reg.test(value)) {
            callback();

        } else {
            callback(new Error('请输入正确的手机号'));
        }
    }
