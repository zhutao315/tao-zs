Page({
    data: {
        currentTab: 0,
        listLength: 11,
        currentLength: 5,
        lists:[],
        channel: [
            {
                id: 0,
                name: "精选"
            },
            {
                id: 1,
                name: "生活"
            },
            {
                id: 2,
                name: "风尚"
            },
            {
                id: 3,
                name: "亲子"
            },
            {
                id: 4,
                name: "数码"
            },
            {
                id: 5,
                name: "美食"
            }
        ]
    },

    lists1: [
        {
            id: 0,
            title: '史上颜值最高的五部手机, 有你的手机吗?史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice1.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 1,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice2.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 3,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice3.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 3,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice4.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 4,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice5.png',
            time: '11小时前',
            read: 4612
        },

    ],

    lists2: [
        {
            id: 5,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice6.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 6,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice7.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 7,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice8.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 8,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice9.png',
            time: '11小时前',
            read: 4612
        },
        {
            id: 9,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice10.png',
            time: '11小时前',
            read: 4612
        }
    ],

    lists3: [
        {
            id: 10,
            title: '史上颜值最高的五部手机, 有你的手机吗?',
            content: '三星作为安卓巨头，在设计早早的走到了行业的前列，从三星S7火爆全球的双曲屏到S8掀起了一波又一波全面屏热，三星S8作为三星的最新的旗舰，更大的屏幕配上了更高的屏占比，更是搭配到无边框设计使视觉效果更佳，大屏配上不俗的性能，三星S8绝对可以称为是一款划时代的产品，这是科技与艺术的结合体。',
            author: 'poison若即若离',
            image: '/image/choice11.png',
            time: '11小时前',
            read: 4612
        }],

    onLoad: function () {
        this.refresh();
    },

    switchTab: function (e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    },


    upper: function () {
        wx.showNavigationBarLoading()
        this.refresh();
        setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
    },

    lower: function (e) {
        wx.showNavigationBarLoading();
        var that = this;
        setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    },

    refresh: function () {
        this.setData({
            lists: this.lists1,
            currentLength: this.lists1.length
        });
    },

    nextLoad: function () {
        this.setData({
            lists: this.data.lists.concat(this.lists2),
            currentLength: this.data.currentLength + this.lists2.length
        });
    }

})
