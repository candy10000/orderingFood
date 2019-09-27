// pages/discovery/addLocation/addLocation.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function(e){
    console.log("e----items", e.detail.value);
    var items = JSON.stringify(e.detail.value);
    // app.globalData.items = e.detail.value;
    // console.log("app.globalData.items===", app.globalData.items);
    wx.reLaunch({
      url: '../discovery?items=' + items,
    })
  },

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
  }
})