<template>
  <div class="header-mobile">
    <i-Input class="search" v-model="search_value" icon="search" placeholder="告诉我你想搜索的内容"></i-Input>
    <Icon class="person" type="person"></Icon>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        search_value: ''
      }
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
  .header-mobile{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    .person{
      flex: 0 0 40px;
      display: inline-flex;
      justify-content: center;
      color: #009a61;
      font-size: 18px;
    }
    .search{
      flex: 1;
      display: inline-flex;
      justify-content: center;
      margin: 0 0 0 10px;
    }
  }
</style>