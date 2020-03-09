/**
 * 合并单独功能的 reducer
 */
export default function combineReducers(reducers) {
    // 返回合并活动reducer, 这个函数将被传入createStore
    return function (state = {}, action) {
        let newState = {};
        Object.keys(reducers).forEach((key) => {
            newState[key] = reducers[key](state[key], action);
        });
        return newState
    }
}