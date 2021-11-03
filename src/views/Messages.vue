<template>
  <Main>
    <v-container fluid>
      <v-row>
        <v-col
            cols="12"
            lg="3"
        >
          <v-card min-height="900">
            <v-list dense>
              <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
              >
                  <v-list-item
                  v-for="(item, i) in menu"
                  :key="i"
                  >
                  <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" lg="9">
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col cols="12" lg="7">
                  <v-text-field placeholder="Поиск" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" lg="3" offset-lg="1">
                  <v-btn color="success">Написать сообщение</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <template v-if="selectedItem === 0">
                  <Inbox></Inbox>
                </template>
                <template v-else-if="selectedItem === 2">
                  <Sent></Sent>
                </template>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Main>
</template>

<script>
import Main from './Main.vue'
import Inbox from '../components/messages/Inbox.vue'
import Sent from '../components/messages/Sent.vue'
export default {
  components: {
    Main, Inbox, Sent
  },
  data() {
    return {
      selectedItem: 0,
      menu: [
        { text: 'Входящие', icon: 'mdi-email' },
        { text: 'Прочитанные', icon: 'mdi-email-open-multiple' },
        { text: 'Отправленные', icon: 'mdi-send' },
        { text: 'Черновики', icon: 'mdi-file-document' },
        { text: 'Архив', icon: 'mdi-package-down' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>