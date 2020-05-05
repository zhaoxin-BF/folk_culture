/*
资源上传组件
 */

import React,{Component} from "react";
import {Button, Form, Input, message, Select} from "antd";
import './index.css'
import {getTags,addRes} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'


export default class Upload extends Component {
    state={
        tags:[]
    }
    //获取tags 参数
    getTags = async () => {
        const tags = await getTags()
        this.setState({
            tags:tags.DataSet
        })
    }
    //form 表单回调函数
    onFinish = async (values) => {
        //获得表单数据
        const res = values.res

        //从内存获取用户数据，添加近对象res中
        const user = memoryUtils.user
        res['UploadId'] = user.UserId
        res['UploadUser'] = user.UserName

        console.log("res: ",res)
        //发送post 请求
        const response = await addRes(res)

        message.info(response.DataSet,3)
        this.props.history.replace('/home')
        //跳转到详情显示页
    };

    //组件加载完成后调用
    componentDidMount() {
        this.getTags()
    }

    render() {
        //布局
        const layout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16}
        };
        //规则
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not validate email!',
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        //回调函数

        return (
            <div>
                <div className='title'><h1>资源上传</h1></div>
                <div className='upload'>
                    <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} >

                        <Form.Item name={['res','TagName']} label="类别">
                            <Select>
                                {
                                    this.state.tags.map(item =>{
                                        return <Select.Option value={item.TagName} key={item.TagId}>{item.TagName}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['res', 'ResourceName']}
                            label="资源名称"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name={['res', 'Url']} label="Url网址">
                            <Input/>
                        </Form.Item>
                        <Form.Item name={['res', 'Description']} label="资源简介"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={['res', 'Author']} label="作者" >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['res', 'Time']} label="年代">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['res', 'Nation']} label="民族">
                            <Input/>
                        </Form.Item>
                        <Form.Item name={['res', 'Region']} label="地域">
                            <Input/>
                        </Form.Item>
                        <Form.Item name={['res', 'ResourceContext']} label="资源内容">
                            <Input.TextArea
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
                            <Button type="primary" htmlType="submit" style={{width:800}}>
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        )
    }
}