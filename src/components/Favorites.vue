<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <span v-if="favorites.length == 0">You have 0 favorite beers.</span>
                <span v-if="favorites.length > 1 ">You have {{ count }} favorite beers<span
                        v-if="strongAles.length == 0">.</span><span v-if="strongAles.length == 1">; one of them is a strong ale.</span></span><span
                    v-if="strongAles.length > 1"> {{ strongAles.length }} of them are strong ales.</span>
                <p v-if="favorites.length == 1 ">You have {{ count }} favorite beer<span
                        v-if="strongAles.length == 0">.</span><span
                        v-if="strongAles.length == 1">; it's a strong ale.</span></p>
            </div>
        </div>
        <search-results v-bind:results="favorites"></search-results>
    </div>
</template>

<script>
  import FullDescriptionModal from './FullDescriptionModal.vue'
  import SearchResults from './SearchResults.vue'
  import mixin from './mixins/mixin'

  export default {
    components: {
      FullDescriptionModal,
      SearchResults
    },
    mixins: [mixin]
  }
</script>

<style scoped>

    .card {
        padding-right: 40px;
        padding-left: 40px;
        padding-top: 10px;
        padding-bottom: 20px;
        height: 700px;
    }

    img {
        height: 300px;
    }

</style>
