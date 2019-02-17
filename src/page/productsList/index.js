var util = require('../utils/util.js');
var regroup = require('regroup.js');
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeVertical: function (e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onShareAppMessage:function(){
    return {
      title:'测试转发',
      path:'/page/home/index'
    };
  },
      searchPageNum: 1,   // 设置加载的第几次，默认是第一次
      callbackcount: 15,      //返回数据的个数
      searchLoading: false, //"上拉加载"的变量，默认false，隐藏
      searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏
},

  onLoad: function(options) {
      this.setData({
          searchPageNum: 1,   //第一次加载，设置1
          searchSongList:[],  //放置返回数据的数组,设为空
          isFromSearch: true,  //第一次加载，设置true
          searchLoading: true,  //把"上拉加载"的变量设为true，显示
          searchLoadingComplete:false, //把“没有数据”设为false，隐藏
          options:options
      });
      this.getLiveList();
    },
  getLiveList:function () {
        let that = this.data;
        let searchKeyword = that.searchKeyword,//输入框字符串作为参数
            searchPageNum = that.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.callbackcount; //返回数据的个数

        let self = this;
        // Do some initialize when page load.
        wx.request({
            url: getApp().globalData.host+'/json/productList.json',
            //url:"http://tqh.free.ngrok.cc/v1/open/items/"+that.options.productType+"?pageSize=10",
            method: 'GET',
            data: {pageNum:that.searchPageNum},
            success: function(res) {
                //res.data = regroup(res.data.data);

                if(that.live&&that.live.length != 0){
                    if(res.data.live.length&&res.data.live.length != 0){
                        self.setData({live:that.live.concat(res.data.live)},function () {
                            self.data.live.forEach(function (value,key) {
                                util.CircleCanvas(value.id+"1",value.id+"2");
                            });
                        });
                        that.searchLoading = true;//把"上拉加载"的变量设为false，显示
                    }else{
                        that.searchLoading = true;
                        that.searchLoadingComplete = false;
                    }
                }else{
                    //第一次加载数据情况
                    if(res.data.live.length&&res.data.live.length != 0){
                        console.log("res.data:::::::::::",res.data);
                        self.setData(res.data,function () {
                            self.data.live.forEach(function (value,key) {
                                util.CircleCanvas(value.id+"1",value.id+"2");
                            });
                        });
                        that.searchLoading = true;//把"上拉加载"的变量设为false，显示
                    }else{
                        //没有数据了，把“没有数据”显示，把“上拉加载”隐藏
                        self.setData({
                            searchLoadingComplete: true, //把“没有数据”设为true，显示
                            searchLoading: false  //把"上拉加载"的变量设为false，隐藏
                        });
                    }
                }
            }
        })
    },
  //滚动到底部触发事件
  onReachBottom: function(){      //searchScrollLower
        let that = this;
        if(that.data.searchLoading && !that.data.searchLoadingComplete){
            that.setData({
                searchPageNum: that.data.searchPageNum+1,  //每次触发上拉事件，把searchPageNum+1
                isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false
            });
            that.getLiveList();
        }
    },



  // 跳到商品详情
  toGoods:function (event) {
      wx.navigateTo({
          url: '/page/goods/index?product='+event.currentTarget.dataset.id
      })
  },
  toGoodsSearch:function (event) {
      wx.navigateTo({
          url: '/page/goodsSearch/goodsSearch'
      })
  }
});
