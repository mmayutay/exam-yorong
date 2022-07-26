<template>

    <div id="myIconSideNav" class="iconSideNav" @mouseover="openNav()">
        <div class="imageClass">
            <img src="../assets/Netlink_Logo.jpg" alt="" />
        </div><br><br><br>
        <a class="nav" v-for="option in options" :key="option.id"> <i :class="option.icon"></i></a>
    </div>
    <span style="font-size:50px;cursor:pointer; position: fixed;" @click="openNav()">&#9776;</span>
    <div id="mySidenav" class="sidenav">
        <h2 id="net-text" style="text-align: center;"> Netlink Voice </h2>
        <br><br>

        <span><a href="javascript:void(0)" style="text-align: right;" class="closebtn"
                @click="closeNav()">&times;</a></span>
        <a class="nav" v-for="option in options" :key="option.id" :href="option.route" @click="selectedNav(option)">{{
                option.tag
        }}</a>
        <br>
    </div> <br><br>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "TopNavigationBar",
    emits: ["changeHeaderText"],
    props: {
        name: String
    },
    data() {
        return {
            options: [
                { route: "#/", tag: "Home", icon: "fa fa-home" },
                { route: "#/list", tag: "Product List", icon: "fa fa-list" },
                { route: "#/add-new-product", tag: "Add New Product", icon: "fa fa-plus" },
                { route: "#/settings", tag: "Settings", icon: "fa fa-gear" }
            ]
        }
    },
    methods: {
        openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "300px";
            document.getElementById("net-text").style.width = "250px";
        },
        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "50px";
            document.getElementById("net-text").style.marginLeft = "0";
        },

        selectedNav(nav) {
            this.$emit("changeHeaderText", nav.tag)
        }

    }
})

</script>

<style scoped>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 50px;
    background-color: rgb(85, 85, 198);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 50px;
    border: 1px solid rgba(119, 119, 119, 0.5);
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 20px;
    color: #ffffff;
    display: block;
    transition: 0.3s;
    width: 200px;

}

.sidenav a:hover {
    color: rgb(196, 196, 196);
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

#main {
    transition: margin-left .5s;
    padding: 16px;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}

.imageClass {
    margin-left: auto;
    margin-right: auto;
}

img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

a.nav {
    margin-bottom: 10px;
}

.iconSideNav {
    height: 100%;
    width: 50px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(67, 67, 159);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 50px;
}

.iconSideNav a {
    padding: 8px;
    text-decoration: none;
    font-size: 20px;
    color: #ffffff;
    display: block;
    transition: 0.3s;
    width: 10px;
}
</style>