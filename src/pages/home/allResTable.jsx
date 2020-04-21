/*
所有资源显示组件
 */

import React, {Component} from 'react'
import {Card, Spin, Table} from "antd";

export default class ResTable extends Component{


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
            <Spin spinning={this.props.loading} >
                <Card style={{display:this.props.schdisplay}} bordered={false} type='inner'>
                    <Table
                        bordered
                        size="small"
                        // pagination={paginationProps}
                        // dataSource={this.state.DataSet}
                        // columns={columns}

                        // bordered
                        columns={columns}
                        dataSource={this.props.DataSet}
                        rowKey={(record, index) => index}        //必须标识唯一参数
                        scroll={{x: 1800}}
                        pagination={paginationProps}
                    />
                </Card>
            </Spin>
        )
    }
}