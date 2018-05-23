<template>
  <div>
    <span>参数1:</span>
    <span>{{param1}}</span>
    <span>参数2:</span>
    <span>{{param2}}</span>
  </div>
</template>

<script>
  export default {
    name: "Target",

    data() {
      return {
        param1: '没有参数',
        param2: '没有参数'
      }
    },

    mounted() {
      console.log(this.$route.params)

      if (this.$route.params.userId) {
        this.param1 = this.$route.params.userId
      }

      if (this.$route.params.userName) {
        this.param2 = this.$route.params.userName
      }
    },
  }
</script>

<style scoped>

</style>
