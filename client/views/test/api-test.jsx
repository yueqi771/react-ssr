import React from 'react';
import axios from 'axios';

/* eslint-disable */
export default class TestApi extends React.Component {

    getTopics() {
        alert(1)
        axios.get('/api/topics').then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    login() {
        axios.post('/api/user/login', {
            accessToken: 'ef35af2e-95b4-4062-badc-419d3b7471c4'
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    markAll() {
        axios.post('/api/message/mark_all?needAccessToken=true', {
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
          <div>
            <button onClick={this.getTopics}>topics</button>
            <button onClick={this.login}>login</button>
            <button onClick={this.markAll}>markAll</button>
          </div>
        )
    }
}
/* eslint-enable */
