<template>
  <ul class="article-wrapper">
    <li class="article-item" v-for="(item, index) in articles" :key="item._id">
      <a :href="'/article/' + item._id"><img class="avater" :src="item.avater" alt=""></a>
      <a :href="'/article/' + item._id" class="article-center">
        <h3 class="title">{{item.title}}</h3>
        <div>
          <p class="content text-over">{{item.summary}}</p>
          <span class="author">{{item.author}}</span>
          <span class="time">发表于{{item.writeTime}}</span>
        </div>
      </a>
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
    margin-bottom: 18px;
    .avater {
      flex: 0 0 60px;
      display: inline-block;
      width: 60px;
      height: 60px;
      background-color: $mainC;
      border-radius: 4px;
      margin-right: 14px;
    }
    .article-center {
      display: block;
      flex: 1;
      max-width: calc(100% - 124px);
      margin-right: 10px;
      .title {
        line-height: 1.2;
        font-size: 15px;
        margin-bottom: 8px;
      }
      .content {
        line-height: 1;
        margin-bottom: 5px;
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
        color: $deepC;
        font-size: 16px;
      }
      .text {
        color: $deepC;
        margin-top: 5px;
        font-size: 12px;
      }
    }
    .active {
      background-color: #ddd;
      box-shadow: inset 0 3px 5px rgba(0,0,0,0.125);
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