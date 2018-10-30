<template>
  <div class="page">
    <div class="text-area" ref="contentArea">
      <pre>{{textStr}}</pre>
    </div>
  </div>
</template>

<script>
import fetch from './../../config/fetch2.js'
export default {
  name: 'AsyncDemoChild',

  data () {
    return {
      textStr: ''
    }
  },

  created () {
    this.sentRequest()
  },

  methods: {
    setContent (str) {
      this.textStr += str
    },

    request (pathArr, params) {
      return fetch('/goods/page/client', '/api', params, 'JSON', 'POST', 'JSON', pathArr)
    },

    sentRequest () {
      this.setContent('send request')
      this.request([10, 1], {}).then(() => {
      }).catch((err) => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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

.text-area {
  width: 100%;
  height: 400px;
  background-color: black;
  color: white;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
