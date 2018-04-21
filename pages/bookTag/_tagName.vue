<template>
  <lib-main>
    <div id="book">
      <div class="container">
        <div class="left">
          <div class="books-list block-shadow">
            <h2 class="dot-line-title">分类图书</h2>          
            <Row class="block-books">
              <i-col :lg="4" :md="6" :sm="6" :xs="12" class="block-book" v-for="item in books_data"  :key="item.id">
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
        </div>

        <div class="right">
          <div class="books-list block-shadow">
            <h2 class="dot-line-title">所有分类</h2>   
            <a :href="'/bookTag/' + item.name" class="tag" v-for="item in all_tags" :key="item._id">
              {{ item.name }}
            </a>
            <div class="more" v-if="tags_count / tag_pageSize  > tag_current" @click="more('tag')">查看更多...</div>
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
        books_data: [],
        book_pageSize: 12,
        books_current: 1,
        books_count: 0,
        all_tags: [],
        tag_pageSize: 40,
        tag_current: 1,
        tags_count: 0,
        more_book_state: true,
        more_tag_state: true,
        tagName: ''
      }
    },
    methods: {
      get_book_data(tagName){
         this.$http.get(`/api/v0/books/all?pageSize=${this.book_pageSize}&easyState=1&currPage=${this.books_current}&tagName=${this.tagName}`).then(res => {
          this.books_data = this.books_data.concat(res.data.books)
          this.books_count = res.data.count
          this.more_book_state = true
        }, res => {
          console.log(res)
        })
      },
      get_all_tags(){
        this.$http.get(`/api/v0/books/allTags?pageSize=${this.tag_pageSize}&currPage=${this.tag_current}`).then(res => {
          this.all_tags = this.all_tags.concat(res.data.tags)
          this.tags_count = res.data.count
          this.more_tag_state = true
        }, res => {
          console.log(res)
        })
      },
      //查看更多
      more(type){
        if(!this.more_book_state || !this.more_tag_state){            
          this.$Message.warning('请不要多次点击')
          return
        }

        if(type === 'book' && this.more_book_state){
          this.books_current++
          this.more_book_state = false
          this.get_book_data()
        }else if(type === 'tag' && this.more_tag_state){
          this.tags_current++
          this.more_tag_state = false
          this.get_all_tags()
        }
      }
    },
    created() {
    },
    mounted(){
      this.tagName = this.$route.params.tagName
      this.get_book_data()
      this.get_all_tags()
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
  .left {
    width: 75%;
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
  }
  .right {
    width: 23%;
    margin-bottom: 200px;
    .tag{
      display: inline-block;
      padding: 2px 6px 2px 3px;
      margin: 0 10px 10px 0;
      background-color: $mainC;
      color: #fff;
      border-bottom-right-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
      box-shadow: 0 1px 1px 1px $deepC;
    }
  }
}
@media screen and (max-width: 768px) {
  #book {
    .container {
      display: flex;
      flex-flow: row wrap;
      .left{
        width: 100%;
      }
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
