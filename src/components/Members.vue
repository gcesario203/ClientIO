<template>
  <div class="member">
    <div class="member__content">
      <div class="member__content__box">
        <div class="member__title">
          <h1>Membros</h1>
        </div>
        <div class="member__box" v-for="user in users" :key="user.id">
          <p class="member__content__text">{{user.name}}</p>
        </div>
      </div>
    </div>
    <div class="member__logs">
      <div class="member__content__box">
        <div class="member__title">
          <h1>Eventos</h1>
        </div>
        <div class="member__box" v-for="event in events" :key="event.id">
          <p class="member__content__text">{{event}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Member",
  props: ["users","events"],
};
</script>

<style>
</style>