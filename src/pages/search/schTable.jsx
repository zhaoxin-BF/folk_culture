/*
查询表信息显示
 */

import React,{Component} from 'react'
import {Card,Table} from "antd";

import memoryUtils from "../../utils/memoryUtils";
import {getResInfo} from "../../api";

const searchProps = memoryUtils.searchProps

export default class schTable extends Component{
    state={
        display:'none',
        loading:false,
        DataSet:'',
    }

    //根据内存中的数据，向后端请求数据操作
    searchResInfo = async () =>{
        const response = await getResInfo(searchProps)   //response.DataSet:数据    response.message：信息
        //设置信息到该组件的变量
        if (response.DataSet === null){
            return
        }
        this.setState({
            DataSet:response.DataSet,
            loading:false,
            display:'block',
        })
        console.log(this.state.DataSet)
    }

    render() {
        //设置列表
        const colums = [
            {
                title:'资源ID',
                align:'center',
                width:100,
                key:'ResourceId',
                dataIndex:'ResourceId',
                fixed:'left',
            },
            {
                title:'资源名称',
                align:'center',
                width:100,
                key:'ResourceName',
                dataIndex:'ResourceName',
                fixed:'left',
            },
            {
                title:'分类',
                align:'center',
                width:100,
                key:'TagName',
                dataIndex:'TagName',
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
                width:100,
                key:'Author',
                dataIndex:'Author',
            },
            {
                title:'年代',
                align:'center',
                width:100,
                key:'Time',
                dataIndex:'Time',
            },
            {
                title:'民族',
                align:'center',
                width:100,
                key:'Nation',
                dataIndex:'Nation',
            },
            {
                title:'地域',
                align:'center',
                width:100,
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
                width:100,
                key:'ScreateTime',
                dataIndex:'ScreateTime',
            },
            {
                title:'上传者',
                align:'center',
                width:100,
                key:'UploadUser',
                dataIndex:'UploadUser',
            },
            {
                title:'审核者',
                align:'center',
                width:100,
                key:'CheckName',
                dataIndex:'CheckName',
            }
        ];

        // //设置表头
        // const colName = ['资源ID','资源名称','分类','简介','作者','年代','民族','地域','资源路径','上传时间','上传者','审核者']

        //设置显示的每页长度
        const paginationProps = {
            defaultPageSize:20,
            hideOnSinglePage:true,
            size:'small'
        }

        return (
            <div>
                <Card style={{display:'none', marginTop:20}} title='查询资源列表' bordered={false} type='inner'>
                    <Table
                    size="small"
                    colums={colums}
                    dataSource={this.state.DataSet}
                    scroll={{x: 2000}}
                    pagination={paginationProps}
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}