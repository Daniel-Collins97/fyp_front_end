<template>
  <div class="main-container">
    <div class="table-area">
      <div class="table-title">
        <p class="table-title-text" @click="reset()">users</p>
        <router-link to="/Add-User">
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
        { text: 'Search ID', searchFunction: 'id', disabled: true},
        { text: 'Search First Name', searchFunction: 'firstName', disabled: true},
        { text: 'Search Last Name', searchFunction: 'lastName', disabled: true},
        { text: 'Search Age', searchFunction: 'age', disabled: true},
        { text: 'Search Height', searchFunction: 'height', disabled: true},
        { text: 'Search Weight', searchFunction: 'weight', disabled: true},
        { text: 'Search Positon', searchFunction: 'position', disabled: true},
      ],
      items: [],
      initialItems: [],
      searchInput: '',
    }
  },
  async created() {
    this.reset();
  },
  methods: {
    async reset() {
      let usersData = await usersApi.getAllUsers();
      this.initialItems = usersData.data;
      this.items = usersData.data;
    },
    rowClicked(row) {
      this.$refs.viewUser.modalInfo = row;
      this.$refs.viewUser.openModal();
    },
    searchFunction(param, item) {
      switch(param) {
        case 'id':
          this.idSearch(item)
          break;

        case 'firstName':
          this.firstNameSearch(item);
          break;

        case 'lastName':
          this.lastNameSearch(item);
          break;

        case 'age':
          this.ageSearch(item)
          break;

        case 'height':
          this.heightSearch(item)
          break;

        case 'position':
          this.positionSearch(item);
          break;

        case 'weight':
          this.weightSearch(item);
          break;
      }
    },
    idSearch(searchInput) {
      let filteredItems = [];
      this.initialItems.filter(item => {
        if (item.id.toString().includes(searchInput)) {
          filteredItems.push(item);
        }
      })
      this.items = filteredItems;
      this.searchInput = '';
    },
    firstNameSearch(searchInput) {
      let filteredItems = [];
      this.initialItems.filter(item => {
        if (item.firstName.toLowerCase().includes(searchInput.toLowerCase())) {
          filteredItems.push(item);
        }
      })
      this.items = filteredItems;
      this.searchInput = '';
    },
    lastNameSearch(searchInput) {
      let filteredItems = [];
      this.initialItems.filter(item => {
        if (item.lastName.toLowerCase().includes(searchInput.toLowerCase())) {
          filteredItems.push(item);
        }
      })
      this.items = filteredItems;
      this.searchInput = '';
    },
    ageSearch(searchInput) {
      let filteredItems = [];
      this.initialItems.filter(item => {
        if (item.age.toString().includes(searchInput)) {
          filteredItems.push(item);
        }
      })
      this.items = filteredItems;
      this.searchInput = '';
    },
    heightSearch(searchInput) {
      let filteredItems = [];
      this.initialItems.filter(item => {
        if (item.height.toString().includes(searchInput)) {
          filteredItems.push(item);
        }
      })
      this.items = filteredItems;
      this.searchInput = '';
    },
    positionSearch(searchInput) {
      let filteredItems = [];
      this.initialItems.filter(item => {
        if (item.position.toString().includes(searchInput)) {
          filteredItems.push(item);
        }
      })
      this.items = filteredItems;
      this.searchInput = '';
    },
    weightSearch(searchInput) {
      let filteredItems = [];
      this.initialItems.filter(item => {
        if (item.weight.toLowerCase().includes(searchInput.toLowerCase())) {
          filteredItems.push(item);
        }
      })
      this.items = filteredItems;
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
      
      &-text {
        display: inline;
        cursor: pointer;
      }
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
      grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
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
      height: 95%;
      overflow: scroll;
    }
  }
}
</style>
