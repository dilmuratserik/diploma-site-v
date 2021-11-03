<template>
  <v-container class="pa-0" fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :single-select="false"
      item-key="name"
      class="elevation-1"
      hide-default-footer
      hide-default-header
    >
        <template v-slot:top="{ pagination, options, updateOptions }">
          <v-row>
            <v-col class="pl-7" cols="12" lg="1">
              <v-checkbox v-model="selectAll">
              </v-checkbox>
            </v-col>
            <v-col cols="12" lg="11">
              <v-data-footer 
                :pagination="pagination" 
                :options="options"
                @update:options="updateOptions"
                items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
            </v-col>
          </v-row>
        </template>
        <template v-slot:body="{items}">
          <tbody>
            <tr
              v-for="item in items"
              :key="item.value"
              :search="search"
              @mouseover="selectItem(item)"
              @mouseleave="unSelectItem()"
            >
              <td>
                <v-checkbox
                  multiple
                  v-model="selected"
                  :value="item"
                  style="margin:0px;padding:0px"
                  hide-details
                />
              </td>
              <td>{{ item.from }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.date }}</td>
              <td v-if="item === selectedItem">
                <v-btn icon>
                  <v-icon>mdi-package-down</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-email-open</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search:'',
      selected: [],
      selectedItem: false,
      selectAll: false,
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'from',
        },
        { text: '', sortable: false, value: 'title' },
        { text: '', sortable: false, value: 'date' },
        { text: '', sortable: false, value: 'actions' }
      ],
      items: [
        { from: 'Муратбаев Канат', title: 'Приглашаем на День открытых дверей WAYUP - Если ты давно...', date: '23 сент.' },
        { from: 'Муратбаев Марат', title: 'Приглашаем на День открытых дверей WAYUP - Если ты давно...', date: '22 сент.' },
        { from: 'Муратбаев Мурат', title: 'Приглашаем на День открытых дверей WAYUP - Если ты давно...', date: '21 сент.' },
      ],
    }
  },
  methods: {
    selectItem (item) {
      this.selectedItem = item
    },
    unSelectItem () {
      this.selectedItem = false
    }
  },
  watch: {
    selectAll: function(el) {
      if (el) {
        this.selected = this.allSelects
      } else {
        this.selected = []
      }
    }
  },
  computed: {
    allSelects() {
      let arr = []
      for (let i = 0; i < this.items.length; i++) {
        arr.push(this.items[i])
      }
      return arr
    }
  }
}
</script>


<style lang="scss">
.theme--light.v-data-table .v-data-footer {
  border-top: none!important;
}
</style>