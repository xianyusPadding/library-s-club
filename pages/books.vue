<template>
  <lib-main :navIndex="nav_index">
    <div id="books" class="top-border-nav">
      <div class="container">
        <Tabs value="new" :animated="false" @on-click="updata_tabs_index">
          <TabPane label="最新" name="new">
            <books-list :books="new_books" v-if="tab_index === 0"></books-list>
            <div class="page-warpper" v-if="tab_index === 0">
              <Page :total="books_count" :current="new_books_current" :page-size = '24' show-elevator @on-change="change_new_current" :style="{marginTop: books_count === 0 ? '800px' : ''}"></Page>
            </div>
          </TabPane>
          
          <TabPane label="热门" name="hot">
            <books-list :books="hot_books" v-if="tab_index === 1"></books-list>
            <div class="page-warpper" v-if="tab_index === 1">
              <Page :total="books_count" :current="hot_books_current" :page-size = '24' show-elevator @on-change="change_hot_current" :style="{marginTop: books_count === 0 ? '800px' : ''}"></Page>
            </div>
          </TabPane>
          <TabPane label="推荐" name="recommend">
            <books-list :books="recommend_books" v-if="tab_index === 2"></books-list>
            <div class="page-warpper" v-if="tab_index === 2">
              <Page :total="books_count" :current="recommend_books_current" :page-size = '24' show-elevator @on-change="change_recommend_current" :style="{marginTop: books_count === 0 ? '800px' : ''}"></Page>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </lib-main>
</template>

<script>
  import libMain from "~/components/main/main.vue";
  import booksList from "~/components/booksList/booksList.vue";

  export default {
    data() {
      return {
        nav_index: 1,
        new_books: [],          //新书数据
        hot_books: [],          //热门图书数据
        recommend_books: [],    //推荐图书数据
        books_count: 0,         //图书的数量
        tab_index: 0,           //tab的选中项
        new_books_current: 1,   //图书页的页码
        hot_books_current: 1,
        recommend_books_current: 1,
      };
    },
    created() {
      this.new_books_init(1)
    },
    methods: {
      updata_tabs_index(name){
        switch(name){
          case 'new': this.tab_index = 0;break;
          case 'hot': 
            this.tab_index = 1;
            this.hot_books_init(this.hot_books_current);
            break;
          case 'recommend': 
            this.tab_index = 2;
            this.recommend_books_init(this.hot_books_current);
            break;
          default: this.tab_index = 0;break;
        }
      },
      //初始化新书
      new_books_init(currPage) {
        this.$http.get(`/api/v0/books/all?pageSize=24&easyState=1&currPage=${currPage}`).then((res) => {
          if(res.status === 200){
            this.new_books = res.data.books
            this.books_count = res.data.count
          }
        }, (res) => {
          console.log(res)
        })
      },
      //初始化热门图书
      hot_books_init(currPage) {
        this.$http.get(`/api/v0/books/all?pageSize=24&easyState=1&sort=read&currPage=${currPage}`).then((res) => {
          if(res.status === 200){
            this.hot_books = res.data.books
          }
        }, (res) => {
          console.log(res)
        })
      },
      //初始化推荐图书
      recommend_books_init(currPage) {
        this.$http.get(`/api/v0/books/all?pageSize=24&easyState=1&sort=recommend&currPage=${currPage}`).then((res) => {
          if(res.status === 200){
            this.recommend_books = res.data.books
          }
        }, (res) => {
          console.log(res)
        })
      },
      change_new_current(current){
        this.new_books_current = current
        this.new_books_init(current)
      },
      change_hot_current(current){
        this.hot_books_current = current
        this.hot_books_init(current)
      },
      change_recommend_current(current){
        this.recommend_books_current = current
        this.recommend_books_init(current)
      },
    },
    components: {
      libMain,
      booksList
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../assets/css/color.scss";
#books {
  width: 100%;
  margin-bottom: 50px;
  .container{
    width: 100%;
    max-width: 1263px;
    margin: 0 auto; 
    .page-warpper{
      display: flex;
      justify-content: flex-end;
    }
  }
}

</style>
