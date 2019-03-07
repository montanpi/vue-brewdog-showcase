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
                            <label class="radio-inline"><input v-model="abvRadio" type="radio" value="gt">greater than</label>
                            <input v-model="abv" type="number" class="form-control input-lg" min="0"
                                   @keyup.enter="search" placeholder="Abv">
                            <span class="has-error" v-if="!$v.abv.between">Abv must be between 0% and 100%</span>
                        </div>
                        <div class="form-group">
                            <label>Ibu</label>
                            <label class="radio-inline"><input v-model="ibuRadio" value='lt' type="radio">less than</label>
                            <label class="radio-inline"><input v-model="ibuRadio" value='gt' type="radio">greater than</label>
                            <input v-model="ibu" type="number" class="form-control input-lg" min="0"
                                   @keyup.enter="search" placeholder="Ibu">
                        </div>
                        <div class="form-group">
                            <label>Ebc</label>
                            <label class="radio-inline"><input v-model="ebcRadio" type="radio" value="lt">less than</label>
                            <label class="radio-inline"><input v-model="ebcRadio" type="radio" value="gt">greater than</label>
                            <input v-model="ebc" type="number" class="form-control input-lg" min="0"
                                   @keyup.enter="search" placeholder="Ebc">
                        </div>
                        <div class="form-group">
                            <label>Yeast</label>
                            <input v-model="yeast" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Yeast">
                            <span class="has-error" v-if="!$v.yeast.alphaSpaces">Only alphabet characters are allowed.</span>
                        </div>
                        <div class="form-group">
                            <label>Brewed</label>
                            <label class="radio-inline"><input v-model="brewedRadio" value="before" type="radio">before</label>
                            <label class="radio-inline"><input v-model="brewedRadio" value="after" type="radio">after</label>
                            <select v-model="brewedSelect" class="form-control input-lg" @keyup.enter="search" title="brewed">
                                <option v-for="year in years" v-bind:value="year">{{ year }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Hops</label>
                            <input v-model="hops" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Hops">
                            <span class="has-error" v-if="!$v.hops.alphaSpaces">Only alphabet characters are allowed.</span>
                        </div>
                        <div class="form-group">
                            <label>Malt</label>
                            <input v-model="malt" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Malt">
                            <span class="has-error" v-if="!$v.malt.alphaSpaces">Only alphabet characters are allowed.</span>
                        </div>
                        <div class="form-group">
                            <label>Food</label>
                            <input v-model="food" type="text" class="form-control input-lg" @keyup.enter="search"
                                   placeholder="Food">
                            <span class="has-error" v-if="!$v.food.alphaSpaces">Only alphabet characters are allowed.</span>
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
        <search-results v-bind:isLoading="isLoading" v-bind:results="results"></search-results>
    </div>
</template>

<script>
  import axios from 'axios'
  import {numeric, between} from 'vuelidate/lib/validators'
  import SearchResults from './SearchResults.vue'
  import alphaSpaces from '../validator/AlphaSpacesValidator'

  export default {
    name: 'search',
    components: {
      SearchResults
    },
    data () {
      return {
        baseUrl: 'https://api.punkapi.com/v2/beers',
        results: [],
        isLoading: false,
        years: [],
//        Form inputs
        abv: null,
        abvRadio: 'gt',
        abvLt: null,
        abvGt: null,
        ibu: null,
        ibuRadio: 'gt',
        ibuLt: null,
        ibuGt: null,
        ebc: null,
        ebcRadio: 'gt',
        ebcLt: null,
        ebcGt: null,
        beerName: null,
        yeast: null,
        brewedSelect: null,
        brewedRadio: 'after',
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
        alphaSpaces
      },
      hops: {
        alphaSpaces
      },
      malt: {
        alphaSpaces
      },
      food: {
        alphaSpaces
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
          this.abvGt = null
        } else if (this.abvRadio === 'gt') {
          this.abvGt = this.abv
          this.abvLt = null
        } else {
          this.abv = this.abvLt = this.abvGt = null
        }
        // Ibu less than or greater than
        if (this.ibuRadio === 'lt') {
          this.ibuLt = this.ibu
          this.ibuGt = null
        } else if (this.ibuRadio === 'gt') {
          this.ibuGt = this.ibu
          this.ibuLt = null
        } else {
          this.ibu = this.ibuGt = this.ibuLt = null
        }
        // Ebc less than or greater than
        if (this.ebcRadio === 'lt') {
          this.ebcLt = this.ebc
          this.ebcGt = null
        } else if (this.ebcRadio === 'gt') {
          this.ebcGt = this.ebc
          this.ebcLt = null
        } else {
          this.ebc = this.ebcGt = this.ebcLt = null
        }
        // Brewed before or brewed after
        if (this.brewedRadio === 'before' && this.brewedSelect !== null) {
          this.brewedBefore = '01-' + this.brewedSelect
          this.brewedAfter = null
        } else if (this.brewedRadio === 'after' && this.brewedSelect !== null) {
          this.brewedAfter = '12-' + this.brewedSelect
          this.brewedBefore = null
        }
      },
      cleanInputs: function () {
        if (this.abv === '') {
          this.abv = null
        }
        if (this.ibu === '') {
          this.ibu = null
        }
        if (this.ebc === '') {
          this.ebc = null
        }
        if (this.yeast === '') {
          this.yeast = null
        }
        if (this.hops === '') {
          this.hops = null
        }
        if (this.food === '') {
          this.food = null
        }
        if (this.ids === '') {
          this.ids = null
        }
        if (this.malt === '') {
          this.malt = null
        }
        if (this.beerName === '') {
          this.beerName = null
        }
      },
      search: function () {
        this.isLoading = true
        this.cleanInputs()
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
            this.results = response.data
            this.isLoading = false
          })
      }
    }
  }
</script>

<style scoped>

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
