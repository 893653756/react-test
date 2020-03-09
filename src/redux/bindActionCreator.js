export default function(actions, dispatch) {
    let newAction = {};
    Object.keys(actions).forEach(key => {
        newAction[key] = function() {
            dispatch(actions[key].apply(null))
        }
    });
    return newAction;
}
