<template>
  <div class="header-mobile">
    <transition name="personMenu">
      <div class="menu" v-show="person_menu_state" @click.stop>
        <div class="menu-header">
          <img class="avater" :src="!loginState ? '' : ''" alt="">
          <p>userName</p>
        </div>
        <ul class="wrapper">
          <li class="per-item" @click="person_menu_show">
            <a :href="loginState ? '/myCenter' : 'javascript:void(0)'" @click="linkCenter">个人中心</a>
            <Icon type="person"></Icon>
          </li>
          <li class="per-item" @click="signin(loginState)">
            <span>{{loginState ? '登出' : '登录'}}</span>
            <Icon type="log-in"></Icon>
          </li>
          <li v-if="!loginState" class="per-item" @click="register">
            <span>注册</span>
            <Icon type="log-out"></Icon>
          </li>
        </ul>
      </div>
    </transition>

    <div class="panel">
      <i-Input class="search" v-model="search_value" icon="search" @on-click="search" placeholder="告诉我你想搜索的内容"></i-Input>
      <a class="person-link" href="javascript:void(0)" @click.stop="person_menu_show">
        <Icon ref="person" class="person" type="person" ></Icon>
      </a>
    </div>

    
  </div>
</template>

<script type='text/ecmascript-6'>
  import { getCookie, setCookie } from '~/common/cookie'
  export default {
    props: {
      loginState: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        search_value: '',
        person_menu_state: 0,        //个人菜单栏的显示状态
        userInfo: {                //用户信息
          phone: '',
          userName: '',
          password: '',
          _password: '',
          vailNum: '',
        },     
        registerModalState: true
      }
    },
    mounted() {
      this.per_menu_hidden()
    },
    methods: {
      //搜索
      search(){
        setCookie('search_content', this.search_value)

        location.pathname = '/search'
      },
      //跳到个人中心的判断
      linkCenter(){
        this.loginState === 0 ? this.$Message.warning('请先登录') : ''
      },
      // 初始化点击外部隐藏person_menu
      per_menu_hidden() {
        let _this = this
        document.onclick = function () {
          _this.person_menu_state = 0
        }
      },
      //点击小人触发person_menu显示
      person_menu_show() {
        this.person_menu_state = !this.person_menu_state
      },
      signin(state) {
        let _this = this
        if (!state) {
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
        }else{
          setCookie('phone', '')
          setCookie('password', '')
          setCookie('userId', '')
          this.$emit('updataloginstate', 0)
          this.person_menu_state = 0
          this.$Message.success('登出成功')
        }
      },
      register() {
        let _this = this
        this.person_menu_show()
        this.$Modal.confirm({
          width: '320px',
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
      }
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
.header-mobile {
  width: 100%;
  .menu {
    width: 160px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 30px 20px;
    background-color: #f0f3f3;
    box-shadow: inset -1px 0 1px 0px rgba(0, 0, 0, 0.125);
    .menu-header {
      width: 100%;
      text-align: center;
      .avater {
        width: 50px;
        height: 50px;
        display: inline-block;
        border-radius: 50%;
      }
    }
    .wrapper {
      width: 100%;
      margin-top: 20px;
      .per-item {
        position: relative;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ivu-icon {
          color: $mainC;
          font-size: 14px;
        }
      }
      .per-item:after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 2px;
        background-image: url(../../assets/images/title-line.png);
        background-size: 3px 2px;
        background-repeat: repeat;
      }
    }
  }
  .panel {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    .person-link {
      flex: 0 0 40px;
      display: inline-flex;
      justify-content: center;
      color: $mainC;
      font-size: 18px;
    }
    .search {
      flex: 1;
      display: inline-flex;
      justify-content: center;
      margin: 0 0 0 10px;
    }
  }
  .personMenu-enter-active,
  .personMenu-leave-active {
    transition: all 0.5s;
  }
  .personMenu-enter,
  .personMenu-leave-to {
    transform: translate(-140px, 0);
    opacity: 0;
  }
}
</style>