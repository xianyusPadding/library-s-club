<template>
  <div class="com-container">
    <!-- <div class="actions">
      <Button type="primary" size="small" style="padding: " @click="append(0)">新增</Button>
    </div> -->
    
    <Table ref="table" border :columns="columns" :data="list_data"></Table>
    <div class="block" v-if="total_num/page_size > 1">
      <Page class="page" :page-size="page_size" :total="total_num" size="small" show-elevator @on-change="updata_page"></Page>
    </div>
    <!-- 富文本编辑器 -->
    <Modal
      v-model='editorModal'
      width="750"
      @on-ok="editor_ok"
      @on-cancel="editor_cancel" class="editorModal">
      <div class="editors" style="margin-top: 30px;"></div>
    </Modal>  
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      typeId: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        //设定一个全局的editor
        editor: '',
        editorModal: false,
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
            title: "标题",
            key: "title",
            align: 'center',
            fixed: 'left',
            width: 160,
            render: (h, params) => {
              return h("strong", params.row.title);
            }
          },
          {
            title: "封面",
            key: "img_url",
            align: "center",
            width: 140,
            render: (h, params) => {
              return h(
                "div",
                {
                  style: {
                    textAligns: "center"
                  }
                },
                [
                  h("img", {
                    attrs: {
                      src: params.row.img_url
                    },
                    style: {
                      width: "50px",
                      display: "inline-block",
                      borderRadius: "4px"
                    }
                  })
                ]
              );
            }
          },
          {
            title: "纸质书价格",
            key: "e_price",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.e_price);
            }
          },
          {
            title: "电子书价格",
            key: "price",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.price);
            }
          },
          {
            title: "作者",
            key: "author",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.author);
            }
          },
          {
            title: "译者",
            key: "translator",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.translator);
            }
          },
          {
            title: "出版日期",
            key: "publication_date",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.publication_date);
            }
          },
          {
            title: "出版状态",
            key: "publication_state",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.publication_state);
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
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.updata(params.index);
                      }
                    }
                  },
                  "修改"
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
                        this.write_intro(params.index);
                      }
                    }
                  },
                  "撰写本书特色"
                )
              ]);
            }
          }
        ],
        list_data: [],      //表格数据
        total_num: 0,       //总数
        page_size: 10,      //每页显示的数量
        pageIndex: 1,       //当前的页码
        data_id: 0,         //图书在使用富文本编辑时的id
      };
    },
    created() {
      this.get_list_data(1)
    },
    mounted() {
      this.editor_init()
    },
    methods: {
      //初始化富文本
      editor_init() {
        let wangeditor = require('wangeditor')

        this.editor = new wangeditor(".editors");
        // this.editor.customConfig.uploadImgServer = '/ddlife/api/file/upload_editor.do'

        this.editor.create();

      },
      //撰写文章
      write_intro(index) {
        this.editor.txt.html(this.list_data[index].intro)

        this.editorModal = true

        this.data_id = this.list_data[index]._id
      },
      editor_ok() {
        let id = this.data_id
        let content = {
          intro: this.editor.txt.html()
        }

        this.$http.post(`/api/v0/books/update`, {
          bookId: id,
          content: content
        }).then(res => {
          if (res.data.message === 'Success') {
            if(res.data.ok === 1){
              this.$Message.success('修改成功')
            }else{
              this.$Message.warning('修改出错')
            }
          }
        }, res => {
          this.$Message.warning('修改出错')
          console.log(res)
        })
      },
      editor_cancel() {
      },
      //获取文章列表
      get_list_data(curr_page) {
        let page_size = this.page_size
        this.$http.get(`/api/v0/books/all?currPage=${curr_page}&pageSize=${page_size}&easyState=0`).then(res => {
          this.list_data = res.data.books
          this.total_num = res.data.count
        }, res => {
          console.log(res)
        })
      },
      remove(index) {
        let id = this.list_data[index]._id
        this.$http.post(`/api/v0/books/remove`, {
          bookId: id
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
      append(index) {
        let _this = this
        let newData = {
          head_img: ''
        };

        this.$Modal.confirm({
          render: h => {
            return h("ul", [
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "标题："
                  ),
                  h("Input", {
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.title = val;
                      }
                    }
                  })
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "排序："
                  ),
                  h("Input", {
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.sort = val;
                      }
                    }
                  })
                ]
              ),
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
                  h("span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "图片上传："
                  ),
                  h("Upload",
                    {
                      props: {
                        type: "drag",
                        // action: "/ddlife/api/file/upload.do",
                        'on-success': function (res) {
                          if (res.message === 'Success') {
                            newData.head_img = res.data
                          }
                        }
                      },
                      style: {
                        flex: 1
                      },
                      on: {
                        success: (response, file, fileList) => {
                          // console.log('success');
                        },
                        error: () => {
                          console.log('error');
                        },
                        preview: file => {
                          // console.log(file.response);
                        }
                      }
                    },
                    [
                      h("div", [
                        h("Icon", {
                          props: {
                            type: "ios-cloud-upload",
                            size: "52"
                          },
                          style: {
                            color: "#3399ff"
                          }
                        })
                      ])
                    ]
                  )
                ]
              )
            ]);
          },
          onOk: () => {
            newData.head_img = newData.head_img
            newData.type_id = _this.typeId
            _this.$http.post(``).then(res => {
            }, res => {
              console.log(res)
            })
            _this.list_data.splice(index, 0, newData);
          }
        });
      },
      updata(index) {
        let _this = this
        let newData = this.list_data[index]
        let content = {}

        this.$Modal.confirm({
          render: h => {
            return h("ul", [
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "标题："
                  ),
                  h("Input", {
                    props: {
                      value: this.list_data[index].title
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.title = val;
                        content.title = val;
                      }
                    }
                  })
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "封面上传："
                  ),
                  h(
                    "Upload",
                    {
                      props: {
                        type: "drag",
                        action: "/ddlife/api/file/upload.do",
                        'on-success': function (res) {
                          if (res.message === 'Success') {
                            // newData.img_url = res.data
                          }
                        }
                      },
                      style: {
                        flex: 1
                      }
                    },
                    [
                      h("div", [
                        h("Icon", {
                          props: {
                            type: "ios-cloud-upload",
                            size: "52"
                          },
                          style: {
                            color: "#3399ff"
                          }
                        })
                      ])
                    ]
                  )
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "纸质书价格："
                  ),
                  h("Input", {
                    props: {
                      value: this.list_data[index].e_price
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.e_price = val;
                        content.e_price = val;
                      }
                    }
                  })
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "电子书价格："
                  ),
                  h("Input", {
                    props: {
                      value: this.list_data[index].price
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.price = val;
                        content.price = val;
                      }
                    }
                  })
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "作者："
                  ),
                  h("Input", {
                    props: {
                      value: this.list_data[index].author
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.author = val;
                        content.author = val;
                      }
                    }
                  })
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "译者："
                  ),
                  h("Input", {
                    props: {
                      value: this.list_data[index].translator
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.translator = val;
                        content.translator = val;
                      }
                    }
                  })
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "出版日期："
                  ),
                  h("DatePicker", {
                    props: {
                      value: this.list_data[index].publication_date
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      'on-change': val => {
                        newData.publication_date = val;
                        content.publication_date = val;
                      }
                    }
                  })
                ]
              ),
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
                  h(
                    "span",
                    {
                      style: {
                        flex: "0 0 60px"
                      }
                    },
                    "出版状态："
                  ),
                  h("Input", {
                    props: {
                      value: this.list_data[index].publication_state
                    },
                    style: {
                      flex: "1"
                    },
                    on: {
                      input: val => {
                        newData.publication_state = val;
                        content.publication_state = val;
                      }
                    }
                  })
                ]
              ),
            ]);
          },
          onOk: () => {
            newData.type_id = _this.typeId
            _this.$http.post('/api/v0/books/update', {
              bookId: newData._id,
              content: content
            }).then(res => {
              if(res.data.ok === 1){
                this.$Message.success('修改成功')
                _this.list_data.splice(index, 1, newData);
              }else{
                this.$Message.warning('修改出错')
              }
            }, res => {
              this.$Message.warning('修改出错')
              console.log(res)
            })
          }
        });
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