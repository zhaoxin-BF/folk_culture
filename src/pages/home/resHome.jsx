/*
首页组件
 */

import React,{Component} from "react";
import {Card, Input,Spin,Table} from "antd"
import './index.css'
import {getResInfo} from "../../api";

//变量
const {Search} = Input

export default class ResHome extends Component{

    state={
        loading:false,
        DataSet:'',
        schdisplay:'none'
    }

    //根据内存中的数据，向后端请求数据操作
    searchResInfo = async (value) =>{
        this.state.loading = true
        const response = await getResInfo(value)   //response.DataSet:数据    response.message：信息
        //设置信息到该组件的变量
        this.setState({
            DataSet:response.DataSet,
            loading:false,
            schdisplay:'block'
        })
        console.log(this.state.DataSet)
    }


    render() {
        //设置列表
        const columns = [
            {
                title: '资源ID',
                align: 'center',
                width: 25,
                key: 'ResourceId',
                dataIndex: 'ResourceId',
                fixed: 'left',
            },
            {
                title:'分类',
                align:'center',
                width:40,
                key:'TagName',
                dataIndex:'TagName',
                fixed:'left',
            },
            {
                title:'资源名称',
                align:'center',
                width:60,
                key:'ResourceName',
                dataIndex:'ResourceName',
                fixed:'left',
            },
            {
                title:'简介',
                align:'center',
                width:100,
                key:'Description',
                dataIndex:'Description',
            },
            {
                title:'作者',
                align:'center',
                width:40,
                key:'Author',
                dataIndex:'Author',
            },
            {
                title:'年代',
                align:'center',
                width:40,
                key:'Time',
                dataIndex:'Time',
            },
            {
                title:'民族',
                align:'center',
                width:40,
                key:'Nation',
                dataIndex:'Nation',
            },
            {
                title:'地域',
                align:'center',
                width:40,
                key:'Region',
                dataIndex:'Region',
            },
            {
                title:'资源路径',
                align:'center',
                width:100,
                key:'Url',
                dataIndex:'Url',
            },
            {
                title:'上传时间',
                align:'center',
                width:40,
                key:'ScreateTime',
                dataIndex:'ScreateTime',
            },
            {
                title:'上传者',
                align:'center',
                width:40,
                key:'UploadUser',
                dataIndex:'UploadUser',
            },
            {
                title:'审核者',
                align:'center',
                width:40,
                key:'CheckName',
                dataIndex:'CheckName',
            }
        ];
        //设置显示的每页长度
        const paginationProps = {
            defaultPageSize:10,
            hideOnSinglePage:true,
            size:'small',
        }

        return (
            <div>
                <div className='home-search'>
                    <Search
                        placeholder="请输入所要查询资源名、资源ID、分类"
                        onSearch={value => this.searchResInfo(value)}
                        style={{width: 600}}
                    />
                </div>
                <Spin spinning={this.state.loading} >
                    <Card style={{display:this.state.schdisplay}} bordered={false} type='inner'>
                        <Table
                            bordered
                            size="small"
                            // pagination={paginationProps}
                            // dataSource={this.state.DataSet}
                            // columns={columns}

                            // bordered
                            columns={columns}
                            dataSource={this.state.DataSet}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            scroll={{x: 1800}}
                            pagination={paginationProps}
                        />
                    </Card>
                </Spin>
            </div>
        )
    }
}