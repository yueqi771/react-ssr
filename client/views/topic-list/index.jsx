import React from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'

import Container from '../layout/container'
// import TopicListItem from './list-item'


@inject((stores) => {
    return {
        appState: stores.appState,
        topicStore: stores.topicStore,
    }
}) @observer
class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        }

        this.changeTab = this.changeTab.bind(this);
        this.listItemClick = this.listItemClick.bind(this)
    }

    componentDidMount() {
        console.log(this.props)

        // 获取数据
        this.props.topicStore.fetchTopics();
    }

    // 列表页切换
    changeTab(e, index) {
        this.setState({
            tabIndex: index,
        })
    }

    /* eslint-disable */
    // 话题点击时间
    listItemClick() {

    }
    /* eslint-enable */

    asyncBootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.props.appState.count = 3;
                resolve(true)
            }, 2000)
        })
    }

    render() {
        const { tabIndex } = this.state;
        const { topicStore } = this.props;
        const topicList = topicStore.topics;
        const syncingTopics = topicStore.syncing;

        return (
            <Container>
                {/* 页面的title和meta */}
                <Helmet>
                    <title>Yueqi</title>
                    <meta name="description" content="昭言在这里" />
                </Helmet>

                {/* tab切换列表 */}
                <Tabs value={tabIndex} onChange={ this.changeTab }>
                    <Tab label="全部" />
                    <Tab label="分享" />
                    <Tab label="工作" />
                    <Tab label="问答" />
                    <Tab label="精品" />
                    <Tab label="测试" />
                </Tabs>

                {/* 话题列表 <TopicListItem onClick={this.listItemClick} topic={topic} /> */}
                <List>
                    {
                        topicList.map(topic => <p topic={topic}>测试遍历的数据topic</p>)
                    }
                </List>

                {
                    syncingTopics ? (
                        <div>
                            <CircularProgress color="primary" size={100} />
                        </div>
                    ) : null
                }


            </Container>
        )
    }
}
export default TopicList;
