/*
审核组件
 */

import React,{Component} from "react";
import {getMAllRes} from "../../api";
import CheckTable from "./checkTable"

export default class Check extends Component{
    state={
        loading:false,
        DataSet:'',
        schdisplay:'none'
    }

    //页面初始化调用函数，分类显示全部的资源
    getMResInfo = async () =>{
        //设置加载
        this.state.loading = true
        //获得所有信息
        const response = await getMAllRes()

        //设置信息到该组件的变量
        this.setState({
            DataSet:response.DataSet,
            loading:false,
            schdisplay:'block'
        })
    };
    componentDidMount() {
        this.getMResInfo()
    }

    render() {
        return (
            <div>
                <CheckTable
                    DataSet = {this.state.DataSet}
                    // loading = {this.state.loading}
                />
            </div>
        )
    }
}