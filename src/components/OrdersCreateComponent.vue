<template>
  <Main>
    <v-stepper v-model="orderStepper">
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row class="justify-space-between" no-gutters>
            <h4 class="text-lg-h5">Добавление заказ</h4>
            <v-btn color="grey" class="white--text"> Добавить заказ </v-btn>
          </v-row>
          <v-form class="mt-10">
            <v-row no-gutters>
              <v-col cols="12" lg="5" class="mr-3">
                <v-row no-gutters>
                  <v-select
                    :items="items"
                    label="Торговый агент"
                    height="40"
                    outlined
                    hide-details
                  ></v-select>
                </v-row>
                <v-row class="mt-5" no-gutters>
                  <v-menu
                    v-model="orderDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="orderDate"
                        label="Дата заказа"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="orderDate"
                      @input="menu3 = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-menu
                    v-model="deliveryDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="deliveryDate"
                        label="Дата доставки"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="deliveryDate"
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
                  <v-btn color="#196643" outlined> Отменить </v-btn>
                  <v-btn class="white--text" color="#196643" @click.prevent="orderStepper = 2"> Добавить товары </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" lg="5">
                <v-row no-gutters>
                  <v-select
                    :items="items"
                    label="Торговая точка"
                    height="40"
                    outlined
                    hide-details
                  ></v-select>
                </v-row>
                <v-row class="mt-5" no-gutters>
                  <v-select
                    class="mr-3"
                    :items="items"
                    label="Статус заказа"
                    height="40"
                    outlined
                    hide-details
                  ></v-select>
                  <v-select
                    :items="items"
                    label="Вид заказа"
                    height="40"
                    outlined
                    hide-details
                  ></v-select>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-container fluid>
            <v-row>
              <v-breadcrumbs
                :items="breadcrumbs"
              ></v-breadcrumbs>
            </v-row>
            <v-row>
              <v-col>
                <v-select :items="items" label="Категория" outlined dense></v-select>
              </v-col>
              <v-col>
                <v-select :items="items" label="Статус" outlined dense></v-select>
              </v-col>
              <v-col>
                <v-text-field v-model.lazy="queryParams.search" placeholder="Поиск" outlined dense></v-text-field>
              </v-col>
              <v-col>
                <v-btn class="white--text px-8" color="#196643">Завершить</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-data-table
                class="w-100 elevation-1"
                style="width: 100%"
                :headers="productsHeader"
                :items="products"
                item-key="name"
              >
                <template v-slot:[`item.category`]="{ item }">
                  {{ categories.filter((el) => item.category === el.id)[0].name }}
                </template>
                <template v-slot:[`item.count`]="{ item }">
                  <div>
                    <v-btn color="#196643" outlined @click="countDown(item)">-</v-btn>
                    <button style="width: 60px">{{ item.counter }}</button>
                    <v-btn color="#196643" outlined @click="countUp(item)">+</v-btn>
                  </div>
                </template>
                <template v-slot:[`item.status`]="{ item }">
                  {{ item.status === 1 ? "В наличии" : "Нет в наличии" }}
                </template>
                <template v-slot:[`item.action`]="{ item }">
                  <v-btn color="#196643" @click.prevent="addToCart(item)" outlined>Добавить</v-btn>
                </template>
              </v-data-table>
            </v-row>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </Main>
</template>

<script>
import Main from "@/views/Main.vue";
import http from "@/api/http.js";
export default {
  components: {
    Main,
  },
  data() {
    return {
      orderStepper: 2,
      orderDateMenu: null,
      orderDate: null,
      deliveryDateMenu: null,
      deliveryDate: null,
      orderContent: [],
      items: ["По умолчанию", "Foo", "Bar", "Fizasddddddd vasdasdz", "Buzz"],
      breadcrumbs: [
        { text: "Добавление заказа", disabled: true },
        { text: "Добавление товаров", disabled: false },
      ],
      productsHeader: [
        { text: "Название", value: "name" },
        { text: "Категория", value: "category" },
        { text: "Цена", value: "price" },
        { text: "Количество", value: "count" },
        { text: "Статус", value: "status" },
        { text: "", value: "action" }
      ],
      products: [],
      categories: [],
      queryParams: {
        search: ""
      },
    };
  },
  mounted() {
    http.get('/category/list/')
      .then((res) => {
        this.categories = res.data.category
      })
      .catch((err) => {
        console.log(err)
      })
    http.get('/product/')
      .then((res) => {
        res.data.results.forEach(product => {
          this.products.push({
            ...product,
            counter: 1,
            totalPrice: product.price,
          })
        });
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    addToCart(product) {
      console.log(product)
    },
    countUp(product) {
      this.products.forEach((el) => {
        if (product.id === el.id) {
          el.counter += 1
        }
      })
    },
    countDown(product) {
      this.products.forEach((el) => {
        if (product.id === el.id && el.counter !== 1) {
          el.counter -= 1
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.order__content {
  min-height: 350px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1.2px dashed #dbdbdb;
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
      color: #9d9d9d;
      font-size: 14px;
    }
  }
}
</style>
