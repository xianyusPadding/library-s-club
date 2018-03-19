<template>
  <lib-main>
    <div id="article">
      <div class="container">
        <div class="left">
          <h2 class="title">{{article_data.title}}</h2>
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
        article_id: '',
        article_data: {
          id: '',
          title: '',
          author: '',
          intor: ''
        }
      }
    },
    methods: {
      //校验路由加载是否正确
      validate({ id }) {
        return /^\d+$/.test(id)
      },
      //获取图书id
      get_article_id() {
        let pathname = location.pathname
        let id = pathname.split('/article/')[1]

        this.article_id = this.validate(id) ? id : ''

        this.get_article_data(id)
      },
      //生成假数据
      get_article_data(id) {
        this.article_data = {
          id: id,
          title: 'title' + id,
          author: 'author' + id,
          intor: 'intor' + id
        }
      }
    },
    mounted() {
      this.get_article_id()
    },
    components: {
      libMain
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
#article {
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    display: flex;
    justify-content: space-between;
  }
  .left {
    width: 75%;
    .title{
      font-size: 28px;
    }
  }
  .right {
    width: 23%;
    margin-bottom: 200px;
  }
}
@media screen and (max-width: 768px) {
  #article {
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
