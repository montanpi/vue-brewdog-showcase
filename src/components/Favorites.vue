<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <p>You have {{ count }} favorite beers</p>
                <p>You have {{ strongAles.length }} favorite strong beers</p>
            </div>
        </div>
        <search-results v-bind:isLoading="isLoading" v-bind:results="favorites"></search-results>
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
