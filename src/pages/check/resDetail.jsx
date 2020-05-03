/*
资源详情显示界面
 */

import React,{Component} from "react";
import {Descriptions} from 'antd'

export default class ResDetail extends Component{
    render() {
        const res = this.props.DataSet
        return (
            <div>
                <Descriptions bordered title={"资源类别："+res.TagName} >
                    <Descriptions.Item label="名称">{res.ResourceName}</Descriptions.Item>
                    <Descriptions.Item label="简介">{res.Description}</Descriptions.Item>
                    <Descriptions.Item label="作者">{res.Author}</Descriptions.Item>
                    <Descriptions.Item label="年代">{res.Time}</Descriptions.Item>
                    <Descriptions.Item label="民族">{res.Nation}</Descriptions.Item>
                    <Descriptions.Item label="地域">{res.Region}</Descriptions.Item>
                    <Descriptions.Item label="路径" span="3"><a href={res.Url}>{res.Url}</a></Descriptions.Item>
                    <Descriptions.Item label="资源内容">
                        {res.ResourceContext}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}