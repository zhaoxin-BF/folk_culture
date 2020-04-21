/*
进行local 数据的存储管理的工具模块
 */
import store from 'store'
const USER_KEY = 'user_key';

// //自带的localStorage
// export default {
//
//     //保存user
//     saveUser (user) {
//         localStorage.setItem(USER_KEY, JSON.stringify(user))
//     },
//     //读取user
//     getUser (){
//         return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
//     },
//     //删除user
//     removeUser () {
//         localStorage.removeItem(USER_KEY)
//     }
// }

//利用GitHub 上的store 库来进行存储
export default{

    //保存user
    saveUser (user) {
        store.set(USER_KEY, user)
    },
    //读取user
    getUser (){
        return store.get(USER_KEY) || {}
    },
    //删除user
    removeUser () {
        store.remove(USER_KEY)
    }
}