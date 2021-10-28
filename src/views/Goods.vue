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
            <template v-slot:[`item.edit`]="{ item }">
              <v-icon @click="editRow(item)" color="grey" dark>
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
    editRow(id) {
      console.log(id);
    }
  }
}
</script>