<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 col-sm-offset-4 text-center">
                <h1>Contact Us</h1>
                <form>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email"
                               placeholder="email@domain.com" v-model="email">
                        <span class="has-error" v-if="!$v.email.required">Email required</span>
                        <span class="has-error" v-if="!$v.email.valid">Not a valid email</span>
                    </div>
                    <div class="form-group">
                        <label for="msg">Your Message</label>
                        <textarea class="form-control" id="msg" rows="3"
                                  placeholder="Write here your message" v-model="msg"></textarea>
                        <span class="has-error" v-if="!$v.msg.required">Message required</span>
                        <span class="has-error" v-if="!$v.msg.valid">Message too short</span>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-lg" :disabled="$v.$invalid"
                                @click="sendForm">Send
                        </button>
                        <button type="button" class="btn btn-secondary btn-lg" data-toggle="modal"
                                v-bind:data-target="triggerModal" @click="cancelForm">Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="glyphicon glyphicon-alert">&nbsp</span><span class="modal-title" id="confirmationModalLabel">Your message was not saved</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <span>Are you sure you want to exit and lose changes?</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Stay on page</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="redirectHome">Leave page</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {required, minLength, email} from 'vuelidate/lib/validators'

  export default {
    name: 'contact',
    data () {
      return {
        email: '',
        msg: '',
        triggerModal: ''
      }
    },
    validations () {
      return {
        email: {
          required,
          valid: email
        },
        msg: {
          required,
          valid: minLength(10)
        }
      }
    },
    methods: {
      sendForm: function ($v) {
        if (!$v.$invalid) {
          this.email = ''
          this.msg = ''
          console.log('message was sent')
        }
      },
      cancelForm: function () {
        if (this.msg !== '') {
          this.triggerModal = '#confirmationModal'
        } else {
          this.email = ''
          this.msg = ''
          this.$router.push({ path: '/' })
        }
      },
      redirectHome: function () {
        this.email = ''
        this.msg = ''
        this.triggerModal = 'modal'
        this.$router.push({ path: '/' })
      }
    }
  }
</script>