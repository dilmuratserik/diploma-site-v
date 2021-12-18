<template>
  <Main>
    <v-card>
      <v-tabs
        v-model="tab"
        class="w-100"
        fixed-tabs
        center-active
        centered
        hide-slider
        height="80"
        color="#5C5C5C"
        background-color="#1966431A"
      >
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="mt-5">
        <v-tab-item active-class="tab-active">
          <v-container fluid>
            <v-row>
              <v-col lg="3" md="3">
                <v-menu
                  v-model="date"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="selectedDate"
                      label="Дата"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    locale="RU"
                    @input="date = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col lg="3" md="3">
                <v-select
                  :items="agents"
                  v-model="selectAgentId"
                  item-text="name"
                  item-value="id"
                  label="Торговый агент"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col>
              <v-col>
                <v-btn color="green" @click.prevent="fetchApplyPlan"
                  >Применить</v-btn
                >
              </v-col>
              <!-- <v-col lg="3" md="3">
                <v-select
                  :items="itemsSelect"
                  label="Точка"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col> -->
            </v-row>
            <v-data-table
              :headers="headers"
              :items="plans"
              multi-sort
              hide-default-header
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th
                      v-for="header in props.headers"
                      :key="header.text"
                      style="min-width: 200px"
                    >
                      {{ header.text.toUpperCase() }}
                    </th>
                    <th v-for="(el, index) in monthData" :key="index">
                      <div class="column">
                        <span
                          >{{ el.dayFullData.getDate() }}.{{
                            el.dayFullData.getMonth() + 1
                          }}</span
                        >
                        <span>{{ el.weekDay }}</span>
                        <input
                          type="checkbox"
                          @change="allDateChecked(el.dayCount)"
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
              </template>
              <template v-slot:body="{}">
                <tbody>
                  <tr v-for="(item, index) in plans" :key="index">
                    <td>{{ item.name }}</td>
                    <td v-for="(el, inx) in monthData" :key="inx">
                      <input
                        class="table-checkbox"
                        type="checkbox"
                        @change="dateChecked(item, el)"
                        :class="el.dayCount.toString()"
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-select
                  :items="itemsSelect"
                  label="Торговый агент"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="itemsSelect"
                  label="Точка"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col>
              <v-col>
                <v-btn class="white--text mr-5 px-6" color="#D0A341"
                  >Факт</v-btn
                >
                <v-btn color="#D0A341" outlined>План</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-data-table
                :headers="headersFact"
                :items="facts"
                style="width: 100%"
                class="elevation-1 mt-5"
              ></v-data-table>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </Main>
</template>

<script>
import Main from "./Main.vue";
import http from "@/api/http.js";
export default {
  name: "Visits",
  components: {
    Main,
  },
  data() {
    return {
      tab: null,
      items: ["План", "Факты"],
      itemsSelect: ["Foo", "Bar", "Fizasddddddd", "Buzz"],
      date: false,
      selectedDate: "",
      checkbox: false,
      monthData: [],
      todayDate: new Date().getDate(),
      lastDayOfMonth: "",
      weekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      headers: [
        {
          text: "Точка",
          value: "point",
        },
      ],
      headersFact: [
        {
          text: "Код",
          value: "id",
        },
        {
          text: "Точка",
          value: "point.name",
        },
        {
          text: "Торговый агент",
          value: "agent.name",
        },
        {
          text: "Дата",
          value: "date",
        },
        {
          text: "Комментарий",
          value: "comment",
        },
        {
          text: "План",
          value: "plan",
        },
        { text: "Факт", value: "fact" },
      ],
      selectAgentId: "",
      facts: [],
      plans: [],
      agents: [],
    };
  },
  watch: {
    selectedDate: function (el) {
      let date = new Date(el);
      console.log(date.getDay());
    },
  },
  created() {
    const today = new Date();
    this.lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    for (let i = this.todayDate; i < this.lastDayOfMonth + 1; i++) {
      this.monthData.push({
        checked: false,
        dayCount: i,
        weekDay:
          this.weekDays[
            new Date(today.getFullYear(), today.getMonth(), i - 1).getDay()
          ],
        dayFullData: new Date(today.getFullYear(), today.getMonth(), i),
      });
    }
    if (today.getDate() < 10) {
      for (
        let i = 1;
        i <
        new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate() + 1;
        i++
      ) {
        this.monthData.push({
          checked: false,
          dayCount: i,
          weekDay:
            this.weekDays[
              new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                i - 1
              ).getDay()
            ],
          dayFullData: new Date(today.getFullYear(), today.getMonth() + 1, i),
        });
      }
    } else {
      for (
        let i = 1;
        i <
        new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate() -
          (this.lastDayOfMonth - this.todayDate);
        i++
      ) {
        this.monthData.push({
          checked: false,
          dayCount: i,
          weekDay:
            this.weekDays[
              new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                i - 1
              ).getDay()
            ],
          dayFullData: new Date(today.getFullYear(), today.getMonth() + 1, i),
        });
      }
    }
  },
  mounted() {
    http.get("/users/tp/").then((res) => {
      this.agents = res.data.results.filter((el) => el.role === 3);
    });
    http.get("/order/schedule/list/").then((res) => {
      this.facts = res.data.results
    });
  },
  methods: {
    fetchApplyPlan() {
      this.fetchTP();
    },
    fetchTP() {
      http.get("/users/admin/point/list/").then((res) => {
        this.plans = res.data.results;
      });
    },
    dateChecked(item, el) {
      let date = `${el.dayFullData.getFullYear()}-${el.dayFullData.getMonth()}-${el.dayFullData.getDay() < 10 ? '0'+el.dayFullData.getDay() : el.dayFullData.getDay()}`
      let data = {
        agent: this.selectAgentId,
        point: item.id,
        date: date,
      };
      http
        .post("/order/plan/", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    allDateChecked(el) {
      const temp = el.toString();
      const arr = document.getElementsByClassName(temp);
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        arr[i].click();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  overflow-x: auto;
}
.rows {
  display: flex;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px;
  span {
    font-size: 12px;
  }
  input {
    margin-top: 5px;
  }
}

.table-checkbox {
  display: block;
  margin: 0 auto;
}

.v-tab--active {
  background-color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  color: #000 !important;
  border-radius: 8px 8px 0 0;
  &:hover {
    background: #ffffff !important;
  }
}

.v-tab {
  width: 100% !important;
  margin: 0 !important;
  max-width: 100% !important;
  &:hover {
    background: transparent !important;
  }
}
</style>
