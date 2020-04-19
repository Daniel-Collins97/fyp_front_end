<template>
  <div id="app">
    <div class="header">
      <router-link to="/">
        <img class="header-image" src="../static/RugbySensorTech.png">
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 96vh;

  .header {
    height: 20%;
    width: 10%;
    float: left;
    position: absolute;

    .header-image {
      height: auto;
      width: 100%;
    }
  }
}

body {
  background-image: url("./assets/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
