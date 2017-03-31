<template>
  <aside class="col-sm-3 aside">
    <b-form-fieldset
    :feedback="feedback" 
    description="We'll convert your name to lowercase automatically."
    label="Example Label"
    :state="state"
    :label-size="1"
    >
      <b-form-input></b-form-input>
      <b-form-input></b-form-input>
    
    </b-form-fieldset>
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="sass">
aside {
  background: #292b2c;
  color: rgba(255, 255, 255, 0.5);
}
</style>
