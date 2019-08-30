<!--以后项目的根组件，组件入口-->
<template><!--html页面结构-->
  <span v-text="msg" class="red"></span>
</template>

<script>
/* 负责导出 .Vue这个组件对象（它本质上是一个vue对象），所以vue中该定义的元素都可以使用 */
export default {
  data () {
    return {
      msg: 'hello vue.js'
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style scoped>/*scoped 表示该css样式写在这里，并且这里的代码只是在当前组件页面上有效，不会影响其他组件*/
  .red {
    color:red;
  }
</style>
