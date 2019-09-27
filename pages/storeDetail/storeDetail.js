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
    filterflag:[false,false,false],

    // 评论轮播图
    users: [1, 2, 3, 5, 6, 7, 8, 9],
    scrollTop: 5,//设置触发条件的距离
   
  },

  /**
   * 生命周期函数
   * 页面加载时调用
   */
  onLoad: function (options) {
    var that = this
   
    // console.log("option",options.store)
    //星星评分
    var praiseNums = 4;//获取数据评分
    var praisestars = (praiseNums / 5) * 100 + '%';
    console.log(praisestars);
    that.setData({
      praisestars: praisestars,
      store: JSON.parse(options.store) 
    })
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
   * 点击商家，跳入商家详细页面
   */
  choose: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../works/works?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //  标签过滤器
  changefilterflag:function(e){
     console.log("hhh",e.target.dataset.id)
    var id = "filterflag[" + e.target.dataset.id+"]"
    this.setData({
      filterflag: [false, false, false]
    })
     this.setData({
       [id]: true
     })
  },
  // 下拉刷新
  lower() {
    let len = this.data.users.length,
      lastItem = this.data.users[len - 1];
    for (let i = 0; i < len; i++) {
      this.data.users.push(lastItem + i + 1)
      this.setData({
        'users': this.data.users
      })
    }
  },
})