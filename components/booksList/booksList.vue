<template>
  <div class="books-list">
    <Row class="books-warpper">
      <i-col :lg="3" :md="3" :sm="4" :xs="12" class="block-book" v-for="(item, index) in books" v-show="index >= (book_page - 1) * book_page_size && index < book_page * book_page_size" :key="item.id"> 
          <img class="book-img" src="" alt="">
          <div class="detail-block">
            <div class="name text-over">{{item.name}}</div>
            <div class="author text-over">{{item.author}}</div>
            <div class="translators text-over">{{item.translators}}</div>
          </div>
        </i-col>
    </Row>

  </div>
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll'

  export default {
    props: {
      books: {
        type: Array,
        default: function () { }
      }
    },
    data() {
      return {
        book_page: 1,
        book_page_size: 0,
        body_size: ''
      }
    },
    watch: {
      body_size(size) {
        if (size === 'lg') {
          this.book_page_size = 40
        } else if (size === 'sm') {
          this.book_page_size = 30
        } else if (size === 'xs') {
          this.book_page_size = 8
        } else {
          return
        }
      }
    },
    mounted() {
      this.device_init();
      this.win_resize();
    },
    methods: {
      //获取当前设备：pc端、移动端 & 获取body的width
      device_init() {
        let body_width = document.body.clientWidth;

        this.updata_body_size(body_width)
      },
      //监测窗口大小变化
      win_resize() {
        let _this = this;
        window.onresize = function () {
          let body_width = document.body.clientWidth;

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
      }
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
.books-list {
  .books-warpper {
    padding-top: 14px;
    .block-book {
      padding-bottom: 14px;
      text-align: center;
      .book-img {
        width: 133px;
        height: 175px;
        display: inline-block;
        background-color: $mainC;
        border-radius: 4px;
      }
      .detail-block {
        width: 133px;
        margin: 0 auto;
        .name,
        .author,
        .translators {
          text-align: left;
          font-size: 14px;
        }
      }
    }
  }
}
</style>