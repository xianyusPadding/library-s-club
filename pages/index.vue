<template>
  <div id="index">
    <navbar-pc v-if="device === 0"></navbar-pc>
    <l-carousel :carousel-data="carouselData" :duration="duration" v-show="true" style="display:none"></l-carousel>
    <navbar-moblie class="fixed-footer" v-if="device === 1"></navbar-moblie>
  </div>
</template>

<script>
import navbarPc from "~/components/navbar/navbar_pc.vue";
import navbarMoblie from "~/components/navbar/navbar_mobile.vue";
import lCarousel from "~/components/lCarousel/lCarousel.vue";

export default {
  data() {
    return {
      device: 2,            //获取设备信息：pc：0、mobile：1
      carouselData: [       //走马灯banner的数据
        {
          id: 0,
          url: '',
          back_color: '#027148',
          light: 1
        },
        {
          id: 1,
          url: '', 
          back_color: '#009a61',
          light: 1
        },
        {
          id: 2,
          url: '',
          back_color: '#02BB76',
          light: 0
        }
      ],
      duration: 4000
    };
  },
  mounted() {
    this.device_init()
  },
  methods: {
    //获取当前设备：pc端、移动端
    device_init() {
      let body_width = document.body.clientWidth;

      body_width > 400 ? (this.device = 0) : (this.device = 1);
    }
  },
  components: {
    navbarPc,
    navbarMoblie,
    lCarousel
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
#index {
  .fixed-footer {
    position: fixed;
    bottom: 0;
  }
}
</style>
