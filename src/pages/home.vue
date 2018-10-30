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

    <button class="btn" v-for="(info,index) in btnArray" :key="index" @click="info.handler">{{info.title}}</button>
  </div>
</template>

<script>
  export default {
    name: "home",

    data () {
      return {
        btnArray: [{title: '路由Path跳转(不带参数)', handler: this.action1},
                   {title: '路由name跳转(带参数)', handler: this.action2},
                   {title: '路由name跳转(带参数,多个)', handler: this.action3},
                   {title: '子路由path跳转(不带参数)', handler: this.action4},
                   {title: '无限滚动(未完成)', handler: this.action5},
                   {title: 'AlloyFinger demo', handler: this.action6},
                   {title: '皮肤', handler: this.action7},
                   {title: '插件demo', handler: this.action8},
                   {title: 'AsyncDemo', handler: this.action9}]
      }
    },

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
      },

      action7 () {
        this.$router.push({
          name: 'Skin'
        })
      },

      action8 () {
        this.$router.push({
          name: 'PluginDemo'
        })
      },

      action9 () {
        this.$router.push({
          name: 'AsyncDemo'
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
    overflow: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
</style>
