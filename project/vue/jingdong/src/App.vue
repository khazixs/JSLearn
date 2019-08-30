<template>
  <div id="app">
    <topbar1></topbar1>
    <router-view></router-view>
  </div>
</template>

<script>//根组件
import Topbar1 from './components/Topbar1'
export default {
  components: {'topbar1':Topbar1}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
