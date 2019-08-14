<template>
  <div class="main-container">
    <div class="table-area">
      <div class="table-title">
        sensor stats
      </div>
      <div class="table-search-items">
        <div v-for="(item, index) in this.searchAreas" :key="index">
          <div>
            <b-form-input v-model="item.searchString" class="search-area" :class="{'search-area-placeholder': !item.searchString}" :placeholder="item.text" @keyup.enter="searchFunction(item.searchFunction, item)"/>
            <span>
              <b-button class="go-button" @click="searchFunction(item.searchFunction, item)" @keyup.enter="searchFunction(item.searchFunction, item)" tabindex="0">Go</b-button>
            </span>
          </div>
        </div>
      </div>
      <div class="table-data-section">
        <b-table dark striped bordered :fixed="true" responsive="true" hover :items="items" :fields="fields"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'user_id', sortable: true },
        { key: 'game_id', sortable: true },
        { key: 'impact_force', sortable: true },
        { key: 'sensor_id', sortable: true },
      ],
      items: [
        { user_id: 40, game_id: 2, impact_force: 7, sensor_id: 1 },
        { user_id: 21, game_id: 3, impact_force: 11, sensor_id: 2 },
        { user_id: 89, game_id: 2, impact_force: 23, sensor_id: 3 },
        { user_id: 38, game_id: 1, impact_force: 2, sensor_id: 4 }
      ],
      searchAreas: [
        { text: 'Search Users...', searchFunction: 'users', searchString: '' },
        { text: 'Search Games...', searchFunction: 'games', searchString: '' },
        { text: 'Search Forces...', searchFunction: 'forces', searchString: '' },
        { text: 'Search Sensors...', searchFunction: 'sensors', searchString: '' },
      ],
      searchInput: '',
    }
  },
  methods: {
    searchFunction(param, item) {
      switch(param) {
        case 'users':
          this.usersSearch(item);
          break;

        case 'games':
          this.gamesSearch(item);
          break;

        case 'forces':
          this.forcesSearch(item);
          break;

        case 'sensors':
          this.sensorsSearch(item)
          break;
      }
    },
    usersSearch(item) {
      console.log('User Search String: ', item.searchString);
      item.searchString = '';
    },
    gamesSearch(item) {
      console.log('Game Search String: ', item.searchString);
      item.searchString = '';
    },
    forcesSearch(item) {
      console.log('Force Search String: ', item.searchString);
      item.searchString = '';
    },
    sensorsSearch(item) {
      console.log('Sensor Search String: ', item.searchString);
      item.searchString = '';
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
    grid-template-rows: 10vh 8vh 74vh;
    margin: 4vh 0 4vh 11vw;

    .table-title {
      font-size: 3vw;
      text-transform: uppercase;
      color: black;
      font-weight: bold;
      padding-top: 5px;
      margin-bottom: 10px;
    }

    .table-search-items {
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      align-content: center;
      text-align: center;

      .search-area {
        width: 50%;
        display: inline-block;
        height: 2vw;
        font-weight: bold;
        font-size: 1vw;
        padding: 1vw 1vw;
        &-placeholder {
          font-weight: lighter;
        }
      }

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
