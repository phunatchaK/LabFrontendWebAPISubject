<template>
  <form @submit.prevent="uploadFile()">
    <div class="row g-3 mt-3 ">
      <div class="col-md-6 col-sm-12 col-lg-3">
        <div class="card mt-5" style="width: 18rem" v-if="imageExists">
          <img
            :src="`http://localhost:3000/img_mem/${memEmail}.jpg?timestamp=${imageTimestamp}`"
            :alt="memEmail"
          />
        </div>
        <div class="card mt-5" style="width: 18rem" v-else>
          <img
            :src="`http://localhost:3000/img_mem/default.jpg`"
            :alt="memEmail"
          />
        </div>
        <div class="col-auto my-3">
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="onFileChange"
            required
          />
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" type="submit">Upload</button>
        </div>
      </div>
      <!-- <div class="col-lg-8">
        <div
      v-for="(pd, pdId) in products"
      :key="pdId"
      class="col-lg-4 col-md-6 col-sm-12"
    ></div>
      </div> -->
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-6 col-sm-12"></div>
      <div class="col-auto">
        <div
          class="alert alert-success"
          v-if="fileMessage != 'fail' && fileMessage != null"
        >
          {{ fileMessage }}
        </div>
      </div>
      <div class="col-auto"></div>
    </div>
  </form>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
export default {
  name: "MemberPage",
  data() {
    return {
      token: "",
      decodedToken: null, //token ที่ถูกแกะแล้ว
      memEmail: null,
      memName: null,
      dutyId: null,
      imageExists: false,
      fileMessage: null,
      file: null,
      imageTimestamp: Date.now(),
    };
  },
  mounted() {
    this.getCookie(); //เมื่อเริ่ม Component ให้เรียก methods getCookie()
    this.checkImage();
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },

    // ทำการ Uploadfile เมื่อถูกSubmit ต้องเป็น async เพราะต้องรอให้ load เสร็จ
    async uploadFile() {
      console.log("uploadFile!!!");

      if (!this.file) {
        this.fileMessage = "เลือก File ก่อน";
        return;
      }
      // กำหนดค่า Form เพื่อ POST
      const formData = new FormData();
      formData.append("memEmail", this.memEmail);
      formData.append("file", this.file);
      // กำหนด endpoint และกำหนด Header ว่าเป็นการส่ง file
      try {
        const response = await axios.post(
          "http://localhost:3000/members/uploadimg",
          formData,
          {
            // กำหนด Header Message
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.fileMessage = response.data.message;
        // ให้ทำการตรวจสอบ image อีกครั้ง
        this.checkImage();
        // กำหนด imageTimestamp ใหม่เพื่อให้ vue เรียก image ใหม่
        this.imageTimestamp = Date.now();
      } catch (err) {
        this.fileMessage = "fail";
      }
    },

    getCookie() {
      try {
        this.token = Cookies.get("token"); //อ่านค่าจากCookies ชื่อtoken ใส่ตัวแปร token
        // jwt-decode ไม่ใช้ secretkey แกะแต่ส่วน payload - ฝั่งBackend ที่ต้องการความเชื่อถือได้
        this.decodedToken = jwtDecode(this.token);
        console.log(this.decodedToken);
        this.memEmail = this.decodedToken.memEmail;
        this.memName = this.decodedToken.memName;
        this.dutyId = this.decodedToken.dutyId;
      } catch (err) {
        console.error(`fail decode token ${err}`);
      }
    },
    checkImage() {
      const image = new Image();
      image.src = `http://localhost:3000/img_mem/${this.memEmail}.jpg`;
      image.onload = () => {
        // รูปภาพโหลดสำเร็จ
        this.imageExists = true;
      };
      image.onerror = () => {
        // รูปภาพไม่สามารถโหลดได้
        this.imageExists = false;
      };
    },
  },
};
</script>

<style></style>
