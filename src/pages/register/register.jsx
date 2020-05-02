/*
登陆根组件
 */

import React,{Component} from "react";
import {Redirect} from "react-router-dom"
import "./register.css"
import logo from "../../assests/images/logo.png"

import {Form, Input, Button, message, Select} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import axsio from 'axios'
import {reqLogin,registerUser} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'





export default class Login extends Component {
    onFinish = async (values) => {
        //判断两次密码输入是否同一个
        if (values.user.UserPassword !== values.user.SurePassword){
            message.error("两次密码设置不同，请确认您的密码!")
            return
        }
        //组装数据
        const user = {}
        user['UserName']     = values.user.UserName
        user['UserAccount']  = values.user.UserAccount
        user['UserPassword'] = values.user.UserPassword
        user['UserTel']      = values.user.UserTel
        //请求注册
        const response = await registerUser(user)
        message.info(response.DataSet,5)
        this.props.history.replace('/login')       //不需要回退，用replace     涉及到回退的时候，用push
    };

    render() {
        //布局
        const layout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        };

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>文化遗产资源库及检索系统</h1>
                </header>
                <section className="login-section">
                    <h2>用户注册</h2>
                    <Form {...layout} name="nest-messages" onFinish={this.onFinish}>

                        <Form.Item
                            name={['user', 'UserName']}
                            label="昵称"
                            rules={[{required: true, message: '请输入您的昵称!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'UserAccount']}
                            label="用户名"
                            rules={[{ required: true, message: '请输入您的用户名!' },
                                {min: 6, message: '用户名至少6位！'},
                                {max: 11, message: '用户名最多11位！'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name={['user', 'UserPassword']} label="密码"
                                   rules={[{ required: true, message: '请输入您的密码!' },
                                       {min: 6, message: '密码至少6位！'},
                                       {max: 11, message: '密码最多11位！'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'SurePassword']}
                            label="确认密码"
                            rules={[{ required: true, message: '请输入您的密码!' },
                                {min: 6, message: '密码至少6位！'},
                                {max: 11, message: '密码最多11位！'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'UserTel']}
                            label="电话"
                            rules={[{ required: true, message: '请输入您的电话号码!' },
                                {len: 11, message: '请输入11位数的电话号码！'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 5}}>
                            <Button type="primary" htmlType="submit" style={{width:255}}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}