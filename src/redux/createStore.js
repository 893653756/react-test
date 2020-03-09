export default function createStore(reducer, preloadState, enhancer) {
    if (enhancer && typeof enhancer == "function") {
        return enhancer(createStore)(reducer, preloadState);
    }
    let state = preloadState || {};
    let listeners = [];
    function getState() {
        return state;
    }
    // 派发动作
    // action 动作 描述一下你想干什么, 动作是一个普通的js对象, 只有一个属性(type)是必须的, 其它属性随意
    function dispatch(action) {
        state = reducer(state, action);
        // 通知所有订阅者
        listeners.forEach(listener => listener());
    };
    // 派发一个动作获取初始值, 其实redux内部是派发一个INIT: "@@redux/INIT" 动作
    dispatch({ type: '@@redux/INIT' });
    // 供外界订阅本仓库状态的变化, 状态变化则执行订阅逻辑
    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(item => listener != item);
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}