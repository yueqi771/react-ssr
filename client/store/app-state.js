import { observable, computed, action } from 'mobx'

export default class AppState {
    constructor({ count, name } = { count: 0, name: 'yueqi' }) {
        this.count = count
        this.name = name
    }
    @observable count
    @observable name

    @computed get msg() {
        return `${this.name}今年 ${this.count} 岁了`;
    }

    @action.bound
    add() {
        this.count += 1;
    }
    @action changeName(name) {
        this.name = name
    }
    toJson() {
        return {
            count: this.count,
            name: this.name,
        }
    }
}
