<template>
  <lib-main :navIndex="navIndex">
    <div id="administer">
      <div class="container block-shadow">
        <div class="left">
          <h2 class="title dot-line-title">后台管理</h2>
          <Collapse v-model="collapse_model" class="collapse">
            <Panel name="1">
                图书管理
                <div slot="content" class="content">
                  <ul class="wrapper">
                    <li class="item" @click="update_tabIndex(10)">图书列表</li>
                  </ul>
                </div>
            </Panel>

            <Panel name="2">
                文章管理
                <div slot="content" class="content">
                  <ul class="wrapper">
                    <li class="item" @click="update_tabIndex(20)">已发布文章</li>
                    <li class="item" @click="update_tabIndex(21)">待审核文章</li>
                  </ul>
                </div>
            </Panel>

            <Panel name="3">
                用户管理
                <div slot="content" class="content">
                  <ul class="wrapper">
                    <li class="item" @click="update_tabIndex(30)">用户列表</li>
                  </ul>
                </div>
            </Panel>

            <Panel name="4">
                订单管理
                <div slot="content" class="content">
                  <ul class="wrapper">
                    <li class="item" @click="update_tabIndex(40)">订单列表</li>
                  </ul>
                </div>
            </Panel>
          </Collapse>
        </div>

        <div class="right">
          <books-list v-if="tabIndex == 10"></books-list>

          <articles-list v-if="tabIndex == 20"></articles-list>

          <articles-ready-list v-if="tabIndex == 21"></articles-ready-list>
          
          <user-list v-if="tabIndex == 30" :powerVal="powerVal"></user-list>

          <order-list v-if="tabIndex == 40" :powerVal="powerVal"></order-list>
        </div>
      </div>
    </div>
  </lib-main>
</template>

<script type='text/ecmascript-6'>
  import libMain from "~/components/main/main.vue";
  import { getCookie } from '~/common/cookie'
  import booksList from "~/components/administer/books-list.vue";
  import articlesList from "~/components/administer/articles-list.vue";
  import articlesReadyList from "~/components/administer/articles-ready-list.vue";
  import userList from "~/components/administer/user-list.vue";
  import orderList from "~/components/administer/order-list.vue";

  export default {
    data() {
      return {
        navIndex: 5,             //当前页的小标
        collapse_model: '10',    //折叠半的默认值
        tabIndex: 10,            //选项卡的下标
        powerVal: 2,            //获取管理员权限
      }
    },
    methods: {
      //获取管理员权限
      get_power_val(){
        let userId = getCookie('userId')
        this.$http.get(`/api/v0/user/getPowerState?userId=${userId}`).then( res => {
          this.powerVal = res.data.power
        }, res => {
          console.log(res)
        })
      },
      update_tabIndex(index){
        this.tabIndex = index
        location.hash = `tabIndex=${index}`
      },
      filterHash(){
        let hash = location.hash
        if(hash){
          if(hash.indexOf('tabIndex') > -1){
            this.tabIndex = hash.split('#tabIndex=')[1]
            this.collapse_model = hash.split('#tabIndex=')[1][0]
          }
        }
        
      }
    },
    created(){
    },
    mounted() {
      this.filterHash()
      this.get_power_val()
    },
    components: {
      libMain,
      booksList,
      articlesList,
      articlesReadyList,
      userList,
      orderList
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../assets/css/color.scss";
#administer {
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .left {
      width: 20%;
      .title{
        line-height: 1.2;
        margin: 0 0 14px 0;
      }
      .collapse{
        .content{
          cursor: pointer;
        }
        .wrapper{
          padding-left: 32px;
          .item{
            padding: 10px 0;
          }
        }
      }
    }
    .right {
      width: 78%;
    }
  }
}

</style>