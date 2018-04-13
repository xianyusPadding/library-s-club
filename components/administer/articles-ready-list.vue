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
            title: "作者",
            key: "author",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.author);
            }
          },
          {
            title: "写作时间",
            key: "writeTime",
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h("strong", params.row.writeTime);
            }
          },
          {
            title: "概要",
            key: "summary",
            align: 'center',
            width: 340,
            render: (h, params) => {
              return h("strong", params.row.summary);
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
                        this.release(params.index);
                      }
                    }
                  },
                  "发布"
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
                        this.return(params.index);
                      }
                    }
                  },
                  "回退用户"
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
                        this.write_content(params.index);
                      }
                    }
                  },
                  "查看正文"
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
        type_id: 2,         //文章类型
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
      write_content(index) {
        this.editor.txt.html(this.list_data[index].content)

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
        this.$http.get(`/api/v0/articles/all?currPage=${curr_page}&pageSize=${page_size}&easyState=0&typeId=${this.type_id}`).then(res => {
          this.list_data = res.data.articles
          this.total_num = res.data.count
        }, res => {
          console.log(res)
        })
      },
      remove(index) {
        let id = this.list_data[index]._id
        this.$http.post(`/api/v0/articles/remove`, {
          articleId: id
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
      return(index){
        let _this = this
        let id = this.list_data[index]._id

        _this.$http.post('/api/v0/articles/update', {
          articleId: id,
          content: {
            type_id: 3
          }
        }).then(res => {
          if(res.data.ok === 1){
            this.$Message.success('回退成功')
            _this.list_data.splice(index, 1);
          }else{
            this.$Message.warning('回退出错')
          }
        }, res => {
          this.$Message.warning('回退出错')
          console.log(res)
        })
      },
      release(index){
        let _this = this
        let id = this.list_data[index]._id

        _this.$http.post('/api/v0/articles/update', {
          articleId: id,
          content: {
            type_id: 1
          }
        }).then(res => {
          if(res.data.ok === 1){
            this.$Message.success('发布成功')
            _this.list_data.splice(index, 1);
          }else{
            this.$Message.warning('发布出错')
          }
        }, res => {
          this.$Message.warning('发布出错')
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