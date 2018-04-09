<template>
  <div id="ice_carousel" @mouseover="carousel_over" @mouseout="carousel_out" :style="{ height: carousel_height + 'px' }">
      <div class="carousel_list">
        <div class="carousel_item" :class="{ active: index === current }" v-for="(item, index) in carouselData" v-bind:key="item.id" :style="{ background: item.back_color }">
          <div class="img-block">
            <img :src="item.url" :class="{ img_active: index === current }" :style="{ height: carousel_height + 'px' }" class="item_img">
            <div class="shelves">
              <p class="shelves-title">微信公众号　图灵教育</p>
              <img class="shelves-img" src="http://www.ituring.com.cn/img/qrcode-turingbook-ani.gif" alt="">
            </div>
          </div>
          <!-- <div :class="{ img_active: index === current }" class="item_img" :style="{backgroundImage: `url(${item.url})`}"></div> -->
        </div>
        <ol class="dot_wrapper">
          <li class="dot_box" :class="{ box_active: index === current }" v-for="(item, index) in carouselData"  v-bind:key="item.id" @click="dot_updata_current(index)">
            <span class="dot" :class="{ active: index === current }" :style="{ backgroundColor: light ? '#482929' : '#fff' }"></span>
          </li>
        </ol>
        <transition name="prevOrNext_state">
          <div v-show="prevOrNext_state">
            <a href="javascript:void(0)" @click="prev"><Icon type="chevron-left prev" :style="{ color: light ? '#482929' : '#fff' }"></Icon></a>
            <a href="javascript:void(0)" @click="next"><Icon type="chevron-right next" :style="{ color: light ? '#482929' : '#fff' }"></Icon></a>
          </div>
        </transition>
      </div>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    //轮播图的数据
    carouselData: {
      type: Array,
      default: function() {}
    },
    duration: {
      type: Number,
      default: 3000
    },
    bodyWidth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      current: 0,
      prevOrNext_state: false,
      light: 1,
      carousel_height: 0          //走马灯的height
    };
  },
  watch: {
    current(newCurrent) {
      this.light = this.carouselData[newCurrent].light;
    },
    bodyWidth(newWidth) {
      newWidth > 730
        ? (this.carousel_height = 336)
        : (this.carousel_height = Math.ceil(newWidth / 730 * 336));
    }
  },
  mounted() {
    this.light = this.carouselData[0].light;
    this.carouse_init();
  },
  methods: {
    carouse_init() {
      this.timer_init();
    },
    dot_updata_current(index) {
      this.current = index;
    },
    timer_init() {
      let _this = this;
      let imgLength = this.carouselData.length;

      this.timer = setInterval(function() {
        if (_this.current >= imgLength - 1) {
          _this.current = 0;
        } else {
          _this.current++;
        }
      }, _this.duration);
    },
    prev() {
      if (this.current <= 0) {
        this.current = this.carouselData.length - 1;
      } else {
        this.current--;
      }
    },
    next() {
      if (this.current >= this.carouselData.length - 1) {
        this.current = 0;
      } else {
        this.current++;
      }
    },
    carousel_over() {
      clearInterval(this.timer);
      this.prevOrNext_state = true;
    },
    carousel_out() {
      this.timer_init();
      this.prevOrNext_state = false;
    }
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
#ice_carousel {
  width: 100%;
  cursor: pointer;
  .carousel_list {
    width: 100%;
    height: 100%;
    position: relative;
    .carousel_item {
      width: 100%;
      height: 100%;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 1s ease-in;
      .item_img {
        width: 100%;
        max-width: 1263px;
        // height: 336px;
        opacity: 0;
        transition: opacity 1s ease-in;
      }
      .shelves{
        display: none;
      }
      .img_active {
        opacity: 1;
      }
    }
    .active {
      opacity: 1;
    }

    .dot_wrapper {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translate(-50%, 0);
      .dot_box {
        width: 16px;
        height: 16px;
        margin: 0 3px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
      }
      .box_active {
        width: 24px;
      }
      .dot {
        width: 16px;
        height: 3px;
        display: inline-block;
        background-color: #482929;
        opacity: 0.3;
      }
      .active {
        width: 24px;
        background-color: #482929;
      }
    }
    .prev,
    .next {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      display: inline-block;
      font-size: 30px;
      opacity: 0.3;
      z-index: 200;
    }
    .prev {
      left: 30px;
    }
    .next {
      right: 30px;
    }
  }
  .carousel1-enter-active,
  .carousel1-leave-active {
    transition: all 1s ease-in 0s;
  }
  .carousel1-enter,
  .carousel1-leave {
    opacity: 0.2;
  }
  .prevOrNext_state-enter-active,
  .prevOrNext_state-leave-active {
    transition: all 0.5s ease-in 0s;
  }
  .prevOrNext_state-enter,
  .prevOrNext_state-leave-to {
    opacity: 0.2;
  }
}

// 
@media screen and (min-width: 1025px) {
  #ice_carousel .carousel_list .carousel_item .img-block{
    width: 100%;
    max-width: 1263px;
    margin: 0 auto;
    display: flex;
    .item_img{
      width: calc(100% - 263px);
    }
    .shelves{
      flex: 0 0 263px;
      box-shadow: 1px 0 2px rgba(0, 0, 0, .2);
      text-align: center;
      padding-top: 60px;
      display: block;
      .shelves-title{
        font-size: 16px;
        margin-bottom: 10px;
        color: rgba(255, 255, 255, .8);
      }
      .shelves-img{
        width: 160px;
        height: 160px;
        border-radius: 4px;
      }
    }
  } 
}
</style>