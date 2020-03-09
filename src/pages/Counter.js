import React, { Component } from 'react'
import { connect } from '../react-redux'
import action from "../store/action/action-counter"
class Counter extends Component {
    error = () => {
        let f;
        f()
    }
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.error}>报错</button>
                <button onClick={() => this.props.increment(1)}>+</button>
                <button onClick={() => this.props.thunkIncrement(2)}>thunkIncrement+</button>
                <button onClick={() => this.props.promiseIncrement(3)}>promiseIncrement+</button>
                <button onClick={() => this.props.payloadIncrement(3)}>payloadIncrement+</button>  
            </div>
        )
    }
}

export default connect(
    state => state.reducerCounter,
    action
)(Counter);
