// pages/login/login.js

//const config = require('../../config/config.default.js')
const app = getApp()
var API = require('../../utils/api.js')

Page({
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    code: '',
    otherInfo: '',
    protocol: "提示条款：需要特别说明的是，本政策不适用于其他第三方向您提供的服务，也不适用于饿了么中另行独立设置隐私权政策的产品或服务。例如饿了么上的卖家依托饿了么向您提供服务时，您向卖家提供的个人信息不适用本政策。",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
      url: '../home/home',
    })
  },

  onReady: function () {
    // wx.request({
    //   url: `${config.api + '/getSessionId.html'}`,
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     wx.setStorageSync('sessionId', 'JSESSIONID=' + res.data)

    //   }
    // })
  },
  // 手机号部分
  phoneInput: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum' + this.data.phoneNum)
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },

  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        //image: '../../images/fail.png'
      })
      return false
    }
  },

  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },

  getCode: function () {
    var phoneNum = this.data.phoneNum;
    var sessionId = wx.getStorageSync('sessionId');
    // wx.request({
    //   url: `${config.api + '/sendSms.html'}`,
    //   data: {
    //     phoneNum: phoneNum
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Cookie": sessionId
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })

    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },

  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },


  // 验证码
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    console.log('code' + this.data.code)
  },

  // 按钮
  activeButton: function () {
    let { phoneNum, code, otherInfo } = this.data
    console.log(code)
    if (phoneNum && code && otherInfo) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
    }
  },

  loginSubmit: function () {
    var phoneNum = this.data.phoneNum;
    var code = this.data.code;
    var otherInfo = this.data.otherInfo;
    var sessionId = wx.getStorageSync('sessionId');
    console.log("successSubmit");

    wx.switchTab({
      url: '../home/home',
    })
    // wx.request({
    //   //url: `${config.api + '/addinfo.html'}`,
    //   data: {
    //     phoneNum: phoneNum,
    //     code: code,
    //     otherInfo: otherInfo
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Cookie": sessionId
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res)

    //     if ((parseInt(res.statusCode) === 200) && res.data.message === 'pass') {
    //       wx.showToast({
    //         title: '验证成功',
    //         icon: 'success'
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.message,
    //         //image: '../../images/fail.png'
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })


  },


  // 协议
  showProtocol: function () {
    this.setData({
      isProtocolTrue: true
    })
  },
  hideProtocol: function () {
    this.setData({
      isProtocolTrue: false
    })
  }
})