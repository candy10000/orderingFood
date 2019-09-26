// pages/fooder/fooder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    stores: [1,2,3,5,6,7,8,9], 
    
    //bottom轮播图配置
    autoplay: true,
    interval: 3000,
    duration: 1200

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that =this;
    //  请求系统数据
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winHeight: res.windowHeight,
          winWidth: res.windowWidth
        })
      }
    });

    // bottom轮播图片
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "../icon/taocan.gif"
        },
        {
          "id": 2,
          "imgurl": "../icon/taocan.gif"
        },
        {
          "id": 3,
          "imgurl": "../icon/taocan.gif"
        },
        {
          "id": 4,
          "imgurl": "../icon/taocan.gif"
        }
      ]
    };
    that.setData({
      lunboData: data.datas
    })
  },

  /* 作品集展示加载函数 */
  lower() {
    let len = this.data.stores.length,
      lastItem = this.data.stores[len - 1];
    for (let i = 0; i < len; i++) {
      this.data.stores.push(lastItem + i + 1)
      this.setData({
        'stores': this.data.stores
      })
    }

  },

  choose: function(){
    wx.navigateTo({
      url: '../storeDetail/storeDetail',
    })
  }

})