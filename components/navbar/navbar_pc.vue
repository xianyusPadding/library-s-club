<template>
  <div class="navbar">
    <div class="container">
      <div class="logo">
        <h2>library's club</h2>
      </div>
      <Row class="navbar-row">
        <i-col :md="12" :sm="12" :xs="10">
          <a class="book_link strong" href="#">图书</a>
          <a class="article_link strong" href="#">文章</a>
        </i-col>
        <i-col :sm="9" :xs="10" class="nav-middle">
          <i-Input v-model="search_value" icon="search" placeholder="告诉我你想搜索的内容" style="max-width: 240px"></i-Input>
        </i-col>
        <i-col :sm="3" :xs="4" class="nav-right">
          <Icon type="ionic"></Icon>
          <Icon type="person" style="margin-left: 20px;"></Icon>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    bodyWidth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      search_value: "",
      searchState: 1
    };
  },
  watch: {
    bodyWidth(val){
      val > 768 ? (_this.searchState = 1) : (_this.searchState = 2);
    }
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
.navbar {
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  .container {
    max-width: 1263px;
    line-height: 56px;
    margin: 0 auto;
    display: flex;
    .logo {
      flex: 0 0 140px;
      margin-right: 40px;
    }
    .navbar-row {
      flex: 1;
      .book_link,
      .article_link {
        width: 60px;
        text-align: center;
        display: inline-block;
        font-size: 16px;
      }
      .book_link {
        margin-right: 20px;
      }
      .nav-middle {
        text-align: right;
        .ivu-icon {
          font-size: 20px;
          cursor: pointer;
        }
      }
      .nav-right {
        text-align: right;
        .ivu-icon {
          position: relative;
          top: 3px;
          font-size: 20px;
          color: #009a61;
          cursor: pointer;
        }
      }
    }
  }
}
</style>