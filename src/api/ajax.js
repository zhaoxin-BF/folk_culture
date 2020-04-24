/*
发送异步请求的函数模块
封装axios库
函数的返回值是promise对象


 */

import axios from 'axios'
import {message} from "antd";
import memoryUtils from '../utils/memoryUtils'
// import cookies from "react-cookies";              //携带cookies信息模块

// axios.defaults.withCredentials=true               //设置允许携带cookie信息

const user = memoryUtils.user
// axios.defaults.headers.common['user_name'] =
// cookies.save("user",'usefsfs')

export default function ajax(url, data={},type='Get') {

    return new Promise((resolve, reject) => {
        let promise
        if (type === 'Get') {
            promise = axios.get(url, {
                params: data,
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response => {
            resolve(response.data)         //返回的是data
            // message.info(cookies.load("user"))
        }).catch(e =>{
            message.error('请求出错了：'+e.message)
        })
    })
}