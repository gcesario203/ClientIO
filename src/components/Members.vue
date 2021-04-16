<template>
  <div class="member">
    <div class="member__content">
      <div class="member__content__box">
        <div class="member__title">
          <h1>Membros</h1>
        </div>
        <div class="member__box" v-for="user in users" :key="user.id">
          <p class="member__content__text">{{user}}</p>
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
.member {
  grid-area: member;
  background-color: #585651;
}

.member__content {
  height: 50%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
}

.member__logs {
  height: 50%;
  display: flex;
  flex-direction: column;
  max-height: 50%;
}

.member__content__box {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #814b38;
  align-items: center;
}

.member__content__text {
  color: white;
}

.member__box {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  width: 100%;
}
</style>