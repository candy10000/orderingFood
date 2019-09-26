const app = getApp()

Page({
  /* 页面的初始数据*/
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentId: '1',
    section: [{
      name: '点餐',
      typeId: '1'
    }, {
      name: '评价',
      typeId: '2'
    }, {
      name: '商家',
      typeId: '3'
    }],
   
  },

  /**
   * 生命周期函数
   * 页面加载时调用
   */
  onLoad: function (options) {
    var that = this
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

  
  },


  /* 每个导航的点击事件 */
  handleTap: function (e) {
    let id = e.currentTarget.id;
    var that = this;

    // //根据id请求什么水平的摄影师
    // wx.request({
    //   url: getApp().globalData.url + "/photoCameraman/selectCameramanByLevel",
    //   data: {
    //     level: id
    //   },
    //   success: function (res) {
    //     console.log("*********");
    //     console.log("/photoCameraman/selectCameramanByLevel", res.data);

    //     var photographs = res.data;
    //     var photographDetail = [];

    //     photographDetail.push({
    //       id: 1,
    //       zIndex: 2,
    //       opacity: 0.6,
    //       left: 0,
    //       charge: 100,
    //       image: "../images/candy.png",
    //       animation: null
    //     });

    //     // 遍历获取到摄影师数组
    //     for (var i = 0; i < photographs.length; i++) {

    //       photographDetail.push({
    //         id: 2,
    //         photographId: photographs[i].id,
    //         zIndex: 4,
    //         opacity: 1,
    //         left: 26,
    //         charge: photographs[i].charge,
    //         image: getApp().globalData.urlb + "" + photographs[i].cameramanPhoto,
    //         detail: photographs[i].detail,
    //         animation: null
    //       });
    //     }

    //     photographDetail.push({
    //       id: 3,
    //       zIndex: 2,
    //       opacity: 0.6,
    //       left: 52,
    //       charge: 300,
    //       image: "../images/cat1.jpg",
    //       animation: null
    //     });

    //     that.setData({
    //       datas: photographDetail
    //     });
    //     // 重新布局小卡片的布局
    //     that.__set__();
    //     that.move();
    //   }
    // })

    if (id) {
      this.setData({
        currentId: id
      })
    }
  },

  /**
   * 点击某个小卡片跳转到相应摄影师的个人作品集 "pages/works/works" 
   */
  choose: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../works/works?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})