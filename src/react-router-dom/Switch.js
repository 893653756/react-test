import React, { Component } from 'react'
import { pathToRegexp } from "path-to-regexp";
import { Consumer } from './context';

export default class Switch extends Component {
    render() {
        return (
            <Consumer>
                {state => {
                    let pathname = state.location.pathname;
                    let children = this.props.children;
                    for (let child of children) {
                        let path = child.props.path || "";
                        let reg = pathToRegexp(path, [], { end:false })
                        // 匹配
                        if (reg.test(pathname)) {
                            return child;
                        }
                    }
                    return null;
                }}
            </Consumer>
        )
    }
}
