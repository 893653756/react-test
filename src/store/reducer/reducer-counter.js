import * as actionTypes from "../action-types";
/**
 * 加一
 */
export default function(state = {number: 1}, action) {
    switch(action.type) {
        case actionTypes.INCREMENT:
            return { number: state.number + action.payload };
        default:
            return state;
    }
}