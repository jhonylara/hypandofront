<template>
  <v-list>
    <div v-for="item in items">
      <v-list-item
        v-if="!item.subItems"
        :key="item.title"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-else
        v-model="item.active"
        :key="item.title"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.subItems"
          :key="subItem.title"
          :to="subItem.to"
          router
          exact
          @click=""
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-group>
    </div>
  </v-list>
</template>


<script>
export default {
  name: "sidenav",

  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Principal',
          active: true,
          to: '/business'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Campanhas',
          to: '/business/campaign',
          subItems: [
            {
              icon: 'mdi-chart-bubble',
              title: 'Criar Campanha',
              to: '/business/campaign/select',
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Campanhas ativas',
              to: '/business/campaign/active'
            }
          ]
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Criadores',
          to: '/inspire',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Estatisticas',
          to: '/inspire'
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>
