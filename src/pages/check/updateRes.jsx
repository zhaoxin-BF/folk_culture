

import React,{Component} from "react";
import {Button, Form, Input, message, Select} from "antd";
import {updateRes,getTags} from "../../api";

export default class UpdateRes extends Component{

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
        const res = values
        console.log("res: ",res)
        console.log("res[]: ", res.TagName)
        let updateDate = this.props.DataSet
        updateDate.TagName      = res.TagName
        updateDate.ResourceName = res.ResourceName
        updateDate.Url          = res.Url
        updateDate.Description  = res.Description
        updateDate.Author       = res.Author
        updateDate.Time         = res.Time
        updateDate.Nation       = res.Nation
        updateDate.Region       = res.Region
        updateDate.ResourceContext = res.ResourceContext

        console.log("updateData: ",updateDate)
        //发送post 请求
        const response = await updateRes(updateDate)

        message.info(response.DataSet,3)
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
        //验证规则
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

        //初始化数据
        const res = this.props.DataSet
        return (
            <div>
                <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} initialValues={res}>

                    <Form.Item name="TagName" label="类别">
                        <Select >
                            {
                                this.state.tags.map(item =>{
                                    return <Select.Option value={item.TagName} key={item.TagId} >{item.TagName}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="ResourceName"
                        label="资源名称"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="Url" label="Url网址">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Description" label="资源简介"
                               rules={[
                                   {
                                       required: true,
                                   },
                               ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Author" label="作者">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Time" label="年代">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Nation" label="民族">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Region" label="地域">
                        <Input />
                    </Form.Item>
                    <Form.Item name="ResourceContext" label="资源内容">
                        <Input.TextArea
                            placeholder="请重新输入资源内容！"
                            autoSize={{ minRows: 4, maxRows: 8 }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
                        <Button type="primary" htmlType="submit" style={{width:800}}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

}