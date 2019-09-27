// pages/fooder/fooder.js
var app = getApp()
var API = require('../../utils/api.js')
var amapFile = require('../../libs/amap-wx.js');
var markersData = {
  latitude: '', //唯独
  longitude: '', //经度
  key: '1810f4232e79c8b513f161b6e7a3e6ca'
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    stores: [],
    loadStores: [],
    scrollTop: 5, //设置触发条件的距离
    // timer: null,//保存定时器

    //bottom轮播图配置
    autoplay: true,
    interval: 3000,
    duration: 1200,

    // 综合排序下拉框参数设置
    select: false,
    filter_name: '综合排序',
    filterFactor: [
      '综合排序',
      '好评优先',
      '配送最快',
      '通用排序',
    ],

    //定位数据
    address: '',
    items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //定位
    this.loadInfo();

    var that = this;
    //  请求系统数据
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winHeight: res.windowHeight,
          winWidth: res.windowWidth
        })
      }
    });

    API.ajax('lunboData', function(res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        lunboData: res.data
      })
    });

    API.ajax('stores', function(res) {
      //这里既可以获取模拟的res
      console.log(res)
      var loadStores = []

      for (var i = 0; i < 10; i++) {
        loadStores.push(res.data[i])
      }
      console.log(loadStores)
      that.setData({
        stores: res.data,
        loadStores: loadStores
      })
    });

    // // bottom轮播图片
    // var data = {
    //   "datas": [
    //     {
    //       "id": 1,
    //       "imgurl": "../icon/taocan.gif"
    //     },
    //     {
    //       "id": 2,
    //       "imgurl": "../icon/taocan.gif"
    //     },
    //     {
    //       "id": 3,
    //       "imgurl": "../icon/taocan.gif"
    //     },
    //     {
    //       "id": 4,
    //       "imgurl": "../icon/taocan.gif"
    //     }
    //   ]
    // };
    that.setData({
      lunboData: this.data.lunboData
    })
  },

  /* 商家展示 */
  lower() {
    let len = this.data.loadStores.length

    if (len == this.data.stores.length) {
      wx.showLoading({
        title: '到底了。。',
      });

      setTimeout(function() {
        wx.hideLoading()
      }, 1000)
    } else {
      for (let i = 0; i < 10; i++) {
        this.data.loadStores.push(this.data.stores[len + i])
        this.setData({
          'loadStores': this.data.loadStores
        })
      }
    }





  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  choose: function(e) {
    console.log('id', e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id - 1;
    var jsonstr = JSON.stringify(this.data.loadStores[id])
    console.log('jsonstr', jsonstr)
    wx.navigateTo({
      url: '../storeDetail/storeDetail?store=' + jsonstr,
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

  /**
   *  综合排序点击下拉框
   */
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  /**
   * 综合排序已选下拉框
   */
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    this.setData({
      filter_name: name,
      select: false
    })
  },

  /* 搜索框实现 */
  searchInput(e) {
    console.log('storeName', e.detail.value)
    this.setData({
      storeName: e.detail.value
    })
  },
  search() {
    var that = this;
    var newStores = that.data.stores.filter((item) => {

      var reg = new RegExp(that.data.storeName, 'i')
      return reg.test(item.storeInfo.name)
    })
    that.setData({
      loadStores: newStores
    })

  },
  //定位
  onChangeAddress() {
    var _page = this;
    wx.chooseLocation({
      success: (res) => {
        _page.setData({
          address: res.name
        });
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },

  //获取当前位置的经纬度
  loadInfo: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude //维度
        var longitude = res.longitude //经度
        console.log(res);
        that.loadCity(latitude, longitude);
      }
    })
  },
  //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置
  loadCity: function(latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: markersData.key
    });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '', //location的格式为'经度,纬度'
      success: function(data) {
        console.log(data);
        that.setData({
          address: data[0].name,
          data: data[0].regeocodeData,
        })
      },
      fail: function(info) {}
    });
  }

})