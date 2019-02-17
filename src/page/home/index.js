var util = require('../utils/util.js');
var regroup = require('regroup.js');
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        searchPageNum: 1,   // 设置加载的第几次，默认是第一次
        callbackcount: 15,     //返回数据的个数
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏
        searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        /*logos: [{
            image: "/image/logo1.png",
            title: "超市",
            "type":1
        }, {
            image: "/image/logo2.png",
            title: "毛巾纺织",
            "type":2
        }, {
            image: "/image/logo3.png",
            title: "服装城",
            "type":3
        }, {
            image: "/image/logo4.png",
            title: "粮油调味",
            "type":8
        }, {
            image: "/image/logo5.png",
            title: "生活用具",
            "type":12
        }, {
            image: "/image/logo6.png",
            title: "办公用品",
            "type":6
        }, {
            image: "/image/logo7.png",
            title: "纸品湿巾",
            "type":7
        }, {
            image: "/image/logo8.png",
            title: "游戏玩具",
            "type":5
        }, {
            image: "/image/logo9.png",
            title: "洗液护理",
            "type":9
        }, {
            image: "/image/logo10.png",
            title: "物流查询",
            "type":10
        }
        ],*/
        logos: [{
            image: "/image/logo1.png",
            title: "男羽绒服",
            "type":1
        }, {
            image: "/image/logo2.png",
            title: "男牛仔裤",
            "type":2
        }, {
            image: "/image/logo3.png",
            title: "上身内搭",
            "type":3
        }, {
            image: "/image/logo4.png",
            title: "外套",
            "type":8
        }, {
            image: "/image/logo5.png",
            title: "休闲裤",
            "type":12
        }, {
            image: "/image/logo6.png",
            title: "毛衣",
            "type":6
        }, {
            image: "/image/logo7.png",
            title: "童装",
            "type":7
        }, {
            image: "/image/logo8.png",
            title: "鞋子",
            "type":5
        }, {
            image: "/image/logo9.png",
            title: "裙装",
            "type":9
        }, {
            image: "/image/logo10.png",
            title: "婚纱礼服",
            "type":18
        }
        ],
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
        }
    },
    onLoad: function(options) {
        this.setData({
            searchPageNum: 1,   //第一次加载，设置1
            searchSongList:[],  //放置返回数据的数组,设为空
            isFromSearch: true,  //第一次加载，设置true
            searchLoading: true,  //把"上拉加载"的变量设为true，显示
            searchLoadingComplete:false //把“没有数据”设为false，隐藏
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
            //url: 'http://127.0.0.1:9973/appservice/json/home.json',
            //url:"http://tqh.free.ngrok.cc/v1/open/items",
            url:getApp().globalData.host+"/json/home.json",
            method: 'GET',
            data: {pageNum:that.searchPageNum,pageSize:15},
            success: function(res) {

                //res.data = regroup(res.data.data);

                if(that.live&&that.live.length != 0){
                    if(res.data.live.length&&res.data.live.length != 0){
                        self.setData({live:that.live.concat(res.data.live)});
                        that.searchLoading = true;//把"上拉加载"的变量设为false，显示
                    }else{
                        that.searchLoading = true;
                        that.searchLoadingComplete = false;
                    }
                }else{
                    //第一次加载数据情况
                    if(res.data.live.length&&res.data.live.length != 0){
                        self.setData(res.data);
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
    // 跳到商品详情
    toGoods:function (event) {
        // 清队上次通信数据
        wx.clearStorageSync("_product");
        let product = util.getProductByID(this.data.live,event.currentTarget.dataset.id);
        wx.setStorageSync('__product', JSON.stringify(product));
        wx.navigateTo({
            url: '/page/goods/index?product='+event.currentTarget.dataset.id
        })
    },
    // 跳到商品列表
    toProductsList:function (event) {
        wx.navigateTo({
            url: '/page/productsList/index?productType='+event.currentTarget.dataset.type
        })
    },
    toGoodsSearch:function (event) {
        wx.navigateTo({
            url: '/page/goodsSearch/goodsSearch'
        })
    }
});
