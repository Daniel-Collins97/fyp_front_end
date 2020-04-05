<template>
  <div class="main-container">
    <form @submit.prevent='formHandler' name="addGameForm">
      <h2 id="title">Add New Game</h2>
      <br>
      <div class="form-content">
        <div class="form-content-left">
          <label class="textLabel locationLabel">Location*</label>
          <label class="textLabel oppositionLabel">Opposition*</label>
          <label class="textLabel conditionsLabel">Conditions*</label>
          <label class="textLabel userLabel">User*</label>
          <button class='btn btn-cancel' type="button" value="Cancel" @click="$router.go(-1)">Cancel</button>
        </div>
        <div class="form-content-right">
          <div class="form-content-right-location">
            <input class="inputText" type="text" v-model="dataTable.location" @blur="$v.dataTable.location.$touch()">
            <div v-show="$v.dataTable.location.$error">
              <p v-show="!$v.dataTable.location.required" class="textInputError">Location is required</p>
              <p v-show="!$v.dataTable.location.maxLength" class="textInputError">Cannot be more than 20 characters</p>
            </div>
          </div>
          <div class="form-content-right-opposition">
            <input class="inputText" type="text" v-model="dataTable.opposition" @blur="$v.dataTable.opposition.$touch()">
            <div v-show="$v.dataTable.opposition.$error">
              <p v-show="!$v.dataTable.opposition.required" class="textInputError">Opposition is required</p>
              <p v-show="!$v.dataTable.opposition.maxLength" class="textInputError">Cannot be more than 20 characters</p>
            </div>
          </div>
          <div class="form-content-right-conditions">
            <select class="form-control inputText inputText-dropdown" @change="changeConditions($event)">
              <option value="" selected disabled>Choose</option>
              <option v-for="condition in conditions" :value="condition.id" :key="condition.id">{{ condition.name }}</option>
            </select>
            <div v-show="conditionsErrorMessage">
              <p class="textInputError">Conditions are required</p>
            </div>
          </div>
          <div class="form-content-right-user">
            <select class="form-control inputText inputText-dropdown" @change="changeUser($event)">
              <option value="" selected disabled>Choose</option>
              <option v-for="user in usersList" :value="user.id" :key="user.id">{{ user.firstName }} {{ user.lastName.charAt(0) }}</option>
            </select>
            <div v-show="usersErrorMessage">
              <p class="textInputError">User is required</p>
            </div>
          </div>
          <button class='btn success' type="submit">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, numeric, maxLength } from 'vuelidate/lib/validators'
import gamesApi from '@/api/games.js';
import usersApi from '@/api/users.js';
import moment from 'moment';

export default {
  title: "Add Game",
  data() {
    return {
      dataTable: {
        location: '',
        opposition: '',
        conditions: null,
        user: null,
      },
      conditions: [
        {name: "Rain", id: 1},
        {name: "Dry", id: 2},
        {name: "Snow", id: 3},
        {name: "Windy", id: 4},
        {name: "Clear", id: 5},
      ],
      conditionsErrorMessage: false,
      usersList: null,
      usersErrorMessage: false,
    }
  },
  //TODO: - Update for games
  validations: {
    dataTable: {
      location: {
        required,
        maxLength: maxLength(30),
      },
      opposition: {
        required,
        maxLength: maxLength(30),
      },
      conditions: {
        required,
      },
      user: {
        required,
        numeric,
      },
    }
  },
  async mounted() {
    this.usersList = (await usersApi.getAllUsers()).data;
    this.usersList = this.usersList.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  },
  methods: {
    changeConditions(event) {
      this.dataTable.conditions = event.target.options[event.target.options.selectedIndex].text
      this.dataTable.conditions ? this.conditionsErrorMessage = false : this.conditionsErrorMessage = true;
    },
    changeUser(event) {
      this.dataTable.user = event.target.options[event.target.options.selectedIndex].value
      this.dataTable.user ? this.usersErrorMessage = false : this.usersErrorMessage = true;
    },
    formHandler() {
      this.$v.$touch()
      if (!this.$v.$invalid && this.dataTable.conditions && this.dataTable.user) {
        const game = {};
        game.date = moment().format('YYYY-MM-DD');
        game.location = this.dataTable.location;
        game.opposition = this.dataTable.opposition;
        game.conditions = this.dataTable.conditions;
        game.user_id = Number(this.dataTable.user);
        gamesApi.createGame(game, game.user_id);
      } else {
        if (this.dataTable.conditions === null) {
          this.conditionsErrorMessage = true;
        }
        if (this.dataTable.user === null) {
          this.usersErrorMessage = true;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  height: 100%;
}

.inputText{
     border:1.5px solid black;
     margin: auto;
     border-radius: .31em;
     line-height:2;
     padding-left: .62em;

     &-dropdown {
       width: 72%;
     }
  }

.textInputError{
  color: red;
  border-radius:5px;
  font-size: 11px;
 }

form {
  margin: auto;
  height: 95%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px grey;
  background-color: white;
  opacity: 0.8;
  color: grey;
  font-weight: 400;
  width: 35%;
  border-radius: 15px;
}

.btn {
  display:flex;
  justify-content: center;
  border: 2px solid green;
  border-radius: 5%;
  background-color: green;
  color: white;
  font-size: 16px;
  cursor: pointer;
  height: 50%;
  width: 55%;
  margin-left: auto;
  margin-right: auto;

  &-cancel {
    border: 2px solid green;
    background-color: white;
    color: green;
  }
}

.cancel:hover {
  background-color: green;
  color: white;
}

.textLabel{
  margin: auto;
  margin-bottom: 62px;
}

#title{
  font-size: 24px;
  color: grey;
  font-family: "Roboto Condensed";
  padding-top: 20px;
}

.form-content {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 87%;

  &-left {
    display: grid;
    grid-template-rows: 21.3% 21.3% 21.3% 21.3%;
  }

  &-right {
    display: grid;
    grid-template-rows: 21.3% 21.3% 21.3% 21.3%;

    &-location {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-opposition {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-conditions {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-user {
      display: grid;
      grid-template-rows: 60% 40%;
    }
  }
}
.error{
  border: 2px solid red;
}
</style>
