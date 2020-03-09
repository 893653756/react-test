import React from 'react'
import propTypes from 'prop-types';
import { bindActionCreator } from '../redux';

export default function (mapStateToProps, mapDispatchToProps) {
    // 返回一个高阶组件
    return function (Comp) {
        class ProxyComponent extends React.Component {
            static contextTypes = {
                store: propTypes.object.isRequired
            }
            constructor(props, context) {
                super(props, context);
                this.store = context.store;
                this.state = mapStateToProps(this.store.getState())
            }
            componentWillMount() {
                this.unsubscribe = this.store.subscribe(() => {
                    this.setState(mapStateToProps(this.store.getState()))
                })
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                let action = {};
                if (typeof mapDispatchToProps == 'function') {
                    action = mapDispatchToProps(this.store.dispatch);
                } else if (typeof mapDispatchToProps == 'object') {
                    action = bindActionCreator(mapDispatchToProps, this.store.dispatch)
                }
                return <Comp {...this.state} {...action} />
            }
        }
        return ProxyComponent;
    }
}
