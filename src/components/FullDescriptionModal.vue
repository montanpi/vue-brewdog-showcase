<template>
    <div class="modal fade" id="fullDescriptionModal" tabindex="-1" role="dialog"
         aria-labelledby="fullDescriptionModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title" id="fullDescriptionModalLabel">{{ result.name }}</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table-striped table">
                        <tbody>
                        <tr>
                            <td>ABV</td>
                            <td>{{ result.abv }}</td>
                        </tr>
                        <tr>
                            <td>IBU's</td>
                            <td>{{ result.ibu }}</td>
                        </tr>
                        <tr>
                            <td>EBC</td>
                            <td>{{ result.ebc }}</td>
                        </tr>
                        <tr>
                            <td>Yeast</td>
                            <td>{{ result.ingredients.yeast }}
                            </td>
                        </tr>
                        <tr>
                            <td>Malts</td>
                            <td>
                                <span v-for="(item, index) in result.ingredients.malt">{{ item.name }}
                                <span v-if="index != (result.ingredients.malt.length - 1)">, </span></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Hops</td>
                            <td>
                                <span v-for="(item, index) in result.ingredients.hops">{{ item.name }}
                                <span v-if="index != (result.ingredients.hops.length - 1)">, </span></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Brewed</td>
                            <td>{{ result.first_brewed }}</td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{{ result.id }}</td>
                        </tr>
                        <tr>
                            <td>Food</td>
                            <td>
                                <span v-for="(item, index) in result.food_pairing">{{ item }}
                                <span v-if="index != (result.food_pairing.length - 1)">, </span></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">{{ result.description }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-toggle="tooltip" title="Add to favorites"
                            data-placement="top" @click="toggleFavorite(result)">
                        <span class="glyphicon glyphicon-star-empty"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'full-description-modal',
    props: [
      'result'
    ],
    computed: {
      ...mapState({
        count: state => state.count,
        favorites: state => state.favorites
      })
    },
    methods: {
      toggleFavorite: function (result) {
        if (this.favorites.indexOf(result) !== -1) {
          this.$store.commit('REMOVE_FAVORITE', result)
        } else {
          this.$store.commit('ADD_FAVORITE', result)
        }
      }
    }
  }
</script>
