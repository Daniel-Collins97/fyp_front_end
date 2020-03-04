import axios from 'axios';

const gamesUrl = 'localhost:3000';
const gamesApi = {};

gamesApi.getAllGames = () => axios.get(`http://${gamesUrl}/games`,{
  headers: {"Access-Control-Allow-Origin": "true"},
}).then(function (response) {
  return response;
})
.catch(function (error) {
  console.log('error: ', error);
})
.finally(function () {
});

gamesApi.getUsersGames = (user_id) => axios.get(`http://${gamesUrl}/games/userGames/${user_id}`, {
  headers: {"Access-Control-Allow-Origin": "true"},
}).then(function (response) {
  return response;
})
.catch(function (error) {
  console.log("Error: ", error)
})
.finally(function () {
});

export default gamesApi;
