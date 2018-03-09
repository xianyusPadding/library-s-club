<template>
  <div class="navbar">
    <div class="container">
      <a class="logo" @click="nav_visted(1)">
        <h2>library's club</h2>
      </a>
      <Row class="navbar-row">
        <i-col :md="12" :sm="12" :xs="10">
          <a class="book_link strong" :class="{ active: nav_index === 1 }" href="#" @click="nav_visted(1)">图书</a>
          <a class="article_link strong" :class="{ active: nav_index === 2 }"  href="#" @click="nav_visted(2)">文章</a>
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
      },
      navIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        search_value: "",
        searchState: 1,
        nav_index: 0
      };
    },
    created(){
      this.nav_index = this.navIndex
    },
    watch: {
      bodyWidth(val) {
        val > 768 ? (this.searchState = 1) : (this.searchState = 2);
      }
    },
    methods: {
      nav_visted(index){
        this.nav_index = index
        this.$emit("updataNavIndex", index)
      }
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
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
        position: relative;
      }
      .book_link {
        margin-right: 20px;
        position: relative;
      }
      .active:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: $mainC;
        border-radius: 8px;
        line-height: 8px;
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
          color: $mainC;
          cursor: pointer;
        }
      }
    }
  }
}
</style>