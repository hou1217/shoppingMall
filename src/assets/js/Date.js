// 对剩余的时间进行判断处理
export function dealTime(time){
  let timeStamp = ~~(new Date()/1000);//当前时间戳（秒）
  let restSeconds =  time - timeStamp;//剩余多少秒
  let result = '';
  if(restSeconds < 0){
    restSeconds = 0;
  }
  let hourTime = restSeconds/3600;
  let dayTime = 0;
  if(hourTime > 24){
    dayTime = parseInt(hourTime / 24);
    hourTime = parseInt(hourTime % 24);
  }

  result=   dayTime + "天"+hourTime + "小时"

  
  return  result;
}
export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
export function relativeTime(str){
 var now = new Date().getTime(),
 oldTime = str,
 difference = now - oldTime,
 result='',
 minute = 1000 * 60,
 hour = minute * 60,
 day = hour * 24,
 halfamonth = day * 15,
 month = day * 30,
 year = month * 12,

 _year = parseInt(difference/year),
 _month = parseInt(difference/month),
 _week = parseInt(difference/(7*day)),
 _day = parseInt(difference/day),
 _hour = parseInt(difference/hour),
 _min = parseInt(difference/minute);
 if(_year>=1) {result=   _year + "年前"}
 else if(_month>=1) {result=  _month + "月前"}
 else if(_week>=1) {result=  _week + "周前"}
 else if(_day>=1) {result=  _day +"天前"}
 else if(_hour>=1) {result=  _hour +"小时前"}
 else if(_min>=1) {result=  _min +"分钟前"}
 else result="刚刚";
 return result;
}
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}
