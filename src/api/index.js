/*
包含应用中所有请求函数的模块
每个函数返回值都是promise
 */

import ajax from "./ajax";
const BASE = 'http://39.96.179.159:8088/v1'
// const BASE = 'http://localhost:8088/v1'


//=> 封装资源请求函数
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////user  用户相关
//登陆用户
export const reqLogin = (UserAccount,UserPassword) => ajax(BASE+'/user/login', {UserAccount,UserPassword}, 'post')
//注册用户
export const registerUser = (user) => ajax(BASE+'/user/register',user,'post')
//查询资源信息, user
export const getAllUser = () => ajax(BASE+'/user/getAll',{},'Get')
//修改用户状态0/普通用户 1/管理员
export const updateUserType = (user_id, type) => ajax(BASE+'/user/updateUserType',{user_id,type},'Get')




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////res 资源相关
//获得所有资源信息，给用户展示
export const getAllRes = () => ajax(BASE+'/res/getAll',{}, 'Get')

//Search 资源信息,根据 res_name
export const getResInfo = (res_name) => ajax(BASE+'/res/searchRes',{res_name}, 'Get')

//Check 资源信息，manage
export const getMAllRes = () => ajax(BASE+'/res/getMAll',{}, 'Get')

//UpdateResStatus 修改资源状态信息
export const updateResStatus = (check_name,res_id,status) => ajax(BASE+'/res/updateStatus',{check_name,res_id,status},'Get')

//delete 一条资源
export const deleteRes = (res_id) => ajax(BASE+'/res/deleteRes',{res_id},'Get')

//add    一条资源
export const addRes = (res) => ajax(BASE+'/res/add', res, 'post')

//update 一条资源
export const updateRes = (res) => ajax(BASE+'/res/update', res, 'post')


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////tag 标签相关
//getAll tag信息
export const getTags = () => ajax(BASE+'/tag/getAll',{},'Get')

//add    tag信息
export const addTag = (tag) => ajax(BASE+'/tag/add',tag,'post')

//updata tag信息
export const updateTag = (tag) => ajax(BASE+'/tag/update',tag,'post')

//delete tag信息
export const deleteTag = (tag_id) => ajax(BASE+'/tag/delete',{tag_id}, 'Get')



