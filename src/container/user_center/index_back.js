import React from 'react';
import { Link } from 'react-router-dom'
import {
    Tabs,
    Row,
    Card,
    Col,
    Upload,
    Modal,
	Icon,
	Button,
	Menu,
	Form,
	Input,
} from 'antd';
import Header from "../../component/head";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


export default class UserCenter extends React.Component {
    constructor() {
        super();
	};
	

    render() {

        const { usercollection, usercomments } = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey}
                    extra={<a target="_blank"
                        href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何的新闻，快去收藏一些新闻吧!';

        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                    extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论!';
		
        return (
            <div>
				<Header />
				<div className="content-align">		
					
                <Row>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div class="clearfix">
                                    {/* <Upload {...props}>
                                        <Icon type="plus" />
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload> */}
                                    <Modal visible={this.state.previewVisible}
                                        footer={null}
                                        onCancel={this.handleCancel}>
                                        <img alt="预览" src={this.state.previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
					</Row>
					</div>
            </div>
        );
    };
}
