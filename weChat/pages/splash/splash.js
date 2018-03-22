const app=getApp()

Page({
  data:{
    movies:[],
    loading:true
  },

  getCache(){
    return new Promise(resolve=>{
      app.wechat.getStorage('last_splash_data')
        .then(res=>{
          const{movies,expires}=res.data
          if(movies&&expires>Date.now()){
            return resolve(res.data)
          }
          console.log('uncached')
          return resolve(null)
        })
        .catch(e=>resolve(null))
    })
  },

  handleStart(){
    wx.switchTab({
      url:'../board/board'
    })
  },

  onLoad(){
    this.getCache()
      .then(cache=>{
        if(cache)
          return this.setDate({movies:cache.movies,loading:false})
      }

      app.douban.find('coming-soon',1,3)
        .then(d=>{
          this.setData({movies:d.subjects,loading:false})
          return app.wechat.setStorage('last_splash_data',{
            movies:d.subjects,
            expires:Date.now()+1*24*60*60*1000
          })
        })
        .then(()=>console.log('storage last splash data'))
      )}
})