<template>
  <div class="page">
    <mt-header class="header" :fixed="true" title="固定在顶部">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>

  </div>
</template>

<script>
  import { Header } from 'mint-ui';
export default {
  components: {Header},
  name: "ScrollDemo",

  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    // margin: 44px 0 0 0;
    height: 100vh;
    width: 100%;
    background-color: white;
  }

  .header {
    font-size: 16px;
    font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
    font-weight: bold;
    height: 44px;
  }
</style>
