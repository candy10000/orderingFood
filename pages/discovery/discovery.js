// pages/discovery/discovery.js
var amapFile = require('../../libs/amap-wx.js');
var markersData = {
  latitude: '', //纬度
  longitude: '', //经度
  key: '1810f4232e79c8b513f161b6e7a3e6ca'
};
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    address: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadInfo();
    if (options.items != null) {
      var items = JSON.parse(options.items)
    }
    if (items != null) {
      app.globalData.list.push(items);
    }
    // var list = app.globalData.list;
    // console.log("list===", list);
    this.setData({
      list: app.globalData.list,
    })
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
          // data: data[0].regeocodeData,
          city: data[0].regeocodeData.addressComponent.city
        })
      },
      fail: function(info) {
        console.log(info);
      }
    });
  },
  //重新定位
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

  addAddress: function() {
    wx.navigateTo({
      url: 'addLocation/addLocation',
    })
  }
})