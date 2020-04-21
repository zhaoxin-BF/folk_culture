/*
管理组件
 */

//导入的包
import React,{Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom"                 //转发页面
import { Layout} from 'antd';                            //页面布局
import memoryUtils from '../../utils/memoryUtils'         //内存数据
import Header from '../../components/header'
import LeftNav from '../../components/leftnav'
import './admin.css'

import Home from '../home'
import Upload from '../upload/upload'
import Check from '../check/check'
import User from '../user/user'
import Search from '../search/search'


//全局变量
const { Footer, Sider, Content } = Layout;       //页面布局




//
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user

        //从内存中读取，果内存中没有user 的信息
        if(!user || !user.UserId){
            // eslint-disable-next-line react/jsx-no-undef
            return <Redirect to='/login' />
        }
        return (
            <Layout className='admin'>
                <Sider>
                    <LeftNav />
                </Sider>

                <Layout >
                    <Header />
                    <Content style={{margin: 15,
                        backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/upload' component={Upload} />
                            <Route path='/check' component={Check} />
                            <Route path='/user' component={User} />
                            <Route path='/search' component={Search} />
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer className='footer'> <h1>文化遗产资源库及检索系统 @Copyright 2020</h1> </Footer>
                </Layout>
            </Layout>
        )
    }
}