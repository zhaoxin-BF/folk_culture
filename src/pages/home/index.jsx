/*
首页组件
 */

import React,{Component} from "react";
import {Input,Button} from "antd"
import './index.css'
import {getResInfo,getAllRes} from "../../api";
import ResTable from './schTable'

//变量
const {Search} = Input

export default class ResHome extends Component{

    state={
        loading:false,
        DataSet:'',
        schdisplay:'none'
    }

    //根据输入，查询数据函数
    searchResInfo = async (value) =>{
        //设置加载
        this.state.loading = true

        //response.DataSet:数据    response.message：信息
        const response = await getResInfo(value)
        //设置信息到该组件的变量
        this.setState({
            DataSet:response.DataSet,
            loading:false,
            schdisplay:'block'
        })
    };

    //页面初始化调用函数，分类显示全部的资源
    defaultResInfo = async () =>{
        //设置加载
        this.state.loading = true
        //获得所有信息
        const response = await getAllRes()

        //设置信息到该组件的变量
        this.setState({
            DataSet:response.DataSet,
            loading:false,
            schdisplay:'block'
        })
    };

    componentDidMount() {
        this.defaultResInfo()
    }

    render() {
        return (
            <div>
                <div className='home-search'>
                    <div className='button-left'>
                        <Button type="primary" onClick={this.defaultResInfo} >全部资源</Button>
                    </div>
                    <div className='input-right'>
                        <Search
                            placeholder="请输入所要查询资源名、资源ID、分类"
                            onSearch={value => this.searchResInfo(value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <ResTable
                    schdisplay = {this.state.schdisplay}
                    DataSet = {this.state.DataSet}
                    loading = {this.state.loading}
                />
            </div>
        )
    }
}