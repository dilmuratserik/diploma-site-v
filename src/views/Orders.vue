<template>
  <Main>
    <div class="order">
      <div class="order__header px-3 py-3">
        <v-row class="d-flex justify-lg-end">
          <v-col cols="12" lg="3">
            <v-text-field outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" lg="2" class="d-flex justify-lg-end">
            <v-btn
              @click="$router.push('/orders/create')"
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
              height="40"
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
            >
              <template v-slot:[`item.status`]="{ item }">
                <template v-if="item.status === 1">
                  Новый
                </template>
                <template v-else-if="item.status === 2">
                  В обработке
                </template>
                <template v-else-if="item.status === 3">
                  Доставлен
                </template>
                <template v-else>
                  Возврат
                </template>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
    </div>
  </Main>
</template>

<script>
import Main from "./Main.vue";
import http from "@/api/http.js"
export default {
  components: {
    Main,
  },
  data() {
    return {
      menu2: false,
      menu3: false,
      search: "",
      date: "",
      date2: "",
      items: ["Foo", "Bar", "Fizasddddddd vasdasdz", "Buzz"],
      orderHeaders: [
        { text: "Номер", value: "id" },
        { text: "Точка", value: "point" },
        { text: "Агент", value: "counterparty.name" },
        { text: "Дата", value: "date" },
        { text: "Вид", value: "type" },
        { text: "Статус", value: "status" },
        { text: "Курьер", value: "courier" },
        { text: "Сумма", value: "total" },
        { text: "Доставка", value: "deliver" },
      ],
      orders: [],
    };
  },
  mounted() {
    http.get('/order/api/')
      .then((res) => {
        this.orders = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
};
</script>
