/*
登陆根组件
 */

import React,{Component} from "react";
import {Redirect} from "react-router-dom"
import "./login.css"
import logo from "../../assests/images/logo.png"

import {Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import axsio from 'axios'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'





export default class Login extends Component {
    onFinish = async (values) => {
        console.log('Received values of form: ', values);
        //一、原生axsio请求后端API接口
        // axsio({
        //     method: 'post',
        //     url: 'http://39.96.179.159:8088/v1/user/login',
        //     data: values
        // }).then((res) => {
        //     console.log('Received values of form: ', res);
        // })

        //二、sync 和 await ，消灭回调函数，同步编码方式，不使用.then()来制定成功/失败的回调函数
        //注意async 和 await 的位置
        // const {UserAccount, UserPassword} = values //和后端接口绑定数据对应
        // try{
        //     const response = await reqLogin(UserAccount, UserPassword)
        //     console.log('成功了！', response.data)
        // }catch (e) {
        //     console.log('失败了！',e)
        // }

        //三、统一异常处理
        const {UserAccount, UserPassword} = values //和后端接口绑定数据对应
        const response = await reqLogin(UserAccount, UserPassword)
        console.log('请求成功了！', response.data)

        const result = response
        if (result.DataSet.LoginStatus === 0){
            message.success('登陆成功！')

            //登陆成功，保存user到内存
            const user = result.DataSet.UserInfo
            memoryUtils.user = user                  //存在内存中
            storageUtils.saveUser(user)          //保存在local storage 本地存储


            //跳转管理页面
            this.props.history.replace('/')       //不需要回退，用replace     涉及到回退的时候，用push
        }else {
            console.log(result.message)
        }

    };

    render() {
        //如果用户已经登陆，自动跳转到管理界面
        const user = memoryUtils.user
        if (user && user.UserId) {
            return <Redirect to='/' />
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>文化遗产资源库及检索系统</h1>
                </header>
                <section className="login-section">
                    <h2>用户登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="UserAccount"
                            rules={[{required: true, message: '请输入您的用户名!'},
                                {min: 6, message: '用户名至少6位！'},
                                {max: 11, message: '用户名最多11位！'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="UserPassword"
                            rules={[{ required: true, message: '请输入您的密码!' },
                                {min: 6, message: '密码至少6位！'},
                                {max: 11, message: '密码最多11位！'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password or Tel"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button><br/>
                            Or <a href="http://www.baidu.com">register now!</a>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}