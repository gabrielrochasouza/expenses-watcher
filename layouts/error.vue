<template>
  <v-app dark class="text-center mt-12">
    <span>Opps...</span>
    <h1>
      {{ error.message }}
    </h1>
    <h2>Status Code: {{ error.statusCode }}</h2>
    <p>Go back to:

    <NuxtLink to="/"> Home page </NuxtLink>
    </p>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 30px;
}
span{
  font-size: 60px;
}
</style>
