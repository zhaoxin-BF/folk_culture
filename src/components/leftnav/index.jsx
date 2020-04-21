// 左侧导航栏组件

import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import './index.css'
import logo from '../../assests/images/logo.png'
import {Menu} from 'antd'
import menuList from '../../config/menuConfig'


const { SubMenu } = Menu;

class LeftNav extends Component {

    //根据menu 的数据生成对应的标签数组
    //使用map() + 递归调用
    // getMenuNodes = (menuList) =>{
    //     return menuList.map(item => {
    //         // {
    //         //     title: '首页',  //对应标题名称
    //         //     key: '/home',  //对应的path
    //         //     icon: <HomeOutlined />,  //可能没有
    //         //     children: [],  //可能有
    //         // }
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         {item.icon}
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                         <span>
    //                             {item.icon}
    //                             <span>{item.title}</span>
    //                         </span>
    //                     }
    //                 >
    //                 {/*递归调用显示*/}
    //                 {  this.getMenuNodes(item.children)  }
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }

    //根据menu 的数据生成对应的标签数组
    //使用reduce() + 递归调用, 可增可减
    getMenuNodes_reduce = (menuList) => {
        return menuList.reduce((pre, item) => {
            //向pre添加<Menu.Item>
            if(!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                         <Link to={item.key}>
                             {item.icon}
                             <span>{item.title}</span>
                         </Link>
                    </Menu.Item>
                ))
            } else {
                //向pre添加<SubMen>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                 {item.icon}
                                 <span>{item.title}</span>
                             </span>
                        }
                    >
                    {/*递归调用显示*/}
                    {  this.getMenuNodes_reduce(item.children)  }
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }

    render() {
        //获得当前请求的的路径
        const path = this.props.location.pathname
        // const path = 'home'



        return (
            <div className="left-nav">
                <Link  to='/' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>文化遗产</h1>
                </Link>

                <Menu
                    // defaultSelectedKeys={[path]}  //只匹配一次
                    selectedKeys={[path]}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >

                    {/*<Menu.Item key="home">*/}
                    {/*    <Link to='/home'>*/}
                    {/*        <PieChartOutlined />*/}
                    {/*        <span>所有资源</span>*/}
                    {/*    </Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="upload">*/}
                    {/*    <Link to='/upload'>*/}
                    {/*        <MenuUnfoldOutlined />*/}
                    {/*        <span>上传资源</span>*/}
                    {/*    </Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="check">*/}
                    {/*    <Link to='/check'>*/}
                    {/*        <DesktopOutlined />*/}
                    {/*        <span>资源审核</span>*/}
                    {/*    </Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="user">*/}
                    {/*    <Link to='/user'>*/}
                    {/*        <MailOutlined />*/}
                    {/*        <span>用户管理</span>*/}
                    {/*    </Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<SubMenu*/}
                    {/*    key="tags"*/}
                    {/*    title={*/}
                    {/*        <span>*/}
                    {/*        <MenuFoldOutlined />*/}
                    {/*        <span>资源分类</span>*/}
                    {/*        </span>*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    <Menu.Item key="5">诗词</Menu.Item>*/}
                    {/*    <Menu.Item key="6">歌赋</Menu.Item>*/}
                    {/*    <Menu.Item key="7">琴棋</Menu.Item>*/}
                    {/*    <Menu.Item key="8">书画</Menu.Item>*/}
                    {/*</SubMenu>*/}

                    {
                        this.getMenuNodes_reduce(menuList)
                    }
                </Menu>
            </div>
        )
    }
}

//高阶组件
//作用：包装非路由组件，返回一个新的组件，新的组件向非路由组件传递三个属性：history/location/match
export default withRouter(LeftNav)