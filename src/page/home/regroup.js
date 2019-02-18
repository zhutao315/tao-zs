function calculateDates(startTime,endTime) {
    if(endTime < startTime) return "活动结束";
    return  (endTime - startTime)/(3600000*24)+1;
}
function regroup(data) {
    let Rdata = {
        "swipers":[{
            "image": "/image/jd1.jpg",
            "id":333
        }, {
            "image": "/image/jd2.jpg",
            "id":335
        }, {
            "image": "/image/jd3.jpg",
            "id":336
        }
        ],
        "quicks": [{
            "image": "/image/quick1.jpg",
            "price": "123",
            "coupon": "23",
            "PurchasedNum":100,
            "id":343
        }, {
            "image": "/image/quick2.jpg",
            "price": "99",
            "coupon": "23",
            "PurchasedNum":100,
            "id":353
        }, {
            "image": "/image/quick3.jpg",
            "price": "125",
            "coupon": "23",
            "PurchasedNum":100,
            "id":363
        }, {
            "image": "/image/quick4.jpg",
            "price": "156",
            "coupon": "23",
            "PurchasedNum":100,
            "id":373
        }, {
            "image": "/image/quick5.jpg",
            "price": "97",
            "coupon": "23",
            "PurchasedNum":100,
            "id":383
        }, {
            "image": "/image/quick6.jpg",
            "price": "108",
            "coupon": "23",
            "PurchasedNum":100,
            "id":393
        }, {
            "image": "/image/quick7.jpg",
            "price": "88",
            "coupon": "23",
            "PurchasedNum":100,
            "id":433
        }
        ],
        "live": [
            {
                "image": "/image/live1.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":443
            },
            {
                "image": "/image/live2.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":453
            },
            {
                "image": "/image/live3.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":463
            },
            {
                "image": "/image/live4.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":473
            },
            {
                "image": "/image/live1.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":483
            },
            {
                "image": "/image/live2.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":493
            },
            {
                "image": "/image/live3.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":533
            },
            {
                "image": "/image/live4.jpg",
                "title1": "玩3C优惠大甩卖史上最低价格手机",
                "title2": "限10天，12/25截止",
                "title3": "10000",
                "title4":  "500",
                "id":543
            }
        ]
    };
    Rdata.live = data.list.map(function (value,key) {
        let dates = calculateDates(new Date().getTime(),value.couponEndTime);
        let couponEndTime  = new Date(value.couponEndTime);
        let endDate = couponEndTime.getDate()+"/"+(couponEndTime.getMonth()+1)+"/"+couponEndTime.getFullYear();
        return {
            "image": value.picUrl,  //图片缩略图
            "title1": value.title,  //商品名称
            "title2": "限"+dates+"天，"+endDate+"截止", //活动限定时间
            "title3": value.price,      //原价
            "title4":  value.quan,
            "id":value.id,
            "PurchasedNum":value.volume
        }
    });

    return Rdata;
}

module.exports = regroup;
