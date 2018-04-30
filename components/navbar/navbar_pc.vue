<template>
  <div class="navbar">
    <div class="container">
      <a href="/" class="logo" @click="nav_visted(1)">
        <h2>library's club</h2>
      </a>
      <Row class="navbar-row">
        <i-col :md="12" :sm="12" :xs="10">
          <a class="book_link strong" :class="{ active: nav_index === 1 }" href="/books" @click="nav_visted(1)">图书</a>
          <a class="article_link strong" :class="{ active: nav_index === 2 }"  href="/articles" @click="nav_visted(2)">文章</a>
        </i-col>
        <i-col :sm="8" :xs="10" class="nav-middle">
          <i-Input v-model="search_value" icon="search" placeholder="告诉我你想搜索的内容" style="max-width: 240px" @on-click="search" @on-enter="search"></i-Input>
        </i-col>
        <i-col :sm="4" :xs="4" class="nav-right">
          <div v-if="loginState === 0">
            <a class="signin" href="javascript:void(0)" @click="signin">登录</a>
            <a class="signout" href="javascript:void(0)"  @click="register">注册</a>
          </div>
          <div v-if="loginState === 1">
            <a href="javascript:void(0)" @click.stop="updata_message_box"><Icon type="chatboxes"></Icon></a>
            <a href="javascript:void(0)" @click.stop="updata_person_box"><Icon type="person" style="margin-left: 20px;
            "></Icon></a>
          </div>
        </i-col>
      </Row>

      <!-- 消息框 -->
      <transition name="messageBox">
        <div class="message-box block-shadow"  v-show="message_box_state"  @click.stop>
          <div class="main"><span class="title">通知</span></div>
          <div class="message-box-body">
            <ul class="content" v-if="messages.length > 0" >
              <li class="item" v-for="i in messages" :key="i.id" :class="{ active: i.is_read != 1 }">
                <a href="javascript:void(0)">
                  <img class="avater" src="../../assets/images/empty_avater.jpg"
                  alt="">
                  <span class="name">{{ i.name }}</span>
                  <span class="detail">{{ i.title }}：{{ i.content }}</span>
                </a>
              </li>
            </ul>
            <div class="empty-mess" v-else>
              <p>暂无消息</p>
            </div>

            <!-- <span class="scroll_moreText" v-show="moreTextState"><i class="icon nc-icon nc-dots-05-2"></i>查看更多</span> -->
          </div>
          
          <div class="footer">
              <span class="set"><a href="javascript:void(0)">设置</a></span>
              <span class="seeAll"><a href="/messages">查看全部通知</a></span>
          </div>
        </div>
      </transition>

        <!-- 个人中心框 -->
        <transition name="personBox">
          <div class="person-box block-shadow" v-show="person_box_state"  @click.stop>
            <ul class="content">
              <li class="item" v-if="user_power === 3 || user_power === 2">
                <a href="/administer">
                  <Icon type="settings"></Icon>
                  <span class="text">管理中心</span>
                </a>
              </li>
              <li class="item">
                <a href="/myCenter">
                  <Icon type="person"></Icon>
                  <span class="text">个人中心</span>
                </a>
              </li>
              <li class="item">
                <a href="javascript:void(0)" @click="sign_out">
                  <Icon type="log-out"></Icon>
                  <span class="text">登出</span>
                </a>
              </li>
            </ul>            
          </div>
        </transition>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { setCookie, getCookie } from '~/common/cookie'
  export default {
    props: {
      bodyWidth: {
        type: Number,
        default: 0
      },
      navIndex: {
        type: Number,
        default: 0
      },
      loginState: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        search_value: "",
        searchState: 1,
        nav_index: 0,
        message_box_state: 0,      //消息框的显示状态
        person_box_state: 0,       //个人中心框的显示状态
        messages: [                //消息
          {
            id: 0,
            is_read: 0,
            avater: '',
            name: 'userName',
            title: 'title',
            content: 'content'
          }
        ],
        userInfo: {                //用户信息
          phone: '',
          userName: '',
          password: '',
          _password: '',
          vailNum: '',
        },     
        registerModalState: true,
        user_power: 1             //用户权限         
      };
    },
    created() {
      this.nav_index = this.navIndex
      this.click_body()
    },
    watch: {
      bodyWidth(val) {
        val > 768 ? (this.searchState = 1) : (this.searchState = 2);
      }
    },
    methods: {
      //搜索
      search(){
        setCookie('search_content', this.search_value)

        location.pathname = '/search'
      },
      //登出
      sign_out(){
        setCookie('phone', '')
        setCookie('password', '')
        setCookie('userId', '')
        this.$emit('updataloginstate', 0)
        this.$Message.success('登出成功')
        this.person_box_state = 0
      },
      nav_visted(index) {
        this.nav_index = index
      },
      click_body(){
        let _this = this
        document.onclick = function(){
          _this.message_box_state = 0
          _this.person_box_state = 0
        } 
      },
      //登录
      signin() {
        let _this = this
        this.$Modal.confirm({
          width: '360px',
          okText: '登录',
          render: (h) => {
            return h('ul', {
              style: {
                width: '100%'
              }
            }, [
                h('li', {
                  style: {
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '24px',
                    color: '#009a61',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                  }
                }, 'libraryClub'),
                h('li', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }
                }, [
                    h('span', {
                      style: {
                        flex: '0 0 60px',
                        fontWeight: 'bold'
                      }
                    }, '手机号码：'),
                    h('Input', {
                      props: {
                        value: this.userInfo.phone
                      },
                      style: {
                        flex: '1'
                      },
                      on: {
                        input: val => {
                          this.userInfo.phone = val
                        }
                      }
                    })
                  ]),
                h('li', {
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }, [
                    h('span', {
                      style: {
                        flex: '0 0 60px',
                        fontWeight: 'bold'
                      }
                    }, '密码：'),
                    h('Input', {
                      props: {
                        value: this.userInfo.password,
                        type: 'password',
                      },
                      style: {
                        flex: '1'
                      },
                      on: {
                        input: val => {
                          this.userInfo.password = val
                        }
                      }
                    })
                  ])
              ])
          },
          onOk: () => {
            let userInfo = _this.userInfo
            if(userInfo.phone === '' || userInfo.phone.length != 11){
              _this.$Message.warning('手机号码格式不对！')
            }else if(userInfo.password === ''){
              _this.$Message.warning('密码不得为空！')
            }else{
              _this.$http.post('/api/v0/user/login', userInfo).then(res => {
                if(res.data.code === -1){
                  _this.$Message.warning(res.data.message)
                }else {
                  _this.$Message.success('登录成功')
                  setCookie('phone', res.data.phone)
                  setCookie('password', res.data.password)
                  setCookie('userId', res.data._id)

                  _this.$emit('updataloginstate', 1)
                }
              })
            }
          }
        })
      },
      //注册
      register() {
        let _this = this
        this.$Modal.confirm({
          width: '360px',
          okText: '注册',
          loading: false,
          render: (h) => {
            return h('ul', {
              style: {
                width: '100%'
              }
            }, [
                h('li', {
                  style: {
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '24px',
                    color: '#009a61',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                  }
                }, 'libraryClub'),
                h('li', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }
                }, [
                    h('span', {
                      style: {
                        flex: '0 0 60px',
                        fontWeight: 'bold'
                      }
                    }, '手机号码：'),
                    h('Input', {
                      props: {
                        value: this.userInfo.phone
                      },
                      style: {
                        flex: '1'
                      },
                      on: {
                        input: val => {
                          this.userInfo.phone = val
                        }
                      }
                    })
                  ]),
                h('li', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }
                }, [
                    h('span', {
                      style: {
                        flex: '0 0 60px',
                        fontWeight: 'bold'
                      }
                    }, '昵称：'),
                    h('Input', {
                      props: {
                        value: this.userInfo.userName
                      },
                      style: {
                        flex: '1'
                      },
                      on: {
                        input: val => {
                          this.userInfo.userName = val
                        }
                      }
                    })
                  ]),
                h('li', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }
                }, [
                    h('span', {
                      style: {
                        flex: '0 0 60px',
                        fontWeight: 'bold'
                      }
                    }, '密码：'),
                    h('Input', {
                      props: {
                        value: this.userInfo.password,
                        type: 'password'
                      },
                      style: {
                        flex: '1'
                      },
                      on: {
                        input: val => {
                          this.userInfo.password = val
                        }
                      }
                    })
                  ]),
                h('li', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }
                }, [
                    h('span', {
                      style: {
                        flex: '0 0 60px',
                        fontWeight: 'bold'
                      }
                    }, '确认密码：'),
                    h('Input', {
                      props: {
                        value: this.userInfo._password,
                        type: 'password'
                      },
                      style: {
                        flex: '1'
                      },
                      on: {
                        input: val => {
                          this.userInfo._password = val
                        }
                      }
                    })
                  ]),
                h('li', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }
                }, [
                    h('span', {
                      style: {
                        flex: '0 0 60px',
                        fontWeight: 'bold'
                      }
                    }, '验证码：'),
                    h('Input', {
                      props: {
                        value: this.userInfo.vailNum
                      },
                      style: {
                        flex: '1'
                      },
                      on: {
                        input: val => {
                          this.userInfo.vailNum = val
                        }
                      }
                    })
                  ])
              ])
          },
          onOk: () => {
            let userInfo = _this.userInfo
            if(userInfo.phone === '' || userInfo.phone.length != 11){
              _this.$Message.warning('手机号码格式不对！')
            }else if(userInfo.userName === ''){
              _this.$Message.warning('昵称不得为空！')
            }else if(userInfo.password === ''){
              _this.$Message.warning('密码不得为空！')
            }else if(userInfo.password != userInfo._password){
              _this.$Message.warning('两次输入的密码不相同！')
            }else{
              _this.$http.post('/api/v0/user/register', userInfo).then(res => {
                if(res.data.code === -1){
                  _this.$Message.warning(res.data.message)
                }else {
                  _this.$Message.success('注册成功')
                }
              })
            }
          }
        })
      },
      updata_message_box(){
        this.person_box_state = 0
        this.message_box_state = !this.message_box_state
      },
      updata_person_box(){
        let userId = getCookie('userId')
        this.$http.get(`/api/v0/user/getPowerState?userId=${userId}`).then( res => {
          this.user_power = res.data.power
        }, res => {
          console.log(res)
        })
        this.message_box_state = 0
        this.person_box_state = !this.person_box_state
      },
      
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
    padding: 0 10px;
    margin: 0 auto;
    display: flex;
    position: relative;
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
        .signin,
        .signout {
          width: 50px;
          text-align: center;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .person-box{
      width: 120px;
      position: absolute;
      top: 56px;
      right: -50px;
      z-index: 100;
      background-color: #fff;
      padding: 14px 0;
      .item{
        width: 100%;
        line-height: 2.4;
        padding: 0 20px;
        .ivu-icon{
          margin-right: 10px;
        }
      } 
      .item:hover{
        background-color: $mainC;
        .ivu-icon, .text{
          color: #fff;
        }
      }
    }
    .message-box {
      width: 360px;
      height: 450px;
      position: absolute;
      top: 56px;
      right: 0;
      z-index: 100;
      background-color: #fff;
      padding: 20px 0;
      .main {
        width: 100%;
        line-height: 1;
        padding-bottom: 14px;
        border-bottom: 1px solid $shallowC;
        padding: 0 20px 14px 20px;
        font-size: 16px;
        font-weight: 500;
      }
      .content {
        height: 354px;
        .item {
          width: 100%;
          padding: 16px 20px 0 20px;
          position: relative;
          margin-bottom: 4px;
          .avater {
            width: 46px;
            height: 46px;
            border-radius: 50%;
          }
          .name {
            position: absolute;
            left: 78px;
            top: 21px;
            line-height: 0.94;
            font-size: 14px;
          }
          .detail {
            position: absolute;
            left: 78px;
            top: 42px;
            line-height: 1.07;
            font-size: 14px;
          }
        }
        .active, .item:hover {
          background-color: $shallowC;
          .avater,
          .name,
          .detail {
            color: #fff;
          }
        }
      }
      .footer {
        width: 100%;
        padding: 0 20px 14px 20px;
        line-height: 1;
        padding-top: 14px;
        border-top: 1px solid $mainC;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        font-weight: 500;
      }
    }
    .message-box:before {
      position: absolute;
      top: -10px;
      right: 33px;
      width: 0;
      height: 0px;
      content: "";
      border-style: solid;
      border-width: 10px;
      border-color: #fff #fff transparent transparent;
      transform: rotate(-45deg);
      box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.24);
    }
    .person-box:before {
      position: absolute;
      top: -10px;
      left: 53px;
      width: 0;
      height: 0px;
      content: "";
      border-style: solid;
      border-width: 10px;
      border-color: #fff #fff transparent transparent;
      transform: rotate(-45deg);
      box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.24);
    }
  }
}
.messageBox-enter-active, .messageBox-leave-active {
  transition: opacity .5s;
}
.messageBox-enter, .messageBox-leave-to {
  opacity: 0;
}
.personBox-enter-active, .personBox-leave-active {
  transition: opacity .5s;
}
.personBox-enter, .personBox-leave-to {
  opacity: 0;
}
</style>