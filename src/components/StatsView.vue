<template>
  <div class="main-container">
    <div class="player-info-container">
      <User-View :ctx="userData" :highest-force="highestForce"></User-View>
    </div>
    <div class="chart-wrapper">
      <chart :options="chartOptionsLine"></chart>
      <chart :options="chartOptionsBar"></chart>
    </div>
  </div>
</template>

<script>
import usersApi from '@/api/users';
import sensorApi from '@/api/sensors';
import gamesApi from '@/api/games';
import UserView from '@/components/UserView';

export default {
  title: 'Statistics View',
  components: {
    UserView,
  },
  props: {
    ctx: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      highestForce: null,
      allSensorStats: [],
      userData: {},
      userGameData: {},
      userSensorData: {},
      chartOptionsBar: {
        xAxis: {
          data: [],
          name: "Games (Opponents)",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 20
          },
          nameGap: 30
        },
        yAxis: {
          type: 'value',
          name: "Number of Harmful Impacts Per Game",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 20
          },
          nameGap: 40
        },
        series: [
          {
            type: 'bar',
            data: [],
          }
        ],
        title: {
          text: 'No. of Potentially Harmful Impacts Per Match',
          x: 'center',
          textStyle: {
            fontSize: 24,
            color: "#fff"
          }
        },
        grid: {
          show: true,
          backgroundColor: "rgba(255,255,255,0.8)",
        },
        textStyle: {
          color: "#fff",
          fontSize: 15
        }
      },
      chartOptionsLine: {
        xAxis: {
          data: [],
          name: "Games (Opponents)",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 20
          },
          nameGap: 30
        },
        yAxis: {
          type: 'value',
          name: "Impact Force Recieved",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 20
          },
          nameGap: 40,
        },
        series: [
          {
            type: 'line',
            data: []
          }
        ],
        title: {
          text: "Average Impact Force Per Match",
          x: 'center',
          textStyle: {
            fontSize: 24,
            color: "#fff"
          }
        },
        grid: {
          show: true,
          backgroundColor: "rgba(255,255,255,0.8)",
        },
        color: ['#127ac2'],
        textStyle: {
          color: "#fff",
          fontSize: 15
        }
      },
    }
  },
  async created() {
    let userData = await usersApi.getUsersById(this.ctx)
    this.userData = userData.data[0];
    let gameData = await gamesApi.getUsersGames(this.ctx)
    this.gameData = gameData.data;
    let sensorData = await sensorApi.getSensorDataFromSpecificUser(this.ctx);
    this.userSensorData = sensorData.data;

    this.calculateLineGraphData();
    this.calculateBarGraphData();

    let calculatedSensorValues = [];
    this.chartOptionsLine.series[0].data.forEach((item) => {
      calculatedSensorValues.push(item.value);
    });
    this.highestForce = Math.max(...calculatedSensorValues)
  },
  methods: {
    rowClicked(row) {
      this.$refs.viewUser.modalInfo = row;
      this.$refs.viewUser.openModal();
    },
    calculateLineGraphData() {
      this.gameData.forEach((game) => {
      this.chartOptionsLine.xAxis.data.push(game.opposition);
      this.userSensorData.forEach((sensorStat) => {
        if (sensorStat.game_id == game.id) {
          this.allSensorStats.push(sensorStat.impact_force)
        }
      });
      this.allSensorStats = this.allSensorStats.map(Number);
      let sum = this.allSensorStats.reduce((a, b) => a + b, 0)
      let avg = (sum / this.allSensorStats.length).toFixed(2)
      this.chartOptionsLine.series[0].data.push(
        {
          value: avg,
          symbol: "diamond",
          symbolSize: "10",
          itemStyle: {
            color: "red"
          },
          label: {
            show: true,
            position: 'top',
            color: 'white',
            fontSize: '8',
            backgroundColor: 'red',
            padding: 4,
            fontWeight: 'bold'
          }
        }
      );
      this.allSensorStats = [];
    });
    },
    calculateBarGraphData() {
      this.gameData.forEach((game) => {
      this.chartOptionsBar.xAxis.data.push(game.opposition);
      this.userSensorData.forEach((sensorStat) => {
        if (sensorStat.game_id == game.id) {
          this.allSensorStats.push(sensorStat.impact_force)
        }
      });
      let numOfImpacts = this.allSensorStats.length
      this.chartOptionsBar.series[0].data.push(
        {
          value: numOfImpacts,
          // symbol: "diamond"
          // symbolSize: "10",
          // itemStyle: {
            // color: "red"
          // }
        }
      );
      this.allSensorStats = [];
    });
    }
  }
}
</script>

<style lang='scss' scoped>
.main-container { 
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 35% 65%;

  .player-info-container {
    margin: auto;
  }

  .chart-wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 50% 50%;
  }
    
    .echarts {
      width: 100%;
      height: 100%;
    }
}
</style>
