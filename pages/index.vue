<template>
  <div id="index">
    <navbar-pc v-if="device === 0"></navbar-pc>
    
    <navbar-moblie class="fixed-footer" v-if="device === 1"></navbar-moblie>
  </div>
</template>

<script>
import navbarPc from "~/components/navbar/navbar_pc.vue";
import navbarMoblie from "~/components/navbar/navbar_mobile.vue";

export default {
  data() {
    return {
      device: 2,     //获取设备信息：pc：0、mobile：1
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
    navbarMoblie
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
