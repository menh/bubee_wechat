//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners:[],
    bentos:[],
    orderList:[],
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:100,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[]
  },
  bentoOrder:{
    orderPrice:0,
    orderNum:0,
    bentoPic:""
  },
  getBannerList:function(){
    var _this=this;
    wx.request({
      url: 'http://localhost:8080/bubee/getBannerList.do',
      method:'GET',
      success:function(res){
        console.log("success");
        console.log(res.data.banner);
       // banners:res.data.banner;
        _this.setData({ banners: res.data.banner })
      }
    })
  },
  getBentoList: function () {
    var _this=this;
    wx.request({
      url: 'http://localhost:8080/bubee/getBentoList.do',
      method: 'GET',
      "Content-Type": "applciation/json",
      success: function (res) {
        console.log("success_getBentoList");
        console.log(res.data.bento.BentoPic);
        console.log(res.data.bento);
        // banners:res.data.banner;
        _this.setData({ bentos: res.data.bento })
      }
    })
  },
  AddToShoppingCar:function(){
    var _this = this;
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getBannerList();
    this.getBentoList();
   // this.getdata();
   /* if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    }*/
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getdata: function () {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'http://localhost:8080/bubee/weChatGetPic.do',//请求地址
      data: {//发送给后台的数据
        name: "bella",
        age: "20"
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data.name);//res.data相当于ajax里面的data,为后台返回的数据
        　　　　　　that.setData({list:res.data.list1})//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
                //that.setData({ movies: cache.movies, loading: false })
          　　　　　//　logs: res.data.result
          

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },


})
