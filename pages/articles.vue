<template>
  <lib-main :navIndex="nav_index">
    <div id="articles" class="top-border-nav">
      <div class="container">
        <Tabs value="new" :animated="false" class="art-tabs">
          <TabPane label="最新" name="new">
            <articles-list :articles="articles"></articles-list>
          </TabPane>
          
          <TabPane label="热门" name="hot">标签二的内容</TabPane>
          <TabPane label="推荐" name="recommend">标签三的内容</TabPane>
        </Tabs>
      </div>
    </div>
  </lib-main>
</template>

<script>
  import libMain from "~/components/main/main.vue";
  import articlesList from "~/components/articlesList/articlesList.vue";

  export default {
    data() {
      return {
        nav_index: 2,
        articles: [],          //图书数据
      };
    },
    created() {
      this.articles_init()
    },
    methods: {
      //初始化文章
      articles_init() {
        for (let i = 1; i <= 10; i++) {
          let article = {
            id: i,
            title: 'title' + i,
            author: 'author' + i,
            content: 'content' + i,
            time: '2018/03/09',
            rec_state: 0
          }
          this.articles.push(article)
        }
      },
    },
    components: {
      libMain,
      articlesList
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../assets/css/color.scss";
#articles {
  width: 100%;
  margin-bottom: 50px;
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 0 auto;
    .art-tabs{
      .ivu-tabs-tabpane{
        padding: 0 14px;
      }
    }
  }
}
</style>
