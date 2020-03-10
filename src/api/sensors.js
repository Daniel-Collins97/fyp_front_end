import axios from 'axios';

const sensorsUrl = '35.234.134.101:3002';
const sensorsApi = {};

sensorsApi.getAllSensors = () => axios.get(`http://${sensorsUrl}/sensors`,{
  headers: {"Access-Control-Allow-Origin": "true"},
}).then(function (response) {
  return response;
})
.catch(function (error) {
  console.log('error: ', error);
})
.finally(function () {
});

sensorsApi.getSensorDataFromSpecificUser = (user_id) => axios.get(`http://${sensorsUrl}/sensors/user/${user_id}`, {
  headers: {"Access-Control-Allow-Origin": "true"},
}).then(function (response) {
  return response;
})
.catch(function (error) {
  console.log("Error: ", error)
})
.finally(function () {
});

export default sensorsApi;
