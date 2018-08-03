<template>
  <div>
    <!--声明式-->
    <router-link class="link" to="/target">
      <button class="btn">路由Path跳转(不带参数)</button>
    </router-link>
    <router-link class="link" to="/target/123">
      <button class="btn">路由Path跳转(带参数)</button>
    </router-link>
    <router-link class="link" to="/target/123/张三">
      <button class="btn">路由Path跳转(带参数,多个)</button>
    </router-link>

    <!--编程式-->
    <button class="btn" @click="action1">路由name跳转(不带参数)</button>
    <button class="btn" @click="action2">路由name跳转(带参数)</button>
    <button class="btn" @click="action3">路由name跳转(带参数,多个)</button>
    <button class="btn" @click="action4">子路由path跳转(不带参数)</button>

    <!-- 无限滚动demo -->
    <button class="btn" @click="action5">无限滚动(未完成)</button>

    <button class="btn" @click="action6">AlloyFinger demo</button>
  </div>
</template>

<script>
  export default {
    name: "home",

    methods: {
      action1() {
        this.$router.push({
          name: 'Target'
        })
      },

      action2() {
        this.$router.push({
          name: 'target',
          params: {userId: '1234'}
        })
      },

      action3() {
        this.$router.push({
          name: 'target',
          params: {userId: '1234',userName: '李四'}
        })
      },

      action4() {
        this.$router.push({
          path: '/target/childTarget'
        })
      },

      action5(){
        this.$router.push({
          name: 'ScrollDemo'
        })
      },

      action6() {
        this.$router.push({
          name: 'AlloyFingerDouble'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/home.scss";

  .container {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
