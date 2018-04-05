<template>
  <lib-main>
    <div id="book">
      <div class="container">
        <div class="left">
          <Row style="margin-bottom: 14px">
            <i-col :sm="6" :xs="9">
              <!-- <div class="book-img"></div> -->
              <img class="book-img" :src="book_data.img_url" alt="图书封面">
              <div class="actions">
                <div class="recommend">
                  <p class="num">{{book_data.recommend_num}}</p>推荐
                </div>
                <div class="connected">
                  <p class="num">{{book_data.collection_num}}</p>收藏
                </div>
                <div class="read">
                  <p class="num">{{book_data.read_num}}</p>阅读
                </div>
              </div>
            </i-col>
            <i-col class="book_info" :sm="18" :xs="15">
              <h2 class="title">{{book_data.title}}</h2>
              <p class="author">{{book_data.author}}（作者）</p>
              <p class="intor">{{book_data.summary}}</p>
            </i-col>
          </Row>

          <div class="block-shadow book-features">
            <h3 class="dot-line-title">本书特色</h3>
            <div class="content">
              本书由奋战在Python开发一线近20年的Luciano Ramalho执笔，Victor Stinner、Alex Martelli等Python大咖担纲技术审稿人，从语言设计层面剖析编程细节，兼顾Python 3和Python 2，告诉你Python中不亲自动手实践就无法理解的语言陷阱成因和解决之道，教你写出风格地道的Python代码。<br>

              ● Python数据模型：理解为什么特殊方法是对象行为一致的关键。　　 <br>
              ● 数据结构：充分利用内置类型，理解Unicode文本和字节二象性。 <br>
              ● 把函数视作对象：把Python函数视作一等对象，并了解这一点对流行的设计模式的影响。 <br>
              ● 面向对象习惯用法：通过构建类学习引用、可变性、接口、运算符重载和多重继承。　　 <br>
              ● 控制流程：学习使用上下文管理器、生成器、协程，以及通过concurrent.futures和asyncio包实现的并发。 <br>
              ● 元编程：理解特性、描述符、类装饰器和元类的工作原理。　　
            </div>
          </div>

          <div class="block-shadow book-menu">
            <h3 class="dot-line-title">目录</h3>
            <div class="content">　　
              <ul class="menu-wrapper">
                <li class="menu-item" v-for="(item, index) in book_data.catalog" :key="index">{{item.content}}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="block-shadow book-buy">
            <h3 class="dot-line-title">购买</h3>
            <div class="content">　　
              <div class="Ebook-block" v-if="book_data.e_price">
                <p class="price-block">电子书：<span class="price">{{book_data.e_price}}</span></p>
                <Button class="ivu-btn ivu-btn-warn1">购买</Button>
              </div>
              <div class="Paper-block" v-if="book_data.price">
                <p class="price-block">纸质书：<span class="price">{{book_data.price}}</span></p>
                <Button class="ivu-btn ivu-btn-warn1">购买</Button>
              </div>
            </div>
          </div>

          <div class="block-shadow book-publishing-mess">
            <h3 class="dot-line-title">目录</h3>
            <div class="content">　　
              <ul>
                <li class="pushMess-item">
                  <div class="name">书名：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">系列书名：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">执行编辑：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">出版日期：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">书号：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">定价：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">页数：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">印刷方式：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">开本：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">出本状态：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">原书名：</div>
                  <div class="about text-over"></div>
                </li>
                <li class="pushMess-item">
                  <div class="name">原书号：</div>
                  <div class="about text-over"></div>
                </li>
              </ul>
            </div>
          </div>

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
        book_id: '',
        book_data: {}
      }
    },
    methods: {
      //校验路由加载是否正确
      validate({ id }) {
        return /^\d+$/.test(id)
      },
      //获取图书id
      get_book_id() {
        let pathname = location.pathname
        let id = pathname.split('/book/')[1]

        this.book_id = this.validate(id) ? id : ''

        this.get_book_data(id)
      },
      //生成假数据
      get_book_data(id) {
        // this.book_data = {
        //   id: id,
        //   title: 'title' + id,
        //   author: 'author' + id,
        //   intor: 'intor' + id
        // }
        this.$http.get(`/api/v0/books/detail/${id}`).then((res) => {
          if(res.status === 200){
            console.log(res.data.book) 
            this.book_data = res.data.book
          }
        }, (res) => {
          console.log(res)
        })
      }
    },
    mounted() {
      this.get_book_id()
    },
    components: {
      libMain
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
#book {
  .container {
    width: 100%;
    max-width: 1263px;
    margin: 14px auto;
    display: flex;
    justify-content: space-between;
  }
  .left {
    width: 75%;
    .book-img {
      width: 90%;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .actions {
      width: 90%;
      display: flex;
      flex-flow: nowrap;
      .recommend,
      .connected,
      .read {
        text-align: center;
        background-color: #eee;
        border-radius: 4px;
        font-size: 14px;
        color: $deepC;
        padding: 3px 0;
        .num {
          font-size: 18px;
        }
      }
      .active {
        background-color: #ddd;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        .num {
          color: $deepC;
        }
      }
      .recommend,
      .connected {
        flex: 2;
        margin-right: 10px;
      }
      .read {
        flex: 3;
      }
    }
    .book_info {
      .title {
        line-height: 50px;
        font-size: 28px;
      }
      .author {
        color: #bdbdbd;
        margin: 5px 0 15px 0;
        font-size: 15px;
      }
      .intor {
        color: #adadad;
        font-size: 15px;
      }
    }
    .book-menu {
      .content {
      }
    }
  }
  .right {
    width: 23%;
    margin-bottom: 200px;
    .book-buy {
      .price-block {
        font-weight: 600;
        font-size: 14px;
        .price {
          color: #fac04f;
          font-size: 24px;
        }
      }
    }
    .book-publishing-mess {
      ul {
        padding-top: 10px;
        .pushMess-item {
          width: 100%;
          display: flex;
          line-height: 1;
          margin-bottom: 20px;
          .name {
            flex: 2;
          }
          .about {
            flex: 5;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #book {
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
