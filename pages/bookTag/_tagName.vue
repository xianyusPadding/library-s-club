<template>
  <lib-main>
    <div id="book">
      <div class="container">
        <div></div>
      </div>
    </div>
  </lib-main>
</template>

<script type='text/ecmascript-6'>
  import libMain from "~/components/main/main.vue";
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
      const tagName = this.$route.params
      console.log(tagName)
    },
    components: {
      libMain
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
#book {
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    display: flex;
    justify-content: space-between;
  }
  .left {
    width: 75%;
  }
  .right {
    width: 23%;
    margin-bottom: 200px;
  }
}
@media screen and (max-width: 768px) {
  #book {
    .container {
      display: block;
      .left,
      .right {
        width: 100%;
      }
    }
  }
  .block-shadow {
    box-shadow: none;
    padding: 0 14px;
  }
}
</style>
