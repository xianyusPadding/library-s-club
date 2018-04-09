<template>
  <lib-main :navIndex="nav_index">
    <div id="articles" class="top-border-nav">
      <div class="container">
        <Tabs value="new" :animated="false" class="art-tabs" @on-click="updata_tabs_index">
          <TabPane label="最新" name="new">
            <articles-list :articles="new_articles" v-if="tab_index === 0"></articles-list>
            <div class="page-warpper" v-if="tab_index === 0">
              <Page :total="articles_count" :current="new_articles_current" :page-size = 'pageSize' show-elevator @on-change="change_new_current" :style="{marginTop: articles_count === 0 ? '800px' : ''}"></Page>
            </div>
          </TabPane>
          
          <TabPane label="热门" name="hot">
            <articles-list :articles="hot_articles" v-if="tab_index === 1"></articles-list>
            <div class="page-warpper" v-if="tab_index === 1">
              <Page :total="articles_count" :current="hot_articles_current" :page-size = 'pageSize' show-elevator @on-change="change_hot_current" :style="{marginTop: articles_count === 0 ? '800px' : ''}"></Page>
            </div>
          </TabPane>

          <TabPane label="推荐" name="recommend">
            <articles-list :articles="recommend_articles" v-if="tab_index === 2"></articles-list>
            <div class="page-warpper" v-if="tab_index === 2">
              <Page :total="articles_count" :current="recommend_articles_current" :page-size = 'pageSize' show-elevator @on-change="change_recommend_current" :style="{marginTop: articles_count === 0 ? '800px' : ''}"></Page>
            </div>
          </TabPane>
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
        new_articles: [],          //图书数据
        hot_articles: [],
        recommend_articles: [],
        tab_index: 0,
        articles_count: 0,
        pageSize: 10,
        new_articles_current: 1,
        hot_articles_current: 1,
        recommend_articles_current: 1,
      };
    },
    created() {
      this.articles_init(1, '')
    },
    methods: {
      //更新tabs的下标
      updata_tabs_index(name){
        switch(name){
          case 'new': this.tab_index = 0;break;
          case 'hot': 
            this.tab_index = 1;
            this.articles_init(this.hot_articles_current, 'collect');
            break;
          case 'recommend': 
            this.tab_index = 2;
            this.articles_init(this.recommend_articles_current, 'recommend');
            break;
          default: this.tab_index = 0;break;
        }
      },
      //初始化文章
      articles_init(current, sort) {
        this.$http.get(`/api/v0/articles/all?pageSize=${this.pageSize}&easyState=1&sort=${sort}&currPage=${current}`).then((res) => {
          if(res.status === 200){
            if(sort === ''){
              this.new_articles = res.data.articles || []
              this.articles_count = res.data.count
            }else if(sort === 'collect'){
              this.hot_articles = res.data.articles || []
            }else if(sort === 'recommend'){
              this.recommend_articles = res.data.articles || []
            }
          }
        }, (res) => {
          console.log(res)
        })
      },
      change_new_current(current){
        this.new_articles_current = current
        this.articles_init(current, '')
      },
      change_hot_current(current){
        this.hot_articles_current = current
        this.articles_init(current, 'collect')
      },
      change_recommend_current(current){
        this.recommend_articles_current = current
        this.articles_init(current, 'recommend')
      }
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
    .page-warpper{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
