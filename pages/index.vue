<template>
  <div id="index">
    <!-- pc的navbar -->
    <navbar-pc v-if="device === 0" :body-width="body_width"></navbar-pc>

    <!-- mobile端的header -->
    <header-mobile v-if="device === 1"></header-mobile>

    <!-- 走马灯 -->
    <l-carousel :carousel-data="carouselData" :duration="duration" :body-width="body_width"></l-carousel>

    <div class="content">
      <div class="row">
        <div class="left">
          <div class="hot-book block-shadow">
            <h2 class="dot-line-title">热门图书</h2>
            
            <Row class="block-books">
              <i-col :md="6" :sm="8" :xs="12" class="block-book" v-for="item in hot_books" v-bind:key="item.id"> 
                <img class="book-img" src="" alt="">
              </i-col>
            </Row>
          </div>
          <div class="rec-article block-shadow">
            <h2 class="dot-line-title">推荐文章</h2>
          </div>
        </div>
        <div class="right block-shadow">
          <h2 class="dot-line-title">社区动态</h2>
          <div class="block">
            <h3 class="dot-line-title2">最新书讯</h3>
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

export default {
  data() {
    return {
      device: 2,              //获取设备信息：pc：0、mobile：1
      carouselData: [
        //走马灯banner的数据
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
      hot_books: [            //热门图书
        {
          id: 0
        },
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
      ],
    };
  },
  mounted() {
    this.device_init();
    this.win_resize();
  },
  methods: {
    //获取当前设备：pc端、移动端 & 获取body的width
    device_init() {
      let body_width = document.body.clientWidth;

      body_width > 400 ? (this.device = 0) : (this.device = 1);

      this.body_width = body_width;
    },
    //监测窗口大小变化
    win_resize() {
      let _this = this;
      window.onresize = function() {
        let body_width = document.body.clientWidth;

        body_width > 400 ? (this.device = 0) : (this.device = 1);

        _this.body_width = body_width;
      };
    }
  },
  components: {
    navbarPc,
    headerMobile,
    navbarMoblie,
    lCarousel
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
#index {
  .content {
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
        .block-books{
          width: 100%;
          .block-book{
            padding: 20px 0;
            text-align: center;
            .book-img{
              width: 133px;
              height: 175px;
              display: inline-block;
              background-color: #009a61;
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
      }
    }
  }
  .block-shadow {
    box-shadow: none;
    padding: 0 20px;
  }
}
</style>
