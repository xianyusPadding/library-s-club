<template>
  <div class="main">
    <!-- pc的navbar -->
    <navbar-pc v-if="device === 0" :nav-index="navIndex" :body-width="body_width" :login-state="login_state" @updataloginstate="updata_login_state"></navbar-pc>

    <!-- mobile端的header -->
    <header-mobile v-if="device === 1" :login-state="login_state" @updataloginstate="updata_login_state"></header-mobile>

    <slot></slot>

    <!-- mobile端的navbar -->
    <navbar-moblie class="fixed-footer" :nav-index="navIndex"  v-if="device === 1" ></navbar-moblie>

    <!-- pc端的navbar -->
    <div class="pc-footer" :nav-index="navIndex"  v-if="device === 0" >
      <p class="text">©2018 feilong</p>
    </div>
    
  </div>
</template>

<script>
  import navbarPc from "~/components/navbar/navbar_pc.vue";
  import headerMobile from "~/components/headerMobile/headerMobile.vue";
  import navbarMoblie from "~/components/navbar/navbar_mobile.vue";
  import { getCookie } from '~/common/cookie'

  export default {
    props: {
      navIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        device: 2,                   //获取设备信息：pc：0、mobile：1
        body_size: '',               //窗口的大小
        login_state: 0,              //登陆状态
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
      this.login_init()
    },
    methods: {
      //登陆判断
      login_init(){
        let phone = getCookie('phone')
        let password = getCookie('password')

        if(phone && password){
          this.$http.get(`/api/v0/user/loginState?phone=${phone}&password=${password}`).then((res) => {
            if(res.data.loginState === 1){
              this.login_state = 1
            }
          }, (res) => {
            console.log(res)
          })
        }
      },
      updata_login_state(loginState){
        this.login_state = loginState
      },
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
      }
    },
    components: {
      navbarPc,
      headerMobile,
      navbarMoblie
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
  .main{
    .fixed-footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      .text{
        width: 100%;
        display: block;
        max-width: 1263px;
        line-height: 50px;
        font-size: 16px;
        margin: 0 auto;
      }
    }
    .pc-footer {
      width: 100%;
      margin-top: 50px;
      box-shadow: inset 0 1px 0 $mainC; 
      .text{
        width: 100%;
        display: block;
        max-width: 1263px;
        line-height: 50px;
        font-size: 16px;
        margin: 0 auto; 
      }
    }
  }
</style>
