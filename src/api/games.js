import axios from 'axios';

const gamesUrl = '34.89.16.75:3001';
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

gamesApi.createGame = (game, user_id) => axios.post(`http://${gamesUrl}/games`, {
  date: game.date,
  location: game.location,
  opposition: game.opposition,
  conditions: game.conditions,
  user_id: user_id,
})
.then(function (response) {
  return response;
})
.catch(function (error) {
  console.log("error: ", error);
})
.finally(function () {
});

export default gamesApi;
