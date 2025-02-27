import CartList from "@/components/CartList.vue"
import CartShow from "@/components/CartShow.vue"
import HomePage from "@/components/HomePage.vue"
import LoginPage from "@/components/LoginPage.vue"
import MemberPage from "@/components/MemberPage.vue"
import ProductPage from "@/components/ProductPage.vue"
import ProductShow from "@/components/ProductShow.vue"
import RegisterPage from "@/components/RegisterPage.vue"
import { createRouter,createWebHistory } from "vue-router"
const routes = [
    {
        path:'/',
        name:'HomePage',
        component:HomePage
    },
    {
        path:'/login',
        name:'LoginPage',
        component:LoginPage
    },
    {
        path:'/product',
        name:'ProductPage',
        component:ProductPage
    },
    {
        path:'/register',
        name:'RegisterPage',
        component:RegisterPage
    },
    {
        path:'/member',
        name:'MemberPage',
        component:MemberPage
    },
    {
        path:'/ProductShow/:pdId',
        name:'ProductShow',
        component:ProductShow
    },
    {
        // กำหนดว่า route นี้รับ parameter ต้องระบุให้ตรงกันด้วย
        path:'/cartShow/:cartId',
        name:'CartShow',
        component:CartShow
    },
    {
        path:'/cartList/',
        name:'CartList',
        component:CartList
    },

]
const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),routes
})
export default router