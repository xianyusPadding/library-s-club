<template>
  <lib-main :navIndex="nav_index">
    <div id="search" class="top-border-nav">
      <div class="container">
        <Tabs value="book" :animated="false" class="art-tabs" @on-click="updata_tabs_index">
          <TabPane label="图书" name="book">
            <books-list :books="search_books" v-if="tab_index === 0"></books-list>
            <div class="page-warpper" v-if="tab_index === 0">
              <Page :total="books_count" :current="books_current" :page-size = 'book_pageSize' show-elevator @on-change="change_book_current" :style="{marginTop: books_count === 0 ? '800px' : ''}"></Page>
            </div>
          </TabPane>
          
          <TabPane label="文章" name="article">
            <articles-list :articles="search_articles" v-if="tab_index === 1"></articles-list>
            <div class="page-warpper" v-if="tab_index === 1">
              <Page :total="articles_count" :current="articles_current" :page-size = 'article_pageSize' show-elevator @on-change="change_article_current" :style="{marginTop: articles_count === 0 ? '800px' : ''}"></Page>
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
  import booksList from "~/components/booksList/booksList.vue";
  import { getCookie } from '~/common/cookie'

  export default {
    data() {
      return {
        nav_index: 6,
        search_books: [],          //图书数据
        search_articles: [],       //文章数据
        tab_index: 0,
        book_pageSize: 24,
        article_pageSize: 10,
        articles_current: 1,
        books_current: 1,
        books_count: 0,
        articles_count: 0
      };
    },
    created() {
      // this.articles_init(1, '')
    },
    mounted(){
      let search_content = getCookie('search_content')

      // this.get_books_data(search_content)
      // this.get_articles_data(search_content)
    },
    methods: {
      //更新tabs的下标
      updata_tabs_index(name){
        switch(name){
          case 'book': this.tab_index = 0;break;
          case 'article': 
            this.tab_index = 1;
            // this.articles_init(this.hot_articles_current, 'collect');
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
      change_book_current(current){
        // this.new_articles_current = current
        // this.articles_init(current, '')
      },
      change_article_current(current){
        // this.hot_articles_current = current
        // this.articles_init(current, 'collect')
      }
    },
    components: {
      libMain,
      articlesList,
      booksList
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../assets/css/color.scss";
#search {
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
