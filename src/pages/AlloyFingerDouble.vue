<template>
  <div class="main-div">
    <!-- <div class="blue-div" v-finger:touch-start="blueTouchStart" v-finger:touch-move="blueTouchMove" v-finger:touch-end="blueTouchEnd"> -->
    <div class="blue-div" v-finger:tap="blueTap">
      <div v-finger:touch-start="greenTouchStart" v-finger:touch-move="greenTouchMove" v-finger:touch-end="greenTouchEnd">
        <!-- <div class="red-div" v-finger:touch-start="redTouchStart" v-finger:touch-move="redTouchMove" v-finger:touch-end="redTouchEnd"> -->
        <div class="red-div" v-finger:tap="redTap">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlloyFingerDemo',

  data () {
    return {
    }
  },

  methods: {
    // touchStart事件
    blueTouchStart (e) {
      console.log('touch start in 【Blue】')
    },

    greenTouchStart (e) {
      e.stopPropagation();
      e.preventDefault();
      console.log('touch start in 【Green】')
    },

    redTouchStart (e) {
      console.log('touch start in 【Red】')
    },

    // touchMove事件
    blueTouchMove (e) {
      console.log('touch move in 【Blue】')
    },

    greenTouchMove (e) {
      e.stopPropagation();
      e.preventDefault();
      console.log('touch move in 【Green】')
    },

    redTouchMove (e) {
      console.log('touch move in 【Red】')
    },

    blueTouchEnd (e) {
      console.log('touch end in 【Blue】')
    },

    // touchEnd事件
    greenTouchEnd (e) {
      e.stopPropagation();
      e.preventDefault();
      console.log('touch end in 【Green】')
    },

    redTouchEnd (e) {
      console.log('touch end in 【Red】')
    },

    // tap事件
    blueTap (e) {
      console.log('tap in 【blue】')
    },

    greenTap (e) {
      console.log('tap in 【Green】')
    },

    redTap (e) {
      console.log('tap in 【Red】')
    }
  }
}
</script>

<style scoped>
.main-div {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.blue-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 300px;
  background-color: blue;
  /* z-index: 1; */
}

.green-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  overflow: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background-color: green;
  /* z-index: 2; */
}

.red-div {
  /* margin-left: 50px; */
  height: 100px;
  width: 100px;
  background-color: red;
  border: solid;
}
</style>
