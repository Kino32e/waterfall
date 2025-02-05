// pages/home/home.js
Page({
  options: {
    pureDataPattern: /^_/
  },
  /**
   * 页面的初始数据
   */
  data: {
    goodList: [],
    leftList: [],
    rightList: [],
    _reqData: {
      categoryId: 1005002,
      page: 1,
      pageSize: 20,
      sortField: 'publishTime'
    },
    _isLoading: false
  },

  getData() {
    // 节流阀
    this.setData({
      _isLoading: true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/category/goods/temporary',
      method: 'POST',
      data: this.data._reqData,
      success: (res) => {
        // console.log(res.data)
        this.setData({ goodList: res.data.result.items })
        let half = Math.ceil(this.data.goodList.length / 2)
        // console.log(this.data.goodList)
        this.setData({
          leftList: [...this.data.leftList, ...this.data.goodList.splice(0, half)],
          rightList: [...this.data.rightList, ...this.data.goodList.splice(-half)]
        })
      },
      // 隐藏loading效果
      complete: () => {
        wx.hideLoading()
        this.setData({
          _isLoading: false
        })
      }
    })
  },

  // 列表无限加载
  load() {
    this.setData({
      _reqData: {
        page: this.data._reqData.page + 1
      }
    })
    this.getData()
    if (this.data._reqData.page > 18) {
      his.setData({
        _reqData: {
          page: 1
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data._isLoading === false) {
      this.load()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})