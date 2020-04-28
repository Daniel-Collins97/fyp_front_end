<template>
  <div class="main-container">
    <div class="player-info-container">
      <User-View :ctx="userData" :highest-force="highestForce"></User-View>
    </div>
    <div></div>
    <div class="chart-wrapper">
      <chart :options="chartOptionsLine"></chart>
      <chart :options="chartOptionsTotalBar"></chart>
      <chart :options="chartOptionsHarmfulBar"></chart>
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
      allSensorStatsTotal: [],
      allSensorStatsHarmful: [],
      userData: {},
      userGameData: {},
      userSensorData: {},
      chartOptionsTotalBar: {
        xAxis: {
          data: [],
          name: "Matches (Opponents)",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 20
          },
          nameGap: 30
        },
        yAxis: {
          type: 'value',
          name: "N0. Impacts/Match",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 15
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
          text: 'No. Impacts/Match',
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
      chartOptionsHarmfulBar: {
        xAxis: {
          data: [],
          name: "Matches (Opponents)",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 20
          },
          nameGap: 30
        },
        yAxis: {
          type: 'value',
          name: "No. Harmful Impacts/Match",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#fff",
            fontSize: 15
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
          text: 'No. Harmful Impacts/Match',
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
          name: "Matches (Opponents)",
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
    this.userSensorData.forEach((sensorValue) => {
      calculatedSensorValues.push(sensorValue.impact_force)
    })
    this.highestForce = Math.max(...calculatedSensorValues)
  },
  methods: {
    calculateLineGraphData() {
      this.gameData.forEach((game) => {
      this.userSensorData.forEach((sensorStat) => {
        if (sensorStat.game_id == game.id) {
          if (!this.chartOptionsLine.xAxis.data.includes(game.opposition)) {
            this.chartOptionsLine.xAxis.data.push(game.opposition);
          }
          this.allSensorStatsTotal.push(sensorStat.impact_force)
        }
      });
      this.allSensorStatsTotal = this.allSensorStatsTotal.map(Number);
      let sum = this.allSensorStatsTotal.reduce((a, b) => a + b, 0)
      let avg = (sum / this.allSensorStatsTotal.length).toFixed(2)
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
      this.allSensorStatsTotal = [];
    });
    },
    calculateBarGraphData() {
      this.gameData.forEach((game) => {
      this.userSensorData.forEach((sensorStat) => {
        if (sensorStat.game_id == game.id) {
          if (!this.chartOptionsTotalBar.xAxis.data.includes(game.opposition)) {
            this.chartOptionsTotalBar.xAxis.data.push(game.opposition);
          }
          if (!this.chartOptionsHarmfulBar.xAxis.data.includes(game.opposition)) {
            this.chartOptionsHarmfulBar.xAxis.data.push(game.opposition);
          }
          if (sensorStat.impact_force >= 65) {
            this.allSensorStatsHarmful.push(sensorStat.impact_force)
          }
          this.allSensorStatsTotal.push(sensorStat.impact_force)
        }
      });

      let totalNumOfImpacts = this.allSensorStatsTotal.length;
      let harmfulNumOfImpacts = this.allSensorStatsHarmful.length;
      this.chartOptionsTotalBar.series[0].data.push(
        {
          value: totalNumOfImpacts,
        }
      );
      this.chartOptionsHarmfulBar.series[0].data.push(
        {
          value: harmfulNumOfImpacts,
        }
      );
      this.allSensorStatsTotal = [];
      this.allSensorStatsHarmful = [];
    });
    }
  }
}
</script>

<style lang='scss' scoped>
.main-container { 
  height: 150%;
  width: 100%;
  display: grid;
  grid-template-columns: 35% 65%;

  .player-info-container {
    margin-right: auto;
    margin-left: auto;
    margin-bottom: auto;
    height: 66.66%;
    position: fixed;
  }

  .chart-wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 33% 33% 33%;
  }
    
    .echarts {
      width: 100%;
      height: 100%;
    }
}
</style>
