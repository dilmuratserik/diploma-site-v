<template>
  <Main>
    <div class="order">
      <div class="order__header px-3 py-3">
        <v-row class="d-flex justify-lg-end">
          <v-col cols="12" lg="3">
            <v-text-field outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" lg="2">
            <v-btn
              depressed
              color="success"
            >
              Добавить заказ
            </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="pr-1" cols="12" lg="2">
            <v-select
              :items="items"
              label="Точка"
              height=40
              outlined
              hide-details
              dense
            ></v-select>
          </v-col>
          <v-col class="pr-1" cols="12" lg="2">
            <v-select
              :items="items"
              label="Агент"
              outlined
              hide-details
              dense
            ></v-select>
          </v-col>
          <v-col class="pr-1" cols="12" lg="2">
            <v-select
              :items="items"
              label="Курьер"
              outlined
              hide-details
              dense
            ></v-select>
          </v-col>
          <v-col class="pr-1" cols="12" lg="2">
            <v-select
              :items="items"
              label="Статус"
              outlined
              hide-details
              dense
            ></v-select>
          </v-col>
          <!-- <v-col class="d-flex" cols="12" lg="3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              outlined
            ></v-text-field>
          </v-col> -->
          <v-col class="pr-1" cols="12" lg="2">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
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
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" lg="2">
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date2"
                  label="Доставка"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date2"
                @input="menu3 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-data-table
              dense
              :headers="orderHeaders"
              :items="orders"
              item-key="name"
              class="w-100 elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </div>
    </div>
  </Main>
</template>

<script>
import Main from "./Main.vue"
export default {
  components: {
    Main
  },
  data() {
    return {
      menu2: false,
      menu3: false,
      search: '',
      date: '',
      date2: '',
      items: ['Foo', 'Bar', 'Fizasddddddd vasdasdz', 'Buzz'],
      orderHeaders: [
        { text: 'Номер', value: 'number' },
        { text: 'Точка', value: 'point' },
        { text: 'Агент', value: 'agent' },
        { text: 'Дата', value: 'date' },
        { text: 'Вид', value: 'type' },
        { text: 'Статус', value: 'status' },
        { text: 'Курьер', value: 'delivery' },
        { text: 'Сумма', value: 'total' },
        { text: 'Доставка', value: 'deliver' },
      ],
      orders: [
        { number: '45569', point: 'Бегалиев 5, Морошкин магазин', agent: 'Маратов Марат', date: '11.03.2021', type: 'Заказ', status: 'Новый', delivery: 'Ахметкалиев Адиль ', total: '70 000', deliver: '12.03.2021' },
        { number: '45569', point: 'Бегалиев 5, Морошкин магазин', agent: 'Маратов Марат', date: '11.03.2021', type: 'Заказ', status: 'Новый', delivery: 'Ахметкалиев Адиль ', total: '70 000', deliver: '12.03.2021' },
        { number: '45569', point: 'Бегалиев 5, Морошкин магазин', agent: 'Маратов Марат', date: '11.03.2021', type: 'Заказ', status: 'Новый', delivery: 'Ахметкалиев Адиль ', total: '70 000', deliver: '12.03.2021' },
        { number: '45569', point: 'Бегалиев 5, Морошкин магазин', agent: 'Маратов Марат', date: '11.03.2021', type: 'Заказ', status: 'Новый', delivery: 'Ахметкалиев Адиль ', total: '70 000', deliver: '12.03.2021' },
        { number: '45569', point: 'Бегалиев 5, Морошкин магазин', agent: 'Маратов Марат', date: '11.03.2021', type: 'Заказ', status: 'Новый', delivery: 'Ахметкалиев Адиль ', total: '70 000', deliver: '12.03.2021' }
      ],
    }
  }
}
</script>