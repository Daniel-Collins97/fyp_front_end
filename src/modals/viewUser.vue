<template>
  <b-modal
    v-model="showModal"
    hide-footer
    hide-header
  >
    <div class="main-container">
      <div class="table-container">
        <div class="player-profile-header">
          <img class="player-profile-image" src="../assets/player-profile.png">
        </div>
        <div class="player-info">
          <div class="player-info-titles">
            <div class="player-info-titles-row">First Name</div>
            <div class="player-info-titles-row">Last Name</div>
            <div class="player-info-titles-row">Age</div>
            <div class="player-info-titles-row">Height</div>
            <div class="player-info-titles-row">Weight</div>
            <div class="player-info-titles-row">Position</div>
            <div class="player-info-titles-row">Potentially Harmful Impacts Received</div>
            <div class="player-info-titles-row">Highest Force Received</div>
          </div>
          <div v-if="modalInfo" class="player-info-details">
            <div class="player-info-details-row">{{ modalInfo.firstName }}</div>
            <div class="player-info-details-row">{{ modalInfo.lastName }}</div>
            <div class="player-info-details-row">{{ modalInfo.age }}</div>
            <div class="player-info-details-row">{{ modalInfo.height }}</div>
            <div class="player-info-details-row">{{ modalInfo.weight }}</div>
            <div class="player-info-details-row">{{modalInfo.position }}</div>
            <div class="player-info-details-row">{{ harmfulImpactsMsg }}</div>
            <div class="player-info-details-row">{{ highestForceMsg }}</div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  title: 'User View',
  data() {
    return {
      harmfulImpactsMsg: 'Value to be calculated',
      highestForceMsg: 'Force Value to be calculated',
      showModal: false,
      modalInfo: null,
    }
  },
  methods: {
    async openModal() {
      this.showModal = true;
    }
  }
}
</script>

<style lang='scss' scoped>
.modal-dialog {
  margin-top: 150px;
}

.modal-content {
  width: 450px;
  height: 350px;

  .modalContainer {
    margin: 0 10px 20px 20px;

    .modalTitle {
      text-align: center;
      text-transform: capitalize;
    }
  }
}

.main-container {
  padding: 10vh 0 0 35vw;
  width: 68vw;
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
        width: 65%;
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
