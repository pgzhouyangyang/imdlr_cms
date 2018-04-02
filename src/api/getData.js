import request from '@/config/request'

// 登录
    export const login = (data) => request('/sys/login',data,"POST");

// 账号管理

    // 获取待审核列表
    export const authstr = (data) => request('/sysUser/apply',data,"POST");
    // export const authstr = data => request('/anthstr.json',data);
    // 审核通过
    export const applyPass = data => request('/sysUser/pass',data);
    // 批量通过
    export const batchApplyPass = data => request('/sysUser/batchpass',data,"POST");
    // 审核驳回
    export const applyReject = data => request('/sysUser/reject',data);
    // 批量驳回
    export const batchApplyReject = data => request('/sysUser/batchreject',data,"POST");

    // 获取已支付列表
    export const prepaid = data => request('/sysUser/pay',data,"POST");
    // 调整金额
    export const amount = data => request('/sysUser/amount',data,"POST");
    // 禁用
    export const sysUserOff = data => request('/sysUser/off',data);
    // 启用
    export const sysUserOn = data => request('/sysUser/on',data);

    // 获取学习情况列表
    export const learn = data => request('/sysUser/all',data,"POST");

// 试题管理

    // 获取菜单  工种&等级
    export const questionMenu = data => request('/question/menu');


    // 获取数据
    export const questionAll = data => request('/question/all',data,"POST");
    // export const questionAll = data => request('/quesBack.json');
    // 获取试题详情
    export const questionDetail = data => request('/question/particulars',data);
    // 禁用试题
    export const questionOff = data => request('/question/off',data);
    // 启用试题
    export const questionOn = data => request('/question/on',data);


// 系统管理
    // 获取字典表左侧列表
    export const dictionaryTree = data => request('/dict/tree');
    // 获取全部字典数据
    export const dictionaryAll = data => request('/dict/all',data,"POST");
    // 字典添加
    export const addDictionary = data => request('/dict/add',data,"POST");
    // 字典编辑
    export const editDictionary = data => request('/dict/edit',data,"POST");
    // 字典删除
    export const delDictionary = data => request('/dict/del',data,"POST");

    // 获取管理员数据
    export const admin = data => request('/sysAdmin/all',data,"POST");
    // 添加管理员
    export const addAdmin = data => request('/sysAdmin/add',data,"POST");
    // 编辑管理员
    export const editAdmin = data => request('/sysAdmin/edit',data,"POST");
    // 删除管理员
    export const delAdmin = data => request('/sysAdmin/del',data,"POST");
    // 禁用管理员
    export const adminOff = data => request('/sysAdmin/off',data);
    // 启用管理员
    export const adminOn = data => request('/sysAdmin/on',data);
