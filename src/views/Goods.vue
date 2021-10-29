<template>
  <Main>
    <v-card>
      <v-row class="pa-5">
        <v-col>
          <v-select
            :items="items"
            label="По цене"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="items"
            label="Статус"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            label="Поиск"
            hide-details
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" lg="12">
          <v-data-table
            :headers="headers"
            :items="goods"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-dialog
                v-model="editDialog"
              > 
                <v-card>
                  <v-card-title>
                    <v-container>
                      <span class="text-h6">Анкета товара</span>
                    </v-container>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row class="d-flex justify-center">
                        <v-col lg="3">
                          <v-avatar size="100">
                            <img src="@/assets/avatar.png" alt="av">
                          </v-avatar>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Наименование товара"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="editedItem.code"
                            label="Код товара"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="editedItem.article"
                            label="Артикул товара"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="editedItem.price"
                            label="Цена товара"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="editedItem.count"
                            label="Количество товара"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="editedItem.status"
                            label="Статус товара"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="d-flex justify-end">
                        <v-col cols="12" lg="6">
                          <v-btn class="mr-5" @click="editDialog = false" outlined color="success">
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
import Main from '@/views/Main.vue'
export default {
  components: {
    Main
  },
  data() {
    return {
      editDialog: false,
      editedIndex: -1,
      editedItem: {
        code: '',
        name: '',
        article: '',
        price: '',
        count: '',
        status: '',
      },
      headers: [
        {
          text: 'Код',
          value: 'code',
        },
        { text: 'Название', value: 'name' },
        { text: 'Артикул', value: 'article' },
        { text: 'Цена', value: 'price' },
        { text: 'Остаток', value: 'count' },
        { text: 'Статус', value: 'status' },
        { text: '', value: 'edit' }
      ],
      goods: [
        { 
          code: '654',
          name: 'Хруст NUT Арахис в хрустящей корочке(бекон) 60 гр',
          article: '10609-G',
          price: '450 тг',
          count: '40 000',
          status: 'В наличии'
        }
      ]
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.goods.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    }
  }
}
</script>