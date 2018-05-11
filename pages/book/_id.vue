<template>
  <lib-main>
    <div id="book">
      <div class="container">
        <div class="left">
          <Row style="margin-bottom: 14px">
            <i-col :sm="6" :xs="9">
              <img class="book-img" :src="book_data.img_url" alt="图书封面">
              <div class="actions">
                <div class="recommend" :class="{'active': recomend_state}" @click="book_action('recommend', recomend_state)">
                  <p class="num recomend-num">{{book_data.recommend_num}}</p>推荐
                </div>
                <div class="connected" :class="{'active': collect_state}" @click="book_action('collect', collect_state)">
                  <p class="num connected-num">{{book_data.collection_num}}</p>收藏
                </div>
                <div class="read">
                  <p class="num">{{book_data.read_num}}</p>阅读
                </div>
              </div>
            </i-col>
            <i-col class="book_info" :sm="18" :xs="15">
              <h2 class="title">{{book_data.title}}</h2>
              <p class="author">{{book_data.author}}（作者）</p>
              <div class="category-block">
                <ul class="wrapper">
                  <li class="item publicationState" v-if="book_data.publication_state">{{book_data.publication_state}}</li>
                  <a :href="'/bookTag/' + item" class="item category" v-for="(item, index) in book_data.category" :key="index">{{item}}</a>
                </ul>
              </div>
              <p class="intor">{{book_data.summary}}</p>
            </i-col>
          </Row>

          <div class="block-shadow book-features">
            <h3 class="dot-line-title">本书特色</h3>
            <div class="content" v-html="book_data.intro"></div>
          </div>

          <div class="block-shadow book-menu">
            <h3 class="dot-line-title">目录</h3>
            <div class="content">　　
              <ul class="menu-wrapper">
                <!-- <a :href="item.catalog_id ? `http://www.ituring.com.cn/book/tupubarticle/${item.catalog_id}` : 'javascript:void(0)'" class="menu-item" :class="{ 'menu-can-read': item.catalog_id }" v-for="(item, index) in book_data.catalog" :key="index">{{item.content}}</a> -->
              </ul>
            </div>
          </div>

          <div class="block-shadow book-comment">
            <h3 class="dot-line-title">评论</h3>
            <div class="content">　　
              <ul class="comment-wrapper">
                <li class="comment-item" v-for="(item, index) in commentData" :key="item._id">
                  <img class="avater" :src="item.user.avater" alt="">
                  <div class="about">
                    <span class="name">{{ item.user.name }}&nbsp;-&nbsp;</span>
                    <span class="time">{{ item.meta.createdAt.slice(0, 10) }}</span>
                    <p class="content">{{ item.content }}</p>
                    <a v-if="!item.reply.length" @click="getReply(index)" href="javascript:void(0)" class="watch-reply">查看回复</a>
                    <!-- <span>{{item.reply}}</span> -->
                    <a @click="addReply(index)" href="javascript:void(0)" class="add-reply">回复</a>

                    <ul class="reply-wrapper">
                      <li class="reply-item" v-for="(replyItem, replyIndex) in item.reply" :key="replyIndex">
                        <img class="avater" :src="replyItem.user.avater" alt="">
                        <div class="about">
                          <span class="name">{{ replyItem.user.name }}&nbsp;-&nbsp;</span>
                          <span class="time">{{ replyItem.meta.createdAt.slice(0, 10) }}</span>
                          <p class="content">{{ replyItem.content }}</p>
                        </div>
                      </li> 
                    </ul> 
                  </div>
                </li>
              </ul>
            </div>

            <div class="myComment">
              <img class="avater" :src="$store.state.userMess.avater" alt="">
              <i-Input v-model="myComment" type="textarea" :rows="4" placeholder="文明社会，理性评论"></i-Input>
            </div>
            <Button type="primary" class="addComment" @click="addComment(0)">发表评论</Button>
          </div>
        </div>

        <div class="right">
          <div class="block-shadow book-buy" v-if="!buy_state">
            <h3 class="dot-line-title">购买</h3>
            <div class="content">　　
              <div class="Ebook-block" v-if="book_data.price">
                <p class="price-block">电子书：<span class="price">{{book_data.price}}</span></p>
                <Button class="ivu-btn ivu-btn-warn1" @click="buy_book('electronic')">购买</Button>
              </div>
              <div class="Paper-block" v-if="book_data.e_price">
                <p class="price-block">纸质书：<span class="price">{{book_data.e_price}}</span></p>
                <Button class="ivu-btn ivu-btn-warn1" @click="buy_book('paper')">购买</Button>
              </div>
            </div>
          </div>

          <div class="block-shadow book-publishing-mess">
            <h3 class="dot-line-title">出版信息</h3>
            <div class="content">　　
              <ul>
                <li class="pushMess-item" v-if="book_data.title">
                  <div class="name">书名：</div>
                  <div class="about text-over">{{ book_data.title }}</div>
                </li>
                <li class="pushMess-item">
                  <div class="name">执行编辑：</div>
                  <div class="about text-over">暂无</div>
                </li>
                <li class="pushMess-item" v-if="book_data.publication_date">
                  <div class="name">出版日期：</div>
                  <div class="about text-over">{{ book_data.publication_date }}</div>
                </li>
                <li class="pushMess-item" v-if="book_data.book_num">
                  <div class="name">书号：</div>
                  <div class="about text-over">{{ book_data.book_num }}</div>
                </li>
                <li class="pushMess-item" v-if="book_data.price">
                  <div class="name">定价：</div>
                  <div class="about text-over">{{ book_data.price }}</div>
                </li>
                <li class="pushMess-item">
                  <div class="name">印刷方式：</div>
                  <div class="about text-over">黑白</div>
                </li>
                <li class="pushMess-item">
                  <div class="name">开本：</div>
                  <div class="about text-over">16开</div>
                </li>
                <li class="pushMess-item" v-if="book_data.publication_state">
                  <div class="name">出本状态：</div>
                  <div class="about text-over">{{ book_data.publication_state }}</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="block-shadow related-books">
            <h3 class="dot-line-title">类似的书</h3>
            <ul class="content">　　
              <a :href="'/book/' + item._id" class="rel-book" v-for="(item, index) in related_books" :key="item._id" v-if="index < 8">
                <img class="rel-book-img" :src="item.img_url" alt="">
                <div class="rel-book-about">
                  <p class="rel-book-title">{{item.title}}</p>
                  <p class="rel-book-author">{{item.author}}</p>
                </div>
              </a>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </lib-main>
