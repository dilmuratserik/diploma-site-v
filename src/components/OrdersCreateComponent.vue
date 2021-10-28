<template>
  <Main>
    <v-card class="pa-4">
      <v-row class="justify-space-between" no-gutters>
        <h4 class="text-lg-h5">Добавление заказ</h4>
        <v-btn color="grey" class="white--text">
          Добавить заказ
        </v-btn>
      </v-row>
      <v-form class="mt-10">
        <v-row no-gutters>
          <v-col cols="12" lg="5" class="mr-3">
            <v-row no-gutters>
              <v-select
                :items="items"
                label="Торговый агент"
                height=40
                outlined
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                :items="items"
                label="Курьер"
                height=40
                outlined
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
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
            </v-row>
            <div class="order__content">
              <p>Содержание заказа</p>
              <div class="order__items">
                <span v-if="!orderContent.length">
                  Чтобы завершить заказ, добавьте товары
                </span>
              </div>
            </div>
            <v-row class="d-flex justify-space-between mt-5" no-gutters>
              <v-btn>
                Отменить
              </v-btn>
              <v-btn>
                Добавить товары
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" lg="5">
            <v-row no-gutters>
              <v-select
                :items="items"
                label="Торговая точка"
                height=40
                outlined
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                class="mr-3"
                :items="items"
                label="Торговая точка"
                height=40
                outlined
                hide-details
              ></v-select>
              <v-select
                :items="items"
                label="Торговая точка"
                height=40
                outlined
                hide-details
              ></v-select>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </Main>
</template>

<script>
import Main from '@/views/Main.vue'
export default {
  components: {
    Main,
  },
  data() {
    return {
      orderContent: [],
      items: ['Foo', 'Bar', 'Fizasddddddd vasdasdz', 'Buzz'],
    }
  }
}
</script>

<style lang="scss" scoped>
.order__content {
  min-height: 350px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1.2px dashed #DBDBDB;
  p {
    font-size: 16px;
    color: #121212;
  }
  .order__items {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 250px;
    span {
      color: #9D9D9D;
      font-size: 14px;
    }
  }
}
</style>