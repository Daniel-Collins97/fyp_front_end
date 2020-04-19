<template>
  <div class="main-container">
    <form @submit.prevent='formHandler' name="addUserForm">
      <h2 id="title">Add New Player
      </h2>
      <br>
      <div class="form-content">
        <div class="form-content-left">
          <label class="textLabel firstNameLabel">First name*</label>
          <label class="textLabel lastNameLabel">Last name*</label>
          <label class="textLabel ageLabel">Age*</label>
          <label class="textLabel weightLabel">Weight(Kg)*</label>
          <label class="textLabel heightLabel">Height(cm)*</label>
          <label class="textLabel positionLabel">Position*</label>
          <button class='btn btn-cancel' type="button" value="Cancel" @click="$router.go(-1)">Cancel</button>
        </div>
        <div class="form-content-right">
          <div class="form-content-right-first-name">
            <input class="inputText" type="text" v-model="dataTable.first_name" @blur="$v.dataTable.first_name.$touch()">
            <div v-show="$v.dataTable.first_name.$error">
              <p v-show="!$v.dataTable.first_name.required" class="textInputError">First name is required</p>
              <p v-show="!$v.dataTable.first_name.alpha" class="textInputError">Must contain ONLY letters</p>
              <p v-show="!$v.dataTable.first_name.maxLength" class="textInputError">Cannot be more than 20 characters</p>
            </div>
          </div>
          <div class="form-content-right-last-name">
            <input class="inputText" type="text" v-model="dataTable.last_name" @blur="$v.dataTable.last_name.$touch()">
            <div v-show="$v.dataTable.last_name.$error">
              <p v-show="!$v.dataTable.last_name.required" class="textInputError">Last name is required</p>
              <p v-show="!$v.dataTable.last_name.alpha" class="textInputError">Must contain ONLY letters</p>
              <p v-show="!$v.dataTable.last_name.maxLength" class="textInputError">Cannot be more than 20 characters</p>
            </div>
          </div>
          <div class="form-content-right-age">
            <input class="inputText" type="text" v-model="dataTable.age" @blur="$v.dataTable.age.$touch()">
            <div v-show="$v.dataTable.age.$error">
              <p v-show="!$v.dataTable.age.required" class="textInputError">Age is required</p>
              <p v-show="!$v.dataTable.age.numeric" class="textInputError">Must be a WHOLE number</p>
              <p v-show="!$v.dataTable.age.between" class="textInputError">Must be BETWEEN 17 and 45</p>
            </div>
          </div>
          <div class="form-content-right-weight">
            <input class="inputText" type="text" v-model="dataTable.weight" @blur="$v.dataTable.weight.$touch()">
            <div v-show="$v.dataTable.weight.$error">
              <p v-show="!$v.dataTable.weight.required" class="textInputError">Weight is required</p>
              <p v-show="!$v.dataTable.weight.decimal" class="textInputError">Must be a NUMBER</p>
            </div>
          </div>
          <div class="form-content-right-height">
            <input class="inputText" type="text" v-model="dataTable.height" @blur="$v.dataTable.height.$touch()">
            <div v-show="$v.dataTable.height.$error">
              <p v-show="!$v.dataTable.height.required" class="textInputError">Height is required</p>
              <p v-show="!$v.dataTable.height.decimal" class="textInputError">Must be a NUMBER</p>
            </div>
          </div>
          <div class="form-content-right-position">
            <input class="inputText" type="text" v-model="dataTable.position" @blur="$v.dataTable.position.$touch()">
            <div v-show="$v.dataTable.position.$error">
              <p v-show="!$v.dataTable.position.required" class="textInputError">Position is required</p>
              <p v-show="!$v.dataTable.position.numeric" class="textInputError">Must be a WHOLE number</p>
              <p v-show="!$v.dataTable.position.between" class="textInputError">Must be BETWEEN 1 and 25</p>

            </div>
          </div>
          <button class='btn success' type="submit">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, alpha, numeric, decimal, between, maxLength } from 'vuelidate/lib/validators'
import usersApi from '@/api/users.js';

export default {
  title: "Add Player",
  data() {
    return {
      dataTable: {
        first_name: '',
        last_name: '',
        age: null,
        height: null,
        position: null,
        weight: null,
      }
    }
  },
  validations: {
    dataTable: {
      first_name: {
        required,
        alpha,
        maxLength: maxLength(20),
      },
      last_name: {
        required,
        alpha,
        maxLength: maxLength(20),
      },
      weight: {
        required,
        decimal,
      },
      height: {
        required,
        decimal,
      },
      age: {
        required,
        numeric,
        between: between(17, 45)
      },
      position: {
        required,
        numeric,
        between: between(1, 25)
      }
    }
  },
  methods: {
    formHandler() {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        const user = {};
        user.firstName = this.dataTable.first_name;
        user.lastName = this.dataTable.last_name;
        user.age = Number(this.dataTable.age);
        user.height = Number(this.dataTable.height);
        user.weight = Number(this.dataTable.weight);
        user.position = Number(this.dataTable.position);
        usersApi.createUser(user);
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
    //  width: 55%;
    //  height: 3.12em;
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
  margin-bottom: 42px;
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
    grid-template-rows: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
  }

  &-right {
    display: grid;
    grid-template-rows: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    &-first-name {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-last-name {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-age {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-height {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-weight {
      display: grid;
      grid-template-rows: 60% 40%;
    }

    &-position {
      display: grid;
      grid-template-rows: 60% 40%;
    }
  }
}
.error{
  border: 2px solid red;
}
</style>
