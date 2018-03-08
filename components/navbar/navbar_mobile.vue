<template>
  <div class="navbar">
    <Row>
      <!-- <i-col span="6">
        <Icon type="ios-paper-outline"></Icon>
        <span class="nav-content">资讯</span>
      </i-col> -->
      <i-col span="8">
        <Icon type="ios-book-outline"></Icon>
        <span class="nav-content">图书</span>
      </i-col>
      <i-col span="8">
        <Icon type="document-text"></Icon>
        <span class="nav-content">文章</span>
      </i-col>
      <i-col span="8">
        <Icon type="navicon-round"></Icon>
        <span class="nav-content">信息</span>  
      </i-col>       
    </Row>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
  
  .navbar{
    width: 100%;
    height: 50px;
    background-color: #fff;
    .ivu-row{
      border-top: 1px solid #eee;
      .ivu-col{
        height: 50px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .ivu-icon{
          font-size: 20px;
        }
      }
      .ivu-col:hover{
        color: #02BB76;
      }
    }
  }
</style>