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
        if (this.favorites[i].id === result.id) {
          this.$store.commit('REMOVE_FAVORITE', i)
          removed = true
          break
        }
      }
      if (!removed) {
        this.$store.commit('ADD_FAVORITE', result)
      }
    },
    isFavorite (id) {
      let i = 0
      for (i; i < this.favorites.length; i++) {
        if (this.favorites[i].id === id) {
          return true
        }
      }
      return false
    }
  }
}
