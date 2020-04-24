// /*
// 查询资源显示组件
//  */
//
// import React,{Component} from "react";
// import axios from 'axios'
// import {getResInfo} from '../../api'
// import memoryUtils from "../../utils/memoryUtils"
// import SchTable from './schTable'
// import {Card, Spin, Table, Input} from "antd";
//
// const searchProps = memoryUtils.searchProps
//
// export default class SearchRes extends Component{
//
//
//     state={
//         loading:false,
//         DataSet:'',
//     }
//
//     //根据内存中的数据，向后端请求数据操作
//     searchResInfo = async () =>{
//         const response = await getResInfo(searchProps)   //response.DataSet:数据    response.message：信息
//         //设置信息到该组件的变量
//         this.setState({
//             DataSet:response.DataSet,
//             loading:false,
//         })
//         console.log(this.state.DataSet)
//     }
//
//     componentDidMount() {
//         this.searchResInfo()
//     }
//
//     render() {
//         //设置列表
//         const colums = [
//             {
//                 title:'资源ID',
//                 align:'center',
//                 width:100,
//                 key:'ResourceId',
//                 dataIndex:'ResourceId',
//                 fixed:'left',
//             },
//             {
//                 title:'资源名称',
//                 align:'center',
//                 width:100,
//                 key:'ResourceName',
//                 dataIndex:'ResourceName',
//                 fixed:'left',
//             },
//             {
//                 title:'分类',
//                 align:'center',
//                 width:100,
//                 key:'TagName',
//                 dataIndex:'TagName',
//                 fixed:'left',
//             },
//             {
//                 title:'简介',
//                 align:'center',
//                 width:100,
//                 key:'Description',
//                 dataIndex:'Description',
//             },
//             {
//                 title:'作者',
//                 align:'center',
//                 width:100,
//                 key:'Author',
//                 dataIndex:'Author',
//             },
//             {
//                 title:'年代',
//                 align:'center',
//                 width:100,
//                 key:'Time',
//                 dataIndex:'Time',
//             },
//             {
//                 title:'民族',
//                 align:'center',
//                 width:100,
//                 key:'Nation',
//                 dataIndex:'Nation',
//             },
//             {
//                 title:'地域',
//                 align:'center',
//                 width:100,
//                 key:'Region',
//                 dataIndex:'Region',
//             },
//             {
//                 title:'资源路径',
//                 align:'center',
//                 width:100,
//                 key:'Url',
//                 dataIndex:'Url',
//             },
//             {
//                 title:'上传时间',
//                 align:'center',
//                 width:100,
//                 key:'ScreateTime',
//                 dataIndex:'ScreateTime',
//             },
//             {
//                 title:'上传者',
//                 align:'center',
//                 width:100,
//                 key:'UploadUser',
//                 dataIndex:'UploadUser',
//             },
//             {
//                 title:'审核者',
//                 align:'center',
//                 width:100,
//                 key:'CheckName',
//                 dataIndex:'CheckName',
//             }
//         ];
//
//         // //设置表头
//         // const colName = ['资源ID','资源名称','分类','简介','作者','年代','民族','地域','资源路径','上传时间','上传者','审核者']
//
//         //设置显示的每页长度
//         const paginationProps = {
//             defaultPageSize:20,
//             hideOnSinglePage:true,
//             size:'small'
//         }
//
//         return (
//             <div>
//                 <Input
//                     placeholder="请输入所要查询资源名、资源ID、分类"
//                     onSearch={value => this.searchInfo(value)}
//                     style={{width: 400}}
//                 />
//                 <Card style={{display:'block'}}>
//                     <Table
//                         colums={colums}
//                         dataSource={this.state.DataSet}
//                         scroll={{x: 2000}}
//                         pagination={paginationProps}
//                     >
//                     </Table>
//                 </Card>
//             </div>
//         )
//     }
// }