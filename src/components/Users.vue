<template>
  <div class="main-container">
    <div class="table-area">
      <div class="table-title">
        users
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
        <b-table 
          dark
          striped
          bordered
          :fixed="true"
          responsive="true"
          hover
          :items="items"
          :fields="fields"
          @row-clicked="rowClicked"
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router/index.js';
import usersApi from '@/api/users.js';

export default {
  title: 'Users',
  data () {
    return {
      fields: [
        { key: 'id', sortable: true },
        { key: 'firstName', sortable: true },
        { key: 'lastName', sortable: true },
        { key: 'age', sortable: true },
        { key: 'height', sortable: true },
        { key: 'weight', sortable: true },
        { key: 'position', sortable: true },
      ],
      searchAreas: [
        { text: 'First Name...', searchFunction: 'firstName', searchString: '' },
        { text: 'Last Name...', searchFunction: 'lastname', searchString: '' },
        { text: 'Positon...', searchFunction: 'position', searchString: '' },
        { text: 'Weight...', searchFunction: 'weight', searchString: '' },
      ],
      items: [],
      searchInput: '',
    }
  },
  async created() {
    let usersData = await usersApi.getAllUsers();
    this.items = usersData.data;
    console.log('this.items:', this.items)
  },
  methods: {
    rowClicked(row) {
      router.push({name: 'UserView', params: {ctx: row}});
      console.log('row:', row);
    },
    searchFunction(param, item) {
      switch(param) {
        case 'firstName':
          this.firstNameSearch(item);
          break;

        case 'lastName':
          this.lastNameSearch(item);
          break;

        case 'position':
          this.positionSearch(item);
          break;

        case 'weight':
          this.weightSearch(item);
          break;
      }
    },
    firstNameSearch(item) {
      console.log('First Name Search String: ', item.searchString);
      item.searchString = '';
    },
    lastNameSearch(item) {
      console.log('Last Name Search String: ', item.searchString);
      item.searchString = '';
    },
    positionSearch(item) {
      console.log('Position Search String: ', item.searchString);
      item.searchString = '';
    },
    weightSearch(item) {
      console.log('Weight Search String: ', item.searchString);
      item.searchString = '';
    },
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
