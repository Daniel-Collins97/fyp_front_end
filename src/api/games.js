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

export default gamesApi;
