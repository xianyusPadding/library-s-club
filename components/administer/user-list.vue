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
    props: {
      powerVal: {
        type: Number,
        default: 2
      }
    },
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
            title: "手机号码",
            key: "phone",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.phone);
            }
          },
          {
            title: "权限",
            key: "power",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.power === 1 ? '普通用户' : params.row.power === 2 ? '管理员': '超级管理员');
            }
          },
          {
            title: "简介",
            key: "introduction",
            align: 'center',
            width: 300,
            render: (h, params) => {
              return h("strong", params.row.introduction);
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
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  },
                  "删除"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      display: this.powerVal === 3 ? '' : 'none',
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.update_power(params.index);
                      }
                    }
                  },
                  "修改权限"
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
      console.log(this.powerVal)
      this.get_list_data(1)
    },
    methods: {
      //获取数据列表
      get_list_data(curr_page) {
        let page_size = this.page_size
        this.$http.get(`/api/v0/user/all?pageSize=${page_size}&currPage=${curr_page}`).then(res => {
          this.list_data = res.data.user
          this.total_num = res.data.count
        }, res => {
          console.log(res)
        })
      },
      remove(index) {
        let id = this.list_data[index]._id

        if(this.powerVal === 2 && this.list_data[index].power > 1){
          this.$Message.warning('没有权限')
        }else if(this.powerVal === 3 && this.list_data[index].power === 3){
          this.$Message.warning('不能删除自己')
        }else{
          this.$http.post(`/api/v0/user/remove`, {
            userId: id
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
        }
      },
      update_power(index){
        let _this = this
        this.power_val = this.list_data[index].power
        
        this.$Modal.confirm({
           render: h => {
            return h('div', {
              style: {
                display: "flex",
                marginBottom: "14px",
                alignItems: "center"
              }
            }, [
              h(
                "span",
                {
                  style: {
                    flex: "0 0 120px"
                  }
                },
                "是否设置为管理员："
              ),
              h("input", {
                attrs: {
                  type: 'checkbox',
                  name: 'admin',
                  checked: this.list_data[index].power > 1 ? true : false
                },
                on: {
                  click: function(e){
                    if(_this.power_val === 3){
                      return 
                    }else {
                      _this.list_data[index].power === 2 ? _this.power_val = 1 : _this.power_val = 2
                    }
                  }
                },
              }, '是')
            ])
           },
           onOk: () => {
            let id = this.list_data[index]._id
            let power = this.power_val

            this.$http.post('/api/v0/user/power', {
              userId: id,
              power: power
            }).then( res => {
              if(res.data.ok === 1){
                this.$Message.success('修改权限成功')
                this.list_data[index].power = power
              }
            }, res => {
              console.log(res)
            })
           }
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