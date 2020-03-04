import axios from 'axios';

const usersUrl = 'localhost:2000';
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

export default usersApi;
