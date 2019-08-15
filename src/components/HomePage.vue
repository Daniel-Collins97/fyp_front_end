<template>
  <div class="main-container">
    <div class="sections">
      <router-link to="/Stats" class="primary-section">
        <img class="view-sensor-data" src="../assets/statistics.jpg">
        <div class="primary-area-text">
          Sensor Stats
        </div>
      </router-link>
      <div class="secondary-section">
        <router-link to="/Users" class="view-users">
          <img class="users-image" src="../assets/users.png">
          <div class="users-area-text">
            users
          </div>
        </router-link>
        <router-link to="/Games" class="view-games">
          <img class="games-image" src="../assets/games.png">
          <div class="games-area-text">
            games
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  title: 'Home Page',
}
</script>

<style lang='scss' scoped>
.main-container {
  text-align: center;
  height: 100vh;
  width: 100vw;

  .sections {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 48vh 48vh;
    padding: 2vh 25vw 2vh 25vw;

    .primary-section {
      height: 90%;
      background-color: #f7f7f7;
      border-radius: 15px;
      opacity: 0.8;
      width: 48%;
      margin-left: 25%;
      .view-sensor-data {
        margin-top: 40px;
        height: auto;
        width: 40%;
      }

      .primary-area-text {
        padding-top: 50px;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 2vw;
        color: black; 
      }
    }

    .secondary-section {
      display: grid;
      grid-template-columns: 50% 50%;

      .view-users {
        background-color: #f7f7f7;
        opacity: 0.8;
        margin: 0 5% 5% 0;
        border-radius: 5%;

        .users-image {
          margin-top: 40px;
          height: auto;
          width: 40%;
        }

        .users-area-text {
          padding-top: 50px;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 2vw;
          color: black; 
        }
      }

      .view-games {
        background-color: #f7f7f7;
        margin: 0 0 5% 5%;
        border-radius: 5%;
        opacity: 0.8;

        .games-image {
          margin-top: 40px;
          height: auto;
          width: 40%;
        }

        .games-area-text {
          padding-top: 50px;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 2vw;
          color: black; 
        }
      }
    }
  }
}
</style>
