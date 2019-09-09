<template>
  <div class="main-container">
    <div class="table-area">
      <div class="table-title">
        Game stats
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
        <b-table dark striped bordered :fixed="true" responsive="true" hover :items="items" :fields="fields"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import gamesApi from '@/api/games.js';
import moment from 'moment';

export default {
  title: 'Games',
  data () {
    return {
      fields: [
        { key: 'date', sortable: true },
        { key: 'location', sortable: true },
        { key: 'opposition', sortable: true },
        { key: 'conditions', sortable: true },
      ],
      searchAreas: [
        { text: 'Search Date', searchFunction: 'date', disabled: true },
        { text: 'Search Location', searchFunction: 'location', disabled: true },
        { text: 'Search Opposition', searchFunction: 'opposition', state: true },
        { text: 'Search Conditions', searchFunction: 'conditions', state: true },
      ],
      items: [],
      searchInput: '',
    }
  },
  computed: {
    
  },
  async created() {
    let gamesData = await gamesApi.getAllGames();
    this.items = gamesData.data;
    this.items.forEach((item) => {
      item.date = moment(item.date).format('DD-MM-YYYY');
    });
    console.log('this.items:', this.items)
  },
  methods: {
    searchFunction(param, searchInput) {
      switch(param) {
        case 'date':
          this.dateSearch(searchInput);
          break;

        case 'location':
          this.locationSearch(searchInput);
          break;

        case 'opposition':
          this.oppositionSearch(searchInput);
          break;

        case 'conditions':
          this.conditionsSearch(searchInput)
          break;
      }
    },
    dateSearch(searchInput) {
      console.log('Date Search String: ', searchInput);
      this.searchInput = '';
    },
    locationsSearch(searchInput) {
      console.log('Location Search String: ', searchInput);
      this.searchInput = '';
    },
    oppositionSearch(searchInput) {
      console.log('Opposition Search String: ', searchInput);
      this.searchInput = '';
    },
    conditionsSearch(searchInput) {
      console.log('Conditions Search String: ', searchInput);
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
