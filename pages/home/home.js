// pages/fooder/fooder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    stores: [1,2,3,5,6,7,8,9], 
    scrollTop:5,//设置触发条件的距离
    // timer: null,//保存定时器
    
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

  /* 商家展示 */
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
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  choose: function(){
    wx.navigateTo({
      url: '../storeDetail/storeDetail',
    })
  },

  // refresh(){
  //   wx.startPullDownRefresh({
  //     success(msg){
  //     console.log('开始下拉刷新',msg)
  //     },
  //     complete(){
  //       console.log('下拉刷新完毕')
  //     }
  //   })
  // },

  // pullFresh:function(e){
  //   clearTimeout(this.timer)
  //   wx.showNavigationBarLoading()
  //   if (e.detail.scrollTop < this.data.scrollTop) {
  //     this.timer = setTimeout(() => {
  //       this.refresh()
  //       wx.hideNavigationBarLoading()
  //       wx.stopPullDownRefresh()
  //     }, 350)
  //   }
  // }

})