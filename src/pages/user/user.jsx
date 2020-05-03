/*
用户界面组件
 */

import React,{Component} from "react";
import {Card, message, Modal, Radio, Spin, Table, Tag} from "antd";
import {getAllUser, updateUserType} from "../../api";


export default class User extends Component{
    state={
        loading:false,
        DataSet:'',
        display:'block'
    }
    //设置用户等级，删除用户
    handleResource=(e,record)=>{

        let value = e.target.value

        const actionTransf = {
            manage: "设置为管理员",
            common: "设置为普通用户",
            delete: "删除用户",
            close:  "设置封号",
            deblocking: "设置解封",
        };
        Modal.confirm({
            title: `${actionTransf[value]} ?`,
            content: ' 用户名：'+record.UserName,
            onOk:() =>{
                this.optRadio(record.UserId,value)
            },
            onCancel() {},
        });
    };

    //api 请求操作
    optRadio = async (user_id,value) =>{
        const status = {
            common: 0,           //设置为普通用户
            manage: 1,           //设置为管理员
            close: 3,            //设置封号
            deblocking: 0,       //设置解封
            delete: 4,           //删除用户
        };
        const response = await updateUserType(user_id,status[value])
        message.success(response.DataSet)
    }
    //页面初始化调用函数，分类显示全部的资源
    getUserInfo = async () =>{
        //设置加载
        this.state.loading = true
        //获得所有信息
        const response = await getAllUser()
        console.log(response.DataSet)
        //设置信息到该组件的变量
        this.setState({
            DataSet:response.DataSet,
            loading:false,
            schdisplay:'block'
        })
    };
    componentDidMount() {
        this.getUserInfo()
    }

    render() {
        //这是表头
        const columns = [
            {
                title: '用户ID',
                align: 'center',
                width: 100,
                key: 'UserId',
                dataIndex: 'UserId',
                fixed: 'left',
            },
            {
                title:'昵称',
                align:'center',
                width:100,
                key:'UserName',
                dataIndex:'UserName',
                fixed:'left',
            },
            {
                title:'用户名',
                align:'center',
                width:100,
                key:'UserAccount',
                dataIndex:'UserAccount',
                fixed:'left',
            },
            {
                title:'密码',
                align:'center',
                width:100,
                key:'UserPassword',
                dataIndex:'UserPassword',
            },
            {
                title:'电话',
                align:'center',
                width:100,
                key:'UserTel',
                dataIndex:'UserTel',
            },
            {
                title:'用户类型',
                align:'center',
                width:100,
                key:'UserType',
                dataIndex:'UserType',
                render:text=>{
                    if (text === 0){
                        return <Tag color='green'>普通用户</Tag>
                    } else if (text === 1){
                        return <Tag color='blue'>管理员</Tag>
                    } else if(text === 2){
                        return <Tag color='red'>超级管理员</Tag>
                    } else {
                        return <Tag color='#bfbfbf'>封号中</Tag>
                    }
                }
            },
            {
                title:'注册时间',
                align:'center',
                width:100,
                key:'CreateTime',
                dataIndex:'CreateTime',
                sorter: (a, b) => a.CreateTime - b.CreateTime,
                render:text=>{
                    if (text === 0){
                        return <div>--</div>
                    }else{
                        return new Date(text*1000 + 8*3600*1000).toJSON().substr(2,14).replace('T',' ')
                    }
                }
            },
            {
                title:'操作',
                align:'center',
                width:200,                        //全部设置的100，表示均分
                key:'UserType',
                dataIndex:'UserType',
                fixed: 'right',
                render:(text,record)=>{
                    console.log(record)
                    if (record.UserType === 0){
                        return (
                            <Radio.Group style={{fontSize:8}} size='small' buttonStyle="solid" onChange={(e)=>(this.handleResource(e,record))}>
                                <Radio.Button value="manage">设为管理</Radio.Button>
                                <Radio.Button value="close">封号</Radio.Button>
                                <Radio.Button value="delete">删除</Radio.Button>
                            </Radio.Group>
                        )
                    }else if (record.UserType === 1){
                        return (
                            <Radio.Group style={{fontSize:8}} size='small' buttonStyle="solid" onChange={(e)=>(this.handleResource(e,record))}>
                                <Radio.Button value="common">普通用户</Radio.Button>
                                <Radio.Button value="close">封号</Radio.Button>
                                <Radio.Button value="delete">删除</Radio.Button>
                            </Radio.Group>
                        )
                    }else if (record.UserType === 2){
                        return (
                            <Tag color='red'>超级管理员</Tag>
                        )
                    }else {
                        return (
                            <Radio.Group style={{fontSize:8}} size='small' buttonStyle="solid" onChange={(e)=>(this.handleResource(e,record))}>
                                <Radio.Button value="deblocking">解封账户</Radio.Button>
                                <Radio.Button value="delete">删除</Radio.Button>
                            </Radio.Group>
                        )
                    }

                }
            }
        ];
        //设置显示的每页长度
        const paginationProps = {
            defaultPageSize:10,
            hideOnSinglePage:true,
            size:'small',
        }
        return (
            <Spin spinning={this.state.loading} >
                <Card style={{display:this.state.display}} bordered={false} type='inner' title="所有用户">
                    <Table
                        bordered
                        size="small"
                        columns={columns}
                        dataSource={this.state.DataSet}
                        rowKey={(record, index) => index}        //必须标识唯一参数
                        pagination={paginationProps}
                    />
                </Card>
            </Spin>
        )
    }
}