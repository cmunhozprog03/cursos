<template>
  <h1>Bem-vindo {{ auth.user.name }}</h1>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['auth'])
  }
}
</script>

<style>

</style>