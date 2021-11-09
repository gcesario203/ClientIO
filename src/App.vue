<template>
  <div id="app">
    <v-app>
      <main>
        <v-container
          fluid
          fill-height
          style="background: #646E78; height: 100vh"
        >
          <router-view />
        </v-container>
      </main>
    </v-app>
  </div>
</template>
<style>
.notification{
  padding: 0 10vh;
  width: 30vw;
  font-family:Georgia, 'Times New Roman', Times, serif ;
  color: white;
}

.is-info{
  background: #0277BD;
}

.is-warning{
  background: #F9A825;
}

.is-danger{
  background: #D32F2F;
}

.is-success{
  background: #43A047;
}

</style>