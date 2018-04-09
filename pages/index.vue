<template>
  <lib-main :navIndex="nav_index">
    <div id="index">
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
                <i-col :lg="4" :md="6" :sm="6" :xs="12" class="block-book" v-for="(item, index) in hot_books" v-show="index >= (hot_book_page - 1) * hot_book_page_size && index < hot_book_page * hot_book_page_size" :key="item.id">
                  <a :href="'/book/' + item._id">
                    <img class="book-img" :src="item.img_url" alt="">
                    <div class="detail-block">
                      <div class="name text-over">{{item.title}}</div>
                      <div class="author text-over">{{item.author}}</div>
                      <div class="translators text-over">{{item.translator}}</div>
                    </div>
                  </a> 
                </i-col>
              </Row>
            </div>
            <div class="rec-article block-shadow">
              <h2 class="dot-line-title">推荐文章</h2>

              <articles-list :articles="articles"></articles-list>

            </div>
          </div>
          <div class="right">
            <div class="block-shadow">
              <h2 class="dot-line-title">社区动态</h2>
              <div class="block new-mess-block">
                <h3 class="dot-line-title2">最新书讯</h3>
                <ul class="warpper">
                  <li class="item">
                    <h4 class="title">一月书讯：</h4>
                    <p class="content text-over">13本好书与你一起开工</p>
                  </li>
                  <li class="item">
                    <h4 class="title">二月书讯：</h4>
                    <p class="content text-over">13本好书与你一起开工</p>
                  </li>
                </ul>
              </div>
              <div class="block tip-block">
                <h3 class="dot-line-title2">广告</h3>
                <div class="tip-content"></div>
              </div>
              <div class="block newbook-block">
                <h3 class="dot-line-title2">即将上市</h3>
                <ul class="warpper">
                  <li class="item">
                    <h4 class="title text-over">程序员的英语</h4>
                    <p class="author text-over">朴栽浒   李海永   颜廷连   译</p>
                  </li>
                  <li class="item">
                    <h4 class="title">Python编程导论（第2版）</h4>
                    <p class="author">John V. Guttag   陈光欣   译</p>
                  </li>
                  <li class="item">
                    <h4 class="title">程序员的英语</h4>
                    <p class="author">朴栽浒   李海永   颜廷连   译</p>
                  </li>
                  <li class="item">
                    <h4 class="title">Python编程导论（第2版）</h4>
                    <p class="author">John V. Guttag   陈光欣   译</p>
                  </li>
                  <li class="item">
                    <h4 class="title">程序员的英语</h4>
                    <p class="author">朴栽浒   李海永   颜廷连   译</p>
                  </li>
                  <li class="item">
                    <h4 class="title">Python编程导论（第2版）</h4>
                    <p class="author">John V. Guttag   陈光欣   译</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </lib-main>
</template>

