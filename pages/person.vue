<template>
  <lib-main>
    <div id="person">
      <div class="container">
        <div class="left">
          <Row class="per-header">

          </Row>
          
        </div>

        <div class="right">

        </div>
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
    mounted() {
    },
    components: {
      libMain
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../assets/css/color.scss";
#person {
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    .left {
      width: 75%;
      .per-name {
        font-size: 28px;
      }
    }
    .right {
      width: 23%;
      margin-bottom: 200px;
    }
  }
}
@media screen and (max-width: 768px) {
  #person {
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