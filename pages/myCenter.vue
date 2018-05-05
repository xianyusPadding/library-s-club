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

            <div class="user-actions">
              <Button type="primary" class="action-item" @click="update_user_mess">修改个人资料</Button>
              <Button type="primary" class="action-item" @click="update_editor_state(1)">写作</Button>
            </div>
          </div>
          
          <write-article v-show="writeEditorState" @updateeditorstate="change_editor_state"></write-article>
          <div class="block-shadow my-order" v-if="buyBooks.length">
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

          <div class="block-shadow my-order" v-if="myArticles.length">
            <h2 class="dot-line-title">我的文章</h2>
            <articles-list :articles="myArticles"></articles-list>
          </div>

          <div class="block-shadow my-order">
            <h2 class="dot-line-title">我的收藏</h2>


          </div>
        </div>

        <div class="right">
          <div class="block-shadow near-read">
            <h2 class="dot-line-title">最近浏览</h2>
            <h3 class="dot-line-title2">图书：</h3>
            <ul class="read-books">
              <a :href="'/book/' + item._id" class="read-item" v-for="(item, index) in readBooks" :key="index">
                <h4 class="title text-over">{{item.title}}</h4>
                <p class="author text-over">{{item.author}}   {{item.translator}}</p>
              </a>
            </ul>

            <h3 class="dot-line-title2">文章：</h3>
            <ul class="read-articles">
              <a :href="'/article/' + item._id" class="read-item" v-for="(item, index) in readArticles" :key="index">
                <h4 class="title text-over">{{item.title}}</h4>
                <p class="author text-over">{{item.author}}</p>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </lib-main>
</template>

<script type='text/ecmascript-6'>
  import libMain from "~/components/main/main.vue";
  import writeArticle from "~/components/writeArticle/writeArticle.vue";
  import { getCookie } from '~/common/cookie'
  import articlesList from "~/components/articlesList/articlesList.vue";

  export default {
    data() {
      return {
        navIndex: 4,             //当前页的小标
        userInfo: {},            //用户信息
        buyBooks: [],            //购买的书籍
        readBooks: [],           //阅读书籍
        readArticles: [],        //阅读的文章
        writeEditorState: false, //写作编辑器的状态
        myArticles: []
      }
    },
    methods: {
      //修改个人资料
      update_user_mess(){
        let userInfo = {}
        let _this = this
        this.$Modal.confirm({
          render: h => {
            return h("ul", [
              h(
                "li",
                {
                  style: {
                    display: "flex",
                    marginBottom: "14px",
                    alignItems: "center"
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "手机号码："
                  ),
                  h("Input", {
                    props: {
                      value: this.$store.state.userMess.phone
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        userInfo.phone = val;
                      }
                    }
                  })
                ]
              ),
              h(
                "li",
                {
                  style: {
                    display: "flex",
                    marginBottom: "14px",
                    alignItems: "center"
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "密码："
                  ),
                  h("Input", {
                    props: {
                      type: 'password'
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        userInfo.pass = val;
                      }
                    }
                  })
                ]
              ),
              h(
                "li",
                {
                  style: {
                    display: "flex",
                    marginBottom: "14px",
                    alignItems: "center"
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "确认密码："
                  ),
                  h("Input", {
                    props: {
                      type: 'password'
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        userInfo._pass = val;
                      }
                    }
                  })
                ]
              ),
              h(
                "li",
                {
                  style: {
                    display: "flex",
                    marginBottom: "14px",
                    alignItems: "center"
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "个人简介："
                  ),
                  h("Input", {
                    props: {
                      value: this.$store.state.userMess.introduction ? this.$store.state.userMess.introduction : '这个人很懒，什么都没留下'
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        userInfo.introduction = val;
                      }
                    }
                  })
                ]
              ),
              h(
                "li",
                {
                  style: {
                    display: "flex",
                    marginBottom: "14px",
                    alignItems: "center"
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "图片上传："
                  ),
                  h(
                    "Upload",
                    {
                      props: {
                        type: "drag",
                        action: "/api/v0/file/upload",
                        'on-success': function (res) {
                          console.log(res)
                          if (res.ok === 0) {
                            userInfo.avater = `/images/${res.fileName}`
                          }
                        }
                      },
                      style: {
                        flex: 1
                      }
                    },
                    [
                      h("div", [
                        h("Icon", {
                          props: {
                            type: "ios-cloud-upload",
                            size: "52"
                          },
                          style: {
                            color: "#3399ff"
                          }
                        })
                      ])
                    ]
                  )
                ]
              ),
            ])
          },
          onOk: () => {
            _this.userInfo.avater = userInfo.avater
            userInfo.userId = _this.$store.state.userMess

            if(userInfo.phone){
              userInfo.phone.length != 11 ? _this.$Message.warning('手机号码格式不正确！') : ''
              return
            } else if(userInfo.pass != userInfo._pass){
              _this.$Message.warning('两次输入的密码不相同！')
              return
            } 

            if(userInfo.pass){
              userInfo.password = userInfo.pass
            }
            _this.$http.post('/api/v0/user/updateMess', userInfo).then( res => {
              if(res.data.userName){
                _this.$Message.success('修改资料成功~')
              } else {
                _this.$Message.warning('修改资料出错，请联系后台客服人员！')
              }
            }, res => {
              console.log(res)
            })
          }
        })    
      },
      //更改编辑的状态
      update_editor_state(state){
        state ? this.writeEditorState = true : this.writeEditorState = false
      },
      change_editor_state(){
        this.update_editor_state(0)
      },
      //获取用户信息
      getDetail(phone) {
        if (!phone) {
          return
        }

        this.$http.get(`/api/v0/user/detail?phone=${phone}`).then(res => {
          this.userInfo = res.data.user
          this.buyBooks = res.data.buyBooks

          let read_book_length = res.data.readBooks.length
          if( read_book_length > 10){
            this.readBooks = res.data.readBooks.slice(read_book_length - 10, read_book_length - 1)
          }else {
            this.readBooks = res.data.readBooks
          }

          let read_art_length = res.data.readArticles.length
          if( read_book_length > 10){
            this.readArticles = res.data.readArticles.slice(read_art_length - 10, read_art_length - 1)
          }else {
            this.readArticles = res.data.readArticles
          }
        }, res => {
          console.log(res)
        })
      },
      //获取我的文章
      get_my_article(current){
        let userId = getCookie('userId')

        this.$http.get(`/api/v0/articles/all?userId=${userId}&current=${current}`).then(res => {
          this.myArticles = res.data.articles
        }, res => {
          console.log(res)
        })
      }
    },
    mounted() {
      let phone = getCookie('phone') || ''
      this.getDetail(phone)
      this.get_my_article(1)
    },
    components: {
      libMain,
      writeArticle,
      articlesList
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
        position: relative;
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
        .user-actions{
          position: absolute;
          top: 20px;
          right: 20px;
          .action-item:nth-child(1){
            margin-right: 10px;
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
      .near-read{
        .dot-line-title2{
          margin: 20px 0 8px 0;
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
      .left{
        width: 100%;
        .user-about .user-actions{
          display: none;
        }
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