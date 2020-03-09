import React from 'react';
import { HashRouter as Router, Route, Link, Redirect, Switch } from './react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Profile from './pages/Profile';
import Counter from './pages/Counter';

function App() {
  return (
    <Router>
      <div>
        <Link to="/home"> 首页 </Link>
        <Link to="/profile"> 个人中心 </Link>
        <Link to="/user"> 用户 </Link>
        <Link to="/count"> 计算 </Link>
      </div>
      <div>
        <Switch>
          <Route path="/home/11" component={Home}></Route>
          <Route path="/home" component={Home} exact={true}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/user/:id/:name" component={User}></Route>
          <Route path="/count" component={Counter}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
