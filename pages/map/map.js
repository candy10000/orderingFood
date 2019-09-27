// pages/map/map.js
Page({
  data: {
    latitude: 26.150005,
    longitude: 119.131369,
    markers: [{
      id: 1,
      latitude: 26.150005,
      longitude: 119.131369,
      name: '创业大厦'
    }]
  },
  onReady(e) {
    this.mapCtx = wx.createMapContext('myMap')
  }
})