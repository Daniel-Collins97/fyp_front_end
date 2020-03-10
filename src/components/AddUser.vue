<template>
  <div class="main-container">
    <div class="table-area">
      <div class="table-title">
        users
        <router-link to="/AddUser">
          <div class="add-user-btn btn go-button">
            add
          </div>
        </router-link>
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
          @row-clicked="rowClicked"
        ></b-table>
      </div>
    </div>
    <view-user-modal ref="viewUser"/>
  </div>
</template>

<script>
import viewUser from '@/modals/viewUser'
import usersApi from '@/api/users.js';

export default {
  title: 'Users',
  components: {
    'view-user-modal': viewUser,
  },
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
        { text: 'Search First Name', searchFunction: 'firstName', disabled: true},
        { text: 'Search Last Name', searchFunction: 'lastName', disabled: true},
        { text: 'Search Positon', searchFunction: 'position', disabled: true},
        { text: 'Search Weight', searchFunction: 'weight', disabled: true},
      ],
      items: [],
      searchInput: '',
    }
  },
  async created() {
    let usersData = await usersApi.getAllUsers();
    this.items = usersData.data;
  },
  methods: {
    rowClicked(row) {
      this.$refs.viewUser.modalInfo = row;
      this.$refs.viewUser.openModal();
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
    firstNameSearch(searchInput) {
      console.log('First Name Search String: ', searchInput);
      this.searchInput = '';
    },
    lastNameSearch(searchInput) {
      console.log('Last Name Search String: ', searchInput);
      this.searchInput = '';
    },
    positionSearch(searchInput) {
      console.log('Position Search String: ', searchInput);
      this.searchString = '';
    },
    weightSearch(searchInput) {
      console.log('Weight Search String: ', searchInput);
      this.searchInput = '';
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

    .add-user-btn {
      position: absolute;
      background-color: green;
      font-weight: bold;
      font-size: 1vw;
      right: 11vw;
      top: 5.5vh;
      color: #fff;
      border-color: #6c757d;
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
