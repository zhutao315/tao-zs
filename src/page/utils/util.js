/* eslint-disable */
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function getProductByID(list,id) {
    let item = null;
    list.forEach(function (value,key) {
        if(value.id == id){
            item = value;
        }
    })
    return item;
}

function Countdown(endTime,callback) {
    // 倒计时
    var _ordertimer = null;

    function leftTimer(endTime) {
        var leftTime = endTime - new Date().getTime(); //计算剩余的毫秒数
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0)
            callback&&callback(days + "天" + hours + "小时" + minutes + "分" + seconds + "秒");
        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            window.clearInterval(_ordertimer);
            _ordertimer = null;
            callback&&callback("优惠券活动时间到期");
        }
    }
    function checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    var date1=new Date().getTime();
    if(endTime<date1) callback&&callback("优惠券活动时间到期");//设置的时间小于现在时间退出
    leftTimer(endTime);
    _ordertimer = setInterval(function(){leftTimer(endTime)}, 1000);

}

function CircleCanvas(id1,id2,ratio){
    var ctx = wx.createCanvasContext(id2);

    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext(id1);
    cxt_arc.setLineWidth(4);
    cxt_arc.setStrokeStyle('rgba(204, 21, 21, 0.12)');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(30, 30, 24, Math.PI/4+Math.PI/2, Math.PI/4, false);
    cxt_arc.stroke();
    cxt_arc.draw();

    function drawArc(s, e,c) {
        var x = 30, y = 30, radius = 24;
        ctx.setLineWidth(4);
        ctx.setStrokeStyle(c);
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(x, y, radius, s, e, false);
        ctx.stroke();
        ctx.draw();
    }
    drawArc(Math.PI/4+Math.PI/2, Math.PI/4+Math.PI/2+Math.PI/2,'#d81e06');
}

// utils/util.js
/**
* 将距离格式化
* <1000m时 取整,没有小数点
* >1000m时 单位取km,一位小数点 
*/
function formatDistance(num) {
    　if (num < 1000) {
    　　return num.toFixed(0) + 'm';
    　} else if (num > 1000) {
    　　return (num / 1000).toFixed(1) + 'km';
    　}
    }

function getUrlParams(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}    

const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber1).join('/') + ' ' + [hour, minute, second].map(formatNumber1).join(':')
}

const formatNumber1 = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function weekDay() {
  var weekDay;
  var week = new Date().getDay()
  console.log(week)
  switch (week) {
    case 0: 
      weekDay = '星期日'
      break;
    case 1:
      weekDay = '星期一'
      break;
    case 2:
      weekDay = '星期二'
      break;
    case 3:
      weekDay = '星期三'
      break;
    case 4:
      weekDay = '星期四'
      break;
    case 5:
      weekDay = '星期五'
      break;
    case 6:
      weekDay = '星期六'
      break;
  }
  return weekDay;
}



export default  {
    formatTime: formatTime,
    getProductByID:getProductByID,
    Countdown:Countdown,
    CircleCanvas:CircleCanvas,
    formatDistance: formatDistance,
    getUrlParams: getUrlParams,
formatTime1,
  weekDay
};
