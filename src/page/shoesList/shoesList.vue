<template>
<div class="page">
    <div class="page__hd">
        <div class="weui-cell">
                <div class="weui-cell__bd" style="font-size:12px;">
                    <div>{{shop.address}}</div>
                    <div>{{shop.phone}}</div>
                </div>
                <div class="weui-cell__ft">
                    <div id="copy_btn" class="copy-address-btn">复制地址</div>
                </div>
        </div>
    </div>

    <div class="page__bd">
        
    
        <div class="weui-flex zs-type-select" style="margin-bottom:3px;">
            <div class="weui-flex__item"><div :class="'placeholder ' + selectedTypeList[0]" data-type="0" @click="selectType('0')">男</div></div>
            <div class="weui-flex__item"><div :class="'placeholder ' + selectedTypeList[1]" data-type="1" @click="selectType('1')">女</div></div>
            <div class="weui-flex__item"><div :class="'placeholder ' + selectedTypeList.bas" data-type="bas" @click="selectType('bas')">篮球鞋</div></div>
            <div class="weui-flex__item"><div :class="'placeholder ' + selectedTypeList.ban" data-type="ban" @click="selectType('ban')">休闲鞋</div></div>
        </div>

        <div class="weui-grids" style="padding-bottom:20px;" @click="viewImage">
            <div v-for="(item,index) in shoesList" :key="index">
                <div  class="weui-grid flex-center" hover-class="weui-grid_active">
                    <img class="weui-grid__icon" :data-src="item"  :src="item"  />
                </div>
            </div>
        </div>

        <div :class="'details-image ' + dImage.class" @click="hideModal($event)">
            <img mode="widthFix" :src="dImage.src" @click="imageLoaded" />
        </div>


    </div>
</div>
</template>

<script>
    import Clipboard from 'clipboard';
    import util from '../utils/util.js';
    import regroup from './regroup';
    import table from '../../DB/table';

    let selectedType = {sex:0, type:'ban'};
    let shoesTable;

export default {
    data()  {
        return {
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
        changeIndicatorDots: function () {
            this.setData({
                indicatorDots: !this.data.indicatorDots
            })
        },
        changeVertical: function () {
            this.setData({
                vertical: !this.data.vertical
            })
        },
        changeAutoplay: function () {
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
        }
    },
    methods: {
        setData(obj) {
            Object.assign(this, obj);
        },
        selectType: function (e) {
            let position = e;//e.target.dataset.type;   
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
            let newData = regroup(shoesTable, null, selectedType);
            this.setData(newData);
        },
        viewImage(e) {
            let src = e.target.dataset.src; 
            if(src) {
                this.showToast({
                    title: '加载中',
                    icon: 'loading'
                });
                this.setData({
                    dImage:{src:src.split('!')[0]}
                });
            }
        },
        imageLoaded() {
            this.hideToast();
            this.setData({
                "dImage.class":'d-image'
            });
        },
        hideModal(event) {
            let src = event.target.dataset.src;
            if(!src){
                this.setData({
                    dImage:{class:'', src:''}
                });
            }
        },
        showToast() {} ,
    copyTBL:function(){
        let btn = document.querySelector('#copy_btn');
        let that = this;
        var clipboard3 = new Clipboard(btn, {
            text: function() {
                return that.shop.address;
            }
        });
        clipboard3.on('success', function() {
            alert('复制成功');
        });
    }
    },
    computed: {
        
    },
    
    created() {
        let shop = {
            address: '浙江省杭州市西湖区',
            phone: '13691616854',
            id: util.getUrlParams('id')   
            }

            shoesTable = table[shop.id];

            let shoesObject = regroup(shoesTable,shop.id);

            Object.assign(this, {
                shop: shop,
                swipers:[shoesObject.shoesList[0],shoesObject.shoesList[1],shoesObject.shoesList[2]],
                shoesList: shoesObject.shoesList,
                selectedTypeList: shoesObject.selectedTypeList
            });
    },
    mounted() {
        this.copyTBL();
    }
};

</script>

<style>
.page .weui-flex .placeholder {
    padding: 0 10px;
    background-color: #ebebeb;
    height: 2.3em;
    line-height: 2.3em;
    text-align: center;
    color: #cfcfcf;
}

.zs-type-select .weui-flex__item{
    margin: 5px;
}    

.page .weui-flex .btn-primary {
  background-color: #1AAD19;
}

.copy-address-btn {
  background-color: red;
  color:#fff;
  font-size:12px;
  padding:5px 8px;
  margin-left:10px;
}

swiper {
  width: 750rpx;
  height: 330rpx;
}

.swiper-item {
  display: block;
  width: 750rpx;
  height: 322rpx;
}

.weui-grid__icon {
width:90px;
height:90px;
margin:0 auto;
}

.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}

.details-image {
  position: fixed;
  top:0;
  height: 100%;
  width: 100%;
  background-color: #d9d9d9;
  padding: 0 15px;

  
  background: #999c;

  display:none;
}

.d-image {
  display: flex;
  align-items: center;
}

.details-image > image {
  width: 100%;
  height: auto;
}


</style>