<script>
  import libMain from "~/components/main/main.vue";
  import lCarousel from "~/components/lCarousel/lCarousel.vue";
  import articlesList from "~/components/articlesList/articlesList.vue";

  export default {
    data() {
      return {
        device: 2,                   //获取设备信息：pc：0、mobile：1
        body_size: '',               //窗口的大小
        carouselData: [              //走马灯banner的数据
          {
            id: 0,
            url: "https://www.epubit.com/upload//2018/03/4f3f910c0fdc4c279c8917e9bd083c63.jpg",
            back_color: "#00A0E8",
            light: 1
          },
          {
            id: 1,
            url: "https://www.epubit.com/upload//2018/03/7727e40a4e1f4f58b4c01eef583865c5.jpg",
            back_color: "#042552",
            light: 0
          },
          {
            id: 2,
            url: "https://www.epubit.com/upload//2018/03/9170103bb9fe4f46b80cf1a884140dae.jpg",
            back_color: "#3D2094",
            light: 0
          }
        ],
        duration: 4000,
        body_width: 0,
        hot_books: [],               //热门图书的数据
        hot_book_page_size: 0,       //热门图书每页展示的数量
        hot_book_page: 1,            //热门图书页码
        articles: [],                //推荐文章的数据
        nav_index: 0,                //导航的下标

      };
    },
    watch: {
      body_size(size) {
        if (size === 'lg') {
          this.hot_book_page_size = 12
        } else if (size === 'sm') {
          this.hot_book_page_size = 8
        } else if (size === 'xs') {
          this.hot_book_page_size = 4
        } else {
          return
        }
      }
    },
    mounted() {
      this.device_init();
      this.win_resize();
      this.hot_book_init();     //hot_books的假数据
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
        window.onresize = function () {
          let body_width = document.body.clientWidth;

          body_width > 400 ? (this.device = 0) : (this.device = 1);

          _this.body_width = body_width;

          _this.updata_body_size(body_width)
        };
      },
      //更新body_size
      updata_body_size(width) {
        if (width >= 1200) {
          this.body_size = 'lg'
        } else if (width >= 768) {
          this.body_size = 'sm'
        } else {
          this.body_size = 'xs'
        }
      },
      //初始化热门图书
      hot_book_init() {
        for (let i = 1; i <= 24; i++) {
          let book = {
            title: 'title',
            img_url: '',
            author: 'author',
            translator: 'translator',
          }
          this.hot_books.push(book)
        }
        this.$http.get('/api/v0/books/all?pageSize=24&easyState=1&sort=recommend').then((res) => {
          if(res.status === 200){
            this.hot_books = res.data.books
          }
        }, (res) => {
          console.log(res)
        })
      },
      //初始化推荐文章
      articles_init() {
        for (let i = 1; i <= 10; i++) {
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
        this.$http.get('/api/v0/articles/all?pageSize=10&easyState=1&sort=recommend').then((res) => {
          if(res.status === 200){
            this.articles = res.data.articles || []
          }
        }, (res) => {
          console.log(res)
        })
      },
      //更新hot_book的页码
      updata_hot_book_page(state) {
        let length = this.hot_books.length / this.hot_book_page_size
        if (state && this.hot_book_page < length) {
          this.hot_book_page++
        } else if (!state && this.hot_book_page > 1) {
          this.hot_book_page--
        } else {
          return
        }
      },
      //更新nav_index
      // updata_nav_index(index) {
      //   this.nav_index = index
      // }
    },
    components: {
      libMain,
      lCarousel,
      articlesList
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../assets/css/color.scss";
#index {
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    .row {
      display: flex;
      justify-content: space-between;
    }
    .left {
      width: 75%;
      .hot-book,
      .rec-article {
        width: 100%;
        min-height: 300px;
      }
      .hot-book {
        margin-bottom: 14px;
        position: relative;
        .iconWrapper {
          width: 60px;
          position: absolute;
          top: 18px;
          right: 20px;
          text-align: right;
          background-color: #fff;
          .ivu-icon {
            font-size: 22px;
            color: $deepC;
          }
        }
        .block-books {
          width: 100%;
          padding-top: 14px;
          .block-book {
            padding-bottom: 14px;
            text-align: center;
            .book-img {
              width: 115px;
              height: 154px;
              display: inline-block;
              background-color: $mainC;
              border-radius: 4px;
            }
            .detail-block{
              width: 115px;
              margin: 0 auto;
              .name, .author, .translators{
                text-align: left;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .right {
      width: 23%;
      .block {
        width: 100%;
        min-height: 50px;
        margin-top: 14px;
        .dot-line-title2 {
          margin: 20px 0 10px 0;
        }
      }
      .new-mess-block .warpper {
        width: 100%;
        .item {
          line-height: 1.5;
          display: flex;
          .title,
          .content {
            display: inline-block;
          }
          .title {
            text-indent: 13px;
          }
        }
      }
      .tip-block {
        .tip-content {
          width: 100%;
          height: 150px;
          box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
          border-radius: 8px;
          background-color: $shallowC;
        }
      }
      .newbook-block {
        .warpper {
          .item {
            margin: 10px 0;
          }
          .title {
            text-indent: 13px;
          }
          .author {
            text-indent: 13px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #index {
    .container {
      .row {
        display: block;
        .left,
        .right {
          width: 100%;
        }
        .left {
          .iconWrapper {
            top: -2px;
          }
        }
      }
    }
  }
  .block-shadow {
    box-shadow: none;
    padding: 0 14px;
  }
}
</style>
