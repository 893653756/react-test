/**
 * 捕获错误
 */

// 解析报错信息
const formatError = function (errorObj) {
    let col = errorObj.column || errorObj.columnNumber;
    let row = errorObj.line || errorObj.lineNumber;
    let message = errorObj.message;
    let name = errorObj.name;
    let { stack } = errorObj;
    if (stack) {
        let matchUrl = stack.match(/https?:\/\/[^\n]+/);
        let urlFirstStack = matchUrl ? matchUrl[0] : '';
        let regUrlCheck = /https?:\/\/((\S)*\.js)/;
        let resourceUrl = '';
        if (regUrlCheck.test(urlFirstStack)) {
            resourceUrl = urlFirstStack.match(regUrlCheck)[0];
        }
        let stackCol = null;
        let stackRow = null;
        let posStack = urlFirstStack.match(/:(\d+):(\d+)/);
        if (posStack && posStack.length >= 3) {
            [, stackCol, stackRow] = posStack
        }
        return {
            content: stack,
            col: Number(col || stackCol),
            row: Number(row || stackRow),
            message, name, resourceUrl
        }
    }
    return { row, col, message, name }
}

export default function (calback) {
    let _onerror = window.onerror;
    window.onerror = (...arg) => {
        let [errorMessage, scriptURI, lineNumber, columnNumber, errorObj] = arg;
        let errorInfo = formatError(errorObj);
        errorInfo.type = "onerror";
        calback && calback(errorInfo);
        _onerror && _onerror.apply(window, arg);
    }
};