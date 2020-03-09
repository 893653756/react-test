import * as actionType from '../action-types';
export default {
    increment(value = 1) {
        return { type: actionType.INCREMENT, payload: value }
    },
    // 过一秒加一
    thunkIncrement(value = 1) {
        return function (dispatch, getState) {
            console.log(3)
            setTimeout(function () {
                console.log(4)
                dispatch({ type: actionType.INCREMENT, payload: value });
            }, 1000);
        }
    },
    promiseIncrement(value = 1) {
        return new Promise((resolve) => {
            console.log("promiseIncrement");
            setTimeout(() => {
                resolve({ type: actionType.INCREMENT, payload: value })
            }, 1500)
        })
    },
    payloadIncrement() {
        return {
            type: actionType.INCREMENT,
            payload: new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > .5) {
                        resolve(30);
                    } else {
                        reject(-30);
                    }
                },1000);
            })
        }
    }
} 