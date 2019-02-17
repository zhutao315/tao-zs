Object.prototype.setData = function(option){
    for(let key in option){
        this[key] = option[key];
    }
};
function scroll_pagination(page,url) {
    
    function init() {
        page.setData({
            searchPageNum: 1,   // 设置加载的第几次，默认是第一次
            callbackcount: 15,      //返回数据的个数
            searchLoading: false, //"上拉加载"的变量，默认false，隐藏
            searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        });
        let pageLoad = page.load;
        page.load = function () {
            pageLoad&&pageLoad.call(this);
            this.setData({
                searchPageNum: 1,   //第一次加载，设置1
                searchSongList:[],  //放置返回数据的数组,设为空
                isFromSearch: true,  //第一次加载，设置true
                searchLoading: true,  //把"上拉加载"的变量设为true，显示
                searchLoadingComplete:false //把“没有数据”设为false，隐藏
            });
            this.getList();
        };
        page.getList = requestFactory();
        page.onReachBottom = function(){      //searchScrollLower
            let that = this;
            if(that.data.searchLoading && !that.data.searchLoadingComplete){
                that.setData({
                    searchPageNum: that.data.searchPageNum+1,  //每次触发上拉事件，把searchPageNum+1
                    isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false
                });
                that.getList();
            }
        };
        return page;
    }
    function requestFactory() {
        return function () {
            let that = page.data;
            let searchKeyword = that.searchKeyword,//输入框字符串作为参数
                searchPageNum = that.searchPageNum,//把第几次加载次数作为参数
                callbackcount =that.callbackcount; //返回数据的个数

            let self = page;
            // Do some initialize when page load.
            wx.request({
                url: url,
                method: 'GET',
                data: {pageNumber:that.searchPageNum},
                success: function(res) {
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
        }
    }

    return init();
}
module.exports = scroll_pagination;
