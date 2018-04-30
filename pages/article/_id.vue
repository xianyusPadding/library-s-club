<template>
  <lib-main>
    <div id="article">
      <div class="container">
        <div class="left">
          <h2 class="title">{{article_data.title}}</h2>
          <div class="about">
            <span class="autor">{{article_data.author}}</span>
            <span class="time">发表于{{article_data.writeTime}}</span>
            <span class="read-num">{{article_data.read_num}}阅读</span>
          </div>
          <div class="markdown-body block-shadow" v-html="article_data.content"></div>

          <div class="block-shadow article-comment">
            <h3 class="dot-line-title">评论</h3>
            <div class="content">　　
              <ul class="comment-wrapper">
                <li class="comment-item" v-for="(item, index) in commentData" :key="item._id">
                  <img class="avater" :src="item.user.avater" alt="">
                  <div class="about">
                    <span class="name">{{ item.user.name }}&nbsp;-&nbsp;</span>
                    <span class="time">{{ item.meta.createdAt.slice(0, 10) }}</span>
                    <p class="content">{{ item.content }}</p>
                    <a v-if="!item.reply.length" @click="getReply(index)" href="javascript:void(0)" class="watch-reply">查看回复</a>
                    <!-- <span>{{item.reply}}</span> -->
                    <a @click="addReply(index)" href="javascript:void(0)" class="add-reply">回复</a>

                    <ul class="reply-wrapper">
                      <li class="reply-item" v-for="(replyItem, replyIndex) in item.reply" :key="replyIndex">
                        <img class="avater" :src="replyItem.user.avater" alt="">
                        <div class="about">
                          <span class="name">{{ replyItem.user.name }}&nbsp;-&nbsp;</span>
                          <span class="time">{{ replyItem.meta.createdAt.slice(0, 10) }}</span>
                          <p class="content">{{ replyItem.content }}</p>
                        </div>
                      </li> 
                    </ul> 
                  </div>
                </li>
              </ul>
            </div>

            <div class="myComment">
              <img class="avater" :src="$store.state.userMess.avater" alt="">
              <i-Input v-model="myComment" type="textarea" :rows="4" placeholder="文明社会，理性评论"></i-Input>
            </div>
            <Button type="primary" class="addComment" @click="addComment(0)">发表评论</Button>
          </div>
        </div>

        <div class="right">
          <div class="block-shadow">
            <h3 class="dot-line-title">作者：</h3>
            <div class="auther-mess">
              <img class="avater" :src="article_data.avater" alt="">
              <span class="author">{{article_data.author}}</span>
            </div>

            <div class="actios">
              <div class="recommend" :class="recomend_state ? 'active' : ''" @click="article_action('recommend', recomend_state)">
                <span class="text">推荐</span>|<span class="num">{{article_data.recommend_num}}</span>
              </div>
              <div class="collect" :class="collect_state ? 'active' : ''" @click="article_action('collect', collect_state)">
                <span class="text">收藏</span>|<span class="num">{{article_data.collection_num}}</span>
              </div>
            </div>
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
        article_id: '',
        article_data: {},             //文章数据
        recomend_state: 0,            //文章的收藏和推荐状态
        collect_state: 0,
        myComment: '',                //我的评论
        commentData: [],              //评论数据
        commentType: 1,               //评论的类别 0->图书 1->文章
      }
    },
    methods: {
      //获取图书id
      get_article_id() {
        let id = this.$route.params.id

        this.article_id = id
        this.get_article_data(id)
      },
      //获取图书数据
      get_article_data(id) {
        this.$http.get(`/api/v0/articles/detail/${id}`).then((res) => {
          if (res.status === 200) {
            this.article_data = res.data.article
          }
        }, (res) => {
          console.log(res)
        })

      },
      //获取用户对文章的状态 是否购买等
      get_userActionMess() {
        let phone = getCookie('phone') || ''
        let articleId = this.article_id || ''

        if (!phone || !articleId) {
          return
        }

        this.$http.get(`/api/v0/user/article/actionState?phone=${phone}&articleId=${articleId}`).then(res => {
          this.recomend_state = res.data.recomend_state
          this.collect_state = res.data.collect_state
        }, res => {
          console.log(res)
        })
      },
      //对文章进行推荐、阅读、收藏等操作
      article_action(Action, state = 1) {
        let phone = getCookie('phone')
        let action = Action
        let articleId = this.article_id

        if (state) {
          return
        }
        if (!phone) {
          this.$Message.warning('请先登录');
        }
        if (action === 'recommend' && this.recomend_state === 1) {
          return
        }
        if (action === 'collect' && this.collect_state === 1) {
          return
        }
        this.$http.get(`/api/v0/user/article/actions?phone=${phone}&action=${action}&articleId=${articleId}`).then(res => {
          if (res.data.code === 0) {
            if (action === 'recommend') {
              this.recomend_state = 1
              this.$Message.success(`推荐成功`)
              this.article_data.recommend_num = this.article_data.recommend_num + 1
            } else if (action === 'collect') {
              this.collect_state = 1
              this.$Message.success(`收藏成功`)
              this.article_data.collection_num = this.article_data.collection_num + 1
            } else if (action === 'read') {
              this.article_data.read_num = this.article_data.read_num + 1
            }
          }

        }, res => {
          console.log(res)
        })
      },
      //新增评论
      addComment(pid, content, index){
        let _content = content ? content : this.myComment
        
        if(this.$store.state.userMess._id){
          this.$Message.warning('请先登录')
          return
        }
        
        if(_content.length < 8){
          this.$Message.warning('评论不得少于8个字')
          return
        }

        let params = {
          uid: this.$store.state.userMess._id,
          content: _content,
          pid: pid,
          aid: this.article_id,
          type: 0
        }

        this.$http.post('/api/v0/comment/addComment', params).then( res => {
          if(res.data.ok === 0){
            let data = res.data.data

            if(pid === 0){
              this.$Message.success('发表成功')
              data.reply = []
              this.commentData.unshift(data)
            }
            else{
              this.$Message.success('回复成功')
              this.commentData[index].content = this.commentData[index].content + ' '
              this.commentData[index].reply.unshift(data)
            }
            
          }else{
            this.$Message.warning('发表失败，请联系后台人员处理')
          }
        }, res => {
          console.log(res)
        })
      },
      //获取评论
      getComment(pid, aid){
        this.$http.get(`/api/v0/comment/allComments?type=${this.commentType}&pid=${pid}&aid=${aid}`).then( res => {
          if(res.data.ok === 0){
            this.commentData = res.data.comments
            if(pid === 0){
              this.commentData.forEach( val => {
                val.reply = []
              })
            }
          }
        }, res => {
          console.log(res)
        })
      },
      //添加回复
      addReply(index){
        let pid = this.commentData[index]._id
        let content = ''

        this.$Modal.confirm({
          okText: '提交评论',
          render: (h) => {
            return h('ul', {
              style: {
                width: '100%'
              }
            }, [
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
                  h("Input", {
                    props: {
                      type: 'textarea',
                      rows: 5,
                      placeholder: '文明社会，理性评论'
                    },
                    on: {
                      input: val => {
                        content = val;
                      }
                    }
                  })
                ]
              )
            ])
          },
          onOk: () => {
            this.addComment(pid, content, index)
          }
        })   
      },
      //获取当前评论的
      getReply(index){
        let aid = this.article_id
        let pid = this.commentData[index]._id
        
        this.$http.get(`/api/v0/comment/allComments?type=${this.commentType}&pid=${pid}&aid=${aid}`).then( res => {
          if(res.data.ok === 0){
            if(pid != 0){
              this.commentData[index].content = this.commentData[index].content + ' '
              this.commentData[index].reply = res.data.comments
            }
          }
        }, res => {
          console.log(res)
        })
      }
    },
    created() {
      this.get_article_id()
    },
    mounted() {
      this.get_userActionMess()
      this.article_action('read', 0)
      this.getComment(0, this.article_id)
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
    .title {
      font-size: 28px;
      color: $mainC;
    }
    .about {
      margin-bottom: 30px;
      .autor {
        color: $deepC;
        margin-right: 10px;
      }
      .read-num {
        margin-left: 10px;
      }
    }
    .article-comment{
      width: 100%;
      padding-bottom: 55px;
      .content{
        .comment-item, .reply-item{
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
          .avater{
            width: 35px;
            height: 35px;
            display: inline-flex;
            margin-right: 20px;
            background-color: #eee;
            border-radius: 50%;
          }
          .about{
            flex: 1;
            .name{
              font-size: 14px;
              color: $mainC;
            }
            .content{
              font-size: 14px;
              color: #657180;
            }
            .watch-reply{
              display: inline-block;
              margin: 5px 10px 0 0;
            }
            .add-reply{
              display: inline-block;
              margin-top: 5px;
            }
          }
        }
        .reply-item{
          margin-top: 14px;
          .avater{
            width: 30px;
            height: 30px;

          }
        }
      }
      .myComment{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .avater{
          width: 50px;
          height: 50px;
          display: inline-flex;
          margin-right: 20px;
          background-color: #eee;
          border-radius: 4px;
        }
      }
      .addComment{
        float: right;
        margin-top: 10px;
      }
    }
  }
  .right {
    width: 23%;
    margin-bottom: 200px;
    .auther-mess {
      display: flex;
      justify-content: flex-start;
    }
    .avater {
      width: 70px;
      height: 70px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-right: 14px;
    }
    .author {
      color: $mainC;
      font-size: 16px;
    }
    .actios {
      margin-top: 20px;
      .recommend,
      .collect {
        cursor: pointer;
        display: inline-block;
        margin-right: 5px;
        padding: 4px 5px;
        border-radius: 4px;
        background-color: #eee;
        color: $deepC;
        .text {
          margin-right: 2px;
        }
        .num {
          margin-left: 2px;
        }
      }
      .active{
        background-color: #ddd;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      }
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
