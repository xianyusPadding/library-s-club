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

          <div class="block-shadow">

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
    },
    created() {
      this.get_article_id()
    },
    mounted() {
      this.get_userActionMess()
      this.article_action('read', 0)
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
