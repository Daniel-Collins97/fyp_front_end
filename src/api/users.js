import axios from 'axios';

const usersUrl = '34.89.16.75:3000';
const usersApi = {};

usersApi.getAllUsers = () => axios.get(`http://${usersUrl}/users`,{
  headers: {"Access-Control-Allow-Origin": "true"},
}).then(function (response) {
  return response;
})
.catch(function (error) {
  console.log('error: ', error);
})
.finally(function () {
});

usersApi.getUsersById = (id) => axios.get(`http://${usersUrl}/users/${id}`, {
  headers: {"Access-Control-Allow-Origin": "true"},
}).then(function (response) {
  return response;
})
.catch(function (error) {
  console.log("error: ", error);
})
.finally(function () {
});

usersApi.createUser = (user) => axios.post(`http://${usersUrl}/users`, {
  firstName: user.firstName,
  lastName: user.lastName,
  age: user.age,
  height: user.height,
  weight: user.weight,
  position: user.position
})
.then(function (response) {
  return response
})
.catch(function (error) {
  console.log("error: ", error);
})
.finally(function () {
});

export default usersApi;
