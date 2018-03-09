<template>
  <ul class="article-wrapper">
    <li class="article-item" v-for="(item, index) in articles" :key="item.id">
      <img class="avater" src="" alt="">
      <div class="article-center">
        <h3 class="title">{{item.title}}</h3>
        <div>
          <p class="content">{{item.content}}</p>
          <span class="author">{{item.author}}</span>
          <span class="time">发表于{{item.time}}</span>
        </div>
      </div>
      <div class="article-right" :class="{ active: item.rec_state }" @click="updata_rec_state(index)">
        <Icon :type="item.rec_state ? 'ios-heart' : 'ios-heart-outline'"></Icon>
        <div class="text">推荐</div>
      </div>
    </li>
  </ul>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    //文章数据
    articles: {
      type: Array,
      default: function() {}
    }
  },
  data() {
    return {
    };
  },
  methods: {
    updata_rec_state(i) {
      this.articles[i].rec_state
        ? (this.articles[i].rec_state = 0)
        : (this.articles[i].rec_state = 1);
    }
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
.article-wrapper {
  width: 100%;
  padding: 14px 0;
  .article-item {
    width: 100%;
    display: flex;
    margin-bottom: 14px;
    .avater {
      flex: 0 0 50px;
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: $mainC;
      border-radius: 4px;
      margin-right: 14px;
    }
    .article-center {
      flex: 1;
      .title {
        line-height: 1;
        font-size: 16px;
        margin-bottom: 4px;
      }
      .content {
        line-height: 1;
        margin-bottom: 4px;
      }
      .author,
      .time {
        line-height: 1;
      }
      .author{
        font-weight: bold;
        margin-right: 10px;
      }
    }
    .article-right {
      flex: 0 0 40px;
      background-color: #eee;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 4px;
      cursor: pointer;
      .ivu-icon {
        font-size: 16px;
      }
      .text {
        margin-top: 5px;
      }
    }
    .active {
      background-color: #ddd;
      box-shadow: inset 0 3px 5 px rgba(0,0,0,0.125);
      .ivu-icon {
        color: $deepC;
      }
      .text {
        color: $deepC;
      }
    }
  }
}
</style>