/**
 * 负责管理所有的任务, 根据系统负荷调度任务, 所有的复杂计算操作, 都应该作为任务调度执行
 * 可以根据当前的CPU使用率和下一帧的时间，来调度执行任务。
 */
import { TaskPool } from "./task_pool";
/**
 * n毫秒以上的任务会打印出来
 */
const logTimeOut = 4;

/**
 * 离渲染开始n毫秒以上的任务会延迟到下一帧执行
 */
const frameTimeOut = 4;

/**
 * 渲染频率
 */
const frameInterval = 16;

/**
 * 任务池
 */
const taskPool = new TaskPool();

export const setTask = function (func, args, type) {
    if (func) {
        taskPool.push(func, args, type);
        if (taskPool.size() == 1) {
            requestAnimationFrame(exec)
        }
    }
}

/**
 * 获取任务池里的数量
 */
export const getSize = function () {
    return taskPool.size();
}

/**
 * 任务调度
 */
const exec = function () {
    let start = Date.now();
    let end = start;
    while ((start + frameInterval - frameTimeOut) > end) {
        let task = taskPool.pop();
        if (task) {
            end = callTime(task.func, task.args, "task", end);
        } else {
            break;
        }
    }
    // 如果还有任务， 则放到下一帧执行
    if (taskPool.size()) {
        requestAnimationFrame(exec)
    }
}

/**
 * 函数调用计时
 */
const callTime = function (func, args, name, start) {
    try {
        call(func, args);
    } catch (error) {
        throw Error(e);
    }
    let end = Date.now();
    if (end - start > logTimeOut) {
        console.warn(`${func}-${name} >> ${logTimeOut}`)
    }
    return end;
}

/**
 * 方法调用
 */
function call(func, args) {
    if (Array.isArray(args)) {
        switch (args.length) {
            case 0:
                return func();
            case 1:
                return func(args[0]);
            case 2:
                return func(args[0], args[1]);
            case 3:
                return func(args[0], args[1], args[2]);
            case 4:
                return func(args[0], args[1], args[2], args[3]);
            case 5:
                return func(args[0], args[1], args[2], args[3], args[4]);
            case 6:
                return func(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
                return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            case 8:
                return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            default:
                func.apply(undefined, args);
        }
    } else {
        return func(args);
    }
}