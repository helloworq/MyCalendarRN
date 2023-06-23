const showToast = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
};

const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
        'All Your Base Are Belong To Us',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    );
};

const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
        'A wild toast appeared!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
    );
};

//  获取指定指定时区时间（北京时区为8，纽约时区为-5。东时区为正数，西市区为负数）
function getTimeByZone(timezone = 8, date) {
    // 本地时间距离（GMT时间）毫秒数
    let nowDate = !date ? new Date().getTime() : new Date(date).getTime()
    // 本地时间和格林威治时间差，单位分钟
    let offset_GMT = new Date().getTimezoneOffset()
    //  反推到格林尼治时间
    let GMT = nowDate + offset_GMT * 60 * 1000
    //  获取指定时区时间
    let targetDate = new Date(GMT + timezone * 60 * 60 * 1000)
    return targetDate
}