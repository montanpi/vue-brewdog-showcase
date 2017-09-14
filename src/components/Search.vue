<template>
    <div class="container-fluid">
        <div class="row">
            <div class="input-group col-md-12">
                <input type="text" class="form-control input-lg" placeholder="Search"/>
                <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button" @click="search">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <hr/>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 text-center" v-for="result in results">
                <div class="card">
                    <img class="card-img-top img-responsive center-block" src="https://placehold.it/300"
                         alt="Card image cap">
                    <div class="card-body">
                        <h4 class="card-title">{{ result.name}}</h4>
                        <p class="card-text">ABV: {{ result.abv }}</p>
                        <p class="card-text">Malts: {{ result.abv }}</p>
                        <ul>
                            <li v-for="malt in result.ingredients.malt" class="card-text">{{ malt.name }}</li>
                        </ul>
                        <ul>
                            <li v-for="hop in result.ingredients.hops" class="card-text">{{ hop.name }}</li>
                        </ul>
                        <a href="#" class="btn btn-primary">See full description</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
      name: 'search',
      data () {
        return {
          results: []
        }
      },
      methods: {
        search: function () {
          axios.get('https://api.punkapi.com/v2/beers/random')
            .then(response => {
              this.results = response.data
              console.log(this.results)
            })
        }
      }
    }
</script>

<style>
    /* TODO Search form width */
</style>