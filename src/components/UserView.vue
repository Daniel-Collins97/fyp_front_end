<template>
  <div class="main-player-container">
    <div class="table-container">
      <div class="player-info">
        <div class="player-info-titles">
          <div 
            v-for="(item, index) in infoTitles"
            :key="index"
            :item="item"
            class="player-info-titles-row"
          >
          {{ item }} </div>
        </div>
        <div class="player-info-details">
          <div class="player-info-details-row">{{ ctx.firstName }}</div>
          <div class="player-info-details-row">{{ ctx.lastName }}</div>
          <div class="player-info-details-row">{{ ctx.age }}</div>
          <div class="player-info-details-row">{{ ctx.height }}cm</div>
          <div class="player-info-details-row">{{ ctx.weight }}Kg</div>
          <div class="player-info-details-row">{{ ctx.position }}</div>
          <div class="player-info-details-row">{{ totalHarmfulImpacts }}</div>
          <div class="player-info-details-row">{{ highestForce }}G's</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersApi from '@/api/users';
import sensorApi from '@/api/sensors';
import gamesApi from '@/api/games';

export default {
  title: 'Player View',
  props: {
    ctx: {
      type: Object,
      default: () => {},
    },
    highestForce: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      totalHarmfulImpacts: null,
      infoTitles: ['first name', 'last name', 'age', 'height', 'weight', 'position', 'potentially harmful impacts', 'highest force recieved']
    }
  },
  created() {
    this.calculateHarmfulImpacts();
  },
  methods: {
    async calculateHarmfulImpacts() {
      let userData = await usersApi.getUsersById(this.ctx.id)
      this.userData = userData.data[0];
      let gameData = await gamesApi.getUsersGames(this.ctx.id)
      this.gameData = gameData.data;
      let sensorData = await sensorApi.getSensorDataFromSpecificUser(this.ctx.id);
      this.userSensorData = sensorData.data;
      let harmfulImpacts = [];

      this.userSensorData.forEach((sensorValue) => {
        if (sensorValue.impact_force > 65) {
          harmfulImpacts.push(sensorValue.impact_force)
        }
      });
      this.totalHarmfulImpacts = harmfulImpacts.length;
    },
  }
}
</script>

<style lang='scss' scoped>
.main-player-container {
  width: 30vw;
  height: 80%;

  .table-container {
    background-color: #f7f7f7;
    display: grid;
    height: 100%;
    align-items: center;
    padding: 7%;
    opacity: 0.8;
    border-radius: 25px;
    margin-top: 135px;

    .player-profile-header {
      height: 100%;
      width: 100%;

      .player-profile-image {
        width: 100%;
        height: 100%;
        margin: auto;
      }
    }

    .player-info {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
      font-size: 13px;

      &-titles {
        font-weight: bold;
        display: grid;
        grid-template-rows: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
        text-transform: capitalize;

        &-row {
          border-bottom: 1px solid;
          padding-top: 10%;
        }
      }

      &-details {
        display: grid;
        grid-template-rows: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;

        &-row {
          border-left: 2px solid;
          padding-top: 10%;
          border-bottom: 1px solid;
        }
      }
    }
  }
}
</style>
