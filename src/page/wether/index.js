//获取应用实例

var network_util = require('../../utils/network.js');
var util = require('../../utils/util.js');

const app = getApp()
var location;
var isOpenSetting = false;
var longi;
var lat;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl:'../img/wether/logo.png', 
      nickName:'疯狂早茶的主页',
      nickName2:'疯狂早茶的抽屉菜单'},
    mainPageLeft: 0,
    drawerMenuLeft: -200,
    mainPagePosition: 'absolute',
    animationData: {},

    location: '上海市',
    hasRefresh: false,
    nowBackGround: [100, 8],
    nowTemperature: '0 ℃',
    nowWind: '晴/东北风  微风',
    nowAir: '50  优',
    hourlyArr: [],
    dailyForecast: [],
    lifeStyle: [],
    week: '',
    progress_txt: '正在匹配中...',
    count:0, // 设置 计数器 初始为0
    countTimer: null // 设置 定时器 初始为null
  },
  
  gotest: function() {
    wx.navigateTo({
      url: '../scrollView/scrollView',
    })
  },
  //天气接口
  Weather: function(lat, longi) {
    var _this = this;
    //数据集合
    var url = "https://free-api.heweather.com/s6/weather";
    var airUrl = "https://free-api.heweather.com/s6/air/now";
    var data = {
      key: "bff5cc9bcfdf46b0a0e9bf0c260ff14f",
      location: location ? longi + "," + lat : "shanghai",
      lang: "zh",
      unit: "m"
    };
    network_util._get(url, data, function (res) {
      // console.log(res.data.HeWeather6[0])
      var now = res.data.HeWeather6[0].now;
      var hourly = res.data.HeWeather6[0].hourly;
      var daily = res.data.HeWeather6[0].daily_forecast;
      var lift = res.data.HeWeather6[0].lifestyle;
      _this.setData({
        now: now,
        nowBackGround: [now.cond_code, now.tmp],
        nowTemperature: now.tmp + "℃", 
        nowWind: now.cond_txt + "/" + now.wind_dir + "   " + now.wind_sc,
        hourlyArr: hourly,
        dailyForecast: daily,
        lifeStyle: [lift[2], lift[1], lift[6], lift[5]],
      })
    }, function (res) {

    }, function () {
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
      wx.hideLoading()
    });
    //空气质量请求
    network_util._get(airUrl, data, function(res) {
      console.log(res.data)
      var nowAirCity = res.data.HeWeather6[0].air_now_city;
      _this.setData({
        nowAir: nowAirCity.aqi + "  " + nowAirCity.qlty,
      })
    }, function(res) {

    }, function() {

    });
  },
  //地理反编码
  genCodeLocation: function(lat, longi) {
    var _this = this;
    var url = "https://restapi.amap.com/v3/geocode/regeo";
    var data = {
      key: "05e62c98ebc533cb8811ae71ca817033",
      location: longi + "," + lat
    }
    network_util._get(url, data, function (res) {
      // console.log(res.data)
      _this.setData({
        location: res.data.regeocode.addressComponent.district + res.data.regeocode.addressComponent.township
      })
    }, function (res) {

    }, function () {
      location = "youzhi"
      _this.Weather(lat, longi)
    })
  },
  onLoad: function () {
    this.getLocationAction()
    this.setData({
      week: util.weekDay()
    })
  },
  getLocationAction: function() {
    // var location;
    var _this = this;
    wx.getLocation({
      success: function (res) {
        lat = res.latitude
        longi = res.longitude
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        _this.genCodeLocation(lat, longi)
      },
      fail: function () {
        _this.Weather("", "");
      }
    }) 
  },
  onShow : function() {
    // if (isOpenSetting) {
    //   this.getLocationAction()
    // }
  },
  chooseLocation: function() {
      var isopenLoction;
      var _this = this;
      wx.getSetting({
        success: (res) => {
          // console.log(res)
          isopenLoction = res.authSetting["scope.userLocation"]
          // console.log(isopenLoction)
          if (isopenLoction) {
            wx.chooseLocation({
              success: function (res) {
                // console.log(res)
                _this.setData({
                  location: res.address,
                })
                longi=res.longitude
                lat=res.latitude
                location = res.latitude + ":" + res.longitude
                _this.Weather(res.latitude, res.longitude)
              },
            })
          } else {
            wx.showToast({
              title: '检测到您没获得位置权限，请先开启哦',
              icon: "none",
              duration: 3000
            })
            setTimeout(function () {
              //打开设置
              wx.openSetting({
                success: (res) => {
                  // console.log(res)
                  isOpenSetting = res.authSetting["scope.userLocation"]
                  _this.getLocationAction()
                }
              })
            }, 3000)
          }
        }
      })
  },
  onShareAppMessage: function () {
    return {
      title: '即时天气',
      path: '/pages/index/index',
    }
  },
  onPullDownRefresh: function() {
    this.Weather(longi, lat);
  },

  //查看历史上的今天
  lookHistory: function() {
    wx.navigateTo({
      url: '/pages/historytoday/historytoday',
    })
  },

  drawProgressbg: function(){
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    //设置一个原点(110,110)，半径为100的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step){  
    var context = wx.createCanvasContext('canvasProgress');
      // 设置渐变
      var gradient = context.createLinearGradient(200, 100, 100, 200);
      gradient.addColorStop("0", "#2661DD");
      gradient.addColorStop("0.5", "#40ED94");
      gradient.addColorStop("1.0", "#5956CC");
      
      context.setLineWidth(10);
      context.setStrokeStyle(gradient);
      context.setLineCap('round')
      context.beginPath(); 
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke(); 
      context.draw() 
  },
  countInterval: function () {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 60) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
         this.drawCircle(this.data.count / (60/2))
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "匹配成功"
        }); 
        clearInterval(this.countTimer);
      }
    }, 100)
  },
  onReady: function () {
    this.drawProgressbg(); 
    //this.drawCircle(2) 
    this.countInterval();
  },
  
  slideMenu() {
    if (this.data.drawerMenuLeft === 0){
      this.setData({
        drawerMenuLeft:-200,
        mainPageLeft: 0
      });
    }
    else{
      this.setData({
        drawerMenuLeft:0,
        mainPageLeft: 200
      });
    }
    
  }
})
