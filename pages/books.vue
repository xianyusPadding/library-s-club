<template>
  <lib-main :navIndex="nav_index">
    <div id="books" class="top-border-nav">
      <div class="container">
        <Tabs value="new" :animated="false">
          <TabPane label="最新" name="new">
            <books-list :books="new_books"></books-list>
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
  import booksList from "~/components/booksList/booksList.vue";

  export default {
    data() {
      return {
        nav_index: 1,
        new_books: [],          //图书数据
      };
    },
    created() {
      this.new_books_init()
    },
    methods: {
      //初始化图书
      new_books_init() {
        // for (let i = 0; i < 120; i++) {
        //   let book = {
        //     id: i,
        //     name: 'name' + i,
        //     author: 'author' + i,
        //     translators: 'translators' + i
        //   }
        //   this.new_books.push(book)
        // }

        this.$http.get('/api/v0/books/all?pageSize=24&easyState=1').then((res) => {
          if(res.status === 200){
            this.new_books = this.new_books.concat(res.data.books)
          }
        }, (res) => {
          console.log(res)
        })
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
  }
}
</style>
