<template>
  <Main>
    <v-card class="mt-5">
      <v-row class="pa-5">
        <v-col>
          <v-select
            :items="priceFilterOptions"
            label="По цене"
            height="40"
            outlined
            hide-details
            dense
            @change="filterByPrice"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="statusFilterOptions"
            label="Статус"
            height="40"
            outlined
            hide-details
            dense
            @change="filterByStatus"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="queryParam.search"
            label="Поиск"
            hide-details
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="success" @click="applyFilters">Применить</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" lg="12">
          <v-data-table
            :headers="headers"
            :items="productsData.results"
            :items-per-page="15"
            :server-items-length="productsData.count"
            :loading="tableLoading"
            :loading-text="'Данные загружаются'"
            @pagination="paginationClick"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-dialog v-model="editDialog" max-width="900">
                <v-card>
                  <v-card-title>
                    <v-container>
                      <span class="text-h6">Анкета товара</span>
                    </v-container>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row class="d-flex justify-start">
                        <v-col lg="3">
                          <div class="uploadInput">
                            <input type="file" @change="uploadImage" />
                            <v-avatar
                              size="100"
                              rounded
                              style="border: 1px solid #ccc"
                            >
                              <img
                                :src="
                                  imageUrl
                                    ? imageUrl
                                    : require('@/assets/noData.png')
                                "
                                alt="av"
                              />
                            </v-avatar>
                          </div>
                          <span class="upload-text"
                            >Чтобы загрузить картинку нажмите на иконку</span
                          >
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Наименование товара"
                            disabled
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editedItem.code"
                            label="Код товара"
                            disabled
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editedItem.article"
                            label="Артикул товара"
                            disabled
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editedItem.price"
                            label="Цена товара"
                            disabled
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editedItem.count"
                            label="Количество товара"
                            disabled
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editedItem.status"
                            label="Статус товара"
                            disabled
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="d-flex justify-end">
                        <v-col cols="12" lg="6">
                          <v-btn
                            class="mr-5"
                            @click="editDialog = false"
                            outlined
                            dense
                            color="success"
                          >
                            Вернуться назад
                          </v-btn>
                          <v-btn @click="editDialog = false" color="success">
                            Сохранить
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              {{ item.status === 1 ? "В наличии" : "Нет в наличии" }}
            </template>
            <template v-slot:[`item.edit`]="{ item }">
              <v-icon @click="editItem(item)" color="grey" dark>
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </Main>
</template>

<script>
import http from "../api/http";
import Main from "@/views/Main.vue";
export default {
  components: {
    Main,
  },
  data() {
    return {
      editDialog: false,
      editedIndex: -1,
      editedItem: {
        code: "",
        name: "",
        article: "",
        price: "",
        count: "",
        status: "",
      },
      headers: [
        {
          text: "Код",
          value: "code",
        },
        { text: "Название", value: "name" },
        { text: "Артикул", value: "article" },
        { text: "Цена", value: "price" },
        { text: "Остаток", value: "count" },
        { text: "Статус", value: "status" },
        { text: "", value: "edit" },
      ],
      search: "",
      priceFilterOptions: [
        { text: "По умолчанию", value: 0 },
        { text: "По возрастанию", value: 1 },
        { text: "По убыванию", value: 2 },
      ],
      statusFilterOptions: [
        { text: "По умолчанию", value: 0 },
        { text: "В наличии", value: 1 },
        { text: "Нет в наличии", value: 2 },
      ],
      productsData: [],
      paginationOption: {},
      tableLoading: false,
      imageUrl: "",
      queryParam: {
        search: "",
        page: 1,
        sort_price: "",
        status: "",
      },
    };
  },
  watch: {
    queryParam: {
      handler(el) {
        this.fetchProducts(el);
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts(data) {
      this.tableLoading = true;
      http.get("/product/", data).then((res) => {
        this.productsData = res.data;
        this.paginationOption = {
          pageCount: Math.floor(res.data.count / 15),
          itemsLength: res.data.count,
        };
        this.tableLoading = false;
      });
    },
    applyFilters() {
      this.fetchProducts(this.queryParam);
    },
    editItem(item) {
      this.editedIndex = this.productsData.results.indexOf(item);
      this.editedItem = Object.assign({}, item, {
        status: item.status === 1 ? "В наличии" : "Нет в наличии",
      });
      this.editDialog = true;
    },
    paginationClick(e) {
      this.queryParam.page = e.page;
    },
    uploadImage(e) {
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("images", file);
      http
        .post(`/product/add/image/${this.editedItem.id}`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterByPrice(el) {
      switch (el) {
        case 0:
          this.queryParam.sort_price = "";
          break;
        case 1:
          this.queryParam.sort_price = "price";
          break;
        case 2:
          this.queryParam.sort_price = "-price";
      }
    },
    filterByStatus(el) {
      switch (el) {
        case 0:
          this.queryParam.status = "";
          break;
        case 1:
          this.queryParam.status = 1;
          break;
        case 2:
          this.queryParam.status = 2;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadInput {
  position: relative;
  overflow: hidden;
  max-width: 100px;
  input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    z-index: 20;
    opacity: 0;
    cursor: pointer;
  }
  img {
    object-fit: cover;
  }
}
.upload-text {
  display: inline-block;
  margin-top: 10px;
}
</style>
