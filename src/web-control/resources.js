/**
 * 页面资源下载监控
 */

// 可以将时间为 0 的过滤掉
// todo

const resolveEntries = function (entries) {
    let arr = [];
    entries.forEach(timing => {
        arr.push({
            initiatorType: timing.initiatorType,
            name: timing.name,
            duration: parseInt(timing.duration),
            redirect: timing.redirectEnd - timing.redirectStart, // 重定向
            dns: timing.domainLookupEnd - timing.domainLookupStart, // DNS解析
            connect: timing.connectEnd - timing.connectStart, // TCP建连
            network: timing.connectEnd - timing.startTime, // 网络总耗时
            send: timing.responseStart - timing.requestStart, // 发送开始到接受第一个返回
            receive: timing.responseEnd - timing.responseStart, // 接收总时间
            request: timing.responseEnd - timing.requestStart, // 总时间
            ttfb: timing.responseStart - timing.requestStart // 首字节时间
        })
    });
}
export default function (callback) {
    let timer;
    let entries;
    let cycleTime = 500;
    let performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
    if (window.PerformanceObserver) {
        let observer = new window.PerformanceObserver((list) => {
            try {
                entries = list.getEntries();
                let data = resolveEntries(entries);
                callback && callback(data);
            } catch (e) {
                console.log(e);
            }
            observer.observe({
                entryTypes: ["resource"]
            })
        })
    } else {
        let perfCheck = function () {
            if (performance && performance.timing && performance.timing.loadEventEnd) {
                entries = performance.getEntriesByType('resource');
                let data = resolveEntries(entries);
                callback && callback(data);
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
};