/*var turntable_lottery = require('../utils/turntable_lottery/turntable_lottery.js');*/
var util = require('../utils/util.js');
Page({
  data: {
    isLike: true,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    selectSpec:{colorIndex:0,size:"S"}
    /*countDown:""*/
    /*lotteryParams:  turntable_lottery.lotteryParams*/
  },
  /*startGame: turntable_lottery.startGame,*/
  onLoad: function(options) {
      /*turntable_lottery.init.call(this);*/ //抽奖初始化

      var self = this;
      // Do some initialize when page load.
      wx.request({
          url: 'http://127.0.0.1:9973/appservice/json/product.json',
          method: 'GET',
          data: options,
          success: function(res) {
              self.setData(res.data);
          }
      })

      /*let product = JSON.parse(wx.getStorageSync('__product'));

      self.setData(product);
      util.Countdown(product.endTime,function (time) {
          console.log(time);
          self.setData({
              countDown:time
          })
      }); */

  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    /*wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });*/
    wx.showModal({
        title:"提示",
        content:"优惠券已复制到您的手机中，请打开手机淘宝APP完成优惠购买",
        showCancel:false,
        confirmColor:"#f44336",
        success: function(res) {
            if (res.confirm) {
                console.log('用户点击确定')
            }
        }
    });
  },
    //选择颜色
    selectColor: function (e) {
      var spec = {colorIndex:e.target.dataset.index,size:this.data.selectSpec.size};
      this.setData({selectSpec:spec});
   },
    //选择尺寸
    selectSize: function (e) {
        var spec = {colorIndex:this.data.selectSpec.colorIndex,size:e.target.dataset.size};
        this.setData({selectSpec:spec});
    },
});
