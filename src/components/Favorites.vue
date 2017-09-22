<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <p>You have {{ count }} favorite beers</p>
            </div>
        </div>
        <div class="row">
            <div class="card col-sm-6 col-md-4 col-lg-3" v-for="favorite in favorites">
                <img class="card-img-top img-responsive center-block" v-bind:src="favorite.image_url"
                     alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">{{ favorite.name}}</h4>
                    <p class="card-text">ABV: {{ favorite.abv }}%</p>
                    <p class="card-text">Malts: <span v-for="(item, index) in favorite.ingredients.malt">{{ item.name
                        }}<span v-if="index != (favorite.ingredients.malt.length - 1)">, </span></span></p>
                    <p class="card-text">Hops: <span v-for="(item, index) in favorite.ingredients.hops">{{ item.name
                        }}<span v-if="index != (favorite.ingredients.hops.length - 1)">, </span></span></p>
                    <div class="btn-group">
                        <button data-toggle="modal" data-target="#fullDescriptionModal" type="button"
                                class="btn btn-primary">See full description
                        </button>
                        <button type="button" class="btn btn-primary" data-toggle="tooltip" title="Add to favorites"
                                data-placement="top" @click="toggleFavorite(favorite)">
                            <span class="glyphicon glyphicon-star" :class="{'glyphicon-star-empty': !false}"></span>
                        </button>
                    </div>
                </div>
                <full-description-modal :result="favorite" id="fullDescriptionModal"></full-description-modal>
            </div>
        </div>
        <p>You have {{ strongAles.length }} favorite strong beers</p>
        <div class="row">
            <div class="card col-sm-6 col-md-4 col-lg-3" v-for="strongAle in strongAles">
                <img class="card-img-top img-responsive center-block" v-bind:src="strongAle.image_url"
                     alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">{{ strongAle.name}}</h4>
                    <p class="card-text">ABV: {{ strongAle.abv }}%</p>
                    <p class="card-text">Malts: <span v-for="(item, index) in strongAle.ingredients.malt">{{ item.name
                        }}<span v-if="index != (strongAle.ingredients.malt.length - 1)">, </span></span></p>
                    <p class="card-text">Hops: <span v-for="(item, index) in strongAle.ingredients.hops">{{ item.name
                        }}<span v-if="index != (strongAle.ingredients.hops.length - 1)">, </span></span></p>
                    <div class="btn-group">
                        <button data-toggle="modal" data-target="#fullDescriptionModal" type="button"
                                class="btn btn-primary">See full description
                        </button>
                        <button type="button" class="btn btn-primary" data-toggle="tooltip" title="Add to strongAles"
                                data-placement="top" @click="toggleFavorite(strongAle)">
                            <span class="glyphicon glyphicon-star" :class="{'glyphicon-star-empty': !false}"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import FullDescriptionModal from './FullDescriptionModal.vue'

  export default {
    computed: {
      ...mapState([
        'count'
      ]),
      // Just to show alternative ...mapState syntax
      ...mapState({
        favorites: state => state.favorites
      }),
      ...mapGetters([
        'strongAles'
      ])
    },
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
