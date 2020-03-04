<template>
  <div class="main-container">
    <div class="table-area">
      <div class="table-title">
        sensor stats
      </div>
      <div class="table-search-input">
        <b-form-input v-model="searchInput" class="search-area" :class="{'search-area-placeholder': !searchInput}" placeholder="Search..."/>
      </div>
      <div class="table-search-items">
        <div v-for="(item, index) in this.searchAreas" :key="index">
          <div>
            <b-button :disabled="searchInput === ''" class="go-button" @click="searchFunction(item.searchFunction, searchInput)" @keyup.enter="searchFunction(item.searchFunction, searchInput)" tabindex="0">{{ item.text }}</b-button>
          </div>
        </div>
      </div>
      <div class="table-data-section">
        <b-table
          dark
          striped
          bordered
          :fixed="true"
          responsive="true"
          hover
          :items="items"
          :fields="fields"
          selectable
          @row-selected="rowSelected"
          select-mode="single">
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import sensorApi from '@/api/sensors.js';

export default {
  title: 'Statistics',
  data () {
    return {
      fields: [
        { key: 'user_id', sortable: true },
        { key: 'game_id', sortable: true },
        { key: 'impact_force', sortable: true },
        { key: 'sensor_id', sortable: true },
      ],
      searchAreas: [
        { text: 'Search Users', searchFunction: 'users', disabled: true },
        { text: 'Search Games', searchFunction: 'games', disabled: true },
        { text: 'Search Forces', searchFunction: 'forces', state: true },
        { text: 'Search Sensors', searchFunction: 'sensors', state: true },
      ],
      items: [],
      searchInput: '',
    }
  },
  computed: {
    
  },
  async created() {
    let sensorData = await sensorApi.getAllSensors();
    this.items = sensorData.data;
    console.log('this.items:', this.items)
  },
  methods: {
    rowSelected(record) {
      let userId = record[0].user_id
      this.$router.push({name: 'Statistics View', params: { ctx: userId}});
    },
    searchFunction(param, searchInput) {
      switch(param) {
        case 'users':
          this.usersSearch(searchInput);
          break;

        case 'games':
          this.gamesSearch(searchInput);
          break;

        case 'forces':
          this.forcesSearch(searchInput);
          break;

        case 'sensors':
          this.sensorsSearch(searchInput)
          break;
      }
    },
    usersSearch(searchInput) {
      console.log('User Search String: ', searchInput);
      this.searchInput = '';
    },
    gamesSearch(searchInput) {
      console.log('Game Search String: ', searchInput);
      this.searchInput = '';
    },
    forcesSearch(searchInput) {
      console.log('Force Search String: ', searchInput);
      this.searchInput = '';
    },
    sensorsSearch(searchInput) {
      console.log('Sensor Search String: ', searchInput);
      this.searchInput = '';
    }
  }
}
</script>

<style lang='scss' scoped>
.main-container {
  text-align: center;
  height: 96vh;
  width: 100vw;

  .table-area {
    background-color: #f7f7f7;
    opacity: 0.8;
    height: 92vh;
    width: 80vw;
    display: grid;
    grid-template-rows: 10vh 8vh 8vh 66vh;
    margin: 4vh 0 4vh 11vw;

    .table-title {
      font-size: 3vw;
      text-transform: uppercase;
      color: black;
      font-weight: bold;
      padding-top: 5px;
      margin-bottom: 10px;
    }

    .table-search-input {
      width: 25%;
      margin: auto;

      .search-area {
        text-align: center;
        display: inline-block;
        height: 2vw;
        font-weight: bold;
        font-size: 1vw;
        padding: 1vw 1vw;
        &-placeholder {
          text-align: center;
          font-weight: lighter;
        }
      }
    }

    .table-search-items {
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      align-content: center;
      text-align: center;

      .go-button {
        background-color: green;
        font-weight: bold;
        font-size: 1vw;
      }
    }

    .table-data-section {
      background-color: white;
      opacity: 1;
      font-size: 1vw;
    }
  }
}
</style>
