import { observable, action, extendObservable } from 'mobx';
// computed, toJs
import { topicSchema } from '../util/variable-define'
import { get } from '../util/http'

// 定义数据的默认值
const createTopic = (topic) => {
    return Object.assign({}, topicSchema, topic)
}

class Topic {
    constructor(data) {
        // 把对象添加到mobx上去, 附加到this 上面， 必须把所有属性一次性附加上去
        extendObservable(this, data);
    }

    @observable syncing = false;
}

class TopicStore {
    @observable topics
    @observable syncing

    constructor({ syncing, topic } = { syncing: false, topic: [] }) {
        this.syncing = syncing;
        this.topics = topic.map(item => new Topic(createTopic(item)))
    }

    addTopic(topic) {
        this.topics.push(new Topic(createTopic(topic)))
    }

    // 获取topic数据
    @action fetchTopics() {
        return new Promise((resolve, reject) => {
            this.syncing = true;
            get('/topics', {
                mdrender: false,
            }).then((resp) => {
                if (resp.success) {
                    resp.data.forEach((item) => {
                        this.addTopic(item)
                    })
                    resolve()
                } else {
                    reject()
                }
                this.syncing = false;
            }).catch((err) => {
                console.log(err)
                this.syncing = false;
            })
        })
    }

    toJson() {
        return {
            syncing: this.syncing,
            topics: this.topics,
        }
    }
}

export default TopicStore
