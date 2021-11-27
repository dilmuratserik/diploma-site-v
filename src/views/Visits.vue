<template>
  <Main>
    <v-card>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="mt-5">
        <v-tab-item>
          <v-container>
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
                  :items="itemsSelect"
                  label="Торговый агент"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col>
              <v-col lg="3" md="3">
                <v-select
                  :items="itemsSelect"
                  label="Точка"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <div class="table">
              <div class="rows">
                <div v-for="(el, index) in monthData" :key="index" class="column">
                  <span>{{ el.dayFullData.getDate() }}.{{ el.dayFullData.getMonth() + 1}}</span>
                  <span>{{ el.weekDay }}</span>
                  <v-checkbox v-model="el.checked" class="mt-1"></v-checkbox>
                </div>
              </div>
            </div>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </Main>
</template>

<script>
import Main from "./Main.vue";
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
      lastDayOfMonth: '',
      weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    };
  },
  created() {
    const today = new Date();
    this.lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    for (let i = this.todayDate; i < this.lastDayOfMonth + 1; i++) {
      this.monthData.push({
        checked: false,
        dayCount: i,
        weekDay: this.weekDays[new Date(today.getFullYear(), today.getMonth(), i - 1).getDay()],
        dayFullData: new Date(today.getFullYear(), today.getMonth(), i)
      })
    }
    if (today.getDate() < 10) {
      for (let i = 1; i < new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate() + 1; i++) {
        this.monthData.push({
          checked: false,
          dayCount: i,
          weekDay: this.weekDays[new Date(today.getFullYear(), today.getMonth() + 1, i - 1).getDay()],
          dayFullData: new Date(today.getFullYear(), today.getMonth() + 1, i)
        })
      }
    } else {
      for (let i = 1; i < new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate() - (this.lastDayOfMonth - this.todayDate); i++) {
        this.monthData.push({
          checked: false,
          dayCount: i,
          weekDay: this.weekDays[new Date(today.getFullYear(), today.getMonth() + 1, i - 1).getDay()],
          dayFullData: new Date(today.getFullYear(), today.getMonth() + 1, i)
        })
      }
    }
  },
  watch: {
    selectedDate: function (el) {
      let date = new Date(el);
      console.log(date.getDay());
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
  padding: 0 5px;
  span {
    font-size: 12px;
  }
}
</style>
