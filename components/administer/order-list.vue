<template>
  <div class="com-container">    
    <Table ref="table" border :columns="columns" :data="list_data"></Table>
    <div class="block" v-if="total_num/page_size > 1">
      <Page class="page" :page-size="page_size" :total="total_num" size="small" show-elevator @on-change="updata_page"></Page>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        columns: [          //表格第一行数据
          {
            title: "序号",
            key: "index",
            width: 70,
            fixed: 'left',
            render: (h, params) => {
              return h("strong", this.pageIndex - 1 === 0 ? params.index : (this.pageIndex - 1) + String(params.index));
            }
          },
          {
            title: "用户名",
            key: "userName",
            align: 'center',
            fixed: 'left',
            width: 160,
            render: (h, params) => {
              return h("strong", params.row.userName);
            }
          },
          {
            title: "状态",
            key: "state",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.state === 1 ? '待发货' : params.row.state === 2 ? '已发货' : '已收货');
            }
          },
          {
            title: "购买清单",
            key: "books",
            align: 'center',
            width: 300,
            render: (h, params) => {
              return h("strong", params.row.books.map( x => {
                return `${x.title} 数量：${x.num}`
              }));
            }
          },
          {
            title: "手机号码",
            key: "phone",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.phone);
            }
          },
          {
            title: "地址",
            key: "address",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.address);
            }
          },
          {
            title: "总价",
            key: "totalPrice",
            align: 'center',
            width: 300,
            render: (h, params) => {
              return h("strong", params.row.totalPrice);
            }
          },
          {
            title: "下单时间",
            key: "totalPrice",
            align: 'center',
            width: 300,
            render: (h, params) => {
              return h("strong", params.row.meta.createdAt);
            }
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            fixed: 'right',
            width: 250,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display: params.row.state === 1 ? '' : 'none'
                    },
                    on: {
                      click: () => {
                        this.sendOrOk(params.index, 2);
                      }
                    }
                  },
                  "发货"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display: params.row.state === 2 ? '' : 'none'
                    },
                    on: {
                      click: () => {
                        this.sendOrOk(params.index, 3);
                      }
                    }
                  },
                  "确认收货"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        list_data: [],      //表格数据
        total_num: 0,       //总数
        page_size: 10,      //每页显示的数量
        pageIndex: 1,       //当前的页码
      };
    },
    created() {
      this.get_list_data(1)
    },
    methods: {
      //获取数据列表
      get_list_data(curr_page) {
        let page_size = this.page_size
        this.$http.get(`/api/v0/order/all?pageSize=${page_size}&currPage=${curr_page}`).then(res => {
          this.list_data = res.data.orders
          this.total_num = res.data.count
        }, res => {
          console.log(res)
        })
      },
      remove(index) {
        let id = this.list_data[index]._id

        
        this.$http.post(`/api/v0/order/remove`, {
          orderId: id
        }).then(res => {
          if(res.data.ok === 1){
            this.$Message.success('删除成功')
            this.list_data.splice(index, 1)
          }else{
            this.$Message.warning('删除出错')
          }
          
        }, res => {
          this.$Message.warning('删除出错')
          console.log(res)
        })
        
      },
      sendOrOk(index, state){
        let id = this.list_data[index]._id

        this.$http.post('/api/v0/order/sendOrOk', {
          orderId: id,
          state: state
        }).then( res => {
          if(res.data.ok === 1){
            state === 2 ? this.$Message.success('发货成功') : this.$Message.success('确认收货成功') 

            this.list_data[index].state = state
          }else{
            state === 2 ? this.$Message.warning('发货出错') : this.$Message.warning('确认收货出错') 
          }
        }, res => {
          state === 2 ? this.$Message.warning('发货出错') : this.$Message.warning('确认收货出错') 
          console.log(res)
        })
      },
      updata_page(index) {
        this.get_list_data(index)
        this.pageIndex = index
      }
    },
    components: {
    }
  };
</script>

<style lang='scss' scoped='' type='text/css'>
@import "../../assets/css/color.scss";
.com-container {
  width: 100%;
  .actions {
    width: 100%;  
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .block {
    display: flex;
    justify-content: flex-end;
    .page {
      margin: 30px 0 20px 0;
    }
  }
}
</style>