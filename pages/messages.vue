<template>
  <lib-main :navIndex="nav_index">
    <div id="messages">
      <div class="container block-shadow">
        <h2 class="dot-line-title">全部消息：</h2>
        <ul class="content" v-if="messages.length > 0" >
          <li class="item" v-for="i in messages" :key="i.id" :class="{ active: i.is_read != 1 }">
            <a href="javascript:void(0)">
              <img class="avater" src="../assets/images/empty_avater.jpg"
              alt="">
              <span class="name">{{ i.name }}</span>
              <span class="detail">{{ i.title }}：{{ i.content }}</span>
            </a>
          </li>
        </ul>

        <div class="empty-mess" v-else>
          <p>暂无消息</p>
        </div>
      </div>
    </div>
  </lib-main>
</template>

<script type='text/ecmascript-6'>
  import libMain from "~/components/main/main.vue";
  export default {
    data() {
      return {
        messages: [],                //消息
        nav_index: 3
      }
    },
    methods: {
      //获取假数据
      get_messages_data() {
        for (let i = 0; i < 20; i++) {
          this.messages.push({
            id: i,
            is_read: 1,
            avater: '../assets/images/empty_avater.jpg',
            name: 'userName' + i,
            title: 'title' + i,
            content: 'content' + i
          })
        }
      }
    },
    created() {
      this.get_messages_data()
      this.messages[0].is_read = 0
      this.messages[1].is_read = 0
    },
    components: {
      libMain
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../assets/css/color.scss";
#messages {
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    .content {
      width: 100%;      
      .item {
        width: 100%;
        padding: 10px 20px 6px 20px;
        position: relative;
        margin-bottom: 4px;
        .avater {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .name {
          position: absolute;
          left: 92px;
          top: 21px;
          line-height: 0.94;
          font-size: 14px;
        }
        .detail {
          position: absolute;
          left: 92px;
          top: 42px;
          line-height: 1.07;
          font-size: 14px;
        }
      }
      .active,
      .item:hover {
        background-color: $shallowC;
        .avater,
        .name,
        .detail {
          color: #fff;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .block-shadow {
    box-shadow: none;
    padding: 0 14px;
  }
  #messages {
    .container {
      .active .avater{
        width: 46px;
        height: 46px; 
      }
    }
  }
}
</style>