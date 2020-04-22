/*
审核界面三类信息界面，正常，通过，未通过
 */

import React,{Component} from "react";
import {Collapse, Table} from "antd"

export default class CheckTable extends Component {


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

        const dataSet0 = this.props.DataSet[0]
        const dataSet1 = this.props.DataSet[1]
        const dataSet2 = this.props.DataSet[2]

        return (
            <div>
                <Collapse >
                    {dataSet0!=null &&
                    <Collapse.Panel header={'审核通过：'+dataSet0.length+' 条数据'}>
                        <Table
                            size="small"
                            pagination={false}
                            dataSource={dataSet0}
                            columns={columns}
                            pagination={paginationProps}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            scroll={{x: 1800}}
                        />
                    </Collapse.Panel>}

                    {dataSet1!=null &&
                    <Collapse.Panel header={'待审核：'+dataSet1.length+' 条数据'}>
                        <Table
                            size="small"
                            pagination={false}
                            dataSource={dataSet1}
                            columns={columns}
                            pagination={paginationProps}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            scroll={{x: 1800}}
                        />
                    </Collapse.Panel>}

                    {/*{dataSet2!=null &&*/}
                    {dataSet2!=null &&
                    <Collapse.Panel header={'未通过：'+dataSet2.length+" 条数据"}>
                        <Table
                            size="small"
                            pagination={false}
                            dataSource={dataSet2}
                            columns={columns}
                            pagination={paginationProps}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            scroll={{x: 1800}}
                        />
                    </Collapse.Panel>}
                </Collapse>
            </div>
        )
    }
}