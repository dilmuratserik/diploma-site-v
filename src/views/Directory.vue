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
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="mt-5">
        <v-tab-item>
          <v-container fluid>
            <v-col>
              <v-row>
                <v-btn
                  class="white--text"
                  color="green"
                  large
                  @click.prevent="dialog.addPriceTypeDialog = true"
                  >Добавить тип цены <v-icon>mdi-plus</v-icon></v-btn
                >
              </v-row>
            </v-col>
          </v-container>
          <v-data-table
            :headers="priceTypesHeader"
            :items="priceTypes"
            :single-select="false"
            :loading="priceTypesLoading"
            :loading-text="'Данные загружаются'"
            item-key="name"
            class="elevation-1 w-100"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div
                class="w-100"
                style="display: flex; justify-content: flex-end"
              >
                <v-btn class="mr-5" @click.prevent="editPriceType(item)"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn @click.prevent="deletePriceType(item.id)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <v-col>
              <v-row>
                <v-btn
                  class="white--text"
                  color="green"
                  small
                  large
                  @click.prevent="dialog.addStorageDialog = true"
                  >Добавить склад <v-icon>mdi-plus</v-icon></v-btn
                >
              </v-row>
            </v-col>
          </v-container>
          <v-data-table
            :headers="storagesHeader"
            :items="storages"
            :single-select="false"
            :loading="storagesLoading"
            :loading-text="'Данные загружаются'"
            item-key="name"
            class="elevation-1 w-100"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div
                class="w-100"
                style="display: flex; justify-content: flex-end"
              >
                <v-btn class="mr-5" @click.prevent="editStorage(item)"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn @click.prevent="deleteStorage(item.id)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <v-col>
              <v-row>
                <v-btn
                  class="white--text"
                  color="green"
                  small
                  large
                  @click.prevent="dialog.addSectorDialog = true"
                  >Добавить сектор заказа <v-icon>mdi-plus</v-icon></v-btn
                >
              </v-row>
            </v-col>
          </v-container>
          <v-data-table
            :headers="sectorsHeader"
            :items="sectors"
            :single-select="false"
            :loading="sectorsLoading"
            :loading-text="'Данные загружаются'"
            item-key="name"
            class="elevation-1 w-100"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div
                class="w-100"
                style="display: flex; justify-content: flex-end"
              >
                <v-btn class="mr-5" @click.prevent="editSector(item)"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn @click.prevent="deleteSector(item.id)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <!-- Edit Price Type Dialog -->
    <v-dialog v-model="dialog.editPriceTypeDialog" width="600px">
      <v-card>
        <v-card-title> Склад: {{ editedPriceType.name }} </v-card-title>
        <v-card-text>
          <v-col>
            <v-form
              v-model="editPriceTypeForm"
              ref="editPriceTypeForm"
              style="width: 100%"
              lazy-validation
            >
              <v-row>
                <v-text-field
                  v-model="editedPriceType.id"
                  label="Код"
                  outlined
                  dense
                  disabled
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model.trim="editedPriceType.name"
                  :rules="[(v) => !!v || 'Данное поле обязательное']"
                  label="Название"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </v-form>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click.prevent="dialog.editPriceTypeDialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.prevent="fetchTypePriceEdited(editedPriceType)"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Add Price Type  Dialog -->
    <v-dialog v-model="dialog.addPriceTypeDialog" width="600px">
      <v-card>
        <v-card-title> Тип цены </v-card-title>
        <v-card-text>
          <v-col>
            <v-row>
              <v-form
                v-model="addPriceTypeForm"
                ref="addPriceTypeForm"
                style="width: 100%"
                lazy-validation
              >
                <v-text-field
                  v-model.trim="priceType.name"
                  label="Название"
                  :rules="[(v) => !!v || 'Данное поле обязательное']"
                  outlined
                  dense
                ></v-text-field>
              </v-form>
            </v-row>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click.prevent="dialog.addPriceTypeDialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.prevent="fetchAddPriceType(priceType.name)"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Add sector -->
    <v-dialog v-model="dialog.addSectorDialog" width="600px">
      <v-card>
        <v-card-title> Сектор заказа </v-card-title>
        <v-card-text>
          <v-col>
            <v-form
              v-model="addSectorForm"
              ref="addSectorForm"
              style="width: 100%"
              lazy-validation
            >
              <v-row>
                <v-text-field
                  v-model.trim="sector.name"
                  :rules="[(v) => !!v || 'Данное поле обязательное']"
                  label="Название"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </v-form>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click.prevent="dialog.addSectorDialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.prevent="fecthSectorAdd(sector.name)"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit Sector -->
    <v-dialog v-model="dialog.editSectorDialog" width="600px">
      <v-card>
        <v-card-title> Сектор заказа: {{ editedSector.name }} </v-card-title>
        <v-card-text>
          <v-col>
            <v-form
              v-model="editSectorForm"
              ref="editSectorForm"
              style="width: 100%"
              lazy-validation
            >
              <v-row>
                <v-text-field
                  v-model="editedSector.id"
                  label="Код"
                  outlined
                  dense
                  disabled
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model.trim="editedSector.name"
                  :rules="[(v) => !!v || 'Данное поле обязательное']"
                  label="Название"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </v-form>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click.prevent="dialog.editSectorDialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.prevent="fetchSectorEdited(editedSector)"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit Storage Dialog -->
    <v-dialog v-model="dialog.editStorageDialog" width="600px">
      <v-card>
        <v-card-title> Склад: {{ editedStorage.name }} </v-card-title>
        <v-card-text>
          <v-col>
            <v-form
              v-model="editStorageForm"
              ref="editStorageForm"
              style="width: 100%"
              lazy-validation
            >
              <v-row>
                <v-text-field
                  v-model="editedStorage.id"
                  label="Код"
                  outlined
                  dense
                  disabled
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model.trim="editedStorage.name"
                  :rules="[(v) => !!v || 'Данное поле обязательное']"
                  label="Название"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </v-form>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click.prevent="dialog.editStorageDialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.prevent="fetchStorageEdited(editedStorage)"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Add Storage Dialog -->
    <v-dialog v-model="dialog.addStorageDialog" width="600px">
      <v-card>
        <v-card-title> Склад </v-card-title>
        <v-card-text>
          <v-col>
            <v-form
              v-model="addStorageForm"
              ref="addStorageForm"
              style="width: 100%"
              lazy-validation
            >
              <v-row>
                <v-text-field
                  v-model.trim="storage.name"
                  :rules="[(v) => !!v || 'Данное поле обязательное']"
                  label="Название"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </v-form>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click.prevent="dialog.addStorageDialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.prevent="fetchAddStorage(storage.name)"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar.status"
      :color="snackbar.snackbarColor"
      absolute
      top
      right
    >
      {{ snackbar.snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </Main>
</template>

<script>
import http from "@/api/http.js";
import Main from "@/views/Main.vue";
export default {
  name: "directory",
  components: {
    Main,
  },
  data() {
    return {
      tab: null,
      addPriceTypeForm: true,
      editPriceTypeForm: true,
      addSectorForm: true,
      editSectorForm: true,
      addStorageForm: true,
      editStorageForm: true,
      items: ["Типы цен", "Склады", "Сектор заказа"],
      priceTypesHeader: [
        { text: "Код", value: "id" },
        { text: "Название", value: "name" },
        { text: "", value: "actions" },
      ],
      storagesHeader: [
        { text: "Код", value: "id" },
        { text: "Название", value: "name" },
        { text: "", value: "actions" },
      ],
      sectorsHeader: [
        { text: "Код", value: "id" },
        { text: "Название", value: "name" },
        { text: "", value: "actions" },
      ],
      dialog: {
        editStorageDialog: false,
        addStorageDialog: false,
        editPriceTypeDialog: false,
        addPriceTypeDialog: false,
        editSectorDialog: false,
        addSectorDialog: false,
      },
      editedStorage: {
        id: null,
        name: null,
      },
      editedPriceType: {
        id: null,
        name: null,
      },
      editedSector: {
        id: null,
        name: null,
      },
      storage: {
        name: null,
      },
      priceType: {
        name: null,
      },
      sector: {
        name: null,
      },
      priceTypes: [],
      storages: [],
      sectors: [],
      priceTypesLoading: false,
      storagesLoading: false,
      sectorsLoading: false,
      snackbar: {
        status: false,
        snackbarColor: "success",
        snackbarText: "",
      },
    };
  },
  watch: {
    tab: function (newVal) {
      switch (newVal) {
        case 0:
          if (!this.priceTypes.length) {
            this.getPriceTypes();
          }
          break;
        case 1:
          if (!this.storages.length) {
            this.getStorages();
          }
          break;
        case 2:
          if (!this.sectors.length) {
            this.getSectors();
          }
          break;
      }
    },
  },
  methods: {
    fetchAddStorage() {
      if (this.$refs.addStorageForm.validate()) {
        let data = {
          name: this.storage.name,
        };
        http
          .post("/location/storage/", data)
          .then(() => {
            this.dialog.addStorageDialog = false;
            this.getStorages();
            this.snackbar = {
              status: true,
              snackbarColor: "success",
              snackbarText: "Склад успешно добавлен",
            };
          })
          .catch(() => {
            this.dialog.addStorageDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "red",
              snackbarText: "Что-то пошло не так, попробуйте еще раз",
            };
          });
      }
    },
    fetchAddPriceType() {
      if (this.$refs.addPriceTypeForm.validate()) {
        let data = {
          name: this.priceType.name,
        };

        http
          .post("/settings/price/type/", data)
          .then(() => {
            this.dialog.addPriceTypeDialog = false;
            this.getPriceTypes();
            this.snackbar = {
              status: true,
              snackbarColor: "success",
              snackbarText: "Тип цены успешно добавлен",
            };
            this.$refs.addPriceTypeForm.reset();
          })
          .catch(() => {
            this.dialog.addPriceTypeDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "red",
              snackbarText: "Что-то пошло не так, попробуйте еще раз",
            };
          });
      }
    },
    fecthSectorAdd() {
      if (this.$refs.addSectorForm.validate()) {
        let data = {
          name: this.sector.name,
        };
        http
          .post("/settings/order/sector/", data)
          .then(() => {
            this.dialog.addSectorDialog = false;
            this.getSectors();
            this.snackbar = {
              status: true,
              snackbarColor: "success",
              snackbarText: "Сектор заказа успешно добавлен",
            };
          })
          .catch(() => {
            this.dialog.addSectorDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "red",
              snackbarText: "Что-то пошло не так, попробуйте еще раз",
            };
          });
      }
    },
    fetchStorageEdited(item) {
      if (this.$refs.editStorageForm.validate()) {
        let data = { name: item.name };
        http
          .put(`/location/storage/${item.id}/`, data)
          .then(() => {
            this.dialog.editStorageDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "success",
              snackbarText: "Склад успешно изменен",
            };
            this.getStorages();
          })
          .catch(() => {
            this.dialog.editStorageDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "red",
              snackbarText: "Что-то пошло не так, попробуйте еще раз",
            };
          });
      }
    },
    fetchTypePriceEdited(item) {
      if (this.$refs.editPriceTypeForm.validate()) {
        let data = { name: item.name };
        http
          .put(`/settings/price/type/${item.id}/`, data)
          .then(() => {
            this.dialog.editPriceTypeDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "success",
              snackbarText: "Тип цены успешно изменен",
            };
            this.getPriceTypes();
          })
          .catch(() => {
            this.dialog.editPriceTypeDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "red",
              snackbarText: "Что-то пошло не так, попробуйте еще раз",
            };
          });
      }
    },
    fetchSectorEdited(item) {
      if (this.$refs.editSectorForm.validate()) {
        let data = { name: item.name };
        http
          .put(`/settings/order/sector/${item.id}/`, data)
          .then(() => {
            this.dialog.editSectorDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "success",
              snackbarText: "Сектор заказа успешно изменен",
            };
            this.getSectors();
          })
          .catch(() => {
            this.dialog.editSectorDialog = false;
            this.snackbar = {
              status: true,
              snackbarColor: "red",
              snackbarText: "Что-то пошло не так, попробуйте еще раз",
            };
          });
      }
    },
    editStorage(item) {
      this.editedStorage = {
        id: item.id,
        name: item.name,
      };
      this.dialog.editStorageDialog = true;
    },
    editPriceType(item) {
      this.editedPriceType = {
        id: item.id,
        name: item.name,
      };
      this.dialog.editPriceTypeDialog = true;
    },
    editSector(item) {
      this.editedSector = {
        id: item.id,
        name: item.name,
      };
      this.dialog.editSectorDialog = true;
    },
    deleteStorage(id) {
      http
        .delete(`/location/storage/${id}/`)
        .then(() => {
          this.getStorages();
          this.snackbar = {
            status: true,
            snackbarColor: "success",
            snackbarText: "Склад успешно удален",
          };
        })
        .catch(() => {
          this.snackbar = {
            status: true,
            snackbarColor: "red",
            snackbarText: "Что-то пошло не так, попробуйте еще раз",
          };
        });
    },
    deletePriceType(id) {
      http
        .delete(`/settings/price/type/${id}`)
        .then(() => {
          this.getPriceTypes();
          this.snackbar = {
            status: true,
            snackbarColor: "success",
            snackbarText: "Тип цены успешно удален",
          };
        })
        .catch(() => {
          this.snackbar = {
            status: true,
            snackbarColor: "red",
            snackbarText: "Что-то пошло не так, попробуйте еще раз",
          };
        });
    },
    deleteSector(id) {
      http
        .delete(`/settings/order/sector/${id}`)
        .then(() => {
          this.getSectors();
          this.snackbar = {
            status: true,
            snackbarColor: "success",
            snackbarText: "Сектор заказ успешно удален",
          };
        })
        .catch(() => {
          this.snackbar = {
            status: true,
            snackbarColor: "red",
            snackbarText: "Что-то пошло не так, попробуйте еще раз",
          };
        });
    },
    getPriceTypes() {
      http
        .get("/settings/price/type/")
        .then((res) => {
          this.priceTypes = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStorages() {
      http
        .get("/location/storage/")
        .then((res) => {
          this.storages = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSectors() {
      http
        .get("/settings/order/sector/")
        .then((res) => {
          this.sectors = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-tab--active {
  background-color: #ffffff;
  color: #000!important;
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
