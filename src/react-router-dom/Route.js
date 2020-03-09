import React, { Component } from 'react';
import { Consumer } from "./context";
import { pathToRegexp } from "path-to-regexp";
export default class Route extends Component {
	render() {
		return (
			<Consumer>
				{state => {
					// 比较路径是否匹配
					let { path, component: Comp, exact = false } = this.props;
					let pathname = state.location.pathname;
					// 通过正则匹配
					let keys = []; // 路径参数
					let reg = pathToRegexp(path, keys, { end: exact })
					let result = pathname.match(reg);
					if (result) {
						keys = keys.map(k => k.name);
						let [url, ...value] = result;
						let prop = {
							location: state.location,
							history: state.history,
							match: {
								params: keys.reduce((obj, k, index) => {
									obj[k] = value[index];
									return obj;
								}, {})
							}
						}
						// console.log(prop);
						return <Comp {...prop}></Comp>
					}
					return null;
				}}
			</Consumer>
		)
	}
}
