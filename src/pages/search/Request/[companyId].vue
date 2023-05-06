<script>
export default {
  name: 'RequestOverlay',
  props: {
    overlayStatus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closeOverlay'],
  data() {
    return {
      message: '',
    }
  },
  computed: {
    messageCounter() {
      return `${this.message.length}/200`
    },
    validRequest() {
      return !!this.message
    },
    messageRule() {
      return [
        v => !!v || 'Message is required',
        v => (v && v.length <= 200) || 'Message must be less than 200 characters',
      ]
    },
  },
  methods: {
    submitRequest() {
      if (this.validRequest) {
        // do something with the message, e.g. send it to a server
        // console.log(this.message)
        // clear the message field and close the overlay
        this.message = ''
        this.$emit('closeOverlay')
      }
    },
    closeOverlay() {
      this.$emit(overlayStatus, false)
    },
  },
}
</script>

<template>
  <v-overlay :value="overlayStatus" @click="closeOverlay">
    <v-card max-width="600" class="pa-4">
      <v-toolbar dense>
        <v-toolbar-title class="text-h5">
          Request Form
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="closeOverlay">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="mt-2" />
      <v-form @submit.prevent="submitRequest">
        <v-textarea
          v-model="message"
          label="Message"
          required
          auto-grow
          :counter="messageCounter"
          :rules="[messageRule]"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" color="primary" :disabled="!validRequest">
            Send
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-overlay>
</template>
