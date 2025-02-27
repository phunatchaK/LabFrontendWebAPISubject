<!-- <template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title">Product</h1>
      <p class="card-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsum
        quod veritatis cumque sunt ex cum sequi, fugit omnis qui ipsa magnam
        officiis modi labore natus! In illo doloremque eaque!
      </p>
    </div>
  </div>
</template> -->
<template>
  <div class="row">
    <!-- vue.js form ถ้าไม่กำหนด @submit.prevent จะทำการเปลี่ยนหน้าเมือ submit -->
    <form @submit.prevent="searchProduct()">
      <div class="row">
        <div class="h1 col-md-6 col-sm-12text-danger">ผลิตภันฑ์ของเรา</div>
        <div class="col-md-4 col-sm-6">
          <input type="text" class="form-control" v-model="stext" />
        </div>
        <div class="col">
          <button
            class="btn btn-primary"
            type="submit"
            @click="searchProduct()"
          >
            ค้นหา
          </button>
        </div>
      </div>
    </form>
    <div
      v-for="(pd, pdId) in products"
      :key="pdId"
      class="col-lg-4 col-md-6 col-sm-12"
    >
      <div class="card m-1" style="width: 18rem">
        <img
          :src="`http://localhost:3000/img_pd/${pd.pdId}.jpg`"
          class="card-img-top"
          alt=""
        />
        <div class="card-body">
          <h5 class="card-title">{{ pd.pdName }}</h5>
          <p class="card-text">{{ pd.brand.brandName }} - {{ pd.pdPrice }}</p>
          <router-link
            :to="{ name: 'ProductShow', params: { pdId: pd.pdId } }"
            style="text-decoration: none"
          >
            <div class="btn btn-primary">ดูรายละเอียด</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ProductPage",
  data() {
    return {
      studentName: "phunatcha",
      products: [],
      stext: "",
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/products/ten`) //ดึงข้อมูลจาก Backend
      .then((res) => {
        this.products = res.data;
      }) //ได้ data ใช้ data เป็นParameter กำหนดค่าให้ products
      .catch((err) => console.log(err.message)); //ถ้าผิดพลากแสดง err
  },
  methods: {
    searchProduct() {
      axios
        .get(`http://localhost:3000/products/search/${this.stext}`) //ดึงข้อมูลจาก Backend
        .then((res) => {
          this.products = res.data;
        }) //ได้ data ใช้ data เป็นParameter กำหนดค่าให้ products
        .catch((err) => console.log(err.message)); //ถ้าผิดพลากแสดง err}
    },
  },
};
</script>

<style></style>
