<template>
  <div class="block-shadow" id="write">
    <i-input placeholder="标题:" class="title-input" v-model="title_val"></i-input>
    <div class="wangeditor"></div>

    <div class="editor-actions">
      <Button type="primary" class="action-item" @click="update_editor_state">关闭</Button>
      <Button type="primary" class="action-item" @click="submit">提交</Button>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { getCookie } from '~/common/cookie'
  export default {
    props: {
    },
    data () {
      return {
        title_val: '',
        editor: ''
      }
    },
    methods: {
      editor_init(){
        let wangeditor = require('wangeditor')
        this.editor = new wangeditor('.wangeditor')

        this.editor.create()
      },
      //更爱编辑器的状态
      update_editor_state(){
        this._events.updateeditorstate[0]()
      },
      submit(){
        if(!this.title_val){
          this.$Message.warning('标题不得为空!');
          return
        } else if(!this.editor.txt.html()){
          this.$Message.warning('内容不得为空!');
          return
        }

        this.$Modal.confirm({
          title: '提示',
          content: '<p style="margin-left: 40px;line-height: 50px">确定提交吗?<p>',
          onOk: () => {
            this.$http.post('/api/v0/user/article', {
              userId: getCookie('userId'),
              title: this.title_val,
              content: this.editor.txt.html(),
              summary: this.editor.txt.text().substr(0, 120)
            }).then( res => {
              if(res.data.code === 0){
                this.$Message.success('提交成功!');
                this._events.updateeditorstate[0]()
              }
            }, res => {
              console.log(res)
            })
          }
        });
      }
    },
    mounted(){
      this.editor_init()
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
  #write{
    .title-input{
      margin-bottom: 14px;
    }
    .wangeditor{
      position: relative;
      z-index: 0;
    }
    .editor-actions{
      width: 100%;
      margin-top: 14px;
      display: flex;
      justify-content: flex-end;
      .action-item:nth-child(1){
        margin-right: 10px;
      }
    }
  }
</style>