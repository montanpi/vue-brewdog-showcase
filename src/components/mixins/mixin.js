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
      let i = 0
      let removed = false
      for (i; i < this.favorites.length; i++) {
        if (this.favorites[i].name === result.name) {
          this.$store.commit('REMOVE_FAVORITE', i)
          removed = true
          break
        }
      }
      if (!removed) {
        this.$store.commit('ADD_FAVORITE', result)
      }
    },
    isFavorite (name) {
      let i = 0
      for (i; i < this.favorites.length; i++) {
        if (this.favorites[i].name === name) {
          return true
        }
      }
      return false
    }
  }
}
