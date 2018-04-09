// page/component/details/details.js
Page({
  data:{
    itemid:0,
    goodslist: [
      {
        id: 1,
        image: '/image/bento1.jpg',
        title: 'bento1',
        price: 15.50,
        stock: '有货',
        detail: '这里bento1',
        parameter: '150g',
        service: '很好',
        title: 'Bento1',
        num: 1
      },
      {
        id: 2,
        image: '/image/bento2.jpg',
        title: 'bento2',
        price: 17.00,
        stock: '有货',
        detail: '这里bento2',
        parameter: '150g',
        service: '很好',
        title: 'Bento2',
        num:0
      },
      {
        id: 3,
        image: '/image/bento3.jpg',
        title: 'bento3',
        price: 12.05,
        stock: '有货',
        detail: '这里bento3',
        parameter: '150g',
        service: '很好',
        title: 'Bento3',
        num:0
      },
      {
        id: 4,
        image: '/image/bento4.jpg',
        title: 'bento4',
        price: 13.01,
        stock: '有货',
        detail: '这里bento4',
        parameter: '150g',
        service: '很好',
        title: 'Bento4',
        num:0
      }
    ]  ,
    goods: {
      id: '',
      image: '',
      title: '',
      price: '',
      stock: '',
      detail: '',
      parameter: '',
      service: '',
      num:''
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    var isExist=false;
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    self.setData({
      show: true
    })
    this.data.goodslist[this.data.itemid].num = this.data.num;
    console.log(this.data.itemid);
    var arr = wx.getStorageSync('cart') || [];
    console.log("arrray_length:"+arr.length);
    if (arr.length > 0) {
      for (var j in arr) {
        if (arr[j].id == this.data.itemid) {
          arr[j].num = arr[j].num + this.data.num;
          isExist=true;
          break;
        }
      }
      if(!isExist){
        arr.push(this.data.goodslist[this.data.itemid]);
      }
      try {
        wx.setStorageSync('cart', arr);
      } catch (e) {
        console.log(e);
      }
    }
    else {
      arr.push(this.data.goodslist[this.data.itemid]);
      wx.setStorageSync('cart', arr);
    }
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
  
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

  onLoad:function(options){
    this.setData({
      goods: this.data.goodslist[options.good_id-1],
      itemid: options.good_id - 1
    })
  },
})