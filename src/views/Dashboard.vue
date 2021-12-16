<template>
  <Main>
    <v-container fluid>
      <v-col>
        <v-row>
          <v-col>
            <div class="dash-card">
              <p>Заказов за июнь</p>
              <h2>5 864</h2>
              <span>100 000 000 тг</span>
            </div>
          </v-col>
          <v-col>
            <div class="dash-card">
              <p>Заказов на 2021 год</p>
              <h2>45 000</h2>
              <span>398 000 000 тг</span>
            </div>
          </v-col>
          <v-col>
            <div class="dash-card">
              <p>Средний заказ за июнь</p>
              <h2>15 454</h2>
              <span>84 000 000 тг</span>
            </div>
          </v-col>
          <v-col>
            <div class="dash-card">
              <p>Всего заказов</p>
              <h2>59 000</h2>
              <span>500 000 000 тг</span>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <div class="line-chart">
            <LineChart />
          </div>
        </v-row>
      </v-col>
    </v-container>
  </Main>
</template>

<script>
import Main from "@/views/Main.vue";
import LineChart from "@/components/dashboard/LineChart.js"
export default {
  components: {
    Main,
    LineChart,
  },
  data() {
    return {
  
    };
  },
  mounted() {},
};
</script>

<style lang="scss">
.line-chart {
  width: 100%;
  height: 550px;
}
.dash-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  p {
    margin-bottom: 5px;
    font-size: 16px;
    color: #9FA2B4;
    font-weight: 600;
  }
  h2 {
    color: #252733;
    font-size: 36px;
    font-weight: 700;
  }
  span {
    color: #9FA2B4;
    font-weight: 400;
    font-size: 16px;
  }
}
</style>
