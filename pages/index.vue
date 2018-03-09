<template>
  <div id="index">
    <!-- pc的navbar -->
    <navbar-pc v-if="device === 0" :body-width="body_width"></navbar-pc>

    <!-- mobile端的header -->
    <header-mobile v-if="device === 1"></header-mobile>

    <!-- 走马灯 -->
    <l-carousel :carousel-data="carouselData" :duration="duration" :body-width="body_width"></l-carousel>

    <div class="container">
      <div class="row">
        <div class="left">
          <div class="hot-book block-shadow">
            <h2 class="dot-line-title">热门图书</h2>
            <!-- v-if="device === 0" -->
            <div class="iconWrapper">
              <a href="javascript:void(0)" @click="updata_hot_book_page(0)"><Icon type="android-arrow-dropleft-circle" style="margin-right: 10px;"></Icon></a>
              <a href="javascript:void(0)" @click="updata_hot_book_page(1)"><Icon type="android-arrow-dropright-circle"></Icon></a>
            </div>
            
            <Row class="block-books">
              <i-col :md="6" :sm="8" :xs="12" class="block-book" v-for="(item, index) in hot_books" v-show="index >= (hot_book_page - 1) * hot_book_page_size && index < hot_book_page * hot_book_page_size" :key="item.id"> 
                <img class="book-img" src="" alt="">
                <div>{{item.id}}</div>
              </i-col>
            </Row>
          </div>
          <div class="rec-article block-shadow">
            <h2 class="dot-line-title">推荐文章</h2>

            <rec-article :articles="articles"></rec-article>

          </div>
        </div>
        <div class="right block-shadow">
          <h2 class="dot-line-title">社区动态</h2>
          <div class="block new-mess-block">
            <h3 class="dot-line-title2">最新书讯</h3>
            <ul class="warpper">
              <li class="item">
                <h4 class="title">一月书讯</h4>
                <p class="content">13本好书与你一起开工</p>
              </li>
              <li class="item">
                <h4 class="title">二月书讯</h4>
                <p class="content">13本好书与你一起开工</p>
              </li>
            </ul>
          </div>
          <div class="block">
            <h3 class="dot-line-title2">广告</h3>
          </div>
          <div class="block">
            <h3 class="dot-line-title2">即将上市</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- mobile端的navbar -->
    <navbar-moblie class="fixed-footer" v-if="device === 1"></navbar-moblie>

  </div>
</template>

<script>
import navbarPc from "~/components/navbar/navbar_pc.vue";
import headerMobile from "~/components/headerMobile/headerMobile.vue";
import navbarMoblie from "~/components/navbar/navbar_mobile.vue";
import lCarousel from "~/components/lCarousel/lCarousel.vue";
import recArticle from "~/components/recArticle/recArticle.vue";

export default {
  data() {
    return {
      device: 2,                   //获取设备信息：pc：0、mobile：1
      body_size: '',               //窗口的大小
      carouselData: [              //走马灯banner的数据
        {
          id: 0,
          url: "",
          back_color: "#027148",
          light: 1
        },
        {
          id: 1,
          url: "",
          back_color: "#009a61",
          light: 1
        },
        {
          id: 2,
          url: "",
          back_color: "#02BB76",
          light: 0
        }
      ],
      duration: 4000,
      body_width: 0,
      hot_books: [],               //热门图书的数据
      hot_book_page_size: 0,       //热门图书每页展示的数量
      hot_book_page: 1,            //热门图书页码
      articles: [],                //推荐文章的数据
    };
  },
  watch: {
    body_size(size){
      if(size === 'md'){
        this.hot_book_page_size = 8
      }else if(size === 'sm'){
        this.hot_book_page_size = 6
      }else if(size === 'xs'){
        this.hot_book_page_size = 4
      }else{
        return
      }
    }
  },
  mounted() {
    this.device_init();
    this.win_resize();
    this.hot_book_init();    //hot_books的假数据
    this.articles_init();     //推荐文章的假数据
  },
  methods: {
    //获取当前设备：pc端、移动端 & 获取body的width
    device_init() {
      let body_width = document.body.clientWidth;

      this.body_width = body_width;
      if (/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
        this.device = 1
      } else {
        this.device = 0
      }

      this.updata_body_size(body_width)
    },
    //监测窗口大小变化
    win_resize() {
      let _this = this;
      window.onresize = function() {
        let body_width = document.body.clientWidth;

        body_width > 400 ? (this.device = 0) : (this.device = 1);

        _this.body_width = body_width;

        _this.updata_body_size(body_width)
      };
    },
    //更新body_size
    updata_body_size(width){
      if(width >= 992){
        this.body_size = 'md'
      }else if(width >= 768){
        this.body_size = 'sm'
      }else{
        this.body_size = 'xs'
      }
    },
    //初始化热门图书
    hot_book_init(){
      for(let i=0; i<24; i++){
        let book = {id: i}
        this.hot_books.push(book) 
      }
    },
    //初始化推荐文章
    articles_init(){
      for(let i=1; i<=10; i++){
        let article = {
          id: i,
          title: 'title' + i,
          author: 'author' + i,
          content: 'content' + i,
          time: '2018/03/09',
          rec_state: 0
        }
        this.articles.push(article)
      }
    },
    //更新hot_book的页码
    updata_hot_book_page(state){
      let length = this.hot_books.length / this.hot_book_page_size
      if(state && this.hot_book_page < length){
        this.hot_book_page++
      }else if(!state && this.hot_book_page > 1){
        this.hot_book_page--
      }else{
        return
      }
    }
  },
  components: {
    navbarPc,
    headerMobile,
    navbarMoblie,
    lCarousel,
    recArticle
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
#index {
  $mainC: #009a61;
  $deepC: #027148;
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    .row {
      display: flex;
      justify-content: space-between;
    }
    .left {
      width: 66%;
      .hot-book,
      .rec-article {
        width: 100%;
        min-height: 300px;
      }
      .hot-book {
        margin-bottom: 14px;
        position: relative;
        .iconWrapper{
          width: 60px;
          position: absolute;
          top: 18px;
          right: 20px;
          text-align: right;
          background-color: #fff;
          .ivu-icon{
            font-size: 22px;
            color: $deepC;
          }
        }
        .block-books {
          width: 100%;
          .block-book {
            padding: 20px 0;
            text-align: center;
            .book-img {
              width: 133px;
              height: 175px;
              display: inline-block;
              background-color: $mainC;
              border-radius: 4px;
            }
          }
        }
      }
    }
    .right {
      width: 32%;
      min-height: 300px;
      .block {
        width: 100%;
        min-height: 50px;
        margin-top: 14px;
      }
      .new-mess-block .warpper{
        width: 100%;
        .item{
          line-height: 1.2;
          .title, .content{
            display: inline-block;
          }
        }
      }
    }
  }
  .fixed-footer {
    position: fixed;
    bottom: 0;
  }
}
@media screen and (max-width: 768px) {
  #index {
    .content {
      .row {
        display: block;
        .left,
        .right {
          width: 100%;
        }
        .left{
          .iconWrapper{
            top: -2px;
          }
        }
      }
    }
  }
  .block-shadow {
    box-shadow: none;
    padding: 0 20px;
  }
}
</style>
