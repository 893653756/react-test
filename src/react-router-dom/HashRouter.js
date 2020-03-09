import React, { Component } from 'react';
import { Provider } from "./context";
export default class HashRouter extends Component {
    constructor() {
        super();
        this.state = {
            location: {
                pathname: window.location.hash.slice(1) || "/"
            }
        }
    }
    componentDidMount() {
        window.location.hash = window.location.hash || "/";
        // 监听 hash 变化
        window.addEventListener('hashchange', () => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || "/"
                }
            })
        })
    }
    render() {
        let value = {
            location: this.state.location,
            history: {
                push(to) {
                    window.location.hash = to;
                }
            }
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}
