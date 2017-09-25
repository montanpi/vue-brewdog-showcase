<template>
    <div>
        <div class="wrapper">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <router-link class="navbar-brand" to="/">
                            <img id="brand-image" src="../src/assets/navbar-logo.png" alt="Website Logo"/>
                        </router-link>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <li v-bind:class="{active : $route.path === '/search'}">
                                <router-link to="/search">Search</router-link>
                            </li>
                            <li v-bind:class="{active : $route.path === '/favorites'}">
                                <router-link to="/favorites">Favorites</router-link>
                            </li>
                            <li v-bind:class="{active : $route.path === '/about'}">
                                <router-link to="/about">About</router-link>
                            </li>
                            <li v-bind:class="{active : $route.path === '/contact'}">
                                <router-link to="/contact">Contact</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <router-view></router-view>
            <div class="push"></div>
        </div>
        <footer class="navbar navbar-fixed-bottom container-fluid text-center">
            <span>
                &copy {{ year }} &nbsp
            </span>
            <span class="text-uppercase">
                  Engage People Inc. &nbsp
            </span>
            <span>
                All rights reserved.</span>
        </footer>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        year: new Date().getFullYear()
      }
    }
  }
</script>

<style>

    body {
        padding-bottom: 70px;
    }

    #brand-image {
        height: 25px;
        padding-bottom: 5px;
    }

    /* Remove the navbar's default rounded borders */
    .navbar {
        border-radius: 0;
    }

    /* Set black background color, white text and some padding */
    footer {
        background-color: #555;
        color: white;
        padding: 15px;
    }

    html, body {
        height: 100%;
        margin: 0;
    }

    .wrapper {
        min-height: 100%;

        /* Equal to height of footer */
        /* But also accounting for potential margin-bottom of last child */
        margin-bottom: -50px;
    }

    .footer,
    .push {
        margin-top: 30px;
        height: 50px;
    }

    .has-error {
        color: red;
    }

</style>