</template>

<script type='text/ecmascript-6'>
  import libMain from "~/components/main/main.vue"
  import { getCookie } from '~/common/cookie'
  export default {
    data() {
      return {
        book_id: '',
        book_data: {},
        related_books: [],
        recomend_state: 0,     //获取用户是否推荐、购买、收藏该书       
        collect_state: 0,
        buy_state: 0,
        bookShop_data: [],
        priceClearing: {       //价格的统计
          total: 0,
          freight: 10
        },
        order_address: '',     //订单地址
        myComment: '',         //我的评论
        commentData: [],       //评论数据
        commentType: 0,        //评论的类别 0->图书 1->文章
      }
    },
    methods: {
      //购买提交
      buy_book(param) {
        let state = 0
        param === 'electronic' ? state = 0 : state = 1

        if (!localStorage.getItem('bookShop_data')) {
          localStorage.setItem('bookShop_data', JSON.stringify([
            {
              _id: this.book_data._id,
              title: this.book_data.title,
              price: state ? this.book_data.price : this.book_data.e_price,
              kind: state ? '纸质书' : '电子书',
              num: 1
            }
          ]));

          this.bookShop_data = [{
            _id: this.book_data._id,
            title: this.book_data.title,
            price: state ? this.book_data.price : this.book_data.e_price,
            kind: state ? '纸质书' : '电子书',
            num: 1
          }]
        } else {
          let bookShop_data = JSON.parse(localStorage.getItem('bookShop_data'))
          let num = 0

          let _this = this
          bookShop_data.map((x) => {
            if (x._id === this.book_data._id) {
              num++
            }
          })
          num === 0 ? localStorage.setItem('bookShop_data', JSON.stringify(bookShop_data = bookShop_data.concat([
            {
              _id: this.book_data._id,
              title: this.book_data.title,
              price: state ? this.book_data.price : this.book_data.e_price,
              kind: state ? '纸质书' : '电子书',
              num: 1
            }
          ]))) : ''

          this.bookShop_data = bookShop_data
        }

        let shop_data = this.bookShop_data
        let total_price = 0

        for (let i = 0; i < shop_data.length; i++) {
          let unit_price = parseFloat(shop_data[i].price.split('￥')[1])
          total_price += unit_price * shop_data[i].num
        }

        this.priceClearing.total = total_price

        this.buy_modal()
      },
      //购买的modal
      buy_modal() {
        this.$Modal.confirm({
          okText: '购买',
          width: '660px',
          render: (h) => {
            return h('div', {
              style: {
                width: '100%'
              }
            }, [
                h('h3', {
                  style: {
                    marginBottom: '14px'
                  }
                }, '我的购书袋：'),
                h('Table', {
                  props: {
                    columns: [
                      {
                        title: '书名',
                        key: 'title'
                      },
                      {
                        title: '价格',
                        key: 'price'
                      },
                      {
                        title: '版本',
                        key: 'kind'
                      },
                      {
                        title: '数量',
                        key: 'number',
                        render: (h, params) => {
                          return h('InputNumber', {
                            style: {
                              width: '50px'
                            },
                            on: {
                              'on-change': (val) => {
                                // console.log(this.bookShop_data[params.index].num)
                                // if(this.bookShop_data[params.index].num > val){
                                //   this.priceClearing.total -= parseFloat(this.bookShop_data[params.index].price.split('￥')[1])
                                // }else{
                                //   this.priceClearing.total += parseFloat(this.bookShop_data[params.index].price.split('￥')[1])
                                // }

                                // this.bookShop_data[index].num = val

                                // this.priceClearing.total = parseFloat(this.priceClearing.total.toFixed(2))

                                // localStorage.setItem('bookShop_data', JSON.stringify(this.bookShop_data))
                              }
                            }
                          })
                        }
                      },
                      {
                        title: '删除',
                        key: 'actions',
                        align: 'center',
                        render: (h, params) => {
                          return h('div', [
                            h('Button', {
                              style: {
                                fontSize: '18px'
                              },
                              on: {
                                'click': () => {
                                  let less_price = parseFloat(this.bookShop_data[params.index].price.split('￥')[1]) * this.bookShop_data[params.index].num

                                  this.bookShop_data.splice(params.index, 1)

                                  this.priceClearing.total -= less_price

                                  localStorage.setItem('bookShop_data', JSON.stringify(this.bookShop_data))
                                }
                              }
                            }, '×')
                          ]);
                        }
                      },
                    ],
                    data: this.bookShop_data
                  }
                }),
                h("div", {
                  style: {
                    display: "flex",
                    margin: "14px 0",
                    alignItems: "center"
                  }
                }, [
                    h("span", {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                      "收货地址："
                    ),
                    h("Input", {
                      props: {
                        placeholder: "Enter some..."
                      },
                      style: {
                        flex: "1"
                      },
                      on: {
                        input: val => {
                          this.order_address = val
                        }
                      }
                    })
                  ]),
                h("div", {
                  style: {
                    display: "flex",
                    margin: "14px 0"
                  }
                }, [
                    h("span", {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                      "订单结算："
                    ),
                    h('div', {
                      style: {
                        flex: 1,
                        textAlign: 'right'
                      }
                    }, [
                        h('p', `合计金额：￥${this.priceClearing.total}`),
                        h('p', `（满 99 元包邮，运费规则）运费：${this.priceClearing.freight} 元`),
                        h('p', `实际支付：${this.priceClearing.total - (this.priceClearing.total > 99 ? this.priceClearing.freight : 0)} 元`)
                      ])
                  ]),
              ])
          },
          onOk: () => {
            if (this.bookShop_data.length === 0){
              this.$Message.warning('订单不得为空！')
            } else if (this.order_address === '') {
              this.$Message.warning('收货地址不得为空！')
            } else{
              let data = this.bookShop_data
              let books = []
              data.forEach((val, index) => {
                books[index] = {
                  _id: data[index]._id,
                  num: data[index].num,
                  title: data[index].title
                }
              })
              let totalPrice = this.priceClearing.total - (this.priceClearing.total > 99 ? this.priceClearing.freight : 0)
              this.$http.post('/api/v0/order/submit', {
                books: books,
                phone: getCookie('phone'),
                totalPrice: totalPrice,
                address: this.order_address
              }).then(res => {
                if(res.data.code === 0){
                  this.$Message.success('下单成功！')
                  this.buy_state = 1
                }
              }, res => {
                console.log(res)
              })
            }
          }
        })
      },
      //获取用户对书的状态 是否购买等
      get_userActionMess() {
        let phone = getCookie('phone') || ''
        let bookId = this.book_id || ''

        if (!phone || !bookId) {
          return
        }

        this.$http.get(`/api/v0/user/actionState?phone=${phone}&bookId=${bookId}`).then(res => {
          this.recomend_state = res.data.recomend_state
          this.collect_state = res.data.collect_state
          this.buy_state = res.data.buy_state
        }, res => {
          console.log(res)
        })
      },
      //对书进行推荐、阅读、收藏等操作
      book_action(Action, state = 1) {
        let phone = getCookie('phone')
        let action = Action
        let bookId = this.book_id

        if (state) {
          return
        }
        if (!phone) {
          this.$Message.warning('请先登录');
        }
        if (action === 'recommend' && this.recomend_state === 1) {
          return
        }
        if (action === 'collect' && this.collect_state === 1) {
          return
        }
        this.$http.get(`/api/v0/user/actions?phone=${phone}&action=${action}&bookId=${bookId}`).then(res => {
          if (res.data.code === 0) {
            if (action === 'recommend') {
              this.recomend_state = 1
              this.$Message.success(`推荐成功`)
              this.book_data.recommend_num = this.book_data.recommend_num + 1
              // console.log()
            } else if (action === 'collect') {
              this.collect_state = 1
              this.$Message.success(`收藏成功`)
              this.book_data.collection_num = this.book_data.collection_num + 1
            } else if (action === 'read') {
              this.book_data.read_num = this.book_data.read_num + 1
            }
          }

        }, res => {
          console.log(res)
        })
      },
      //获取图书id
      get_book_id() {
        // let pathname = location.pathname
        let id = this.$route.params.id

        this.book_id = id

        this.get_book_data(id)
      },
      //获取图书信息
      get_book_data(id) {
        this.$http.get(`/api/v0/books/detail/${id}`).then((res) => {
          if (res.status === 200) {
            this.book_data = res.data.book
            this.related_books = res.data.relativeBooks
          }
        }, (res) => {
          console.log(res)
        })
      },
      //新增评论
      addComment(pid, content, index){
        let _content = content ? content : this.myComment
        
        if(!this.$store.state.userMess._id){
          this.$Message.warning('请先登录')
          return
        }
        
        if(_content.length < 8){
          this.$Message.warning('评论不得少于8个字')
          return
        }
        let params = {
          uid: this.$store.state.userMess._id,
          content: _content,
          pid: pid,
          aid: this.book_id,
          type: 0
        }

        this.$http.post('/api/v0/comment/addComment', params).then( res => {
          if(res.data.ok === 0){
            let data = res.data.data

            if(pid === 0){
              this.$Message.success('发表成功')
              data.reply = []
              this.commentData.unshift(data)
            }
            else{
              this.$Message.success('回复成功')
              this.commentData[index].content = this.commentData[index].content + ' '
              this.commentData[index].reply.unshift(data)
            }
            
          }else{
            this.$Message.warning('发表失败，请联系后台人员处理')
          }
        }, res => {
          console.log(res)
        })
      },
      //获取评论
      getComment(pid, aid){
        this.$http.get(`/api/v0/comment/allComments?type=${this.commentType}&pid=${pid}&aid=${aid}`).then( res => {
          if(res.data.ok === 0){
            this.commentData = res.data.comments
            if(pid === 0){
              this.commentData.forEach( val => {
                val.reply = []
              })
            }
          }
        }, res => {
          console.log(res)
        })
      },
      //添加回复
      addReply(index){
        let pid = this.commentData[index]._id
        let content = ''

        this.$Modal.confirm({
          okText: '提交评论',
          render: (h) => {
            return h('ul', {
              style: {
                width: '100%'
              }
            }, [
              h(
                "li",
                {
                  style: {
                    display: "flex",
                    marginBottom: "14px",
                    alignItems: "center"
                  }
                },
                [
                  h("Input", {
                    props: {
                      type: 'textarea',
                      rows: 5,
                      placeholder: '文明社会，理性评论'
                    },
                    on: {
                      input: val => {
                        content = val;
                      }
                    }
                  })
                ]
              )
            ])
          },
          onOk: () => {
            this.addComment(pid, content, index)
          }
        })   
      },
      //获取当前评论的
      getReply(index){
        let aid = this.book_id
        let pid = this.commentData[index]._id
        
        this.$http.get(`/api/v0/comment/allComments?type=${this.commentType}&pid=${pid}&aid=${aid}`).then( res => {
          if(res.data.ok === 0){
            if(pid != 0){
              this.commentData[index].content = this.commentData[index].content + ' '
              this.commentData[index].reply = res.data.comments
            }
          }
        }, res => {
          console.log(res)
        })
      }
    },
    created() {
      this.get_book_id()
    },
    mounted() {
      this.book_action('read', 0)
      this.get_userActionMess()
      this.getComment(0, this.book_id)
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
      .recommend,
      .connected {
        cursor: pointer;
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
        line-height: 1.2;
        margin: 8px 0;
        font-size: 28px;
        color: $mainC;
        font-weight: 400;
      }
      .author {
        color: #bdbdbd;
        margin: 5px 0 10px 0;
        font-size: 14px;
      }
      .intor {
        color: #adadad;
        font-size: 14px;
      }
      .category-block {
        margin-bottom: 10px;
        .wrapper .item {
          padding: 3px 8px;
          margin-right: 5px;
          display: inline-block;
          color: #fff;
        }
        .publicationState {
          background-color: #fdba36;
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          border-bottom-right-radius: 12px;
          border-top-right-radius: 12px;
        }
        .category {
          cursor: pointer;
          border-radius: 4px;
          background-color: $mainC;
          display: block;
        }
      }
    }
    .book-features {
      .content {
        font-size: 13px;
        line-height: 26px;
      }
    }
    .book-menu {
      .menu-wrapper {
        .menu-item {
          display: block;
          cursor: pointer;
          line-height: 36px;
          text-indent: 10px;
        }
        .menu-can-read {
          color: $mainC;
        }
        .menu-item:nth-child(odd) {
          background-color: #eee;
          border-radius: 4px;
        }
      }
    }
    .book-comment{
      width: 100%;
      padding-bottom: 55px;
      .content{
        .comment-item, .reply-item{
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
          .avater{
            width: 35px;
            height: 35px;
            display: inline-flex;
            margin-right: 20px;
            background-color: #eee;
            border-radius: 50%;
          }
          .about{
            flex: 1;
            .name{
              font-size: 14px;
              color: $mainC;
            }
            .content{
              font-size: 14px;
              color: #657180;
            }
            .watch-reply{
              display: inline-block;
              margin: 5px 10px 0 0;
            }
            .add-reply{
              display: inline-block;
              margin-top: 5px;
            }
          }
        }
        .reply-item{
          margin-top: 14px;
          .avater{
            width: 30px;
            height: 30px;

          }
        }
      }
      .myComment{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .avater{
          width: 50px;
          height: 50px;
          display: inline-flex;
          margin-right: 20px;
          background-color: #eee;
          border-radius: 4px;
        }
      }
      .addComment{
        float: right;
        margin-top: 10px;
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
    .related-books {
      .rel-book {
        width: 100%;
        display: block;
        margin-bottom: 10px;
        .rel-book-img {
          width: 40%;
          display: inline-block;
          border-radius: 4px;
        }
        .rel-book-about {
          width: 50%;
          display: inline-block;
          margin-left: 10%;
          vertical-align: top;
          .rel-book-title {
            margin-bottom: 8px;
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
    }
    .left{
      width: 100%;
    }
    .right{
      width: 100%;
      .related-books .rel-book .rel-book-img{
        width: 25%;
      }
      .related-books .rel-book .rel-book-about{
        width: 65%;
      }
    }
  }
  .block-shadow {
    box-shadow: none;
    padding: 0 14px;
  }
}
</style>
