<template>
  <h1>This is home page</h1>
  <div class="mt-5 mx-3">
    <ProductPage />
  </div>
</template>

<script>
import ProductPage from "./ProductPage.vue";

export default {
  name: "HomePage",
  components: {
    ProductPage,
  },
};
</script>

<style></style>
