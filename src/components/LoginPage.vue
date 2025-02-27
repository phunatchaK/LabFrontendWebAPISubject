<template>
  <div class="row mt-5">
    <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
      <img src="../assets/LogoSRC.png" alt="" width="80%" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-6 mb3">
      <!-- เมื่อสั่ง Submit ให้เรียก Function handleSubmit -->
      <form @submit.prevent="handleSubmit()">
        <div class="col-sm-12 col-md-10 col-lg-8">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              type="text"
              id="loginname"
              v-model="loginname"
              autocomplete="off"
              required
              autofocus
              placeholder="loginname"
            />
            <label for="loginname">Loginname</label>
          </div>
        </div>
        <div class="col-sm-12 col-md-10 col-lg-8">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Password"
            />
            <label for="password">Password</label>
          </div>
          <!-- ส่วนแสดงสถานะ จากการตอบกลับของ Backend -->
          <p v-if="login == true" class="alert alert-success mt-3">
            เข้าระบบสำเร็จ
          </p>
          <p v-else-if="login == false" class="alert alert-danger mt-3">
            เข้าระบบผิดพลาด {{ backendmessage }}
          </p>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 mb-3">
            <router-link to="/register">
              <a href="#" class="btn btn-outline-danger">
                <i class="bi bi-heart-fill"></i>&nbsp;ลงทะเบียนใหม่</a
              >
            </router-link>
          </div>
          <div class="col-sm-12 col-md-6">
            <button class="btn btn-primary" type="submit" style="width: 6rem">
              <i class="bi bi-check-lg"></i>&nbsp;ตกลง
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import router from "@/router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;
export default {
  name: "LoginPage",
  data() {
    return {
      //กำหนดตัวแปรที่ใช้งานกับ Template และค่าเริ่มต้น
      loginname: null,
      password: null,
      login: null,
    };
  },
  mounted() {
    this.getCookie(); //เมื่อเริ่ม Component ให้เรียก methods getCookie()
  },
  methods: {
    async handleSubmit() {
      // Function
      let members = {
        // กำหนดค่า
        loginName: this.loginname,
        password: this.password,
      };
      try {
        // Request POST Method
        const response = await axios.post(
          `http://localhost:3000/members/login`,
          members
        );
        this.login = response.data.login;
        if (this.login) {
          EventBus.emit("login_ok");
          await this.chkCart()
          this.$router.push("/member");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async chkCart()
        { //เมื่อ Login สำเร็จให้ตรวจสอบว่ามีตะกร้าค้างอยู่หรือเปล่า
            console.log('chkCart')
            let members={ // กำหนดค่า
                memEmail:this.loginname
                }
            try { // Request POST Method
                    const response = await axios.post(`http://localhost:3000/carts/chkcart`,members)
                    let cartId=response.data.cartId  
                    // ส่งสัญญานหลังติดต่อ Backend
                    EventBus.emit('cartdtlOK',{id:cartId})
                    console.log( cartId)            
            }
            catch(err){console.log(err)}                
        },

    getCookie() {
      try {
        this.token = Cookies.get("token");
        this.decodedToken = jwtDecode(this.token);
        if (this.decodedToken != null) this.$router.push("/member");
      } catch (err) {
        console.error(`fail decode token ${err}`);
      }
    },
  },
};
</script>

<style></style>
