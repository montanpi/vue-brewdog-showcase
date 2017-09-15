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
                        <button type="button" class="btn btn-primary">See full description</button>
                        <button type="button" class="btn btn-primary" data-toggle="tooltip" title="Add to favorites" data-placement="top" @click="toggleFavorite">
                            <span class="glyphicon glyphicon-star-empty"></span>
                        </button>
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
        axios.get('https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6 ')
          .then(response => {
            this.results = response.data
          })
      },
      toggleFavorite: function () {
        console.log(this.results)
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

    /* TODO Search form width */
    /* TODO Bootstrap style for cards doesn't work (e.g. .card-inverse) */
</style>