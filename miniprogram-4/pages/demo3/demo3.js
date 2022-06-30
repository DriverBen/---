// pages/demo3/demo3.js
const app = getApp()
const db = wx.cloud.database()
const tm= db.collection('timing')
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getRankList()
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
    this.onLoad()
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
  getRankList(){
    wx.showLoading({
      title: '加载中',
    });
    tm.where({
      _openid:_.exists(true)
    })
    .orderBy('score', 'desc')
    .get()
    .then(res=>{
      console.log('[云数据库] [排行榜] 查询成功')
      console.log(res.data)
      let data = res.data || []
      this.setData({
      rankList:data
      })
      wx.hideLoading();
    })
  }
})