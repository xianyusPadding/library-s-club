<template>
  <div class="navbar">
    <Row>
      <i-col class="nav-item" span="6">
        <a href="/" class="nav-link" :class="{active: nav_index === 0}" @click="nav_visted(0)">
          <Icon type="ios-paper-outline"></Icon>
          <span class="nav-content">推荐</span>
        </a>
      </i-col>
      <i-col class="nav-item" span="6">
        <a href="/books" class="nav-link" :class="{active: nav_index === 1}" @click="nav_visted(1)">
          <Icon type="ios-book-outline"></Icon>
          <span class="nav-content">图书</span>
        </a>
      </i-col>
      <i-col class="nav-item" span="6">
        <a href="/articles" class="nav-link" :class="{active: nav_index === 2}" @click="nav_visted(2)">
          <Icon type="document-text"></Icon>
          <span class="nav-content">文章</span>
        </a>
      </i-col>
      <i-col class="nav-item" span="6">
        <a href="javascript:void(0)" class="nav-link" :class="{active: nav_index === 3}" @click="nav_visted(3)">
          <Icon type="navicon-round"></Icon>
          <span class="nav-content">消息</span>  
        </a>
      </i-col>       
    </Row>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      navIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        nav_index: 0
      };
    },
    created(){
      this.nav_index = this.navIndex
    },
    methods: {
      nav_visted(index){
        this.nav_index = index
      }
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";

.navbar {
  width: 100%;
  height: 50px;
  background-color: #fff;
  .ivu-row {
    border-top: 1px solid #eee;
    .ivu-col {
      .nav-link {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        .ivu-icon {
          font-size: 20px;
        }
      }
      .active{
        color: $mainC;
      }
    }
  }
}
</style>