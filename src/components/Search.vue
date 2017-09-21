<template>
    <div class="container">
        <div class="row">
            <div class="col-xs input-group">
                <input v-model="beerName" type="text" class="form-control input-lg" @keyup.enter="search" placeholder="Name a beer..."
                       autofocus/>
                <span class="input-group-btn">
                    <button class="btn btn-info btn-lg" type="button" @click="random">
                        <i class="glyphicon glyphicon-random"></i>
                    </button>
                        <button class="btn btn-info btn-lg" type="button" @click="search">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                </span>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <a class="pull-right" data-toggle="collapse" href="#searchCollapse" aria-expanded="false"
                       aria-controls="searchCollapse">Advanced Search</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="collapse multi-collapse" id="searchCollapse">
                    <form>
                        <div class="form-group">
                            <label>Abv</label>
                            <label class="radio-inline"><input v-model="abvRadio" type="radio" value="lt">less than</label>
                            <label class="radio-inline"><input v-model="abvRadio" type="radio" value="gt" checked>greater than</label>
                            <input v-model="abv" type="number" step="0.1" class="form-control input-lg"
                                   @keyup.enter="search" placeholder="Abv">
                            <span class="has-error" v-if="!$v.abv.between">Abv must be between 0% and 100%</span>
                        </div>
                        <div class="form-group">
                            <label>Ibu</label>
                            <label class="radio-inline"><input v-model="ibuRadio" value='lt' type="radio">less than</label>
                            <label class="radio-inline"><input v-model="ibuRadio" value='gt' type="radio">greater than</label>
                            <input v-model="ibu" type="number" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Ibu">
                        </div>
                        <div class="form-group">
                            <label>Ebc</label>
                            <label class="radio-inline"><input v-model="ebcRadio" type="radio" value="lt">less than</label>
                            <label class="radio-inline"><input v-model="ebcRadio" type="radio" value="gt">greater than</label>
                            <input v-model="ebc" type="number" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Ebc">
                        </div>
                        <div class="form-group">
                            <label>Yeast</label>
                            <input v-model="yeast" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Yeast">
                            <span class="has-error" v-if="!$v.yeast.alpha">Only alphabet characters are allowed.</span>
                        </div>
                        <div class="form-group">
                            <label>Brewed</label>
                            <label class="radio-inline"><input v-model="brewedRadio" value="before" type="radio">before</label>
                            <label class="radio-inline"><input v-model="brewedRadio" value="after" type="radio" checked>after</label>
                            <select v-model="brewedSelect" class="form-control input-lg" @keyup.enter="search"
                                    placeholder="Brewed">
                                <option v-for="year in years" v-bind:value="year">{{ year }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Hops</label>
                            <input v-model="hops" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Hops">
                            <span class="has-error" v-if="!$v.hops.alpha">Only alphabet characters are allowed.</span>
                        </div>
                        <div class="form-group">
                            <label>Malt</label>
                            <input v-model="malt" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Malt">
                            <span class="has-error" v-if="!$v.malt.alpha">Only alphabet characters are allowed.</span>
                        </div>
                        <div class="form-group">
                            <label>Food</label>
                            <input v-model="food" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Food">
                            <span class="has-error" v-if="!$v.food.alpha">Only alphabet characters are allowed.</span>
                        </div>
                        <div class="form-group">
                            <label>Id</label>
                            <input v-model="ids" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Id">
                            <span class="has-error" v-if="!$v.ids.numeric">Only numeric characters are allowed.</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <hr/>
            </div>
        </div>
        <div v-if="isLoading" class="row">
            <div class="col-xs-12">
                <div class="loader center-block"></div>
            </div>
        </div>
        <div v-if="!isLoading" class="row">
            <div class="card col-sm-6 col-md-4 col-lg-3" v-for="(result, index) in results">
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
                                data-placement="top" @click="toggleFavorite(result, index)">
                            <span class="glyphicon" v-bind:class="[false ? 'glyphicon-star' : 'glyphicon-star-empty']"></span>
                        </button>
                        <p>{{ index }} {{ result.favorite }}</p>
                    </div>
                </div>
                <full-description-modal :result="result" id="fullDescriptionModal"></full-description-modal>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  import {numeric, between, alpha} from 'vuelidate/lib/validators'
  import FullDescriptionModal from './FullDescriptionModal.vue'

  export default {
    name: 'search',
    components: {FullDescriptionModal},
    data () {
      return {
        baseUrl: 'https://api.punkapi.com/v2/beers',
        results: [],
        isLoading: false,
        years: [],
//        Form inputs
        abv: null,
        abvRadio: null,
        abvLt: null,
        abvGt: null,
        ibu: null,
        ibuRadio: null,
        ibuLt: null,
        ibuGt: null,
        ebc: null,
        ebcRadio: null,
        ebcLt: null,
        ebcGt: null,
        beerName: null,
        yeast: null,
        brewedSelect: null,
        brewedRadio: null,
        brewedBefore: null,
        brewedAfter: null,
        hops: null,
        malt: null,
        food: null,
        ids: null
      }
    },
    validations: {
      abv: {
        between: between(0, 100)
      },
      ibu: {
        between: between(0, 500)
      },
      ebc: {
        between: between(0, 500)
      },
      yeast: {
        alpha
      },
      hops: {
        alpha
      },
      malt: {
        alpha
      },
      food: {
        alpha
      },
      ids: {
        numeric
      }
    },
    created: function () {
      for (let i = 2008; i <= new Date().getFullYear(); i++) {
        this.years.push(i)
      }
    },
    computed: {
      ...mapState({
        count: state => state.count,
        favorites: state => state.favorites
      })
    },
    methods: {
      random: function () {
        this.isLoading = true
        axios.get(this.baseUrl + '/random')
          .then(response => {
            this.isLoading = false
            this.results = response.data
          })
      },
      prepareParams: function () {
        // Abv less than or greater than
        if (this.abvRadio === 'lt') {
          this.abvLt = this.abv
          this.ibuGt = this.abv = null
        } else if (this.abvRadio === 'gt') {
          this.abvGt = this.abv
          this.ibuLt = this.abv = null
        } else {
          this.abv = this.abvLt = this.abvGt = null
        }
        // Ibu less than or greater than
        if (this.ibuRadio === 'lt') {
          this.ibuLt = this.ibu
          this.ibuGt = this.ibu = null
        } else if (this.ibuRadio === 'gt') {
          this.ibuGt = this.ibu
          this.ibuLt = this.ibu = null
        } else {
          this.ibu = this.ibuGt = this.ibuLt = null
        }
        // Ebc less than or greater than
        if (this.ebcRadio === 'lt') {
          this.ebcLt = this.ebc
          this.ebcGt = this.ebc = null
        } else if (this.ebcRadio === 'gt') {
          this.ebcGt = this.ebc
          this.ebcLt = this.ebc = null
        } else {
          this.ebc = this.ebcGt = this.ebcLt = null
        }
        // Brewed before or brewed after
        if (this.brewedRadio === 'before') {
          this.brewedBefore = '01-' + this.brewedSelect
          this.brewedAfter = null
        } else if (this.brewedRadio === 'after') {
          this.brewedAfter = '12-' + this.brewedSelect
          this.brewedBefore = null
        } else {
          this.brewedSelect = this.brewedAfter = this.brewedBefore = null
        }
      },
      search: function () {
        this.isLoading = true
        this.prepareParams()
        axios.get(this.baseUrl, {
          params: {
            abv_lt: this.abvLt,
            abv_gt: this.abvGt,
            ibu_lt: this.ibuLt,
            ibu_gt: this.ibuGt,
            ebc_lt: this.ebcLt,
            ebc_gt: this.ebcGt,
            beer_name: this.beerName,
            yeast: this.yeast,
            brewed_before: this.brewedBefore,
            brewed_after: this.brewedAfter,
            hops: this.hops,
            malt: this.malt,
            food: this.food,
            ids: this.ids
          }
        })
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.results = response.data
              this.results[i].favorite = false
            }
            this.isLoading = false
          })
      },
      toggleFavorite: function (result, index) {
        if (this.favorites.indexOf(result) !== -1) {
          this.results[index].favorite = false
          this.$store.commit('REMOVE_FAVORITE', result)
        } else {
          this.results[index].favorite = true
          this.$store.commit('ADD_FAVORITE', result)
        }
      }
    }
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

    .loader {
        border: 16px solid #f8f8f8; /* Light grey */
        border-top: 16px solid #5bc0de; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
