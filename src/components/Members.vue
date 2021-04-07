<template>
  <div class="member">
    <div class="member__content">
      <div class="member__content__box">
        <div class="member__title">
          <h1>Membros</h1>
        </div>
        <p class="member__content__text">Marquinho</p>
        <p class="member__content__text">Luizinho</p>
        <p class="member__content__text">Zezinho</p>
        <p class="member__content__text">Marcos</p>
      </div>
    </div>
    <div class="member__logs">
      <div class="member__content__box">
        <div class="member__title">
          <h1>Eventos</h1>
        </div>
        <p class="member__content__text">Entrou</p>
        <p class="member__content__text">Saiu</p>
        <p class="member__content__text">Escrevendo</p>
        <p class="member__content__text">Teste</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Member",
  props: ["members"],
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
  height: 100%;
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
</style>