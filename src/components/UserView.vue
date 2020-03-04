<template>
  <div class="main-player-container">
    <div class="table-container">
      <div class="player-profile-header">
        <img class="player-profile-image" src="../assets/player-profile.png">
      </div>
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
          <div class="player-info-details-row">{{ ctx.height }}</div>
          <div class="player-info-details-row">{{ ctx.weight }}</div>
          <div class="player-info-details-row">{{ctx.position }}</div>
          <div class="player-info-details-row">{{ harmfulImpactsMsg }}</div>
          <div class="player-info-details-row">{{ highestForce }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  title: 'User View',
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
      harmfulImpactsMsg: 'Value to be calculated',
      highestForceMsg: 'Force Value to be calculated',
      infoTitles: ['first name', 'last name', 'age', 'height', 'weight', 'position', 'potentially harmful impacts received', 'highest force recieved']
    }
  },
  created() {},
  methods: {
    
  }
}
</script>

<style lang='scss' scoped>
.main-player-container {
  width: 24vw;
  height: 90vh;

  .table-container {
    background-color: #f7f7f7;
    display: grid;
    grid-template-rows: 40% 60%;
    height: 100%;
    align-items: center;
    padding: 7%;

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

      &-titles {
        font-weight: bold;
        display: grid;
        grid-template-rows: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
        text-transform: capitalize;

        &-row {
          border-bottom: 1px solid;
        }
      }

      &-details {
        display: grid;
        grid-template-rows: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;

        &-row {
          border-left: 2px solid;
        }
      }
    }
  }
}
</style>
