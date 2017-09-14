<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2">
                <img id="logo" src="../../src/assets/brewdog-logo.png" alt="Brewdog logo">
            </div>
            <div class="col-md-10">
                <h1 id="title" class="pull-right text-uppercase">BrewDog UK | Scottish Craft Beer Company</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <hr/>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <img class="img-responsive center-block" src="../../src/assets/wallpaper.jpg" alt="Wallpaper">
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 text-center text-uppercase">
                <h2>Top Beers</h2>
                <hr/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <img class="img-responsive" src="../../src/assets/punk-ipa.png" alt="Punk IPA logo">
                <hr>
                <h3>Punk IPA</h3>
                <a href="https://www.brewdog.com/beer/headliners/punk-ipa">Go to official website</a>
            </div>
            <div class="col-md-4">
                <img class="img-responsive" src="../../src/assets/jack-hammer.png" alt="Punk IPA logo">
                <hr>
                <h3>Jack Hammer</h3>
                <a href="https://www.brewdog.com/beer/amplified/jack-hammer">Go to official website</a>
            </div>
            <div class="col-md-4">
                <img class="img-responsive" src="../../src/assets/vagabond-pale-ale.svg" alt="Punk IPA logo">
                <hr>
                <a href="https://www.brewdog.com/beer/headliners/punk-ipa">Go to official website</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: 'Just another Vue.js App'
      }
    }
  }
</script>

<style>

    #logo {
        height: 100px;
    }

    /* TODO Adjust top of the page */
    /* TODO Adjust images size */

</style>
