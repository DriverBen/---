// pages/demo2/demo2.js
var app = getApp()
const db=wx.cloud.database()
const tm=db.collection('timing')
var interval = 0
var isStarted = false
var startTime = Date()
var lastTimeElapsed = 0
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startPauseButtonText: '开始',
    displayTime: '00:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  startOrPauseTimer() {
    if (isStarted) {
      if (interval != 0) {
        clearInterval(interval)
        interval = 0
      }
      lastTimeElapsed = new Date() - startTime + lastTimeElapsed
      this.setData({
        startPauseButtonText: '开始'
      })
      let tim ={
        nickName: app.globalData.hasUserInfo?app.globalData.userInfo.nickName:'',
        avatarUrl: app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:'',
        score: this.data.displayTime
      }
      tm.add({
        data:{
          ...tim,
          createDate:db.serverDate()
        }
      }).then(res=>{
        console.log(res._id)
      })
    } else {
      startTime = new Date()
      this.setData({
        startPauseButtonText: '暂停'
      })
  
      if (interval == 0) {
        interval = setInterval(() => {
          var timeOffset = new Date() - startTime + lastTimeElapsed
          this.setData({
            displayTime: this.formatTime(timeOffset)
          })
        }, 100)
      }
    }

    isStarted = !isStarted
  },

  formatTime(timeOffset) {
    var mm = parseInt(timeOffset / 1000 / 60)
    if (mm < 10) mm = '0' + mm
    var ss = parseInt((timeOffset / 1000) % 60)
    if (ss < 10) ss = '0' + ss
    return `${mm}:${ss}`
  }
})