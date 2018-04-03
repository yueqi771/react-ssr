import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import TestApi from '../views/test/api-test'

export default Router extends React.Component {
  render() {
    return (
      <Route key="1" path="/" render={() => <Redirect to="/list" />} exact />,
      <Route key="2" path="/list" component={TopicList} exact />,
      <Route key="3" path="/detail" component={TopicDetail} />,
      <Route key="4" path="/test" component={TestApi} />,
    )
  }
  
}
