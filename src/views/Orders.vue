<template>
  <Main>
    <div class="order">
      <div class="order__header px-3 py-3">
        <v-row>
          <v-col class="d-flex" lg="2">
            <v-select
              :items="items"
              label="Точка"
              height=40
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col class="d-flex" lg="2">
            <v-select
              :items="items"
              label="Агент"
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col class="d-flex" lg="2">
            <v-select
              :items="items"
              label="Курьер"
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col class="d-flex" lg="2">
            <v-select
              :items="items"
              label="Статус"
              outlined
              hide-details
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
          <v-col class="d-flex" lg="2">
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
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col class="d-flex" lg="2">
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
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date2"
                @input="menu3 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" lg="2">
            <v-btn
              depressed
              color="success"
            >
              Добавить заказ
            </v-btn>
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
    }
  }
}
</script>