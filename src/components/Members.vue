<template>
  <div class="member">
    <div class="member__content">
      <div class="member__content__box">
        <div class="d-flex justify-space-between align-center">
          <h1>Membros</h1>
          <v-menu bottom :attach="true" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="goToTheHub">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-chevron-left</v-icon>
                      </v-btn>
                    </template>
                    <span>Retornar ao Hub</span>
                  </v-tooltip>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div
          class="d-flex flex-column justify-center align-center"
          style="background: #232e21; color: white; border-radius: 8px"
        >
          <p v-for="user in users"
          :key="user.id" class="align-center">{{ user.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Member",
  props: ["users", "events"],
  methods: {
    goToTheHub() {
      this.$router.push("/Hub");
    },
  },
};
</script>

<style>
</style>