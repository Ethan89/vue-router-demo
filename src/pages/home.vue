<template>
  <div>
    <router-link class="link" to="/target">
      <button class="btn">路由Path跳转(不带参数)</button>
    </router-link>
    <router-link class="link" to="/target/123">
      <button class="btn">路由Path跳转(带参数)</button>
    </router-link>
    <router-link class="link" to="/target/123/张三">
      <button class="btn">路由Path跳转(带参数,多个)</button>
    </router-link>

    <button class="btn" @click="action1">路由name跳转(不带参数)</button>
    <button class="btn" @click="action2">路由name跳转(带参数)</button>
    <button class="btn" @click="action3">路由name跳转(带参数,多个)</button>
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
      }
    }
  }
</script>

<style scoped>
  .link {
    text-decoration: none;
  }
  .btn {
    display: block;
    width: 100%;
    height: 40px;
    background-color: #00BCF3;
    color: white;
    margin-top: 10px;
  }
</style>
