import { createStore, applyMiddleware } from "../redux";
import reducer from "./reducer";

// 中间件
let chunk = ({ dispatch, getState }) => next => action => {
    console.log(1)
    if (typeof action == "function") {
        action(dispatch, getState);
    } else {
        next(action);
    }
    console.log(2)
};

let promise = ({dispatch, getState}) => next => action => {
    if (action.then && typeof action.then == "function") {
        action.then(dispatch);
    } else if (action.payload && action.payload.then && typeof action.payload.then == "function") {
        action.payload.then((payload) => {
            return dispatch({...action, payload});
        }, (payload) => {
            return dispatch({...action, payload});
        })
    } else {
        next(action);
    }
}


let store = createStore(reducer, {}, applyMiddleware(promise, chunk));
window.store = store;
export default store;
