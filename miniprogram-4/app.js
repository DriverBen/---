// app.js// app.js
import $page from '/utils/page.js'
import $timeUtils from '/utils/time_utils.js'
wx.cloud.init({
  env: 'cloud1-2g7rt5p84d875d31', //填上你的云开发环境id
  traceUser: true,
})
const db = wx.cloud.database()
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  $page,
  $timeUtils,
  globalData:{
    NOTE_LIST:"NOTE_LIST"
  },
  onLaunch() {

  },
})
