/*
审核界面三类信息界面，正常，通过，未通过
 */

import React,{Component} from "react";
import {Collapse, Table, Radio, Modal, message, Button} from "antd"
import {updateResStatus} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import ResDetail from './resDetail'
import UpdateRes from './updateRes'

export default class CheckTable extends Component {
    state={
        visible:false,            //资源展示控制
        resource:{},

        updateRes:{},             //资源修改控制
        updateVisible:false,
    };
    //资源修改
    updateRes=(record)=>{
        this.setState({
            updateRes:record,
            updateVisible:true,
        })
    };
    //取消资源修改
    updateHandleCancel=(e)=>{
        this.setState({
            updateVisible: false,
        });
    };

    //资源展示
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

    //1、资源审核，处理资源函数，资源操作：资源状态通过、待审核、未过、删除
    handleResource=(e,record)=>{

        let value = e.target.value

        const actionTransf = {
            pass: "设置通过",
            nopass:'设置未过',
            await: "设置待过",
            delete: "删除资源",
        };
        Modal.confirm({
            title: `${actionTransf[value]} ?`,
            content: ' 资源名：'+record.ResourceName,
            onOk:() =>{
                this.optRadio(record.ResourceId,value)
            },
            onCancel() {},
        });
    };

    //api 请求操作
    optRadio = async (res_id,value) =>{
        const status = {
            pass : 0,
            nopass: 2,
            await: 1,
            delete: 3,
        };
        const check_name = memoryUtils.user.UserName
        const response = await updateResStatus(check_name,res_id,status[value])
        message.success(response.DataSet)
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
                key:'ScreateTime',
                dataIndex:'ScreateTime',
                sorter: (a, b) => a.CreateTime - b.CreateTime,
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
            },
            {
                title:'操作',
                align:'center',
                width:60,
                key:'Status',
                dataIndex:'Status',
                fixed: 'right',
                render:(text,record)=>{
                    if (record.Status === 0){
                       return (
                           <div>
                               <Radio.Group style={{fontSize:8}} size='small' buttonStyle="solid" onChange={(e)=>(this.handleResource(e,record))}>
                                   <Radio.Button value="await">待过</Radio.Button>
                                   <Radio.Button value="nopass">未过</Radio.Button>
                               </Radio.Group>
                               <Button type="primary" size="small" onClick={()=>(this.updateRes(record))}>修改</Button>
                           </div>
                       )
                    }else if (record.Status === 1){
                        return (
                            <div>
                                <Radio.Group style={{fontSize:8}} size='small' buttonStyle="solid" onChange={(e)=>(this.handleResource(e,record))}>
                                    <Radio.Button value="pass">通过</Radio.Button>
                                    <Radio.Button value="nopass">未过</Radio.Button>
                                </Radio.Group>
                                <Button type="primary" size="small" onClick={()=>(this.updateRes(record))}>修改</Button>
                            </div>
                        )
                    }else {
                        return (
                            <div>
                                <Radio.Group style={{fontSize:8}} size='small' buttonStyle="solid" onChange={(e)=>(this.handleResource(e,record))}>
                                    <Radio.Button value="pass">通过</Radio.Button>
                                    <Radio.Button value="delete">删除</Radio.Button>
                                </Radio.Group>
                                <Button type="primary" size="small" onClick={()=>(this.updateRes(record))}>修改</Button>
                            </div>
                        )
                    }

                }
            }

        ];
        //设置显示的每页长度
        const paginationProps = {
            defaultPageSize:6,
            hideOnSinglePage:true,
            size:'small',
        }
        //资源数据分类
        const dataSet0 = this.props.DataSet[0]
        const dataSet1 = this.props.DataSet[1]
        const dataSet2 = this.props.DataSet[2]

        return (
            <div>
                <Collapse >
                    {dataSet0!=null &&
                    <Collapse.Panel header={'审核通过：'+dataSet0.length+' 条数据'}>
                        <Table
                            bordered
                            size="small"
                            pagination={false}
                            dataSource={dataSet0}
                            columns={columns}
                            pagination={paginationProps}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            scroll={{x: 2000}}
                        />
                    </Collapse.Panel>}

                    {dataSet1!=null &&
                    <Collapse.Panel header={'有待审核：'+dataSet1.length+' 条数据'}>
                        <Table
                            bordered
                            size="small"
                            pagination={false}
                            dataSource={dataSet1}
                            columns={columns}
                            pagination={paginationProps}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            scroll={{x: 2000}}
                        />
                    </Collapse.Panel>}

                    {/*{dataSet2!=null &&*/}
                    {dataSet2!=null &&
                    <Collapse.Panel header={'审核未过：'+dataSet2.length+" 条数据"}>
                        <Table
                            bordered
                            size="small"
                            pagination={false}
                            dataSource={dataSet2}
                            columns={columns}
                            pagination={paginationProps}
                            rowKey={(record, index) => index}        //必须标识唯一参数
                            // rowKey={(record, index) => index}             //必须标识唯一参数
                            scroll={{x: 2000}}
                        />
                    </Collapse.Panel>}
                </Collapse>

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

                <Modal
                    title="资源修改"
                    visible={this.state.updateVisible}
                    onCancel= {this.updateHandleCancel}
                    destroyOnClose={true}
                    width={1200}
                    centered={true}
                    footer={null}
                    style={{top:20}}>
                    <UpdateRes
                        DataSet={this.state.updateRes}
                    />
                </Modal>
            </div>
        )
    }
}