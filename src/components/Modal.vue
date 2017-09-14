<script>
  export default {
    created () {
      // close on Esc
      window.addEventListener('keyup', e => e.which === 27 && this.$emit('close'))
    },
    beforeDestroy () {
      window.removeEventListener('keyup', e => e.which === 27 && this.$emit('close'))
    }
  }
</script>

<template lang="pug">
    transition(name='modal')
        .modal-mask
            .modal-wrapper
                .modal-container
                    .modal-header
                        slot(name='header')
                            h3.margin-v-0 Confirm action
                    .modal-body
                        slot
                    .modal-footer
                        slot(name='footer')
                            button.btn.btn-primary.pull-right.margin-left-10(@click="$emit('ok')")
                                | OK
                            button.btn.btn-default.pull-right(@click="$emit('close')")
                                | Cancel
</template>
