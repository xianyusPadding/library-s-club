<template>
  <lib-main>
    <div id="article">
      <div class="container">
        <div class="left">
          <h2 class="title">{{article_data.title}}</h2>
          <div class="about">
            <span class="autor">{{article_data.author}}</span>
            <span class="time">发表于{{article_data.writeTime}}</span>
          </div>

          <div class="markdown-body block-shadow" v-html="article_data.content"></div>
        </div>

        <div class="right">
          <div class="block-shadow">
            <h3 class="dot-line-title">作者：</h3>
            <div class="auther-mess">
              <img class="avater" :src="article_data.avater" alt="">
              <span class="author">{{article_data.author}}</span>
            </div>
          </div>
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
        article_data: {}
      }
    },
    methods: {
      //获取图书id
      get_article_id() {
        let id = this.$route.params.id

        this.article_id = id
        this.get_article_data(id)
      },
      //生成假数据
      get_article_data(id) {
        this.$http.get(`/api/v0/articles/detail/${id}`).then((res) => {
          if(res.status === 200){
            this.article_data =  res.data.article
          }
        }, (res) => {
          console.log(res)
        })
        
      }
    },
    created() {
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
      color: $mainC;
    }
    .about{
      margin-bottom: 30px;
      .autor{
        color: $deepC;
        margin-right: 10px;
      }
    }
  }
  .right {
    width: 23%;
    margin-bottom: 200px;
     .auther-mess{
       display: flex;
       justify-content: flex-start;
     }
    .avater{
      width: 70px;
      height: 70px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-right: 14px;
    }
    .author{
      color: $mainC;
      font-size: 16px;
    }
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
