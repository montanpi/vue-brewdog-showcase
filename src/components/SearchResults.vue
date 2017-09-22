<template>
    <div v-if="!isLoading" class="row">
        <div class="card col-sm-6 col-md-4 col-lg-3" v-for="result in results">
            <img class="card-img-top img-responsive center-block" v-bind:src="result.image_url"
                 alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">{{ result.name}}</h4>
                <p class="card-text">ABV: {{ result.abv }}%</p>
                <p class="card-text">Malts: <span v-for="(item, index) in result.ingredients.malt">{{ item.name
                    }}<span v-if="index != (result.ingredients.malt.length - 1)">, </span></span></p>
                <p class="card-text">Hops: <span v-for="(item, index) in result.ingredients.hops">{{ item.name
                    }}<span v-if="index != (result.ingredients.hops.length - 1)">, </span></span></p>
                <div class="btn-group">
                    <button data-toggle="modal" data-target="#fullDescriptionModal" type="button"
                            class="btn btn-primary">See full description
                    </button>
                    <button type="button" class="btn btn-primary" data-toggle="tooltip" title="Add to favorites"
                            data-placement="top" @click="toggleFavorite(result)">
                        <span class="glyphicon glyphicon-star" v-bind:class="{ 'glyphicon-star-empty' : !isFavorite(result.name) }"></span>
                    </button>
                </div>
            </div>
            <full-description-modal :result="result" id="fullDescriptionModal"></full-description-modal>
        </div>
    </div>
</template>

<script>
    import FullDescriptionModal from './FullDescriptionModal.vue'
    import mixin from './mixins/mixin'

    export default {
      mixins: [mixin],
      props: [
        'isLoading',
        'results'
      ],
      components: {FullDescriptionModal}
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