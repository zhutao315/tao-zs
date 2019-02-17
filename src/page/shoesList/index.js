var util = require('../utils/util.js');
import regroup from './regroup';

let table = require('../../../DB/table');
let selectedType = {sex:0, type:'ban'};
let shoesTable;

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
        dImage: {class:'', src:''},
        swipers:[],
        shop: null,
        shoesList: null,
        selectedTypeList: null,
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
    selectType: function (e) {
        let position = e.target.dataset.type;   
        if(position === '0') {
            selectedType.sex = 0;
        }
        if(position === '1') {
            selectedType.sex = 1;
        }
        if(position === 'bas') {
            selectedType.type = position;
        }
        if(position === 'ban') {
            selectedType.type = position;
        }
        this.setData(regroup(shoesTable, null, selectedType));
    },
    viewImage(e) {
        let src = e.target.dataset.src; 
        if(src) {
            wx.showToast({
                title: '加载中',
                icon: 'loading'
               });
            this.setData({
                dImage:{src:src.split('!')[0]}
            });
        }
    },
    imageLoaded() {
        wx.hideToast();
        this.setData({
            "dImage.class":'d-image'
        });
    },
    hideModal(e) {
        let src = e.target.dataset.src;
        if(!src){
            this.setData({
                dImage:{class:'', src:''}
            });
        }
    },
    onLoad: function(options) {
        let app=getApp();
    
        let shop = app.globalData.shop

        shoesTable = table[shop.id];

        let shoesObject = regroup(shoesTable,shop.id);

        this.setData({
            shop: shop,
            swipers:[shoesObject.shoesList[0],shoesObject.shoesList[1],shoesObject.shoesList[2]],
            shoesList: shoesObject.shoesList,
            selectedTypeList: shoesObject.selectedTypeList
        });
    },
    copyTBL:function(e){
        var self=this;
        wx.setClipboardData({
        data: self.data.shop.address,
        success: function(res) {
            wx.showToast({
                title: '复制成功',
                icon: 'succes',
                duration: 1000,
                mask:true
            })
        }
      });
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
//滚动到底部触发事件
    onReachBottom: function(){      //searchScrollLower
        return;
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
    },
    gotoLottery: function(event) {
        // 清队上次通信数据
        wx.clearStorageSync("_product");
        let product = util.getProductByID(this.data.quicks,event.currentTarget.dataset.id);
        wx.setStorageSync('__product', JSON.stringify(product));

        wx.navigateTo({
            url: '/page/turntable/turntable'
        })
    }
});
