<template>
  <lib-main :navIndex="navIndex">
    <div id="person">
      <div class="container">
        <div class="left">
          <div class="block-shadow user-about">
            <img class="user-avater" :src="userInfo.avater" alt="">
            <div class="user-detail">
              <p class="name">{{userInfo.userName}}</p>
              <p class="createDate">社区生日：{{ userInfo.meta ? userInfo.meta.createdAt.substring(0, 10) : '2018-04-10' }}</p>
              <p class="myIntroduction">个人简介：{{userInfo.introduction ? userInfo.introduction : '这个人很懒，什么都没留下'}}~</p>
            </div>
          </div>

          <div class="block-shadow my-order">
            <h2 class="dot-line-title">已购买书籍</h2>
            <Row class="block-books">
              <i-col :lg="4" :md="6" :sm="6" :xs="12" class="block-book" v-for="item in buyBooks" :key="item._id">
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
          </div>

          <div class="block-shadow my-order">
            <h2 class="dot-line-title">我的文章</h2>
          </div>
        </div>

        <div class="right">
          <div class="block-shadow near-read-book">
            <h2 class="dot-line-title">最近浏览</h2>
            <h3 class="dot-line-title2">图书：</h3>
            <ul class="read-books">
              <a :href="'/book/' + item._id" class="read-item" v-for="(item, index) in readBooks" :key="index">
                <h4 class="title text-over">{{item.title}}</h4>
                <p class="author text-over">{{item.author}}   {{item.translator}}</p>
              </a>
            </ul>

            <h3 class="dot-line-title2">文章：</h3>
          </div>
        </div>
      </div>
    </div>
  </lib-main>
</template>

<script type='text/ecmascript-6'>
  import libMain from "~/components/main/main.vue";
  import { getCookie } from '~/common/cookie'

  export default {
    data() {
      return {
        navIndex: 4,             //当前页的小标
        userInfo: {},            //用户信息
        buyBooks: [],            //购买的书籍
        readBooks: [],           //阅读书籍
      }
    },
    methods: {
      //获取用户信息
      getDetail(phone) {
        if (!phone) {
          return
        }

        this.$http.get(`/api/v0/user/detail?phone=${phone}`).then(res => {
          this.userInfo = res.data.user
          this.buyBooks = res.data.buyBooks

          let read_length = res.data.readBooks.length
          if( read_length > 10){
            this.readBooks = res.data.readBooks.slice(read_length - 10, read_length - 1)
          }else {
            this.readBooks = res.data.readBooks
          }
        }, res => {
          console.log(res)
        })
      }
    },
    mounted() {
      let phone = getCookie('phone') || ''
      this.getDetail(phone)
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
    display: flex;
    justify-content: space-between;
    .left {
      width: 75%;
      .user-about {
        width: 100%;
        display: flex;
        .user-avater {
          width: 100px;
          height: 100px;
          border-radius: 4px;
          box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
          margin-right: 20px;
        }
        .user-detail {
          .name {
            font-size: 18px;
          }
          .createDate {
            margin: 20px 0 14px 0;
          }
        }
      }
      .my-order {
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
            .detail-block {
              width: 115px;
              margin: 0 auto;
              .name,
              .author,
              .translators {
                text-align: left;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .right {
      width: 23%;
      margin-bottom: 200px;
      .near-read-book{
        .dot-line-title2{
          margin: 4px 0 8px 0;
        }
        .read-item{
          display: block;
          margin-bottom: 10px;
          .title {
            text-indent: 13px;
          }
          .author {
            text-indent: 13px;
          }
        }
      }
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