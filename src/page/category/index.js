Page({
    data: {
        currentId: 1,
        category: [
            {
                id: 0,
                name: "热门推荐"
            },
            {
                id: 1,
                name: "淘淘超市"
            },
            {
                id: 2,
                name: "国际名牌"
            },
            {
                id: 3,
                name: "奢侈品"
            },
            {
                id: 4,
                name: "全球购"
            },
            {
                id: 5,
                name: "男装"
            },
            {
                id: 6,
                name: "女装"
            },
            {
                id: 7,
                name: "内衣配饰"
            },
            {
                id: 8,
                name: "箱包手袋"
            },
            {
                id: 9,
                name: "美妆个护"
            },
            {
                id: 10,
                name: "钟表珠宝"
            },
            {
                id: 11,
                name: "手机数码"
            },
            {
                id: 12,
                name: "电脑办公"
            },
            {
                id: 13,
                name: "家用电器"
            },
            {
                id: 14,
                name: "食品生鲜"
            },
            {
                id: 15,
                name: "酒水饮料"
            },
            {
                id: 16,
                name: "母婴童装"
            },
            {
                id: 17,
                name: "玩具乐器"
            },
            {
                id: 18,
                name: "医药保健"
            },
            {
                id: 19,
                name: "计生情趣"
            },
            {
                id: 20,
                name: "运动户外"
            },
            {
                id: 21,
                name: "汽车用品"
            },
            {
                id: 22,
                name: "家居厨具"
            },
            {
                id: 23,
                name: "礼品鲜花"
            },
            {
                id: 24,
                name: "宠物生活"
            },
            {
                id: 25,
                name: "生活旅行"
            },
            {
                id: 26,
                name: "宠物生活"
            },
            {
                id: 27,
                name: "图书音像"
            },
            {
                id: 28,
                name: "邮币"
            },
        ],
        contents: [
            {
                id: 0,
                image: "/image/hot.jpg",
                classify: [
                    {
                        className: "热门分类",
                        items: [
                            {
                                image: "/image/hot1.jpg",
                                name: "手机"
                            },
                            {
                                image: "/image/hot2.jpg",
                                name: "笔记本"
                            },
                            {
                                image: "/image/hot3.jpg",
                                name: "空调"
                            },
                            {
                                image: "/image/hot4.jpg",
                                name: "炒锅"
                            },
                            {
                                image: "/image/hot5.jpg",
                                name: "啤酒"
                            },
                            {
                                image: "/image/hot6.jpg",
                                name: "火车票"
                            }
                        ]
                    }
                ]
            },
            {
                id: 1,
                image: "/image/supermarket.png",
                classify: [
                    {
                        className: "休闲零食",
                        items: [
                            {
                                image: "/image/supermarket1.jpg",
                                name: "坚果炒货"
                            },
                            {
                                image: "/image/supermarket2.jpg",
                                name: "糖巧"
                            },
                            {
                                image: "/image/supermarket3.jpg",
                                name: "休闲零食"
                            },
                            {
                                image: "/image/supermarket4.jpg",
                                name: "肉干肉脯"
                            },
                            {
                                image: "/image/supermarket5.jpg",
                                name: "饼干蛋糕"
                            },
                            {
                                image: "/image/supermarket6.jpg",
                                name: "蜜饯果干"
                            },
                            {
                                image: "/image/supermarket7.jpg",
                                name: "无糖食品"
                            }
                        ]
                    },
                    {
                        className: "生鲜",
                        items: [
                            {
                                image: "/image/supermarket8.png",
                                name: "新鲜水果"
                            },
                            {
                                image: "/image/supermarket9.png",
                                name: "海鲜水产"
                            },
                            {
                                image: "/image/supermarket10.jpg",
                                name: "精选肉类"
                            },
                            {
                                image: "/image/supermarket11.jpg",
                                name: "蛋类"
                            },
                            {
                                image: "/image/supermarket12.png",
                                name: "新鲜蔬菜"
                            },
                            {
                                image: "/image/supermarket13.jpg",
                                name: "冷冻食品"
                            },
                            {
                                image: "/image/supermarket14.jpg",
                                name: "饮品甜品"
                            },
                            {
                                image: "/image/supermarket15.png",
                                name: "大闸蟹"
                            }
                        ]
                    }
                ]
            },
        ]
    },
    selectClass:function(e){
        // console.log("e=========>",e);
        this.setData({
            currentId:e.currentTarget.id
        });
    }


})
