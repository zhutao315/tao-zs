function calculateDates(startTime,endTime) {
    if(endTime < startTime) return "活动结束";
    return  (endTime - startTime)/(3600000*24)+1;
};
function regroup(data) {
    let Rdata = {
        "swipers": [{
            "image": "/image/jd1.jpg",
            "id":333
        }, {
            "image": "/image/jd2.jpg",
            "id":334
        }, {
            "image": "/image/jd3.jpg",
            "id":335
        }
        ],
        "live": [
            {
                "image": "/image/live1.jpg",
                "id":333,
                "name":"LANCOME兰蔻小黑瓶精华肌底液",
                "price":500,
                "PurchasedNum":1000,
                "endTime":"10天14:34:20",
                "coupon":100
            },
            {
                "image": "/image/live1.jpg",
                "id":333,
                "name":"LANCOME兰蔻小黑瓶精华肌底液",
                "price":500,
                "PurchasedNum":1000,
                "endTime":"10天14:34:20",
                "coupon":100
            },
            {
                "image": "/image/live1.jpg",
                "id":333,
                "name":"LANCOME兰蔻小黑瓶精华肌底液",
                "price":500,
                "PurchasedNum":1000,
                "endTime":"10天14:34:20",
                "coupon":100
            },
            {
                "image": "/image/live1.jpg",
                "id":333,
                "name":"LANCOME兰蔻小黑瓶精华肌底液",
                "price":500,
                "PurchasedNum":1000,
                "endTime":"10天14:34:20",
                "coupon":100
            }
        ]
    };
    Rdata.live = data.list.map(function (value,key) {
        let dates = calculateDates(new Date().getTime(),value.couponEndTime);
        let couponEndTime  = new Date(value.couponEndTime);
        let endDate = couponEndTime.getDate()+"/"+(couponEndTime.getMonth()+1)+"/"+couponEndTime.getFullYear();
        return {
            "image": value.picUrl,  //图片缩略图
            "id":value.id,
            "name":value.title,  //商品名称
            "price":value.price,      //原价,
            "PurchasedNum":value.volume,
            "endTime":"限"+dates+"天，"+endDate+"截止", //活动限定时间,
            "coupon":value.quan
        };
    });

    return Rdata;
}

module.exports = regroup;
