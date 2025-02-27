<template>
  <!-- <h1>Test</h1> -->
  <MainMenu />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";

export default {
  name: "App",
  components: { MainMenu },
};
</script>
