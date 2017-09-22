import {mapState, mapGetters} from 'vuex'

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
