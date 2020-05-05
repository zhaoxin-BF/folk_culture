/*
资源列表显示界面组件
 */

import React, {Component} from 'react'
import {Button, Card, Modal, Spin, Table} from "antd";
import ResDetail from "../check/resDetail";

export default class ResTable extends Component{

    state={
        visible:false,
        resource:{},
    };

    getResDetail=(record)=>{
        console.log(record)
        this.setState({
            resource:record,
            visible:true,
        })
    };

    //取消资源展示
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

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
                width:40,
                key:'ResourceName',
                dataIndex:'ResourceName',
                fixed:'left',
                render:(text,record)=>{
                    return(
                        <Button type={'link'} size={'small'} onClick={()=>(this.getResDetail(record))}>
                            {text}
                        </Button>
                    )
                }
            },
            {
                title:'简介',
                align:'center',
                width:60,
                key:'Description',
                dataIndex:'Description',
            },
            {
                title:'作者',
                align:'center',
                width:60,
                key:'Author',
                dataIndex:'Author',
            },
            {
                title:'年代',
                align:'center',
                width:30,
                key:'Time',
                dataIndex:'Time',
            },
            {
                title:'民族',
                align:'center',
                width:30,
                key:'Nation',
                dataIndex:'Nation',
            },
            {
                title:'地域',
                align:'center',
                width:30,
                key:'Region',
                dataIndex:'Region',
            },
            {
                title:'资源路径',
                align:'center',
                width:100,
                key:'Url',
                dataIndex:'Url',
                render:(text)=>{
                    if (text === ""){
                        return(
                            <a href="https://www.baidu.com/">百度一下</a>
                        )
                    }else {
                        return(
                            <a href={text}>{text}</a>
                        )
                    }
                }
            },
            {
                title:'上传时间',
                align:'center',
                width:70,
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
                title:'上传者',
                align:'center',
                width:30,
                key:'UploadUser',
                dataIndex:'UploadUser',
            },
            {
                title:'审核者',
                align:'center',
                width:30,
                key:'CheckName',
                dataIndex:'CheckName',
            }
        ];
        //设置显示的每页长度
        const paginationProps = {
            defaultPageSize:6,
            hideOnSinglePage:true,
            size:'small',
        }
        return (
            <div>
                <Spin spinning={this.props.loading} >
                    <Card style={{display:this.props.schdisplay}} bordered={false} type='inner'>
                        <Table
                            bordered
                            size="small"
                            columns={columns}
                            dataSource={this.props.DataSet}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            scroll={{x: 2000}}
                            pagination={paginationProps}
                        />
                    </Card>
                </Spin>
                <Modal
                    title="资源展示"
                    visible={this.state.visible}
                    onCancel= {this.handleCancel}
                    destroyOnClose={true}
                    width={1200}
                    centered={true}
                    footer={null}
                    style={{top:20}}>
                    <ResDetail
                        DataSet={this.state.resource}
                    />
                </Modal>
            </div>
        )
    }
}