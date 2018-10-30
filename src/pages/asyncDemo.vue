<template>
  <div class="page">
    <!-- <button class="btn-new" @click="longPromise">长时间Promise</button> -->
    <!-- <button class="btn-new" @click="shortPromise">短时间Promise</button> -->
    <button class="btn-new" @click="jumpToNext">跳转</button>
    <button class="btn-new" @click="clean">清除</button>
    <div class="text-area" ref="contentArea">
      <pre>{{textStr}}</pre>
    </div>
  </div>
</template>

<script>
import fetch from './../../config/fetch2.js'
export default {
  name: 'AsyncDemo',

  data () {
    return {
      textStr: ''
    }
  },

  created () {
    for (let index = 0; index < 10; index++) {
      this.longPromise();
    }
  },

  methods: {
    setContent (str) {
      this.textStr += str
    },

    testPromise (timeout) {
      return new Promise((resolve, reject) => {
        let str = '延迟时间: ' + timeout
        if (this.textStr.length > 0) {
          this.setContent('\n')
        }
        this.setContent(str)
        setTimeout(() => {
          resolve()
        }, timeout);
      })
    },

    async testAsyncWait (timeout) {
      await this.testPromise(timeout)
    },

    request (pathArr, params) {
      return fetch('/goods/page/client', '/api', params, 'JSON', 'POST', 'JSON', pathArr)
    },

    longPromise () {
      this.setContent('send request')
      this.request([10, 1], {}).then(() => {
        this.setContent('\n')
        this.setContent('请求成功')
      }).catch((err) => {
        this.setContent('\n')
        this.setContent(err)
      })
    },

    shortPromise () {
      this.testAsyncWait(2000).then(() => {
        let str = '短时间Promise响应'
        this.setContent('\n')
        this.setContent(str)
      }).catch((err) => {
        console.log(err.message)
      })
    },
    
    jumpToNext () {
      this.$router.push({
        name: 'AsyncDemoChild'
      })
    },

    clean () {
      this.textStr = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
.page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
}

.btn-new {
  @extend .btn;
  margin: 10px;
  width: calc(100vw - 20px);
}

.text-area {
  width: 100%;
  height: 400px;
  background-color: black;
  color: white;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
