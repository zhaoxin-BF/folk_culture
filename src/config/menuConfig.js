/*
动态生成menuList 动态生成路由菜单
 */
//     AppstoreOutlined,
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     PieChartOutlined,
//     DesktopOutlined,
//     ContainerOutlined,
//     MailOutlined,
import React from 'react'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,

    HomeOutlined,                          //home    页面图标
    VerticalAlignTopOutlined,              //upload  上传资源
    CopyrightCircleOutlined,               //check   审核资源
    UsergroupAddOutlined,                  //user    用户图标
} from '@ant-design/icons';

const menuList = [
//     {
//         title: '资源查询',
//         key: '/search',
//         icon: <AppstoreOutlined />,
//     },
    {
        title: '资源首页',
        key: '/home',
        icon: <HomeOutlined />,
    },
    {
        title: '上传资源',
        key: '/upload',
        icon: <VerticalAlignTopOutlined />,
    },
    {
        title: '审核资源',
        key: '/check',
        icon: <CopyrightCircleOutlined />,
    },
    {
        title: '用户管理',
        key: '/user',
        icon: <UsergroupAddOutlined />,
    },
//     {
//         title: '测试导航',
//         key: '/test',
//         icon: <MailOutlined/>,
//         children: [ //子菜单列表
//             {
//                 title: 'test1111',
//                 key: '/test1111',
//                 icon: <ContainerOutlined/>
//             },
//             {
//                 title: 'test2222',
//                 key: '/test2222',
//                 icon: <DesktopOutlined/>
//             },
//
//         ]
//     }
]

export default menuList