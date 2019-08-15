import axios from 'axios';

const sensorsUrl = 'localhost:1000';
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

export default sensorsApi;
