/**
 * 首页性能监控
 */

export default function (callback) {
    let cycleTime = 500; // 轮询时间 (毫秒)
    let timer;
    let performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
    let perfCheck = function () {
        if (performance && performance.timing && performance.timing.loadEventEnd) {
            let perfData = getPerData(performance.timing);
            callback && callback(perfData);
        } else {
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                perfCheck();
            }, cycleTime)
        }
    }
    perfCheck();
}

const getPerData = function (timing) {
    // 可以将时间为 0 的过滤掉
// todo
    let perfData = {
        /**
         * 网络连接
         */
        // 上一个页面
        pervPage: timing.fetchStart - timing.navigationStart,
        // 页面重定向
        redirect: timing.redirectEnd - timing.redirectStart,
        // dns查询时间
        dns: timing.domainLookupEnd- timing.domainLookupStart,
        // TCP 建立连接时间
        connect: timing.connectEnd - timing.connectStart,
        // 网络总耗时
        network: timing.connectEnd - timing.navigationStart,

        /**
         * 网络接收
         */
        // 前端从发送请求到接收到第一个字节时间
        send: timing.responseStart - timing.requestStart,
        // 接收响应时间
        receive: timing.responseEnd - timing.responseStart,
        // 请求页面总时间
        request: timing.responseEnd - timing.requestStart,

        /**
         * 前端渲染
         */
        // dom解析时间
        dom: timing.domComplete - timing.domLoading,
        // onload 回调执行时间
        loadEvent: timing.loadEventEnd - timing.loadEventStart,

        // 白屏时间

        // 前端总时间
        frontend: timing.loadEventEnd - timing.domLoading,

        /**
         * 关键点
         */
        // 页面完全加载总时间
        load: timing.loadEventEnd - timing.navigationStart,
        // domready时间
        domready: timing.domContentLoadedEventStart - timing.navigationStart,
        // dom可操作时间
        interactive: timing.domInteractive - timing.navigationStart,
        // 首字节时间
        ttfb: timing.requestStart - timing.navigationStart
    }
    return perfData;
}