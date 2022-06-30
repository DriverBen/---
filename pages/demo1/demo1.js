// pages/main/main.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderbyItemList: ["按编辑日期排序", "按创建日期排序", "按名称排序"],
    orderbyIndex: 0,
    list: [],
    isListView: true,
    keyWord:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
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
    this.loadData()
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
    this.loadData()

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
  loadData: function () {
    var list = wx.getStorageSync(app.globalData.NOTE_LIST)
    list= list.sort(this.compare(this.data.orderbyIndex == 0 ? "update_time" : this.data.orderbyIndex == 1 ? "add_time" : "title"))
    list=this.findDataByKeyWord(this.data.keyWord)
    this.setData({
      list:list
    })
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  gotoWriteNote: function (event) {
    var itemData = event.currentTarget.dataset.item
    var param = {}
    if (itemData) {
      param = itemData
    }
    app.$page.startPage(app.$page.page.writePage, param, 1)
  },
  showAction: function (event) {
    var that = this 
    wx.showActionSheet({
      itemList: ["编辑", "删除"],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.gotoWriteNote(event)
        } else {
          that.delete(event)
        }
      }
    })
  },
  delete: function (event) {
    var that = this
    var itemData = event.currentTarget.dataset.item
    var index = event.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否删除该备忘录',
      success(res) {
        if (res.confirm) {
          that.data.list.splice(index, 1)
          that.save()
          that.loadData()
        } else if (res.cancel) {

        }
      }
    })
  },
  save: function () {
    var map = {
      key: app.globalData.NOTE_LIST,
      data: this.data.list,
      success: function (res) {
        wx.showToast({
          title: '操作成功',
          icon: 'success'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '操作失败',
          icon: 'error'
        })
      }
    }
    wx.setStorage(map)
  },
  switchLayout: function () {
    this.setData({
      isListView: !this.data.isListView
    })
  },
  orderBy: function () {
    var that = this
    wx.showActionSheet({
      itemList: that.data.orderbyItemList,
      success: function (res) {
        that.setData({
          orderbyIndex: res.tapIndex
        })
       that.loadData()
      }
    })
  },
  findDataByKeyWord: function (keyWord) {
    var note_list = wx.getStorageSync(app.globalData.NOTE_LIST)
    note_list = note_list.sort(this.compare(this.data.orderbyIndex == 0 ? "update_time" : this.data.orderbyIndex == 1 ? "add_time" : "title"))
    var note_list_result = []
    for (const index in note_list) {
      var element = note_list[index]
      if (element.title.indexOf(keyWord) != -1) {
        note_list_result.push(element)
      }
    }
    return note_list_result
  },
  search_change: function (event) {
    this.setData({
      keyWord:event.detail.value,
    })
    this.loadData()
  },
  compare: function (prop) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (val1 > val2) {
        return prop == 'title' ? 1 : -1;
      } else if (val1 < val2) {
        return prop == 'title' ? -1 : 1;
      } else {
        return 0;
      }
    }
  }
})