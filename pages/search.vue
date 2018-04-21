<template>
  <lib-main :navIndex="nav_index">
    <div id="search" class="top-border-nav">
      <div class="container">
        <div class="left">
          <div class="books-list block-shadow">
            <h2 class="dot-line-title">图书</h2>     
            <div class="empty" v-if="!search_books.length">没有搜索到相关图书信息</div>     
            <Row class="block-books" v-if="search_books.length">
              <!-- v-show="index >= (book_page - 1) * page_size && index < book_page * book_page_size" -->
              <i-col :lg="3" :md="4" :sm="6" :xs="12" class="block-book" v-for="item in search_books"  :key="item.id">
                <a :href="'/book/' + item._id">
                  <img class="book-img" :src="item.img_url" alt="">
                  <div class="detail-block">
                    <div class="name text-over">{{item.title}}</div>
                    <div class="author text-over">{{item.author}}</div>
                    <div class="translators text-over">{{item.translator}}</div>
                  </div>
                </a> 
              </i-col>
            </Row>
            <div class="more" v-if="books_count / book_pageSize  > books_current" @click="more('book')">查看更多...</div>
          </div>

          <div class="articles-list block-shadow">
            <h2 class="dot-line-title">文章</h2>          
            <div class="empty" v-if="!search_books.length">没有搜索到相关文章信息</div>     
            <articles-list :articles="search_articles" v-if="search_articles.length"></articles-list>
            <div class="more" v-if="articles_count / article_pageSize  > articles_current" @click="more('article')">查看更多...</div>
          </div>
        </div>
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
        tab_index: 0,
        search_books: [],          //图书数据
        book_pageSize: 16,
        books_current: 1,
        books_count: 0,
        search_articles: [],       //文章数据
        article_pageSize: 10,
        articles_current: 1,
        articles_count: 0,
        search_content: '',       //搜索的关键字
        more_book_state: true,    //加载更多的按钮是否可以点击
        more_article_state: true,
      };
    },
    created() {
      // this.articles_init(1, '')
    },
    mounted() {
      this.search_content = getCookie('search_content')

      this.get_books_data()
      this.get_articles_data()
    },
    methods: {
      //获取图书信息
      get_books_data(){
        this.$http.get(`/api/v0/books/all?pageSize=${this.book_pageSize}&easyState=1&currPage=${this.books_current}&search_content=${this.search_content}`).then(res => {
          this.search_books = this.search_books.concat(res.data.books)
          this.books_count = res.data.count
          this.more_book_state = true
        }, res => {
          console.log(res)
        })
      },
      //获取文章信息
      get_articles_data(){
        this.$http.get(`/api/v0/articles/all?pageSize=${this.article_pageSize}&easyState=1&currPage=${this.articles_current}&search_content=${this.search_content}`).then(res => {
          
          this.search_articles = this.search_articles.concat(res.data.articles)
          this.articles_count = res.data.count
          this.more_article_state = true
        }, res => {
          console.log(res)
        })
      },
      //查看更多
      more(type){
        if(!this.more_book_state || !this.more_article_state){            this.$Message.warning('请不要多次点击')
          return
        }

        if(type === 'book' && this.more_book_state){
          this.books_current++
          this.more_book_state = false
          this.get_books_data()
        }else if(type === 'article' && this.more_article_state){
          this.articles_current++
          this.more_article_state = false
          this.get_articles_data()
        }
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
    display: flex;
    justify-content: space-between;
    .left {
      width: 100%;
      .block-books {
        width: 100%;
        padding-top: 14px;
        .block-book {
          padding-bottom: 14px;
          text-align: center;
          .book-img {
            width: 115px;
            height: 154px;
            display: inline-block;
            background-color: $mainC;
            border-radius: 4px;
          }
          .detail-block{
            width: 115px;
            margin: 0 auto;
            .name, .author, .translators{
              text-align: left;
              font-size: 14px;
            }
          }
        }
      }
      .more{
        width: 120px;
        margin: 20px auto 0 auto;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        background-color: $shallowC;
        color: #fff;
        cursor: pointer;
        &:hover{
         box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25) 
        }
      }
    }
    .right{
      width: 23%
    }
    .empty{
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
      font-weight: bold;
    }
  }
}
@media screen and (max-width: 768px) {
  #index {
    .container {
      .row {
        display: block;
        .left,
        .right {
          width: 100%;
        }
        .left {
          .iconWrapper {
            top: -2px;
          }
        }
      }
    }
  }
  .block-shadow {
    box-shadow: none;
    padding: 0 14px;
  }
}
</style>
