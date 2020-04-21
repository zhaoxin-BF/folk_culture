/*
包含应用中所有请求函数的模块
每个函数返回值都是promise
 */

import ajax from "./ajax";
const BASE = 'http://39.96.179.159:8088/v1'
// const BASE = 'http://localhost:8088/v1'


//=> 函数
//登陆用户
export const reqLogin = (UserAccount,UserPassword) => ajax(BASE+'/user/login', {UserAccount,UserPassword}, 'post')

//注册用户
export const registerUser = (user) => ajax(BASE+'/user/register',user,'post')

//查询资源信息
export const getResInfo = (res_name) => ajax(BASE+'/res/searchRes',{res_name}, 'Get')

